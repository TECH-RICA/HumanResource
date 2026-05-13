import { useForm } from 'react-hook-form';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { departments } from '../../data/departments';
import toast from 'react-hot-toast';

export default function EmployeeForm({ employee, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: employee || {},
  });

  const onSubmit = (data) => {
    toast.success(employee ? 'Employee updated successfully' : 'Employee added successfully');
    onClose();
  };

  const deptOptions = departments.map((d) => ({ value: d.id, label: d.name }));
  const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }];
  const statusOptions = [
    { value: 'full_time', label: 'Full Time' }, { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' }, { value: 'intern', label: 'Intern' }, { value: 'probation', label: 'Probation' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="emp-form-grid">
        <Input label="First Name" required error={errors.firstName?.message}
          {...register('firstName', { required: 'Required' })} />
        <Input label="Last Name" required error={errors.lastName?.message}
          {...register('lastName', { required: 'Required' })} />
        <Input label="Email" type="email" required error={errors.email?.message}
          {...register('email', { required: 'Required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
        <Input label="Phone" type="tel" {...register('phone')} />
        <Select label="Gender" options={genderOptions} placeholder="Select gender" {...register('gender')} />
        <Input label="Date of Birth" type="date" {...register('dateOfBirth')} />
        <Select label="Department" required options={deptOptions} placeholder="Select department" error={errors.departmentId?.message}
          {...register('departmentId', { required: 'Required' })} />
        <Input label="Position" required error={errors.position?.message}
          {...register('position', { required: 'Required' })} />
        <Input label="Salary" type="number" {...register('salary')} />
        <Select label="Employment Type" options={statusOptions} placeholder="Select type"
          {...register('employmentStatus')} />
        <Input label="Joining Date" type="date" {...register('joiningDate')} />
        <Input label="ID Number" {...register('idNumber')} />
      </div>
      <Input label="Address" type="textarea" className="mt-4" {...register('address')} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit">{employee ? 'Update' : 'Add Employee'}</Button>
      </div>
    </form>
  );
}
