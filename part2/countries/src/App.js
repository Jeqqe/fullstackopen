import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import CountryList from './components/CountryList'

const App = () => {

	const [ countries, setCountries ] = useState([])
	const [ filter, setFilter ] = useState('')

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then((response) => {
				setCountries(response.data)
			})
	}, [])

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

  	return (
    	<>
			<Filter 
				filter={filter}
				handleFilterChange={handleFilterChange}
			/>
			
			<CountryList 
				countries={countries}
				filter={filter}
				setFilter={setFilter}
			/>
		</>
  	)
}

export default App