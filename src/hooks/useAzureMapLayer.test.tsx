import atlas, { source, layer } from 'azure-maps-control'
import { ReactNode } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useAzureMapLayer } from './useAzureMapLayer'
import { Map } from 'azure-maps-control'
import React from 'react'
import { AzureMapsContext } from '../contexts/AzureMapContext'
import { AzureMapDataSourceContext } from '../contexts/AzureMapDataSourceContext'
import { IAzureLayerStatefulProviderProps, LayerType } from '../types'

const mapContextProps = {
  mapRef: null,
  isMapReady: false,
  setMapReady: jest.fn(),
  removeMapRef: jest.fn(),
  setMapRef: jest.fn()
}
const mapRef = new Map('fake', {})

const wrapWithAzureMapContext = ({ children }: { children?: ReactNode | null }) => {
  const datasourceRef = {} as source.DataSource
  return (
    <AzureMapsContext.Provider
      value={{
        ...mapContextProps,
        mapRef
      }}
    >
      <AzureMapDataSourceContext.Provider
        value={{
          dataSourceRef: datasourceRef
        }}
      >
        {children}
      </AzureMapDataSourceContext.Provider>
    </AzureMapsContext.Provider>
  )
}

describe('useAzureMapLayer tests', () => {
  it('should create custom layer on callback', () => {
    const customLayerRef = { getId: jest.fn() }
    const useAzureMapLayerProps: IAzureLayerStatefulProviderProps = {
      type: 'custom',
      // We need to pas as any because of LayerEvents
      onCreateCustomLayer: jest.fn((dref, mref) => customLayerRef as any)
    }
    const { result } = renderHook(() => useAzureMapLayer(useAzureMapLayerProps), {
      wrapper: wrapWithAzureMapContext
    })
    expect(useAzureMapLayerProps.onCreateCustomLayer).toHaveBeenCalled()
    expect(result.current.layerRef).toEqual(customLayerRef)
  })

  it('should create standard layer and set ref', () => {
    const { result } = renderHook(
      () =>
        useAzureMapLayer({
          type: 'SymbolLayer',
          id: 'id',
          options: { option1: 'option1' }
        }),
      { wrapper: wrapWithAzureMapContext }
    )
    expect(result.current.layerRef).toEqual({
      datasourceRef: {
        option1: 'option1'
      },
      getId: expect.any(Function),
      id: 'id',
      layer: 'SymbolLayer',
      options: {},
      setOptions: expect.any(Function)
    })
  })

  it('should handle add events to layerRef', () => {
    mapRef.events.add = jest.fn()
    const events = { click: () => {} }
    renderHook(
      () =>
        useAzureMapLayer({
          type: 'SymbolLayer',
          id: 'id',
          events
        }),
      { wrapper: wrapWithAzureMapContext }
    )
    expect(mapRef.events.add).toHaveBeenCalledWith('click', expect.any(Object), events.click)
  })

  it('should handle add lifeCycleEvents to layerRef', () => {
    mapRef.events.add = jest.fn()
    const lifecycleEvents = { onCreate: () => {} }
    renderHook(
      () =>
        useAzureMapLayer({
          type: 'SymbolLayer',
          id: 'id',
          lifecycleEvents
        }),
      { wrapper: wrapWithAzureMapContext }
    )
    expect(mapRef.events.add).toHaveBeenCalledWith(
      'onCreate',
      expect.any(Object),
      lifecycleEvents.onCreate
    )
  })

  it('shouldRemove layer from map on unmoun', () => {
    mapRef.layers.remove = jest.fn()
    const { unmount } = renderHook(
      () =>
        useAzureMapLayer({
          type: 'SymbolLayer'
        }),
      { wrapper: wrapWithAzureMapContext }
    )
    unmount()
    expect(mapRef.layers.remove).toHaveBeenCalledWith(expect.any(Object))
  })

  it('should update options on change and call setOptions on layerRef', () => {
    const { result, rerender } = renderHook(
      () =>
        useAzureMapLayer({
          type: 'SymbolLayer',
          options: {
            option: 'option'
          }
        }),
      { wrapper: wrapWithAzureMapContext }
    )

    rerender({
      options: {
        newOption: 'new'
      }
    })
    expect(result.current.layerRef?.setOptions).toHaveBeenCalledTimes(2)
  })
})
