import { render } from '@testing-library/react'

import atlas, { layer, source } from 'azure-maps-control'
import { constructLayer, useAzureMapLayer } from './useAzureMapLayer'
import React from 'react'
import { AzureMapLayerContext, AzureMapLayerProvider } from '../contexts/AzureMapLayerContext'
import { AzureMapDataSourceContext } from '../contexts/AzureMapDataSourceContext'
import { IAzureMapDataSourceContextState, IAzureMapLayerContextState } from '../types'

const datasourceRef = {} as source.DataSource

const renderWithDataSourceContext = (node: React.ReactNode) => {
  return render(
    <AzureMapDataSourceContext.Provider
      value={{
        dataSourceRef: datasourceRef
      }}
    >
      {node}
    </AzureMapDataSourceContext.Provider>
  )
}

const wrapWithDataSourceContext = (
  dataSourceContextProps: IAzureMapDataSourceContextState,
  layerContextProps: IAzureMapLayerContextState
) => {
  return (
    <AzureMapDataSourceContext.Provider value={dataSourceContextProps}>
      <AzureMapLayerContext.Provider value={layerContextProps} />
    </AzureMapDataSourceContext.Provider>
  )
}

describe('Layer', () => {
  describe('useAzureMapLayer', () => {
    it('should setLayerRef', () => {
      const foo = renderWithDataSourceContext(
        <AzureMapLayerProvider options={{}} type={'BubbleLayer'} />
      )
    })

    const datasourceRef = {} as atlas.source.DataSource
    const layer = {} as layer.ImageLayer
    it('should setLayerRef2222', () => {
      const rend = render(
        wrapWithDataSourceContext({ dataSourceRef: datasourceRef }, { layerRef: layer })
      )
    })
  })

  describe('constructLayer', () => {
    const datasourceRef = {} as atlas.source.DataSource
    it('should return SymbolLayer props if type equal to SymbolLayer', () => {
      const createdControl = constructLayer(
        {
          id: 'SymbolLayerId',
          options: {},
          type: 'SymbolLayer'
        },
        datasourceRef
      )
      expect(createdControl).toEqual({
        layer: 'SymbolLayer',
        options: {},
        id: 'SymbolLayerId',
        datasourceRef
      })
    })
    it('should return HeatLayer props if type equal to HeatLayer', () => {
      const createdControl = constructLayer(
        {
          id: 'HeatLayerId',
          options: {},
          type: 'HeatLayer'
        },
        datasourceRef
      )
      expect(createdControl).toEqual({
        layer: 'HeatLayer',
        options: {},
        id: 'HeatLayerId',
        datasourceRef
      })
    })
    it('should return ImageLayer props if type equal to ImageLayer', () => {
      const createdControl = constructLayer(
        {
          id: 'imageLayerId',
          options: {},
          type: 'ImageLayer'
        },
        datasourceRef
      )
      expect(createdControl).toEqual({ layer: 'ImageLayer', options: {}, id: 'imageLayerId' })
    })
    it('should return LineLayer props if type equal to LineLayer', () => {
      const createdControl = constructLayer(
        {
          id: 'LineLayerId',
          options: {},
          type: 'LineLayer'
        },
        datasourceRef
      )
      expect(createdControl).toEqual({
        layer: 'LineLayer',
        options: {},
        id: 'LineLayerId',
        datasourceRef
      })
    })
    it('should return PolygonExtrusionLayer props if type equal to PolygonExtrusionLayer', () => {
      const createdControl = constructLayer(
        {
          id: 'PolygonExtrusionLayerId',
          options: {},
          type: 'PolygonExtrusionLayer'
        },
        datasourceRef
      )
      expect(createdControl).toEqual({
        layer: 'PolygonExtrusionLayer',
        options: {},
        id: 'PolygonExtrusionLayerId',
        datasourceRef
      })
    })
    it('should return PolygonLayer props if type equal to PolygonLayer', () => {
      const createdControl = constructLayer(
        {
          id: 'PolygonLayerId',
          options: {},
          type: 'PolygonLayer'
        },
        datasourceRef
      )
      expect(createdControl).toEqual({
        layer: 'PolygonLayer',
        options: {},
        id: 'PolygonLayerId',
        datasourceRef
      })
    })
    it('should return TileLayer props if type equal to TileLayer', () => {
      const createdControl = constructLayer(
        {
          id: 'TileLayerId',
          options: {},
          type: 'TileLayer'
        },
        datasourceRef
      )
      expect(createdControl).toEqual({ layer: 'TileLayer', options: {}, id: 'TileLayerId' })
    })
    it('should return TileLayer props if type equal to TileLayer', () => {
      const createdControl = constructLayer(
        {
          id: 'BubbleLayerId',
          options: {},
          type: 'BubbleLayer'
        },
        datasourceRef
      )
      expect(createdControl).toEqual({
        layer: 'BubbleLayer',
        options: {},
        id: 'BubbleLayerId',
        datasourceRef
      })
    })
  })
})
