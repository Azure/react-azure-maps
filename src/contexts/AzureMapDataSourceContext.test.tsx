import { useContext } from 'react'
import { renderHook } from '@testing-library/react'
import atlas, { layer, Map } from 'azure-maps-control'
import React from 'react'
import { AzureMapsContext } from '../contexts/AzureMapContext'
import {
  AzureMapDataSourceProvider,
  AzureMapDataSourceContext
} from '../contexts/AzureMapDataSourceContext'
import { IAzureDataSourceStatefulProviderProps } from '../types'

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

const wrapWithDataSourceContext = (props: IAzureDataSourceStatefulProviderProps) => ({
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
      <AzureMapDataSourceProvider {...{ ...props }}>{children}</AzureMapDataSourceProvider>
    </AzureMapsContext.Provider>
  )
}

describe('AzureMapDataSourceProvider tests', () => {
  it('should add data source to the map ref on mount', () => {
    mapRef.sources.add = jest.fn()
    const { result } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithDataSourceContext({ id: 'id' })
    })
    expect(mapRef.sources.add).toHaveBeenCalledWith(result.current.dataSourceRef)
  })

  it('should add event to data source', () => {
    mapRef.events.add = jest.fn()
    renderHook(() => useContextConsumer(), {
      wrapper: wrapWithDataSourceContext({ id: 'id', events: { render: () => {} } })
    })
    expect(mapRef.events.add).toHaveBeenCalledWith(
      'render',
      expect.any(Object),
      expect.any(Function)
    )
  })

  it('should call importDataFromUrl if dataFromUrl was not falsy', () => {
    const { result } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithDataSourceContext({ id: 'id', dataFromUrl: 'dataFromUrl' })
    })
    expect(result.current.dataSourceRef).toBeInstanceOf(atlas.source.DataSource)
    expect(
      (result.current.dataSourceRef as atlas.source.DataSource).importDataFromUrl
    ).toHaveBeenCalledWith('dataFromUrl')
  })

  it('should call add collection if collection was not falsy', () => {
    const { result } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithDataSourceContext({ id: 'id', collection: [] })
    })
    expect(result.current.dataSourceRef).toBeInstanceOf(atlas.source.DataSource)
    const dataSourceRef = result.current.dataSourceRef as atlas.source.DataSource
    expect(dataSourceRef.add).toHaveBeenCalledWith([])
    expect(dataSourceRef.clear).toHaveBeenCalledWith()
  })

  it('should call add collection and clear method if collection was changed', () => {
    const { result, rerender } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithDataSourceContext({ id: 'id', collection: [] })
    })
    rerender({})
    expect(result.current.dataSourceRef).toBeInstanceOf(atlas.source.DataSource)
    const dataSourceRef = result.current.dataSourceRef as atlas.source.DataSource
    expect(dataSourceRef.add).toHaveBeenCalledTimes(2)
    expect(dataSourceRef.clear).toHaveBeenCalledTimes(1)
  })

  it('should call setOptions and clear method if options was changed', () => {
    const { result } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithDataSourceContext({ id: 'id', options: { option: 'option' } })
    })
    expect(result.current.dataSourceRef).toBeInstanceOf(atlas.source.DataSource)
    expect(
      (result.current.dataSourceRef as atlas.source.DataSource).setOptions
    ).toHaveBeenLastCalledWith({ option: 'option' })
  })

  it('should remove data source from the map ref on unmount', () => {
    mapRef.events.remove = jest.fn()
    const events = { render: () => {} }
    const { unmount, result } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithDataSourceContext({ id: 'id', options: { option: 'option' }, events })
    })

    unmount()

    expect(mapRef.sources.remove).toHaveBeenCalledWith(result.current.dataSourceRef)
    expect(mapRef.events.remove).toHaveBeenCalledWith(
      'render',
      result.current.dataSourceRef,
      events.render
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
      wrapper: wrapWithDataSourceContext({ id: dsToBeRemoved.getId() })
    })

    unmount()
    expect(mapRef.layers.remove).toHaveBeenCalledTimes(1)
    expect(mapRef.layers.remove).toHaveBeenNthCalledWith(1, 'layer_to_be_removed')
  })
})
