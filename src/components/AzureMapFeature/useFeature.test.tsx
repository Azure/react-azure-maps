import atlas, { data, source } from 'azure-maps-control'
import { useFeature } from './useFeature'
import { IAzureMapFeature } from '../../types'
import { renderHook } from '@testing-library/react-hooks'

const fakePosition = new data.Point(new data.Position(0, 0))

const dataSourceRef = new source.DataSource()
const featureRef = new data.Feature(fakePosition)
const shapeRef = new atlas.Shape(fakePosition)
const fakeShapeProps: IAzureMapFeature = {
  setProperties: jest.fn(),
  setCoords: new atlas.data.Position(10, 10),
  type: 'Point'
}
const fakeProps: IAzureMapFeature = {
  type: 'Point'
}

describe('useFeature tests', () => {
  it('should add feature to dataRef', () => {
    renderHook(() => useFeature(fakeProps, dataSourceRef, null, featureRef))
    expect(dataSourceRef.add).toHaveBeenCalled()
  })
  it('should add shape to dataRef', () => {
    renderHook(() => useFeature(fakeProps, dataSourceRef, shapeRef, null))
    expect(dataSourceRef.add).toHaveBeenCalled()
  })
  it('should add shape and setProperties', () => {
    renderHook(() => useFeature(fakeShapeProps, dataSourceRef, shapeRef, null))
    expect(dataSourceRef.add).toHaveBeenCalled()
    expect(shapeRef.setCoordinates).toHaveBeenCalled()
    expect(shapeRef.setProperties).toHaveBeenCalled()
  })
})
