import React, { createContext, useContext, useState } from 'react'
import {
  DataSourceType,
  IAzureMapDataSourceProps,
  IAzureMapsContextProps,
  IAzureMapShapeProps,
  IAzureShapeStatefulProviderProps
} from '../types'
import atlas, { Shape } from 'azure-maps-control'
import { AzureMapsContext } from './AzureMapContext'
import { useCheckRef } from '../hooks/useCheckRef'
import { AzureMapDataSourceContext } from './AzureMapDataSourceContext'

const AzureMapShapeContext = createContext<IAzureMapShapeProps>({
  shapeRef: null
})

const { Provider, Consumer: AzureMapShapeConsumer } = AzureMapShapeContext

/**
 * Use ShapeContext to wrap a Geometry or Feature and makes it easy to update and maintain.
 * Trigger the shape method in children -> <AzureMapFeature setCoords={} & serProperties={} ...>/
 * @param id: unique id.
 * @param properties: User defined initial properties for the shape.
 * @param children: Feature which contains a Geometry object and properties.
 */
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
      setShapeRef(new atlas.Shape(data, id, properties))
    }
  }

  useCheckRef<DataSourceType, Shape>(dataSourceRef, shapeRef, (dsref, sref) => {
    dsref.add(sref)
    return () => {
      dsref.remove(sref)
    }
  })

  return (
    <Provider
      value={{
        shapeRef,
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
