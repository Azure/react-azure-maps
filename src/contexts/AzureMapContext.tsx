import React, { createContext, ReactElement, useState } from 'react'
import { Map } from 'azure-maps-control'
import { IAzureMap, IAzureMapsContextProps } from '../types'

const AzureMapsContext = createContext<IAzureMapsContextProps>({
  mapRef: null,
  isMapReady: false,
  setMapRef: (mapRef: Map) => {},
  removeMapRef: () => {},
  setMapReady: () => {}
})
const { Provider, Consumer: AzureMapsConsumer } = AzureMapsContext

type IAzureMapsStatefulProviderProps = {
  children?: ReactElement<IAzureMap>
}

const AzureMapsStatefulProvider = ({ children }: IAzureMapsStatefulProviderProps) => {
  const [mapRef, setMapRef] = useState<Map | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  return (
    <Provider
      value={{
        mapRef,
        setMapRef,
        isMapReady,
        setMapReady: setIsMapReady,
        removeMapRef: () => setMapRef(null)
      }}
    >
      {children}
    </Provider>
  )
}

export { AzureMapsContext, AzureMapsConsumer, AzureMapsStatefulProvider as AzureMapsProvider }
