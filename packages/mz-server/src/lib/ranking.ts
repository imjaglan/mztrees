const G = 0.35

export function calculateScore(likes: number, hourAge: number) {
  return likes / Math.pow(hourAge + 2, G)
}
