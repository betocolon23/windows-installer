export function login(username, password) {
  const data = {
    username,
    password
  }
  return postJSON('loggedout/user_auth', data)
  .then(checkErrInRes)
  .then(res=>{
      const { exp } = jwt_decode(res.jwt);
      const expiry = exp * 1000;
      localStorage.setItem('session_expiry', expiry)
      return dispatch(setCurrentUser())
  })
  .catch(err => {
      if (err.response.status === 401) {
      return dispatch(setSnackBarMessage('Invalid username or password', 'error'))
      }
      return dispatch(setSnackBarMessage('There was a problem with the request', 'error'))
  })
}

export function setCurrentUser() {
  return function(dispatch) {
    return getJSON('user_info')
      .then(checkErrInRes)
      .then(res => {
        return dispatch({
          type: FULL_UPDATE,
          payload: { currentUser: res.info, isAuthed: res.info.username !== '' }
        })
      })
      .catch(err => {
        if (err.response) {
          const res = { info: { username: '', email: '', is_superuser: false, jwt: '' } }
          return dispatch({
            type: FULL_UPDATE,
            payload: { currentUser: res.info, isAuthed: res.info.username !== '' }
          })
        }
      })
  }
}

export function logout() {
  return function(dispatch) {
    return getJSON('logout')
      .then(checkErrInRes)
      .then(res => {
        return dispatch({
          type: LOGOUT_USER,
        })
      })
      .catch(err => {
        return dispatch(setSnackBarMessage('There was a problem logging out', 'error'))
      })
  }
}

export function setOrganization(payload) {
  return function(dispatch, getState) {
    let state = getState();
    return postJSON('org_auth', {handle: payload.handle})
    .then(res => {
      Promise.all([
        dispatch({
          type: FULL_UPDATE,
          payload: {
            selectedOrg: payload,
            currentUser: Object.assign({}, state.currentUser, {jwt: res.jwt})
          }
        }),
        dispatch(updatePaymentsStatus()),
      ])
    })
  }
}