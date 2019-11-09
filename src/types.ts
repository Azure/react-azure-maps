import { ComponentClass, ReactElement, StatelessComponent } from 'react'
import {
  CameraBoundsOptions,
  CameraOptions,
  HtmlMarker,
  HtmlMarkerOptions,
  Map,
  MapMouseEvent,
  ServiceOptions,
  StyleOptions,
  UserInteractionOptions
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

export type IAzureMapMouseEventCollection =
  | 'mousedown'
  | 'mouseup'
  | 'mouseover'
  | 'mousemove'
  | 'click'

export type HtmlMarkerMouseEvent = {
  eventName: IAzureMapMouseEventCollection
  callback: () => void
}

export type IAzureMapMouseEvents = {
  mousedown: (e: MapMouseEvent) => void
  mouseup: (e: MapMouseEvent) => void
  mouseover: (e: MapMouseEvent) => void
  mousemove: (e: MapMouseEvent) => void
  click: (e: MapMouseEvent) => void
  mouseout: (e: MapMouseEvent) => void
  contextmenu: (e: MapMouseEvent) => void
  dblclick: (e: MapMouseEvent) => void
}

export type IAzureMapEvents = {
  mouseEvents: IAzureMapMouseEvents
}

export type IAzureMapHtmlMarker = {
  id?: string
  options: HtmlMarkerOptions
  events?: HtmlMarkerMouseEvent
}

export type IAzureMapMouseEventRef = HtmlMarker // && other possible iterfaces

export type AzureMapsContextProps = IAzureMapContextState & IAzureMapContextMethods
