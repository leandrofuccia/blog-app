import express, { Request, Response, Router } from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost, searchPosts } from '../controllers/postController';
import { Pool } from 'pg';

export default (pool: Pool): Router => {
    const router = express.Router();

    // Adiciona uma rota para a URL raiz
    router.get('/', (req: Request, res: Response) => {
        res.send('Bem-vindo à aplicação de blogging!');
    });

    router.get('/posts', getPosts(pool));
    router.get('/posts/:id', getPostById(pool));
    router.post('/posts', createPost(pool));
    router.put('/posts/:id', updatePost(pool));
    router.delete('/posts/:id', deletePost(pool));
    router.get('/posts/search', searchPosts(pool));

    return router;
};
