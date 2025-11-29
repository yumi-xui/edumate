import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Groups from './pages/Groups'
import GroupDetails from './pages/GroupDetails'
import CreateGroup from './pages/CreateGroup'
import GenerateQuiz from './pages/GenerateQuiz'
import GenerateQcmPage from './pages/GenerateQcmPage'
import QCMQuiz from './pages/QCMQuiz'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/groupes" element={<Groups />} />
          <Route path="/group/:id" element={<GroupDetails />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/generer-quiz" element={<GenerateQuiz />} />
          <Route path="/generate-quiz" element={<GenerateQuiz />} />
          <Route path="/generate-qcm" element={<GenerateQcmPage />} />
          <Route path="/quiz" element={<QCMQuiz />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </AuthProvider>
  )
}

