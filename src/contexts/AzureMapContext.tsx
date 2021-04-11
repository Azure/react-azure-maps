import React, { createContext, ReactElement, useState ,useContext} from 'react'
import { Map } from 'azure-maps-control'
import { IAzureMap, IAzureMapsContextProps } from '../types'

export const AzureMapsContext = createContext<IAzureMapsContextProps>({
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

const useAzureMaps = () => useContext<IAzureMapsContextProps>(AzureMapsContext)

export { AzureMapsConsumer, AzureMapsStatefulProvider as AzureMapsProvider, useAzureMaps }
