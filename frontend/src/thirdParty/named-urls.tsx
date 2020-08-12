import { compile, parse } from "path-to-regexp";

export function include(base: string, routes: any) {
  const mappedRoutes: any = {
    toString() {
      return base;
    },
  };

  Object.keys(routes).forEach((route) => {
    const url = routes[route];

    if (typeof url === "function" && route === "toString") {
      mappedRoutes.toString = function (): string {
        return base + routes.toString();
      };
    } else if (typeof url === "object") {
      // nested include - prefix all sub-routes with base
      mappedRoutes[route] = include(base, url);
    } else {
      // route - prefix with base and replace duplicate //
      mappedRoutes[route] =
        url.indexOf("/") === 0 ? url : [base, url].join("/").replace("//", "/");
    }
  });

  return mappedRoutes;
}

function compileWithParams(pattern: any, params: object = {}) {
  const reversed = compile(pattern);

  return reversed(params);
}

export function reverse(pattern: any, params: object = {}) {
  try {
    return compileWithParams(pattern, params);
  } catch (err) {
    return pattern;
  }
}

export function reverseForce(pattern: any, params: object = {}) {
  try {
    return compileWithParams(pattern, params);
  } catch (err) {
    const tokens = parse(pattern);

    return tokens.filter((token) => typeof token === "string").join("");
  }
}
