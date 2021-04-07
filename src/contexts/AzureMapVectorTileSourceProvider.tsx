import atlas from 'azure-maps-control'
import React, { useContext, useState } from 'react'
import { useCheckRef } from '../hooks/useCheckRef'
import { DataSourceType, IAzureDataSourceStatefulProviderProps, IAzureMapsContextProps, MapType } from '../types'
import { AzureMapDataSourceRawProvider as Provider } from './AzureMapDataSourceContext'
import { AzureMapsContext } from './AzureMapContext'

const AzureMapVectorTileSourceStatefulProvider = ({
  id,
  children,
  options,
  events,
}: IAzureDataSourceStatefulProviderProps) => {
  const [dataSourceRef] = useState<atlas.source.VectorTileSource>(new atlas.source.VectorTileSource(id, options))
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  useCheckRef<MapType, DataSourceType>(mapRef, dataSourceRef, (mref, dref) => {
    for (const eventType in events || {}) {
      mref.events.add(eventType as any, dref, events[eventType])
    }
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