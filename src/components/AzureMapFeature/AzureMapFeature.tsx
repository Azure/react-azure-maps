import React, { memo, useContext, useEffect, useState } from 'react'
import {
  DataSourceType,
  FeatureType,
  IAzureMapDataSourceProps,
  IAzureMapFeature,
  IAzureMapShapeProps
} from '../../types'
import atlas from 'azure-maps-control'
import { AzureMapDataSourceContext } from '../../contexts/AzureMapDataSourceContext'
import { AzureMapShapeContext } from '../../contexts/AzureMapShapeContext'
import { useCheckRef } from '../../hooks/useCheckRef'
import { useCreateAzureMapFeatureFeature } from './useCreateAzureMapFeature'

const AzureMapFeature = memo((props: IAzureMapFeature) => {
  const { properties, id, setCoords, setProperties } = props
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

  // Shape's methods
  useEffect(() => {
    if (shapeRef && setCoords) {
      shapeRef.setCoordinates(setCoords)
    }
  }, [setCoords])

  useEffect(() => {
    if (shapeRef && setProperties) {
      shapeRef.setProperties(setProperties)
    }
  }, [setProperties])

  useCheckRef<DataSourceType, FeatureType>(dataSourceRef, featureRef, (dref, fref) => {
    // Exclude Features that are wrapped by Shape
    if (!createShape) {
      dref.add(fref)
    }
    return () => {
      if (!createShape) {
        dref.remove(fref)
      }
    }
  })
  return null
})

export default AzureMapFeature
