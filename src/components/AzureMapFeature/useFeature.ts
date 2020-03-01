import { useEffect } from 'react'
import { DataSourceType, IAzureMapFeature, ShapeType, FeatureType } from '../../types'
import { useCheckRef } from '../../hooks/useCheckRef'

export const useFeature = (
  { setCoords, setProperties }: IAzureMapFeature,
  dataSourceRef: DataSourceType | null,
  shapeRef: ShapeType | null,
  featureRef: FeatureType | null
) => {
  // Simple feature's usecases and methods
  useCheckRef<DataSourceType, FeatureType>(dataSourceRef, featureRef, (dref, fref) => {
    dref.add(fref)
    return () => {
      dref.remove(fref)
    }
  })

  // Shape's usecases and methods
  useCheckRef<DataSourceType, ShapeType>(dataSourceRef, shapeRef, (dref, sref) => {
    dref.add(sref)
    return () => {
      dref.remove(sref)
    }
  })

  useEffect(() => {
    if (shapeRef && setCoords) {
      shapeRef.setCoordinates(setCoords)
    }
  }, [setCoords])

  useEffect(() => {
    if (shapeRef && setProperties) {
      shapeRef.setProperties(setProperties)
    }
  }, [setProperties])
}
