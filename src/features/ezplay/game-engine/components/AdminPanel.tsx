
import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserProfile, processTransaction } from '../../platform/user/userService';
import type { UserProfile, UserRole } from '../../platform/user/types';

interface AdminPanelProps {
  onBack: () => void;
  currentUserRole: UserRole | undefined;
}

interface TransactionModalState {
    isOpen: boolean;
    targetUserId: string | 'GLOBAL';
    currency: 'ezc' | 'ezg';
    amount: number;
    reason: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, currentUserRole }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // State for the custom transaction modal
  const [modal, setModal] = useState<TransactionModalState>({
      isOpen: false,
      targetUserId: '',
      currency: 'ezc',
      amount: 0,
      reason: ''
  });

  useEffect(() => {
    if (currentUserRole !== 'admin') {
        setError("Acces interzis. Nu aveți drepturi de administrator.");
        setLoading(false);
        return;
    }
    loadUsers();
  }, [currentUserRole]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await getAllUsers();
      allUsers.sort((a, b) => {
          const roleOrder: Record<string, number> = { admin: 0, premium: 1, standard: 2 };
          const orderA = roleOrder[a.role ?? 'standard'] ?? 99;
          const orderB = roleOrder[b.role ?? 'standard'] ?? 99;
          if (orderA !== orderB) return orderA - orderB;
          return (a.displayName || '').localeCompare(b.displayName || '');
      });
      setUsers(allUsers);
    } catch (err) {
      setError("Nu s-au putut încărca utilizatorii.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setUpdatingId(userId);
    try {
        await updateUserProfile(userId, { role: newRole });
        setUsers(prev => prev.map(u => u.uid === userId ? { ...u, role: newRole } : u));
    } catch (err) {
        alert("Eroare la actualizarea rolului.");
    } finally {
        setUpdatingId(null);
    }
  };

  // Open modal for single user
  const initiateSingleAdjust = (userId: string, currency: 'ezc' | 'ezg', amount: number) => {
      setModal({
          isOpen: true,
          targetUserId: userId,
          currency,
          amount,
          reason: 'ADMIN_ADJUST'
      });
  };

  // Open modal for all users
  const initiateGlobalAdjust = (currency: 'ezc' | 'ezg', amount: number) => {
      setModal({
          isOpen: true,
          targetUserId: 'GLOBAL',
          currency,
          amount,
          reason: 'GLOBAL_GIFT'
      });
  };

  // Execute the transaction after modal confirmation
  const executeTransaction = async () => {
    const { targetUserId, currency, amount, reason } = modal;
    setModal(prev => ({ ...prev, isOpen: false }));
    
    if (targetUserId === 'GLOBAL') {
        setUpdatingId('GLOBAL');
        let successCount = 0;
        try {
            for (const user of users) {
                try {
                    await processTransaction(user.uid, currency, amount, reason || "GLOBAL_GIFT");
                    successCount++;
                } catch (e) {
                    console.warn(`Failed to update user ${user.uid}`, e);
                }
            }
            loadUsers();
        } catch (err) {
            alert("Eroare în timpul procesării globale.");
        } finally {
            setUpdatingId(null);
        }
    } else {
        setUpdatingId(targetUserId);
        try {
            await processTransaction(targetUserId, currency, amount, reason || "ADMIN_ADJUST");
            setUsers(prev => prev.map(u => {
                if (u.uid === targetUserId) {
                    const currentVal = Number(u[currency]) || 0;
                    return { ...u, [currency]: currentVal + amount };
                }
                return u;
            }));
        } catch (err) {
            console.error("Currency adjustment failed:", err);
            alert("Eroare la procesarea tranzacției. Verificați permisiunile.");
        } finally {
            setUpdatingId(null);
        }
    }
  };

  const roleColors = {
      admin: 'bg-red-900/50 text-red-200 border-red-700',
      premium: 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
      standard: 'bg-blue-900/50 text-blue-200 border-blue-700'
  };

  return (
    <div className="w-full max-w-7xl bg-slate-800/90 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white border border-slate-700 flex flex-col h-[90vh] relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold uppercase tracking-wider text-red-400">Panou Administrare</h1>
          
          <div className="flex items-center space-x-3 bg-slate-900/50 p-2 rounded-lg border border-slate-700">
              <span className="text-xs font-bold text-slate-400 uppercase mr-2">Acțiuni Globale:</span>
              <button 
                onClick={() => initiateGlobalAdjust('ezc', 10)}
                disabled={updatingId !== null}
                className="px-3 py-1.5 bg-yellow-700 hover:bg-yellow-600 text-xs font-bold rounded shadow disabled:opacity-50 transition-all"
              >
                  Toți +10 EZC
              </button>
              <button 
                onClick={() => initiateGlobalAdjust('ezg', 1)}
                disabled={updatingId !== null}
                className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-xs font-bold rounded shadow disabled:opacity-50 transition-all"
              >
                  Toți +1 EZG
              </button>
          </div>

          <button onClick={onBack} className="px-6 py-2 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors">
            Înapoi
          </button>
      </div>

      {loading ? (
          <div className="flex-grow flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p>Se încarcă lista de utilizatori...</p>
          </div>
      ) : error ? (
          <div className="flex-grow flex items-center justify-center text-red-400 font-bold text-xl">{error}</div>
      ) : (
          <div className="flex-grow overflow-y-auto border rounded-lg border-slate-600">
              <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-700 sticky top-0 z-10 shadow-md">
                      <tr>
                          <th className="p-4 font-bold text-slate-300 border-b border-slate-600">User</th>
                          <th className="p-4 font-bold text-slate-300 border-b border-slate-600 text-center">Balanță (EZC / EZG)</th>
                          <th className="p-4 font-bold text-slate-300 border-b border-slate-600 text-center">Rol Curent</th>
                          <th className="p-4 font-bold text-slate-300 border-b border-slate-600 text-center">Acțiuni Economice</th>
                          <th className="p-4 font-bold text-slate-300 border-b border-slate-600 text-center">Config Cont</th>
                      </tr>
                  </thead>
                  <tbody>
                      {users.map(user => (
                          <tr key={user.uid} className="hover:bg-slate-700/50 transition-colors border-b border-slate-700 last:border-0">
                              <td className="p-4">
                                  <div className="flex items-center space-x-3">
                                      <img src={user.avatarUrl} alt="Av" className="w-8 h-8 rounded-full border border-slate-500 object-cover" />
                                      <div>
                                          <div className="font-bold text-white leading-tight">{user.displayName || 'Anonim'}</div>
                                          <div className="text-[10px] text-slate-400 font-mono">{user.uid.substring(0, 12)}...</div>
                                      </div>
                                  </div>
                              </td>
                              <td className="p-4 text-center">
                                  <div className="flex flex-col items-center">
                                      <span className="text-yellow-400 font-mono font-bold">{user.ezc} EZC</span>
                                      <span className="text-amber-300 font-mono text-xs">{user.ezg} EZG</span>
                                  </div>
                              </td>
                              <td className="p-4 text-center">
                                  <span className={`px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${roleColors[user.role as keyof typeof roleColors] || 'bg-slate-700 text-white'}`}>
                                      {user.role}
                                  </span>
                              </td>
                              <td className="p-4 text-center">
                                  <div className="flex justify-center space-x-2">
                                      <button 
                                          onClick={() => initiateSingleAdjust(user.uid, 'ezc', 10)}
                                          disabled={updatingId !== null}
                                          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-[10px] font-bold rounded shadow-sm disabled:opacity-50 transition-all active:scale-95"
                                      >+10 EZC</button>
                                      <button 
                                          onClick={() => initiateSingleAdjust(user.uid, 'ezg', 1)}
                                          disabled={updatingId !== null}
                                          className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-[10px] font-bold rounded shadow-sm disabled:opacity-50 transition-all active:scale-95"
                                      >+1 EZG</button>
                                  </div>
                              </td>
                              <td className="p-4 text-center">
                                  {updatingId === user.uid ? (
                                      <span className="text-xs text-blue-400 animate-pulse font-bold">UPDATING...</span>
                                  ) : (
                                      <select 
                                          value={user.role} 
                                          onChange={(e) => handleRoleChange(user.uid, e.target.value as UserRole)}
                                          className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      >
                                          <option value="standard">Standard</option>
                                          <option value="premium">Magnat</option>
                                          <option value="admin">Admin</option>
                                      </select>
                                  )}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      )}

      {/* CUSTOM TRANSACTION MODAL */}
      {modal.isOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] animate-fade-in p-4">
              <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 w-full max-w-md shadow-2xl">
                  <h2 className="text-2xl font-bold text-yellow-400 mb-2 uppercase tracking-wide">Confirmare Tranzacție</h2>
                  <p className="text-slate-300 text-sm mb-6">
                      Ești pe cale să acorzi <span className="text-white font-bold">{modal.amount} {modal.currency.toUpperCase()}</span> 
                      {modal.targetUserId === 'GLOBAL' ? ' tuturor utilizatorilor.' : ' acestui utilizator.'}
                  </p>
                  
                  <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Motivul Alocării</label>
                          <input 
                              type="text"
                              value={modal.reason}
                              onChange={(e) => setModal(prev => ({ ...prev, reason: e.target.value }))}
                              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Introdu motivul aici..."
                              autoFocus
                          />
                      </div>

                      <div className="flex space-x-3 pt-4">
                          <button 
                            onClick={() => setModal(prev => ({ ...prev, isOpen: false }))}
                            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors"
                          >
                              Anulează
                          </button>
                          <button 
                            onClick={executeTransaction}
                            className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg transition-colors"
                          >
                              Confirmă
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminPanel;
