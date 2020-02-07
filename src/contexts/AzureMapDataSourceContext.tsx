import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  IAzureDataSourceStatefulProviderProps,
  IAzureMapDataSourceProps,
  IAzureMapsContextProps
} from '../types'
import atlas from 'azure-maps-control'
import { AzureMapsContext } from './AzureMapContext'
import { DataSourceType, MapType } from '../types'
import { useCheckRef } from '../hooks/useCheckRef'

const AzureMapDataSourceContext = createContext<IAzureMapDataSourceProps>({
  dataSourceRef: null
})
const { Provider, Consumer: AzureMapDataSourceConsumer } = AzureMapDataSourceContext

const AzureMapDataSourceStatefulProvider = ({
  id,
  children,
  options,
  events
}: IAzureDataSourceStatefulProviderProps) => {
  const [dataSourceRef] = useState<atlas.source.DataSource>(
    new atlas.source.DataSource(id, options)
  )
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
        dataSourceRef
      }}
    >
      {mapRef && children}
    </Provider>
  )
}

export {
  AzureMapDataSourceContext,
  AzureMapDataSourceConsumer,
  AzureMapDataSourceStatefulProvider as AzureMapDataSourceProvider
}
