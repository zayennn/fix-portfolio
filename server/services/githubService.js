import axios from 'axios';

const githubAPI = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }
});

export const fetchGitHubData = async (username) => {
    const { data: user } = await githubAPI.get(`/users/${username}`);
    const { data: repos } = await githubAPI.get(
        `/users/${username}/repos?per_page=100`
    );

    // popular / fallback recent
    let featured = repos
        .filter(r => !r.private)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);

    if (featured.length === 0) {
        featured = [...repos]
            .filter(r => !r.private)
            .sort((a, b) =>
                new Date(b.updated_at) - new Date(a.updated_at)
            )
            .slice(0, 6);
    }

    // language stats
    const languages = {};
    repos.forEach(r => {
        if (r.language) {
            languages[r.language] =
                (languages[r.language] || 0) + 1;
        }
    });

    return {
        user,
        stats: {
            publicRepos: user.public_repos,
            followers: user.followers,
            following: user.following
        },
        languages: Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5),
        featuredRepos: featured,
        contributionGraph:
            `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github`
    };
};