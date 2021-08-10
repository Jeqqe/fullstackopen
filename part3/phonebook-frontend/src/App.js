import React, { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [announcement, setAnnouncement] = useState(null)

    useEffect(() => {
        personService.getAll().then((initialPersons) => {
            setPersons(initialPersons)
        })
    }, [])

    const successAnnouncement = (message) => {
        setAnnouncement({ type: 'success', message: message })
        setTimeout(() => {
            setAnnouncement(null)
        }, 5000)
    }

    const errorAnnouncement = (message) => {
        setAnnouncement({ type: 'error', message: message })
        setTimeout(() => {
            setAnnouncement(null)
        }, 5000)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const person = persons.find(
            (person) => person.name.toLowerCase() === newName.toLowerCase()
        )

        if (person) {
            if (
                !window.confirm(
                    `${person.name} is already added to phonebook, replace the old number with a new one?`
                )
            )
                return
        }

        const personObject = {
            name: newName,
            number: newNumber,
        }

        if (person) {
            personService
                .update(person.id, personObject)
                .then((returnedPerson) => {
                    setPersons(
                        persons.map((person) =>
                            person.id === returnedPerson.id
                                ? returnedPerson
                                : person
                        )
                    )
                    successAnnouncement(
                        `Updated information of ${personObject.name}`
                    )
                })
                .catch((error) => {
                    if (error.response.data.name === 'ValidationError') {
                        errorAnnouncement(error.response.data.error)
                    } else {
                        errorAnnouncement(
                            `Information of ${personObject.name} has already been removed from server`
                        )
                    }
                })
        } else {
            personService
                .create(personObject)
                .then((returnedPerson) => {
                    setPersons(persons.concat(returnedPerson))
                    successAnnouncement(
                        `Added information of ${personObject.name}`
                    )
                })
                .catch((error) => {
                    if (error.response.data.name === 'ValidationError') {
                        errorAnnouncement(error.response.data.error)
                    }
                })
        }

        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleDelete = (name, id) => {
        if (!window.confirm(`Delete ${name}?`)) return

        personService.remove(id).then(() => {
            personService
                .getAll()
                .then((returnedPersons) => setPersons(returnedPersons))
        })

        successAnnouncement(`Information of ${name} removed from server`)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification announcement={announcement} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>Add new</h2>
            <PersonForm
                handleSubmit={handleSubmit}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <Persons
                handleDelete={handleDelete}
                persons={persons}
                filter={filter}
            />
        </div>
    )
}

export default App
