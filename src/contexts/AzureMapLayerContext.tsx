import React, { createContext } from 'react'
import { IAzureLayerStatefulProviderProps, IAzureMapLayerProps } from '../types'
import { useAzureMapLayer } from '../hooks/useAzureMapLayer'

const AzureMapLayerContext = createContext<IAzureMapLayerProps>({
  layerRef: null
})
const { Provider, Consumer: AzureMapLayerConsumer } = AzureMapLayerContext

const AzureMapLayerStatefulProvider = ({
  id,
  options,
  type,
  events,
  lifecycleEvents,
  onCreateCustomLayer
}: IAzureLayerStatefulProviderProps) => {
  const { layerRef } = useAzureMapLayer({
    id,
    options,
    type,
    events,
    lifecycleEvents,
    onCreateCustomLayer
  })
  return (
    <Provider
      value={{
        layerRef
      }}
    ></Provider>
  )
}

export {
  AzureMapLayerContext,
  AzureMapLayerConsumer,
  AzureMapLayerStatefulProvider as AzureMapLayerProvider
}
