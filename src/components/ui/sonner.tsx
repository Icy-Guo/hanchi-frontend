'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      style={
        {
          '--normal-bg': 'white',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--normal-shadow':
            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
