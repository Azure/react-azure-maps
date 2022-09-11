import { renderHook } from '@testing-library/react'
import React, { useContext } from 'react'
import atlas, { layer, Map } from 'azure-maps-control'
import { IAzureVectorTileSourceStatefulProviderProps } from '../types'
import { AzureMapsContext } from './AzureMapContext'
import { AzureMapVectorTileSourceProvider } from './AzureMapVectorTileSourceProvider'
import { AzureMapDataSourceContext } from '../contexts/AzureMapDataSourceContext'

const mapContextProps = {
  mapRef: null,
  isMapReady: false,
  setMapReady: jest.fn(),
  removeMapRef: jest.fn(),
  setMapRef: jest.fn()
}
const mapRef = new Map('fake', {})

const useContextConsumer = () => {
  const dataSourceContext = useContext(AzureMapDataSourceContext)
  return dataSourceContext
}

const wrapWithVectorTileSourceContext = (props: IAzureVectorTileSourceStatefulProviderProps) => ({
  children
}: {
  children?: any
}) => {
  return (
    <AzureMapsContext.Provider
      value={{
        ...mapContextProps,
        mapRef
      }}
    >
      <AzureMapVectorTileSourceProvider {...{ ...props }}>
        {children}
      </AzureMapVectorTileSourceProvider>
    </AzureMapsContext.Provider>
  )
}

describe('AzureMapVectorTileSourceProvider tests', () => {
  it('should create data source with passed id and options', () => {
    const { result } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithVectorTileSourceContext({ id: 'id', options: { minZoom: 0, maxZoom: 12 } })
    })

    expect(result.current.dataSourceRef?.getId()).toEqual('id')
    expect(result.current.dataSourceRef?.getOptions()).toEqual({ minZoom: 0, maxZoom: 12 })
  })

  it('should add data source to the map ref on mount', () => {
    mapRef.sources.add = jest.fn()
    const { result } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithVectorTileSourceContext({ id: 'id' })
    })
    expect(mapRef.sources.add).toHaveBeenCalledWith(result.current.dataSourceRef)
  })

  it('should add event to data source', () => {
    mapRef.events.add = jest.fn()
    renderHook(() => useContextConsumer(), {
      wrapper: wrapWithVectorTileSourceContext({
        id: 'id',
        events: { sourceadded: (source) => {} }
      })
    })
    expect(mapRef.events.add).toHaveBeenCalledWith(
      'sourceadded',
      expect.any(Object),
      expect.any(Function)
    )
  })

  it('should remove data source from the map ref on unmount', () => {
    mapRef.events.remove = jest.fn()
    const events = { sourceadded: () => {} }
    const { unmount, result } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithVectorTileSourceContext({ id: 'id', options: { option: 'option' }, events })
    })

    unmount()

    expect(mapRef.sources.remove).toHaveBeenCalledWith(result.current.dataSourceRef)
    expect(mapRef.events.remove).toHaveBeenCalledWith(
      'sourceadded',
      result.current.dataSourceRef,
      events.sourceadded
    )
  })

  it('should remove all layers that are using the same datasource from the map ref on unmount', () => {
    const dsToBeRemoved = new atlas.source.DataSource('ds_to_be_removed')
    const dsToKeep = new atlas.source.DataSource('ds_to_keep')

    const symbolLayer = new layer.SymbolLayer(dsToBeRemoved, 'layer_to_be_removed')
    const bubbleLayer = new layer.BubbleLayer(dsToKeep, 'layer_to_keep')

    symbolLayer.getSource = jest.fn(() => dsToBeRemoved)

    mapRef.layers.getLayers = jest.fn(() => [symbolLayer, bubbleLayer])

    const { unmount } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithVectorTileSourceContext({ id: dsToBeRemoved.getId() })
    })

    unmount()
    expect(mapRef.layers.remove).toHaveBeenCalledTimes(1)
    expect(mapRef.layers.remove).toHaveBeenNthCalledWith(1, 'layer_to_be_removed')
  })
})
