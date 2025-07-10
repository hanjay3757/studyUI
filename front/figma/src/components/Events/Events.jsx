import React from 'react';
import './Events.css';

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Summer Fashion Show",
      date: "July 15, 2024",
      time: "7:00 PM",
      location: "Central Court",
      description: "Discover the latest summer fashion trends from top brands"
    },
    {
      id: 2,
      title: "Kids Fun Day",
      date: "July 20, 2024",
      time: "2:00 PM",
      location: "Family Zone",
      description: "Fun activities, games, and entertainment for children"
    },
    {
      id: 3,
      title: "Tech Innovation Expo",
      date: "July 25, 2024",
      time: "10:00 AM",
      location: "Tech Zone",
      description: "Explore the latest technology and innovation showcase"
    }
  ];

  return (
    <section className="events">
      <div className="events-container">
        <header className="section-header">
          <h2>Upcoming Events</h2>
          <p>Don't miss out on exciting events happening at our mall</p>
        </header>
        
        <div className="events-grid">
          {events.map(event => (
            <article key={event.id} className="event-card">
              <div className="event-date">
                <div className="event-day">
                  {new Date(event.date).getDate()}
                </div>
                <div className="event-month">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
              
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <div className="event-details">
                  <div className="event-time">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    {event.time}
                  </div>
                  <div className="event-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {event.location}
                  </div>
                </div>
                <p className="event-description">{event.description}</p>
                <button className="event-btn">Learn More</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
