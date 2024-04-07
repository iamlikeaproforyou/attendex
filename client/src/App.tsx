import './App.css'
import { Routes , Route , BrowserRouter } from 'react-router-dom'
import Register from './routes/register/register.component'
import Login from './routes/login/login.component'

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
