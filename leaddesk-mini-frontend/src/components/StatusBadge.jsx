import React from 'react';

export default function StatusBadge({ status }) {
  const styles = {
    New: 'bg-amber-100 text-amber-800 border-amber-200',
    Contacted: 'bg-blue-100 text-blue-800 border-blue-200',
    Closed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border ${
        styles[status] || styles.New
      }`}
    >
      {status}
    </span>
  );
}