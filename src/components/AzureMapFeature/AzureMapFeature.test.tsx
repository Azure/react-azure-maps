import { Map, source } from 'azure-maps-control'
import React from 'react'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { AzureMapDataSourceContext, IAzureMapFeature } from '../../react-azure-maps'
import { render } from '@testing-library/react'
import AzureMapFeature from './AzureMapFeature'
import { useFeature } from './useFeature'

jest.mock('./useFeature')

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
})
