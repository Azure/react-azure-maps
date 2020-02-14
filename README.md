# WiredSolutions React-Azure-Maps

`React Azure Maps` is a react wrapper for [Azure Maps](https://azure.microsoft.com/pl-pl/services/azure-maps/). The whole library is written in typescript and uses React 16.8+

## Installation

Use the package manager `npm` or `yarn`

```bash
npm install react-azure-maps
```

or

```bash
yarn add react-azure-maps
```

## Documentation

Documentation is available [Documentation](https://react-azure-maps.now.sh)

Generated documentation from typedoc is available [Documentation](https://wiredsolutions.github.io/react-azure-maps/docs/)

## Playground

`React Azure Maps` have a fully documented [Playground Package](https://github.com/WiredSolutions/react-azure-maps-playground) that implements a lot of features from [Azure Maps Code Samples](https://azuremapscodesamples.azurewebsites.net/). If you implement new usage of the map and want to be contributor just create a PR.

## Library Implementation Details

For typescript integration and core functionalities, this library uses the newest version of [Azure Maps Control](https://www.npmjs.com/package/azure-maps-control).
The library is implemented under the hood on `Contexts` and uses all benefits of new react features, like new context API, hooks, etc. Across the whole library, there are three main references that depend on the basic `Azure Maps API`

`MapReference` which is stored and implemented in

```javascript
AzureMapsProvider
```

`DataSourceReference` which is stored and implemented in

```javascript
AzureMapDataSourceProvider
```

`LayerReference` which is stored and implemented in

```javascript
AzureMapLayerProvider
```

If you want to directly make some changes in the above refs just use one of these contexts and feel free to use it any way you want.
The library implements a lot of ready to use components like `AzureMapFeature, AzureMapHTMLMarker, AzureMapPopup`

## Basic Usage

```javascript
import React from 'react'
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapHtmlMarker,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapHtmlMarkerEvent,
  IAzureMapOptions
} from 'react-azure-maps'
import { AuthenticationType, data } from 'azure-maps-control'
import { key } from '../key'

const DefaultMap = () => {
  const position = new data.Position(-100.01, 45.01)
  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
      },
      center: [-100.01, 45.01],
      zoom: 12,
      view: 'Auto'
    }
  }, [])
  return (
    <div
      style={{
        height: '300px'
      }}
    >
      <AzureMapsProvider>
        <AzureMap options={option}>
          <AzureMapDataSourceProvider id={'default DataSourceProvider'}>
            <AzureMapLayerProvider options={{}} type={'SymbolLayer'}></AzureMapLayerProvider>
            <AzureMapFeature
              type="Point"
              coordinate={position}
              properties={{
                title: 'Microsoft',
                icon: 'pin-round-blue'
              }}
            ></AzureMapFeature>
          </AzureMapDataSourceProvider>
          <AzureMapHtmlMarker
            markerContent={<div className="pulseIcon"></div>}
            options={{ position: [-110, 45] }}
          />
        </AzureMap>
      </AzureMapsProvider>
    </div>
  )
}
```

## Local development with [Playground Package](https://github.com/WiredSolutions/react-azure-maps-playground)

If you want to do some local development using [Playground Package](https://github.com/WiredSolutions/react-azure-maps-playground) with local link to the package, you need to make the following steps:

```bash
- run yarn watch in `react-azure-maps` package
- run yarn link in `react-azure-maps` package
- go to the `azure-maps-playground` or any other folder or repository and run `yarn link "react-azure-maps"`
```

## Contributing

Pull requests are welcomed. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
