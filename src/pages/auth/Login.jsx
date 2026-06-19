import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { useAuthStore } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    if (success) navigate('/');
  };

  return (
    <>
      <h2 className="auth-title">Welcome back</h2>
      <p className="auth-subtitle">Sign in to your PeopleCore account</p>
      {error && <div className="auth-error">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email Address" type="email" placeholder="you@company.com"
          icon={HiOutlineMail} required
          error={errors.email?.message}
          {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
          onFocus={clearError}
        />
        <Input
          label="Password" type="password" placeholder="••••••••"
          icon={HiOutlineLockClosed} required
          error={errors.password?.message}
        {...register('password', {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters'
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message:
      'Must contain uppercase, lowercase and a number'
  }
})}
          onFocus={clearError}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/forgot-password" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary-600)' }}>Forgot password?</Link>
        </div>
        <Button type="submit" loading={isLoading} style={{ width: '100%', marginTop: 'var(--space-2)' }}>Sign In</Button>
      </form>
      <div className="auth-footer">
        Don&apos;t have an account? <Link to="/register">Register your company</Link>
      </div>
    </>
  );
}
