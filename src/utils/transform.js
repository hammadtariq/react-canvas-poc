export function decompose(me) {
  const { a, b, c, d } = me;
  const { acos, atan, sqrt } = Math;

  const pi = Math.PI;
  const translate = { x: me.e, y: me.f };
  let rotation = 0;
  let scale = { x: 1, y: 1 };
  const skew = { x: 0, y: 0 };
  const determ = a * d - b * c; // determinant(), skip DRY here...

  if (a || b) {
    const r = sqrt(a * a + b * b);
    rotation = b > 0 ? acos(a / r) : -acos(a / r);
    scale = { x: r, y: determ / r };
    skew.x = atan((a * c + b * d) / (r * r));
  } else if (c || d) {
    const s = sqrt(c * c + d * d);
    rotation = pi * 0.5 - (d > 0 ? acos(-c / s) : -acos(c / s));
    scale = { x: determ / s, y: s };
    skew.y = atan((a * c + b * d) / (s * s));
  } else {
    // a = b = c = d = 0
    scale = { x: 0, y: 0 }; // = invalid matrix
  }

  return {
    scale,
    position: translate,
    rotation,
    skew,
  };
}

export function parseTransform(string) {
  const parts = string.split(",");
  return {
    a: parseFloat(parts[0]),
    b: parseFloat(parts[1]),
    c: parseFloat(parts[2]),
    d: parseFloat(parts[3]),
    e: parseFloat(parts[4]),
    f: parseFloat(parts[5]),
  };
}
