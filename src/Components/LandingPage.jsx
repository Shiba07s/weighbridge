import React, { useState, useEffect } from 'react'; // Import useState here
import { Link } from 'react-router-dom'

import '../Login.css';
import BackgroundImage from '../assets/bg.png'
import { Navigation } from "./navigation";
import { Header } from "./headerpage";
import { Features } from "./features";
import { About } from "./about";
import { Services } from "./services";
import { Gallery } from "./gallery";
import { Testimonials } from "./testimonials";
import { Team } from "./Team";
import { Contact } from "./contact";
import JsonData from "../data/data.json";

export default function LandingPage() {
  const [landingPageData, setLandingPageData] = useState({});


    useEffect(() => {
        try {
          setLandingPageData(JsonData);
        } catch (error) {
          console.error("Error fetching JSON data:", error);
          // You can also display an error message to the user or handle the error in another way
        }
      }, []);
    return (
        <div className="div">
                <Navigation />

            <Header data={landingPageData.Header} />
              <Features data={landingPageData.Features} />
              <About data={landingPageData.About} />
              <Services data={landingPageData.Services} />
              <Gallery data={landingPageData.Gallery} />
              <Testimonials data={landingPageData.Testimonials} />
              <Team data={landingPageData.Team} />
              <Contact data={landingPageData.Contact} />
        </div>
    )
}

const HeaderStyle = {
    width: "100%",
    // height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}