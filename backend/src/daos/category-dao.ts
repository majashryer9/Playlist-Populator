import { Category } from "../models/Category";
import { connectionPool } from "../util/connection-util";

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
    } finally {
        client.release();
    }
}