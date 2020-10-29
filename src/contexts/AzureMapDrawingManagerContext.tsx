import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  IAzureDataSourceChildren,
  IAzureMapDataSourceProps,
  IAzureMapsContextProps,
  MapType
} from '../types'
import { drawing, control, DrawingManagerOptions } from 'azure-maps-drawing-tools'
import atlas from 'azure-maps-control'
import { AzureMapsContext } from './AzureMapContext'
import { useCheckRef, useCheckRefMount } from '../hooks/useCheckRef'
import { AzureMapDataSourceContext } from './AzureMapDataSourceContext'

type DrawingManagerType = drawing.DrawingManager
type IAzureDrawingManagerEventType =
  | 'drawingchanged'
  | 'drawingchanging'
  | 'drawingcomplete'
  | 'drawingmodechanged'
  | 'drawingstarted'
  | string

type IAzureDrawingManagerEvent = {
  [property in IAzureDrawingManagerEventType]?: (e: atlas.Shape | drawing.DrawingMode) => void
}

interface IAzureMapDrawingManagerProps {
  drawingManagerRef: drawing.DrawingManager | null
}

interface IAzureDrawingManagerStatefulProviderProps {
  options: DrawingManagerOptions
  events?: IAzureDrawingManagerEvent
  children?: Array<IAzureDataSourceChildren | null> | IAzureDataSourceChildren | null
}

const AzureMapDrawingManagerContext = createContext<IAzureMapDrawingManagerProps>({
  drawingManagerRef: null
})

const {
  Provider: DataSourceProvider,
  Consumer: AzureMapDataSourceConsumer
} = AzureMapDataSourceContext

const {
  Provider: DrawingManagerProvider,
  Consumer: AzureMapDrawingManagerConsumer
} = AzureMapDrawingManagerContext

/**
 * @param options
 * @param events
 */
const AzureMapDrawingManagerStatefulProvider = ({
  options,
  events,
  children
}: IAzureDrawingManagerStatefulProviderProps) => {
  const [drawingManagerRef, setDrawingManagerRef] = useState<drawing.DrawingManager | null>(null)
  const [dataSourceRef, setDataSourceRef] = useState<atlas.source.DataSource | null>(null)
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)

  useCheckRefMount<MapType, boolean>(mapRef, true, mref => {
    mref.events.add('ready', () => {
      const drawingManager = new drawing.DrawingManager(mref, options)
      setDataSourceRef(drawingManager.getSource())
      setDrawingManagerRef(drawingManager)
    })
  })

  useCheckRef<MapType, DrawingManagerType>(mapRef, drawingManagerRef, (mref, dref) => {
    for (const eventType in events) {
      mref.events.add(eventType as any, dref, events[eventType] as any)
    }
    mref.events.add('data', () => {
      console.log(drawingManagerRef!.getSource().toJson())
    })
    return () => {
      try {
        for (const eventType in events) {
          mref.events.remove(eventType as any, dref, events[eventType] as any)
        }
      } catch (e) {
        console.error('Error on remove drawing manager events', e)
      }
    }
  })

  useEffect(() => {
    if (drawingManagerRef && options) {
      drawingManagerRef.setOptions(options)
    }
  }, [options])

  return (
    <DataSourceProvider
      value={{
        dataSourceRef
      }}
    >
      <DrawingManagerProvider
        value={{
          drawingManagerRef
        }}
      >
        {mapRef && children}
      </DrawingManagerProvider>
    </DataSourceProvider>
  )
}

export {
  AzureMapDrawingManagerContext,
  AzureMapDrawingManagerConsumer,
  AzureMapDataSourceConsumer,
  AzureMapDrawingManagerStatefulProvider as AzureMapDrawingManagerProvider
}
