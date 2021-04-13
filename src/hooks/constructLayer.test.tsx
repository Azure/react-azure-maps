import atlas from 'azure-maps-control'
import { constructLayer } from './useAzureMapLayer'
import { IAzureMapLayerType } from '../types'

describe('constructLayer', () => {
  const datasourceRef = {} as atlas.source.DataSource
  it('should return SymbolLayer props if type equal to SymbolLayer', () => {
    const createLayer = constructLayer(
      {
        id: 'SymbolLayerId',
        options: {},
        type: 'SymbolLayer'
      },
      datasourceRef
    )
    expect(createLayer).toEqual({
      layer: 'SymbolLayer',
      options: {},
      id: 'SymbolLayerId',
      datasourceRef,
      setOptions: expect.any(Function),
      getId: expect.any(Function)
    })
  })
  it('should return HeatLayer props if type equal to HeatLayer', () => {
    const createLayer = constructLayer(
      {
        id: 'HeatLayerId',
        options: {},
        type: 'HeatLayer'
      },
      datasourceRef
    )
    expect(createLayer).toEqual({
      layer: 'HeatLayer',
      options: {},
      id: 'HeatLayerId',
      datasourceRef
    })
  })
  it('should return ImageLayer props if type equal to ImageLayer', () => {
    const createLayer = constructLayer(
      {
        id: 'imageLayerId',
        options: {},
        type: 'ImageLayer'
      },
      datasourceRef
    )
    expect(createLayer).toEqual({ layer: 'ImageLayer', options: {}, id: 'imageLayerId' })
  })
  it('should return LineLayer props if type equal to LineLayer', () => {
    const createLayer = constructLayer(
      {
        id: 'LineLayerId',
        options: {},
        type: 'LineLayer'
      },
      datasourceRef
    )
    expect(createLayer).toEqual({
      layer: 'LineLayer',
      options: {},
      id: 'LineLayerId',
      datasourceRef
    })
  })
  it('should return PolygonExtrusionLayer props if type equal to PolygonExtrusionLayer', () => {
    const createLayer = constructLayer(
      {
        id: 'PolygonExtrusionLayerId',
        options: {},
        type: 'PolygonExtrusionLayer'
      },
      datasourceRef
    )
    expect(createLayer).toEqual({
      layer: 'PolygonExtrusionLayer',
      options: {},
      id: 'PolygonExtrusionLayerId',
      datasourceRef
    })
  })
  it('should return PolygonLayer props if type equal to PolygonLayer', () => {
    const createLayer = constructLayer(
      {
        id: 'PolygonLayerId',
        options: {},
        type: 'PolygonLayer'
      },
      datasourceRef
    )
    expect(createLayer).toEqual({
      layer: 'PolygonLayer',
      options: {},
      id: 'PolygonLayerId',
      datasourceRef
    })
  })
  it('should return TileLayer props if type equal to TileLayer', () => {
    const createLayer = constructLayer(
      {
        id: 'TileLayerId',
        options: {},
        type: 'TileLayer'
      },
      datasourceRef
    )
    expect(createLayer).toEqual({ layer: 'TileLayer', options: {}, id: 'TileLayerId' })
  })
  it('should return BubbleLayer props if type equal to BubbleLayer', () => {
    const createLayer = constructLayer(
      {
        id: 'BubbleLayerId',
        options: {},
        type: 'BubbleLayer'
      },
      datasourceRef
    )
    expect(createLayer).toEqual({
      layer: 'BubbleLayer',
      options: {},
      id: 'BubbleLayerId',
      datasourceRef
    })
  })

  it('should return null if type is not equal to any type', () => {
    const createLayer = constructLayer(
      {
        id: 'id',
        options: {},
        type: '' as IAzureMapLayerType
      },
      datasourceRef
    )
    expect(createLayer).toEqual(null)
  })
})
