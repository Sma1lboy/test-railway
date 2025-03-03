import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { SystemStatusProvider } from './contexts/SystemStatusContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <SystemStatusProvider>
          <div className="flex flex-col min-h-screen bg-[#1E1E1E] text-[#FFFFFF]">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<Post />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {/* Fallback for undefined routes */}
                <Route
                  path="*"
                  element={
                    <div className="flex items-center justify-center h-screen">
                      <h1 className="text-3xl font-mono text-[#66FF66]">
                        404 - Page Not Found
                      </h1>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </SystemStatusProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with id 'root' not found.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);