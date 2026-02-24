type RouteHandler = (params: Record<string, string>) => void;

interface Route {
  pattern: RegExp;
  keys: string[];
  handler: RouteHandler;
}

const routes: Route[] = [];

export function on(path: string, handler: RouteHandler): void {
  const keys: string[] = [];
  const pattern = new RegExp(
    '^' +
    path.replace(/:([^/]+)/g, (_: string, key: string) => {
      keys.push(key);
      return '([^/]+)';
    }) +
    '/?$'
  );
  routes.push({ pattern, keys, handler });
}

export function navigate(path: string): void {
  window.location.hash = path;
}

function dispatch(): void {
  const fullHash = window.location.hash.slice(1) || '/';
  const hash = fullHash.split('?')[0]; // strip query params for pattern matching
  for (const route of routes) {
    const match = hash.match(route.pattern);
    if (match) {
      const params: Record<string, string> = {};
      route.keys.forEach((key, i) => {
        params[key] = match[i + 1];
      });
      route.handler(params);
      updateActiveNav(hash);
      return;
    }
  }
}

function updateActiveNav(hash: string): void {
  document.querySelectorAll('.nav-link').forEach(el => {
    const href = el.getAttribute('href')?.slice(1) ?? '';
    el.classList.toggle('active', hash.startsWith(href) && href !== '/');
  });
}

export function initRouter(): void {
  window.addEventListener('hashchange', dispatch);
  dispatch();
}
