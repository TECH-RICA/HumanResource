import { HiOutlineSupport, HiOutlineMail, HiOutlineChat, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

const faqs = [
  { q: 'How do I add a new employee?', a: 'Navigate to Employees → Click "Add Employee" → Fill in the details and save.' },
  { q: 'How do I process payroll?', a: 'Go to Payroll → Click "Process Payroll" → Review and confirm the calculations.' },
  { q: 'How do I approve leave requests?', a: 'Go to Leave Management → Find pending requests → Click approve or reject.' },
  { q: 'How do I upgrade my plan?', a: 'Navigate to Subscription → Select your desired plan → Click Upgrade.' },
];

export default function Support() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Support</h1><p className="page-header-subtitle">Get help and find answers</p></div>
      </div>

      <div className="grid-3 mb-6">
        <Card>
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <HiOutlineMail size={32} style={{ color: 'var(--color-primary-600)', marginBottom: 'var(--space-3)' }} />
            <h4>Email Support</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: '8px 0 16px' }}>Get a response within 24 hours</p>
            <Button variant="secondary" size="sm">support@peoplecore.com</Button>
          </div>
        </Card>
        <Card>
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <HiOutlineChat size={32} style={{ color: 'var(--color-success-500)', marginBottom: 'var(--space-3)' }} />
            <h4>Live Chat</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: '8px 0 16px' }}>Available Mon-Fri, 9AM-6PM</p>
            <Button size="sm">Start Chat</Button>
          </div>
        </Card>
        <Card>
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <HiOutlineQuestionMarkCircle size={32} style={{ color: 'var(--color-warning-500)', marginBottom: 'var(--space-3)' }} />
            <h4>Knowledge Base</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: '8px 0 16px' }}>Browse our help articles</p>
            <Button variant="secondary" size="sm">Browse Articles</Button>
          </div>
        </Card>
      </div>

      <div className="grid-2">
        <Card>
          <h4 style={{ marginBottom: 'var(--space-4)' }}>Submit a Ticket</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input label="Subject" placeholder="Brief description of your issue" />
            <Input label="Message" type="textarea" placeholder="Describe your issue in detail..." />
            <Button onClick={() => toast.success('Support ticket submitted!')}>Submit Ticket</Button>
          </div>
        </Card>
        <Card>
          <h4 style={{ marginBottom: 'var(--space-4)' }}>Frequently Asked Questions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ paddingBottom: 'var(--space-4)', borderBottom: i < faqs.length - 1 ? '1px solid var(--border-color-light)' : 'none' }}>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>{faq.q}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
