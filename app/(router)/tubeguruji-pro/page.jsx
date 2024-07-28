"use client"
import { UserMemberContext } from '@/app/_context/UserMemberContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

function TubegurujiPro() {

    const [subscriptionId,setSubscriptionId]=useState(null)
    const [loader,setLoader]=useState(false);
    const {user}=useUser();
  const {isMember,setIsMember}=useContext(UserMemberContext)

    /**
     * To Create Subscription ID
     * @param {*} planId 
     */
    const createSubscription=async(planId)=>{
        setLoader(true)
        console.log(planId)
        axios.post("/api/create-subscription",JSON.stringify({
            plan_id:planId
        })).then(resp=>{
            console.log(resp.data);
            setLoader(false)
            setSubscriptionId(resp.data.id)
            
        })
    }

    useEffect(()=>{
        subscriptionId&&makePayment();
    },[subscriptionId])

    const makePayment=()=>{
        console.log(subscriptionId);
        const options={
            key:process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
            subscription_id:subscriptionId,
            name:'Tubeguruji Academy',
            description:'Tubeguruju Pro Membership',
            
            handler:async(resp)=>{
                console.log(resp);
                if(resp)
                {
                    addNewMember(resp?.razorpay_payment_id)
                }
            },
            theme:{
                color:'#7D41E1'
            }
        }

        const rzp=new window.Razorpay(options);
        rzp.open();
    }


    const addNewMember=(paymentId)=>{
        GlobalApi.addNewMember(user.primaryEmailAddress.emailAddress,
            paymentId).then(resp=>{
                console.log(resp);
                if(resp)
                {
                    toast('Payment Successfull!!!');
                }
            },(error)=>{
                toast('Some Error Happend');

            })
    }


    return (
        <div>
            <Script
            id="razorpay-checkout-js"
             src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="mx-auto max-w-3xl px-2 py-4 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">


                    <div
                        className="rounded-2xl border
                         border-gray-200 p-6
                         hover:border-primary cursor-pointer
                          bg-white shadow-sm sm:px-8 lg:p-12"
                    >
                        <div className="text-center">
                            <h2 className="text-lg font-medium text-gray-900">
                                პრემიუმი
                                <span className="sr-only"></span>
                            </h2>

                            <p className="mt-2 sm:mt-4" >
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    4.99$
                                </strong>

                                <span className="text-sm font-medium text-gray-700">/თვე</span>
                            </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-indigo-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> წვდომა ყველა კურსზე </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-indigo-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> უფასო დამატებითი რესურსები </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-indigo-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> უფასო წვდომა ვიდეო მასალაზე </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-indigo-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> 20 კანდიდატის რეგისტრაცია </span>
                            </li>
                        </ul>

                      {!isMember?  <button
                            onClick={()=>createSubscription(process.env.NEXT_PUBLIC_MONTHLY_PLAN)}
                            className="mt-8 block w-full rounded-full border
                              bg-primary px-12 py-3 
                             text-center text-sm font-medium
                             
                              text-white hover:ring-1 hover:ring-indigo-600
                               focus:outline-none focus:ring 
                               active:text-indigo-500"
                        >
                         {loader? <span className='text-center w-full'><Loader className='animate-spin'/></span>  
                          :<span>დაწყება</span>}
                        </button>:
                        <h2 className=' p-2 border rounded-full text-center mt-5
                        border-green-700 bg-green-300 text-green-700'>
                            მადლობთ რომ სარგებლობთ ჩვენი სერვისით</h2>}
                    </div>
                    <div
                        className="rounded-2xl border
                         border-gray-200 p-6
                          shadow-sm sm:px-8 lg:p-12
                          bg-white
                          hover:border-primary cursor-pointer
                          "
                    >
                        <div className="text-center">
                            <h2 className="text-lg font-medium text-gray-900">
                                წლიური პრემიუმი
                                <span className="sr-only"></span>
                            </h2>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    39.99$
                                </strong>

                                <span className="text-sm font-medium text-gray-700">/წელი</span>
                            </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-indigo-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> ქვიზებით და გემიფიკაცის დახმარებით კანდიდატების ტესტირება</span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-indigo-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> ვიდეო მასალის კანდიდატზე მორგების საშუალება </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-indigo-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> ულიმიტო კანდიდატების რეგისტრაცია</span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-indigo-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> ნებისმიერი სახის სასწავლო პროგრამის ინტეგრაცია </span>
                            </li>
                        </ul>

                        <button
                            onClick={()=>createSubscription(process.env.NEXT_PUBLIC_YEARLY_PLAN)}
                            className="mt-8 block rounded-full border
                              bg-primary px-12 py-3 
                             text-center text-sm font-medium
                              text-white hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        >
                             {loader? <span><Loader className='animate-spin'/></span>  
                          :<span>დაწყება</span>}
                        </button>
                    </div>
                </div>
            </div>
            <p className='text-center'>გახადე ნებისმიერი კანდიდატი კომპეტენტური
            <strong>AIskill</strong> საშუალებით.</p>
        </div>
    );
}

export default TubegurujiPro