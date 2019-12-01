import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  IAzureLayerStatefulProviderProps,
  IAzureMapDataSourceProps,
  IAzureMapLayerProps,
  IAzureMapsContextProps
} from '../types'
import atlas from 'azure-maps-control'
import { AzureMapsContext } from './AzureMapContext'
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
    if (dataSourceRef && !layerRef) {
      setLayerRef(new atlas.layer.SymbolLayer(dataSourceRef, id, options))
    }
  }, [dataSourceRef])

  useEffect(() => {
    if (mapRef && layerRef && dataSourceRef) {
      mapRef.layers.add(layerRef)
      return () => {
        mapRef.layers.remove(layerRef)
      }
    }
  }, [layerRef])

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
