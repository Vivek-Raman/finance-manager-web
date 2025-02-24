'use client';

import { Expense } from "@/types/Expense";
import { formatDate } from "@/utils/date";
import { Group, Pagination, Pill, Table } from "@mantine/core";
import { useEffect, useState } from "react";

export default function ExpenseTable() {
  const [data, setData] = useState<Expense[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const size = 25;

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/v1/expenses?page=${page-1}&size=${size}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(r => {
        return r.json();
      });
      setData(response.data);
      setTotal(response.total);
    })();
  }, [page]);

  const buildRows = () => {
    return data.map((row: Expense) =>
      <Table.Tr key={row.id}>
        <Table.Td>{row.summary}</Table.Td>
        <Table.Td>{row.amount}</Table.Td>
        <Table.Td>{formatDate(Date.parse(row.date!))}</Table.Td>
        <Table.Td>
          <Group>
            {/* TODO: Colour the pills */}
            {row.tags?.map(tag => <Pill key={tag}>{tag}</Pill>)}
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  };

  return (<>
    <Table p='md'>
      <Table.Thead>
          <Table.Tr>
            <Table.Th>Summary</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Tags</Table.Th>
          </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        { buildRows() }
      </Table.Tbody>
    </Table>
    <Pagination p='md'
      value={page}
      onChange={setPage}
      total={Math.ceil(total/size)} />
    </>
  );
}