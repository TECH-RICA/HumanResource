import './Loader.css';

export function Spinner({ size = 'md' }) {
  return <div className={`spinner spinner-${size}`} />;
}

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="page-loader">
      <Spinner size="lg" />
      <span className="page-loader-text">{text}</span>
    </div>
  );
}

export function Skeleton({ width, height, circle, className = '' }) {
  const style = {
    width: width || '100%',
    height: height || '14px',
    borderRadius: circle ? '50%' : undefined,
  };
  return <div className={`skeleton ${className}`} style={style} />;
}

export function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 'var(--space-5)' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <Skeleton width="40px" height="40px" circle />
        <div style={{ flex: 1 }}>
          <Skeleton height="16px" width="60%" />
          <Skeleton height="12px" width="40%" />
        </div>
      </div>
      <Skeleton height="14px" />
      <Skeleton height="14px" />
      <Skeleton height="14px" width="70%" />
    </div>
  );
}
