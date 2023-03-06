// Home.js
import homePageLogo from "../images/logowhiteblackoutline2.png"
import videoBackground from "../videos/video1.mp4"

export default function Home() {
  return <div className="home-page">
  <video autoPlay loop muted>
     <source src={videoBackground} type="video/mp4" />
  </video>
  <div className="overlay"></div>
  <img src={homePageLogo} alt="My Image" />
  <h1>SOCIAL MEDIA</h1>
  <h2>FOR FOOTBALL FANS ALL OVER THE WORLD.</h2>
</div>
}