import { useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import atlas from 'azure-maps-control'

import { IAzureMapPopup } from '../../types'
export const useCreatePopup = ({
  options,
  popupContent
}: Pick<IAzureMapPopup, 'popupContent' | 'options'>) => {
  const [popupRef] = useState<atlas.Popup>(
    new atlas.Popup({ ...options, content: ReactDOMServer.renderToStaticMarkup(popupContent) })
  )
  return popupRef
}

export default useCreatePopup
