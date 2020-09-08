import React, { useEffect, useState } from "react";

const url = "https://restcountries.eu/rest/v2/name/";

export const CountriesPage = () => {
  const { countries, loading, setCountryName, resetCountry } = useCountries();

  /*const countriesContent = countries.map(country => {
    return <div>{country.name}</div>;
  });*/

  return (
    <React.Fragment>
      <h1>Countries</h1>
      <input type="text" onChange={(ev) => setCountryName(ev.target.value)} />
      <button onClick={() => resetCountry()}>Reset</button>
      {!loading &&
        countries.length > 0 &&
        countries.map((country) => <div>{country.capital}</div>)}
    </React.Fragment>
  );
};

type Country = {
  name: string;
  capital: string;
};

const useCountries = () => {
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Array<Country>>([]);

  const resetCountry = () => setCountryName("");

  useEffect(() => {
    setLoading(true);
    fetch(`${url}${countryName}`)
      .then((res) => (res.ok ? res.json() : new Error(res.statusText)))
      .then((countries: Array<Country>) => {
        console.log({ countries });
        setCountries(countries);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setCountries([]);
      });
  }, [countryName]);

  return { countries, loading, setCountryName, resetCountry };
};
