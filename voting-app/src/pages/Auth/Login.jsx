import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email')
  const [isLoading, setIsLoading] = useState(false)
  
  const { requestOTP, login } = useAuth()
  const navigate = useNavigate()

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await requestOTP(email)
      setStep('otp')
    } catch (error) {
      console.error('Error requesting OTP:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, otp)
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="card" style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <h2>Secure Login</h2>
        
        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label className="form-label">Enter Verification Code</label>
              <input
                type="text"
                className="form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
              <small>Check your email for the verification code</small>
            </div>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => setStep('email')}
              style={{ marginLeft: '0.5rem' }}
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
