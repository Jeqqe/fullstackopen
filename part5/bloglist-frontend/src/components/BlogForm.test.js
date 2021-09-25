import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm /> rendering', () => {
    test('form receives the right details when a new blog is created', () => {
        const createBlog = jest.fn()
        const component = render(<BlogForm handleCreateNewBlog={createBlog} />)

        const button = component.getByText('create new blog')
        fireEvent.click(button)

        const titleInput = component.container.querySelector('#blogTitle')
        const authorInput = component.container.querySelector('#blogAuthor')
        const urlInput = component.container.querySelector('#blogUrl')

        const form = component.container.querySelector('form')

        fireEvent.change(titleInput, {
            target: { value: 'Test Title' },
        })
        fireEvent.change(authorInput, {
            target: { value: 'Test Author' },
        })
        fireEvent.change(urlInput, {
            target: { value: 'Test Url' },
        })
        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0]).toContain(
            'Test Title',
            'Test Author',
            'Test Url'
        )
    })
})
