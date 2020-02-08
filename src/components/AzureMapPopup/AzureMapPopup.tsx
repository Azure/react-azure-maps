import React, { useContext, useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import atlas from 'azure-maps-control'

import { IAzureMapsContextProps, MapType, IAzureMapPopup } from '../../types'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { useCheckRefMount } from '../../hooks/useCheckRef'

const AzureMapPopup = ({ isVisible, popupContent, options, events }: IAzureMapPopup) => {
  const [popupRef] = useState<atlas.Popup>(
    new atlas.Popup({ ...options, content: ReactDOMServer.renderToStaticMarkup(popupContent) })
  )
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)

  useCheckRefMount<MapType, boolean>(mapRef, true, mref => {
    events &&
      events.forEach(({ eventName, callback }) => {
        mref.events.add(eventName, popupRef, callback)
      })
    return () => {
      mref.popups.remove(popupRef)
    }
  })

  useEffect(() => {
    if (mapRef) {
      if (isVisible) {
        popupRef.open(mapRef)
      } else if (mapRef.popups.getPopups().length && !isVisible) {
        popupRef.close()
      }
    }
  }, [isVisible])

  return null
}

export default AzureMapPopup
