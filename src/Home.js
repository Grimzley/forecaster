import {useEffect, useState} from 'react';
import useFetch from './useFetch';
import Weather from './Weather';

const Home = () => {

    const [loc, setLoc] = useState([37.5519, 126.9918]);
    const [temp, setTemp] = useState("fahrenheit");
    const [wind, setWind] = useState("mph");
    const [main, setMain] = useState(0)
    
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos => {
                setLoc([pos.coords.latitude, pos.coords.longitude]);
            }));
        }
    }, []);

    const {data: location} = useFetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${loc[0]}&longitude=${loc[1]}&localityLanguage=en`);
    const {data: weatherData, isPending, error} = useFetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc[0]}&longitude=${loc[1]}&wind_speed_unit=${wind}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max&hourly=temperature_2m,weather_code&temperature_unit=${temp}&timezone=auto`);

    const weatherList = []
    const hourList = []
    function processData(data) {
        for (let i = 0; i < 7; i++) {
            weatherList.push({
                date: data.daily.time[i],
                //timezone: data.timezone_abbreviation,
                high: Math.round(data.daily.temperature_2m_max[i]),
                low: Math.round(data.daily.temperature_2m_min[i]),
                tempUnit: data.daily_units.temperature_2m_max,
                wmo: data.daily.weather_code[i],
                sunrise: data.daily.sunrise[i].slice(11, 16),
                sunset: data.daily.sunset[i].slice(11, 16),
                wind: Math.round(data.daily.wind_speed_10m_max[i]),
                windUnit: data.daily_units.wind_speed_10m_max,
                precipitation: data.daily.precipitation_probability_max[i],
                id: i,
            });
        }
        for (let i = 0; i < 24; i++) {
            hourList.push({
                time: data.hourly.time.slice(i * 24, (i * 24) + 24),
                h_temp: data.hourly.temperature_2m.slice(i * 24, (i * 24) + 24),
                h_wmo: data.hourly.weather_code.slice(i * 24, (i * 24) + 24),
                id: i,
            });
        }
    }
    if (weatherData && location) {
        processData(weatherData)
    }
    function changeMain(id) {
        setMain(id);
    }
    function changeTemp() {
        setTemp(temp === "fahrenheit" ? "celsius": "fahrenheit");
    }
    function changeWind() {
        setWind(wind === "mph" ? "kmh": "mph");
    }

    return (
        <div>
            {error && <div className='error'><h1>{error}</h1></div>}
            {isPending && <div className='loading'><h1>Loading...</h1></div>}
            {weatherData && 
                <div>
                    <div className='options'>
                        <h1>{location.city}, {location.countryCode}</h1>
                        <div className='toggle-group'>
                            <div className='toggle'>
                                <h3>F°</h3>
                                <label className='switch'>
                                    <input type='checkbox' onClick={changeTemp}/>
                                    <span className='slider round'></span>
                                </label>
                                <h3>C°</h3>
                            </div>
                            <div className='toggle'>
                                <h3>Mph</h3>
                                <label className='switch'>
                                    <input type='checkbox' onClick={changeWind}/>
                                    <span className='slider round'></span>
                                </label>
                                <h3>Kmh</h3>
                            </div>
                        </div>
                    </div>
                    <Weather day={weatherList[main]} hour={hourList[main]} changeMain={changeMain} main={main}/>
                    <div className='weather-list'>
                        {weatherList.map((day) =>(
                            <Weather day={day} hour={null} changeMain={changeMain} main={null} key={day.id}/>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Home;
