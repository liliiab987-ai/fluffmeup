"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container ">
        <div className="footer-content ">
          <motion.div
            className="footer-brand "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="footer-logo gradient-text">Fluff me up</h3>
            <p className="footer-tagline">Fluff it. Feel it. Vibe it.</p>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4>Visit Us</h4>
            <p>802 Danforth</p>
            <p>Toronto, Canada M4J 1L6</p>
            <p>Monday - Sunday</p>
            <p>8:00 AM - 8:00 PM</p>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4>Contact</h4>
            <p>hello@fluffmeup.com</p>
            <p>4651188</p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/fluffme_up/"
                className="social-link"
              >
                Instagram
              </a>
              <a href="https://store.fluffmeup.com/" className="social-link">
                Online Store
              </a>
              <a
                href="https://www.youtube.com/@FluffMe_Up"
                className="social-link"
              >
                YouTube
              </a>
            </div>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img src="/logof.webp" alt="Logo" className="footer-logo" />
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>&copy; 2025 Fluff me up. All rights reserved.</p>
          <div className="footer-links">
            {/* <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a> */}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(
            180deg,
            var(--color-white) 0%,
            rgba(243, 149, 194, 0.05) 100%
          );
          padding: 80px 0 40px;
          border-top: 1px solid rgba(243, 149, 194, 0.1);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .footer-logo {
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0;
        }

        .footer-tagline {
          font-size: 1.1rem;
          color: var(--color-dark);
          opacity: 0.7;
          font-style: italic;
        }

        .footer-section h4 {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-pink-primary);
          margin-bottom: 20px;
        }

        .footer-section p {
          font-size: 1rem;
          color: var(--color-dark);
          opacity: 0.8;
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 15px;
        }

        .social-link {
          color: var(--color-pink-primary);
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link:hover {
          color: var(--color-gold);
          transform: translateX(5px);
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 15px;
        }

        .newsletter-input {
          padding: 12px 20px;
          border: 2px solid var(--color-pink-light);
          border-radius: 25px;
          font-size: 14px;
          font-family: var(--font-body);
          outline: none;
          transition: border-color 0.3s ease;
        }

        .newsletter-input:focus {
          border-color: var(--color-pink-primary);
        }

        .btn-sm {
          padding: 12px 30px;
          font-size: 14px;
        }

        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid rgba(243, 149, 194, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-bottom p {
          color: var(--color-dark);
          opacity: 0.6;
          margin: 0;
        }

        .footer-links {
          display: flex;
          gap: 30px;
        }

        .footer-links a {
          color: var(--color-dark);
          opacity: 0.6;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-links a:hover {
          opacity: 1;
          color: var(--color-pink-primary);
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .footer-links {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </footer>
  );
}
