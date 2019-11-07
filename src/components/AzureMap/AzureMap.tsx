import React, { useState, useEffect, Fragment, useContext } from 'react'
import atlas from 'azure-maps-control'
import { IAzureMap, AzurewMapsContextProps } from '../../types'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { Guid } from 'guid-typescript'

// Styles section
import 'mapbox-gl/src/css/mapbox-gl.css'

const AzureMap = ({
  LoaderComponent = () => <div>Loading ...</div>,
  providedMapId,
  containerClassName,
  mapCenter,
  options = {}
}: IAzureMap) => {
  const { setMapRef, removeMapRef, mapRef } = useContext<AzurewMapsContextProps>(AzureMapsContext)
  const [isMapReady, setMapReady] = useState(false)
  const [mapId] = useState(providedMapId || Guid.create().toString())
  useEffect(() => {
    if (mapRef) {
      mapRef.setCamera(mapCenter)
    }
  }, [mapCenter])

  useEffect(() => {
    if (mapRef) {
      mapRef.events.add('ready', () => {
        setMapReady(true)
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
