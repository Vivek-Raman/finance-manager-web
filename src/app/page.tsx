import {Flex, Text} from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <Flex justify={"center"} align={"center"}>
      <Text>Dashboard</Text>
      <Link href={'/expenses'}>To Expenses</Link>
    </Flex>
  );
}
