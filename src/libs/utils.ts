export function handleMetaInfo(metas: Array<object>) {
  return metas
    .map((m: any) => {
      const params = Object.keys(m)
        .map((k) => `${k}="${m[k]}"`)
        .join(" ");
      return `<meta ${params} meta-server-render />`;
    })
    .join("\n");
}
