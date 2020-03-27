import { renderHook } from '@testing-library/react-hooks'
import { useCheckRef, useCheckRefMount } from './useCheckRef'

describe('useCheckRef tests', () => {
  it('should make proper checks with on ref change and run callback if both deps are not falsy', async () => {
    const callback = jest.fn((depr, onr) => {})
    renderHook(() => useCheckRef<boolean, boolean>(true, true, callback))
    expect(callback).toHaveBeenCalled()
  })

  it('should make proper checks with on ref change and not run callback if one of deps is falsy', async () => {
    const callback = jest.fn((depr, onr) => {})
    renderHook(() => useCheckRef<boolean, boolean>(true, false, callback))
    expect(callback).not.toHaveBeenCalled()
  })
})

describe('useCheckRefMount tests', () => {
  it('should make proper checks on mount and run callback if both deps are not falsy', async () => {
    const callback = jest.fn((depr, onr) => {})
    renderHook(() => useCheckRefMount<boolean, boolean>(true, true, callback))
    expect(callback).toHaveBeenCalled()
  })

  it('should make proper checks on mount and not run callback if one of deps is falsy', async () => {
    const callback = jest.fn((depr, onr) => {})
    renderHook(() => useCheckRefMount<boolean, boolean>(true, false, callback))
    expect(callback).not.toHaveBeenCalled()
  })
})
