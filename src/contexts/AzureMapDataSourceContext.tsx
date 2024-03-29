import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  DataSourceType,
  IAzureDataSourceStatefulProviderProps,
  IAzureMapDataSourceProps,
  IAzureMapsContextProps,
  MapType
} from '../types'
import atlas from 'azure-maps-control'
import { AzureMapsContext } from './AzureMapContext'
import { useCheckRef } from '../hooks/useCheckRef'
import { getLayersDependingOnDatasource } from '../components/helpers/mapHelper'

const AzureMapDataSourceContext = createContext<IAzureMapDataSourceProps>({
  dataSourceRef: null
})
const { Provider, Consumer: AzureMapDataSourceConsumer } = AzureMapDataSourceContext

/**
 * @param id
 * @param children
 * @param options
 * @param events
 * @param dataFromUrl Async Data from URL
 * @param collection Use for contain Feature Collection !All Feature child will be ignored when collection value will change
 */
const AzureMapDataSourceStatefulProvider = ({
  id,
  children,
  options,
  events,
  dataFromUrl,
  collection
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
    if (dref instanceof atlas.source.DataSource) {
      if (dataFromUrl) {
        dref.importDataFromUrl(dataFromUrl)
      }
      if (collection) {
        dref.add(collection)
      }
    }
    return () => {
      for (const eventType in events || {}) {
        mref.events.remove(eventType as any, dref, events[eventType])
      }

      getLayersDependingOnDatasource(mref, dref).forEach((l) => {
        mref.layers.remove(l.getId() ? l.getId() : l)
      })
      mref.sources.remove(dref)
    }
  })

  useEffect(() => {
    if (dataSourceRef && collection) {
      // Cleared old values prevent duplication
      dataSourceRef.clear()
      dataSourceRef.add(collection)
    }
  }, [collection])

  useEffect(() => {
    if (dataSourceRef && options) {
      dataSourceRef.setOptions(options)
    }
  }, [options])

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
  AzureMapDataSourceStatefulProvider as AzureMapDataSourceProvider,
  Provider as AzureMapDataSourceRawProvider
}
