// Home.js
// Import the logo & jsparticles interactive background
import homePageLogo from "../images/logo.png"
import ParticlesBackground from "../components/ParticlesBackground"

// Create the home page frontend layout
export default function Home() {
  return (<>
    <ParticlesBackground />
  <div className="home-page">
  <img src={homePageLogo} alt="My Image" />
  <h1>NEWS FEED</h1>
  <h2>FOR FOOTBALL FANS ALL OVER THE WORLD</h2>
  <h3>FIND THE LATEST NEWS ABOUT YOUR CLUB</h3>
</div>
</>)
}