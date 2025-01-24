import "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Doctors from "./components/pages/Doctors";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Contact from "./components/pages/Contact";
import Myprofile from "./components/pages/Myprofile";
import Myappointment from "./components/pages/Myappointment";
import Appointment from "./components/pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<Myprofile />} />
        <Route path="/my-appointment" element={<Myappointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
