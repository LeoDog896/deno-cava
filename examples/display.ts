import { streamLines } from "../mod.ts";

function percentageToBar(
  percent: number,
  width = Math.floor(2 * Deno.consoleSize().columns / 3),
): string {
  const bar = "▏▎▍▌▋▊▉█";
  const amount = width * (percent / 100);

  // amount % 1 = the remainder of the division
  const topBar = bar[Math.floor(amount % 1 * (bar.length - 1))];

  return "█".repeat(Math.floor(amount)) + topBar;
}

for await (const line of streamLines()) {
  const arr = [...line];

  // find the max value in the array
  const max = Math.max(...arr);

  const percentage = arr.map((n) => max === 0 ? 0 : Math.round(n / max * 100));

  const data = percentage.map((x) => percentageToBar(x));

  console.clear();
  console.log(data.join("\n"));
  console.log("\n");
}
