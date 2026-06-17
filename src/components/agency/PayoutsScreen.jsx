import React from 'react';
import { Wallet, Clock, CheckCircle } from 'lucide-react';

export default function PayoutsScreen({ onPayoutClick }) {
  const payouts = [
    { id: 1, creator: 'Ahri', amount: '$5,690', method: 'Bank Transfer', status: 'pending', date: '2025-12-23' },
    { id: 2, creator: 'Candy Crush', amount: '$4,356', method: 'PayPal', status: 'pending', date: '2025-12-23' },
    { id: 3, creator: 'Ruby Ravish', amount: '$3,591', method: 'Crypto', status: 'pending', date: '2025-12-22' },
    { id: 4, creator: 'Vixen Victoria', amount: '$4,470', method: 'Bank Transfer', status: 'approved', date: '2025-12-21' },
    { id: 5, creator: 'Sassy Sarah', amount: '$4,356', method: 'PayPal', status: 'approved', date: '2025-12-20' },
  ];

  return (
    <div className="space-y-6">
      {/* Wallet Balance */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-lg shadow-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-medium">Agency Wallet Balance</span>
            </div>
            <div className="text-4xl font-bold">$56,904</div>
            <p className="text-white/80 text-sm mt-1">Available for creator payouts</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
              Request Payout
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-lg font-medium hover:bg-white/20 transition-all">
              View History
            </button>
          </div>
        </div>
      </div>

      {/* Payout Requests */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">Payout Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-white/60">Creator</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Method</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Status</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Requested Date</th>
                <th className="text-right p-4 text-sm font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr
                  key={payout.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => onPayoutClick(payout)}
                >
                  <td className="p-4 font-medium">{payout.creator}</td>
                  <td className="p-4 font-semibold">{payout.amount}</td>
                  <td className="p-4 text-white/80">{payout.method}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      payout.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {payout.status === 'pending' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {payout.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/60">{payout.date}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {payout.status === 'pending' && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Payout approved!');
                            }}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-all"
                          >
                            Approve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Payout on hold');
                            }}
                            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-medium transition-all"
                          >
                            Hold
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}