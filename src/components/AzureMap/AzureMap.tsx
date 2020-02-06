import React, { useState, useEffect, Fragment, useContext, ReactNode } from 'react'
import atlas from 'azure-maps-control'
import { IAzureMap, IAzureMapsContextProps } from '../../types'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { Guid } from 'guid-typescript'
// Styles section
import 'azure-maps-control/dist/atlas.min.css'

const AzureMap = ({
  children, // @TODO We need to cover and type all possible childrens that we can pass to this component as child for. ex. Markers etc
  LoaderComponent = () => <div>Loading ...</div>,
  providedMapId,
  containerClassName,
  mapCenter,
  options = {}
}: IAzureMap) => {
  const { setMapRef, removeMapRef, mapRef, setMapReady, isMapReady } = useContext<
    IAzureMapsContextProps
  >(AzureMapsContext)
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
    return () => {
      removeMapRef()
    }
  }, [])

  return (
    <Fragment>
      {!isMapReady && LoaderComponent && <LoaderComponent />}
      <div className={containerClassName} id={mapId}>
        {isMapReady && children}
      </div>
    </Fragment>
  )
}

export default AzureMap
