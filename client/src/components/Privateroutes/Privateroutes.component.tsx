import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"

const Privateroutes = () => {
    const { auth } = useContext(AuthContext)
    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    )
}

export default Privateroutes