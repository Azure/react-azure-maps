import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  IAzureDataSourceStatefulProviderProps,
  IAzureMapDataSourceProps,
  IAzureMapsContextProps
} from '../types'
import atlas from 'azure-maps-control'
import { AzureMapsContext } from './AzureMapContext'

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

  useEffect(() => {
    if (mapRef && dataSourceRef) {
      for (const eventType in events || {}) {
        mapRef.events.add(eventType as any, dataSourceRef, events[eventType])
      }
      mapRef.sources.add(dataSourceRef)
    }
  }, [])

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
