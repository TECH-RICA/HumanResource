import { useState } from 'react';
import { HiOutlinePlus, HiOutlineBriefcase, HiOutlineUsers, HiOutlineEye } from 'react-icons/hi';
import { jobPostings, applicants } from '../../data/recruitment';
import { formatDate, formatCurrency } from '../../utils/helpers';
import { RECRUITMENT_STAGE_LABELS } from '../../constants/status';
import StatCard from '../../components/ui/StatCard';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';

const stageColors = { applied: 'gray', screening: 'info', interview: 'warning', offer: 'info', hired: 'success', rejected: 'danger' };

export default function Recruitment() {
  const openJobs = jobPostings.filter((j) => j.status === 'open').length;
  const totalApplicants = applicants.length;

  const jobColumns = [
    { key: 'title', label: 'Job Title', render: (v) => <strong>{v}</strong> },
    { key: 'department', label: 'Department' },
    { key: 'location', label: 'Location' },
    { key: 'salary', label: 'Salary Range', render: (v) => `${formatCurrency(v.min)} - ${formatCurrency(v.max)}` },
    { key: 'applicants', label: 'Applicants' },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'open' ? 'success' : 'gray'} dot>{v}</Badge> },
    { key: 'postedDate', label: 'Posted', render: (v) => formatDate(v) },
  ];

  const applicantColumns = [
    { key: 'name', label: 'Candidate', render: (v) => <strong>{v}</strong> },
    { key: 'jobTitle', label: 'Applied For' },
    { key: 'email', label: 'Email' },
    { key: 'stage', label: 'Stage', render: (v) => <Badge variant={stageColors[v]} dot>{RECRUITMENT_STAGE_LABELS[v] || v}</Badge> },
    { key: 'rating', label: 'Rating', render: (v) => v > 0 ? `⭐ ${v}` : '—' },
    { key: 'appliedDate', label: 'Applied', render: (v) => formatDate(v) },
  ];

  const tabs = [
    { key: 'jobs', label: 'Job Postings', content: <Table columns={jobColumns} data={jobPostings} /> },
    { key: 'applicants', label: 'Applicants', content: <Table columns={applicantColumns} data={applicants} /> },
    {
      key: 'pipeline', label: 'Pipeline',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-4)' }}>
          {['applied', 'screening', 'interview', 'offer', 'hired'].map((stage) => {
            const stageApps = applicants.filter((a) => a.stage === stage);
            return (
              <div key={stage}>
                <div style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Badge variant={stageColors[stage]}>{RECRUITMENT_STAGE_LABELS[stage]}</Badge>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{stageApps.length}</span>
                </div>
                {stageApps.map((a) => (
                  <Card key={a.id} className="mb-2">
                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{a.name}</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>{a.jobTitle}</div>
                    {a.rating > 0 && <div style={{ fontSize: 'var(--font-size-xs)', marginTop: 4 }}>⭐ {a.rating}</div>}
                  </Card>
                ))}
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Recruitment</h1><p className="page-header-subtitle">Manage job postings and candidates</p></div>
        <Button icon={HiOutlinePlus}>Post New Job</Button>
      </div>
      <div className="grid-3 mb-6">
        <StatCard label="Open Positions" value={openJobs} icon={HiOutlineBriefcase} color="#3b82f6" />
        <StatCard label="Total Applicants" value={totalApplicants} icon={HiOutlineUsers} color="#8b5cf6" />
        <StatCard label="Hired This Month" value={1} icon={HiOutlineUsers} color="#22c55e" />
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}
