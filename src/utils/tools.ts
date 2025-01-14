export const waitFor = (ms: number) => {
  return new Promise((res) => setTimeout(res, (Math.random() * ms) >>> 0));
};
