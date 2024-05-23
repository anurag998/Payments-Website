import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Send from "./pages/Send";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>

            <Route path="/signup" element={<SignUp />}> </Route>
            <Route path="/signin" element={<SignIn />}> </Route>

            <Route path="/dashboard" element={<Dashboard />}> </Route>

            <Route path="/send" element={<Send />}> </Route>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
