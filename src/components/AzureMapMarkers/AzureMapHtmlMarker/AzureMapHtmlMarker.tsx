import React, { useContext, useEffect, useState } from 'react'
import atlas, { Map } from 'azure-maps-control'

import {
  AzureMapsContextProps,
  HtmlMarkerMouseEvent,
  IAzureMapHtmlMarker,
  IAzureMapMouseEventRef
} from '../../../types'
import { AzureMapsContext } from '../../../contexts/AzureMapContext'

const createMouseEvents = (
  mapRef: Map,
  ref: IAzureMapMouseEventRef,
  mouseEvents: HtmlMarkerMouseEvent
) => {
  if (mapRef) {
    mapRef.events.add(mouseEvents.eventName, ref, mouseEvents.callback)
  }
}

const AzureMapHtmlMarker = ({ id, options, events }: IAzureMapHtmlMarker) => {
  const [markerRef] = useState<atlas.HtmlMarker>(new atlas.HtmlMarker(options))
  const { mapRef } = useContext<AzureMapsContextProps>(AzureMapsContext)
  useEffect(() => {
    if (mapRef) {
      mapRef.markers.add(markerRef)
      events && createMouseEvents(mapRef, markerRef, events)
      return () => {
        mapRef.markers.remove(markerRef)
      }
    }
  }, [])
  return null
}

export default AzureMapHtmlMarker
