import {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
    showSubmitError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          placeholder="password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="username"
        />
      </>
    )
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    // if (username === '') {
    //   this.setState({isUsernameEmpty: true})
    //   return
    // }
    // this.setState({isUsernameEmpty: false})

    // if (password === '') {
    //   this.setState({isPasswordEmpty: true})
    //   return
    // }
    // this.setState({isPasswordEmpty: false})

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response.ok)
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      console.log(data)
      this.setState({errMsg: data.error_msg, showSubmitError: true})
    }
  }

  render() {
    const {showSubmitError, errMsg} = this.state
    return (
      <div className="login-form-container">
        {/* <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        /> */}
        <img
          src="https://images.hdqwalls.com/download/anime-girl-alone-at-mountain-cliff-4k-5j-1280x1024.jpg"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.onSubmitForm}>
          {/* <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          /> */}
          <h1>Welcome Back</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Sign in
          </button>
          {showSubmitError && <p className="errorMsg">{errMsg}</p>}
          <div className="social-media-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" >
              <FontAwesomeIcon className="instagram-icon" icon={faInstagram} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" >
              <FontAwesomeIcon className="facebook-icon" icon={faFacebookF} />
            </a>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" >
              <FontAwesomeIcon className="google-icon" icon={faGoogle} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" >
              <FontAwesomeIcon className="twitter-icon" icon={faTwitter} />
            </a>
          </div>

          
        </form>
      </div>
    )
  }
}

export default LoginForm
