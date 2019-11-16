import { ComponentClass, ReactElement, StatelessComponent } from 'react'
import atlas, {
  CameraBoundsOptions,
  CameraOptions,
  HtmlMarker,
  HtmlMarkerOptions,
  Map,
  ServiceOptions,
  StyleOptions,
  UserInteractionOptions,
  HtmlMarkerEvents,
  TargetedEvent,
  DataSourceOptions,
  LayerOptions
} from 'azure-maps-control'

export type IAzureMapOptions = ServiceOptions &
  StyleOptions &
  UserInteractionOptions &
  (CameraOptions | CameraBoundsOptions)

export type IAzureMap = {
  children?: ReactElement<IAzureMapHtmlMarker>
  providedMapId?: string
  containerClassName?: string
  LoaderComponent?: ComponentClass<any> | StatelessComponent<any>
  mapCenter?: Position
  options?: IAzureMapOptions
}

export type IAzureMapContextState = {
  mapRef: Map | null
  isMapReady: boolean | false
}

export type IAzureMapContextMethods = {
  setMapRef(mapRef: Map): void
  removeMapRef(): void
  setMapReady(isMapReady: boolean): void
}

export type IAzureMapHtmlMarkerEvent = {
  eventName: keyof HtmlMarkerEvents
  callback: (e: TargetedEvent) => void
}

export type IAzureMapMouseEvents = {
  [T in keyof HtmlMarkerEvents]: (e: TargetedEvent) => void
}

export type IAzureMapHtmlMarker = {
  id?: string
  options: HtmlMarkerOptions
  events?: Array<IAzureMapHtmlMarkerEvent>
}

export type IAzureMapDataSourceContextState = {
  dataSourceRef: atlas.source.DataSource | null
}

export type IAzureMapDataSourceMethods = {}

export type IAzureMapLayerContextState = {
  layerRef: atlas.layer.SymbolLayer | null
}

export type IAzureMapLayerMethods = {}

export type IAzureDataSourceStatefulProviderProps = {
  id: string
  children?: ReactElement<IAzureMapFeature>
  options: DataSourceOptions
} & IAzureMapsContextProps

export type IAzureLayerStatefulProviderProps = {
  id: string
  options: LayerOptions
} & IAzureMapsContextProps &
  IAzureMapDataSourceProps

export type IAzureMapFeatureType =
  | 'Point'
  | 'MultiPoint'
  | 'LineString'
  | 'MultiLineString'
  | 'Polygon'
  | 'MultiPolygon'

export type IAzureMapFeature = {
  id: string
  type: IAzureMapFeatureType
  coordinates: atlas.data.Position &
    Array<atlas.data.Position> &
    Array<Array<atlas.data.Position>> &
    Array<Array<Array<atlas.data.Position>>>
  bbox?: atlas.data.BoundingBox
  properties: Object //It is required by lib
}

export type IAzureMapLayerProps = IAzureMapLayerContextState & IAzureMapLayerMethods
export type IAzureMapMouseEventRef = HtmlMarker // && other possible iterfaces
export type IAzureMapsContextProps = IAzureMapContextState & IAzureMapContextMethods
export type IAzureMapDataSourceProps = IAzureMapDataSourceContextState & IAzureMapDataSourceMethods
