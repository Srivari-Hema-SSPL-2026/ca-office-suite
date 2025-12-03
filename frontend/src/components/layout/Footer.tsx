import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>CA Office Suite</h4>
            <p>Modern office management platform for Chartered Accountants and tax professionals.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <nav className="footer-links">
              <Link to="/help">Help & FAQ</Link>
              <Link to="/help#privacy">Privacy Policy</Link>
              <Link to="/help#terms">Terms of Service</Link>
            </nav>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <address className="footer-contact">
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
                support@caoffice.com
              </span>
              <span>
                <FontAwesomeIcon icon={faPhone} />
                +91 1234 567 890
              </span>
              <span>
                <FontAwesomeIcon icon={faGlobe} />
                www.caoffice.com
              </span>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Srivari Software Solutions Private Limited. All rights reserved.</p>
          <p className="version">Version 1.0.0</p>
        </div>
      </div>
    </footer>
  );
}
