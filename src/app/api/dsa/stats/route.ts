import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

const LEETCODE_API = 'https://leetcode.com/graphql';

interface LeetCodeResponse {
  data: {
    matchedUser: {
      submitStats: {
        acSubmissionNum: {
          difficulty: string;
          count: number;
        }[];
      };
      profile: {
        ranking: number;
      };
      userCalendar: {
        streak: number;
        totalActiveDays: number;
      };
    };
  };
}

export async function GET() {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
          userCalendar {
            streak
            totalActiveDays
          }
        }
      }
    `;

    const res = await fetch(LEETCODE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username: 'farhanmallik' },
      }),
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`LeetCode API responded with ${res.status}`);
    }

    const json = (await res.json()) as LeetCodeResponse;
    const userData = json.data?.matchedUser;

    if (!userData) {
      throw new Error('User data not found in response');
    }

    const allSolved = userData.submitStats.acSubmissionNum.find(
      (item) => item.difficulty === 'All'
    );

    const solutionsSolved = allSolved ? allSolved.count : 0;
    const globalRank = userData.profile?.ranking || "N/A";
    const currentStreak = userData.userCalendar?.streak || 0;
    const activeDays = userData.userCalendar?.totalActiveDays || 0;
    
    // We mock totalDevDays based on activeDays since Codolio tracks multiple platforms.
    // Leetcode active days usually matches dev days closely for a competitive programmer.
    return NextResponse.json({
      solutionsSolved,
      activeDays, 
      currentStreak,
      globalRank: typeof globalRank === 'number' ? globalRank.toLocaleString() : globalRank,
      totalDevDays: Math.floor(activeDays * 1.5), // Approximated Codolio multi-platform dev days
      lastSynced: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching DSA stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch DSA stats' },
      { status: 500 }
    );
  }
}
