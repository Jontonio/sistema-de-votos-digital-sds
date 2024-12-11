import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Login } from './auth/pages/Login.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { StudentVoter } from './pages/StudentVoter.jsx';
import { FormVoter } from './pages/FormVoter.jsx';
import { MaintenanceMain } from './maintenance/pages/MaintenanceMain.jsx'
import { AddStudent } from './maintenance/pages/AddStudent.jsx'
import { AddCandidate } from './maintenance/pages/AddCandidate.jsx'
import { Candidates } from './maintenance/pages/Candidates.jsx'
import { Students } from './maintenance/pages/Students.jsx'
import { ResultVoter } from './maintenance/pages/ResultVoter.jsx'
import { Setting } from './maintenance/pages/Setting.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormVoter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/config" element={<MaintenanceMain />}>
          <Route path="add-student" element={<AddStudent />} />
          <Route path="add-candidate" element={<AddCandidate />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="students" element={<Students />} />
          <Route path="setting" element={<Setting />} />
          <Route path="results-voter" element={<ResultVoter />} />
        </Route>
        <Route path="/main" element={<App />} />
        <Route path="/student-voter" element={<StudentVoter />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
