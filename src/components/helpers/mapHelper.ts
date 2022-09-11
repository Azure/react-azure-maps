import atlas from 'azure-maps-control'
import { DataSourceType, MapType } from '../../types'

export const generateLinesFromArrayOfPosition = (
  coordinates: atlas.data.Position[]
): atlas.data.LineString => {
  const line = new atlas.data.LineString(coordinates)
  return line
}

export const generatePixelHeading = (origin: atlas.Pixel, destination: atlas.Pixel) => {
  const heading = atlas.Pixel.getHeading(origin, destination)
  return heading
}

export const getLayersDependingOnDatasource = (mref: MapType, dst: DataSourceType) => {
  return mref.layers.getLayers().filter((l) => {
    if ((l as atlas.layer.SymbolLayer).getSource) {
      const sourceLayer = (l as atlas.layer.SymbolLayer).getSource()
      const dsId = typeof sourceLayer === 'string' ? sourceLayer : sourceLayer.getId()
      return dsId === dst.getId()
    }
    return false
  })
}
