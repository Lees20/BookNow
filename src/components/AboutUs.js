import React from 'react';
import '../styles/AboutUs.css';
import pantelisImage from '../assets/pantelis.png';
import anastasiaImage from '../assets/anastasia.png';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="about-us-content">
        <h1>About Us</h1>
        <section className="about-section">
          <h2>Our Project</h2>
          <p>
            This project was built as a part of our university coursework under the guidance of our professor, Mr. Prezerakos.
            It was developed by Pantelis Karabetsos and Anastasia Katsipi. We aimed to create a comprehensive platform to help
            users find and book accommodations easily and efficiently.
          </p>
        </section>

        <section className="mission-vision-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make travel planning easy and accessible for everyone. We aim to connect travelers with their ideal accommodations
            seamlessly and efficiently.
          </p>

          <h2>Our Vision</h2>
          <p>
            Our vision is to be the leading travel platform, known for exceptional customer service and a variety of unique properties.
          </p>
        </section>

        <section className="team-section">
          <h2>Our Team</h2>
          <p>
            Our team is composed of passionate students who are committed to making your travel experience unforgettable.
          </p>
          <div class="meet-team">Meet our team</div>
          <div className="team-members">
            <div className="team-member">
            <img src={pantelisImage} alt="Pantelis Karabetsos" className="profile-image" />
              <h3>Pantelis Karabetsos</h3>
              <p>Developer</p>
            </div>
            <div className="team-member">
            <img src={anastasiaImage} alt="Anastasia Katsipi" className="profile-image" />
              <h3>Anastasia Katsipi</h3>
              <p>Developer</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>
            Have any questions or need assistance? Feel free to reach out to us!
          </p>
          <p>Email: support@booknow.com</p>
          <p>Phone: +30 2101234567</p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
