export const byDate = (a:Project , b:Project) => new Date(a.pushed_at) < new Date(b.pushed_at) ? 1 : -1
export const byName = (a:Project , b:Project) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
export const byDateReverse = (a:Project , b:Project) => new Date(a.pushed_at) > new Date(b.pushed_at) ? 1 : -1
