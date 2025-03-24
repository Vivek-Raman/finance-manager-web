'use client';

import ExpenseTable from "@/components/expenses/ExpenseTable";
import { UpdateExpenses } from "@/components/expenses/UpdateExpenses";
import { Expense } from "@/types/Expense";
import { Stack } from "@mantine/core";
import { useState } from "react";


export default function Expenses() {
  const [selectedRows, setSelectedRows] = useState<Expense[]>([]);
  return (<Stack>
    <UpdateExpenses selection={{ selectedRows, setSelectedRows }} />
    <ExpenseTable
      sort_by='Date'
      sort_dir='desc'
      tags={ [] }
      selection={{ selectedRows, setSelectedRows }} />
    <UpdateExpenses selection={{ selectedRows, setSelectedRows }} />
  </Stack>);
}
