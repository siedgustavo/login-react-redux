import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const initialState = {
  email: undefined,
  password: undefined,
  logged: false,
  message: undefined,
  isLogging: false,
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
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        isLogging: false,
        message: action.payload.message,
        logged: action.payload.success,  
      }
    }
    case 'LOGIN_ERROR': {
      return {
        ...state,
        isLogging: false,
        message: action.payload.message,
        logged: action.payload.success,  
      }
    }
    case 'LOGIN_PENDING':
      return {
        ...state,
        isLogging: true,
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

export const handleLogin = (email, password) => {
  
  return (dispatch) => {

    dispatch({
      type: "LOGIN_PENDING"
    })

    return fetch("https://gsied-trabajo-mcga-server.herokuapp.com/login", {
      baseURL: "gsied-trabajo-mcga-server.herokuapp.com",
      timeout: 25000,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(a => a.json())
    .then((data) => {
      if(!data.success){
        return dispatch({
          type: "LOGIN_ERROR",
          payload: data,
        })
      }
      return dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      })
      console.log("Termino la promesa")
    }).catch((error) => {
      return dispatch({
        type: "LOGIN_ERROR",
        payload: error,
      })
      console.log("Termino la promesa con error")
    })

  }

}

const middleware = [thunk]

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middleware),
));

export default store