export interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function overlaps(a: Box, b: Box) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}
