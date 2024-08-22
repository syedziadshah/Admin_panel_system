import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Service } from "./pages/Service";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/Layouts/Admin-layout";
import { AdminUser } from "./pages/Admin-User";
import { AdminContact } from "./pages/Admin-Contact";
import { AdminUpdate } from "./pages/Admin-Update";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path ="/logout" element={<Logout/>}/>
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout/>}>
            <Route path="user" element={<AdminUser/>}/>
            <Route path="contact" element={<AdminContact/>}/>
            <Route path="service" element={<Service/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="users/:id/edit" element={<AdminUpdate/>}/>
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
