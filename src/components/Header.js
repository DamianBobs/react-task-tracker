import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

//TODO: Including 'props' as a parameter of the arrow function
//      so the component can receive properties from other components

// // Alternative syntax for use w/ defined properties
// const Header = ({ title }) => {
//     return (
//         <header>
//             <h1>{title}</h1>
//         </header>
//     )
// }

const Header = (props) => {
  // useLocation() is a hook we can use from react-router-dom, allows us to look at the route we are currently on
  // gives us access to location.pathname which is our current route
  const location = useLocation();
  return (
    <header className="header">
      {/* Inline styling */}
      {/* <h1 style={{ color: 'red', backgroundColor: 'black'}}>{props.title}</h1> */}

      {/* Using styling variable */}
      {/* <h1 style={headingStyle}>{props.title}</h1> */}

      <h1>{props.title}</h1>

      {/* Using ternary to set dynamic properties of the button component based on showAdd property */}
      {location.pathname === "/" && <Button color={props.showAdd ? "red" : "green"} text={props.showAdd ? "Close" : "Add"} onClick={props.onAdd} />}
    </header>
  );
};

// Setting default values for properties
Header.defaultProps = {
  title: "Task Tracker",
};

// Using PropTypes package to assign types to properties and making property requried using isRequried
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// Creating a styling object - CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor : 'black',
// }

export default Header;
