import React from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';
import DashboardStats from '../components/DashboardStats';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation stagger-2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 slide-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance" style={{ color: 'var(--text-primary)' }}>
            Welcome back, {user?.name}!
          </h1>
          <div className="mb-4">
            <span className="block gradient-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-2xl md:text-3xl font-bold">
              LinkBridge Dashboard
            </span>
          </div>
          <p className="text-xl max-w-2xl mx-auto text-pretty" style={{ color: 'var(--text-muted)' }}>
            Manage your links, track performance, and grow your digital presence
          </p>
        </div>

        {/* Stats Section */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* URL Form */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24 slide-in-left">
              <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: 'var(--text-primary)' }}>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                Create New Link
              </h2>
              <UrlForm />
            </div>
          </div>

          {/* URLs List */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 slide-in-right">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center" style={{ color: 'var(--text-primary)' }}>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  Your Links
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105">
                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export
                  </button>
                  <button className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105">
                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter
                  </button>
                </div>
              </div>
              <UserUrl />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 slide-in-up stagger-3">
          <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="glass-card rounded-xl p-6 text-left transition-all duration-300 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>View Analytics</h4>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Get detailed insights about your link performance</p>
            </button>

            <button className="glass-card rounded-xl p-6 text-left transition-all duration-300 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Bulk Import</h4>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Import multiple URLs at once from CSV file</p>
            </button>

            <button className="glass-card rounded-xl p-6 text-left transition-all duration-300 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Settings</h4>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Customize your account and preferences</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;