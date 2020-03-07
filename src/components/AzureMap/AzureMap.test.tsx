import React from 'react'
import { render, act } from '@testing-library/react'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import AzureMap from './AzureMap'
import { Map } from 'azure-maps-control'
import { IAzureMap, IAzureMapsContextProps } from '../../types'

const mapContextProps = {
  mapRef: null,
  isMapReady: false,
  setMapReady: jest.fn(),
  removeMapRef: jest.fn(),
  setMapRef: jest.fn()
}

const wrapWithAzureMapContext = (mapContextProps: IAzureMapsContextProps, mapProps: IAzureMap) => {
  return (
    <AzureMapsContext.Provider
      value={{
        ...mapContextProps
      }}
    >
      <AzureMap {...mapProps} />
    </AzureMapsContext.Provider>
  )
}

describe('AzureMap Component', () => {
  beforeEach(() => {
    mapContextProps.removeMapRef.mockClear()
    mapContextProps.setMapReady.mockClear()
    mapContextProps.removeMapRef.mockClear()
  })

  it('should setMapRef on mount', () => {
    act(() => {
      render(wrapWithAzureMapContext(mapContextProps, {}))
    })
    expect(mapContextProps.setMapRef).toHaveBeenCalled()
  })

  it('should change trafficOptions call setTraffic from mapRef', () => {
    const mapRef = new Map('fake', {})
    act(() => {
      const { rerender } = render(wrapWithAzureMapContext({ ...mapContextProps, mapRef }, {}))
      rerender(
        wrapWithAzureMapContext(
          { ...mapContextProps, mapRef },
          { trafficOptions: { some: 'some2' } }
        )
      )
    })
    expect(mapRef.setTraffic).toHaveBeenCalledWith({ some: 'some2' })
  })
})
