import React, { memo, useContext, useEffect } from 'react'
import atlas from 'azure-maps-control'

import { FeatureType, IAzureMapDataSourceProps, IAzureMapFeature, ShapeType } from '../../types'
import { AzureMapDataSourceContext } from '../../contexts/AzureMapDataSourceContext'
import { createAzureMapFeature } from './useCreateAzureMapFeature'
import { useFeature } from './useFeature'

const AzureMapFeature = memo((props: IAzureMapFeature) => {
  const { properties, id, variant = 'feature' } = props
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [featureRef, setFeatureRef] = React.useState<FeatureType | null>(null)
  const [shapeRef, setShapeRef] = React.useState<ShapeType | null>(null)
  // Hook for proper handling shapes and features
  useFeature(props, dataSourceRef, shapeRef, featureRef)

  useEffect(() => {
    const featureSource: atlas.data.Geometry | undefined = createAzureMapFeature(props)

    if ((!featureRef || !shapeRef) && featureSource) {
      switch (variant) {
        case 'shape':
          setShapeRef(new atlas.Shape(featureSource, id, properties))
          break
        case 'feature':
          setFeatureRef(new atlas.data.Feature(featureSource, properties, id))
          break
      }
    }
  }, [])

  return null
})

export default AzureMapFeature
