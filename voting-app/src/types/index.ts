export interface User {
  id: string
  email: string
  phone?: string
  role: 'voter' | 'organizer' | 'admin' | 'observer'
  name: string
}

export interface Election {
  id: string
  title: string
  description: string
  type: 'single-choice' | 'multi-choice' | 'ranked-choice' | 'approval'
  startTime: Date
  endTime: Date
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  rules: ElectionRules
  candidates: Candidate[]
  voters: Voter[]
}

export interface ElectionRules {
  anonymous: boolean
  allowRevoting: boolean
  quorum?: number
  tieBreaker: 'random' | 'admin' | 'runoff'
}

export interface Candidate {
  id: string
  name: string
  description?: string
  order: number
}

export interface Voter {
  id: string
  email: string
  phone?: string
  hasVoted: boolean
  invitedAt: Date
}

export interface Ballot {
  id: string
  electionId: string
  voterId: string
  choices: Choice[]
  submittedAt: Date
  encryptedData: string
  receiptHash: string
}

export interface Choice {
  candidateId: string
  rank?: number
  weight?: number
}

export interface AuditLog {
  id: string
  electionId: string
  action: string
  actor: string
  timestamp: Date
  details: any
}
