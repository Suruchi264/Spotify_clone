import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate authentication
      const mockUser = {
        id: '1',
        email: e.target.email.value,
        name: 'Test User',
        token: 'mock-jwt-token'
      };
      
      onLogin(mockUser);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page">
      <h1>Login to Spotify Clone</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage; 