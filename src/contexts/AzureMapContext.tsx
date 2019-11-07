import React, { createContext, Component, ReactNode } from 'react'
import { Map } from 'azure-maps-control'
import { IAzureMapContextState, AzurewMapsContextProps, IAzureMapContextMethods } from '../types'

const AzureMapsContext = createContext<AzurewMapsContextProps>({
  mapRef: null,
  setMapRef: (mapRef: Map) => {},
  removeMapRef: () => {}
})
const { Provider, Consumer: AzureMapsConsumer } = AzureMapsContext

type IProps = {
  children: ReactNode
}

class AzureMapsStatefulProvider extends Component<IProps, IAzureMapContextState>
  implements IAzureMapContextMethods {
  constructor(props: IProps) {
    super(props)
    this.state = {
      mapRef: null
    }
  }

  setMapRef = (mapRef: Map) => {
    this.setState({ mapRef })
  }
  removeMapRef = () => {
    this.setState({ mapRef: null })
  }

  render() {
    const { children } = this.props
    return (
      <Provider
        value={{
          ...this.state,
          removeMapRef: this.removeMapRef,
          setMapRef: this.setMapRef
        }}
      >
        {children}
      </Provider>
    )
  }
}

export { AzureMapsContext, AzureMapsConsumer, AzureMapsStatefulProvider as AzureMapsProvider }
