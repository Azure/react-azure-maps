## Migrating from v0.x to v1.0

### azure-maps-control dependency
`azure-maps-control` is installed as a peerDependencies package, you will need to add it to your package.json.
```
npm install --save azure-maps-control@next
```
This will install `azure-maps-control` v3 to your application. You may upgrade it independently in the future. See [AzureMaps WebSDK release notes](https://learn.microsoft.com/azure/azure-maps/release-notes-map-control) for a list of new features and bug fixes.

### Styling
v1.0 removes the internal css import from `azure-maps-control` to accommodate usage in Next.js. You will need to add the following stylesheet to your application manually. The stylesheet is required for the marker, popup and control components in `react-azure-maps` to work properly.
```javascript
import 'azure-maps-control/dist/atlas.min.css'
```