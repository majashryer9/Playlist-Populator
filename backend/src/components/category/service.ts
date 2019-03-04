import * as categoryDao from './dao';
import { Category } from '../../models/Category';

export const getCategoryIdByName = (categoryName: string) => {
    return categoryDao.getCategoryIdByName(categoryName);
}

export const getPlaylistCategories = (playlistId: number) => {
    return categoryDao.getPlaylistCategories(playlistId);
}

export const saveCategory = (category: Category) => {
    return categoryDao.saveCategory(category);
}