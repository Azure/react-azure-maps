import { ComponentClass, StatelessComponent } from 'react'
import { ReactElement } from 'react'
import atlas, {
  Map,
  ServiceOptions,
  StyleOptions,
  UserInteractionOptions,
  CameraOptions,
  CameraBoundsOptions,
  HtmlMarkerOptions
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

export type IAzureMapHtmlMarker = {
  id?: string
  options: HtmlMarkerOptions
}

export type AzureMapsContextProps = IAzureMapContextState & IAzureMapContextMethods
