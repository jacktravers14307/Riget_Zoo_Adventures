'use client'

import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'

export default function Page() {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function loginUser(){
        try{
            const response = await axios.post("/api/login", {
                email,
                password
            })
            if(response.status === 201){
                router.push("/account")
            }
        }catch(error){
            if(axios.isAxiosError(error) && error.response){
                alert(error.response.data.message)
            }else{
                alert("An error occurred. Please try again later.")
            }
            console.log(error)
        }
    }

    function attemptLogin(event: React.FormEvent){
        try{
            event.preventDefault()
            if(!email){
                return alert("Enter an email.")
            }
            if(!password){
                return alert("Enter a password")
            }
            loginUser()
        }catch(error){
            alert(error)
            console.log(error)
        }
    }

  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden'>
        <Header />
    <div className='flex-1 bg-[#364934] flex flex-col justify-center items-center'>
        <form onSubmit={attemptLogin} className='bg-[#D1D1D1] p-10 flex flex-col justify-center items-center rounded-[40px] w-[30rem]'>
            <h1 className='text-4xl font-semibold'>Welcome Back</h1>
            <div className='w-full flex flex-col p-6 gap-4'>
                <div className='w-full'>
                    <label htmlFor="emailInput">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='JohnDoe@hotmail.com' className='p-2 w-full outline-none border-none' id='emailInput'/>
                </div>
                <div className='w-full'>
                    <label htmlFor="passwordInput">password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='********' className='p-2 w-full outline-none border-none' id='passwordInput'/>
                </div>
                <div>
                    <button type="submit" className='bg-green-500 hover:bg-green-600 transition w-full text-white p-2'>Log In</button>
                </div>
                <span className='h-[1px] bg-gray-200 mt-2 w-full' />
                <div className='w-full flex justify-center items-center text-blue-700 underline'>
                    <Link href="/register">No account yet? Sign Up</Link>
                </div>
            </div>
        </form>
    </div>
    </div>
  )
}
