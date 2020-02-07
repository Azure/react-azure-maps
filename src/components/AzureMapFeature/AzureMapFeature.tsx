import React, { useEffect, useState, useContext, memo } from 'react'
import {
  IAzureMapFeature,
  IAzureMapDataSourceProps,
  GeometryType,
  FeatureType,
  DataSourceType
} from '../../types'
import atlas from 'azure-maps-control'
import { AzureMapDataSourceContext } from '../../contexts/AzureMapDataSourceContext'
import { useCheckRef } from '../../hooks/useCheckRef'

const createFeature = ({
  type,
  coordinate,
  coordinates,
  multipleCoordinates,
  multipleDimensionCoordinates,
  bbox
}: IAzureMapFeature): atlas.data.Geometry | undefined => {
  switch (type) {
    case 'Point':
      return coordinate && new atlas.data.Point(coordinate)
    case 'MultiPoint':
      return coordinates && new atlas.data.MultiPoint(coordinates, bbox)
    case 'LineString':
      return coordinates && new atlas.data.LineString(coordinates, bbox)
    case 'MultiLineString':
      return multipleCoordinates && new atlas.data.MultiLineString(multipleCoordinates, bbox)
    case 'Polygon':
      return coordinates && new atlas.data.Polygon(coordinates, bbox)
    case 'MultiPolygon':
      return (
        multipleDimensionCoordinates &&
        new atlas.data.MultiPolygon(multipleDimensionCoordinates, bbox)
      )
    default:
      console.warn('Check the type and passed props properties')
  }
}

const AzureMapFeature = memo((props: IAzureMapFeature) => {
  const { properties, id } = props
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [featureRef, setFeatureRef] = useState<FeatureType | null>(null)

  useEffect(() => {
    const featureSource: atlas.data.Geometry | undefined = createFeature(props)
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
