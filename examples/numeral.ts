import { streamLines } from "../mod.ts";

for await (const line of streamLines()) {
    // format each number in the array as a 6 digit number (leading zeros)
    const formatted = [...line].map(n => n.toString().padStart(6, "0")).join(" ");
    console.log(formatted);
}