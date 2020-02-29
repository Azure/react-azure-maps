import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  DataSourceType,
  IAzureLayerStatefulProviderProps,
  IAzureMapDataSourceProps,
  IAzureMapLayerProps,
  IAzureMapsContextProps,
  IAzureMapShapeProps,
  IAzureShapeStatefulProviderProps,
  MapType
} from '../types'
import { useAzureMapLayer } from '../hooks/useAzureMapLayer'
import atlas, { Shape } from 'azure-maps-control'
import { AzureMapsContext } from './AzureMapContext'
import { useCheckRef } from '../hooks/useCheckRef'
import { AzureMapDataSourceContext } from './AzureMapDataSourceContext'

const AzureMapShapeContext = createContext<IAzureMapShapeProps>({
  shapeRef: null
})

const { Provider, Consumer: AzureMapShapeConsumer } = AzureMapShapeContext

const AzureMapShapeStatefulProvider = ({
  id,
  properties,
  children
}: IAzureShapeStatefulProviderProps) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [shapeRef, setShapeRef] = useState<atlas.Shape | any>(null)

  const createShape = (
    data: atlas.data.Feature<atlas.data.Geometry, any> | atlas.data.Geometry | any
  ) => {
    if (data) {
      const shape = new atlas.Shape(data, id, properties)
      setShapeRef(shape)
    }
  }

  useCheckRef<DataSourceType, Shape>(dataSourceRef, shapeRef, (dsref, sref) => {
    dsref.add(sref)
  })

  return (
    <Provider
      value={{
        shapeRef,
        setShapeRef,
        createShape
      }}
    >
      {mapRef && dataSourceRef && children}
    </Provider>
  )
}

export {
  AzureMapShapeContext,
  AzureMapShapeConsumer,
  AzureMapShapeStatefulProvider as AzureMapShapeProvider
}

// new atlas.Shape(data: atlas.data.Geometry, id, options)
