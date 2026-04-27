import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import Dashboardpage from "./Pages/DashboardPage"
import "./App.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<Dashboardpage />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App