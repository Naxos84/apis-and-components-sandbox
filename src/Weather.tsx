import React, { useState } from "react";
import { useWeather, WeatherResponse } from "./useWeather";

export const WeatherPage = () => {
  const [city, setCity] = useState("berlin");
  const { weather, loading } = useWeather(city);

  return (
    <div>
      <h1>Wetter</h1>
      {!loading && <Weather weather={weather} />}

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={ev => setCity(ev.target.value)}
      />
    </div>
  );
};

const Weather = (props: { weather: WeatherResponse | null }) => {
  const { weather } = props;
  if (!weather) {
    return <React.Fragment />;
  }

  const main = Object.keys(weather.main).map(key => {
    return (
      <div key={key}>
        {key
          .split("_")
          .map(word => {
            const [first, ...rest] = word.split("");
            return first.toUpperCase() + rest.join("");
          })
          .join(" ")}
        : {weather.main[key]}
      </div>
    );
  });
  const weatherContent = weather.weather.map(w =>
    Object.keys(w).map(key => {
      return (
        <div key={key}>
          {key.split("_").join(" ")}: {weather.weather[0][key]}
        </div>
      );
    })
  );

  return (
    <div>
      <h2>{weather.name}</h2>
      <h1>main</h1>
      <div>{main}</div>
      <h1>weather</h1>
      <div>{weatherContent}</div>
    </div>
  );
};
