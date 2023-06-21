import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function LogOut() {

    const [loginStatus, setLoginStatus] = useState('')

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    React.useEffect(() => {
        Axios.post('http://localhost:3001/logout', { withCredentials: true })
        .then((response) => {
            console.log(response);
            setLoginStatus('');
            navigate("/");
            window.location.reload(false);
        })
        .catch((error) => {
            console.log(error);
        });
    });

    return "Logged out"

}