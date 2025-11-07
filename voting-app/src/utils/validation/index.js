export const validation = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  phone: (phone) => {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  },

  otp: (otp) => {
    return /^\d{6}$/.test(otp)
  },

  electionData: (data) => {
    const errors = []
    
    if (!data.title || data.title.length < 3) {
      errors.push('Title must be at least 3 characters long')
    }
    
    if (!data.startTime || !data.endTime) {
      errors.push('Start and end times are required')
    }
    
    if (data.startTime && data.endTime && new Date(data.startTime) >= new Date(data.endTime)) {
      errors.push('End time must be after start time')
    }
    
    return errors
  }
}

export default validation
