import React, { useState, useEffect } from 'react'
import atlas from 'azure-maps-control'
import { IAzureMap } from '../../types'
import * as uuid from 'uuid'

const AzureMap = ({
  LoaderComponent,
  providedMapId,
  containerClassName,
  mapCenter,
  options,
  onMapMount
}: IAzureMap) => {
  const [isMapReady, setMapReady] = useState(false)
  const [mapId, setMapId] = useState(providedMapId || '1')
  const [mapRef, setMapRef] = useState<atlas.Map>()

  useEffect(() => {
    if (mapRef) {
      mapRef.setCamera(mapCenter)
    }
  }, [mapCenter])

  useEffect(() => {
    if (mapRef) {
      mapRef.events.add('ready', () => {
        setMapReady(true)
        onMapMount(mapRef)
      })
    }
  }, [mapRef])

  useEffect(() => {
    const map = new atlas.Map(mapId, options)
    setMapRef(map)
  }, [])

  return (
    <div className={containerClassName} id={mapId}>
      {LoaderComponent ? <LoaderComponent /> : <div>Loading</div>}
    </div>
  )
}

export default AzureMap
