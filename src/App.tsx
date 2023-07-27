import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import ApplicationWrapper from './components/ApplicationWrapper'
import Header from './components/Header/'
import PageWrapper from './components/PageWrapper'
import SideBar from './components/SideBar/'
import PageDivider from './components/PageDivider'
import PageContainer from './components/PageContainer'
import Users from './Pages/Users'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ApplicationWrapper>
        <ToastContainer />
        <Header />
        <PageWrapper>
          <SideBar />
          <PageDivider />
          <PageContainer>
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </PageContainer>
        </PageWrapper>
      </ApplicationWrapper>
    </BrowserRouter>
  )
}

export default App
