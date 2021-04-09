import { renderHook } from '@testing-library/react-hooks'
import { createImageSprites } from './useCreateSprites'
import { Map } from 'azure-maps-control'

describe('createImageSprites tests', () => {
  it('should create image sprintes with icon field and call proper methods', async () => {
    const mockMap = new Map('#fake-container', {})
    const fakeImageSprite = {
      id: 'id',
      icon: 'icon',
      templateName: 'template',
      color: 'color',
      secondaryColor: 'color',
      scale: 1
    }
    const { result } = renderHook(() => createImageSprites(mockMap, [fakeImageSprite]))
    await result.current
    expect(mockMap.imageSprite.add).toHaveBeenCalledWith('id', 'icon')
    expect(mockMap.imageSprite.createFromTemplate).toHaveBeenCalledWith(
      'id',
      'template',
      'color',
      'color',
      1
    )
  })

  it('should create image sprintes with no icon field and not call imageSprite.add ', async () => {
    const mockMap = new Map('#fake-container', {})
    const fakeImageSprite = {
      id: 'id',
      templateName: 'template',
      color: 'color',
      secondaryColor: 'color',
      scale: 1
    }
    const { result } = renderHook(() => createImageSprites(mockMap, [fakeImageSprite]))
    await result.current
    expect(mockMap.imageSprite.add).not.toHaveBeenCalled()
    expect(mockMap.imageSprite.createFromTemplate).toHaveBeenCalledWith(
      'id',
      'template',
      'color',
      'color',
      1
    )
  })

  it('should create image sprintes with no icon and not call imageSprite.add with default template', async () => {
    const mockMap = new Map('#fake-container', {})
    const fakeImageSprite = {
      id: 'id',
      color: 'color',
      secondaryColor: 'color',
      scale: 1
    }
    const { result } = renderHook(() => createImageSprites(mockMap, [fakeImageSprite]))
    await result.current
    expect(mockMap.imageSprite.add).not.toHaveBeenCalled()
    expect(mockMap.imageSprite.createFromTemplate).toHaveBeenCalledWith(
      'id',
      'marker',
      'color',
      'color',
      1
    )
  })
})
