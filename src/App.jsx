import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import ITCourses from './pages/ITCourses'
import UGCourse from './pages/UGCourse'
import PGCourse from './pages/PGCourse'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import CourseDetail from './pages/CourseDetail'

import Breadcrumbs from './components/Breadcrumbs'
import ScrollToTop from './components/ScrollToTop'
import LeadButtons from './components/LeadButtons'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

// Admin Components
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminCourses from './pages/admin/AdminCourses'
import AdminQueries from './pages/admin/AdminQueries'

import './index.css'

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={isAdmin ? "" : "app-container"}>
      {!isAdmin && <Header />}
      <main className={isAdmin ? "" : "main-content"}>
        {!isAdmin && <Breadcrumbs />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/it-courses" element={<ITCourses />} />
          <Route path="/ug-course" element={<UGCourse />} />
          <Route path="/pg-course" element={<PGCourse />} />
          <Route path="/contact-us" element={<Contact />} />
          
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
             <Route path="dashboard" element={<AdminDashboard />} />
             <Route path="blogs" element={<AdminBlogs />} />
             <Route path="courses" element={<AdminCourses />} />
             <Route path="queries" element={<AdminQueries />} />
          </Route>

          {/* Dynamic SEO Course Route - Catch All for slugs */}
          <Route path="/:slug" element={<CourseDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <LeadButtons />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
