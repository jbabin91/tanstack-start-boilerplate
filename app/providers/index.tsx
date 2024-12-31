import { Toaster } from '@/components/ui/sonner.tsx';

import { ThemeProvider } from './theme-provider.tsx';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster richColors />
    </ThemeProvider>
  );
}
