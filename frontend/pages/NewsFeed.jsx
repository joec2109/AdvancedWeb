import NewsList from "../components/NewsList"
import ParticlesBackground from "../components/ParticlesBackground"

function NewsFeed() {
    // Return the elements needed for the news feed page (particles background & the news feed list)
    return(<>
    <ParticlesBackground />
        <NewsList />
    </>)

}

export default NewsFeed