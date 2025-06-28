import React, { useState } from 'react';
import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
import { queryClient } from '../main';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customSlug, setCustomSlug] = useState('');
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ['userUrls'] });
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetForm = () => {
    setUrl('');
    setCustomSlug('');
    setShortUrl('');
    setError(null);
    setCopied(false);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (error) setError(null);
  };

  const handleSlugChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
    setCustomSlug(value);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="form-group">
          <label htmlFor="url" className="form-label">
            Enter your URL
          </label>
          <div className="relative">
            <input
              type="url"
              id="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com/very-long-url"
              required
              className="form-input glass-input pr-12"
              style={{ color: 'var(--text-primary)' }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <div className="form-group">
            <label htmlFor="customSlug" className="form-label">
              Custom URL (optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span style={{ color: 'var(--text-muted)' }} className="text-sm font-medium">
                  linkbridge.com/
                </span>
              </div>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={handleSlugChange}
                placeholder="my-custom-link"
                className="form-input glass-input pl-32"
                style={{ color: 'var(--text-primary)' }}
                maxLength={50}
              />
            </div>
            {customSlug && (
              <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                Preview: linkbridge.com/{customSlug}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="btn-primary w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              <span>Creating...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Shorten URL</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="alert alert-error rounded-xl p-4 slide-in-up">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm" style={{ color: 'var(--accent-error)' }}>{error}</span>
          </div>
        </div>
      )}

      {shortUrl && (
        <div className="glass-card rounded-xl p-6 space-y-4 bounce-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Your shortened URL:
            </h3>
            <button
              onClick={resetForm}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Create another link"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="glass-input flex-1 px-4 py-3 rounded-xl bg-white/5 cursor-pointer"
              style={{ color: 'var(--text-primary)' }}
              onClick={(e) => e.target.select()}
            />
            <button
              onClick={handleCopy}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                copied
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'btn-secondary hover:scale-105'
              }`}
              style={!copied ? { color: 'var(--text-primary)' } : {}}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm pt-2 border-t border-white/10">
            <a 
              href={shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 transition-colors duration-300 hover:underline"
              style={{ color: 'var(--text-accent)' }}
            >
              <span>Click to visit</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <div className="flex items-center space-x-4">
              <button 
                className="transition-colors duration-300 hover:underline"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                Share
              </button>
              <button 
                className="transition-colors duration-300 hover:underline"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;