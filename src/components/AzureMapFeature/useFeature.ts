import { useEffect } from 'react'
import { DataSourceType, IAzureMapFeature, ShapeType, FeatureType } from '../../types'
import { useCheckRef } from '../../hooks/useCheckRef'
import atlas from 'azure-maps-control'

export const useFeature = (
  { setCoords, setProperties }: IAzureMapFeature,
  dataSourceRef: DataSourceType | null,
  shapeRef: ShapeType | null,
  featureRef: FeatureType | null
) => {
  // Simple feature's usecases and methods
  useCheckRef<DataSourceType, FeatureType>(dataSourceRef, featureRef, (dref, fref) => {
    if(dref instanceof atlas.source.DataSource){
      dref.add(fref)
      return () => {
        dref.remove(fref)
      }
    } else if (dataSourceRef instanceof atlas.source.VectorTileSource) {
      console.error(`Unable to add Feature(${fref.id}) to VectorTileSource(${dataSourceRef.getId()}): AzureMapFeature has to be a child of AzureMapDataSourceProvider`)
    }
  })

  // Shape's usecases and methods
  useCheckRef<DataSourceType, ShapeType>(dataSourceRef, shapeRef, (dref, sref) => {
    if(dref instanceof atlas.source.DataSource){
      dref.add(sref)
      return () => {
        dref.remove(sref)
      }
    } else if (dataSourceRef instanceof atlas.source.VectorTileSource) {
      console.error(`Unable to add Shape(${sref.getId()}) to VectorTileSource(${dataSourceRef.getId()}): AzureMapFeature has to be a child of AzureMapDataSourceProvider`)
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
