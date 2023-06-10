import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ApplicationWrapper from './components/ApplicationWrapper'
import Header from './components/Header/'
import Users from './Pages/Users/Users'
import PageContainer from './components/PageContainer/PageContainer.tsx'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ApplicationWrapper>
        <Header />
        <PageContainer>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </PageContainer>
      </ApplicationWrapper>
    </BrowserRouter>
  )
}

export default App
