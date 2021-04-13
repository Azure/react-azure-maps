import { IAzureMapFeature } from '../../types'
import atlas from 'azure-maps-control'

export const createAzureMapFeature = ({
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
