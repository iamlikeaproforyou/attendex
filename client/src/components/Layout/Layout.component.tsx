import { Outlet } from "react-router-dom"
import Navigation from "../Navigation/Navigation.component"
import Header from "../Header/Header.component"
import './Layout.styles.scss'
const Layout = () => {
    return (
        <div className="page">
            <Navigation />
            <div className="right">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout