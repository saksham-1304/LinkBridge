import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserUrls } from '../api/user.api';

const DashboardStats = () => {
  const { data: urls, isLoading } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
  });

  const stats = React.useMemo(() => {
    if (!urls?.urls) return { totalLinks: 0, totalClicks: 0, avgClicks: 0, topLink: null };
    
    const totalLinks = urls.urls.length;
    const totalClicks = urls.urls.reduce((sum, url) => sum + url.clicks, 0);
    const avgClicks = totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0;
    const topLink = urls.urls.reduce((max, url) => url.clicks > (max?.clicks || 0) ? url : max, null);
    
    return { totalLinks, totalClicks, avgClicks, topLink };
  }, [urls]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stats-card rounded-2xl p-6 animate-pulse">
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-8 bg-white/20 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Total Links */}
      <div className="stats-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm font-medium">Total Links</p>
            <p className="text-3xl font-bold text-white">{stats.totalLinks}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-green-400 text-sm">+12% from last month</span>
        </div>
      </div>

      {/* Total Clicks */}
      <div className="stats-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm font-medium">Total Clicks</p>
            <p className="text-3xl font-bold text-white">{stats.totalClicks}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-green-400 text-sm">+8% from last week</span>
        </div>
      </div>

      {/* Average Clicks */}
      <div className="stats-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm font-medium">Avg. Clicks</p>
            <p className="text-3xl font-bold text-white">{stats.avgClicks}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-blue-400 text-sm">per link</span>
        </div>
      </div>

      {/* Top Performing Link */}
      <div className="stats-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm font-medium">Top Link</p>
            <p className="text-3xl font-bold text-white">{stats.topLink?.clicks || 0}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-yellow-400 text-sm">clicks</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;