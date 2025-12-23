'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const menuItems = [
  {
    id: 1,
    name: 'Rose Macaron',
    description: 'Delicate rose-flavored shells with raspberry cream',
    price: '$4.50',
    color: '#F395C2',
  },
  {
    id: 2,
    name: 'Golden Delight',
    description: 'Vanilla bean with salted caramel filling',
    price: '$4.50',
    color: '#EFC576',
  },
  {
    id: 3,
    name: 'Lavender Dream',
    description: 'Lavender infused with honey buttercream',
    price: '$4.50',
    color: '#F7ADCF',
  },
  {
    id: 4,
    name: 'Chocolate Bliss',
    description: 'Dark chocolate with ganache center',
    price: '$4.50',
    color: '#8B6F5C',
  },
  {
    id: 5,
    name: 'Pistachio Heaven',
    description: 'Pistachio shells with cream cheese filling',
    price: '$5.00',
    color: '#93C572',
  },
  {
    id: 6,
    name: 'Lemon Zest',
    description: 'Citrus burst with white chocolate',
    price: '$4.50',
    color: '#FFF176',
  },
];

export default function InteractiveMenu() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="menu-section">
      <div className="container">
        <motion.div
          className="menu-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="menu-title gradient-text">Our Signature Collection</h2>
          <p className="menu-subtitle">
            Explore our handcrafted selection of French macarons
          </p>
        </motion.div>

        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="menu-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className="card-inner" style={{
                transform: hoveredId === item.id ? 'rotateY(180deg)' : 'rotateY(0)',
              }}>
                {/* Front of card */}
                <div className="card-front" style={{ backgroundColor: item.color }}>
                  <div className="card-icon">🍰</div>
                  <h3 className="card-name">{item.name}</h3>
                  <p className="card-price">{item.price}</p>
                </div>

                {/* Back of card */}
                <div className="card-back">
                  <h3 className="card-name-back">{item.name}</h3>
                  <p className="card-description">{item.description}</p>
                  <button className="btn btn-primary btn-sm">Add to Box</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="menu-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="btn btn-primary">View Full Menu</button>
        </motion.div>
      </div>

      <style jsx>{`
        .menu-section {
          padding: var(--section-padding) 0;
          background: var(--color-white);
          position: relative;
        }

        .menu-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .menu-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          margin-bottom: 20px;
        }

        .menu-subtitle {
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: var(--color-dark);
          opacity: 0.7;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .menu-card {
          perspective: 1000px;
          height: 350px;
          cursor: pointer;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          box-shadow: var(--shadow-soft);
        }

        .card-front {
          background: var(--gradient-primary);
          color: var(--color-white);
        }

        .card-back {
          background: var(--color-white);
          border: 2px solid var(--color-pink-light);
          transform: rotateY(180deg);
        }

        .card-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }

        .card-name {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 10px;
          text-align: center;
        }

        .card-name-back {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: var(--color-pink-primary);
          text-align: center;
        }

        .card-price {
          font-size: 1.5rem;
          font-weight: 600;
          opacity: 0.9;
        }

        .card-description {
          font-size: 1rem;
          text-align: center;
          color: var(--color-dark);
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .btn-sm {
          padding: 12px 30px;
          font-size: 14px;
        }

        .menu-cta {
          text-align: center;
        }

        @media (max-width: 768px) {
          .menu-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
