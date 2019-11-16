import React, { Component, createContext, useState, useContext, useEffect } from 'react'
import { IAzureMapDataSourceProps, IAzureDataSourceStatefulProviderProps } from '../types'
import atlas from 'azure-maps-control'
import { AzureMapsContext } from './AzureMapContext'
import { IAzureMapsContextProps } from '../types'

const AzureMapDataSourceContext = createContext<IAzureMapDataSourceProps>({
  dataSourceRef: null
})
const { Provider, Consumer: AzureMapDataSourceConsumer } = AzureMapDataSourceContext

const AzureMapDataSourceStatefulProvider = ({
  id,
  children,
  options
}: IAzureDataSourceStatefulProviderProps) => {
  const [dataSourceRef] = useState<atlas.source.DataSource>(
    new atlas.source.DataSource(id, options)
  )
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)

  useEffect(() => {
    if (mapRef && dataSourceRef) {
      mapRef.sources.add(dataSourceRef)
      return () => {
        mapRef.sources.remove(dataSourceRef)
      }
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
