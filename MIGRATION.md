## Migrating from v0.x to v1.0

### Styling
v1.0 removes the internal css import from `azure-maps-control` to accommodate usage in Next.js. You will need to add the following stylesheet to your application manually. The stylesheet is required for the marker, popup and control components in `react-azure-maps` to work properly.
```javascript
import 'azure-maps-control/dist/atlas.min.css'
```