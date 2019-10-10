import React from 'react'
import GoogleLogin from 'react-google-login'

export default function Login() {
  let token = localStorage.getItem('token')

  if (token !== '') {
    window.location = '/agenda'
  }

  function responseGoogle(res) {
    localStorage.setItem('token', res.tokenId)
    localStorage.setItem('user', res.profileObj.name)
    localStorage.setItem('email', res.profileObj.email)

    window.location = '/agenda'
  }

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </>
  )
}
