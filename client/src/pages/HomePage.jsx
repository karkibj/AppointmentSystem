import React from 'react';
import '../Homepage.css'; // Import external CSS\
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <div className="logo">MyAppointment</div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#testimonials">Testimonials</a>
          <Link to="/login" className="btn-login">Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Book Your Appointments Effortlessly</h1>
          <p>Get the care you need with easy-to-use scheduling. Manage appointments anytime, anywhere.</p>
          <a href="/book" className="btn-book">Book an Appointment</a>
        </div>
        <img src="data:image/jpeg;base64,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" alt="Doctor Consultation" className="hero-image" />
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Easy to Use</h3>
            <p>Schedule appointments with just a few clicks.</p>
          </div>
          <div className="feature">
            <h3>Manage Appointments</h3>
            <p>Keep track of your upcoming and past appointments.</p>
          </div>
          <div className="feature">
            <h3>Reminders</h3>
            <p>Get email and SMS reminders before your appointments.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>Step 1</h3>
            <p>Sign up or login to your account.</p>
          </div>
          <div className="step">
            <h3>Step 2</h3>
            <p>Search for available doctors and select a time.</p>
          </div>
          <div className="step">
            <h3>Step 3</h3>
            <p>Confirm your appointment and get reminders!</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"This system has made booking appointments so much easier! Highly recommended."</p>
          <span>- Jane Doe</span>
        </div>
        <div className="testimonial">
          <p>"I love how I can manage all my medical appointments in one place!"</p>
          <span>- John Smith</span>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/contact">Contact Us</a>
        </div>
        <p>&copy; 2024 MyAppointment. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
