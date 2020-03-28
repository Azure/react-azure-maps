import React, { useContext } from 'react'

import {
  DataSourceType,
  IAzureMapCustomClass,
  IAzureMapDataSourceProps,
  IAzureMapLayerProps,
  IAzureMapsContextProps,
  MapType
} from '../../types'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { useCheckRef } from '../../hooks/useCheckRef'
import { AzureMapDataSourceContext } from '../../contexts/AzureMapDataSourceContext'
import { AzureMapLayerContext } from '../../react-azure-maps'

const AzureMapCustomClass = ({ onCreateCustomClass }: IAzureMapCustomClass) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)

  useCheckRef<MapType, DataSourceType>(mapRef, dataSourceRef, (mref, dref) => {
    try {
      mapRef?.events.add('layeradded', foo => {
        console.log('LAYER ADDED', foo)
      })
      mapRef?.events.addOnce('layeradded', foo => {
        console.log('LAYER ADDED ONCE', foo)
      })
      mapRef?.events.addOnce('error', e => {
        console.log('ERROR ONCE', e)
      })
      onCreateCustomClass && onCreateCustomClass(mref, dref)
    } catch (e) {
      console.error('Error on create custom class', e)
    }
  })

  return null
}

export default AzureMapCustomClass
