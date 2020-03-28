import React from 'react'
import { render, act } from '@testing-library/react'
import { AzureMapLayerProvider } from './AzureMapLayerContext'

describe('AzureMapLayerProvider', () => {
  it('should create and render AzureMapLayerProvider', () => {
    const { container } = render(<AzureMapLayerProvider type="SymbolLayer" />)
    expect(container).toMatchSnapshot()
  })
})
