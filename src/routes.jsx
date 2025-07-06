import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderLayout from "./HeaderLayout";

import Intro from './pages/Intro'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Question from './pages/Question'
import Select from './pages/Select'
import Family_Create from './pages/Family_Create'
import Family_Join from './pages/Family_Join'
import Home from './pages/Home'
import Drawer from './pages/Drawer';
import Profile from './pages/Profile'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/*헤더가 필요한 화면들*/}
        <Route element={<HeaderLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/*헤더가 필요없음*/}
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/question" element={<Question />} />
        <Route path="/drawer" element={<Drawer familyCode="family001"/>} />
        <Route path="/select" element={<Select />} />
        <Route path="/family_create" element={<Family_Create />} />
        <Route path="/family_join" element={<Family_Join />} />        
      </Routes>
    </BrowserRouter>
  )
}
