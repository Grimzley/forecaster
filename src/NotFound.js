import {Link} from 'react-router-dom/cjs/react-router-dom.min';

const NotFound = () => {
    return (
        <div className="error">
            <div>
                <h1>404 Page Not Found</h1>
                <Link to="/"><h2 className='not-found'>Go Back</h2></Link>
            </div>
        </div>
    );
}
 
export default NotFound;
