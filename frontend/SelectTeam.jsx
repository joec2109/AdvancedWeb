import textfile from './/data/football_teams.txt'
import React, {useState} from 'react'
import {Link, useResolvedPath, useMatch, useHistory } from "react-router-dom"
import NewsFeed from './/pages/NewsFeed.jsx'
import Axios from 'axios'
import ParticlesBackground from './components/ParticlesBackground'


export default function SelectTeam() {

    const [loginStatus, setLoginStatus] = useState('');
    const [usersID, setUsersID] = useState('');

    const [teamReg, setTeamReg] = useState('')

    const [regStatus, setRegStatus] = useState('')

    const [text, setText] = React.useState();
  fetch(textfile)
    .then((response) => response.text())
    .then((textContent) => {
      setText(textContent);
    });

    const newText = new String(text)
    
    var Data = newText.split("\n"),
    MakeItem = function(X) {
        return <option>{X}</option>;
    };


    React.useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn==true) {
            setLoginStatus(response.data.user[0].username)
            setUsersID(response.data.user[0].usersId)
            console.log(response);
        }
        })
    }, [])




    const updateTeam = () => {
        Axios.post('http://localhost:3001/updateteam', {team:teamReg, userId: usersID}).then((response) => {
    
        if (response.data.message) {
          setRegStatus(response.data.message);
        } else {
          setRegStatus(response.data.message);
        }
    
        });
      };


    return(<>
    <ParticlesBackground />
        <div className='select-team-form'>
            <h1 className='select-team-h1'>Select Team</h1>
            <select name='teams' type="checkbox" className='team-dropdown' onChange={(e)=> {setTeamReg(e.target.value)}}>{Data.map(MakeItem)}</select>
            <button type="submit" class="btn" onClick={updateTeam}>Update Team</button>
            <p>{regStatus}</p>
            <p>Log out and log back in to update news feed</p>
            <nav className="nav select-team-nav">
                <ul>
                    <li>
                        <>
                        <CustomLink to="/newsFeed">Click me to proceed</CustomLink>
                        </>
                    </li>
                </ul>
            </nav>

        </div>
    </>)

}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link className="select-team-link" to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}