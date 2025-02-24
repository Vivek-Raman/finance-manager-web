'use client';

import '@mantine/core/styles.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {ColorSchemeScript, MantineProvider, mantineHtmlProps, createTheme, AppShell, Burger, Group, Skeleton, Text} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import Link from 'next/link';

const theme = createTheme({
  primaryColor: 'violet',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, {toggle}] = useDisclosure();

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <SpeedInsights />
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <AppShell
            header={{ height: 60 }}
            padding="md"
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
          >
            <AppShell.Header>
              <Group h="100%" px="md">
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Text>Finance Manager</Text>
              </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
              <Link href='/login' onClick={toggle}>Login</Link>
              <Link href='/dashboard' onClick={toggle}>Dashboard</Link>
              <Link href='/expenses' onClick={toggle}>Expenses</Link>
            </AppShell.Navbar>

            <AppShell.Main>
              {children}
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
