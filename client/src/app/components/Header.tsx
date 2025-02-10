'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/isLoggedIn', { withCredentials: true });
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Error fetching session:", error);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  return (
    <div className='bg-[#41583E] text-white flex items-center justify-between p-4 sticky top-0'>
      <div className='flex flex-row gap-5 items-center'>
        <Link href="/"><p className='bg-white rounded-full p-3 text-[#41583E]'>RZA</p></Link>
        <Link href="/"><h1 className='text-3xl font-bold'>Riget Zoo Adventures</h1></Link>
      </div>
      <ul className='flex flex-row gap-5 px-3 items-center'>
        {/* <li><Link href="/animals" className='hover:text-gray-200 transition'>Our Animals</Link></li> */}
        <li><Link href="/daytickets" className='hover:text-gray-200 transition'>Day Tickets</Link></li>
        {/* <li><Link href="/events" className='hover:text-gray-200 transition'>Events</Link></li> */}
        <li><Link href="/contact" className='hover:text-gray-200 transition'>Contact Us</Link></li>
        {isLoggedIn === null ? null : isLoggedIn ? (
          <li><Link href="/account" className='hover:text-gray-200 transition text-center'>My Account</Link></li>
        ) : (
          <li><Link href="/login" className='hover:text-gray-200 transition text-center'>Login</Link></li>
        )}
      </ul>
    </div>
  );
}
