import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountryWeather = ({weather}) => {
	if(weather.main === undefined) {
		return (
			<>
				<p>Weather loading...</p>
			</>
		)
	}
	return (
		<>
			<p><b>Tempature:</b> {weather.main.temp} Celcius</p>
			<img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='Weather'/>
			<p><b>Wind:</b> {weather.wind.speed} km/h</p>
		</>
	)
}

const CountryInfo = ({country}) => {
	return (
		<>
			<table>
				<tbody>
					<tr>
						<td>Capital</td>
						<td>{country.capital}</td>
					</tr>
					<tr>
						<td>Population</td>
						<td>{country.population}</td>
					</tr>
				</tbody>
			</table>
			<h2>Languages</h2>
			<ul>
				{country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
			</ul>
			<img style={{width:'200px'}} src={country.flag} alt='Country Flag'/>
		</>
	)
}

const CountryContent = ({country}) => {
	const [weather, setWeather] = useState(0)
	
	useEffect(() => {
		axios.get('http://api.openweathermap.org/data/2.5/weather', {
			params: {
				appid: process.env.REACT_APP_API_KEY,
				q: country.capital,
				units: 'metric'
			}
		}).then(response => {
			//console.log(response.data)
			setWeather(response.data)
		})
	}, [country.capital])

	return (
		<>
			<h1>{country.name}</h1>
			<CountryInfo country={country}/>
			
			<h2>{`Weather in ${country.name}`}</h2>
			<CountryWeather country={country} weather={weather}/>
		</>
	)
}

export default CountryContent