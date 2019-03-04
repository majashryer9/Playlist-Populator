import { Category } from '../../models/Category';
import { connectionPool } from '../../util/connection-util';
import { SqlCategory } from '../../dtos/Category';
import { categoryConverter } from './converter';

export const getCategoryIdByName = async (categoryName: string) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT category_id FROM playlist_populator.category
            WHERE category_name = $1`, [categoryName]
        );
        return (resp && resp.rows && resp.rows.length) ? resp.rows[0].category_id : 0;
    } catch (error) {
        console.log(error);
        return 0;
    } finally {
        client.release();
    }
}

export const getPlaylistCategories = async (playlistId: number) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.category
            INNER JOIN playlist_populator.playlists_categories USING(category_id)
            WHERE playlist_id = $1`,
            [playlistId]
        );
        return (resp && resp.rows) ?
            resp.rows.map((category: SqlCategory) => categoryConverter(category)) : [];
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

export const saveCategory = async (category: Category) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `INSERT INTO playlist_populator.category(category_name, image_url)
            VALUES($1, $2) RETURNING category_id`,
            [category.name, category.imageUrl]
        )
        return (resp && resp.rows && resp.rows.length) ? resp.rows[0].category_id : 0;
    } catch (error) {
        console.log(error);
        return 0;
    } finally {
        client.release();
    }
}