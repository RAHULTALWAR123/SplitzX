
import { AiFillHeart } from "react-icons/ai";
// import "./Footer.css";
import "./Footer.css";

const Footer = () => {
  return (
    // <FadeContent blur duration={600}>
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-left">
            {/* <img src={ReactBitsLogo} alt="React Bits" /> */}
            <p className="footer-description">An app created with <AiFillHeart className="footer-heart" /></p>
            <p className="footer-copyright">© {new Date().getFullYear()} SplitzX</p>
          </div>

          <div className="footer-links">
            <p rel="noopener noreferrer" className="footer-link">About Us</p>
            <p className="footer-link">Contact</p>
            <p className="footer-link">Privacy Policy</p>
          </div>
        </div>
      </footer>
    // </FadeContent>
  );
};

export default Footer;