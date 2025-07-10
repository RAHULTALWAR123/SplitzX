
import { AiFillHeart } from "react-icons/ai";
// import "./Footer.css";
import "./Footer.css";
import Link from "next/link";
// import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // <FadeContent blur duration={600}>
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-left">
            {/* <img src={ReactBitsLogo} alt="React Bits" /> */}
            <p className="footer-description">An app created with <AiFillHeart className="footer-heart" /> by <a href="https://davidhaz.com/" target="_blank" className="footer-creator-link">this guy</a></p>
            <p className="footer-copyright">© {new Date().getFullYear()} SplitzX</p>
          </div>

          <div className="footer-links">
            <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <Link href="/text-animations/split-text" className="footer-link">Docs</Link>
            <Link href="/showcase" className="footer-link">Showcase</Link>
          </div>
        </div>
      </footer>
    // </FadeContent>
  );
};

export default Footer;