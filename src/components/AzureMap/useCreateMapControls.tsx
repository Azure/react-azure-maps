import { IAzureMapControls, MapType, IAzureCustomControls } from '../../types'
import atlas, {
  CompassControlOptions,
  ControlOptions,
  PitchControlOptions,
  StyleControlOptions,
  ZoomControlOptions,
  control
} from 'azure-maps-control'

export const useCreateMapControls = (mapRef: MapType, controls: IAzureMapControls[]) => {
  controls.forEach((control: IAzureMapControls) => {
    const { controlName, options, controlOptions } = control
    mapRef.controls.add(
      exported.createControl(controlName, controlOptions) as atlas.ControlBase,
      options as ControlOptions
    )
  })
}

export const createControl = (
  type: string,
  options?: ControlOptions
): atlas.ControlBase | undefined => {
  switch (type) {
    case 'CompassControl':
      return new control.CompassControl(options as CompassControlOptions)
    case 'PitchControl':
      return new control.PitchControl(options as PitchControlOptions)
    case 'StyleControl':
      return new control.StyleControl(options as StyleControlOptions)
    case 'ZoomControl':
      return new control.ZoomControl(options as ZoomControlOptions)
    default:
      console.warn('Check the type and passed props properties or try CustomControl')
  }
}

export const useCreateMapCustomControls = (
  mapRef: MapType,
  customControls: IAzureCustomControls[]
) => {
  customControls.forEach(({ control, controlOptions }: IAzureCustomControls) => {
    mapRef.controls.add(control, controlOptions)
  })
}

const exported = {
  useCreateMapCustomControls,
  createControl,
  useCreateMapControls
}
export default exported
