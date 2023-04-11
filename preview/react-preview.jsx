import React from 'react'
import { createRoot } from 'react-dom/client'
import { AzureMap, AzureMapsProvider, AuthenticationType } from '../dist/react-azure-maps.es5'

const option = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: ''
  }
}

const DefaultMap = () => (
  <AzureMapsProvider>
    <div style={{ height: '300px' }}>
      <AzureMap options={option} />
    </div>
  </AzureMapsProvider>
)

export default DefaultMap

createRoot(document.getElementById('root')).render(<DefaultMap />)
