import * as categoryDao from '../daos/category-dao';
import { Category } from '../models/Category';

export const getCategoryIdByName = (categoryName: string) => {
    return categoryDao.getCategoryIdByName(categoryName);
}

export const saveCategory = (category: Category) => {
    return categoryDao.saveCategory(category);
}