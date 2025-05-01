import React, { useState } from 'react';
import { User, Mail, Key } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const nagivate = useNavigate();
  
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState<'account' | 'security'>('account');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  
  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username || !email) {
      setMessage({
        type: 'error',
        text: 'Username and email are required'
      });
      return;
    }
  
    setLoading(true);
  
    try {
      await updateUser({ username, email });
      setMessage({
        type: 'success',
        text: 'Account updated. Please log in again.'
      });
  
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update account information'
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      setMessage({
        type: 'error',
        text: 'Current password is required'
      });
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage({
        type: 'error',
        text: 'New password must be at least 6 characters'
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      setTimeout(() => {
        setMessage({
          type: 'success',
          text: 'Password updated successfully'
        });
        
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update password'
      });
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Your Profile</h1>
        
        <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-lg">
          <div className="flex border-b border-slate-800">
            <button
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'account'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
              onClick={() => setActiveTab('account')}
            >
              <User className="h-4 w-4 mr-2" />
              Account
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'security'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
              onClick={() => setActiveTab('security')}
            >
              <Key className="h-4 w-4 mr-2" />
              Security
            </button>
          </div>
          
          <div className="p-6">
            {message.text && (
              <div className={`mb-6 p-3 rounded-md ${
                message.type === 'success' 
                  ? 'bg-green-900/30 border border-green-800 text-green-200' 
                  : 'bg-red-900/30 border border-red-800 text-red-200'
              }`}>
                {message.text}
              </div>
            )}
            
            {activeTab === 'account' && (
              <form onSubmit={handleAccountSubmit}>
                <div className="space-y-5">
                  <Input
                    label="Username"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    icon={<User className="h-4 w-4" />}
                    fullWidth
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="h-4 w-4" />}
                    fullWidth
                  />
                  
                  <div className="pt-4">
                    <Button type="submit" isLoading={loading}>
                      Update Account
                    </Button>
                  </div>
                </div>
              </form>
            )}
            
            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-5">
                  <Input
                    label="Current Password"
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                    required
                  />
                  
                  <Input
                    label="New Password"
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    required
                  />
                  
                  <Input
                    label="Confirm New Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    required
                  />
                  
                  <div className="pt-4">
                    <Button type="submit" isLoading={loading}>
                      Update Password
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;