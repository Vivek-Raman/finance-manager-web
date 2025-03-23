import { AppShell, Flex, Space, Stack, Text } from "@mantine/core"
import Link from "next/link"
import { ThemeColorSwatch } from "../theme/ThemeColorSwatch";

interface NavbarContentsProps {
  closeFn: () => void;
}

export const NavbarContents = ({ closeFn }: NavbarContentsProps) => {
  return (
    <AppShell.Navbar p="md">
      <Stack h='100%'>
        <Link href='/login' onClick={closeFn}>Login</Link>
        <Link href='/dashboard' onClick={closeFn}>Dashboard</Link>
        <Link href='/expenses' onClick={closeFn}>Expenses</Link>
        <Space style={{ flexGrow: 1 }} />
        <ThemeColorSwatch />
      </Stack>
    </AppShell.Navbar>
  );
}
