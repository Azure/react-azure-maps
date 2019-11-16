import React, { Component, createContext, ReactElement } from 'react'
import {
  IAzureMapDataSourceProps,
  IAzureMapDataSourceContextState,
  IAzureMapDataSourceMethods,
  IAzureDataSourceStatefulProviderProps
} from '../types'
import { AzureMapsConsumer } from '../contexts/AzureMapContext'
import atlas, { source } from 'azure-maps-control'

const AzureMapDataSourceContext = createContext<IAzureMapDataSourceProps>({
  dataSourceRef: null
})
const { Provider, Consumer: AzureMapDataSourceConsumer } = AzureMapDataSourceContext

class AzureMapDataSourceStatefulProvider
  extends Component<IAzureDataSourceStatefulProviderProps, IAzureMapDataSourceContextState>
  implements IAzureMapDataSourceMethods {
  constructor(props: IAzureDataSourceStatefulProviderProps) {
    super(props)
    const { id, options } = this.props
    this.state = {
      dataSourceRef: new atlas.source.DataSource(id, options)
    }
  }

  componentDidMount() {
    this.initializeDataSource()
  }

  initializeDataSource() {
    const { mapRef } = this.props
    const { dataSourceRef } = this.state
    if (mapRef && dataSourceRef) {
      mapRef.sources.add(dataSourceRef)
    }
  }
  componentWillUnmount() {
    const { mapRef } = this.props
    const { dataSourceRef } = this.state
    if (mapRef && dataSourceRef) {
      mapRef.sources.remove(dataSourceRef)
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
  AzureMapDataSourceContext,
  AzureMapDataSourceConsumer,
  AzureMapDataSourceStatefulProvider as AzureDataSourceProvider
}
