import React, { memo, useContext, useEffect, useState } from 'react'
import atlas from 'azure-maps-control'
import { IAzureMap, IAzureMapsContextProps, MapType } from '../../types'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { Guid } from 'guid-typescript'
import 'azure-maps-control/dist/atlas.min.css'
import 'mapbox-gl/src/css/mapbox-gl.css'
import { useCheckRef } from '../../hooks/useCheckRef'
import { useCreateImageSprites } from './useCreateSprites'
import { useCreateMapControls, useCreateMapCustomControls } from './useCreateMapControls'

const AzureMap = memo(
  ({
    children, // @TODO We need to cover and type all possible childrens that we can pass to this component as child for. ex. Markers etc
    LoaderComponent = () => <div>Loading ...</div>,
    providedMapId,
    containerClassName,
    styles,
    options = {},
    imageSprites,
    controls,
    customControls,
    events,
    cameraOptions,
    trafficOptions,
    userInteraction
  }: IAzureMap) => {
    const { setMapRef, removeMapRef, mapRef, setMapReady, isMapReady } = useContext<
      IAzureMapsContextProps
    >(AzureMapsContext)
    const [mapId] = useState(providedMapId || Guid.create().toString())

    useEffect(() => {
      if (mapRef) {
        mapRef.setTraffic(trafficOptions)
      }
    }, [trafficOptions])

    useEffect(() => {
      if (mapRef) {
        mapRef.setUserInteraction(userInteraction)
      }
    }, [userInteraction])

    useEffect(() => {
      if (mapRef) {
        mapRef.setCamera(cameraOptions)
      }
    }, [cameraOptions])

    useCheckRef<MapType, MapType>(mapRef, mapRef, mref => {
      mref.events.add('ready', () => {
        if (imageSprites) {
          useCreateImageSprites(mref, imageSprites)
        }
        if (controls) {
          useCreateMapControls(mref, controls)
        }
        if (customControls) {
          useCreateMapCustomControls(mref, customControls)
        }
        setMapReady(true)
      })
      for (const eventType in events) {
        mref.events.add(eventType as any, events[eventType])
      }
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
