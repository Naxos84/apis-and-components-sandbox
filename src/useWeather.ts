import { useState, useReducer, useEffect } from "react";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?appid=66445a4269dd911a5bbe214fadb768d6&units=metric&q=";

export type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
      [key: string]: string | number;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    [key: string]: string | number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const initialWeather: WeatherResponse | null = null;

type Action = {
  type: string;
  weather: WeatherResponse;
};
type WeatherOptions = {
  autoReloadInterval: number;
};
export const useWeather = (
  city: string,
  options: WeatherOptions = { autoReloadInterval: 60 }
) => {
  const [weather, dispatch] = useReducer(weatherReducer, initialWeather);
  const [loading, setLoading] = useState(false);

  const fetchWeather = () => {
    setLoading(true);
    const url = `${apiUrl}${city}`;
    console.log("fetching ", url);
    fetch(`${apiUrl}${city}`)
      .then(res => res.json())
      .then((weather: WeatherResponse) => {
        setLoading(false);
        //setTodos(todos);
        dispatch({ type: "set", weather });
      })
      .catch(e => console.error(e));
  };

  useEffect(fetchWeather, [city]);
  return { weather, loading };
};

function weatherReducer(
  state: WeatherResponse | null,
  action: Action
): WeatherResponse | null {
  switch (action.type) {
    case "set":
      return {
        ...state,
        ...action.weather
      };
    default:
      return state;
  }
}
