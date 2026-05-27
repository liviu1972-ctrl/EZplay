import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getUserProfile, updateUserProfile } from './userService';
import { UserProfile as IUserProfile } from './types';

interface UserProfileProps {
  onBack: () => void;
}

const AVATAR_PRESETS = [
    'https://ezplay.org/cards/base-game/a101.webp',
    'https://ezplay.org/cards/base-game/a102.webp',
    'https://ezplay.org/cards/base-game/a103.webp',
];

const UserProfileView: React.FC<UserProfileProps> = ({ onBack }) => {
  const { authState } = useAuth();
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authState.user) {
          setLoading(false);
          return;
      }
      try {
        let userProfile = await getUserProfile(authState.user.id || authState.user.uid);
        if (userProfile) {
            setProfile(userProfile);
            setDisplayName(userProfile.displayName || '');
            setSelectedAvatar(userProfile.avatarUrl || '');
        }
      } catch (err) {
        setError("Nu am putut încărca profilul.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [authState.user]);

  const handleSave = async () => {
    if (!authState.user) return;
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      await updateUserProfile(authState.user.id || authState.user.uid, {
        displayName,
        avatarUrl: selectedAvatar
      });
      setSuccessMsg("Profil actualizat cu succes!");
    } catch (err: any) {
      setError("Eroare la salvarea profilului.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-white">Se încarcă profilul...</div>;

  return (
    <div className="w-full max-w-2xl bg-slate-800/90 backdrop-blur-sm rounded-lg p-8 shadow-2xl mx-auto mt-10 text-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">Profil Utilizator</h1>
      
      <div className="flex flex-col space-y-6">
        <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Alege Avatar</label>
            <div className="flex space-x-4">
                {AVATAR_PRESETS.map((url) => (
                <button
                    key={url}
                    onClick={() => setSelectedAvatar(url)}
                    className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${selectedAvatar === url ? 'border-yellow-400 scale-110 ring-2 ring-yellow-400/50' : 'border-slate-600'}`}
                >
                    <img src={url} alt="Preset" className="w-full h-full object-cover" />
                </button>
                ))}
            </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">Nume Afișat</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        {error && <div className="p-3 bg-red-900/50 text-red-200 rounded-md text-sm">{error}</div>}
        {successMsg && <div className="p-3 bg-green-900/50 text-green-200 rounded-md text-sm">{successMsg}</div>}

        <div className="flex justify-end space-x-4 pt-4">
            <button onClick={onBack} className="px-6 py-3 bg-slate-600 text-white rounded-lg">Înapoi</button>
            <button onClick={handleSave} disabled={saving} className="px-8 py-3 bg-blue-600 text-white rounded-lg">
                {saving ? 'Se salvează...' : 'Salvează Modificări'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
