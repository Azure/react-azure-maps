import { ComponentClass, ReactElement, StatelessComponent } from 'react'
import {
  CameraBoundsOptions,
  CameraOptions,
  HtmlMarker,
  HtmlMarkerOptions,
  Map,
  ServiceOptions,
  StyleOptions,
  UserInteractionOptions,
  HtmlMarkerEvents,
  TargetedEvent
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

export type IAzureMapEvents = {
  mouseEvents: IAzureMapMouseEvents
}

export type IAzureMapHtmlMarker = {
  id?: string
  options: HtmlMarkerOptions
  events?: Array<IAzureMapHtmlMarkerEvent>
}

export type IAzureMapMouseEventRef = HtmlMarker // && other possible iterfaces

export type AzureMapsContextProps = IAzureMapContextState & IAzureMapContextMethods
