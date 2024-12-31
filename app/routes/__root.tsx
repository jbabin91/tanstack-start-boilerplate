import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  type ErrorComponentProps,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import geistMono from 'non.geist/mono?url';
import geist from 'non.geist?url';

import { DefaultCatchBoundary } from '@/components/errors/default-catch-boundary.tsx';
import { NotFound } from '@/components/errors/not-found.tsx';
import { Nav } from '@/components/layout/nav.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { TailwindIndicator } from '@/components/utils/tailwind-indicator.tsx';
import { TanstackQueryDevtools } from '@/components/utils/tanstack-query-devtools.tsx';
import { TanstackRouterDevtools } from '@/components/utils/tanstack-router-devtools.tsx';
import { Providers } from '@/providers';
import globalsCss from '@/styles/globals.css?url';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  errorComponent: ErrorComponent,
  head: () => ({
    links: [
      { href: globalsCss, rel: 'stylesheet' },
      { href: geist, rel: 'stylesheet' },
      { href: geistMono, rel: 'stylesheet' },
      { href: '/favicon.ico', rel: 'icon' },
    ],
    meta: [
      {
        charSet: 'utf8',
      },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport',
      },
    ],
    scripts: import.meta.env.PROD
      ? []
      : [
          {
            children: /* js */ `
        import RefreshRuntime from "/_build/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
      `,
            type: 'module',
          },
        ],
  }),
  notFoundComponent: NotFoundComponent,
  pendingComponent: PendingComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Nav />
      <Outlet />
    </RootDocument>
  );
}

function PendingComponent() {
  return (
    <div className="space-y-6 p-6">
      <Typography.H1>Loading...</Typography.H1>
    </div>
  );
}

function ErrorComponent(props: ErrorComponentProps) {
  return (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  );
}

function NotFoundComponent() {
  return <NotFound />;
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <Meta />
      </head>
      <body>
        <Providers>{children}</Providers>
        <TailwindIndicator />
        <TanstackQueryDevtools />
        <TanstackRouterDevtools />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
