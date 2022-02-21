import NavBar from "../navbar/NavBar";
import SocialMedia from "../social-media/SocialMedia";
const video = require("../../assets/home-page-video.mp4");


function HomePage(): JSX.Element {
    return (
        <div>
            <NavBar />

            <video autoPlay muted loop className = 'main-video'>
                <source src = {video} type = "video/mp4" />
            </video>

            <SocialMedia />
        </div>
    );
}

export default HomePage;