"use client";
import React, { useEffect, useState } from 'react';
import { fetchGithubStats, GithubStats } from '@/lib/github-api';
import styles from './GitHubStatsBar.module.css';

export function GitHubStatsBar() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStats() {
      const data = await fetchGithubStats();
      setStats(data);
      setLoading(false);
    }
    getStats();
  }, []);

  if (loading) {
    return (
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className="animate-pulse">_ SIGNAL_FETCH: GITHUB_QUANTUM_STREAM...</span>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className={styles.statsBar}>
      <div className={styles.content}>
        <div className={styles.statItem}>
          <span className={styles.label}>STARS</span>
          <span className={styles.value}>{stats.totalStars}</span>
        </div>
        
        <div className={styles.separator} />

        <div className={styles.statItem}>
          <span className={styles.label}>FORKS</span>
          <span className={styles.value}>{stats.totalForks}</span>
        </div>

        <div className={styles.separator} />

        <div className={styles.statItem}>
          <span className={styles.label}>REPOS</span>
          <span className={styles.value}>{stats.publicRepos}</span>
        </div>

        <div className={styles.separator} />

        <div className={styles.statItem}>
          <span className={styles.label}>STACK_DOMINANCE</span>
          <div className={styles.langList}>
            {stats.topLanguages.map(lang => (
              <span key={lang} className={styles.langTag}>{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
