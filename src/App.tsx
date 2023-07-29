import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ApplicationWrapper from './components/ApplicationWrapper'
import Header from './components/Header/'
import PageWrapper from './components/PageWrapper'
import SideBar from './components/SideBar/'
import PageDivider from './components/PageDivider'
import PageContainer from './components/PageContainer'

import Users from './Pages/Users'
import Locations from './Pages/Locations/Locations'

import { useAppDispatch } from './hooks/redux'
import { insertStatesData } from './store/reducers/locations'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import StateService from './api/services/state'

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
      <ApplicationWrapper>
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
        <Header />
        <PageWrapper>
          <SideBar />
          <PageDivider />
          <PageContainer>
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/users">
                <Route path="/users" element={<Users />} />
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
