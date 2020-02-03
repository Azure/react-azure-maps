import React, { useEffect, useState, useContext } from 'react'
import { IAzureMapFeature, IAzureMapDataSourceProps } from '../../types'
import atlas from 'azure-maps-control'
import { AzureMapDataSourceContext } from '../../contexts/AzureMapDataSourceContext'

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

const AzureMapFeature = (props: IAzureMapFeature) => {
  const { properties, id } = props
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const [featureRef, setFeatureRef] = useState<atlas.data.Feature<
    atlas.data.Geometry,
    Object
  > | null>(null)

  useEffect(() => {
    const featureSource: atlas.data.Geometry | undefined = createFeature(props)
    if (!featureRef && featureSource) {
      setFeatureRef(new atlas.data.Feature(featureSource, properties, id))
    }
  }, [])

  useEffect(() => {
    if (dataSourceRef && featureRef) {
      dataSourceRef.add(featureRef)
      return () => {
        dataSourceRef.remove(featureRef)
      }
    }
  }, [featureRef])

  return null
}

export default AzureMapFeature
