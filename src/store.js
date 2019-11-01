import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
  email: undefined,
  password: undefined,
  logged: false,
  message: undefined,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_CHANGE_EMAIL':
      return {
        ...state,
        email: action.payload,
        logged: false,
        message: undefined
      }
    case 'ON_CHANGE_PASSWORD':
      return {
        ...state,
        password: action.payload,
        logged: false,
        message: undefined
      }
    case 'HANDLE_LOGIN': {
      let logged = true
      let message = 'Login realizado con éxito'
      if (!state.email || !state.password) {
        message = 'Debe ingresar todos los datos.'
        logged = false
      }
      return {
        ...state,
        message,
        logged,
      }
    }
    default:
      return state
  }
}

export const onChangeEmail = (event) => {
  const text = event.target.value
  return {
    type: 'ON_CHANGE_EMAIL',
    payload: text
  }
}

export const onChangePassword = (event) => {
  const text = event.target.value
  return {
    type: 'ON_CHANGE_PASSWORD',
    payload: text
  }
}

export const handleLogin = () => ({
  type: 'HANDLE_LOGIN',
})

const middleware = []

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middleware),
));

export default store