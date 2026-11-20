import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UserDashboardPage from './pages/UserDashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ScamCheckerPage from './pages/ScamCheckerPage'
import OfferReviewPage from './pages/OfferReviewPage'
import CvTailorPage from './pages/CvTailorPage'
import TrackerPage from './pages/TrackerPage'
import InterviewPrepPage from './pages/InterviewPrepPage'
import PricingPage from './pages/PricingPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/scan" element={<ScamCheckerPage />} />
              <Route path="/offer-review" element={<OfferReviewPage />} />
              <Route path="/cv-tailor" element={<CvTailorPage />} />
              <Route path="/tracker" element={<TrackerPage />} />
              <Route path="/interview-prep" element={<InterviewPrepPage />} />
              <Route path="/pricing" element={<PricingPage />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboardPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App