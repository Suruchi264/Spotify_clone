import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    displayName: '',
    birthDate: '',
    gender: '',
    marketingConsent: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.displayName) newErrors.displayName = 'Display name is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Implement your registration logic here
      console.log('Registration attempt with:', formData);
      navigate('/');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src="/spotify-black.png" alt="Spotify" className="auth-logo" />
      </div>

      <div className="auth-content">
        <h1>Sign up for free to start listening</h1>

        <div className="social-buttons">
          <button className="social-button google">
            <i className="fab fa-google"></i>
            Sign up with Google
          </button>
          <button className="social-button facebook">
            <i className="fab fa-facebook"></i>
            Sign up with Facebook
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">What's your email?</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmEmail">Confirm your email</label>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleChange}
              placeholder="Enter your email again"
              className={errors.confirmEmail ? 'error' : ''}
            />
            {errors.confirmEmail && (
              <span className="error-message">{errors.confirmEmail}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Create a password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="displayName">What should we call you?</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Enter a profile name"
              className={errors.displayName ? 'error' : ''}
            />
            {errors.displayName && (
              <span className="error-message">{errors.displayName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">What's your date of birth?</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={errors.birthDate ? 'error' : ''}
            />
            {errors.birthDate && (
              <span className="error-message">{errors.birthDate}</span>
            )}
          </div>

          <div className="form-group">
            <label>What's your gender?</label>
            <div className="gender-options">
              {['male', 'female', 'non-binary', 'other', 'prefer-not-to-say'].map(gender => (
                <label key={gender} className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                  />
                  {gender.charAt(0).toUpperCase() + gender.slice(1).replace('-', ' ')}
                </label>
              ))}
            </div>
            {errors.gender && (
              <span className="error-message">{errors.gender}</span>
            )}
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="marketingConsent"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleChange}
            />
            <label htmlFor="marketingConsent">
              I would like to receive marketing messages from Spotify
            </label>
          </div>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <button type="submit" className="submit-button">
            Sign up
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="signup-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage; 