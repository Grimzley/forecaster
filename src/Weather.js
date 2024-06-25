const Weather = ({day, hour, changeMain, main}) => {

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    function weatherStatus(code, Sun=true) {
        switch (code) {
            case 0:
                return Sun ? "sunny": "clear_night";
            case 1:
            case 2:
            case 3:
                return Sun ? "partly_cloudy_day": "partly_cloudy_night";
            case 45:
            case 48:
                return "foggy";
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
            case 80:
            case 81:
            case 82:
            case 85:
            case 86:
                return "rainy";
            case 71:
            case 73:
            case 75:
            case 77:
                return "weather_snowy";
            case 95:
            case 96:
            case 99:
                return "thunderstorm";
            default: return "thermostat";
        }
    }
    function weatherCode(code){
        switch (code) {
            case 0: return "Clear Sky";
            case 1: return "Mainly Clear";
            case 2: return "Partly Cloudy";
            case 3: return "Overcast";
            case 45: return "Fog";
            case 48: return "Depositing Rime Fog";
            case 51: return "Light Drizzle";
            case 53: return "Moderate Drizzle";
            case 55: return "Dense Drizzle";
            case 56: return "Light Freezing Drizzle";
            case 57: return "Dense Freezing Drizzle";
            case 61: return "Slight Rain";
            case 63: return "Moderate Rain";
            case 65: return "Heavy Rain";
            case 66: return "Light Freezing Rain";
            case 67: return "Heavy Freezing Rain";
            case 71: return "Slight Snowfall";
            case 73: return "Moderate Snowfall";
            case 75: return "Heavy Snowfall";
            case 77: return "Snow Grains";
            case 80: return "Slight Rain Showers";
            case 81: return "Moderate Rain Showers";
            case 82: return "Violent Rain Showers";
            case 85: return "Slight Snow Showers";
            case 86: return "Heavy Snow Showers";
            case 95: return "Thunderstorm";
            case 96: return "Thunderstorm with Slight Hail";
            case 99: return "Thunderstorm with Heavy Hail";
            default: return "Error";
        }
    }
    function isDay(time) {
        let rise = Number(day.sunrise.slice(0, 2))
        let set = Number(day.sunset.slice(0, 2))
        if (time < rise || time > set) {
            return false
        }
        return true
    }
    
    const hourly = []
    if (day.id === main) {
        for (let i = 0; i < 24; i++) {
            hourly.push(
            <div className="hour" key={hour.id + i}>
                <div>{hour.time[i].slice(11, 16)}</div>
                <div><span className="material-symbols-outlined">{weatherStatus(hour.h_wmo[i], isDay(Number(hour.time[i].slice(11, 13))))}</span></div>
                <div>{Math.round(hour.h_temp[i])} {day.tempUnit}</div>
            </div>)
        }
    }

    return (
        <div className='weather-preview' onClick={() => changeMain(day.id)} id={day.id === main ? "main": ""}>
            <div className="icon">
                <span className="material-symbols-outlined">{weatherStatus(day.wmo)}</span>
            </div>
            <div className='info'>
                <h4>{dayNames[new Date(day.date).getDay()]}</h4>
                <p>{day.high} / {day.low} {day.tempUnit}</p>
                <p>{weatherCode(day.wmo)}</p>
            </div>
            {day.id === main &&
                <div className='extra'>
                    <p>Sunrise: {day.sunrise}</p>
                    <p>Sunset: {day.sunset}</p>
                    <div>
                        <span className='material-symbols-outlined'>Air</span><p>: {day.wind} {day.windUnit}</p>
                    </div>
                    <div>
                        <span className='material-symbols-outlined'>Water_Drop</span><p>: {day.precipitation}%</p>
                    </div>
                </div>
            }
            {day.id === main &&
                <div className='hourly'>
                    <div className='hourly-list'>
                        {hourly}
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Weather
