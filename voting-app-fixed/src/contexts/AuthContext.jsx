import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idVerified, setIdVerified] = useState(false);
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedIdVerified = localStorage.getItem("idVerified");
    const savedElections = localStorage.getItem("elections");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedIdVerified) {
      setIdVerified(JSON.parse(savedIdVerified));
    }
    if (savedElections) {
      setElections(JSON.parse(savedElections));
    } else {
      // Initialize with sample elections
      const sampleElections = [
        {
          id: "ls-2024",
          name: "Lok Sabha General Elections 2024",
          type: "National",
          constituency: "National Capital Region",
          date: "2024-04-19",
          endDate: "2024-04-19",
          status: "active",
          candidates: [
            { id: "1", name: "Narendra Modi", party: "BJP", description: "Prime Minister of India" },
            { id: "2", name: "Rahul Gandhi", party: "Congress", description: "MP from Wayanad" },
            { id: "3", name: "Mamata Banerjee", party: "TMC", description: "Chief Minister of WB" }
          ],
          description: "General elections for the 18th Lok Sabha",
          createdBy: "admin",
          createdAt: "2024-01-01"
        },
        {
          id: "delhi-assembly",
          name: "Delhi Legislative Assembly Elections",
          type: "State",
          constituency: "Delhi State",
          date: "2024-02-08",
          endDate: "2024-02-08",
          status: "upcoming",
          candidates: [
            { id: "1", name: "Arvind Kejriwal", party: "AAP", description: "Chief Minister of Delhi" },
            { id: "2", name: "Vijender Gupta", party: "BJP", description: "Opposition Leader" }
          ],
          description: "Elections for the Delhi Legislative Assembly",
          createdBy: "organizer",
          createdAt: "2024-01-15"
        },
        {
          id: "du-elections",
          name: "Delhi University Student Union Elections",
          type: "Campus",
          constituency: "Delhi University",
          date: "2024-03-01",
          endDate: "2024-03-01",
          status: "active",
          candidates: [
            { id: "1", name: "Akshay Lakra", party: "NSUI", description: "Presidential Candidate" },
            { id: "2", name: "Tushar Dedha", party: "ABVP", description: "Presidential Candidate" },
            { id: "3", name: "Shubham Kaushik", party: "Independent", description: "Presidential Candidate" }
          ],
          description: "Annual student union elections for Delhi University",
          createdBy: "organizer",
          createdAt: "2024-01-20"
        }
      ];
      setElections(sampleElections);
      localStorage.setItem("elections", JSON.stringify(sampleElections));
    }
  }, []);

  const requestOTP = async (email) => {
    console.log("OTP requested for:", email);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const verifyID = async (aadhaarNumber, voterId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const verified = aadhaarNumber.length === 12 && voterId.length >= 8;
        if (verified) {
          setIdVerified(true);
          localStorage.setItem("idVerified", "true");
        }
        resolve(verified);
      }, 2000);
    });
  };

  const login = async (email, otp) => {
    let role = "voter";
    let name = "Indian Voter";
    
    if (email.includes("organizer")) {
      role = "organizer";
      name = "Election Organizer";
    } else if (email.includes("admin")) {
      role = "admin"; 
      name = "Election Commission Admin";
    }

    const mockUser = {
      id: "1",
      email,
      role: role,
      name: name,
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIdVerified(false);
    localStorage.removeItem("user");
    localStorage.removeItem("idVerified");
  };

  const createElection = (electionData) => {
    const newElection = {
      ...electionData,
      id: electionData.id.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user?.email || 'system'
    };
    
    const updatedElections = [...elections, newElection];
    setElections(updatedElections);
    localStorage.setItem("elections", JSON.stringify(updatedElections));
    return newElection;
  };

  const getElectionById = (electionId) => {
    return elections.find(election => election.id === electionId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        requestOTP,
        verifyID,
        idVerified,
        isAuthenticated: !!user,
        elections,
        createElection,
        getElectionById
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
