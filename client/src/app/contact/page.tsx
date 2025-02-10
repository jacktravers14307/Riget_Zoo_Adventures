'use client'

import type React from 'react'
import axios from 'axios'
import Header from '../components/Header'
import { useState } from 'react'

export default function Page() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [message, setMessage] = useState("")


    async function sendMessage(Event: React.FormEvent){
        try{
            Event.preventDefault()
            if(!firstName || !lastName || !message || !email){
                return alert("Please fill out all fields")
            }
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
                return alert("Please enter a valid email.")
            }

            const phone = phoneNumber || "Not Provided"
            const response = await axios.post("/api/contactPage", {
                firstName,
                lastName,
                email,
                phone,
                message

            })
            if(response.status === 201){
                alert("Message sent!")
            }
        }catch(error){
            if(axios.isAxiosError(error) && error.response){
                alert(error.response.data.error)
            }else{
                alert("An error occurred. Please try again later")
            }
        }
    }

  return (

    <div className='h-screen w-screen flex flex-col overflow-hidden'>
        <Header />
        <div className='flex flex-1 bg-[#364934] justify-center items-center'>
            <form onSubmit={sendMessage} className='bg-white rounded-xl px-12 py-6 justify-center items-center'>
                <h1 className='text-3xl font-bold text-center mb-10'>Contact Riget Zoo</h1>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row w-full gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="firstNameInput" className='text-black'>First Name*</label>
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder='John' id='firstNameInput' className='p-2 w-full outline-none border-none bg-gray-200' required/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="lastNameInput" className='text-black'>Last Name*</label>
                            <input value={lastName} onChange={(e) => setLastname(e.target.value)} type="text" placeholder='Smith' id='lastNameInput' className='p-2 w-full outline-none border-none bg-gray-200' required/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="emailInput" className='text-black'>Email*</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='JohnSmith123@hotmail.com' id='emailInput' className='p-2 w-full outline-none border-none bg-gray-200' required/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="phoneInput" className='text-black'>Telephone Number</label>
                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder='+44 20 7123 4567' id='phoneInput' className='p-2 w-full outline-none border-none bg-gray-200'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="messageInput" className='text-black'>Your Message*</label>
                        <textarea id="messageInput" value={message} onChange={(e) => setMessage(e.target.value)} className='w-full bg-gray-200 h-52 outline-none p-2 resize-none' required/>
                    </div>
                    <div className='flex justify-center items-center mt-6'>
                        <button type="submit" className='bg-[#41583E] hover:bg-[#364934] py-2 w-full text-white'>Send Message</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
