import React from 'react';
import './Services.css';

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Personal Shopping",
      description: "Get personalized assistance from our expert shopping consultants",
      icon: "shopping"
    },
    {
      id: 2,
      title: "Valet Parking",
      description: "Convenient valet parking service for a hassle-free experience",
      icon: "parking"
    },
    {
      id: 3,
      title: "Gift Wrapping",
      description: "Professional gift wrapping services for all your purchases",
      icon: "gift"
    },
    {
      id: 4,
      title: "Customer Lounge",
      description: "Relax in our comfortable customer lounge areas",
      icon: "lounge"
    }
  ];

  return (
    <section className="services">
      <div className="services-container">
        <header className="section-header">
          <h2>Premium Services</h2>
          <p>Enhancing your shopping experience with exceptional services</p>
        </header>
        
        <div className="services-grid">
          {services.map(service => (
            <article key={service.id} className="service-card">
              <div className={`service-icon ${service.icon}`}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" fill="currentColor" fillOpacity="0.1" rx="12"/>
                  <circle cx="24" cy="20" r="8" fill="currentColor" fillOpacity="0.3"/>
                  <rect x="16" y="32" width="16" height="3" fill="currentColor" fillOpacity="0.3" rx="1.5"/>
                </svg>
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
