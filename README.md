# deno-cava

[cava](https://github.com/karlstav/cava) CLI bindings to
[Deno](https://deno.land/):

```ts
import { streamLines } from "https://deno.land/x/cava/mod.ts";

// deno-cava uses async iterators to stream the output of cava.
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

## contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

To run the demos, use the tasks provided in `tasks.json`:

```sh
deno task example:display # sideways visualizer

deno task example:numeral # display numbers corresponding to the frequency bands
```
