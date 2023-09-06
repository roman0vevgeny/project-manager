import React, { useState, useRef } from 'react'
import styles from './Account.module.scss'
import Close from '../components/svgs/Close'
import CheckBox from '../components/CheckBox/CheckBox'
import Logo from '../components/svgs/Logo'
import Google from '../components/svgs/Google'
import { Link } from 'react-router-dom'
import BgImageLogin from '../components/svgs/BgImageLogin'
// import Bangle from '../components/TextEditor/Bangle'
// import Editor from '../components/TextEditor/Editor'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleClearEmail = () => {
    setEmail('')
    emailRef.current.focus()
  }

  const handleClearPassword = () => {
    setPassword('')
    passwordRef.current.focus()
  }

  return (
    <div className='relative h-[100vh] flex justify-center items-center'>
      <div className='flex flex-row justify-start w-[600px] h-fit mb-[100px]'>
        <div>
          <div className='mb-16'>
            <Logo />
          </div>
          <div className='w-[350px]'>
            <h1 className='text-30 text-start font-bold text-task mb-5 transition-all duration-200 ease-in-out'>
              Login
            </h1>
            <div className='relative flex mb-5 w-[350px]'>
              <input
                className={styles.input}
                type='text'
                placeholder='Your email'
                value={email}
                onChange={handleEmailChange}
                ref={emailRef}
              />
              {email ? (
                <button className={styles.close} onClick={handleClearEmail}>
                  <Close />
                </button>
              ) : null}
            </div>
            <div className='relative flex mb-5 w-full'>
              <input
                className={styles.input}
                type='text'
                placeholder='Your password'
                value={password}
                onChange={handlePasswordChange}
                ref={passwordRef}
              />
              {password ? (
                <button className={styles.close} onClick={handleClearPassword}>
                  <Close />
                </button>
              ) : null}
            </div>
            <div className='flex flex-row mb-3 w-full'>
              <h3 className='pt-[3px] text-task mx-1 transition-all duration-200 ease-in-out'>
                Keep me logged in
              </h3>
              <div>
                <CheckBox />
              </div>
            </div>
            <div className='flex flex-col justify-center w-full'>
              <button
                type={'submit'}
                className='flex p-2 rounded-[5px] text-gray text-16 font-bold bg-gray items-center justify-center hover:bg-grayHover hover:text-grayHover mt-1 mb-5 h-fit px-2 transition-all duration-200 ease-in-out w-full'>
                <p className='mx-1'>Login</p>
              </button>
              <button
                type={'submit'}
                className='flex p-2 rounded-[5px] text-gray text-16 font-bold bg-gray items-center justify-center hover:bg-grayHover hover:text-grayHover my-1 h-fit px-2 transition-all duration-200 ease-in-out w-full'>
                <p className='mx-1 mr-2'>Login with</p>
                <div>
                  <Google />
                </div>
              </button>
              <div className='flex mt-5 items-center'>
                <h3 className='text-task mx-1 transition-all duration-200 ease-in-out '>
                  Don`t have an account?
                </h3>
                <Link to='/signup' className='text-blueTag'>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[160px] ml-12 text-imageColor'>
          <BgImageLogin />
        </div>
      </div>
    </div>
  )
}

export default SignIn
