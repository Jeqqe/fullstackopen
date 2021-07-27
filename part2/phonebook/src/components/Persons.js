import React from 'react'
import personService from '../services/persons'

const Person = ({setPersons, id, name, number}) => {

	const handleDelete = () => {
		if (!window.confirm(`Delete ${name}?`)) return

		personService
			.remove(id)
			.then(() => {
				personService
					.getAll()
					.then(returnedPersons => setPersons(returnedPersons))
			})
	}

	return (
		<tr>
			<td>{name}</td>
			<td>{number}</td>
			<td>
				<button
					type="submit"
					onClick={handleDelete}
					>delete
				</button>
			</td>
		</tr>
	)
}

const Persons = ({setPersons, persons, filter}) => {
	return (
		<table>
			<tbody>
				{persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())).map((person) => 
					<Person
						key={person.name}
						setPersons={setPersons}
						id={person.id}
						name={person.name}
						number={person.number}
					/>)
				}
			</tbody>
		</table>
	)
}

export default Persons