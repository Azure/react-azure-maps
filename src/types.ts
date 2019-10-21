import { ComponentClass, StatelessComponent } from 'react'
import {
  Map,
  data,
  ServiceOptions,
  StyleOptions,
  UserInteractionOptions,
  CameraBoundsOptions,
  CameraOptions,
  AuthenticationOptions
} from 'azure-maps-control'

export type IAzureMap = {
  providedMapId?: string
  containerClassName?: string
  onMapMount: (mapRef: Map) => void
  LoaderComponent: ComponentClass<any> | StatelessComponent<any>
  mapCenter: data.Position
  options: AuthenticationOptions &
    ServiceOptions &
    StyleOptions &
    UserInteractionOptions &
    (CameraOptions | CameraBoundsOptions)
}
