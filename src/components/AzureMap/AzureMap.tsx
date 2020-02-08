import React, { useState, useEffect, useContext, memo } from 'react'
import atlas from 'azure-maps-control'
import { IAzureMap, IAzureMapsContextProps, MapType } from '../../types'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { Guid } from 'guid-typescript'
// Styles section
import 'azure-maps-control/dist/atlas.min.css'
import 'mapbox-gl/src/css/mapbox-gl.css'
import { useCheckRef } from '../../hooks/useCheckRef'

const AzureMap = memo(
  ({
    children, // @TODO We need to cover and type all possible childrens that we can pass to this component as child for. ex. Markers etc
    LoaderComponent = () => <div>Loading ...</div>,
    providedMapId,
    containerClassName,
    styles,
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

    useCheckRef<MapType, MapType>(mapRef, mapRef, mref => {
      mref.events.add('ready', () => {
        setMapReady(true)
      })
    })

    useEffect(() => {
      setMapRef(new atlas.Map(mapId, options))
      return () => {
        removeMapRef()
      }
    }, [])

    return (
      <>
        {!isMapReady && LoaderComponent && <LoaderComponent />}
        <div className={containerClassName} id={mapId} style={{ ...styles, height: '100%' }}>
          {isMapReady && children}
        </div>
      </>
    )
  }
)

export default AzureMap
