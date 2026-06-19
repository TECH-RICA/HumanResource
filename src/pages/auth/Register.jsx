import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { useAuthStore } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Register() {
  const { register: reg, handleSubmit, formState: { errors }, watch } = useForm();
  const { register: authRegister, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await authRegister(data);
    if (success) navigate('/login');
  };

  return (
    <>
      <h2 className="auth-title">Create your account</h2>
      <p className="auth-subtitle">Register your company on PeopleCore</p>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Company Name" placeholder="TechCorp Inc." icon={HiOutlineOfficeBuilding} required error={errors.companyName?.message}
          {...reg('companyName', { required: 'Company name is required' })} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <Input label="First Name" placeholder="John" icon={HiOutlineUser} required error={errors.firstName?.message}
            {...reg('firstName', { required: 'Required' })} />
          <Input label="Last Name" placeholder="Doe" required error={errors.lastName?.message}
            {...reg('lastName', { required: 'Required' })} />
        </div>
        <Input label="Work Email" type="email" placeholder="you@company.com" icon={HiOutlineMail} required error={errors.email?.message}
          {...reg('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
        <Input label="Password" type="password" placeholder="Min 8 characters" icon={HiOutlineLockClosed} required error={errors.password?.message}
          {...reg('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters'
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message:
      'Must contain uppercase, lowercase and a number' } })} />
        <Input label="Confirm Password" type="password" placeholder="Re-enter password" icon={HiOutlineLockClosed} required error={errors.confirmPassword?.message}
 {...reg('confirmPassword', {
  required: 'Please confirm your password',
  validate: (value) =>
    value === watch('password') || 'Passwords do not match'
})}  />
        <Button type="submit" loading={isLoading} style={{ width: '100%', marginTop: 'var(--space-2)' }}>Create Account</Button>
      </form>
      <div className="auth-footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </>
  );
}
