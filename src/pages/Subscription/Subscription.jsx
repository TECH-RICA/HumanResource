import { HiOutlineCheck } from 'react-icons/hi';
import { PLAN_DETAILS } from '../../constants/plans';
import { useTenantStore } from '../../context/TenantContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import toast from 'react-hot-toast';
import './Subscription.css';

export default function Subscription() {
  const { tenant, upgradePlan } = useTenantStore();
  const currentPlan = tenant.plan;

  const handleUpgrade = async (planKey) => {
    await upgradePlan(planKey);
    toast.success('Plan updated successfully!');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Subscription</h1><p className="page-header-subtitle">Manage your plan and billing</p></div>
      </div>

      <Card className="mb-6">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 4 }}>Current Plan</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>{PLAN_DETAILS[currentPlan]?.name}</span>
              <Badge variant="success" dot>Active</Badge>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Next billing date</div>
            <div style={{ fontWeight: 500 }}>{tenant.subscriptionEnd}</div>
          </div>
        </div>
      </Card>

      <div className="plan-grid">
        {Object.entries(PLAN_DETAILS).map(([key, plan]) => (
          <div key={key} className={`plan-card ${plan.highlighted ? 'highlighted' : ''} ${key === currentPlan ? 'current' : ''}`}>
            {plan.highlighted && <div className="plan-popular">Most Popular</div>}
            <h3 className="plan-name">{plan.name}</h3>
            <p className="plan-desc">{plan.description}</p>
            <div className="plan-price">
              <span className="plan-amount">${plan.price}</span>
              <span className="plan-period">{plan.period}</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((f, i) => (
                <li key={i}><HiOutlineCheck size={16} style={{ color: 'var(--color-success-500)', flexShrink: 0 }} />{f}</li>
              ))}
            </ul>
            <Button
              variant={key === currentPlan ? 'secondary' : plan.highlighted ? 'primary' : 'secondary'}
              disabled={key === currentPlan}
              style={{ width: '100%', marginTop: 'auto' }}
              onClick={() => handleUpgrade(key)}
            >
              {key === currentPlan ? 'Current Plan' : 'Upgrade'}
            </Button>
          </div>
        ))}
      </div>

      <Card className="mt-6">
        <h4 style={{ marginBottom: 'var(--space-4)' }}>Billing History</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {['March 2024', 'February 2024', 'January 2024'].map((month) => (
            <div key={month} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', borderBottom: '1px solid var(--border-color-light)' }}>
              <span>{month}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ fontWeight: 600 }}>$420.00</span>
                <Badge variant="success">Paid</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
