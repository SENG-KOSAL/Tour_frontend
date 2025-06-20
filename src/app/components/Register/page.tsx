'use client';

import { useState } from 'react';

export default function RegisterCustomer() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: 'customer' }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setMessage('✅ Registered successfully!');
      setForm({ name: '', email: '', phone: '', password: '' });
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 border rounded">
      <h2 className="text-xl font-bold">Register</h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone (optional)"
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        {loading ? 'Registering...' : 'Register as Customer'}
      </button>

      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </form>
  );
}
