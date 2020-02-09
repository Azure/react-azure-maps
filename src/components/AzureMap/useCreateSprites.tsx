import { IAzureMapImageSprite, MapType } from '../../types'

export const useCreateImageSprites = async (
  mapRef: MapType,
  spriteArray: [IAzureMapImageSprite]
) => {
  await Promise.all(
    spriteArray.map(({ id, templateName, color, secondaryColor, scale }: IAzureMapImageSprite) => {
      return mapRef.imageSprite.createFromTemplate(id, templateName, color, secondaryColor, scale)
    })
  )
}
