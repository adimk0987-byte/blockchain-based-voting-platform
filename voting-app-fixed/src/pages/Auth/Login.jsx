import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [voterId, setVoterId] = useState("");
  const [step, setStep] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  
  const { requestOTP, login, verifyID, idVerified } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await requestOTP(email);
      setStep("id-verification");
    } catch (error) {
      alert("Error sending OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleIDVerification = async (e) => {
    e.preventDefault();
    if (aadhaarNumber.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    if (voterId.length < 8) {
      alert("Please enter a valid Voter ID number");
      return;
    }

    setIsLoading(true);
    try {
      const verified = await verifyID(aadhaarNumber, voterId);
      if (verified) {
        setStep("otp");
      } else {
        alert("ID verification failed. Please check your Aadhaar and Voter ID numbers.");
      }
    } catch (error) {
      alert("ID verification error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, otp);
      navigate("/");
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2> Secure Voting Login</h2>
        <p>Election Commission of India - Verified Voting System</p>
        
        {step === "email" ? (
          <form onSubmit={handleEmailSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your registered email"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Processing..." : "Next: ID Verification"}
            </button>
          </form>
        ) : step === "id-verification" ? (
          <form onSubmit={handleIDVerification} className="login-form">
            <div className="form-group">
              <label className="form-label">Aadhaar Number</label>
              <input
                type="text"
                className="form-input"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                required
                placeholder="Enter 12-digit Aadhaar number"
                maxLength={12}
                pattern="[0-9]{12}"
              />
              <small>12-digit Aadhaar number (numbers only)</small>
            </div>
            
            <div className="form-group">
              <label className="form-label">Voter ID Number</label>
              <input
                type="text"
                className="form-input"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value.toUpperCase())}
                required
                placeholder="Enter Voter ID (EPIC number)"
                maxLength={10}
              />
              <small>Your Voter ID card number (EPIC)</small>
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Verifying IDs..." : "Verify Identity"}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setStep("email")}
              >
                Back
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="login-form">
            <div className="verification-success">
              <div className="success-icon"></div>
              <p>Identity Verified Successfully!</p>
            </div>
            
            <div className="form-group">
              <label className="form-label">Verification Code</label>
              <input
                type="text"
                className="form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                pattern="[0-9]{6}"
              />
              <small>We sent a 6-digit code to your email and mobile</small>
            </div>
            <div className="button-group">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Complete Login"}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setStep("id-verification")}
              >
                Back
              </button>
            </div>
          </form>
        )}
        
        <div className="security-notice">
          <h4> Security Information</h4>
          <ul>
            <li>Your Aadhaar and Voter ID are verified with UIDAI and Election Commission</li>
            <li>All data is encrypted and securely stored</li>
            <li>Your vote remains completely anonymous</li>
            <li>One vote per verified citizen</li>
          </ul>
        </div>

        <div className="demo-info">
          <h4>Demo Instructions:</h4>
          <ul>
            <li>For Aadhaar: Enter any 12-digit number</li>
            <li>For Voter ID: Enter any 8-10 character ID</li>
            <li>OTP can be any 6 digits</li>
            <li>Try: organizer@test.com (Organizer role)</li>
            <li>Try: admin@test.com (Admin role)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
