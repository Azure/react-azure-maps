import { renderHook, act } from '@testing-library/react-hooks'

import controlsHooks from './useCreateMapControls'
import atlas, { Map } from 'azure-maps-control'
import { IAzureMapControls } from '../../types'

// Mock current control implementation
jest.mock('azure-maps-control', () => ({
  Map: jest.fn(() => ({
    controls: {
      add: jest.fn()
    }
  }))
}))

const mockMap = new Map('#fake-container', {})
mockMap.controls.add = jest.fn()
const fakeControls: IAzureMapControls[] = [
  {
    controlName: 'fake',
    options: {
      option1: 'option1-value'
    }
  },
  {
    controlName: 'fake',
    options: {
      option1: 'option1-value'
    }
  }
]

describe('useCreateMapControls tests', () => {
  it('should create map controls and call proper method', () => {
    const spyOnCreateControl = jest
      .spyOn(controlsHooks, 'createControl')
      .mockImplementation(() => undefined)
    renderHook(() => controlsHooks.useCreateMapControls(mockMap, fakeControls))
    expect(spyOnCreateControl).toHaveBeenCalledTimes(2)
    expect(mockMap.controls.add).toHaveBeenCalledWith(undefined, fakeControls[0].options)
    expect(mockMap.controls.add).toHaveBeenCalledWith(undefined, fakeControls[1].options)
  })
})
