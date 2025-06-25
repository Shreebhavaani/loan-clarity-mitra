
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';
import DocumentUpload from '@/components/DocumentUpload';
import ChatBot from '@/components/ChatBot';
import LoginPage from '@/components/LoginPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} />;
      case 'upload':
        return <DocumentUpload />;
      case 'chat':
        return <ChatBot />;
      case 'home':
      default:
        return <LandingPage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== 'login' && (
        <Navigation
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isAuthenticated={isAuthenticated}
        />
      )}
      {renderPage()}
    </div>
  );
};

export default Index;
