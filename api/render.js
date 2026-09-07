// Vercel serverless function.
//
// Social/link-preview crawlers (WhatsApp, Facebook, Twitter, Slack, Telegram,
// LinkedIn, iMessage, Discord, Google, …) do NOT run JavaScript, so the SPA's
// `index.html` gives them nothing useful — just "Sky Whale" and the site
// favicon. `vercel.json` routes those crawler requests here instead, and this
// function returns a tiny HTML document with the right Open Graph tags for the
// specific client card being shared: the client's business name, tagline and
// logo (resized to a tidy square so the preview is a compact card, not a
// full-bleed banner).
//
// Real visitors are never routed here — they keep getting the static SPA.

const API_BASE = process.env.API_BASE || "https://api.skywhale.in";
const SITE = "https://skywhale.in";
const DEFAULT_IMAGE = `${SITE}/favicon.png`;
const RESERVED_SUBDOMAINS = new Set(["www", "api", "app", "admin", ""]);

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Square logo size used for link previews. Kept small (256px) on purpose so
// chat apps render a compact card with a thumbnail rather than a full-width
// banner.
const OG_IMAGE_SIZE = 256;

// Turn a Cloudinary delivery URL into a tidy padded square of OG_IMAGE_SIZE so
// every link preview looks the same regardless of the original logo. Non-
// Cloudinary URLs are returned untouched.
const squareImage = (url) => {
  if (!url || typeof url !== "string") return DEFAULT_IMAGE;
  const marker = "/image/upload/";
  const i = url.indexOf(marker);
  if (!url.includes("res.cloudinary.com") || i === -1) return url;
  const transform = `w_${OG_IMAGE_SIZE},h_${OG_IMAGE_SIZE},c_pad,b_auto,q_auto,f_auto`;
  const head = url.slice(0, i + marker.length);
  const tail = url.slice(i + marker.length);
  // don't double-apply if a transform is already there
  if (/^[a-z]{1,3}_[^/]*\//.test(tail)) return url;
  return `${head}${transform}/${tail}`;
};

const subdomainOf = (host = "") => {
  const clean = host.split(":")[0].toLowerCase();
  const parts = clean.split(".");
  if (parts.length <= 2) return null; // apex domain
  const sub = parts[0];
  if (RESERVED_SUBDOMAINS.has(sub)) return null;
  return sub;
};

async function fetchClient({ subdomain, id, slug }) {
  const tryUrl = async (u) => {
    try {
      const r = await fetch(u, { headers: { accept: "application/json" } });
      if (r.ok) return await r.json();
    } catch (e) {
      /* ignore */
    }
    return null;
  };

  if (subdomain) {
    const c = await tryUrl(`${API_BASE}/api/clients/public/${encodeURIComponent(subdomain)}`);
    if (c) return c;
  }
  if (id) {
    const c = await tryUrl(`${API_BASE}/api/clients/public/id/${encodeURIComponent(id)}`);
    if (c) return c;
  }
  if (slug) {
    const c = await tryUrl(`${API_BASE}/api/clients/public/${encodeURIComponent(slug)}`);
    if (c) return c;
  }
  return null;
}

export default async function handler(req, res) {
  const host = req.headers.host || "";

  // The real requested path. `vercel.json` passes it as ?path=… ; fall back to
  // req.url (and strip our own query) if that isn't present.
  const reqUrl = new URL(req.url || "/", `https://${host}`);
  let path = reqUrl.searchParams.get("path") || reqUrl.pathname || "/";
  path = path.split("?")[0];
  if (!path.startsWith("/")) path = `/${path}`;
  if (path === "/api/render") path = "/";

  // Path forms: <slug>.skywhale.in/ , skywhale.in/card/<id> , skywhale.in/c/<slug>
  const subdomain = subdomainOf(host);
  const cardMatch = path.match(/^\/(?:card|c)\/([^/]+)\/?$/);
  const pathToken = cardMatch ? decodeURIComponent(cardMatch[1]) : null;
  const looksLikeId = pathToken && /^[a-f\d]{24}$/i.test(pathToken);

  let og = {
    title: "SkyWhale — Digital Business Cards",
    description:
      "Your business, one link. Share your contact details, services, gallery and payment info from a single smart page.",
    image: DEFAULT_IMAGE,
    url: `https://${host}${path === "/" ? "" : path}`,
    type: "website",
  };

  let client = null;
  if (subdomain || pathToken) {
    client = await fetchClient({
      subdomain,
      id: looksLikeId ? pathToken : null,
      slug: !looksLikeId ? pathToken : null,
    });
  }

  if (client && client.businessName) {
    const owner = client.ownerName ? `${client.ownerName} · ` : "";
    og = {
      title: client.businessName,
      description:
        (client.tagline && client.tagline.trim()) ||
        `${owner}Digital business card — tap to view contact details, services and more.`,
      image: squareImage(client.businessLogo),
      // Subdomain visits land on "/"; /card/:id and /c/:slug keep their path.
      url: subdomain ? `https://${host}/` : `https://${host}${path}`,
      type: "profile",
    };
  }

  // Cloudinary logos are padded to a known square; declare the dimensions so
  // clients render a compact thumbnail. A non-Cloudinary logo or the fallback
  // favicon keeps its own shape, so we skip the dimension hints there.
  const squareDims =
    typeof og.image === "string" && og.image.includes("res.cloudinary.com")
      ? `\n<meta property="og:image:width" content="${OG_IMAGE_SIZE}">` +
        `\n<meta property="og:image:height" content="${OG_IMAGE_SIZE}">`
      : "";

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(og.title)}</title>
<meta name="description" content="${esc(og.description)}">
<link rel="canonical" href="${esc(og.url)}">

<meta property="og:type" content="${esc(og.type)}">
<meta property="og:site_name" content="SkyWhale">
<meta property="og:title" content="${esc(og.title)}">
<meta property="og:description" content="${esc(og.description)}">
<meta property="og:url" content="${esc(og.url)}">
<meta property="og:image" content="${esc(og.image)}">
<meta property="og:image:secure_url" content="${esc(og.image)}">${squareDims}
<meta property="og:image:alt" content="${esc(og.title)}">

<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(og.title)}">
<meta name="twitter:description" content="${esc(og.description)}">
<meta name="twitter:image" content="${esc(og.image)}">

<meta http-equiv="refresh" content="0; url=${esc(og.url)}">
</head>
<body>
<p><a href="${esc(og.url)}">${esc(og.title)}</a></p>
<script>location.replace(${JSON.stringify(og.url)});</script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Cache at Vercel's edge so repeat crawler hits don't re-call the API.
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=86400",
  );
  res.status(200).send(html);
}
