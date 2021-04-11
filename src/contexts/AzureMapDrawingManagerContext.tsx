import React, { createContext, useContext, useEffect, useState } from 'react'
import 'azure-maps-drawing-tools/dist/atlas-drawing.min.css'

import {
  IAzureDrawingManagerStatefulProviderProps,
  IAzureMapDrawingManagerProps,
  IAzureMapsContextProps,
  MapType
} from '../types'
import { drawing } from 'azure-maps-drawing-tools'
import { AzureMapsContext } from './AzureMapContext'
import { useCheckRefMount } from '../hooks/useCheckRef'

const AzureMapDrawingManagerContext = createContext<IAzureMapDrawingManagerProps>({
  drawingManagerRef: null
})

const {
  Provider: DrawingManagerProvider,
  Consumer: AzureMapDrawingManagerConsumer
} = AzureMapDrawingManagerContext

const AzureMapDrawingManagerStatefulProvider = ({
  options,
  children
}: IAzureDrawingManagerStatefulProviderProps) => {
  const { mapRef } = useContext<IAzureMapsContextProps>(AzureMapsContext)
  const [drawingManagerRef, setDrawingManagerRef] = useState<drawing.DrawingManager | null>(null)

  useCheckRefMount<MapType, boolean>(mapRef, true, mref => {
    // @ts-ignore
    const drawingManager = new drawing.DrawingManager(mref)
    drawingManager.setOptions(options)
    setDrawingManagerRef(drawingManager)
  })

  useEffect(() => {
    if (drawingManagerRef && options) {
      drawingManagerRef.setOptions(options)
    }
  }, [options])

  return (
    <DrawingManagerProvider
      value={{
        drawingManagerRef
      }}
    >
      {mapRef && drawingManagerRef && children}
    </DrawingManagerProvider>
  )
}

export {
  AzureMapDrawingManagerContext,
  AzureMapDrawingManagerConsumer,
  AzureMapDrawingManagerStatefulProvider as AzureMapDrawingManagerProvider
}
