import NavBar from "../navbar/NavBar";
import SocialMedia from "../social-media/SocialMedia";
const video = require("../../assets/home-page-video.mp4");


function HomePage(): JSX.Element {
    return (
        <div>
            <video autoPlay muted loop className = 'main-video'>
                <source src = {video} type = "video/mp4" />
            </video>

            <div>
                <NavBar />
                
                <h1 className = 'main-text'>
                    Akio
                </h1>

                <h2 className = 'main-slogan'>
                    High quality embroidered streetwear
                </h2>
            </div>

            <SocialMedia/>
        </div>
    );
}

export default HomePage;
