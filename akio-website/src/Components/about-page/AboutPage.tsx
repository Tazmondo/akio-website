import React from "react";
import NavBar from "../navbar/NavBar";

function AboutPage(): JSX.Element {
    return (
        <div>
            <NavBar/>

            <div>
                <h1 className = 'header-text text-center'>
                    About Us
                </h1>

                <div className = 'description-wrapper  mt-5'>
                    <p className = 'description-text text-center'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Vivamus arcu felis bibendum ut tristique et egestas quis ipsum. Tellus molestie nunc non blandit massa. Arcu vitae elementum curabitur vitae nunc. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Tortor at auctor urna nunc id cursus. Sodales ut eu sem integer vitae justo. A diam maecenas sed enim ut sem. Tellus orci ac auctor augue mauris augue neque.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage