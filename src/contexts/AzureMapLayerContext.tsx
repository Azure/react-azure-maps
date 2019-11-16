import React, { Component, createContext, useContext, useState, useEffect } from 'react'
import {
  IAzureMapLayerProps,
  IAzureLayerStatefulProviderProps,
  IAzureMapsContextProps
} from '../types'
import atlas from 'azure-maps-control'
import { AzureMapsContext } from './AzureMapContext'
import { IAzureMapDataSourceProps } from '../types'
import { AzureMapDataSourceContext } from './AzureMapDataSourceContext'

const AzureMapLayerContext = createContext<IAzureMapLayerProps>({
  layerRef: null
})
const { Provider, Consumer: AzureMapLayerConsumer } = AzureMapLayerContext

const AzureMapLayerStatefulProvider = ({ id, options }: IAzureLayerStatefulProviderProps) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [layerRef, setLayerRef] = useState<atlas.layer.SymbolLayer | null>(null)

  useEffect(() => {
    if (mapRef && layerRef && dataSourceRef) {
      setLayerRef(new atlas.layer.SymbolLayer(dataSourceRef, id, options))
      mapRef.layers.add(layerRef)
      return () => {
        mapRef.layers.remove(layerRef)
      }
    }
  }, [])

  return (
    <Provider
      value={{
        layerRef
      }}
    ></Provider>
  )
}

export {
  AzureMapLayerContext,
  AzureMapLayerConsumer,
  AzureMapLayerStatefulProvider as AzureMapLayerProvider
}
