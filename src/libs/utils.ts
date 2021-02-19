interface IHead {
  title?: string;
  metas: Array<{
    [prop: string]: any;
  }>;
}

type HeadFunc = () => IHead;

export function handleHeadInfo(head: HeadFunc | IHead | undefined) {
  const headInfo = { title: "", metas: "" };

  let headResult: IHead;
  if (typeof head === "undefined") return headInfo;
  else if (typeof head === "function") headResult = head();
  else if (typeof head === "object") headResult = head;
  else throw new Error("head must be function or object!");

  const metas = headResult.metas || [];
  headInfo.metas = metas
    .map((m: any) => {
      const params = Object.keys(m)
        .map((k) => `${k}="${m[k]}"`)
        .join(" ");
      return `<meta ${params} meta-server-render />`;
    })
    .join("\n");
  headInfo.title = headResult.title || "";

  return headInfo;
}
