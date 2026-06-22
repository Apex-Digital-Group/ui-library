import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, Download, Filter, ChevronLeft, ChevronRight, CreditCard, ArrowDownCircle, ArrowRightCircle, Heart, HeartHandshake, ShoppingBag, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BaseModal from './BaseModal';

const DEFAULT_TRANSACTION_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'credit', label: 'Credit' },
  { value: 'debit', label: 'Debit' },
  { value: 'transfer', label: 'Transfer' },
  { value: 'tip', label: 'Tip' },
  { value: 'support', label: 'Support' },
  { value: 'purchase', label: 'Purchase' },
  { value: 'commission', label: 'Commission' }
];

const DEFAULT_TRANSACTIONS = [
  { id: 1, date: '2025-11-25 04:07', type: 'transfer', amount: '+7.00', paymentMode: '-', paymentType: '-', note: 'Fund Transferred to JustinCase' },
  { id: 2, date: '2025-11-24 18:32', type: 'tip', amount: '+15.00', paymentMode: 'Credits', paymentType: 'Tip', note: 'Tip from @LuckyFan23' },
  { id: 3, date: '2025-11-24 12:15', type: 'commission', amount: '-12.50', paymentMode: '-', paymentType: 'Commission', note: 'Platform commission on sale' },
  { id: 4, date: '2025-11-23 21:45', type: 'credit', amount: '+50.00', paymentMode: 'Card', paymentType: 'Purchase', note: 'Credits purchased via Visa' },
  { id: 5, date: '2025-11-23 14:20', type: 'purchase', amount: '+25.00', paymentMode: 'Credits', paymentType: 'Content', note: 'Video bundle sale to @viewer99' },
  { id: 6, date: '2025-11-22 09:30', type: 'support', amount: '+5.00', paymentMode: 'Credits', paymentType: 'Support', note: 'Support from @BigSupporter' },
  { id: 7, date: '2025-11-21 16:55', type: 'debit', amount: '-100.00', paymentMode: 'Bank', paymentType: 'Withdrawal', note: 'Withdrawal to bank account' },
  { id: 8, date: '2025-11-20 22:10', type: 'tip', amount: '+8.50', paymentMode: 'Credits', paymentType: 'Tip', note: 'Tip from @NightOwl42' },
  { id: 9, date: '2025-11-19 11:05', type: 'transfer', amount: '-20.00', paymentMode: '-', paymentType: '-', note: 'Transfer to @FriendlyModel' },
  { id: 10, date: '2025-11-18 08:45', type: 'credit', amount: '+100.00', paymentMode: 'PayPal', paymentType: 'Purchase', note: 'Credits purchased via PayPal' }
];

export default function TransactionsModal({
  isOpen,
  onClose,
  transactions = DEFAULT_TRANSACTIONS,
  transactionTypes = DEFAULT_TRANSACTION_TYPES,
  itemsPerPage = 10,
  onExportCSV,
}) {
  const [typeFilter, setTypeFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = transactions.filter(t => {
    if (typeFilter !== 'all' && t.type !== typeFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTypeConfig = (type) => {
    switch (type) {
      case 'credit': return { color: 'bg-green-500', icon: CreditCard };
      case 'debit': return { color: 'bg-red-500', icon: ArrowDownCircle };
      case 'transfer': return { color: 'bg-purple-500', icon: ArrowRightCircle };
      case 'tip': return { color: 'bg-pink-500', icon: Heart };
      case 'support': return { color: 'bg-blue-500', icon: HeartHandshake };
      case 'purchase': return { color: 'bg-amber-500', icon: ShoppingBag };
      case 'commission': return { color: 'bg-gray-500', icon: Percent };
      default: return { color: 'bg-gray-500', icon: CreditCard };
    }
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    if (onExportCSV) {
      onExportCSV({ transactions: filteredTransactions, typeFilter, startDate, endDate });
    } else {
      console.log('Exporting CSV...');
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} lockScroll backdrop="bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#1a0e2e] rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Header */}
            <div className="p-4 flex items-center justify-between">
              <Button
                onClick={onClose}
                variant="ghost"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h2 className="text-2xl font-bold text-white">My Transactions</h2>
              <div className="w-20"></div>
            </div>

            {/* Filters */}
            <div className="px-6 pb-4">
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-[150px] bg-white text-gray-800 border-0 rounded-lg px-3 py-2 text-sm cursor-pointer"
                >
                  {transactionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Start date"
                  className="px-3 py-2 rounded-lg bg-white text-gray-800 border-0 text-sm"
                />

                <span className="text-white">—</span>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="End date"
                  className="px-3 py-2 rounded-lg bg-white text-gray-800 border-0 text-sm"
                />

                <Button
                  onClick={handleApplyFilters}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>

                <Button
                  onClick={handleExportCSV}
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="mx-6 mb-6 bg-[#2E2249] rounded-xl overflow-hidden border border-white/10">
              <table className="w-full">
                <thead className="bg-[#251a3a] border-b border-white/10">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-white/80">Date</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-white/80">Type</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-white/80">Amount</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-white/80">Payment Mode</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-white/80">Payment Type</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-white/80">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-sm text-white/70">{transaction.date}</td>
                      <td className="px-4 py-3">
                        {(() => {
                          const config = getTypeConfig(transaction.type);
                          const Icon = config.icon;
                          return (
                            <span className={`${config.color} text-white text-xs px-3 py-1 rounded-full uppercase font-semibold inline-flex items-center gap-1.5`}>
                              <Icon className="w-3 h-3" />
                              {transaction.type}
                            </span>
                          );
                        })()}
                      </td>
                      <td className={`px-4 py-3 text-sm font-semibold ${transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {transaction.amount}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70">{transaction.paymentMode}</td>
                      <td className="px-4 py-3 text-sm text-white/70">{transaction.paymentType}</td>
                      <td className="px-4 py-3 text-sm text-white/70">{transaction.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-end gap-4 px-4 py-3 bg-[#251a3a] border-t border-white/10">
                <span className="text-sm text-white/60">
                  Total {filteredTransactions.length} Transactions
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0 bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="px-3 py-1 border border-white/20 rounded text-sm text-white">{currentPage}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0 bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-white/60">{itemsPerPage} / page</span>
              </div>
            </div>
          </motion.div>
    </BaseModal>
  );
}