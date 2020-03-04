import React, { useContext, useState, useEffect, memo } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import atlas from 'azure-maps-control'

import { IAzureMapsContextProps, IAzureMapHtmlMarker, MapType } from '../../../types'
import { AzureMapsContext } from '../../../contexts/AzureMapContext'
import { useCheckRefMount } from '../../../hooks/useCheckRef'

const AzureMapHtmlMarker = memo(
  ({ markerContent, options, events, isPopupVisible }: IAzureMapHtmlMarker) => {
    const [markerRef] = useState<atlas.HtmlMarker>(
      new atlas.HtmlMarker({
        ...options,
        htmlContent: markerContent && renderToStaticMarkup(markerContent)
      })
    )
    const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)

    useCheckRefMount<MapType, boolean>(mapRef, true, mref => {
      mref.markers.add(markerRef)
      events &&
        events.forEach(({ eventName, callback }) => {
          mref.events.add(eventName, markerRef, callback)
        })
      return () => {
        mref.markers.remove(markerRef)
      }
    })

    useEffect(() => {
      if (markerRef && mapRef) {
        markerRef.setOptions({
          ...options,
          htmlContent: markerContent && renderToStaticMarkup(markerContent)
        })
      }
    }, [markerContent, options])

    useEffect(() => {
      if (markerRef && markerRef.getOptions().popup && mapRef) {
        const isMarkerPopupOpen = markerRef.getOptions().popup?.isOpen()
        if (isMarkerPopupOpen && isPopupVisible) {
          markerRef.getOptions().popup?.close()
        } else if (isMarkerPopupOpen !== undefined) {
          markerRef.getOptions().popup?.open()
        } else if ((isPopupVisible && isMarkerPopupOpen) || isPopupVisible) {
          markerRef.togglePopup()
        }
      }
    }, [isPopupVisible, options, mapRef])

    return null
  }
)

export default AzureMapHtmlMarker
