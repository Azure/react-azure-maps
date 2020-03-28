import { ReactNode } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Map } from 'azure-maps-control'
import React from 'react'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { useCreatePopup } from './useCreateAzureMapPopup'

const mapContextProps = {
  mapRef: null,
  isMapReady: false,
  setMapReady: jest.fn(),
  removeMapRef: jest.fn(),
  setMapRef: jest.fn()
}
const mapRef = new Map('fake', {})

const wrapWithAzureMapContext = ({ children }: { children?: ReactNode | null }) => {
  return (
    <AzureMapsContext.Provider
      value={{
        ...mapContextProps,
        mapRef
      }}
    >
      {children}
    </AzureMapsContext.Provider>
  )
}

describe('useCreatePopup tests', () => {
  it('should create popup with options', () => {
    const popupProps = {
      options: {},
      popupContent: <div></div>,
      isVisible: false
    }
    const { result } = renderHook(() => useCreatePopup(popupProps), {
      wrapper: wrapWithAzureMapContext
    })
    expect(result.current.setOptions).toHaveBeenCalled()
    expect(result.current).toEqual({
      setOptions: expect.any(Function),
      isOpen: expect.any(Function),
      open: expect.any(Function),
      close: expect.any(Function)
    })
  })

  it('should create popup with options and open it if isVisible is true', () => {
    const popupProps = {
      options: {},
      popupContent: <div></div>,
      isVisible: true
    }
    const { result } = renderHook(() => useCreatePopup(popupProps), {
      wrapper: wrapWithAzureMapContext
    })
    expect(result.current.open).toHaveBeenCalledWith(mapRef)
  })
})
