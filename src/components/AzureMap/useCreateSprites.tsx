import { IAzureMapImageSprite, MapType } from '../../types'

export const createImageSprites = async (
  mapRef: MapType,
  spriteArray: IAzureMapImageSprite[]
) => {
  await Promise.all(
    spriteArray.map(
      async ({ id, templateName, color, secondaryColor, scale, icon }: IAzureMapImageSprite) => {
        if (icon) {
          // Add an icon image to the map's image sprite for use with symbols and patterns.
          await mapRef.imageSprite.add(id, icon)
        }
        // Creates and adds an image to the maps image sprite. Reference this in the Polygon or Symbol layer.
        return mapRef.imageSprite.createFromTemplate(
          id,
          templateName || 'marker',
          color,
          secondaryColor,
          scale
        )
      }
    )
  )
}
