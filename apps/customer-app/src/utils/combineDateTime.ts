function combineDateTime(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): { startDateTime: string; endDateTime: string } {
  // Helper function to combine date and time
  const combine = (dateStr: string, timeStr: string): string => {
    const datePart = new Date(dateStr).toISOString().split("T")[0];
    const timePart = new Date(timeStr).toISOString().split("T")[1];
    return `${datePart}T${timePart}`;
  };

  return {
    startDateTime: combine(startDate, startTime),
    endDateTime: combine(endDate, endTime),
  };
}
