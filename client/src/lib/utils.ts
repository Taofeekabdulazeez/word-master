export async function wait(secs: number = 3000) {
  return new Promise((resolve) => setTimeout(resolve, secs));
}

export function assignRandomColor(): string {
  // add more colors here

  const colors = [
    "#673ab7",
    "#795548",
    "#4caf50",
    "#3f51b5",
    "#ff9800",
    "#9c27b0",
    "#2196f3",
    "#00bcd4",
    "#009688",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
