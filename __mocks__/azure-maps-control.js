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
    imageSprite: {
      add: jest.fn(),
      createFromTemplate: jest.fn()
    },
    sources: {
      add: jest.fn(),
      remove: jest.fn()
    },
    layers: {
      add: jest.fn(),
      remove: jest.fn()
    },
    popups: {
      getPopups: jest.fn(() => []),
      remove: jest.fn()
    },
    setTraffic: jest.fn(),
    setUserInteraction: jest.fn(),
    setCamera: jest.fn()
  })),
  data: {
    LineString: jest.fn(() => ({})),
    Position: jest.fn(() => ({}))
  },
  Pixel: jest.fn(() => ({
    getHeading: jest.fn(() => 'Heading')
  })),
  Popup: jest.fn(() => ({
    setOptions: jest.fn(),
    isOpen: jest.fn(() => false),
    open: jest.fn(),
    close: jest.fn()
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
      datasourceRef,
      setOptions: jest.fn(),
      getId: jest.fn(() => id)
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
    DataSource: jest.fn(() => ({
      add: jest.fn(),
      clear: jest.fn(),
      importDataFromUrl: jest.fn(),
      setOptions: jest.fn()
    }))
  }
}
