import { render } from '@testing-library/react'
import { Map, Popup } from 'azure-maps-control'
import React from 'react'
import { AzureMapsContext } from '../../../contexts/AzureMapContext'
import AzureMaphtmlMarker from './AzureMapHtmlMarker'
import { IAzureMapHtmlMarker } from '../../../types'
import atlas from 'azure-maps-control'

const mapContextProps = {
  mapRef: null,
  isMapReady: false,
  setMapReady: jest.fn(),
  removeMapRef: jest.fn(),
  setMapRef: jest.fn()
}
const mapRef = new Map('fake', {})

const wrapWithAzureMapContext = (props: IAzureMapHtmlMarker) => {
  return (
    <AzureMapsContext.Provider
      value={{
        ...mapContextProps,
        mapRef
      }}
    >
      <AzureMaphtmlMarker {...{ ...props }} />
    </AzureMapsContext.Provider>
  )
}

describe('AzureMaphtmlMarker tests', () => {
  it('should create html marker without error and add it to map ref', () => {
    mapRef.markers.add = jest.fn()
    const { container, unmount } = render(wrapWithAzureMapContext({}))
    expect(mapRef.markers.add).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
    unmount()
    expect(mapRef.markers.remove).toHaveBeenCalled()
  })

  it('should remove marker from map ref', () => {
    mapRef.markers.remove = jest.fn()
    const { unmount } = render(wrapWithAzureMapContext({}))
    unmount()
    expect(mapRef.markers.remove).toHaveBeenCalled()
  })

  it('should add events for marker to map', () => {
    mapRef.events.add = jest.fn()
    render(
      wrapWithAzureMapContext({
        events: [
          {
            eventName: 'click',
            callback: jest.fn()
          }
        ]
      })
    )
    expect(mapRef.events.add).toHaveBeenCalledWith(
      'click',
      expect.any(Object),
      expect.any(Function)
    )
  })
  describe('options and content change', () => {
    const markerRef = new atlas.HtmlMarker()
    // We need somehow to override current mock constructor ts currently do not allow that
    // @ts-ignore
    atlas.HtmlMarker = jest.fn(() => markerRef)

    it('should call setOptions on markerRef', () => {
      markerRef.setOptions = jest.fn()
      render(wrapWithAzureMapContext({ options: { option: 'option' } }))
      expect(markerRef.setOptions).toHaveBeenCalledWith({ option: 'option' })
    })

    it('should call setOptions on markerRef when marketContent prop is passed', () => {
      markerRef.setOptions = jest.fn()
      render(wrapWithAzureMapContext({ markerContent: <div /> }))
      expect(markerRef.setOptions).toHaveBeenCalledWith({ htmlContent: '<div></div>' })
    })

    it('should close marker popup', () => {
      render(wrapWithAzureMapContext({ isPopupVisible: true, markerContent: <div /> }))
      // Currently we only check if getOptions get called @TODO
      expect(markerRef.getOptions).toHaveBeenCalled()
    })

    it('should open marker popup', () => {
      render(wrapWithAzureMapContext({ isPopupVisible: false, markerContent: <div /> }))
      // Currently we only check if getOptions get called @TODO
      expect(markerRef.getOptions).toHaveBeenCalled()
    })
  })
})
