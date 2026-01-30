import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getGitHubData } from '../../services/githubService';
import styles from './BehindTheCode.module.css';

const GITHUB_USERNAME = 'zayennn';

const CUSTOM_FEATURED_REPOS = [
    'portfolio',
    'react-web-python-learning',
    'face-scanning',
    'camera-sensor-scrolling',
    'convert-speedtest',
    'sales-management-system'
];

const BehindTheCode = () => {
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGitHubData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getGitHubData();
            setGithubData(data);
        } catch (err) {
            setError('Failed to load GitHub data. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGitHubData();
    }, []);


    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading GitHub data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p>{error}</p>
                <button onClick={fetchGitHubData} className={styles.retryButton} data-cursor="hover">
                    Retry
                </button>
            </div>
        );
    }

    if (!githubData) return null;

    const {
        user = {},
        stats = {},
        languages = [],
        popularRepos = [],
        recentRepos = [],
        contributionCalendar
    } = githubData || {};

    const safeLanguages = Array.isArray(languages) ? languages : [];
    const safePopularRepos = Array.isArray(popularRepos) ? popularRepos : [];
    const safeRecentRepos = Array.isArray(recentRepos) ? recentRepos : [];

    const contributionUrl =
        contributionCalendar ||
        `https://ghchart.rshah.org/${user?.login || GITHUB_USERNAME}`;

    const hasApiPopularRepos = safePopularRepos.length > 0;
    const fallbackFeaturedRepos = CUSTOM_FEATURED_REPOS.map((name) => ({
        name,
        html_url: `https://github.com/${user?.login || GITHUB_USERNAME}/${name}`,
        description: 'Pinned repository',
        language: null,
        stargazers_count: 0,
        forks_count: 0,
        watchers_count: 0,
        updated_at: new Date().toISOString(),
        private: false,
    }));
    const featuredReposToShow = hasApiPopularRepos ? safePopularRepos : fallbackFeaturedRepos;

    return (
        <div className={styles.behindContainer}>
            {/* Hero Section */}
            <motion.div
                className={styles.heroSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.heroContent}>
                    <div className={styles.profileHeader}>
                        <img
                            src={user?.avatar_url || 'https://via.placeholder.com/120'}
                            alt={user?.name || user?.login || 'GitHub User'}
                            className={styles.profileAvatar}
                        />
                        <div className={styles.profileInfo}>
                            <h1 className={styles.profileName}>
                                Behind the <span className={styles.highlight}>Code</span>
                            </h1>
                            <p className={styles.profileBio}>
                                A glimpse into my GitHub activity, contributions, and coding journey
                            </p>
                            <div className={styles.profileMeta}>
                                <span className={styles.metaItem}>
                                    <i className="fas fa-user"></i>
                                    {user?.login || 'GitHub User'}
                                </span>
                                <span className={styles.metaItem}>
                                    <i className="fas fa-map-marker-alt"></i>
                                    {user?.location || 'Indonesia'}
                                </span>
                                <span className={styles.metaItem}>
                                    <i className="fas fa-calendar-alt"></i>
                                    Member since {user?.created_at ? new Date(user.created_at).getFullYear() : 'N/A'}
                                </span>
                            </div>
                            <a
                                href={user?.html_url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.githubButton}
                                data-cursor="hover"
                            >
                                <i className="fab fa-github"></i>
                                @{user?.login || 'github'}
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
                className={styles.statsOverview}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
            >
                <h2 className={styles.sectionTitle}>Quick Stats</h2>
                <div className={styles.statsGrid}>
                    <div className={styles.statItem} data-cursor="hover">
                        <div className={styles.statNumber}>{stats?.publicRepos || 0}</div>
                        <div className={styles.statLabel}>Repositories</div>
                    </div>
                    <div className={styles.statItem} data-cursor="hover">
                        <div className={styles.statNumber}>{stats?.followers || 0}</div>
                        <div className={styles.statLabel}>Followers</div>
                    </div>
                    <div className={styles.statItem} data-cursor="hover">
                        <div className={styles.statNumber}>{stats?.following || 0}</div>
                        <div className={styles.statLabel}>Following</div>
                    </div>
                    <div className={styles.statItem} data-cursor="hover">
                        <div className={styles.statNumber}>{stats?.totalStars || 0}</div>
                        <div className={styles.statLabel}>Stars</div>
                    </div>
                    <div className={styles.statItem} data-cursor="hover">
                        <div className={styles.statNumber}>{stats?.totalForks || 0}</div>
                        <div className={styles.statLabel}>Forks</div>
                    </div>
                    <div className={styles.statItem} data-cursor="hover">
                        <div className={styles.statNumber}>{stats?.publicGists || 0}</div>
                        <div className={styles.statLabel}>Gists</div>
                    </div>
                </div>
            </motion.div>

            {/* Contribution Calendar */}
            <motion.div
                className={styles.contributionSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2 className={styles.sectionTitle}>Contribution Graph</h2>
                <div className={styles.contributionCard}>
                    <div className={styles.cardHeader}>
                        <h3>Year in Code</h3>
                        <p>My coding activity visualized</p>
                    </div>
                    <div className={styles.contributionWrapper}>
                        {contributionUrl ? (
                            <img
                                src={contributionUrl}
                                alt="GitHub Contribution Chart"
                                className={styles.contributionImage}
                            />
                        ) : (
                            <div className={styles.noData}>Contribution calendar not available</div>
                        )}
                    </div>
                    <div className={styles.contributionLegend}>
                        <div className={styles.legendItem}>
                            <span className={styles.legendDot} style={{ backgroundColor: '#ebedf0' }}></span>
                            <span>Less</span>
                        </div>
                        <div className={styles.legendItem}>
                            <span className={styles.legendDot} style={{ backgroundColor: '#9be9a8' }}></span>
                            <span className={styles.legendDot} style={{ backgroundColor: '#40c463' }}></span>
                            <span className={styles.legendDot} style={{ backgroundColor: '#30a14e' }}></span>
                            <span className={styles.legendDot} style={{ backgroundColor: '#216e39' }}></span>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Languages Section */}
            <motion.div
                className={styles.languagesSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <h2 className={styles.sectionTitle}>Top Languages</h2>
                <div className={styles.languagesGrid}>
                    {safeLanguages.length > 0 ? safeLanguages.map(([language, count], index) => {
                        const totalCount = safeLanguages.reduce((acc, [, c]) => acc + c, 0);
                        const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;

                        let text__repo = count === 1 ? "Repository" : "Repositories"

                        return (
                            <div key={index} className={styles.languageCard} data-cursor="hover">
                                <div className={styles.languageHeader}>
                                    <span className={styles.languageName}>{language}</span>
                                    <span className={styles.languagePercent}>{percentage}%</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <motion.div
                                        className={styles.progressFill}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                    />
                                </div>
                                <div className={styles.languageStats}>
                                    <span className={styles.languageCount}>{count} {text__repo}</span>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className={styles.noData}>No language data available</div>
                    )}
                </div>
            </motion.div>

            {/* Pinned Repositories */}
            <motion.div
                className={styles.reposSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Featured Repositories</h2>
                    <a
                        href={`https://github.com/${user?.login || 'github'}?tab=repositories`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewAllLink}
                        data-cursor="hover"
                    >
                        View all <i className="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div className={styles.reposGrid}>
                    {featuredReposToShow.length > 0 ? featuredReposToShow.slice(0, 6).map((repo, index) => (
                        <a
                            key={index}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.repoCard}
                            data-cursor="hover"
                        >
                            <div className={styles.repoHeader}>
                                <div className={styles.repoIcon}>
                                    <i className="fab fa-github"></i>
                                </div>
                                <h3 className={styles.repoName}>{repo.name}</h3>
                                <span className={styles.repoVisibility}>
                                    {repo.private ? 'Private' : 'Public'}
                                </span>
                            </div>

                            <p className={styles.repoDescription}>
                                {repo.description || 'No description provided'}
                            </p>

                            {repo.language && (
                                <div className={styles.repoLanguage}>
                                    <span
                                        className={styles.languageDot}
                                        style={{
                                            backgroundColor: getLanguageColor(repo.language)
                                        }}
                                    ></span>
                                    {repo.language}
                                </div>
                            )}

                            {hasApiPopularRepos && (
                                <>
                                    <div className={styles.repoStats}>
                                        <div className={styles.stat}>
                                            <i className="fas fa-star"></i>
                                            <span>{repo.stargazers_count}</span>
                                        </div>
                                        <div className={styles.stat}>
                                            <i className="fas fa-code-fork"></i>
                                            <span>{repo.forks_count}</span>
                                        </div>
                                        <div className={styles.stat}>
                                            <i className="fas fa-eye"></i>
                                            <span>{repo.watchers_count}</span>
                                        </div>
                                    </div>

                                    <div className={styles.repoFooter}>
                                        <span className={styles.updatedText}>
                                            Updated {formatDate(repo.updated_at)}
                                        </span>
                                    </div>
                                </>
                            )}
                        </a>
                    )) : (
                        <div className={styles.noData}>
                            No repositories available. Add some names to CUSTOM_FEATURED_REPOS to feature specific repos.
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                className={styles.activitySection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <h2 className={styles.sectionTitle}>Development Insights</h2>
                <div className={styles.insightsGrid}>
                    <div className={styles.insightCard} data-cursor="hover">
                        <div className={styles.insightIcon}>
                            <i className="fas fa-fire"></i>
                        </div>
                        <h3>Most Active</h3>
                        <p>
                            {safeRecentRepos[0] ? safeRecentRepos[0].name : 'No recent activity'} is my most recently updated repository
                        </p>
                    </div>

                    <div className={styles.insightCard} data-cursor="hover">
                        <div className={styles.insightIcon}>
                            <i className="fas fa-trophy"></i>
                        </div>
                        <h3>Most Popular</h3>
                        <p>
                            {safePopularRepos[0] ? safePopularRepos[0].name : 'No repositories'} has the most stars ({safePopularRepos[0]?.stargazers_count || 0})
                        </p>
                    </div>

                    <div className={styles.insightCard} data-cursor="hover">
                        <div className={styles.insightIcon}>
                            <i className="fas fa-code"></i>
                        </div>
                        <h3>Primary Language</h3>
                        <p>
                            {safeLanguages[0] ? safeLanguages[0][0] : 'No data'} is my most used language
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
                className={styles.ctaSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className={styles.ctaCard}>
                    <h2>Want to see more?</h2>
                    <p>
                        Explore all my projects, contributions, and coding journey directly on GitHub.
                        Feel free to star interesting repos or open issues for collaboration!
                    </p>
                    <div className={styles.ctaButtons}>
                        <a
                            href={user?.html_url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.primaryButton}
                            data-cursor="hover"
                        >
                            <i className="fab fa-github"></i>
                            Visit GitHub Profile
                        </a>
                        <a
                            href={`https://github.com/${user?.login || 'github'}?tab=repositories`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.secondaryButton}
                            data-cursor="hover"
                        >
                            <i className="fas fa-code-branch"></i>
                            Browse All Repositories
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Helper functions
const getLanguageColor = (language) => {
    const colors = {
        JavaScript: '#f1e05a',
        TypeScript: '#2b7489',
        Python: '#3572A5',
        Java: '#b07219',
        PHP: '#4F5D95',
        CSS: '#563d7c',
        HTML: '#e34c26',
        Vue: '#42b883',
        React: '#61dafb',
        Dart: '#00B4AB',
        Go: '#00ADD8',
        Rust: '#dea584',
        Ruby: '#701516',
        'C++': '#f34b7d',
        'C#': '#178600',
        Swift: '#ffac45',
        Kotlin: '#F18E33',
        Scala: '#c22d40',
        Shell: '#89e051',
        PowerShell: '#012456',
        'Objective-C': '#438eff',
        Lua: '#000080',
        Perl: '#0298c3',
        R: '#198CE7',
        Matlab: '#e16737',
        Julia: '#a270ba',
        Haskell: '#5e5086',
        Elixir: '#6e4a7e',
        Clojure: '#db5855',
        Erlang: '#B83998',
        'F#': '#b845fc',
        CoffeeScript: '#244776',
        TeX: '#3D6117',
        Assembly: '#6E4C13',
        PLSQL: '#dad8d8',
        'Visual Basic': '#945db7',
        Dockerfile: '#384d54',
        Makefile: '#427819',
        Batchfile: '#C1F12E',
        Groovy: '#e69f56',
        Prolog: '#74283c',
        Crystal: '#000100',
        Nim: '#37775b',
        OCaml: '#3be133',
        Reason: '#ff5847',
        CommonLisp: '#3fb68b',
        Ada: '#02f88c',
        Fortran: '#4d41b1',
        Racket: '#22228f',
        Scheme: '#1e4aec',
        Elm: '#60B5CC',
        PureScript: '#1D222D',
        Idris: '#b30000',
        Zig: '#ec915c',
        wisp: '#7582D1',
        X10: '#4B6BEF',
        Xtend: '#24255d',
        ZIL: '#dc75e5'
    };

    return colors[language] || '#6c757d';
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
};

export default BehindTheCode;