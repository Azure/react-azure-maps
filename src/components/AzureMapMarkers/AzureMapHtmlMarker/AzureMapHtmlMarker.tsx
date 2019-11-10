import React, { useContext, useEffect, useState } from 'react'
import atlas from 'azure-maps-control'

import { AzureMapsContextProps, IAzureMapHtmlMarker } from '../../../types'
import { AzureMapsContext } from '../../../contexts/AzureMapContext'

const AzureMapHtmlMarker = ({ id, options, events }: IAzureMapHtmlMarker) => {
  const [markerRef] = useState<atlas.HtmlMarker>(new atlas.HtmlMarker(options))
  const { mapRef } = useContext<AzureMapsContextProps>(AzureMapsContext)
  useEffect(() => {
    if (mapRef) {
      mapRef.markers.add(markerRef)
      events &&
        events.forEach(({ eventName, callback }) => {
          mapRef.events.add(eventName, markerRef, callback)
        })
      return () => {
        mapRef.markers.remove(markerRef)
      }
    }
  }, [])

  return null
}

export default AzureMapHtmlMarker
