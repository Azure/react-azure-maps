import { useEffect } from 'react'

export function useCheckRef<T, T1>(
  dep: T | null,
  on: T1 | null,
  callback: (dep: T, on: T1) => void
) {
  useEffect(() => {
    if (dep && on) {
      return callback(dep, on)
    }
  }, [on])
}

export function useCheckRefMount<T, T1>(
  dep: T | null,
  on: T1 | null,
  callback: (dep: T, on: T1) => void
) {
  useEffect(() => {
    if (dep && on) {
      return callback(dep, on)
    }
  }, [])
}
