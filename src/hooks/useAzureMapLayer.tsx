import React, { useContext, useEffect, useState } from 'react'
import {
  IAzureLayerStatefulProviderProps,
  IAzureMapDataSourceProps,
  IAzureMapsContextProps,
  LayerType,
  DataSourceType
} from '../types'
import atlas from 'azure-maps-control'
import { AzureMapsContext } from '../contexts/AzureMapContext'
import { AzureMapDataSourceContext } from '../contexts/AzureMapDataSourceContext'
import { useCheckRef } from './useCheckRef'
import { MapType } from '../types'

const layer = atlas.layer

export const constructLayer = (
  { id, options, type, CustomkLayer }: IAzureLayerStatefulProviderProps,
  dataSourceRef: atlas.source.DataSource
) => {
  switch (type) {
    case 'SymbolLayer':
      return new layer.SymbolLayer(dataSourceRef, id, options)
    case 'HeatLayer':
      return new layer.HeatMapLayer(dataSourceRef, id, options)
    case 'ImageLayer':
      return new layer.ImageLayer(options, id)
    case 'LineLayer':
      return new layer.LineLayer(dataSourceRef, id, options)
    case 'PolygonExtrusionLayer':
      return new layer.PolygonExtrusionLayer(dataSourceRef, id, options)
    case 'PolygonLayer':
      return new layer.PolygonLayer(dataSourceRef, id, options)
    case 'TileLayer':
      return new layer.TileLayer(options, id)
    case 'BubbleLayer':
      return new layer.BubbleLayer(dataSourceRef, id, options)
    case 'custom':
      return CustomkLayer ? new CustomkLayer(dataSourceRef, id, options) : null
    default:
      return null
  }
}

export const useAzureMapLayer = ({
  id,
  options,
  type,
  events,
  lifecycleEvents
}: IAzureLayerStatefulProviderProps) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [layerRef, setLayerRef] = useState<LayerType | null>(null)

  useCheckRef<boolean, DataSourceType>(!layerRef, dataSourceRef, (...[, ref]) => {
    const layer = constructLayer({ id, options, type }, ref)
    setLayerRef(layer as LayerType)
  })

  useCheckRef<MapType, LayerType>(mapRef, layerRef, (mref, lref) => {
    for (const eventType in events) {
      mref.events.add(eventType as any, lref, events[eventType])
    }
    for (const event in lifecycleEvents) {
      mref.events.add(event as any, lref, lifecycleEvents[event])
    }
    mref.layers.add(lref)
    return () => {
      mref.layers.remove(lref)
    }
  })

  useEffect(() => {
    if (layerRef) {
      layerRef.setOptions(options)
    }
  }, [options])

  return {
    layerRef
  }
}
