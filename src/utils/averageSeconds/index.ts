export function averageSeconds(timestamps: number[]) {
  if (timestamps.length < 2) {
    throw new Error("At least two timestamps are required.");
  }

  const timestampsFlipped = timestamps.reverse();

  // Calculate the differences between consecutive timestamps
  let totalDifference = 0;
  for (let i = 1; i < timestampsFlipped.length; i++) {
    totalDifference += timestampsFlipped[i]! - timestampsFlipped[i - 1]!;
  }

  // Compute the average time interval in milliseconds
  const averageDifference = totalDifference / (timestamps.length - 1);

  // Convert milliseconds to seconds
  return Math.ceil(averageDifference / 1000);
}
