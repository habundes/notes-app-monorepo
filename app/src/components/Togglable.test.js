import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Toggleable } from './Togglable'

describe('<Toggleable /> ', () => {
  const buttonText = 'show'
  beforeEach(() => {
    render(
      <Toggleable buttonText={buttonText}>
        <div className='testDiv'>
          testDivContent
        </div>
      </Toggleable>
    )
  })

  test('renders its children', () => {
    expect(screen.getByText('testDivContent')).toBeInTheDocument()
  })

  test('after clicking its children must be shown', () => {
    const el = screen.getByText('testDivContent')
    expect(el.parentNode).toHaveStyle('display: none')

    const button = screen.getByText(buttonText)
    fireEvent.click(button)

    expect(el.parentNode).toHaveStyle('display: block')
  })

  test('toggled content can be closed', () => {
    const button = screen.getByText(buttonText)
    fireEvent.click(button)

    const el = screen.getByText('testDivContent')
    expect(el.parentNode).toHaveStyle('display: block')

    const buttonCancel = screen.getByText('Cancel')
    fireEvent.click(buttonCancel)
    expect(el.parentNode).toHaveStyle('display: none')
  })
})
