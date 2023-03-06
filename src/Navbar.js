import {Link, useResolvedPath, useMatch } from "react-router-dom"

export default function Navbar() {
    return <nav className="nav">
        <ul>
            <li>
                <Link to="/" className="site-title">Home</Link>
                <CustomLink to="/signUp">Sign Up</CustomLink>
                <CustomLink to="/logIn">Log In</CustomLink>
            </li>
        </ul>
    </nav>
}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}