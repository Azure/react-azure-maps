import atlas from 'azure-maps-control'
import React, { useContext, useState } from 'react'
import { useCheckRef } from '../hooks/useCheckRef'
import {
  DataSourceType,
  IAzureMapsContextProps,
  IAzureMapSourceEventType,
  IAzureVectorTileSourceStatefulProviderProps,
  MapType
} from '../types'
import { AzureMapDataSourceRawProvider as Provider } from './AzureMapDataSourceContext'
import { AzureMapsContext } from './AzureMapContext'

/**
 * @param id datasource identifier
 * @param children layer providers representing datasource layers
 * @param options vector tile datasource options: see atlas.VectorTileSourceOptions
 * @param events a object containing sourceadded, sourceremoved event handlers
 */
const AzureMapVectorTileSourceStatefulProvider = ({
  id,
  children,
  options,
  events = {}
}: IAzureVectorTileSourceStatefulProviderProps) => {
  const [dataSourceRef] = useState<atlas.source.VectorTileSource>(
    new atlas.source.VectorTileSource(id, options)
  )
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  useCheckRef<MapType, DataSourceType>(mapRef, dataSourceRef, (mref, dref) => {
    for (const eventType in events) {
      const handler = events[eventType as IAzureMapSourceEventType] as (
        e: atlas.source.Source
      ) => void | undefined
      if (handler) {
        mref.events.add(eventType as IAzureMapSourceEventType, dref, handler)
      }
    }
    mref.sources.add(dref)

    return () => {
      for (const eventType in events || {}) {
        const handler = events[eventType as IAzureMapSourceEventType] as (
          e: atlas.source.Source
        ) => void | undefined
        if (handler) {
          mref.events.remove(eventType as IAzureMapSourceEventType, dref, handler)
        }
      }

      const getLayersDependingOnDatasource = (dst: DataSourceType) => {
        return mref.layers.getLayers().filter((l) => {
          if ((l as atlas.layer.SymbolLayer).getSource) {
            const sourceLayer = (l as atlas.layer.SymbolLayer).getSource()
            const dsId = typeof sourceLayer === 'string' ? sourceLayer : sourceLayer.getId()
            return dsId === dst.getId()
          }
          return false
        })
      }

      getLayersDependingOnDatasource(dref).forEach((l) => {
        mref.layers.remove(l.getId() ? l.getId() : l)
      })
      mref.sources.remove(dref)
    }
  })

  return (
    <Provider
      value={{
        dataSourceRef
      }}
    >
      {mapRef && children}
    </Provider>
  )
}

export { AzureMapVectorTileSourceStatefulProvider as AzureMapVectorTileSourceProvider }
