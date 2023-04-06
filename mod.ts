interface Config {
  bars: number;
}

export function toConfig(config?: Partial<Config>): string {
  return `[general]
bars = ${config?.bars ?? 30}
[output]
method = raw
raw_target = /dev/stdout
bit_format = 16bit`.trim();

}

export async function* streamLines(config = toConfig()) {
  const tempConfig = await Deno.makeTempFile({
    prefix: "cava-config",
    suffix: ".ini",
  });

  await Deno.writeTextFile(tempConfig, config);

  // run cava with the temp config file
  const cava = Deno.run({
    cmd: ["cava", "-p", tempConfig],
    stdout: "piped",
    stderr: "piped",
  });

  // read the output of cava
  const buf = new Uint8Array(60);
  while (true) {
    const n = await cava.stdout.read(buf);
    if (n === null) {
      break;
    }
    const sample = new Uint16Array(buf.buffer, 0, 30);
    yield sample;
  }

  await cava.status();

  await Deno.remove(tempConfig);
}
