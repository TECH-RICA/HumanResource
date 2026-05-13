import { useState } from 'react';
import './Tabs.css';

export default function Tabs({ tabs, defaultTab }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.key);
  const activeTab = tabs.find((t) => t.key === active);

  return (
    <div>
      <div className="tabs">
        {tabs.map((tab) => (
          <button key={tab.key} className={`tab-btn ${active === tab.key ? 'active' : ''}`} onClick={() => setActive(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{activeTab?.content}</div>
    </div>
  );
}
