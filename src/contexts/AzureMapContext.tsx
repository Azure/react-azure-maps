import React, { createContext, Component, ReactElement } from 'react'
import { Map } from 'azure-maps-control'
import { IAzureMapContextState, IAzureMapsContextProps, IAzureMap } from '../types'

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

class AzureMapsStatefulProvider extends Component<
  IAzureMapsStatefulProviderProps,
  IAzureMapContextState
> {
  constructor(props: IAzureMapsStatefulProviderProps) {
    super(props)
    this.state = {
      mapRef: null,
      isMapReady: false,
      removeMapRef: this.removeMapRef,
      setMapRef: this.setMapRef,
      setMapReady: this.setMapReady
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
          ...this.state
        }}
      >
        {children}
      </Provider>
    )
  }
}

export { AzureMapsContext, AzureMapsConsumer, AzureMapsStatefulProvider as AzureMapsProvider }
