import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      {/* <a href='/about' component={About}>About</a> */}
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;
