import { Category } from '../../../../models/Category';

export const spotifyCategoryConverter = (spotifyCategory: any) => {
    return new Category({
        id: spotifyCategory.id,
        imageUrl: (spotifyCategory.icons.length)? spotifyCategory.icons[0].url : '',
        name: spotifyCategory.name
    })
}