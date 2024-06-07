import NavBar from "./NavBar";
import { Outlet } from 'react-router-dom';
 
const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar ></NavBar>
            <main className="flex-grow font-inter p-2">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
