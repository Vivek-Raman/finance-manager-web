'use client';

import { Expense } from "@/types/Expense";
import { formatDate } from "@/utils/date";
import { Checkbox, Flex, Group, Pagination, Pill, Skeleton, Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { JSX, useEffect, useState } from "react";

export interface ExpenseTableProps {
  selection: { selectedRows: Expense[], setSelectedRows: Function }
  sort_by?: string;
  sort_dir?: string;
  tags?: string;
}

export default function ExpenseTable(props: ExpenseTableProps) {
  const { selection } = props;
  const { sort_by, sort_dir, tags } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Expense[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const size = 25;

  useEffect(() => {
    fetchExpenses();
  }, [page]);

  const fetchExpenses = async () => {
    setLoading(true);
    let urlPath = `/api/v1/expenses?page=${page-1}&size=${size}`;
    sort_by && (urlPath += `&sort_by=${sort_by}`);
    sort_dir && (urlPath += `&sort_dir=${sort_dir}`);
    tags && (urlPath += `&tags=${tags}`);

    const response = await fetch(urlPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(r => {
      return r.json();
    }).catch(err => {
      notifications.show({
        message: 'Failed to fetch expenses',
        content: 'asd',
      });
    });
    if (!response || !response.data) {
      notifications.show({
        message: 'Failed to fetch expenses',
        content: 'asd',
      });
      return;
    }
    setData(response.data);
    setTotal(response.total);
    setLoading(false);
  };

  const buildRows = () => {
    if (loading) {
      const rows: JSX.Element[] = [];
      for (let i = 0; i < size; ++i) {
        rows.push(<Table.Tr key={i}>
          <Table.Td><Skeleton height={16} radius={16} /></Table.Td>
          <Table.Td><Skeleton height={16} width={48} radius={16} /></Table.Td>
          <Table.Td><Skeleton height={16} radius={16} /></Table.Td>
          <Table.Td>
            <Flex gap={8}>
              <Skeleton height={16} radius={16} width={48} />
              {new Array(Math.floor(Math.random() * 3)).fill(0).map((_, index) =>
                <Skeleton key={index} height={16} radius={16} width={48} />
              )}
            </Flex>
          </Table.Td>
          <Table.Td>
            <Skeleton height={24} width={24} radius={4} />
          </Table.Td>
        </Table.Tr>);
      }
      return rows;
    }

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
        <Table.Td>
          <Checkbox
            aria-label="Select row"
            checked={selection.selectedRows.includes(row)}
            onChange={(event) =>
              selection.setSelectedRows(
                event.currentTarget.checked
                  ? [...selection.selectedRows, row]
                  : selection.selectedRows.filter(r => r !== row)
              )
            }
          />
        </Table.Td>
      </Table.Tr>
    );
  };

  return (<>
    <Table
        stickyHeader stickyHeaderOffset='60'
        highlightOnHover>
      <Table.Thead>
          <Table.Tr>
            <Table.Th>Summary</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Tags</Table.Th>
            <Table.Th>Action</Table.Th>
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
