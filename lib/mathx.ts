// Shared number-theory helpers for the Math tools. Keeping them here means the
// fraction, LCM/GCD and prime tools all agree on the same implementations.

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  if (a === 0 || b === 0) return 0;
  return (a / gcd(a, b)) * b;
}

/** Reduce a fraction to lowest terms, keeping the sign on the numerator. */
export function reduceFraction(n: number, den: number): [number, number] {
  if (den === 0) return [n, 0];
  const g = gcd(n, den) || 1;
  let rn = n / g;
  let rd = den / g;
  if (rd < 0) { rn = -rn; rd = -rd; }
  return [rn, rd];
}

export function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n % 2 === 0) return n === 2;
  if (n % 3 === 0) return n === 3;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export function primeFactors(n: number): { p: number; exp: number }[] {
  n = Math.abs(Math.trunc(n));
  const out: { p: number; exp: number }[] = [];
  for (let p = 2; p * p <= n; p++) {
    if (n % p === 0) {
      let exp = 0;
      while (n % p === 0) { n /= p; exp++; }
      out.push({ p, exp });
    }
  }
  if (n > 1) out.push({ p: n, exp: 1 });
  return out;
}
