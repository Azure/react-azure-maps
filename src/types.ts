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
  SymbolLayerOptions,
  HeatMapLayerOptions,
  ImageLayerOptions,
  LineLayerOptions,
  PolygonExtrusionLayerOptions,
  PolygonLayerOptions,
  TileLayerOptions,
  MapTouchEvent,
  MapMouseEvent,
  MapMouseWheelEvent,
  Shape
} from 'azure-maps-control'

export type IAzureMapOptions = ServiceOptions &
  StyleOptions &
  UserInteractionOptions &
  (CameraOptions | CameraBoundsOptions)

export type IAzureMapChildren =
  | ReactElement<IAzureMapHtmlMarker>
  | ReactElement<IAzureMapDataSourceProps>

export type IAzureMap = {
  children?: Array<IAzureMapChildren> | IAzureMapChildren
  providedMapId?: string
  containerClassName?: string
  LoaderComponent?: ComponentClass<any> | StatelessComponent<any>
  mapCenter?: Position
  options?: IAzureMapOptions
}

export type IAzureMapContextState = {
  mapRef: Map | null
  isMapReady: boolean | false
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

export type IAzureMapLayerContextState = {
  layerRef: atlas.layer.SymbolLayer | atlas.layer.ImageLayer | atlas.layer.TileLayer | null
}

export type IAzureDataSourceChildren =
  | ReactElement<IAzureMapFeature>
  | ReactElement<IAzureLayerStatefulProviderProps>

export type IAzureMapDataSourceEvent = {
  [property in IAzureMapDataSourceEventType]: (e: Shape[]) => void
}

export type IAzureDataSourceStatefulProviderProps = {
  id: string
  children?: Array<IAzureDataSourceChildren>
  options?: DataSourceOptions
  events?: IAzureMapDataSourceEvent | any
}

export type IAzureMapLayerEvent = {
  [property in IAzureMapLayerEventType]: (
    e: MapMouseEvent | MapTouchEvent | MapMouseWheelEvent
  ) => void
}

export type IAzureMapLifecycleEvent = {
  [property in IAzureMapLayerLifecycleEvents]: (e: atlas.layer.Layer) => void
}

export type IAzureLayerStatefulProviderProps = {
  id?: string
  options: SymbolLayerOptions &
    HeatMapLayerOptions &
    ImageLayerOptions &
    LineLayerOptions &
    PolygonExtrusionLayerOptions &
    PolygonLayerOptions &
    TileLayerOptions
  type: IAzureMapLayerType
  events?: IAzureMapLayerEvent | any
  lifecycleEvents?: IAzureMapLifecycleEvent | any
}

export type IAzureMapLayerLifecycleEvents = 'layeradded' | 'layerremoved'

export type IAzureMapDataSourceEventType = 'dataadded' | 'dataremoved'

export type IAzureMapLayerEventType =
  // Mouse events
  | 'mousedown'
  | 'mouseup'
  | 'mouseover'
  | 'mousemove'
  | 'click'
  | 'dblclick'
  | 'mouseout'
  | 'mouseenter'
  | 'mouseleave'
  | 'contextmenu'
  // Wheel events
  | 'wheel'
  // Touch events
  | 'touchstart'
  | 'touchend'
  | 'touchmove'
  | 'touchcancel'

export type IAzureMapLayerType =
  | 'SymbolLayer'
  | 'HeatLayer'
  | 'ImageLayer'
  | 'LineLayer'
  | 'PolygonExtrusionLayer'
  | 'PolygonLayer'
  | 'TitleLayer'

export type IAzureMapFeatureType =
  | 'Point'
  | 'MultiPoint'
  | 'LineString'
  | 'MultiLineString'
  | 'Polygon'
  | 'MultiPolygon'

export type IAzureMapFeature = {
  id?: string
  type: IAzureMapFeatureType
  coordinate?: atlas.data.Position
  coordinates?: Array<atlas.data.Position>
  multipleCoordinates?: Array<Array<atlas.data.Position>>
  multipleDimensionCoordinates?: Array<Array<Array<atlas.data.Position>>>
  bbox?: atlas.data.BoundingBox
  properties?: Object //It is required by lib
}

export type IAzureMapLayerProps = IAzureMapLayerContextState
export type IAzureMapMouseEventRef = HtmlMarker // && other possible iterfaces
export type IAzureMapsContextProps = IAzureMapContextState
export type IAzureMapDataSourceProps = IAzureMapDataSourceContextState
