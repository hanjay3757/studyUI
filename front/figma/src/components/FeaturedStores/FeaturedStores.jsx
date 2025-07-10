import React from 'react';
import './FeaturedStores.css';

export default function FeaturedStores() {
  const stores = [
    {
      id: 1,
      name: "Fashion Forward",
      category: "Clothing",
      description: "Latest trends in fashion and accessories",
      image: "fashion",
      rating: 4.8
    },
    {
      id: 2,
      name: "Tech Zone",
      category: "Electronics",
      description: "Cutting-edge technology and gadgets",
      image: "tech",
      rating: 4.9
    },
    {
      id: 3,
      name: "Home & Living",
      category: "Home Decor",
      description: "Beautiful furniture and home accessories",
      image: "home",
      rating: 4.7
    },
    {
      id: 4,
      name: "Sports Central",
      category: "Sports",
      description: "Athletic wear and sports equipment",
      image: "sports",
      rating: 4.6
    },
    {
      id: 5,
      name: "Beauty Boutique",
      category: "Beauty",
      description: "Premium cosmetics and skincare",
      image: "beauty",
      rating: 4.8
    },
    {
      id: 6,
      name: "Book Haven",
      category: "Books",
      description: "Wide selection of books and magazines",
      image: "books",
      rating: 4.9
    }
  ];

  return (
    <section className="featured-stores">
      <div className="featured-stores-container">
        <header className="section-header">
          <h2>Featured Stores</h2>
          <p>Discover our most popular shopping destinations</p>
        </header>
        
        <div className="stores-grid">
          {stores.map(store => (
            <article key={store.id} className="store-card">
              <div className="store-image">
                <div className={`store-image-placeholder ${store.image}`}>
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <rect width="80" height="80" fill="currentColor" fillOpacity="0.1" rx="8"/>
                    <circle cx="40" cy="35" r="12" fill="currentColor" fillOpacity="0.3"/>
                    <rect x="25" y="55" width="30" height="4" fill="currentColor" fillOpacity="0.3" rx="2"/>
                  </svg>
                </div>
              </div>
              
              <div className="store-content">
                <div className="store-header">
                  <h3 className="store-name">{store.name}</h3>
                  <div className="store-rating">
                    <span className="rating-star">★</span>
                    <span className="rating-value">{store.rating}</span>
                  </div>
                </div>
                
                <p className="store-category">{store.category}</p>
                <p className="store-description">{store.description}</p>
                
                <button className="store-visit-btn">Visit Store</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
