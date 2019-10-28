import { ComponentClass, StatelessComponent } from 'react'
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
  providedMapId?: string
  containerClassName?: string
  onMapMount?: (mapRef: Map) => void
  LoaderComponent?: ComponentClass<any> | StatelessComponent<any>
  mapCenter?: Position
  options?: IAzureMapOptions
}
