'use client'

import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Lock, Ticket, User, Settings, CreditCard, HelpCircle, LogOut } from "lucide-react"
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Page() {
    const [userData, setUserData] = useState<{ firstName: string; lastName: string; email: string } | null>(null)
    const [activeTab, setActiveTab] = useState("profile")
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [currentPassword2, setCurrentPassword2] = useState("")

    const [selectedIssue, setSelectedIssue] = useState("")
    const [supportText, setSupportText] = useState("")

    async function sendSupport(Event: React.FormEvent){
        try{
            Event.preventDefault()
            if(!selectedIssue || !supportText){
                return alert("Ensure you selected an issue and explained your issue.")
            }

            const { firstName, lastName, email } = userData;

            const response = await axios.post("/api/sendSupport", {
                supportType: selectedIssue,
                supportInfo: supportText
            })
            if(response.status === 201){
                alert("Ticket Sent!")
            }
        }catch(error){
            if(axios.isAxiosError(error) && error.response){
                alert(error.response.data.error)
            }else{
                alert("An error occurred. Please try again later")
                console.log(error)
            }
        }
    }

    async function logout(){
        try{
            const response = await axios.post("/api/logout", {

            })
            if(response.status === 201){
                router.push("/login")
            }
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.error)
            } else {
                alert("An error occurred. Please try again later")
            }
        }
    }

    async function deleteAccount(event: React.FormEvent) {
        try {
            event.preventDefault()
            const response = await axios.post("/api/deleteAccount", {
                currentPassword2
            })
            if (response.status === 201) {
                alert("User Deleted.")
                setShowDeleteAccountModal(false)
                router.push("/login")
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.error)
            } else {
                alert("An error occurred. Please try again later")
            }
        }
    }

    async function changePassword(event: React.FormEvent) {
        try {
            event.preventDefault()

            if (!newPassword || !currentPassword) {
                return alert("Please fill out both fields.")
            }

            if (!/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword)) {
                return alert("new password must be at least 8 characters long and contain at least one special character")
            }

            const response = await axios.post("/api/changePassword", {
                currentPassword,
                newPassword
            })
            if (response.status === 201) {
                setShowChangePasswordModal(false)
                return alert("Password updated successfully")

            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.error)
            } else {
                alert("An error occurred. Please try again later")
            }
        }
    }

    async function editProfile(event: React.FormEvent) {
        try {
            event.preventDefault();

            const updatedFirstName = firstName || userData.firstName;
            const updatedLastName = lastName || userData.lastName;
            const updatedEmail = email || userData.email;

            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(updatedEmail)) {
                return alert("Please enter a valid email.")
            }

            if (!updatedFirstName || !updatedLastName || !updatedEmail) {
                return alert("Fill out all fields.");
            }

            const response = await axios.post("/api/editProfile", {
                firstName: updatedFirstName,
                lastName: updatedLastName,
                email: updatedEmail,
            });

            if (response.status === 201) {
                return alert("Profile updated");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.error);
            } else {
                alert("An error occurred. Please try again later.");
            }
            console.log(error);
        }
    }


    const router = useRouter()

    useEffect(() => {
        axios.get("/api/getSession")
            .then(response => {
                if (response.data.firstName && response.data.lastName && response.data.email) {
                    setUserData(response.data)
                } else {
                    router.push('/login')
                }
            })
            .catch(error => {
                console.log("Error fetching session: ", error)
                router.push('/login')
            })
    }, [router])

    return (
        <div>
            {userData ? (
                <div className='flex h-screen'>
                    <div className='w-64 bg-[#41583E] text-white p-6 flex flex-col gap-4 justify-between'>
                        <div className='flex flex-col gap-4'>
                            <button onClick={() => router.push("/")} type='button' className='flex items-center gap-2 p-3 hover:bg-[#394e37] rounded'>
                                <IoMdArrowRoundBack size={18} /> Back Home
                            </button>
                            <button onClick={() => setActiveTab("profile")} type='button' className={`flex items-center gap-2 p-3 rounded ${activeTab === "profile" ? "bg-[#394e37]" : "hover:bg-[#394e37]"}`}>
                                <User size={18} /> Profile
                            </button>
                            <button onClick={() => setActiveTab("bookings")} type='button' className={`flex items-center gap-2 p-3 rounded ${activeTab === "bookings" ? "bg-[#394e37]" : "hover:bg-[#394e37]"}`}>
                                <Ticket size={18} /> Bookings
                            </button>
                            <button onClick={() => setActiveTab("billing")} type='button' className={`flex items-center gap-2 p-3 rounded ${activeTab === "billing" ? "bg-[#394e37]" : "hover:bg-[#394e37]"}`}>
                                <CreditCard size={18} /> Billing
                            </button>
                            <button onClick={() => setActiveTab("security")} type='button' className={`flex items-center gap-2 p-3 rounded ${activeTab === "security" ? "bg-[#394e37]" : "hover:bg-[#394e37]"}`}>
                                <Lock size={18} /> Security
                            </button>
                            <button onClick={() => setActiveTab("support")} type='button' className={`flex items-center gap-2 p-3 rounded ${activeTab === "support" ? "bg-[#394e37]" : "hover:bg-[#394e37]"}`}>
                                <HelpCircle size={18} /> Support
                            </button>
                        </div>
                        <div>
                            <button className='flex items-center gap-2 p-3 hover:bg-[#394e37] rounded w-full' type='button' onClick={logout}>
                                <LogOut className='text-red-500' size={18}/> Logout
                            </button>
                        </div>
                    </div>

                    <div className='flex-1 p-6 bg-[#D1D1D1]'>
                        {activeTab === "profile" && (
                            <div className='bg-white shadow-md rounded-lg p-6'>
                                <div className='flex items-center gap-4 mb-6'>
                                    <div>
                                        <h2 className='text-xl font-bold'>Welcome, {userData.firstName} {userData.lastName}</h2>
                                        <p className='text-sm text-gray-600'>{userData.email}</p>
                                    </div>
                                </div>
                                <div className='bg-[#F7F7F7] p-4 rounded-lg'>
                                    <h3 className='text-lg font-medium mb-3'>Account Settings</h3>
                                    <div className='flex gap-4 mb-3'>
                                        <button type='button' onClick={() => setShowEditProfileModal(true)} className='p-3 bg-green-500 text-white rounded hover:bg-green-600 transition'>Edit Profile</button>
                                        <button type='button' onClick={() => setShowChangePasswordModal(true)} className='p-3 bg-green-500 text-white rounded hover:bg-green-600 transition'>Change Password</button>
                                        <button type='button' onClick={() => setShowDeleteAccountModal(true)} className='p-3 bg-red-500 text-white rounded hover:bg-red-600 transition'>Delete Account</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "bookings" && (
                            <div className='bg-white shadow-md rounded-lg p-6'>
                                <div className='flex items-center gap-4 mb-6'>
                                    <h2 className='text-xl font-bold'>Your Bookings will be displayed here</h2>
                                </div>
                            </div>
                        )}
                        {activeTab === "billing" && (
                            <div className='bg-white shadow-md rounded-lg p-6'>
                                <div className='flex items-center gap-4 mb-6'>
                                    <h2 className='text-xl font-bold'>Your billing information will be displayed here</h2>
                                </div>
                            </div>
                        )}
                        {activeTab === "security" && (
                            <div className='bg-white shadow-md rounded-lg p-6'>
                                <div className='flex items-center gap-4 mb-6'>
                                    <h2 className='text-xl font-bold'>Your account security information will be displayed here</h2>
                                </div>
                            </div>
                        )}
                        {activeTab === "support" && (
                            <div className='bg-white shadow-md rounded-lg p-6'>
                            <div className='flex items-center gap-4 mb-6'>
                                <div>
                                    <h2 className='text-2xl font-bold text-gray-800'>Create a support ticket</h2>
                                    <p>Describe your issue so we can assist you better.</p>
                                </div>
                            </div>
                            <div className='bg-[#F7F7F7] p-6 rounded-lg'>
                                <div className='flex gap-4 mb-3'>
                                    <form onSubmit={sendSupport} className='flex flex-col space-y-4 w-96'>
                                        <div>
                                            <label htmlFor="issueSelect" className='block font-medium text-gray-700 mb-1'>Issue Type</label>
                                            <select id="issueSelect" className='w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none' value={selectedIssue} onChange={(e) => setSelectedIssue(e.target.value)}>
                                                <option value="" disabled>Select an issue</option>
                                                <option value="Technical">Technical Issue</option>
                                                <option value="Billing">Billing Issue</option>
                                                <option value="Account">Account Problem</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="supportInformation" className='block font-medium text-gray-700 mb-1'>Tell us more</label>
                                            <textarea id="supportInformation" placeholder='Describe your issue in detail...' className='w-full p-3 border border-gray-300 rounded-lg bg-white h-28 resize-none focus:outline-none' value={supportText} onChange={(e) => setSupportText(e.target.value)}/>
                                        </div>
                                        <div className='w-full flex justify-center items-center'>
                                            <button type="submit" className='bg-green-500 hover:bg-green-600 text-white p-2 transition w-full'>Send Ticket</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    {showEditProfileModal && (
                        <div className='fixed inset-0 bg-[black] bg-opacity-60 flex justify-center items-center z-50'>
                            <div className='bg-[#F7F7F7] p-10 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center gap-5 '>
                                <h3 className='text-2xl font-semibold'>Edit Profile</h3>
                                <form onSubmit={editProfile} className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <label htmlFor="firstNameInput">First Name: </label>
                                        <input type="text" id='firstNameInput' value={firstName} placeholder={userData.firstName} onChange={(e) => setFirstName(e.target.value)} className='w-full p-2' />
                                    </div>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <label htmlFor="firstNameInput">Last Name: </label>
                                        <input type="text" id='firstNameInput' value={lastName} placeholder={userData.lastName} onChange={(e) => setLastName(e.target.value)} className='w-full p-2' />
                                    </div>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <label htmlFor="firstNameInput">Email: </label>
                                        <input type="text" id='firstNameInput' value={email} placeholder={userData.email} onChange={(e) => setEmail(e.target.value)} className='w-full p-2' />
                                    </div>
                                    <div className='flex flex-row justify-center items-center gap-4'>
                                        <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded-xl'>Confirm</button>
                                        <button type='button' className='bg-red-500 text-white py-2 px-4 rounded-xl' onClick={() => setShowEditProfileModal(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    )}
                    {showChangePasswordModal && (
                        <div className='fixed inset-0 bg-[black] bg-opacity-60 flex justify-center items-center z-50'>
                            <div className='bg-[#F7F7F7] p-10 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center gap-5'>
                                <h3 className='text-2xl font-semibold'>Change Password</h3>
                                <form onSubmit={changePassword} className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <label htmlFor="currentPasswordInput">Current Password</label>
                                        <input type="password" placeholder="********" className='w-full p-2' id='currentPasswordInput' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                    </div>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <label htmlFor="newPasswordInput">New Password</label>
                                        <input type="password" placeholder="********" className='w-full p-2' id='newPasswordInput' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    </div>
                                    <div className='flex flex-row justify-center items-center gap-4'>
                                        <button type="submit" className='bg-green-500 text-white py-2 px-4 rounded-xl'>Confirm</button>
                                        <button type="button" className='bg-red-500 text-white py-2 px-4 rounded-xl' onClick={() => setShowChangePasswordModal(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {showDeleteAccountModal && (
                        <div className='fixed inset-0 bg-[black] bg-opacity-60 flex justify-center items-center z-50'>
                            <div className='bg-[#F7F7F7] p-10 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center gap-5'>
                                <h3 className='text-2xl font-semibold'>Delete Account</h3>
                                <p className='text-red-500'>Warning this action cannot be undone.</p>
                                <form onSubmit={deleteAccount} className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <label htmlFor="currentPasswordInput">Password</label>
                                        <input type="password" placeholder="********" className='w-full p-2' id='currentPasswordInput' value={currentPassword2} onChange={(e) => setCurrentPassword2(e.target.value)} />
                                    </div>
                                    <div className='flex flex-row justify-center items-center gap-4'>
                                        <button type="submit" className='bg-green-500 text-white py-2 px-4 rounded-xl'>Confirm</button>
                                        <button type="button" className='bg-red-500 text-white py-2 px-4 rounded-xl' onClick={() => setShowDeleteAccountModal(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

            ) : (
                <div className='bg-[#41583E] w-screen h-screen flex justify-center items-center'>
                    <h1 className='text-3xl text-white'>Redirecting...</h1>
                </div>
            )}
        </div>
    )
}