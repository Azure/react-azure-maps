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
}: IAzureMapFeature): atlas.data.Geometry | null => {
  switch (type) {
    case 'Point':
      const point = coordinate && new atlas.data.Point(coordinate)
      return point ? point : null
    case 'MultiPoint':
      const multiPoint = coordinates && new atlas.data.MultiPoint(coordinates, bbox)
      return multiPoint ? multiPoint : null
    case 'LineString':
      const lineString = coordinates && new atlas.data.LineString(coordinates, bbox)
      return lineString ? lineString : null
    case 'MultiLineString':
      const multiLineString =
        multipleCoordinates && new atlas.data.MultiLineString(multipleCoordinates, bbox)
      return multiLineString ? multiLineString : null
    case 'Polygon':
      const polygon = coordinates && new atlas.data.Polygon(coordinates, bbox)
      return polygon ? polygon : null
    case 'MultiPolygon':
      const multiPolygon =
        multipleDimensionCoordinates &&
        new atlas.data.MultiPolygon(multipleDimensionCoordinates, bbox)
      return multiPolygon ? multiPolygon : null
    default:
      console.warn('Check the type and passed props properties')
      return null
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
    const featureSource: atlas.data.Geometry | null = createFeature(props)
    if (dataSourceRef && featureRef && featureSource) {
      setFeatureRef(new atlas.data.Feature(featureSource, properties, id))
      dataSourceRef.add(featureRef)
      return () => {
        dataSourceRef.remove(featureRef)
      }
    }
  }, [])

  return null
}

export default AzureMapFeature
