'use client';

import { AppShell, Space, Stack } from "@mantine/core"
import Link from "next/link"
import { ThemeColorSwatch } from "../theme/ThemeColorSwatch";
import { AuthInfo } from "./AuthInfo";

interface NavbarContentsProps {
  closeFn: () => void;
}

export const NavbarContents = ({ closeFn }: NavbarContentsProps) => {
  return (
    <AppShell.Navbar p="md">
      <Stack h='100%'>
        <Link href='/dashboard' onClick={closeFn}>Dashboard</Link>
        <Link href='/expenses' onClick={closeFn}>Expenses</Link>
        <Space style={{ flexGrow: 1 }} />
        <ThemeColorSwatch />
        <AuthInfo />
      </Stack>
    </AppShell.Navbar>
  );
}
