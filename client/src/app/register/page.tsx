'use client'

import type React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'


export default function Page() {

    const router = useRouter()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checked, setIsChecked] = useState(false)

    async function registerAccount(){
        try{
            const response = await axios.post("/api/register", {
                firstName,
                lastName,
                email,
                password,
            })
            if(response.status === 201){
                router.push("/login")
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

    function attemptRegister(event: React.FormEvent){
        try{
            event.preventDefault()
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
                return alert("Please enter a valid email.")
            }
            if (!/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
                return alert("Password must be at least 8 characters long and contain at least one special character")
            }
            if(!checked){
                return alert("You must accept our terms and conditions")
            }
            registerAccount()
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden'>
    <Header />
    <div className='flex-1 bg-[#364934] flex flex-col justify-center items-center'>
        <form className='bg-[#D1D1D1] p-10 flex flex-col justify-center items-center rounded-[40px]' onSubmit={attemptRegister}>
            <h1 className='text-4xl font-semibold'>Sign Up Free</h1>
            <div className='p-6 w-full flex flex-col gap-4'>
                <div className='w-full flex flex-row gap-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="firstNameInput" className='text-[#21272A]'>First Name</label>
                        <input type="text" placeholder='John' id='firstNameInput' className='p-2 w-full outline-none border-none' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="LastNameInput" className='text-[#21272A]'>Last Name</label>
                        <input type="text" placeholder='Doe' id='LastNameInput' className='p-2 w-full outline-none border-none' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="emailInput" className='text-[#21272A]'>Email</label>
                    <input type="text" placeholder='JohnDoe@hotmail.com' className='w-full p-2 outline-none border-none' id='emailInput' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="emailInput" className='text-[#21272A]'>Password</label>
                    <input type="password" placeholder='********' className='w-full p-2 outline-none border-none' id='passwordInput' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <p className='text-sm text-gray-500'>Must contain at least 8 characters including one special character</p>
                </div>
                <div className='flex flex-row gap-2 w-full justify-center items-center'>
                    <input checked={checked} onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" id="termsAgreeCheck" />
                    <label htmlFor="termsAgreeCheck" className='text-[#21272A]'>Agree to our <Link href="/" className='underline'>Terms and Conditions</Link></label>
                </div>
                <div>
                    <button type="submit" className='bg-green-500 text-white w-full p-2 hover:bg-green-600 transition'>Create Account</button>
                </div>
                <span className='h-[1px] bg-gray-200 mt-2 w-full'/>
                <div className='flex justify-center items-center text-blue-700 underline'>
                    <Link href="/login">Already have an account?</Link>
                </div>
            </div>
        </form>
    </div>
    </div>
  )
}
