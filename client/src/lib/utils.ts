export async function wait(secs: number = 3000) {
  return new Promise((resolve) => setTimeout(resolve, secs));
}
