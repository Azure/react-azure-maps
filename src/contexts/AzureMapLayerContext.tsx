import React, { Component, createContext, ReactElement } from 'react'
import {
  IAzureMapLayerProps,
  IAzureLayerStatefulProviderProps,
  IAzureMapLayerContextState,
  IAzureMapLayerMethods
} from '../types'
import { AzureMapsConsumer } from '../contexts/AzureMapContext'
import atlas from 'azure-maps-control'

const AzureMapLayerContext = createContext<IAzureMapLayerProps>({
  layerRef: null
})
const { Provider, Consumer: AzureMapLayerConsumer } = AzureMapLayerContext

class AzureMapLayerStatefulProvider
  extends Component<IAzureLayerStatefulProviderProps, IAzureMapLayerContextState>
  implements IAzureMapLayerMethods {
  constructor(props: IAzureLayerStatefulProviderProps) {
    super(props)
    this.state = {
      layerRef: null
    }
  }

  componentDidMount() {
    this.initializeLayer()
  }

  initializeLayer() {
    const { id, dataSourceRef, options, mapRef } = this.props
    const { layerRef } = this.state
    if (mapRef && layerRef && dataSourceRef) {
      this.setState({ layerRef: new atlas.layer.SymbolLayer(dataSourceRef, id, options) }, () => {
        mapRef.layers.add(layerRef)
      })
    }
  }

  componentWillUnmount() {
    const { mapRef } = this.props
    const { layerRef } = this.state
    if (mapRef && layerRef) {
      mapRef.layers.remove(layerRef)
    }
  }

  render() {
    const { children } = this.props
    return (
      <AzureMapsConsumer>
        {mapRef => (
          <Provider
            value={{
              ...this.state
            }}
          >
            {mapRef && children}
          </Provider>
        )}
      </AzureMapsConsumer>
    )
  }
}

export {
  AzureMapLayerContext,
  AzureMapLayerConsumer,
  AzureMapLayerStatefulProvider as AzureLayerProvider
}
