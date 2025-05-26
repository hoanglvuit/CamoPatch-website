import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage' 
import ExperimentPage from './pages/ExperimentPage' 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path ="/" element={<HomePage />} />
      <Route path ="/try" element={<ExperimentPage />} /> 
    </Routes>
  </BrowserRouter>
)