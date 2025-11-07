import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const CreateElection = () => {
  const { user, createElection } = useAuth();
  const [step, setStep] = useState(1);
  const [electionData, setElectionData] = useState({
    name: "",
    type: "National",
    constituency: "",
    date: "",
    endDate: "",
    description: "",
    id: "",
    status: "upcoming"
  });
  const [candidates, setCandidates] = useState([
    { id: "1", name: "", party: "", description: "" }
  ]);

  const handleElectionDataChange = (field, value) => {
    setElectionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCandidateChange = (index, field, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index][field] = value;
    setCandidates(updatedCandidates);
  };

  const addCandidate = () => {
    setCandidates(prev => [
      ...prev,
      { id: (prev.length + 1).toString(), name: "", party: "", description: "" }
    ]);
  };

  const removeCandidate = (index) => {
    if (candidates.length > 1) {
      setCandidates(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!electionData.id.trim()) {
      alert("Please enter an Election ID");
      return;
    }

    if (candidates.some(c => !c.name.trim() || !c.party.trim())) {
      alert("Please fill all candidate fields");
      return;
    }

    const finalElectionData = {
      ...electionData,
      candidates: candidates.filter(c => c.name.trim() && c.party.trim())
    };

    const newElection = createElection(finalElectionData);
    alert(`Election "${newElection.name}" created successfully!`);
    
    // Reset form
    setElectionData({
      name: "",
      type: "National",
      constituency: "",
      date: "",
      endDate: "",
      description: "",
      id: "",
      status: "upcoming"
    });
    setCandidates([{ id: "1", name: "", party: "", description: "" }]);
    setStep(1);
  };

  const nextStep = () => {
    if (step === 1 && (!electionData.name || !electionData.date)) {
      alert("Please fill all required fields");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="create-election">
      <div className="card">
        <h2>Create New Election</h2>
        <p>Create a new voting election with candidates and details</p>

        <div className="creation-steps">
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>
          
          <div className="step-labels">
            <span>Election Details</span>
            <span>Candidates</span>
            <span>Review & Create</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="step-content">
              <h3>Election Information</h3>
              
              <div className="form-group">
                <label className="form-label">Election Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={electionData.name}
                  onChange={(e) => handleElectionDataChange('name', e.target.value)}
                  required
                  placeholder="e.g., Lok Sabha General Elections 2024"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Election ID *</label>
                <input
                  type="text"
                  className="form-input"
                  value={electionData.id}
                  onChange={(e) => handleElectionDataChange('id', e.target.value)}
                  required
                  placeholder="e.g., ls-2024 (no spaces, lowercase)"
                />
                <small>This will be used in the voting URL</small>
              </div>

              <div className="form-group">
                <label className="form-label">Election Type *</label>
                <select
                  className="form-input"
                  value={electionData.type}
                  onChange={(e) => handleElectionDataChange('type', e.target.value)}
                  required
                >
                  <option value="National">National Election</option>
                  <option value="State">State Election</option>
                  <option value="Local">Local Election</option>
                  <option value="Campus">Campus Election</option>
                  <option value="Corporate">Corporate Election</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Constituency/Region *</label>
                <input
                  type="text"
                  className="form-input"
                  value={electionData.constituency}
                  onChange={(e) => handleElectionDataChange('constituency', e.target.value)}
                  required
                  placeholder="e.g., National Capital Region"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Date *</label>
                  <input
                    type="date"
                    className="form-input"
                    value={electionData.date}
                    onChange={(e) => handleElectionDataChange('date', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date *</label>
                  <input
                    type="date"
                    className="form-input"
                    value={electionData.endDate}
                    onChange={(e) => handleElectionDataChange('endDate', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows="3"
                  value={electionData.description}
                  onChange={(e) => handleElectionDataChange('description', e.target.value)}
                  placeholder="Describe the election purpose and details..."
                />
              </div>

              <div className="button-group">
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Next: Add Candidates
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>Add Candidates</h3>
              <p>Enter the candidates who are contesting in this election</p>

              {candidates.map((candidate, index) => (
                <div key={index} className="candidate-form-card">
                  <div className="candidate-header">
                    <h4>Candidate {index + 1}</h4>
                    {candidates.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-small btn-secondary"
                        onClick={() => removeCandidate(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Candidate Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={candidate.name}
                        onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
                        required
                        placeholder="Full name of candidate"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Party/Affiliation *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={candidate.party}
                        onChange={(e) => handleCandidateChange(index, 'party', e.target.value)}
                        required
                        placeholder="Political party or affiliation"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-input"
                      value={candidate.description}
                      onChange={(e) => handleCandidateChange(index, 'description', e.target.value)}
                      placeholder="Brief description about the candidate"
                    />
                  </div>
                </div>
              ))}

              <div className="button-group">
                <button type="button" className="btn btn-secondary" onClick={addCandidate}>
                  + Add Another Candidate
                </button>
              </div>

              <div className="button-group">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  Back
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Next: Review & Create
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h3>Review Election Details</h3>
              
              <div className="review-section">
                <h4>Election Information</h4>
                <div className="review-grid">
                  <div className="review-item">
                    <strong>Name:</strong> {electionData.name}
                  </div>
                  <div className="review-item">
                    <strong>ID:</strong> {electionData.id}
                  </div>
                  <div className="review-item">
                    <strong>Type:</strong> {electionData.type}
                  </div>
                  <div className="review-item">
                    <strong>Constituency:</strong> {electionData.constituency}
                  </div>
                  <div className="review-item">
                    <strong>Dates:</strong> {electionData.date} to {electionData.endDate}
                  </div>
                  <div className="review-item">
                    <strong>Description:</strong> {electionData.description}
                  </div>
                </div>
              </div>

              <div className="review-section">
                <h4>Candidates ({candidates.length})</h4>
                <div className="candidates-review">
                  {candidates.map((candidate, index) => (
                    <div key={index} className="candidate-review-item">
                      <strong>{candidate.name}</strong> ({candidate.party})
                      {candidate.description && <div>{candidate.description}</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="button-group">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  Back
                </button>
                <button type="submit" className="btn btn-success">
                  🗳️ Create Election
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateElection;
