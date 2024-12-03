import { IAzureCustomControls, IAzureMapControls, MapType } from '../../types'
import atlas, {
  CompassControlOptions,
  ControlOptions,
  PitchControlOptions,
  StyleControlOptions,
  TrafficControlOptions,
  ZoomControlOptions,
  ScaleControlOptions,
  FullscreenControlOptions
} from 'azure-maps-control'

export const createMapControls = (mapRef: MapType, controls: IAzureMapControls[]) => {
  controls.forEach((control: IAzureMapControls) => {
    const { controlName, options, controlOptions } = control
    mapRef.controls.add(
      createControl(controlName, controlOptions) as atlas.control.ControlBase,
      options as ControlOptions
    )
  })
}

export const createControl = (
  type: string,
  options?: ControlOptions
): atlas.control.ControlBase | undefined => {
  switch (type) {
    case 'CompassControl':
      return new atlas.control.CompassControl(options as CompassControlOptions)
    case 'PitchControl':
      return new atlas.control.PitchControl(options as PitchControlOptions)
    case 'StyleControl':
      return new atlas.control.StyleControl(options as StyleControlOptions)
    case 'ZoomControl':
      return new atlas.control.ZoomControl(options as ZoomControlOptions)
    case 'TrafficControl':
      return new atlas.control.TrafficControl(options as TrafficControlOptions)
    case 'TrafficLegendControl':
      return new atlas.control.TrafficLegendControl()
    case 'ScaleControl':
      return new atlas.control.ScaleControl(options as ScaleControlOptions)
    case 'FullscreenControl':
      return new atlas.control.FullscreenControl(options as FullscreenControlOptions)
    default:
      console.warn('Check the type and passed props properties or try CustomControl')
  }
}

export const createMapCustomControls = (
  mapRef: MapType,
  customControls: IAzureCustomControls[]
) => {
  customControls.forEach(({ control, controlOptions }: IAzureCustomControls) => {
    mapRef.controls.add(control, controlOptions)
  })
}
