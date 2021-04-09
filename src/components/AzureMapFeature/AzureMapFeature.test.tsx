import { Map, source } from 'azure-maps-control'
import React from 'react'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { AzureMapDataSourceContext, IAzureMapFeature } from '../../react-azure-maps'
import { render } from '@testing-library/react'
import AzureMapFeature from './AzureMapFeature'
import { useFeature } from './useFeature'
import atlas from 'azure-maps-control'

jest.mock('./useFeature')
jest.mock('./useCreateAzureMapFeature.ts', () => ({
  createAzureMapFeature: () => ({})
}))

const mapRef = new Map('fake', {})
const dataSourceRef = new source.DataSource()
const mapContextProps = {
  mapRef: null,
  isMapReady: false,
  setMapReady: jest.fn(),
  removeMapRef: jest.fn(),
  setMapRef: jest.fn()
}

const wrapWithAzureMapContexts = (featureProps: IAzureMapFeature) => {
  return (
    <AzureMapsContext.Provider
      value={{
        ...mapContextProps,
        mapRef
      }}
    >
      <AzureMapDataSourceContext.Provider value={{ dataSourceRef }}>
        <AzureMapFeature {...featureProps} />
      </AzureMapDataSourceContext.Provider>
    </AzureMapsContext.Provider>
  )
}
describe('AzureMapFeature tests', () => {
  it('should create AzureMapFeature', () => {
    const featureProps: IAzureMapFeature = { type: 'LineString' }
    render(wrapWithAzureMapContexts(featureProps))
    expect(useFeature).toHaveBeenCalled()
  })

  it('should create feature', () => {
    const featureProps: IAzureMapFeature = {
      type: 'LineString',
      variant: 'feature',
      id: 'id',
      properties: { prop: 'prop' }
    }
    // @ts-ignore
    atlas.data.Feature.mockClear()
    render(wrapWithAzureMapContexts(featureProps))
    expect(atlas.data.Feature).toHaveBeenCalledWith({}, { prop: 'prop' }, 'id')
  })

  it('should create shape', () => {
    const featureProps: IAzureMapFeature = {
      type: 'LineString',
      variant: 'shape',
      id: 'id',
      properties: { prop: 'prop' }
    }
    // @ts-ignore
    atlas.Shape.mockClear()
    render(wrapWithAzureMapContexts(featureProps))
    expect(atlas.Shape).toHaveBeenCalledWith({}, 'id', { prop: 'prop' })
  })
})
