import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Meta, Scripts } from '@tanstack/start';

import { DefaultCatchBoundary } from '../components/errors/default-catch-boundary';
import { NotFound } from '../components/errors/not-found';
import globalsCss from '../styles/globals.css?url';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  head: () => ({
    links: [{ href: globalsCss, rel: 'stylesheet' }],
    meta: [
      {
        charSet: 'utf8',
      },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport',
      },
    ],
  }),
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
      </head>
      <body>
        <div className="flex gap-2 p-2 text-lg">
          <Link
            activeOptions={{ exact: true }}
            activeProps={{
              className: 'font-bold',
            }}
            to="/"
          >
            Home
          </Link>
          <Link
            activeOptions={{ exact: true }}
            activeProps={{
              className: 'font-bold',
            }}
            to="/about"
          >
            About
          </Link>
          <Link
            activeProps={{
              className: 'font-bold',
            }}
            // @ts-expect-error - This route does not exist
            to="/this-route-does-not-exist"
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
