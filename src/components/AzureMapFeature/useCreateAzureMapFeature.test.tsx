import atlas from 'azure-maps-control'
import { IAzureMapFeature } from '../../types'
import { createAzureMapFeature } from './useCreateAzureMapFeature'

const fakeCoordinate: atlas.data.Position = new atlas.data.Position(10, 10)
const fakeCoordinates: atlas.data.Position[] = [
  new atlas.data.Position(10, 10),
  new atlas.data.Position(20, 20)
]
const fakeMultipleCoordinates: Array<Array<atlas.data.Position>> = [
  [new atlas.data.Position(10, 10)],
  [new atlas.data.Position(20, 20)]
]
const fakeMultipleDimensionCoordinates: Array<Array<Array<atlas.data.Position>>> = [
  [[new atlas.data.Position(10, 10)], [new atlas.data.Position(20, 20)]]
]
const fakeBbox: atlas.data.BoundingBox = new atlas.data.BoundingBox(
  new atlas.data.Position(10, 10),
  new atlas.data.Position(20, 20)
)

describe('AzureMapFeature hooks', () => {
  describe('createAzureMapFeature tests', () => {
    it('should return Point if type equal Point', () => {
      const pointProps: IAzureMapFeature = {
        type: 'Point',
        coordinate: fakeCoordinate
      }
      const createPoint = createAzureMapFeature(pointProps)
      expect(createPoint).toEqual({ coords: [10, 10], type: 'Point' })
    })
    it('should return MultiPoint if type equal MultiPoint', () => {
      const multiPointProps: IAzureMapFeature = {
        type: 'MultiPoint',
        coordinates: fakeCoordinates,
        bbox: fakeBbox
      }
      const createMultiPoint = createAzureMapFeature(multiPointProps)
      expect(createMultiPoint).toEqual({
        bbox: [
          [10, 10],
          [20, 20]
        ],
        coords: [
          [10, 10],
          [20, 20]
        ],
        type: 'MultiPoint'
      })
    })
    it('should return LineString if type equal LineString', () => {
      const lineStringProps: IAzureMapFeature = {
        type: 'LineString',
        coordinates: fakeCoordinates,
        bbox: fakeBbox
      }
      const createLineString = createAzureMapFeature(lineStringProps)
      expect(createLineString).toEqual({
        bbox: [
          [10, 10],
          [20, 20]
        ],
        coords: [
          [10, 10],
          [20, 20]
        ],
        type: 'LineString'
      })
    })
    it('should return MultiLineString if type equal MultiLineString', () => {
      const multiLineStringProps: IAzureMapFeature = {
        type: 'MultiLineString',
        multipleCoordinates: fakeMultipleCoordinates,
        bbox: fakeBbox
      }
      const createMultiLineStringProps = createAzureMapFeature(multiLineStringProps)
      expect(createMultiLineStringProps).toEqual({
        bbox: [
          [10, 10],
          [20, 20]
        ],
        multipleCoordinates: [[[10, 10]], [[20, 20]]],
        type: 'MultiLineString'
      })
    })
    it('should return Polygon if type equal Polygon', () => {
      const lineStringProps: IAzureMapFeature = {
        type: 'Polygon',
        coordinates: fakeCoordinates,
        bbox: fakeBbox
      }
      const createLineString = createAzureMapFeature(lineStringProps)
      expect(createLineString).toEqual({
        bbox: [
          [10, 10],
          [20, 20]
        ],
        coords: [
          [10, 10],
          [20, 20]
        ],
        type: 'Polygon'
      })
    })
    it('should return MultiPolygon if type equal MultiPolygon', () => {
      const multiPolygonProps: IAzureMapFeature = {
        type: 'MultiPolygon',
        multipleDimensionCoordinates: fakeMultipleDimensionCoordinates,
        bbox: fakeBbox
      }
      const createMultiPolygon = createAzureMapFeature(multiPolygonProps)
      expect(createMultiPolygon).toEqual({
        bbox: [
          [10, 10],
          [20, 20]
        ],
        type: 'MultiPolygon',
        multipleDimensionCoordinates: [[[[10, 10]], [[20, 20]]]]
      })
    })
  })
})
