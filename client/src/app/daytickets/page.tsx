'use client'

import React from 'react'
import Header from '../components/Header'
import { TiTick } from "react-icons/ti";
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from 'axios';

export default function Page() {

    async function purchaseTickets(){
        try{
            if(!isLoggedIn){
                return alert("You must be logged in to make a purchase: (Because im too lazy to add a payment system)")
            }
            const response = await axios.post("/api/buyTicket", {
                total: totalPrice,
                standardAmount,
                familyAmount,
                premiumAmount
            })
            if(response.status === 201){
                alert("Thanks for the money loser")
            }
        }catch(error){
            if(axios.isAxiosError(error) && error.response){
                alert(error.response.data.error)
            }
            alert("An error occurred. Please try again later.")
            console.log(error)
        }
    }

    const standardPrice = 29.99
    const familyPrice = 99.99
    const premiumPrice = 49.99

        const [standardAmount, setStandardAmount] = useState(0)
        const [familyAmount, setFamilyAmount] = useState(0)
        const [premiumAmount, setPremiumAmount] = useState(0)

        const totalPrice = (standardAmount * standardPrice) + (familyAmount * familyPrice) + (premiumAmount * premiumPrice)

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
    <div className='h-screen overflow-hidden'>
        <Header />
        <div className='w-screen bg-[#364934] h-full flex flex-col justify-center'>
            <div className='flex flex-row gap-8 justify-center items-center'>
                <div className='bg-white flex flex-col p-8 rounded-lg w-72'>
                        <h1 className='text-2xl font-semibold text-[#41583E] mb-4'>Standard Ticket</h1>
                        <p className='text-4xl font-bold mb-4'>£29.99 <span className='text-lg text-gray-500'>/person</span></p>
                        <ul className='space-y-3 mb-6'>
                            <li className='flex items-center flex-row'>
                                <TiTick />
                                <p className='text-xl'>Full Park Access</p>
                            </li>
                            <li className='flex items-center flex-row'>
                                <TiTick />
                                <p className='text-xl'>Animal Exhibits</p>
                            </li>
                            <li className='flex items-center flex-row'>
                                <TiTick />
                                <p className='text-xl'>Daily Shows</p> 
                            </li>
                        </ul>
                        <div className='flex flex-row gap-7 justify-center items-center'>
                            <button type='button' className='bg-[#41583E] hover:bg-[#364934] py-2 px-7 text-white transition' onClick={() => { if(standardAmount > 0){setStandardAmount(standardAmount - 1)}}}><FaArrowLeft/></button>
                            <h1 className='text-3xl'>{standardAmount}</h1>
                            <button type='button' className='bg-[#41583E] hover:bg-[#364934] py-2 px-7 text-white transition' onClick={() => setStandardAmount(standardAmount + 1)}><FaArrowRight/></button>
                        </div>
                </div>
                <div className='bg-white flex flex-col p-12 rounded-lg w-82'>
                        <h1 className='text-2xl font-semibold text-[#41583E] mb-4'>Family Bundle</h1>
                        <p className='text-4xl font-bold mb-4'>£99.99 <span className='text-lg text-gray-500'>/4 people</span></p>
                        <ul className='space-y-3 mb-6'>
                            <li className='flex items-center flex-row'>
                                <TiTick />
                                <p className='text-xl'>Includes 4 standard tickets</p>
                            </li>
                            <li className='flex items-center flex-row'>
                                <TiTick />
                                <p className='text-xl'>Free Parking</p>
                            </li>
                            <li className='flex items-center flex-row'>
                                <TiTick />
                                <p className='text-xl'>10% off in our giftshop</p> 
                            </li>
                        </ul>
                        <div className='flex flex-row gap-7 justify-center items-center'>
                            <button type='button' className='bg-[#41583E] hover:bg-[#364934] py-2 px-7 text-white transition' onClick={() => { if(familyAmount > 0){setFamilyAmount(familyAmount - 1)}}}><FaArrowLeft/></button>
                            <h1 className='text-3xl'>{familyAmount}</h1>
                            <button type='button' className='bg-[#41583E] hover:bg-[#364934] py-2 px-7 text-white transition' onClick={() => setFamilyAmount(familyAmount + 1)}><FaArrowRight/></button>
                        </div>
                </div>
                <div className='bg-white flex flex-col p-8 rounded-lg w-72'>
                        <h1 className='text-2xl font-semibold text-[#41583E] mb-4'>Premium Ticket</h1>
                        <p className='text-4xl font-bold mb-4'>£49.99 <span className='text-lg text-gray-500'>/person</span></p>
                        <ul className='space-y-3 mb-6'>
                            <li className='flex items-center flex-row'>
                                <TiTick />
                                <p className='text-xl'>Full guided tour</p>
                            </li>
                            <li className='flex items-center flex-row'>
                                <TiTick />
                                <p className='text-xl'>Fast-track entry</p>
                            </li>
                            <li className='flex items-center flex-row'>
                                <TiTick />
                                <p className='text-xl'>VIP seating at shows</p> 
                            </li>
                        </ul>
                        <div className='flex flex-row gap-7 justify-center items-center'>
                            <button type='button' className='bg-[#41583E] hover:bg-[#364934] py-2 px-7 text-white transition' onClick={() => { if(premiumAmount > 0){setPremiumAmount(premiumAmount - 1)}}}><FaArrowLeft/></button>
                            <h1 className='text-3xl'>{premiumAmount}</h1>
                            <button type='button' className='bg-[#41583E] hover:bg-[#364934] py-2 px-7 text-white transition' onClick={() => setPremiumAmount(premiumAmount + 1)}><FaArrowRight/></button>
                        </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='bg-white mt-10 p-10 rounded-xl flex-col h-96 w-2/3'>
                    <div className='w-full flex mb-5 flex-col'>
                        <h1 className='text-4xl text-[#41583E] font-bold'>Order summary:</h1>
                    </div>
                    <div>
                        <ul className='text-black text-2xl'>
                            <li><div className='flex flex-row justify-between'><p>Standard Tickets:</p> <p>+ £{(standardAmount * standardPrice).toFixed(2)}</p></div></li>
                            <li><div className='flex flex-row justify-between'><p>Family Tickets:</p> <p>+ £{(familyAmount * familyPrice).toFixed(2)}</p></div></li>
                            <li><div className='flex flex-row justify-between'><p>Premium Tickets:</p> <p>+ £{(premiumAmount * premiumPrice).toFixed(2)}</p></div></li>
                        </ul>
                    </div>
                    <div>
                        <span className='bg-black block w-full h-1 mt-6'/>
                    </div>
                    <div>
                        <ul className='text-black text-2xl'>
                            <li><div className='flex flex-row justify-between mt-4'><p>Total:</p> <p>= £{totalPrice.toFixed(2)}</p></div></li>
                        </ul>
                    </div>
                    <div className='w-full mt-5'>
                        <button type='button' className='w-full bg-[#41583E] hover:bg-[#364934] py-2 text-white text-xl transition' onClick={purchaseTickets}>Purchase Tickets</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
