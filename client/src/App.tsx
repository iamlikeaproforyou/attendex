import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Register from './routes/register/register.component'
import Login from './routes/login/login.component'
import Profile from './routes/profile/profile.component'
import Layout from './components/Layout/Layout.component'
import Privateroutes from './components/Privateroutes/Privateroutes.component'
import Settings from './routes/settings/settings.component'
import { AuthProvider } from './context/auth.context'
import { ModalProvider } from './context/modal.context'
import { SettingsProvider } from './context/layout.context'
import { RecoilRoot } from 'recoil'

import Dashboard from './routes/dashboard/dashboard.component'
import Analysis from './routes/analysis/analysis.component'
import Support from './routes/support/support.component'

const App = () => {

  return (
    <div>
      <BrowserRouter>
      <RecoilRoot>
        <AuthProvider>
          <ModalProvider>
            <SettingsProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route element={<Privateroutes />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/layout/:settingid" element={<Settings />} />
                    <Route path="/support" element={<Support />} />
                  </Route>
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </SettingsProvider>
          </ModalProvider>
        </AuthProvider>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  )
}

export default App
