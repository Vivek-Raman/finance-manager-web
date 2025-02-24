'use client';

import { Tabs, Title } from '@mantine/core';

export default function Test() {
  return (
    <>
      <Title>Dashboard</Title>
      <Tabs
        keepMounted={false} defaultValue={'something'}
        // value={params.get('tabname') as string}
        // onChange={value => router.push(`/dashboard/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value='something'>Something</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='something'>
          <div>asd</div>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
