import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './pages/Intro'
import Login from './pages/Login'
// import SignUp from './pages/SignUp'
import Question from './pages/Question'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
         <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/question" element={<Question />} />

      </Routes>
    </BrowserRouter>
  )
}
