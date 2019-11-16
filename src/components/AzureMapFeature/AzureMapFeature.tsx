import React, { useEffect, useState, useContext } from 'react'
import { IAzureMapFeature, IAzureMapDataSourceProps } from '../../types'
import atlas from 'azure-maps-control'
import { AzureMapDataSourceContext } from '../../contexts/AzureMapDataSourceContext'

const createFeature = ({ type, coordinates, bbox }: IAzureMapFeature): atlas.data.Geometry => {
  switch (type) {
    case 'Point':
      return new atlas.data.Point(coordinates)
    case 'MultiPoint':
      return new atlas.data.MultiPoint(coordinates, bbox)
    case 'LineString':
      return new atlas.data.LineString(coordinates, bbox)
    case 'MultiLineString':
      return new atlas.data.MultiLineString(coordinates, bbox)
    case 'Polygon':
      return new atlas.data.Polygon(coordinates, bbox)
    case 'MultiPolygon':
      return new atlas.data.MultiPolygon(coordinates, bbox)
  }
}

const AzureMapFeature = (props: IAzureMapFeature) => {
  const { properties, id } = props
  const { dataSourceRef } = useContext<IAzureMapDataSourceProps>(AzureMapDataSourceContext)
  const featureSource: atlas.data.Geometry = createFeature(props)
  const [featureRef] = useState(new atlas.data.Feature(featureSource, properties, id))

  useEffect(() => {
    if (dataSourceRef) {
      dataSourceRef.add(featureRef)
      return () => {
        dataSourceRef.remove(featureRef)
      }
    }
  }, [])

  return null
}

export default AzureMapFeature
