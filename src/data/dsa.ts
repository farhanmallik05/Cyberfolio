export interface DsaStats {
  solutionsSolved: number;
  activeDays: number;
  currentStreak: number;
  globalRank: string;
  totalDevDays: number;
  lastSynced: string;
}

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface StreakWeek {
  week: number;
  count: number;
}

export interface Platform {
  name: string;
  handle: string;
  url: string;
  color: string;
}

export const dsaStats: DsaStats = {
  solutionsSolved: 37,
  activeDays: 14,
  currentStreak: 5,
  globalRank: "3.9M",
  totalDevDays: 113,
  lastSynced: new Date().toISOString()
};

/**
 * Fetch real-time DSA stats from the internal API route.
 * Falls back to static dsaStats if the API fails.
 */
export async function fetchDsaStats(): Promise<DsaStats> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/dsa/stats`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('API route failed');
    const data = await res.json();
    return {
      solutionsSolved: data.solutionsSolved || dsaStats.solutionsSolved,
      activeDays: data.activeDays || dsaStats.activeDays,
      currentStreak: data.currentStreak || dsaStats.currentStreak,
      globalRank: data.globalRank || dsaStats.globalRank,
      totalDevDays: data.totalDevDays || dsaStats.totalDevDays,
      lastSynced: data.lastSynced || dsaStats.lastSynced
    };
  } catch (error) {
    console.warn("Failed to fetch live DSA stats, using static fallback.", error);
    return dsaStats;
  }
}

export const platforms: Platform[] = [
  { name: "Codolio", handle: "farhanmallik", url: "https://codolio.com/profile/farhanmallik", color: "#6366f1" },
  { name: "LeetCode", handle: "farhanmallik", url: "https://leetcode.com/u/farhanmallik", color: "#ffa116" },
  { name: "GeeksforGeeks", handle: "farhanmallik", url: "https://www.geeksforgeeks.org/profile/farhanmallik", color: "#2f8d46" },
  { name: "CodeChef", handle: "farhanmallik", url: "https://www.codechef.com/users/farhanmallik", color: "#5b4638" },
  { name: "Codeforces", handle: "farhanmallik", url: "https://codeforces.com/profile/farhanmallik", color: "#1c3144" },
  { name: "Naukri 360", handle: "farhanmallik", url: "https://www.naukri.com/code360/profile/farhanmallik", color: "#2d3436" },
  { name: "HackerRank", handle: "farhanmallik", url: "https://www.hackerrank.com/profile/farhanmallik", color: "#2ec866" }
];

export const languageTags = ["JAVA", "C++", "DSA", "MYSQL", "PYTHON3", "CP", "ALGORITHMS"];

// Helper to generate heatmap data
const generateHeatmapData = (): HeatmapDay[] => {
  const data: HeatmapDay[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    
    // Seed some semi-realistic activity
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    
    // Recent activity peak (Jan-Mar 2026)
    if (d.getMonth() >= 0 && d.getMonth() <= 2 && d.getFullYear() === 2026) {
      const rand = Math.random();
      if (rand > 0.7) {
        count = Math.floor(Math.random() * 5) + 1;
        level = count > 3 ? 4 : count > 2 ? 3 : count > 1 ? 2 : 1;
      }
    } else if (Math.random() > 0.95) {
      count = 1;
      level = 1;
    }

    data.push({
      date: d.toISOString().split('T')[0],
      count,
      level
    });
  }
  return data;
};

export const heatmapData = generateHeatmapData();

// 52-week streak data (weekly totals)
export const streakData: StreakWeek[] = Array.from({ length: 52 }, (_, i) => ({
  week: i + 1,
  count: i > 40 ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 3)
}));
