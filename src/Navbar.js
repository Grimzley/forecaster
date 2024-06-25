import {Link} from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = () => {

    return (
        <nav className='navbar'>
            <h1>Forecaster</h1>
            <div className='links'>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;
