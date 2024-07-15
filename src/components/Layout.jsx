import NavBar from "./NavBar";
import { Outlet } from 'react-router-dom';
 
const Layout = () => {
    return (
        <div className="flex flex-col h-dvh bg-primary50">
            <NavBar ></NavBar>
            <main className="flex-grow font-inter">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
