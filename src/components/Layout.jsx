import NavBar from "./NavBar";
import { Outlet } from 'react-router-dom';
 
const Layout = () => {
    return (
        <div className="flex flex-col bg-primary50">
            <NavBar ></NavBar>
            <main className="flex-grow font-inter"  style={{minHeight: 'calc(100vh - 74px)'}}>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
