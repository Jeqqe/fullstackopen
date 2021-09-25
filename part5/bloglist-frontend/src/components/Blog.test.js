import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog /> rendering', () => {
    const blog = {
        title: 'Test title 1',
        author: 'Some author',
        url: 'www.test.com',
        likes: 100,
        user: {
            id: 123456,
        },
    }

    const user = {
        id: 123456,
    }

    test('at start renders title and author', () => {
        const component = render(<Blog blog={blog} user={user} />)

        expect(component.container).toHaveTextContent(
            'Test title 1' && 'Some author'
        )
    })

    test('at start url and likes are hidden', () => {
        const component = render(<Blog blog={blog} user={user} />)

        expect(component.container).not.toHaveTextContent('www.test.com' && 100)
    })

    test('clicking the view button renders url and likes', () => {
        const component = render(<Blog blog={blog} user={user} />)

        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent('www.test.com' && 100)
    })

    test('clicking the like button twice causes event to be called twice', () => {
        const mockHandler = jest.fn()
        const component = render(
            <Blog blog={blog} user={user} handleAddLikeToBlog={mockHandler} />
        )

        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
