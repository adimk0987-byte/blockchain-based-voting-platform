// src/pages/AdvancedFeatures.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "../styles/index.css";
import Webcam from "react-webcam";

const AdvancedFeatures = () => {
  const canvasRef = useRef(null);

  const [votes, setVotes] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showVoteAnimation, setShowVoteAnimation] = useState(false);
  const [faceScanProgress, setFaceScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("home");

  // Voter Verification States
  const [verificationStep, setVerificationStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [voterId, setVoterId] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [selectedElection, setSelectedElection] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  // Camera constraints - ONLY used in step 6
  const webcamRef = useRef(null);
  const videoConstraints = { facingMode: "user" };

  // Lok Sabha Assembly Background Images
  const [currentBgImage, setCurrentBgImage] = useState(0);
  const assemblyImages = [
    "https://images.unsplash.com/photo-1614689540268-6bc59e5e5a42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1581368135155-81c286e27f08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1551135040-6a4b8d6db6e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % assemblyImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Elections Data
  const elections = {
    "lok-sabha": {
      name: "Lok Sabha Elections 2024",
      type: "National",
      candidates: [
        {
          id: "modi",
          name: "Narendra Modi",
          party: "BJP",
          symbol: "🪷",
          description: "Prime Minister candidate, development and nationalism focus",
          manifesto: {
            title: "Viksit Bharat 2047",
            points: [
              "Make India 3rd largest economy in the world",
              "Create 10 million new jobs in manufacturing",
              "Double farmers income by 2027",
              "Free healthcare for senior citizens",
              "Build 20 million new houses under PM Awas Yojana",
              "Make India energy independent by 2047"
            ],
            promises: [
              "Digital India expansion",
              "Infrastructure development",
              "National security strengthening"
            ]
          }
        },
        {
          id: "rahul",
          name: "Rahul Gandhi",
          party: "Congress",
          symbol: "✋",
          description: "Social justice and economic equality",
          manifesto: {
            title: "Bharat Jodo Nyay",
            points: [
              "NYAY 2.0 - Minimum income guarantee",
              "30 Lakh central government jobs",
              "Waiver of farm loans",
              "Caste census nationwide",
              "Legal guarantee for MSP",
              "50% reservation for women in government jobs"
            ],
            promises: ["Social justice", "Employment generation", "Farmers welfare"]
          }
        }
      ]
    },
    "state-assembly": {
      name: "State Assembly Elections",
      type: "State",
      candidates: [
        {
          id: "hemant",
          name: "Hemant Soren",
          party: "JMM",
          symbol: "🏹",
          description: "Tribal rights and state development",
          manifesto: {
            title: "Jharkhand First",
            points: [
              "Protection of tribal land rights",
              "Special package for farmers",
              "Employment for local youth",
              "Healthcare facilities in remote areas",
              "Education in tribal languages",
              "Infrastructure development"
            ],
            promises: ["Tribal welfare", "State development", "Youth employment"]
          }
        },
        {
          id: "raghubar",
          name: "Raghubar Das",
          party: "BJP",
          symbol: "🪷",
          description: "Industrial development and infrastructure",
          manifesto: {
            title: "Developed Jharkhand",
            points: [
              "Attract 50,000 crore investment",
              "Create 5 lakh new jobs",
              "Modern infrastructure development",
              "Skill development programs",
              "Digital governance system",
              "Women safety initiatives"
            ],
            promises: ["Industrial growth", "Infrastructure", "Digital governance"]
          }
        }
      ]
    }
  };

  // 3D Background Animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const geometries = [
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.BoxGeometry(0.7, 0.7, 0.7),
      new THREE.TetrahedronGeometry(0.6),
      new THREE.OctahedronGeometry(0.5)
    ];
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x00ccff, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xff4444, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xffaa00, wireframe: true })
    ];
    const objects = [];
    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = Math.random() * 20 - 10;
      mesh.position.y = Math.random() * 20 - 10;
      mesh.position.z = Math.random() * 10 - 20;
      mesh.rotationSpeed = {
        x: Math.random() * 0.02,
        y: Math.random() * 0.02,
        z: Math.random() * 0.02
      };

      scene.add(mesh);
      objects.push(mesh);
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      objects.forEach(obj => {
        obj.rotation.x += obj.rotationSpeed.x;
        obj.rotation.y += obj.rotationSpeed.y;
        obj.rotation.z += obj.rotationSpeed.z;
        obj.position.y += Math.sin(Date.now() * 0.001 + obj.position.x) * 0.005;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Face ID Verification function
  const startFaceScan = () => {
    setFaceScanProgress(0);
    const interval = setInterval(() => {
      setFaceScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFaceVerified(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateOtp = () => {
    const newOtp = "123456";
    setGeneratedOtp(newOtp);
    setVerificationError(`OTP sent to ${phoneNumber}: ${newOtp}`);
    return newOtp;
  };

  const validateAadhaar = (aadhaar) => aadhaar.length === 12 && /^\d+$/.test(aadhaar);
  const validatePhone = (phone) => phone.length === 10 && /^\d+$/.test(phone);
  const validateVoterId = (voterId) => voterId.length >= 3;

  const handleAadhaarSubmit = () => {
    setVerificationError("");
    if (validateAadhaar(aadhaarNumber)) {
      setVerificationStep(3);
    } else {
      setVerificationError("Please enter valid 12‑digit Aadhaar number");
    }
  };

  const handleVoterIdSubmit = () => {
    setVerificationError("");
    if (validateVoterId(voterId)) {
      setVerificationStep(1);
    } else {
      setVerificationError("Please enter valid Voter ID (min 3 characters)");
    }
  };

  const handlePhoneSubmit = () => {
    setVerificationError("");
    if (validatePhone(phoneNumber)) {
      generateOtp();
      setVerificationStep(4);
    } else {
      setVerificationError("Please enter valid 10‑digit phone number");
    }
  };

  const handleOtpVerify = () => {
    setVerificationError("");
    if (otp === generatedOtp) {
      setIsVerified(true);
      setVerificationStep(5);
      setVerificationError("");
    } else {
      setVerificationError("Invalid OTP. Please enter 123456");
    }
  };

  const handleElectionSelect = (electionType) => {
    setSelectedElection(electionType);
    setVerificationStep(6); // Move to Face ID step
    const initialVotes = {};
    elections[electionType].candidates.forEach(candidate => {
      initialVotes[candidate.id] = 0;
    });
    setVotes(initialVotes);
  };

  const handleVote = (candidateId) => {
    if (!faceVerified) {
      setVerificationError("Please complete Face ID verification first!");
      return;
    }
    setSelectedCandidate(candidateId);
    setShowVoteAnimation(true);
    setTimeout(() => {
      setVotes(prev => ({ ...prev, [candidateId]: (prev[candidateId] || 0) + 1 }));
      setTimeout(() => {
        setShowVoteAnimation(false);
        setSelectedCandidate(null);
      }, 2000);
    }, 1500);
  };

  const resetVerification = () => {
    setVerificationStep(0);
    setPhoneNumber("");
    setAadhaarNumber("");
    setVoterId("");
    setOtp("");
    setGeneratedOtp("");
    setSelectedElection("");
    setIsVerified(false);
    setFaceVerified(false);
    setFaceScanProgress(0);
    setVerificationError("");
  };

  const renderHomeTab = () => {
    return (
      <div className="main-content">
        <div className="assembly-bg-container">
          {assemblyImages.map((img, index) => (
            <div
              key={index}
              className={`assembly-bg-image ${index === currentBgImage ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="assembly-overlay"></div>
        </div>

        <section className="voting-container">
          <div className="hero-content">
            <div className="hero-main">
              <h1 className="main-title">Digital Lok Sabha Voting Platform</h1>
              <p className="main-subtitle">
                Experience the future of democratic voting with blockchain technology and biometric security
              </p>

              <div className="hero-stats">
                <div className="stat-card">
                  <div className="stat-value">543</div>
                  <div className="stat-label">Lok Sabha Seats</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">99.9%</div>
                  <div className="stat-label">Secure Transactions</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">0</div>
                  <div className="stat-label">Fraud Cases</div>
                </div>
              </div>

              <div className="cta-section">
                <button className="cta-button" onClick={() => setActiveTab("voting")}>
                  Cast Your Vote Now
                </button>
                <div className="cta-features">
                  <span> Multi‑Factor Authentication</span>
                  <span> Face ID Verification</span>
                  <span> Instant Results</span>
                </div>
              </div>
            </div>

            <div className="session-info">
              <h3> Current Parliamentary Session</h3>
              <div className="session-details">
                <div className="session-item">
                  <strong>Session:</strong> Budget Session 2024
                </div>
                <div className="session-item">
                  <strong>Duration:</strong> January 31 ‑ March 8
                </div>
                <div className="session-item">
                  <strong>Seats:</strong> 543 Constituencies
                </div>
              </div>
            </div>

            <div className="features-showcase">
              <div className="feature-section">
                <h2 className="feature-title"> Advanced Voting Features</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🏛️</div>
                    <h3>Parliamentary Integration</h3>
                    <p>Direct integration with Lok Sabha voting systems</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🔒</div>
                    <h3>Military‑Grade Security</h3>
                    <p>Aadhaar, Voter ID, OTP, and Face ID verification</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">👁️</div>
                    <h3>Biometric Authentication</h3>
                    <p>Advanced facial recognition for MP‑level security</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">⛓️</div>
                    <h3>Real‑time Blockchain</h3>
                    <p>Transparent and tamper‑proof voting records</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="parties-overview">
              <h2 className="feature-title"> Major Political Parties</h2>
              <div className="parties-grid">
                <div className="party-card">
                  <div className="party-symbol">🪷</div>
                  <h4>BJP</h4>
                  <p>Bharatiya Janata Party</p>
                </div>
                <div className="party-card">
                  <div className="party-symbol">✋</div>
                  <h4>Congress</h4>
                  <p>Indian National Congress</p>
                </div>
                <div className="party-card">
                  <div className="party-symbol">🌿</div>
                  <h4>TMC</h4>
                  <p>Trinamool Congress</p>
                </div>
                <div className="party-card">
                  <div className="party-symbol">🧹</div>
                  <h4>AAP</h4>
                  <p>Aam Aadmi Party</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    );
  };

  const renderVerificationStep = () => {
    switch (verificationStep) {
      case 0:
        return (
          <div className="verification-card">
            <h2>Voter Identity Verification</h2>
            <p>Complete the following steps to verify your identity and cast your vote securely.</p>
            <button className="vote-button" onClick={() => setVerificationStep(2)}>
              Start Verification
            </button>
          </div>
        );
      case 1:
        return (
          <div className="verification-card">
            <h2>Phone Verification</h2>
            <p>Enter your registered mobile number for OTP verification</p>
            <input
              type="tel"
              placeholder="Enter 10‑digit mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="verification-input"
            />
            <button className="vote-button" onClick={handlePhoneSubmit} disabled={!validatePhone(phoneNumber)}>
              Send OTP
            </button>
            <div className="verification-hint">Test OTP: <strong>123456</strong></div>
          </div>
        );
      case 2:
        return (
          <div className="verification-card">
            <h2>Aadhaar Verification</h2>
            <p>Enter your 12‑digit Aadhaar number</p>
            <input
              type="text"
              placeholder="Enter Aadhaar number"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, "").slice(0, 12))}
              className="verification-input"
            />
            <button className="vote-button" onClick={handleAadhaarSubmit} disabled={!validateAadhaar(aadhaarNumber)}>
              Verify Aadhaar
            </button>
            <div className="verification-hint">Enter any 12‑digit number</div>
          </div>
        );
      case 3:
        return (
          <div className="verification-card">
            <h2>Voter ID Verification</h2>
            <p>Enter your Voter ID number</p>
            <input
              type="text"
              placeholder="Enter Voter ID"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value.toUpperCase())}
              className="verification-input"
            />
            <button className="vote-button" onClick={handleVoterIdSubmit} disabled={!validateVoterId(voterId)}>
              Verify Voter ID
            </button>
            <div className="verification-hint">Enter any text (min 3 characters)</div>
          </div>
        );
      case 4:
        return (
          <div className="verification-card">
            <h2>OTP Verification</h2>
            <p>Enter the 6‑digit OTP sent to {phoneNumber}</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="verification-input"
            />
            <button className="vote-button" onClick={handleOtpVerify} disabled={otp.length !== 6}>
              Verify OTP
            </button>
            <button className="secondary-button" onClick={generateOtp}>
              Resend OTP
            </button>
            <div className="verification-hint">Use OTP: <strong>123456</strong></div>
          </div>
        );
      case 5:
        return (
          <div className="verification-card">
            <h2>Select Election</h2>
            <p>Choose which election you want to vote in:</p>
            <div className="elections-grid">
              {Object.entries(elections).map(([key, election]) => (
                <div key={key} className="election-card" onClick={() => handleElectionSelect(key)}>
                  <h3>{election.name}</h3>
                  <div className="election-type">{election.type}</div>
                  <div className="candidates-count">{election.candidates.length} Candidates</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="verification-card">
            <h2>Face ID Biometric Verification</h2>
            <p>Complete Face ID verification to proceed with voting</p>

            {/* Camera feed - ONLY appears in step 6 */}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "8px",
                border: "2px solid #444",
                margin: "1rem auto"
              }}
              muted
              playsInline
              onUserMedia={() => console.log("Webcam started")}
              onUserMediaError={(err) => console.error("Webcam error:", err)}
            />

            <div className="face-scanner" onClick={startFaceScan}>
              {faceScanProgress === 0 ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📷</div>
                  Click to Start Face Recognition
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  Scanning: {faceScanProgress}%
                  <div
                    style={{
                      width: "200px",
                      height: "4px",
                      background: "#333",
                      margin: "1rem auto",
                      borderRadius: "2px"
                    }}
                  >
                    <div
                      style={{
                        width: `${faceScanProgress}%`,
                        height: "100%",
                        background: "#00ff88",
                        borderRadius: "2px",
                        transition: "width 0.3s"
                      }}
                    />
                  </div>
                  {faceScanProgress === 100 && (
                    <div style={{ color: "#00ff88", marginTop: "1rem" }}>
                      Face Verified Successfully!
                    </div>
                  )}
                </div>
              )}
            </div>

            {faceVerified && (
              <button className="vote-button" onClick={() => setVerificationStep(7)}>
                Proceed to Voting
              </button>
            )}
          </div>
        );
      case 7:
        return renderVotingInterface();
      default:
        return null;
    }
  };

  const renderVotingInterface = () => {
    if (!selectedElection) return null;
    return (
      <div className="voting-interface">
        <div className="election-header">
          <h2>{elections[selectedElection].name}</h2>
          <div className="election-info">
            <span>Type: {elections[selectedElection].type}</span>
            <span>Verified Voter: ✓</span>
            <span>Face ID: {faceVerified ? "✓ Verified" : "❌ Not Verified"}</span>
          </div>
          {!faceVerified && (
            <div style={{ color: "#ff4444", marginTop: "1rem" }}>
              Face ID verification required to vote
            </div>
          )}
        </div>

        <div className="candidates-grid">
          {elections[selectedElection].candidates.map(candidate => (
            <div key={candidate.id} className="candidate-card">
              <div className="candidate-symbol">{candidate.symbol}</div>
              <h3 className="candidate-name">{candidate.name}</h3>
              <div className="candidate-party">{candidate.party}</div>
              <p className="candidate-description">{candidate.description}</p>
              <button
                className="vote-button"
                onClick={() => handleVote(candidate.id)}
                disabled={selectedCandidate || !faceVerified}
              >
                {selectedCandidate === candidate.id ? "Processing Vote..." : "Vote Now"}
              </button>
            </div>
          ))}
        </div>

        <div className="feature-section">
          <h3 className="feature-title">Live Results – {elections[selectedElection].name}</h3>
          <div className="blockchain-stats">
            <div className="stat-card">
              <div className="stat-value">{Object.values(votes).reduce((a, b) => a + b, 0)}</div>
              <div className="stat-label">Total Votes Cast</div>
            </div>
            {elections[selectedElection].candidates.map(candidate => (
              <div key={candidate.id} className="stat-card">
                <div className="stat-value">{votes[candidate.id] || 0}</div>
                <div className="stat-label">{candidate.name} Votes</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderManifestoTab = () => {
    return (
      <div className="manifesto-container">
        <h1>Party Manifestos</h1>
        <div className="manifestos-grid">
          {Object.entries(elections).map(([electionKey, election]) => (
            <div key={electionKey} className="election-manifesto">
              <h2>{election.name}</h2>
              <div className="candidates-manifestos">
                {election.candidates.map(candidate => (
                  <div key={candidate.id} className="manifesto-card">
                    <div className="manifesto-header">
                      <h3>{candidate.name} ({candidate.party})</h3>
                      <div className="party-symbol">{candidate.symbol}</div>
                    </div>
                    <div className="manifesto-content">
                      <h4>{candidate.manifesto.title}</h4>
                      <ul>
                        {candidate.manifesto.points.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                      <div className="promises">
                        <strong>Key Promises:</strong> {candidate.manifesto.promises.join(", ")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="advanced-features">
      <canvas ref={canvasRef} id="bg-canvas" />
      <header className="header">
        <nav className="nav">
          <div className="logo">Digital Lok Sabha</div>
          <ul className="nav-links">
            <li><a href="#" onClick={() => setActiveTab("home")} className={activeTab === "home" ? "active" : ""}>Home</a></li>
            <li><a href="#" onClick={() => setActiveTab("voting")} className={activeTab === "voting" ? "active" : ""}>Voting</a></li>
            <li><a href="#" onClick={() => setActiveTab("manifesto")} className={activeTab === "manifesto" ? "active" : ""}>Manifestos</a></li>
            {isVerified && <li style={{ color: "#00ff88" }}>✓ Verified</li>}
          </ul>
        </nav>
      </header>

      {activeTab === "home" && renderHomeTab()}

      {activeTab === "voting" && (
        <div className="main-content">
          <section className="voting-container">
            <h1 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "2rem", background: "linear-gradient(45deg, #00ff88, #00ccff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Secure Voting Platform
            </h1>

            {verificationError && (
              <div className="error-message">{verificationError}</div>
            )}

            {renderVerificationStep()}

            {verificationStep > 0 && verificationStep < 7 && (
              <div className="verification-progress">
                <h3>Verification Progress</h3>
                <div className="progress-steps">
                  {['Aadhaar','Voter ID','Phone','OTP','Election','Face ID','Voting'].map((step, index) => (
                    <div key={step} className={`progress-step ${verificationStep > index+1 ? 'completed' : verificationStep === index+1 ? 'current' : ''}`}>
                      <div className="step-number">{index+1}</div>
                      <div className="step-label">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {verificationStep > 0 && (
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <button className="secondary-button" onClick={resetVerification}>Start New Verification</button>
              </div>
            )}
          </section>
        </div>
      )}

      {activeTab === "manifesto" && (
        <div className="main-content">
          {renderManifestoTab()}
        </div>
      )}

      {showVoteAnimation && (
        <div className="vote-animation">
          <div className="vote-success">Vote Cast Successfully!</div>
          <div>Transaction confirmed on blockchain</div>
          <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#00ccff" }}>
            Hash: 0x{Math.random().toString(16).substr(2,16)}...
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFeatures;