import axios from 'axios';

export const fetchGitHubData = async (username) => {
    const { data: user } = await axios.get(
        `https://api.github.com/users/${username}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            }
        }
    );

    return user;
};