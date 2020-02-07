import React, { useContext, useEffect, useState } from 'react'
import atlas from 'azure-maps-control'

import { IAzureMapsContextProps, IAzureMapHtmlMarker, MapType } from '../../../types'
import { AzureMapsContext } from '../../../contexts/AzureMapContext'
import { useCheckRef, useCheckRefMount } from '../../../hooks/useCheckRef'

const AzureMapHtmlMarker = ({ id, options, events }: IAzureMapHtmlMarker) => {
  const [markerRef] = useState<atlas.HtmlMarker>(new atlas.HtmlMarker(options))
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

  return null
}

export default AzureMapHtmlMarker
