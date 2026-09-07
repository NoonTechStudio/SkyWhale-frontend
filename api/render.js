// Vercel serverless function that serves the client-card pages.
//
// It returns the normal single-page-app shell (so real visitors get the full
// interactive card) but with per-client <title> / <meta> / Open Graph tags
// baked into the HTML, so link-preview crawlers (WhatsApp, Facebook, Slack,
// Telegram, LinkedIn, iMessage, Discord, X, Google, …) — which never run
// JavaScript — show the client's business name, tagline and logo instead of a
// generic "Sky Whale" + full-size site icon.
//
// vercel.json routes only "/", "/card/:id" and "/c/:slug" here; assets,
// /index.html and every other route are served straight from static hosting.

const API_BASE = process.env.API_BASE || "https://api.skywhale.in";
const SITE = "https://skywhale.in";
const DEFAULT_IMAGE = `${SITE}/favicon.png`;
const RESERVED_SUBDOMAINS = new Set(["www", "api", "app", "admin", ""]);

// Small square so chat apps render a compact card with a thumbnail rather than
// a full-width banner.
const OG_IMAGE_SIZE = 256;

const DEFAULT_OG = {
  title: "SkyWhale — Digital Business Cards",
  description:
    "Your business, one link. Share your contact details, services, gallery and payment info from a single smart page.",
  image: DEFAULT_IMAGE,
  type: "website",
  square: false,
};

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Insert a resize transform into a Cloudinary delivery URL so every preview is
// the same tidy padded square. Non-Cloudinary URLs are returned untouched.
const squareImage = (url) => {
  if (!url || typeof url !== "string") return null;
  const marker = "/image/upload/";
  const i = url.indexOf(marker);
  if (!url.includes("res.cloudinary.com") || i === -1) return url;
  const head = url.slice(0, i + marker.length);
  const tail = url.slice(i + marker.length);
  if (/^[a-z]{1,3}_[^/]*\//.test(tail)) return url; // transform already present
  const t = `w_${OG_IMAGE_SIZE},h_${OG_IMAGE_SIZE},c_pad,b_auto,q_auto,f_auto`;
  return `${head}${t}/${tail}`;
};

const subdomainOf = (host = "") => {
  const parts = host.split(":")[0].toLowerCase().split(".");
  if (parts.length <= 2) return null;
  const sub = parts[0];
  return RESERVED_SUBDOMAINS.has(sub) ? null : sub;
};

async function fetchClient(candidates) {
  for (const url of candidates) {
    if (!url) continue;
    try {
      const r = await fetch(url, { headers: { accept: "application/json" } });
      if (r.ok) {
        const data = await r.json();
        if (data && data.businessName) return data;
      }
    } catch (e) {
      /* try next */
    }
  }
  return null;
}

// Pull the built <script>/<link>/<style> tags out of the real index.html so the
// SPA still boots for human visitors.
async function getAppHead(host) {
  try {
    const r = await fetch(`https://${host}/index.html`, {
      headers: { "user-agent": "skywhale-render" },
    });
    if (!r.ok) return "";
    const html = await r.text();
    const head = html.slice(html.indexOf("<head>") + 6, html.indexOf("</head>"));
    return (
      head
        .split(/\r?\n/)
        .filter((line) =>
          /<(script|link|style)\b/i.test(line) &&
          !/rel=["']?icon/i.test(line),
        )
        .join("\n")
    );
  } catch (e) {
    return "";
  }
}

export default async function handler(req, res) {
  const host = req.headers.host || "skywhale.in";

  const reqUrl = new URL(req.url || "/", `https://${host}`);
  let path = reqUrl.searchParams.get("path") || reqUrl.pathname || "/";
  path = path.split("?")[0];
  if (!path.startsWith("/")) path = `/${path}`;
  if (path === "/api/render") path = "/";

  const subdomain = subdomainOf(host);
  const cardMatch = path.match(/^\/(?:card|c)\/([^/]+)\/?$/);
  const token = cardMatch ? decodeURIComponent(cardMatch[1]) : null;
  const isId = token && /^[a-f\d]{24}$/i.test(token);

  let og = { ...DEFAULT_OG, url: `https://${host}${path === "/" ? "" : path}` };

  if (subdomain || token) {
    const client = await fetchClient([
      subdomain && `${API_BASE}/api/clients/public/${encodeURIComponent(subdomain)}`,
      isId && `${API_BASE}/api/clients/public/id/${encodeURIComponent(token)}`,
      token && !isId && `${API_BASE}/api/clients/public/${encodeURIComponent(token)}`,
    ]);

    if (client) {
      const img = squareImage(client.businessLogo);
      const owner = client.ownerName ? `${client.ownerName} · ` : "";
      og = {
        title: client.businessName,
        description:
          (client.tagline && client.tagline.trim()) ||
          `${owner}Digital business card — tap for contact details, services and more.`,
        image: img || DEFAULT_IMAGE,
        type: "profile",
        square: !!(img && img.includes("res.cloudinary.com")),
        url: subdomain ? `https://${host}/` : `https://${host}${path}`,
      };
    }
  }

  const appHead = await getAppHead(host);

  const squareDims = og.square
    ? `\n<meta property="og:image:width" content="${OG_IMAGE_SIZE}">` +
      `\n<meta property="og:image:height" content="${OG_IMAGE_SIZE}">`
    : "";

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="icon" type="image/png" href="/favicon.png" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(og.title)}</title>
<meta name="description" content="${esc(og.description)}" />
<link rel="canonical" href="${esc(og.url)}" />
<meta property="og:type" content="${esc(og.type)}" />
<meta property="og:site_name" content="SkyWhale" />
<meta property="og:title" content="${esc(og.title)}" />
<meta property="og:description" content="${esc(og.description)}" />
<meta property="og:url" content="${esc(og.url)}" />
<meta property="og:image" content="${esc(og.image)}" />
<meta property="og:image:secure_url" content="${esc(og.image)}" />${squareDims}
<meta property="og:image:alt" content="${esc(og.title)}" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${esc(og.title)}" />
<meta name="twitter:description" content="${esc(og.description)}" />
<meta name="twitter:image" content="${esc(og.image)}" />
${appHead}
</head>
<body>
<div id="root"></div>
${appHead ? "" : '<script type="module" src="/src/main.jsx"></script>'}
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=86400",
  );
  res.status(200).send(html);
}
