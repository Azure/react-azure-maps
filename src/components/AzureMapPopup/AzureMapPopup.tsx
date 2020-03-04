import React, { useContext, useEffect, memo } from 'react'

import { IAzureMapsContextProps, MapType, IAzureMapPopup } from '../../types'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { useCheckRefMount } from '../../hooks/useCheckRef'
import { useCreatePopup } from './useCreateAzureMapPopup'

const AzureMapPopup = memo(({ isVisible, popupContent, options, events }: IAzureMapPopup) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const popupRef = useCreatePopup({ options, popupContent, isVisible })

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
      if (isVisible && !popupRef.isOpen()) {
        popupRef.open(mapRef)
      } else if (mapRef.popups.getPopups().length && !isVisible && popupRef.isOpen()) {
        popupRef.close()
      }
    }
  }, [isVisible])

  return null
})

export default AzureMapPopup
