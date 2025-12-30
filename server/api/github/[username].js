import axios from 'axios';

export default async function handler(req, res) {
    const { username } = req.query;

    try {
        const { data: user } = await axios.get(
            `https://api.github.com/users/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github+json'
                }
            }
        );

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'GitHub fetch failed' });
    }
}