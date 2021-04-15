import { renderHook } from '@testing-library/react-hooks'
import {
  createControl,
  createMapControls,
  createMapCustomControls
} from './useCreateMapControls'
import { Map } from 'azure-maps-control'
import { IAzureMapControls, IAzureCustomControls } from '../../types'

const fakeDefaultControls: IAzureMapControls[] = [
  {
    controlName: 'CompassControl',
    options: {
      option1: 'option1-value'
    }
  },
  {
    controlName: 'CompassControl',
    options: {
      option1: 'option1-value'
    }
  }
]

const fakeCustomControlls: IAzureCustomControls[] = [
  {
    control: { onAdd: jest.fn(), onRemove: jest.fn() },
    controlOptions: {}
  }
]

describe('Control hooks', () => {
  describe('useCreateMapControls tests', () => {
    it('should create two map controls and call proper method', () => {
      const mockMap = new Map('#fake-container', {})
      mockMap.controls.add = jest.fn()
      renderHook(() => createMapControls(mockMap, fakeDefaultControls))
      expect(mockMap.controls.add).toHaveBeenCalledWith(
        { compassOption: 'option' },
        fakeDefaultControls[0].options
      )
      expect(mockMap.controls.add).toHaveBeenCalledWith(
        { compassOption: 'option' },
        fakeDefaultControls[1].options
      )
    })
  })

  describe('createMapCustomControls tests', () => {
    it('should create custom map controls and call proper method', () => {
      const mockMap = new Map('#fake-container', {})
      mockMap.controls.add = jest.fn()
      renderHook(() => createMapCustomControls(mockMap, fakeCustomControlls))
      expect(mockMap.controls.add).toHaveBeenCalledTimes(1)
      expect(mockMap.controls.add).toHaveBeenCalledWith(
        fakeCustomControlls[0].control,
        fakeCustomControlls[0].controlOptions
      )
    })
  })

  describe('createControl', () => {
    it('should return PitchControl if type equal PitchControl', () => {
      const createdControl = createControl('PitchControl', {})
      expect(createdControl).toEqual({ pitchOption: 'option' })
    })

    it('should return ZoomControl if type equal StyleControl', () => {
      const createdControl = createControl('ZoomControl', {})
      expect(createdControl).toEqual({ zoomOption: 'option' })
    })

    it('should return StyleControl if type equal StyleControl', () => {
      const createdControl = createControl('StyleControl', {})
      expect(createdControl).toEqual({ styleOption: 'option' })
    })

    it('should return CompassControl if type equal CompassControl', () => {
      const createdControl = createControl('CompassControl', {})
      expect(createdControl).toEqual({ compassOption: 'option' })
    })

    it('should return TrafficControl if type equal TrafficControl', () => {
      const createdControl = createControl('TrafficControl', {})
      expect(createdControl).toEqual({ trafficOption: 'option' })
    })

    it('should return TrafficLegendControl if type equal TrafficLegendControl', () => {
      const createdControl = createControl('TrafficLegendControl', {})
      expect(createdControl).toEqual({ trafficLegendOption: 'option' })
    })

    it('should return undefined if there is no control with type', () => {
      const createdControl = createControl('SomeOtherType', {})
      expect(createdControl).toEqual(undefined)
    })
  })
})
