import { useState, useEffect } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import atlas from 'azure-maps-control'

import { IAzureMapPopup } from '../../types'
export const useCreatePopup = ({
  options,
  popupContent
}: Pick<IAzureMapPopup, 'popupContent' | 'options'>) => {
  const [popupRef] = useState<atlas.Popup>(
    new atlas.Popup({ ...options, content: renderToStaticMarkup(popupContent) })
  )

  useEffect(() => {
    popupRef.setOptions({
      ...options,
      content: renderToStaticMarkup(popupContent)
    })
  }, [options, popupContent])

  return popupRef
}

export default useCreatePopup
