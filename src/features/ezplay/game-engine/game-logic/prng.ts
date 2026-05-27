/**
 * A Mulberry32 pseudo-random number generator.
 * It's a simple, fast, and effective PRNG for non-cryptographic purposes.
 * 
 * @param seed The starting seed.
 * @returns An object containing the random value (0-1) and the next seed.
 */
export function nextRandom(seed: number): { value: number; nextSeed: number } {
    // This is a stateful algorithm, so the new seed must be captured and used for the next call.
    let t = seed + 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    const value = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    return { value, nextSeed: t };
}
