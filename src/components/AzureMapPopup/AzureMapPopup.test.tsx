import { render } from '@testing-library/react'
import { Map, Popup } from 'azure-maps-control'
import React from 'react'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import AzureMapPopup from './AzureMapPopup'
import { IAzureMapPopup } from '../../types'

const mapContextProps = {
  mapRef: null,
  isMapReady: false,
  setMapReady: jest.fn(),
  removeMapRef: jest.fn(),
  setMapRef: jest.fn()
}
const mapRef = new Map('fake', {})
mapRef.events.add = jest.fn()
const popupRef = new Popup()

jest.mock('./useCreateAzureMapPopup.ts', () => ({ useCreatePopup: () => popupRef }))

const wrapWithAzureMapContext = (props: IAzureMapPopup) => {
  return (
    <AzureMapsContext.Provider
      value={{
        ...mapContextProps,
        mapRef
      }}
    >
      <AzureMapPopup {...{ ...props }} />
    </AzureMapsContext.Provider>
  )
}

describe('AzureMapPopup tests', () => {
  it('should create popup and add events on mount', () => {
    render(
      wrapWithAzureMapContext({
        events: [
          {
            eventName: 'drag',
            callback: () => {}
          }
        ],
        popupContent: <div></div>
      })
    )
    expect(mapRef.events.add).toHaveBeenCalledWith('drag', popupRef, expect.any(Function))
  })

  it('should remove popup on unmount', () => {
    const { unmount } = render(
      wrapWithAzureMapContext({
        popupContent: <div></div>
      })
    )
    unmount()
    expect(mapRef.popups.remove).toHaveBeenCalled()
  })

  it('should open popup when isVisible is true and isOpen returns false', () => {
    popupRef.isOpen = jest.fn(() => false)
    render(
      wrapWithAzureMapContext({
        popupContent: <div></div>,
        isVisible: true
      })
    )
    expect(popupRef.open).toHaveBeenCalledWith(mapRef)
  })

  it('should close popup when isVisible is false and isOpen returns true', () => {
    popupRef.isOpen = jest.fn(() => true)
    mapRef.popups.getPopups = jest.fn(() => [popupRef])
    render(
      wrapWithAzureMapContext({
        popupContent: <div></div>,
        isVisible: false
      })
    )
    expect(popupRef.close).toHaveBeenCalled()
  })
})
