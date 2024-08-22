import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { TiContacts } from "react-icons/ti";
import { FaHome, FaServicestack } from "react-icons/fa";
import { useAuth } from "../../store/Auth";

export const AdminLayout = () => {
    const { user, isLoading } =useAuth(); // Corrected here

    console.log("admin layout", user);
   if (isLoading) { 
     return <h1>Loading ....</h1>;
    }
    
    if (!user.isAdmin) {
        return <Navigate to="/" />;
    }
    
    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li><NavLink to="/admin/user"><FaUserLarge />Users</NavLink></li>
                            <li><NavLink to="/admin/contact"><TiContacts />Contacts</NavLink></li>
                            <li><NavLink to="/admin/service"><FaServicestack />Service</NavLink></li>
                            <li><NavLink to="/admin/home"><FaHome />Home</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
};
