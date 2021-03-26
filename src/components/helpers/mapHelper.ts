import atlas from 'azure-maps-control'

export const generateLinesFromArrayOfPosition = (coordinates: atlas.data.Position[]): atlas.data.LineString => {
  const line = new atlas.data.LineString(coordinates)
  return line
}

export const generatePixelHeading = (origin: atlas.Pixel, destination: atlas.Pixel) => {
  const heading = atlas.Pixel.getHeading(origin, destination)
  return heading
}
