# deno-cava

cava cli bindings to deno:

```ts
// deno-cava uses async iterators to stream the output of cava.
import { streamLines } from "https://deno.land/x/cava/mod.ts";

for await (const line of streamLines()) {
  // format each number in the array as a 6 digit number (leading zeros)
  const formatted = [...line].map((n) => n.toString().padStart(6, "0")).join(
    " ",
  );
  console.log(formatted);
}
```

## permissions

This requires write access to `/tmp` (for storing the config file) and run
access to `cava`:

```sh
deno run --allow-write=/tmp --allow-run=cava https://deno.land/x/cava/mod.ts
```
