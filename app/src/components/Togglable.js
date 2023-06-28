import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

export const Toggleable = forwardRef(({ children, buttonText = 'Show' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : 'block' }
  const showWhenVisible = { display: visible ? 'block' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>
          {buttonText}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>

    </div>
  )
})
Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonText: PropTypes.string
}
