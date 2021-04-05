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
  if(dataSourceRef instanceof atlas.source.DataSource){
    // Simple feature's usecases and methods
    useCheckRef<atlas.source.DataSource, FeatureType>(dataSourceRef, featureRef, (dref, fref) => {
      dref.add(fref)
      return () => {
        dref.remove(fref)
      }
    })

    // Shape's usecases and methods
    useCheckRef<atlas.source.DataSource, ShapeType>(dataSourceRef, shapeRef, (dref, sref) => {
      dref.add(sref)
      return () => {
        dref.remove(sref)
      }
    })
  } else if (dataSourceRef instanceof atlas.source.VectorTileSource) {
    useCheckRef<FeatureType, FeatureType>(featureRef, featureRef, (fref) => 
      //NOTE: IAzureVectorTileSourceChildren won't allow adding AzureMapFeature as a child, still notify in case type check was suppresed
      console.error(`Unable to add Feature(${fref.id}) to VectorTileSource(${dataSourceRef.getId()}): AzureMapFeature has to be a child of AzureMapDataSourceProvider`)
    )
  }

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
