import React, { useEffect, useState, useContext, memo } from 'react'
import {
  IAzureMapFeature,
  IAzureMapDataSourceProps,
  FeatureType,
  DataSourceType
} from '../../types'
import atlas from 'azure-maps-control'
import { AzureMapDataSourceContext } from '../../contexts/AzureMapDataSourceContext'
import { useCheckRef } from '../../hooks/useCheckRef'
import { useCreateAzureMapFeatureFeature } from './useCreateAzureMapFeature'

const AzureMapFeature = memo((props: IAzureMapFeature) => {
  const { properties, id } = props
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [featureRef, setFeatureRef] = useState<FeatureType | null>(null)

  useEffect(() => {
    const featureSource: atlas.data.Geometry | undefined = useCreateAzureMapFeatureFeature(props)
    if (!featureRef && featureSource) {
      setFeatureRef(new atlas.data.Feature(featureSource, properties, id))
    }
  }, [])

  useCheckRef<DataSourceType, FeatureType>(dataSourceRef, featureRef, (dref, fref) => {
    dref.add(fref)
    return () => {
      dref.remove(fref)
    }
  })
  return null
})

export default AzureMapFeature
