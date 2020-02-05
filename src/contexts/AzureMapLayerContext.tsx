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
    case 'ImageLayer':
      return new atlas.layer.ImageLayer(options, id)
    case 'LineLayer':
      return new atlas.layer.LineLayer(dataSourceRef, id, options)
    case 'PolygonExtrusionLayer':
      return new atlas.layer.PolygonExtrusionLayer(dataSourceRef, id, options)
    case 'PolygonLayer':
      return new atlas.layer.PolygonLayer(dataSourceRef, id, options)
    case 'TitleLayer':
      return new atlas.layer.TileLayer(options, id)
    default:
      return null
  }
}

const useAzureMapLayer = ({ id, options, type, events }: IAzureLayerStatefulProviderProps) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [layerRef, setLayerRef] = useState<
    atlas.layer.SymbolLayer | atlas.layer.ImageLayer | atlas.layer.TileLayer | null
  >(null)

  useEffect(() => {
    if (dataSourceRef && !layerRef) {
      const layer = constructLayer({ id, options, type, dataSourceRef })
      setLayerRef(layer)
    }
  }, [dataSourceRef])

  useEffect(() => {
    if (mapRef && layerRef) {
      for (const eventType in events || {}) {
        // Hack for eventType
        mapRef.events.add(eventType as any, layerRef, events[eventType])
      }
      mapRef.layers.add(layerRef)
      return () => {
        mapRef.layers.remove(layerRef)
      }
    }
  }, [layerRef])

  return {
    layerRef
  }
}

const AzureMapLayerStatefulProvider = ({
  id,
  options,
  type,
  events
}: IAzureLayerStatefulProviderProps) => {
  const { layerRef } = useAzureMapLayer({ id, options, type, events })
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
