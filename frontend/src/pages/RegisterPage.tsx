import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

console.log('RegisterPage is rendering');

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted'); // Add this
    
    if (!validateForm()) {
      console.log('Form validation failed', errors); // Add this
      return;
    }
  
    console.log('Attempting registration with:', { username, email, password }); // Add this
    
    setLoading(true);
    setErrors({});
    
    try {
      console.log('Calling register function...'); // Add this
      const result = await register(username, email, password);
      console.log('Register result:', result); // Add this
      
      if (result.success) {
        navigate('/');
      } else {
        setErrors({ form: result.error || 'Registration failed' });
      }
    } catch (err) {
      console.error('Registration error:', err); // This should already exist
      setErrors({
        form: err instanceof Error ? err.message : 'Registration failed'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] px-4">
        <div className="w-full max-w-md p-8 bg-slate-900 rounded-lg border border-slate-800 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="bg-secondary-900/40 p-3 rounded-full">
              <UserPlus className="h-8 w-8 text-secondary-400" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-2">Create an Account</h1>
          <p className="text-slate-400 text-center mb-6">
            Join to track your favorite celestial events
          </p>
          
          {errors.form && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200">
              {errors.form}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Username"
                type="text"
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
                fullWidth
              />
              
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                fullWidth
              />
              
              <Input
                label="Password"
                type="password"
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                fullWidth
              />
              
              <Input
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                fullWidth
              />
              
              <Button 
                type="submit" 
                fullWidth 
                isLoading={loading}
                disabled={loading}
              >
                Create Account
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;