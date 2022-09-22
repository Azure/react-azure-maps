import React, { memo, useContext, useEffect, useState } from 'react'
import atlas from 'azure-maps-control'
import { IAzureMap, IAzureMapsContextProps, MapType } from '../../types'
import { AzureMapsContext } from '../../contexts/AzureMapContext'
import { Guid } from 'guid-typescript'
import { useCheckRef } from '../../hooks/useCheckRef'
import { createImageSprites } from './useCreateSprites'
import { createMapControls, createMapCustomControls } from './useCreateMapControls'

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
    userInteraction,
    styleOptions,
    serviceOptions
  }: IAzureMap) => {
    const {
      setMapRef,
      removeMapRef,
      mapRef,
      setMapReady,
      isMapReady
    } = useContext<IAzureMapsContextProps>(AzureMapsContext)
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

    useEffect(() => {
      if (mapRef) {
        mapRef.setStyle(styleOptions)
      }
    }, [styleOptions])

    useEffect(() => {
      if (mapRef && serviceOptions) {
        mapRef.setServiceOptions(serviceOptions)
      }
    }, [serviceOptions])

    useCheckRef<MapType, MapType>(mapRef, mapRef, (mref) => {
      mref.events.add('ready', () => {
        if (imageSprites) {
          createImageSprites(mref, imageSprites)
        }
        if (controls) {
          createMapControls(mref, controls)
        }
        if (customControls) {
          createMapCustomControls(mref, customControls)
        }
        if (trafficOptions) {
          mref.setTraffic(trafficOptions)
        }
        if (userInteraction) {
          mref.setUserInteraction(userInteraction)
        }
        if (cameraOptions) {
          mref.setCamera(cameraOptions)
        }
        if (styleOptions) {
          mref.setStyle(styleOptions)
        }
        if (serviceOptions) {
          mref.setServiceOptions(serviceOptions)
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
