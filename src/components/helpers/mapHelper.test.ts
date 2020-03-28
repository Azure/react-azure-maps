import { generateLinesFromArrayOfPosition, generatePixelHeading } from './mapHelper'
import atlas from 'azure-maps-control'

atlas.Pixel.getHeading = jest.fn(() => 0)

describe('generateLinesFromArrayOfPosition', () => {
  it('should call generateLinesFromArrayOfPosition without error', () => {
    const result = generateLinesFromArrayOfPosition([new atlas.data.Position(0, 1)])
    expect(result).toEqual({
      bbox: undefined,
      coords: [[0, 1]],
      type: 'LineString'
    })
  })
})

describe('generatePixelHeading', () => {
  it('should call generatePixelHeading without error', () => {
    const result = generatePixelHeading(new atlas.Pixel(0, 1), new atlas.Pixel(0, 1))
    expect(result).toEqual(0)
  })
})
