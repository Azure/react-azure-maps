import React, { useEffect, useContext, useState, Fragment } from 'react'
import atlas from 'azure-maps-control'

import { IAzureMapHtmlMarker, AzurewMapsContextProps } from '../../../types'
import { AzureMapsContext } from '../../../contexts/AzureMapContext'

const AzureMapHtmlMarker = ({ id, options }: IAzureMapHtmlMarker) => {
  const [markerRef] = useState<atlas.HtmlMarker>(new atlas.HtmlMarker(options))
  const { mapRef } = useContext<AzurewMapsContextProps>(AzureMapsContext)
  useEffect(() => {
    if (mapRef) {
      mapRef.markers.add(markerRef)
      return () => {
        mapRef.markers.remove(markerRef)
      }
    }
  }, [])
  return
}

export default AzureMapHtmlMarker
