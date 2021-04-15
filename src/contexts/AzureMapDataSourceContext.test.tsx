import { useContext } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import atlas, { Map } from 'azure-maps-control'
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
    expect((result.current.dataSourceRef as atlas.source.DataSource).importDataFromUrl).toHaveBeenCalledWith('dataFromUrl')
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
    const { result, rerender } = renderHook(() => useContextConsumer(), {
      wrapper: wrapWithDataSourceContext({ id: 'id', options: { option: 'option' } })
    })
    expect(result.current.dataSourceRef).toBeInstanceOf(atlas.source.DataSource)
    expect((result.current.dataSourceRef as atlas.source.DataSource).setOptions).toHaveBeenLastCalledWith({ option: 'option' })
  })
})
