import React from 'react'

import CountryContent from './CountryContent'

const CountryListItem = ({country, setFilter}) => {

	const handleClick = (event) => {
		setFilter(event.target.value)
	}

	return (
		<>
			<p>
				{country.name} <button 
					value={country.name}
					onClick={handleClick}
					>show</button>
			</p>
		</>
	)
}

const CountryList = ({countries, filter, setFilter}) => {
	const filtered = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

	return (
		filtered.length > 10 
		? filter.length === 0 ? '' : <p>'Too many matches, specify another filter'</p>
		: filtered.map((country) =>
			<div key={country.name}>
				{
					filtered.length === 1 
					? <CountryContent country={country}/> 
					: <CountryListItem 
						country={country} 
						setFilter={setFilter}
						/>
				}
			</div>
		)
	)
}

export default CountryList