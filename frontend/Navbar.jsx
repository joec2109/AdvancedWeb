import React, {useState} from 'react';
import {Link, useResolvedPath, useMatch, useHistory } from "react-router-dom"
import Axios from 'axios';

import ml5 from 'ml5';


export default function Navbar() {

    const [loginStatus, setLoginStatus] = useState('')

    Axios.defaults.withCredentials = true;

    React.useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn==true) {
            setLoginStatus(response.data.user[0].username)
            }
        })
    }, [])
        return (<nav className="nav">
            <ul>
                <li>
                    <Link to="/" className="site-title">Home</Link>
                    {loginStatus ? (
                        <>
                            <CustomLink to="/profile">Profile</CustomLink>
                            <CustomLink to="/logOut" >Log Out</CustomLink>
                            <CustomLink to="/selectTeam">News Feed</CustomLink>
                        </>
                    ): ( 

                        <>
                            <CustomLink to="/signUp">Sign Up</CustomLink>
                            <CustomLink to="/logIn">Log In</CustomLink>
                        </>

                    )}
                </li>
            </ul>
        </nav>
        );
};

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