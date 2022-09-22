# React-Azure-Maps

This project is community-driven initiative originally created by amazing [@psrednicki](https://github.com/psrednicki), [@msasinowski](https://github.com/msasinowski) and [@tbajda](https://github.com/tbajda) and is now maintained by the Azure Maps team.

[![npm](https://img.shields.io/npm/v/react-azure-maps.svg) ![npm](https://img.shields.io/npm/dm/react-azure-maps.svg)](https://www.npmjs.com/package/react-azure-maps) [![license](https://img.shields.io/npm/l/react-azure-maps.svg)](https://github.com/Azure/react-azure-maps/blob/master/LICENSE)

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

## Styling
Embed the following css to your application. The stylesheet is required for the marker, popup and control components in `react-azure-maps` to work properly.
```javascript
import 'azure-maps-control/dist/atlas.min.css'
```

## Documentation

Documentation is available [Documentation](https://react-azure-maps.now.sh)

Generated documentation from typedoc is available [Documentation](https://azure.github.io/react-azure-maps/)

## Compatibility with azure-maps-controls

```
0.2.0 - 2.0.32
0.1.4 - 2.0.31
0.1.3 - 2.0.25
```

## Playground

`React Azure Maps` have a fully documented [Playground Package](https://github.com/Azure/react-azure-maps-playground) that implements a lot of features from [Azure Maps Code Samples](https://azuremapscodesamples.azurewebsites.net/). If you implement new usage of the map and want to be contributor just create a PR.

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

## Local development with [Playground Package](https://github.com/Azure/react-azure-maps-playground)

If you want to do some local development using [Playground Package](https://github.com/Azure/react-azure-maps-playground) with local link to the package, you need to make the following steps:

```bash
- run yarn watch in `react-azure-maps` package
- run yarn link in `react-azure-maps` package
- go to the `azure-maps-playground` or any other folder or repository and run `yarn link "react-azure-maps"`
```

## Code coverage

![Alt text](assets/coverage.png?raw=true 'Coverage')

## Contributing

Pull requests are welcomed. For major changes, please open an issue first to discuss what you would like to change.

## Creators ✨

<!-- CREATORS:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td style="text-align: center; vertical-align: middle;">
      <a href="https://github.com/psrednicki"
        ><img
          src="https://avatars2.githubusercontent.com/u/41010528?v=4"
          width="100px;"
          alt=""
        /><br /><sub><b>psrednicki</b></sub></a
      ><br />
    <div>
      <a
        href="https://pl.linkedin.com/in/patryk-%C5%9Brednicki-718204187/"
        title="LinkedIn"
        style="text-align:center"
        ><img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          width="24px;"
          alt=""
      /></a>
    </div>
    </td>
    <td style="text-align: center; vertical-align: middle;">
      <a href="https://github.com/msasinowski"
        ><img
          src="https://avatars2.githubusercontent.com/u/38035075?v=4"
          width="100px;"
          alt=""
        /><br /><sub><b>msasinowski</b></sub></a
      >
    <div>
      <a
        href="https://www.linkedin.com/in/maciej-sasinowski-92076815a/"
        title="LinkedIn"
        style="text-align:center"
        ><img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          width="24px;"
          alt=""
      /></a>
    </div>
    </td>
    <td style="text-align: center; vertical-align: middle;">
      <a href="https://github.com/tbajda"
        ><img
          src="https://avatars2.githubusercontent.com/u/27700326?v=4"
          width="100px;"
          alt=""
        /><br /><sub><b>tbajda</b></sub></a
      >
    <div>
      <a
        href="https://www.linkedin.com/in/tomasz-bajda-ab4468165/"
        title="LinkedIn"
        ><img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          width="24px;"
          alt=""
      /></a>
    </div>
    </td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- CREATORS:END -->


## License

[MIT](https://choosealicense.com/licenses/mit/)
