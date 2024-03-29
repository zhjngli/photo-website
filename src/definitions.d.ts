declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
