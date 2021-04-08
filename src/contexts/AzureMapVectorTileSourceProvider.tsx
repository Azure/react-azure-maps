import atlas from 'azure-maps-control'
import React, { useContext, useState } from 'react'
import { useCheckRef } from '../hooks/useCheckRef'
import { DataSourceType, IAzureDataSourceStatefulProviderProps, IAzureMapLayerEventType, IAzureMapsContextProps, IAzureMapSourceEventType, IAzureVectorTileSourceStatefulProviderProps, MapType } from '../types'
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
  events,
}: IAzureVectorTileSourceStatefulProviderProps) => {
  const [dataSourceRef] = useState<atlas.source.VectorTileSource>(new atlas.source.VectorTileSource(id, options))
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  useCheckRef<MapType, DataSourceType>(mapRef, dataSourceRef, (mref, dref) => {
    Object.entries(events || {}).filter(([_, handler]) => handler !== undefined).forEach(([eventType, handler]) => {
      mref.events.add(eventType as IAzureMapSourceEventType, dref, handler as (e: atlas.source.Source) => void)
    })
    mref.sources.add(dref)
  })

  return (
    <Provider
      value={{
        dataSourceRef,
      }}
    >
      {mapRef && children}
    </Provider>
  )
}

export { AzureMapVectorTileSourceStatefulProvider as AzureMapVectorTileSourceProvider }