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
  options
}: IAzureDataSourceStatefulProviderProps) => {
  const [dataSourceRef] = useState<atlas.source.DataSource>(
    new atlas.source.DataSource(id, options)
  )
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)

  useEffect(() => {
    if (mapRef && dataSourceRef) {
      console.log('DATA SOURCE ADD')
      mapRef.sources.add(dataSourceRef)
    }
    return () => {
      console.log('TRIED REMOVE DATA SOURCE')

      // if (mapRef && dataSourceRef) {
      //   console.log('REMOVE DATA SOURCE', mapRef.sources)
      //   mapRef.sources.remove(dataSourceRef)
      // }
    }
  }, [])

  useEffect(() => {
    console.log('DATA REF CHANGED')
  }, [dataSourceRef])

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
