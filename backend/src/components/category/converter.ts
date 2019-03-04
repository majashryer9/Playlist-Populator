import { SqlCategory } from '../../dtos/Category';
import { Category } from '../../models/Category';

export const categoryConverter = (category: SqlCategory) => {
    return new Category({
        id: category.category_id,
        imageUrl: category.image_url,
        name: category.category_name
    });
}