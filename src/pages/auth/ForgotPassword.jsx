import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { useAuthStore } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { forgotPassword, isLoading } = useAuthStore();
  const [sent, setSent] = useState(false);

  const onSubmit = async (data) => {
    const success = await forgotPassword(data.email);
    if (success) setSent(true);
  };

  if (sent) return (
    <>
      <h2 className="auth-title">Check your email</h2>
      <p className="auth-subtitle">We've sent a password reset link to your email address.</p>
      <div className="auth-success" style={{ marginTop: 'var(--space-4)' }}>If the email exists in our system, you'll receive reset instructions shortly.</div>
      <div className="auth-footer" style={{ marginTop: 'var(--space-6)' }}>
        <Link to="/login">← Back to sign in</Link>
      </div>
    </>
  );

  return (
    <>
      <h2 className="auth-title">Forgot password?</h2>
      <p className="auth-subtitle">Enter your email and we'll send you reset instructions</p>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email Address" type="email" placeholder="you@company.com" icon={HiOutlineMail} required error={errors.email?.message}
          {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
        <Button type="submit" loading={isLoading} style={{ width: '100%' }}>Send Reset Link</Button>
      </form>
      <div className="auth-footer">
        Remember your password? <Link to="/login">Sign in</Link>
      </div>
    </>
  );
}
