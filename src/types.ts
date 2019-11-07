import { ComponentClass, StatelessComponent } from 'react'
import { ReactNode } from 'react'
import atlas, {
  Map,
  ServiceOptions,
  StyleOptions,
  UserInteractionOptions,
  CameraOptions,
  CameraBoundsOptions
} from 'azure-maps-control'

export type IAzureMapOptions = ServiceOptions &
  StyleOptions &
  UserInteractionOptions &
  (CameraOptions | CameraBoundsOptions)

export type IAzureMap = {
  childrens: ReactNode
  providedMapId?: string
  containerClassName?: string
  LoaderComponent?: ComponentClass<any> | StatelessComponent<any>
  mapCenter?: Position
  options?: IAzureMapOptions
}

export type IAzureMapContextState = {
  mapRef: Map | null
}

export type IAzureMapContextMethods = {
  setMapRef(mapRef: Map): void
  removeMapRef(): void
}

export type AzurewMapsContextProps = IAzureMapContextState & IAzureMapContextMethods
