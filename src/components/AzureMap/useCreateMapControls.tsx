import { IAzureCustomControls, IAzureMapControls, MapType } from '../../types'
import atlas, {
  CompassControlOptions,
  ControlOptions,
  PitchControlOptions,
  StyleControlOptions,
  ZoomControlOptions
} from 'azure-maps-control'

const control = atlas.control

export const useCreateMapControls = (mapRef: MapType, controls: IAzureMapControls[]) => {
  controls.forEach((control: IAzureMapControls) => {
    const { controlName, options, controlOptions } = control
    mapRef.controls.add(
      createControl(controlName, controlOptions) as atlas.ControlBase,
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
