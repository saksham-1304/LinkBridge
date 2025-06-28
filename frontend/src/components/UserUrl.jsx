import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserUrls } from '../api/user.api';

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });
  
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const filteredAndSortedUrls = React.useMemo(() => {
    if (!urls?.urls) return [];
    
    let filtered = urls.urls.filter(url => 
      url.full_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.short_url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered results
    switch (sortBy) {
      case 'newest':
        return filtered.reverse();
      case 'oldest':
        return filtered;
      case 'most-clicks':
        return filtered.sort((a, b) => b.clicks - a.clicks);
      case 'least-clicks':
        return filtered.sort((a, b) => a.clicks - b.clicks);
      default:
        return filtered.reverse();
    }
  }, [urls, searchTerm, sortBy]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-input rounded-xl p-4 shimmer">
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-3 bg-white/20 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass-card border-red-400/50 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--accent-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-medium mb-1" style={{ color: 'var(--accent-error)' }}>Error loading your URLs</p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{error.message}</p>
      </div>
    );
  }

  if (!urls?.urls || urls.urls.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 pulse-animation">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No links yet</h3>
        <p className="mb-6" style={{ color: 'var(--text-muted)' }}>Create your first shortened URL to get started</p>
        <div className="inline-flex items-center text-sm" style={{ color: 'var(--text-accent)' }}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Use the form on the left to create your first link
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search your links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-input w-full px-4 py-3 pl-10 rounded-xl"
            style={{ color: 'var(--text-primary)' }}
          />
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="glass-input px-4 py-3 rounded-xl min-w-[140px]"
          style={{ color: 'var(--text-primary)' }}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="most-clicks">Most clicks</option>
          <option value="least-clicks">Least clicks</option>
        </select>
      </div>

      {/* URLs List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredAndSortedUrls.map((url) => (
          <div key={url._id} className="glass-input rounded-xl p-4 hover:bg-white/5 transition-all duration-300 hover-lift">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium truncate text-balance" style={{ color: 'var(--text-primary)' }}>
                    {url.full_url}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="badge badge-success">
                      {url.clicks} clicks
                    </span>
                    {url.createdAt && (
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {formatDate(url.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a 
                    href={`http://localhost:3000/${url.short_url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-sm transition-colors duration-300 hover:underline"
                    style={{ color: 'var(--text-accent)' }}
                  >
                    localhost:3000/{url.short_url}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleCopy(`http://localhost:3000/${url.short_url}`, url._id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${
                    copiedId === url._id
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'btn-secondary hover:scale-105'
                  }`}
                  style={copiedId !== url._id ? { color: 'var(--text-primary)' } : {}}
                >
                  {copiedId === url._id ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
                
                <button 
                  className="btn-secondary px-3 py-2 rounded-lg text-sm hover:scale-105 transition-all duration-300"
                  style={{ color: 'var(--text-primary)' }}
                  title="View analytics"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedUrls.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p style={{ color: 'var(--text-muted)' }}>No links found matching "{searchTerm}"</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-2 text-sm transition-colors duration-300 hover:underline"
            style={{ color: 'var(--text-accent)' }}
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default UserUrl;