"use client"
import { useRouter } from 'next/navigation'; // ✅ correct for app/

import React from "react";
import { useState } from "react";
const page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-red-500");
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Login failed');
        setMessageColor('text-red-500');
      } else {
        setMessage('Login successful!');
        setMessageColor('text-green-500');
        // console.log('Token:', data.token);
        localStorage.setItem('authToken', data.token); //store token
         
        //  router.push('/admin/welcome')
        if (data.user && data.user.role === 'admin') {
          router.push('/admin/Dashboard');
        } else {
          router.push('/page/welcome'); // or another route for regular users
        }
      }
    } catch (err) {
      setMessage('Something went wrong!');
      setMessageColor('text-red-500');
    }
  };


  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      {message && (
        <div className={`mt-4 text-center ${messageColor}`}>
          {message}
        </div>
      )}
    </div>
  </div>
  );
};

export default page;
