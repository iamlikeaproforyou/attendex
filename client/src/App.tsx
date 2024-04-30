import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Register from './routes/register/register.component'
import Login from './routes/login/login.component'
import Profile from './routes/profile/profile.component'
import Layout from './components/Layout/Layout.component'
import Privateroutes from './components/Privateroutes/Privateroutes.component'
import { AuthProvider } from './context/auth.context'

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<Privateroutes />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
