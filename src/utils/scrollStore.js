const positions = new Map();
const frozenKeys = new Set();

export function saveScrollPosition(key, top) {
  if (!frozenKeys.has(key)) positions.set(key, top);
}

export function freezeScrollPosition(key, top) {
  positions.set(key, top);
  frozenKeys.add(key);
}

export function readScrollPosition(key) {
  const top = positions.get(key) ?? 0;
  frozenKeys.delete(key);
  return top;
}
