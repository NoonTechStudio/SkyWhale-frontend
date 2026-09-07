import { rewrite, next } from "@vercel/edge";

// Edge middleware runs BEFORE static files are served, so it can send the
// card-facing routes ("/", "/card/:id", "/c/:slug") to the /api/render
// function — which returns the SPA shell with per-client Open Graph tags baked
// in for link-preview crawlers. Everything else (assets, /admin, /order, …)
// falls through to the normal static SPA untouched.

export const config = {
  // Skip Vercel internals, the render function itself, and anything with a
  // file extension (assets). Match everything else and decide inside.
  matcher: ["/((?!api/render|_vercel|.*\\.[a-zA-Z0-9]+$).*)"],
};

const CARD_PATHS = /^\/(?:card|c)\/[^/]+\/?$/;

export default function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  const isRoot = path === "/";
  const isCardPath = CARD_PATHS.test(path);

  if (!isRoot && !isCardPath) return next();

  const target = new URL("/api/render", url);
  target.searchParams.set("path", path);
  return rewrite(target);
}
