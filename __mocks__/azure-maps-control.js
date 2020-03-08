module.exports = {
  Map: jest.fn(() => ({
    controls: {
      add: jest.fn()
    },
    events: {
      add: jest.fn((eventName, callback = () => {}) => {
        callback()
      })
    },
    setTraffic: jest.fn(),
    setUserInteraction: jest.fn(),
    setCamera: jest.fn()
  })),
  control: {
    CompassControl: jest.fn(() => ({ compassOption: 'option' })),
    PitchControl: jest.fn(() => ({ pitchOption: 'option' })),
    StyleControl: jest.fn(() => ({ styleOption: 'option' })),
    ZoomControl: jest.fn(() => ({ zoomOption: 'option' }))
  },
  layer: {
    ImageLayer: jest.fn((options, id) => ({ layer: 'ImageLayer', options, id })),
    TileLayer: jest.fn((options, id) => ({ layer: 'TileLayer', options, id })),
    SymbolLayer: jest.fn((options, id, datasourceRef) => ({
      layer: 'SymbolLayer',
      options,
      id,
      datasourceRef
    })),
    HeatMapLayer: jest.fn((options, id, datasourceRef) => ({
      layer: 'HeatLayer',
      options,
      id,
      datasourceRef
    })),
    LineLayer: jest.fn((options, id, datasourceRef) => ({
      layer: 'LineLayer',
      options,
      id,
      datasourceRef
    })),
    PolygonExtrusionLayer: jest.fn((options, id, datasourceRef) => ({
      layer: 'PolygonExtrusionLayer',
      options,
      id,
      datasourceRef
    })),
    PolygonLayer: jest.fn((options, id, datasourceRef) => ({
      layer: 'PolygonLayer',
      options,
      id,
      datasourceRef
    })),
    BubbleLayer: jest.fn((options, id, datasourceRef) => ({
      layer: 'BubbleLayer',
      options,
      id,
      datasourceRef
    }))
  },
  source: {
    DataSource: jest.fn(() => {})
  }
}
