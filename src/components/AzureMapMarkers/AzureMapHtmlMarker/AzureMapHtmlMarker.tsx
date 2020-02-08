import React, { useContext, useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import atlas from 'azure-maps-control'

import { IAzureMapsContextProps, IAzureMapHtmlMarker, MapType } from '../../../types'
import { AzureMapsContext } from '../../../contexts/AzureMapContext'
import { useCheckRefMount } from '../../../hooks/useCheckRef'

const AzureMapHtmlMarker = ({
  markerContent,
  options,
  events,
  isPopupVisible
}: IAzureMapHtmlMarker) => {
  const [markerRef] = useState<atlas.HtmlMarker>(
    new atlas.HtmlMarker({
      ...options,
      htmlContent: ReactDOMServer.renderToStaticMarkup(markerContent)
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
    if (markerRef && markerRef.getOptions().popup && mapRef) {
      markerRef.togglePopup()
    }
  }, [isPopupVisible, options, mapRef])

  return null
}

export default AzureMapHtmlMarker
