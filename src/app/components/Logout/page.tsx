'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/');
  };

  return (
    <div className=" items-center justify-center py-10 ">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
