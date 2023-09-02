import React, { useState, useRef } from 'react'
import styles from './Account.module.scss'
import Close from '../components/svgs/Close'
import CheckBox from '../components/CheckBox/CheckBox'
// import Bangle from '../components/TextEditor/Bangle'
// import Editor from '../components/TextEditor/Editor'

const Account = () => {
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
    <div className='relative h-[calc(100vh-50px)] flex justify-center '>
      <div className='flex flex-col mt-8'>
        <h1 className='text-24 font-bold text-task mb-5 transition-all duration-200 ease-in-out'>
          Login
        </h1>
        <div className='relative flex mb-5'>
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
        <div className='relative flex mb-5'>
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
        <div className='flex flex-row mb-3 justify-center'>
          <h3 className='pt-[3px] text-task mx-1 transition-all duration-200 ease-in-out'>
            Keep me logged in
          </h3>
          <div>
            <CheckBox />
          </div>
        </div>
        <div className='flex flex-row justify-center'>
          <button
            type={'submit'}
            className='flex p-1 rounded-[5px] text-gray text-14 font-bold bg-gray items-center hover:bg-grayHover hover:text-grayHover my-1 h-fit px-2 transition-all duration-200 ease-in-out'>
            <p className='mx-1'>Login</p>
          </button>
          <h3 className='pt-[5px] text-task mx-4 transition-all duration-200 ease-in-out'>
            or
          </h3>
          <button
            type={'submit'}
            className='flex p-1 rounded-[5px] text-gray text-14 font-bold bg-gray items-center hover:bg-grayHover hover:text-grayHover my-1 h-fit px-2 transition-all duration-200 ease-in-out'>
            <p className='mx-1'>Login with Google</p>
          </button>
        </div>
        <div>
          {/* <Bangle /> */}
          {/* <Editor /> */}
        </div>
      </div>
    </div>
  )
}

export default Account
