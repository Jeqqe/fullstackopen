import React from 'react'

const Person = ({ handleDelete, id, name, number }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
            <td>
                <button type='submit' onClick={() => handleDelete(name, id)}>
                    delete
                </button>
            </td>
        </tr>
    )
}

const Persons = ({ handleDelete, persons, filter }) => {
    return (
        <table>
            <tbody>
                {persons
                    .filter((person) =>
                        person.name.toLowerCase().includes(filter.toLowerCase())
                    )
                    .map((person) => (
                        <Person
                            key={person.name}
                            handleDelete={handleDelete}
                            id={person.id}
                            name={person.name}
                            number={person.number}
                        />
                    ))}
            </tbody>
        </table>
    )
}

export default Persons
