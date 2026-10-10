import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-media" aria-hidden="true">
        <video
          className="footer-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="brand">
            <div className="brand-lockup">
              <img src="/ll.png" alt="Anvi Mercantile Logo" className="h-10 w-auto object-contain shrink-0" />
              <h2 className="brand-name">Anvi Mercantile</h2>
            </div>
            <p className="brand-blurb">
              Premier import/export facilitation, sea freight forwarding, air cargo logistics, and customs compliance connecting Indian &amp; global trade routes.
            </p>
            <ul className="contact-list">
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <a href="mailto:info@anvimercantile.com">info@anvimercantile.com</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span>Mumbai, India (Global Freight)</span>
              </li>
            </ul>
          </div>

          {/* Col 1: Our Services */}
          <nav className="col" aria-label="Our Services">
            <h3 className="col-title">Our Services</h3>
            <ul className="link-list">
              <li><Link to="/services">Sea Freight Forwarding</Link></li>
              <li><Link to="/services">Air Cargo Express</Link></li>
              <li><Link to="/services">Customs Clearance</Link></li>
              <li><Link to="/services">Reefer Cold Chain</Link></li>
              <li><Link to="/trade">Agri Sourcing &amp; Export</Link></li>
              <li><Link to="/services">Door-to-Door Delivery</Link></li>
            </ul>
          </nav>

          {/* Col 2: Availability & Coverage */}
          <nav className="col" aria-label="Availability and Coverage">
            <h3 className="col-title">Availability &amp; Coverage</h3>
            <ul className="link-list">
              <li><Link to="/trade">24/7 Cargo Operations</Link></li>
              <li><Link to="/trade">India to UAE &amp; Middle East</Link></li>
              <li><Link to="/trade">India to USA &amp; Europe</Link></li>
              <li><Link to="/trade">SE Asia &amp; Far East Ports</Link></li>
              <li><Link to="/trade">Produce Calendar</Link></li>
              <li><Link to="/track">Real-Time Container Track</Link></li>
            </ul>
          </nav>

          {/* Col 3: Quick Navigation */}
          <nav className="col" aria-label="Quick Navigation">
            <h3 className="col-title">Quick Links</h3>
            <ul className="link-list">
              <li><Link to="/">Platform Overview</Link></li>
              <li><Link to="/services">Solutions Catalog</Link></li>
              <li><Link to="/trade">Trade Routes</Link></li>
              <li><Link to="/track">Track Shipment</Link></li>
              <li><Link to="/about">Company &amp; IEC</Link></li>
              <li><Link to="/quote">Get Instant Quote</Link></li>
            </ul>
          </nav>

          {/* Col 4: The Trade Letter */}
          <div className="newsletter">
            <h3 className="col-title">The Trade Letter</h3>
            <p>Subscribe for global trade market insights, freight rate updates &amp; seasonal produce availability.</p>
            {subscribed ? (
              <div className="p-3 bg-[#175A67] text-[#EAE3DE] text-xs font-semibold rounded">
                Subscribed successfully!
              </div>
            ) : (
              <form className="subscribe" onSubmit={handleSubmit}>
                <label htmlFor="nl-email-trade" className="sr-only">Email address</label>
                <input
                  id="nl-email-trade"
                  type="email"
                  name="email"
                  placeholder="Enter work email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" aria-label="Subscribe">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 12h15M13 6l6 6-6 6"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="socials">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.2.19 2.2.19v2.43h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.74l-.44 3h-2.3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.58 8.58 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
          </div>

          <nav className="legal" aria-label="Legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/privacy">Cookie Notice</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
