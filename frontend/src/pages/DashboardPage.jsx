import React from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';
import DashboardStats from '../components/DashboardStats';

const DashboardPage = () => {
  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to your
            <span className="block gradient-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              LinkBridge Dashboard
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Manage your links, track performance, and grow your digital presence
          </p>
        </div>

        {/* Stats Section */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* URL Form */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Link
              </h2>
              <UrlForm />
            </div>
          </div>

          {/* URLs List */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Your Links
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="btn-secondary text-white px-4 py-2 rounded-lg text-sm">
                    Export
                  </button>
                  <button className="btn-secondary text-white px-4 py-2 rounded-lg text-sm">
                    Filter
                  </button>
                </div>
              </div>
              <UserUrl />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;