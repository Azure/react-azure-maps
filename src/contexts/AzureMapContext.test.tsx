import { useContext } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { Map } from 'azure-maps-control'
import React from 'react'
import { AzureMapsContext, AzureMapsProvider } from '../contexts/AzureMapContext'
import { IAzureMapsContextProps } from '../types'

const mapContextProps = {
  mapRef: null,
  isMapReady: false,
  setMapReady: jest.fn(),
  removeMapRef: jest.fn(),
  setMapRef: jest.fn()
}
const mapRef = new Map('fake', {})

const useContextConsumer = () => {
  const mapContext = useContext(AzureMapsContext)
  return mapContext
}

const wrapDataWithAzureMapsContext = ({ children }: { children?: any }) => {
  return <AzureMapsProvider>{children}</AzureMapsProvider>
}

describe('AzureMapDataSourceProvider tests', () => {
  it('should add data source to the map ref on mount', async () => {
    mapRef.sources.add = jest.fn()
    const { result } = renderHook(() => useContextConsumer(), {
      wrapper: wrapDataWithAzureMapsContext
    })
    result.current.setMapRef(mapRef)
    result.current.setMapReady(true)
    expect(result.current.mapRef).toEqual(mapRef)
  })

  it('should clear on removeMapRef', async () => {
    mapRef.sources.add = jest.fn()
    const { result } = renderHook(() => useContextConsumer(), {
      wrapper: wrapDataWithAzureMapsContext
    })
    result.current.removeMapRef()
    expect(result.current.mapRef).toEqual(null)
  })
})
