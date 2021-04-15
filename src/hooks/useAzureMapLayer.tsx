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

export const constructLayer = (
  { id, options = {}, type }: Omit<IAzureLayerStatefulProviderProps, 'onCreateCustomLayer'>,
  dataSourceRef: DataSourceType
) => {
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
    case 'TileLayer':
      return new atlas.layer.TileLayer(options, id)
    case 'BubbleLayer':
      return new atlas.layer.BubbleLayer(dataSourceRef, id, options)
    default:
      return null
  }
}

export const useAzureMapLayer = ({
  id,
  options,
  type,
  events,
  lifecycleEvents,
  onCreateCustomLayer
}: IAzureLayerStatefulProviderProps) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [layerRef, setLayerRef] = useState<LayerType | null>(null)

  useCheckRef<boolean, DataSourceType>(!layerRef, dataSourceRef, (...[, ref]) => {
    let layer = null
    if (type === 'custom') {
      layer = onCreateCustomLayer && onCreateCustomLayer(ref, mapRef)
    } else {
      layer = constructLayer({ id, options, type }, ref)
    }
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
      try {
        mref.layers.remove(lref.getId() ? lref.getId() : lref)
      } catch (e) {
        console.error('Error on remove layer', e)
      }
    }
  })

  useEffect(() => {
    if (layerRef && options) {
      layerRef.setOptions(options)
    }
  }, [options])

  return {
    layerRef
  }
}
