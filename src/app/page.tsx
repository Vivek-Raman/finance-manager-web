import {Flex, Text} from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <Flex justify={"center"} align={"center"}>
      <div>
        <Text>Dashboard</Text>
      </div>
      <div>
        <Link href={'/expenses'}>To Expenses</Link>
      </div>
    </Flex>
  );
}
