import Navbar from "./Navbar"
import logoWhite from "./images/logowhite.png"
import './App.css';

export default function Header() {
    return <header className = "App-header">
        <img className = "App-header-img" src = {logoWhite} alt="My Logo"/>
        <Navbar />
	</header>
}