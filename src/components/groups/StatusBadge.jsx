import React from 'react';

const configs = {
  active: { label: 'Active', classes: 'bg-green-500/20 text-green-400 border-green-500/30' },
  hidden: { label: 'Hidden', classes: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  deactivated: { label: 'Deactivated', classes: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  deleted: { label: 'Deleted', classes: 'bg-red-500/20 text-red-400 border-red-500/30' },
  pending: { label: 'Pending', classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  approved: { label: 'Approved', classes: 'bg-green-500/20 text-green-400 border-green-500/30' },
  rejected: { label: 'Rejected', classes: 'bg-red-500/20 text-red-400 border-red-500/30' },
  active_member: { label: 'Active Member', classes: 'bg-green-500/20 text-green-400 border-green-500/30' },
  leave_requested: { label: 'Leave Requested', classes: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  removed: { label: 'Removed', classes: 'bg-red-500/20 text-red-400 border-red-500/30' },
  commission_pending: { label: 'Change Pending', classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
};

export default function StatusBadge({ status, label, className = '' }) {
  const config = configs[status] || { label: label || status, classes: 'bg-white/10 text-white/60 border-white/20' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.classes} ${className}`}>
      {label || config.label}
    </span>
  );
}