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

const useAzureMapLayer = ({ id, options, type }: IAzureLayerStatefulProviderProps) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [layerRef, setLayerRef] = useState<
    atlas.layer.SymbolLayer | atlas.layer.ImageLayer | atlas.layer.TileLayer | null
  >(null)

  useEffect(() => {
    console.log('DATA SOURCE CHANGE IN LAYER')
    if (dataSourceRef && !layerRef && mapRef) {
      const layer = constructLayer({ id, options, type, dataSourceRef })
      setLayerRef(layer)
    }
    return () => {
      console.log('DATA SOURCE CHANGED RETURN')
    }
  }, [dataSourceRef])

  useEffect(() => {
    console.log('LAYER CHAGNE')
    if (mapRef && layerRef) {
      console.log('LAYERR ADD')
      mapRef.layers.add(layerRef)
    }
    return () => {
      console.log('TRY LAYER REMOVE')

      if (!dataSourceRef && layerRef && mapRef) {
        console.log('LAYER REMOVE')
        mapRef.layers.remove(layerRef)
      }
    }
  }, [layerRef])

  useEffect(() => {
    return () => {
      console.log('TRY LAYER REMOVE')

      if (layerRef && mapRef) {
        console.log('LAYER REMOVE')
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
