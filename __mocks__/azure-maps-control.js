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
  }
}
