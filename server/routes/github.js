import express from 'express';
import { fetchGitHubData } from '../services/githubService.js';

const router = express.Router();

router.get('/:username', async (req, res) => {
    try {
        const data = await fetchGitHubData(req.params.username);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'GitHub fetch failed' });
    }
});

export default router;