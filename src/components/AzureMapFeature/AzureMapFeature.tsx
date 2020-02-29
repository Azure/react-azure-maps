import React, { useEffect, useState, useContext, memo } from 'react'
import {
  IAzureMapFeature,
  IAzureMapDataSourceProps,
  FeatureType,
  DataSourceType,
  IAzureMapShapeProps
} from '../../types'
import atlas from 'azure-maps-control'
import { AzureMapDataSourceContext } from '../../contexts/AzureMapDataSourceContext'
import { useCheckRef } from '../../hooks/useCheckRef'
import { useCreateAzureMapFeatureFeature } from './useCreateAzureMapFeature'
import { AzureMapShapeContext } from '../../react-azure-maps'

const AzureMapFeature = memo((props: IAzureMapFeature) => {
  const { properties, id, setCoords } = props
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const { shapeRef, createShape } = useContext<IAzureMapShapeProps>(AzureMapShapeContext)
  const [featureRef, setFeatureRef] = useState<FeatureType | null>(null)

  useEffect(() => {
    const featureSource: atlas.data.Geometry | undefined = useCreateAzureMapFeatureFeature(props)
    if (!featureRef && featureSource) {
      setFeatureRef(new atlas.data.Feature(featureSource, properties, id))
    }
  }, [])

  useEffect(() => {
    // Shape as Feature Wrapper for dynamically changes
    if (createShape) {
      createShape(featureRef)
    }
  }, [featureRef])

  useEffect(() => {
    if (shapeRef && setCoords) {
      shapeRef.setCoordinates(setCoords)
    }
  }, [setCoords])

  useCheckRef<DataSourceType, FeatureType>(dataSourceRef, featureRef, (dref, fref) => {
    dref.add(fref)
    return () => {
      dref.remove(fref)
    }
  })
  return null
})

export default AzureMapFeature
