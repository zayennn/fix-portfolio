import axios from 'axios';

const GITHUB_API = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_API,
    headers: {
        ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
        Accept: 'application/vnd.github+json',
        'User-Agent': 'portfolio'
    }
});

export default async function handler(req, res) {
    const { username } = req.query;

    try {
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
        repos.forEach((r) => {
            if (r.language) {
                languages[r.language] = (languages[r.language] || 0) + 1;
            }
        });

        const popularRepos = [...repos]
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);

        const recentRepos = [...repos]
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6);

        const contributionCalendar = `https://ghchart.rshah.org/${username}`;

        res.status(200).json({
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
        console.error('GitHub fetch failed (Vercel API):', err.response?.data || err.message);
        res.status(500).json({ message: 'GitHub fetch failed' });
    }
}