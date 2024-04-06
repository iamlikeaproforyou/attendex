import './App.css'
import { Routes , Route , BrowserRouter } from 'react-router-dom'
import Register from './routes/register/register.component'

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}/> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
