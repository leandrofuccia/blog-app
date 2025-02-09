import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';

export const getPosts = (pool: Pool) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { rows } = await pool.query('SELECT * FROM posts');
            res.json(rows);
        } catch (error) {
            next(error);
        }
    };
};

export const getPostById = (pool: Pool) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
            if (rows.length === 0) {
                return res.status(404).send('Post not found');
            }
            res.json(rows[0]);
        } catch (error) {
            next(error);
        }
    };
};

export const createPost = (pool: Pool) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, content, author } = req.body;
            const { rows } = await pool.query(
                'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
                [title, content, author]
            );
            res.status(201).json(rows[0]);
        } catch (error) {
            next(error);
        }
    };
};

export const updatePost = (pool: Pool) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { title, content, author } = req.body;
            const { rows } = await pool.query(
                'UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *',
                [title, content, author, id]
            );
            if (rows.length === 0) {
                return res.status(404).send('Post not found');
            }
            res.json(rows[0]);
        } catch (error) {
            next(error);
        }
    };
};

export const deletePost = (pool: Pool) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { rowCount } = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
            if (rowCount === 0) {
                return res.status(404).send('Post not found');
            }
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
};

export const searchPosts = (pool: Pool) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { q } = req.query;
            const { rows } = await pool.query(
                'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1',
                [`%${q}%`]
            );
            res.json(rows);
        } catch (error) {
            next(error);
        }
    };
};
