import React, { useState, useEffect, Fragment } from 'react'
import atlas from 'azure-maps-control'
import { IAzureMap } from '../../types'
import { Guid } from 'guid-typescript'

// Styles section
import 'mapbox-gl/src/css/mapbox-gl.css'

const AzureMap = ({
  LoaderComponent = () => <div>Loading ...</div>,
  providedMapId,
  containerClassName,
  mapCenter,
  options = {},
  onMapMount = () => {}
}: IAzureMap) => {
  const [isMapReady, setMapReady] = useState(false)
  const [mapId] = useState(providedMapId || Guid.create().toString())
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
    setMapRef(new atlas.Map(mapId, options))
  }, [])

  return (
    <Fragment>
      {!isMapReady && LoaderComponent && <LoaderComponent />}
      <div className={containerClassName} id={mapId} />
    </Fragment>
  )
}

export default AzureMap
