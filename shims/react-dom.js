export function flushSync(fn) {
  if (typeof fn === 'function') fn();
}
export default {};
