const About = () => {
    return (
        <div className='about'>
            <h2>About <span>Forecaster</span></h2>
            <p>
                Forecaster is a straightforward single-page weather application developed with React. Real-time weather information for the next seven days is displayed for the user's location. A day can be selected to display additional information, including sunrise and sunset time, wind speed, and precipitation probability. Switches are also included to change the units that the temperatures and wind speeds are displayed in.
            </p>
            <br />
            <p>
                Upon loading the page, the browser will ask the user for permission to access their location using the browser's Geolocation API. The default location is set to Seoul, South Korea, and the location is updated if permission is granted. BigDataCloud's Reverse Geocoding API converts the given latitude and longitude coordinates into a human-readable city name. Weather data of the given location is then obtained through Open-Meteo's weather API.
            </p>
            <br />
            <p>
                In the future, I plan to implement a search bar and utilize a Geocoding API to allow the user to check the weather in various cities. I would also like to expand the number of forecast days and include additional parameters such as humidity or visibility.
            </p>
        </div>
    );
}
 
export default About;
