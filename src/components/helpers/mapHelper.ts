import atlas from 'azure-maps-control'
import Position = atlas.data.Position
import LineString = atlas.data.LineString
import Pixel = atlas.Pixel

export const generateLinesFromArrayOfPosition = (coordinates: Position[]): LineString => {
  const line = new LineString(coordinates)
  return line
}

export const generatePixelHeading = (origin: Pixel, destination: Pixel) => {
  const heading = Pixel.getHeading(origin, destination)
  return heading
}
