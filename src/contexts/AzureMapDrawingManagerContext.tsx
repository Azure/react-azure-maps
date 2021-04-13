import React, { createContext, useContext, useEffect, useState } from 'react'
import 'azure-maps-drawing-tools/dist/atlas-drawing.min.css'

import atlas from 'azure-maps-control'
import { drawing } from 'azure-maps-drawing-tools'
import {
  DrawingManagerType,
  IAzureDrawingManagerStatefulProviderProps,
  IAzureDrawingManagerEventType,
  IAzureDrawingManagerDrawingEventType,
  IAzureMapDrawingManagerProps,
  IAzureMapsContextProps,
  MapType
} from '../types'
import { AzureMapsContext } from './AzureMapContext'
import { useCheckRef } from '../hooks/useCheckRef'
import { Shape } from 'azure-maps-control'
import { AzureMapDataSourceContext } from './AzureMapDataSourceContext'

const AzureMapDrawingManagerContext = createContext<IAzureMapDrawingManagerProps>({
  drawingManagerRef: null
})

const { Provider: DrawingManagerProvider, Consumer: AzureMapDrawingManagerConsumer } = AzureMapDrawingManagerContext
const { Provider: DataSourceProvider } = AzureMapDataSourceContext

// FIXME: this is used until ts understanding azure-maps-control.EventManager extension in azure-maps-drawing-tools is resolved
// copies EventManager definitions from azure-maps-drawing-tools
interface _EventManager {
  add(eventType: "drawingmodechanged", target: drawing.DrawingManager, callback: (e: drawing.DrawingMode) => void): void;
  add(eventType: "drawingchanged" | "drawingchanging" | "drawingcomplete" | "drawingstarted", target: drawing.DrawingManager, callback: (e: Shape) => void): void;
  remove(eventType: string, target: drawing.DrawingManager, callback: (e?: any) => void): void
} 

const AzureMapDrawingManagerStatefulProvider = ({
  options,
  children,
  events = {}
}: IAzureDrawingManagerStatefulProviderProps) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const [drawingManagerRef, setDrawingManagerRef] = useState<drawing.DrawingManager | null>(null)
  const [dataSourceRef, setDataSourceRef] = useState<atlas.source.DataSource | null>(null)

  useCheckRef<MapType, DrawingManagerType>(mapRef, drawingManagerRef, (mref, dmref) => {
    mref.events.add('ready', () => {
      const drawingManager = new drawing.DrawingManager(mref, options)
      setDrawingManagerRef(drawingManager)
      setDataSourceRef(drawingManager.getSource())
      drawingManager.getLayers()

      // register drawing events
      for (const eventType in events) {
        const handler = events[eventType as IAzureDrawingManagerEventType]
        if(!handler){ 
          continue 
        }

        // NOTE: duplication to have the explicit types instead of any
        if(eventType == 'drawingmodechanged'){
          (mref.events as _EventManager).add(eventType, dmref, handler as (a: drawing.DrawingMode) => void)
        } else {
          (mref.events as _EventManager).add(eventType as IAzureDrawingManagerDrawingEventType, dmref, handler as (e: Shape) => void)
        }
      }

      return () => {
        setDrawingManagerRef(null)
        setDataSourceRef(null)

        for (const eventType in events) {
          const handler = events[eventType as IAzureDrawingManagerEventType];
          if(handler){
            (mref.events as _EventManager).remove(eventType, dmref, handler)
          }
        }
      }
    })
  })
  
  useEffect(() => {
    if(drawingManagerRef && options){ 
      drawingManagerRef.setOptions(options)
    }
  }, [drawingManagerRef, options])  

  return (
    <DrawingManagerProvider
      value={{
        drawingManagerRef
      }}
    >
      <DataSourceProvider value={{ dataSourceRef }}>
        {mapRef && drawingManagerRef && children}
      </DataSourceProvider>
    </DrawingManagerProvider>
  )
}

export {
  AzureMapDrawingManagerContext,
  AzureMapDrawingManagerConsumer,
  AzureMapDrawingManagerStatefulProvider as AzureMapDrawingManagerProvider
}
