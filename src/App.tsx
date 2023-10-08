import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ApplicationWrapper from './components/ApplicationWrapper'
import Header from './components/Header/'
import PageWrapper from './components/PageWrapper'
import SideBar from './components/SideBar/'
import PageDivider from './components/PageDivider'
import PageContainer from './components/PageContainer'

import Users from './pages/Users'
import Locations from './pages/Locations'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'

import { useAppDispatch } from './hooks/redux'

import StateService from './api/services/state'
import { insertStatesData } from './store/reducers/locations'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useAppDispatch()

  async function getAllStates() {
    const usersResponse = await StateService.getAllStates()
    dispatch(insertStatesData(usersResponse))
  }

  useEffect(() => {
    getAllStates()
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ApplicationWrapper>
        <Header />
        <PageWrapper>
          <SideBar />
          <PageDivider />
          <PageContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users">
                <Route path="/users" element={<Users />} />
                <Route path="/users/:userId" element={<UserProfile />} />
              </Route>
              <Route path="/locations" element={<Locations />} />
            </Routes>
          </PageContainer>
        </PageWrapper>
      </ApplicationWrapper>
    </BrowserRouter>
  )
}

export default App
