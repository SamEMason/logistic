export const formatTimestamp = (timestamp: number | null) => {
  return timestamp
    ? new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        hour12: false,
      }).format(timestamp)
    : 'Not Started';
};
