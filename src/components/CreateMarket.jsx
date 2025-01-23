import { useState } from 'react'
import { ethers } from 'ethers'

const VALIDATION_RULES = {
  question: { minLength: 10, maxLength: 200 },
  options: { min: 2, max: 5 },
  endDate: { minDays: 1, maxDays: 30 }
}

export function CreateMarket() {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', ''],
    endDate: '',
    initialStake: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (formData.question.length < VALIDATION_RULES.question.minLength) {
      newErrors.question = 'Question must be at least 10 characters'
    }
    
    if (formData.options.some(opt => opt.trim() === '')) {
      newErrors.options = 'All options must be filled'
    }

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + VALIDATION_RULES.endDate.maxDays)
    
    if (new Date(formData.endDate) <= minDate) {
      newErrors.endDate = 'End date must be in the future'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      // Contract interaction will be added here
      console.log('Creating market:', formData)
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-market-container">
      <h2>Create New Prediction Market</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question</label>
          <input
            type="text"
            value={formData.question}
            onChange={(e) => setFormData({...formData, question: e.target.value})}
            placeholder="What do you want to predict?"
            className={errors.question ? 'error' : ''}
          />
          {errors.question && <span className="error-text">{errors.question}</span>}
        </div>

        <div className="form-group">
          <label>Options</label>
          <div className="options-container">
            {formData.options.map((option, index) => (
              <div key={index} className="option-input">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...formData.options]
                    newOptions[index] = e.target.value
                    setFormData({...formData, options: newOptions})
                  }}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="add-option-btn"
              onClick={() => setFormData({
                ...formData,
                options: [...formData.options, '']
              })}
              disabled={formData.options.length >= VALIDATION_RULES.options.max}
            >
              Add Option
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="datetime-local"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            min={new Date().toISOString().slice(0, 16)}
            className={errors.endDate ? 'error' : ''}
          />
          {errors.endDate && <span className="error-text">{errors.endDate}</span>}
        </div>

        <div className="form-group">
          <label>Initial Stake (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={formData.initialStake}
            onChange={(e) => setFormData({...formData, initialStake: e.target.value})}
            min="0.01"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Market'}
        </button>
        
        {errors.submit && <div className="error-message">{errors.submit}</div>}
      </form>
    </div>
  )
}