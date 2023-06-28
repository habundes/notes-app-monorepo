import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Note } from './Note'

describe('<Note />', () => {
  beforeEach(() => {

  })

  test('should render Note component rendered', () => {
    const note = {
      content: 'This is a test',
      important: true
    }

    // const view  = render(<Note note={note} />)
    render(<Note note={note} />)
    // expect(view.container).toHaveTextContent(note.content)
    screen.getByText(note.content)
    screen.getByText('make not important')
    // console.log(view);
  })

  test('clicking the button calls event handler once', () => {
    const note = {
      content: 'This is a test',
      important: true
    }
    const mockHandler = jest.fn()

    render(<Note note={note} onToggle={mockHandler} />)

    const button = screen.getByText('make not important')
    fireEvent.click(button)

    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
