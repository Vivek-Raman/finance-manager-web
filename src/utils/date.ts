export const formatDate = (date: number) => {
  return Intl.DateTimeFormat('en-US', { dateStyle: 'medium', })
    .format(date);
}
