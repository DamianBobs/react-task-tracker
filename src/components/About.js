import { Link } from 'react-router-dom'
const About = () => {
    return (
        <div>
            <h4>Version 1.0.0</h4>
            {/* When using routing, use Link pkg with 'Link' tags instead of 'a' tags
                This is much faster than using 'a' which causes a page reload */}
            {/* <a href="/">Go Back</a> */}
            
            <Link to='/'>Go Back</Link>

        </div>
    )
}

export default About
