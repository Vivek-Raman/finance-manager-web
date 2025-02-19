'use client';

import { Expense } from '@/types/Expense';
import { Table, TableData } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function Test() {
  const [data, setData] = useState<Expense[]>([]);
  const [page, setPage] = useState<number>(0);

  const buildRows = () => {
    return data.map((row: Expense) =>
    <Table.Tr>
      <Table.Td>{row.summary}</Table.Td>
    </Table.Tr>)
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/v1/expenses?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(r => {
        return r.json();
      });
      const oldData: Expense[] = data;
      oldData.push(...response.data);
      setPage(response.data.page + 1);
      setData(oldData);
    })();
  }, []);

  return (
    <Table>
      <Table.Thead>
          <Table.Tr>
            <Table.Th>
              qwe
            </Table.Th>
          </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        { buildRows() }
      </Table.Tbody>
    </Table>
  );
}
