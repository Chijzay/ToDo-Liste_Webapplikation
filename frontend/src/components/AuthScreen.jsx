import { useState } from 'react';
import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_AUTH_API_URL || 'http://localhost:5000/api/auth';

function AuthScreen({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' oder 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url =
        mode === 'login' ? `${API_BASE}/login` : `${API_BASE}/register`;

      const payload =
        mode === 'login'
          ? { email, password }
          : { email, password, username };

      const res = await axios.post(url, payload);

      onAuthSuccess(res.data); // { user, token }

      setEmail('');
      setPassword('');
      setUsername('');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Etwas ist schiefgelaufen. Versuche es erneut.';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">ToDo App</h1>

        <div className="flex border rounded-lg overflow-hidden text-sm">
          <button
            className={`flex-1 py-2 ${
              mode === 'login' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${
              mode === 'register' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => setMode('register')}
          >
            Registrieren
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Benutzername
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={mode === 'register'}
                minLength={3}
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 mb-1">E-Mail</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Passwort</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600"
          >
            {mode === 'login' ? 'Einloggen' : 'Registrieren'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthScreen;
