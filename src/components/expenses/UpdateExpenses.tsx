import { Flex, Button } from "@mantine/core"
import { ExpenseTableProps } from "./ExpenseTable"

export const UpdateExpenses = ({ selection }: ExpenseTableProps) => {
  const doUpdateRows = () => {
    // TODO: open modal
    // TODO: show selected items
    // TODO: allow user to select operation (tag / delete)
    // TODO: confirm / cancel
  }

  const isDisabled = () => {
    return selection.selectedRows.length <= 0;
  }

  return (<Flex gap={8} justify="flex-end">
    <Button
      disabled={isDisabled()}
      variant="filled"
      onClick={() => doUpdateRows()}>
        Update selected rows
    </Button>
    <Button
      disabled={isDisabled()}
      variant="subtle"
      type="reset"
      onClick={() => selection.setSelectedRows([])}>
        Clear selection ({selection.selectedRows.length})
    </Button>
  </Flex>);

}