# WiredSolutions React-Azure-Maps

[![npm](https://img.shields.io/npm/v/react-azure-maps.svg) ![npm](https://img.shields.io/npm/dm/react-azure-maps.svg)](https://www.npmjs.com/package/react-azure-maps) [![license](https://img.shields.io/npm/l/react-azure-maps.svg)](https://github.com/WiredSolutions/react-azure-maps/blob/master/LICENSE)

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

Generated documentation from typedoc is available [Documentation](https://wiredsolutions.github.io/react-azure-maps/)

## Compatibility with azure-maps-controls

```
0.2.0 - 2.0.32
0.1.4 - 2.0.31
0.1.3 - 2.0.25
```

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
import {AzureMap, AzureMapsProvider, IAzureMapOptions} from 'react-azure-maps'
import {AuthenticationType} from 'azure-maps-control'

const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: '' // Your subscription key
    },
}

const DefaultMap: React.FC = () => (
  <AzureMapsProvider>
    <div style={{ height: '300px' }}>
      <AzureMap options={option} />
    </div>
  </AzureMapsProvider>
);

export default DefaultMap
```

## Local development with [Playground Package](https://github.com/WiredSolutions/react-azure-maps-playground)

If you want to do some local development using [Playground Package](https://github.com/WiredSolutions/react-azure-maps-playground) with local link to the package, you need to make the following steps:

```bash
- run yarn watch in `react-azure-maps` package
- run yarn link in `react-azure-maps` package
- go to the `azure-maps-playground` or any other folder or repository and run `yarn link "react-azure-maps"`
```

## Code coverage

![Alt text](assets/coverage.png?raw=true 'Coverage')

## Contributing

Pull requests are welcomed. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
