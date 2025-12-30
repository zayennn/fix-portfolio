import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const GITHUB_API = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_API,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'portfolio'
    }
});

app.get('/api/github/:username', async (req, res) => {
    try {
        const { username } = req.params;

        const { data: user } = await github.get(`/users/${username}`);
        const { data: repos } = await github.get(
            `/users/${username}/repos?per_page=100&sort=updated`
        );

        const totalStars = repos.reduce(
            (acc, r) => acc + r.stargazers_count,
            0
        );

        const totalForks = repos.reduce(
            (acc, r) => acc + r.forks_count,
            0
        );

        const languages = {};
        repos.forEach(r => {
            if (r.language) {
                languages[r.language] = (languages[r.language] || 0) + 1;
            }
        });

        // Sort repos by stars for popular repos
        const popularRepos = [...repos]
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);

        // Sort repos by updated date for recent repos
        const recentRepos = [...repos]
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6);

        // Get contribution calendar URL
        const contributionCalendar = `https://ghchart.rshah.org/${username}`;

        res.json({
            user,
            stats: {
                publicRepos: user.public_repos,
                followers: user.followers,
                following: user.following,
                totalStars,
                totalForks,
                publicGists: user.public_gists || 0
            },
            languages: Object.entries(languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10),
            popularRepos,
            recentRepos,
            contributionCalendar
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: 'GitHub fetch failed' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${process.env.PORT}`);
});