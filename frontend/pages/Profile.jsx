import React, {useState} from 'react';
import Axios from 'axios';
import ParticlesBackground from '../components/ParticlesBackground';

export default function Profile() {

    const [loginStatus, setLoginStatus] = useState('');
    const [usersID, setUsersID] = useState('');
    const [usersTeam, setUsersTeam] = useState('');


    React.useEffect(() => {
      Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn==true) {
          setLoginStatus(response.data.user[0].username)
          setUsersID(response.data.user[0].usersId)
          setUsersTeam(response.data.user[0].team)
          console.log(response);
      }
      })
    }, [])


    return (<>
    <ParticlesBackground />
        <div className="form-profile">
          <h1>Profile</h1>
          <p>Welcome, {loginStatus}</p>
          <p>Your User ID is: {usersID}</p>
          <p>Your selected team is: {usersTeam}</p>
          <p>Click on 'News Feed' to get started!</p>
          
      
        </div>
        </>
        )
}