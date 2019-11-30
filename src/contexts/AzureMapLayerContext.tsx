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

const constructLayer = ({
  id,
  options,
  type,
  dataSourceRef
}: IAzureLayerStatefulProviderProps & { dataSourceRef: atlas.source.DataSource }) => {
  switch (type) {
    case 'SymbolLayer':
      return new atlas.layer.SymbolLayer(dataSourceRef, id, options)
    case 'HeatLayer':
      return new atlas.layer.HeatMapLayer(dataSourceRef, id, options)
    // case 'ImageLayer':
    //   return new atlas.layer.ImageLayer(options, id)
    case 'LineLayer':
      return new atlas.layer.LineLayer(dataSourceRef, id, options)
    case 'PolygonExtrusionLayer':
      return new atlas.layer.PolygonExtrusionLayer(dataSourceRef, id, options)
    case 'PolygonLayer':
      return new atlas.layer.PolygonLayer(dataSourceRef, id, options)
    // case 'TitleLayer':
    //   return new atlas.layer.TileLayer(options, id)
    default:
      return null
  }
}

const useAzureMapLayer = ({ id, options, type }: IAzureLayerStatefulProviderProps) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [layerRef, setLayerRef] = useState<atlas.layer.SymbolLayer | null>(null)

  useEffect(() => {
    const layer = dataSourceRef && constructLayer({ id, options, type, dataSourceRef })
    if (mapRef && layerRef && dataSourceRef && layer) {
      setLayerRef(layer)
      mapRef.layers.add(layerRef)
      return () => {
        mapRef.layers.remove(layerRef)
      }
    }
  }, [])

  return {
    layerRef
  }
}

const AzureMapLayerStatefulProvider = ({ id, options, type }: IAzureLayerStatefulProviderProps) => {
  const { layerRef } = useAzureMapLayer({ id, options, type })
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
