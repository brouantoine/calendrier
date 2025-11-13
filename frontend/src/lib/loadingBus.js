const listeners = new Set()
export function setLoading(v){ listeners.forEach(fn=>fn(v)) }
export function onLoading(fn){ listeners.add(fn); return ()=>listeners.delete(fn) }
