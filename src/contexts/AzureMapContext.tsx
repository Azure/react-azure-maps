import React, { createContext, Component, ReactElement } from 'react'
import { Map } from 'azure-maps-control'
import {
  IAzureMapContextState,
  AzurewMapsContextProps,
  IAzureMapContextMethods,
  IAzureMap
} from '../types'

const AzureMapsContext = createContext<AzurewMapsContextProps>({
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

class AzureMapsStatefulProvider
  extends Component<IAzureMapsStatefulProviderProps, IAzureMapContextState>
  implements IAzureMapContextMethods {
  constructor(props: IAzureMapsStatefulProviderProps) {
    super(props)
    this.state = {
      mapRef: null,
      isMapReady: false
    }
  }

  setMapRef = (mapRef: Map) => {
    this.setState({ mapRef })
  }
  removeMapRef = () => {
    this.setState({ mapRef: null })
  }

  setMapReady = (isMapReady: boolean) => {
    this.setState({ isMapReady })
  }

  render() {
    const { children } = this.props
    return (
      <Provider
        value={{
          ...this.state,
          removeMapRef: this.removeMapRef,
          setMapRef: this.setMapRef,
          setMapReady: this.setMapReady
        }}
      >
        {children}
      </Provider>
    )
  }
}

export { AzureMapsContext, AzureMapsConsumer, AzureMapsStatefulProvider as AzureMapsProvider }
