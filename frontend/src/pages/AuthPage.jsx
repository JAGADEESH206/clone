import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login, signup } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (isLogin) await login({ email: form.email, password: form.password });
    else await signup(form);
    nav('/');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form onSubmit={submit} className="bg-panel p-8 rounded-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</h1>
        {!isLogin && <input className="w-full bg-zinc-900 p-3 rounded" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        <input className="w-full bg-zinc-900 p-3 rounded" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full bg-zinc-900 p-3 rounded" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full p-3 bg-accent text-black rounded font-semibold">{isLogin ? 'Login' : 'Create account'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-accent text-sm">{isLogin ? 'Need an account? Sign up' : 'Have an account? Login'}</button>
      </form>
    </div>
  );
}
