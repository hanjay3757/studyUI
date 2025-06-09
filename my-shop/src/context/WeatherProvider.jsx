import { useEffect, useState } from "react";
import WeatherContext from "./WeatherContext";
import axios from "axios";

// 선택할 국가
const conutries= {
    Korea: "Seoul",
    USA: "New York",
    Japan: "Tokyo",
    France: "Paris",
    Germany: "Berlin"
}
// 날씨api
const API_KEY = "b52f83d9dc7d96098ca8de149cb841d6";

const WeatherProvider = ({children}) => {
    //나라선택
    const [selectCountry, setSelectCountry] = useState("Korea");

    //날씨
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const axiosWeather = async () => {
            const city = conutries[selectCountry];
            try {
                const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
                    params: {
                        q: city,
                        appid: API_KEY,
                        units: "metric",
                        lang: "kr"
                    }
                })
                setWeatherData(response.data);
            } catch (error) {

            }
        }
        axiosWeather();
    }, [selectCountry])

    console.log(weatherData);
    return(
        <WeatherContext.Provider value={{selectCountry,setSelectCountry,weatherData,setWeatherData,conutries}}>
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherProvider;