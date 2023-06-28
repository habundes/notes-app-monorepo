import { Toggleable } from './Togglable'
import PropTypes from 'prop-types'

export function LoginForm ({ username, password, onUserNameChange, onPasswordChanged, onSubmitLogin }) {
  return (
    <Toggleable buttonText='Show Login'>
      <div>
        <form onSubmit={onSubmitLogin}>
          <div>
            <input
              type='text'
              value={username}
              name='userName'
              placeholder='Username'
              onChange={onUserNameChange}
            />
          </div>
          <div>
            <input
              type='password'
              value={password}
              name='password'
              placeholder='Password'
              onChange={onPasswordChanged}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </Toggleable>
  )
}

LoginForm.propTypes = {
  onSubmitLogin: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  onUserNameChange: PropTypes.func,
  onPasswordChanged: PropTypes.func
}
