'use client'
import React from "react";
import resetPassword from "@/firebase/auth/passwordReset";
import { useRouter } from 'next/navigation'

function Page() {
    const [email, setEmail] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await resetPassword(email);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/signin")
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fog_flyff-transformed.jpg?alt=media&token=574c202d-d695-4481-85bd-8fcdb197fb79')] bg-no-repeat bg-cover bg-center">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white bg-opacity-90 px-6 py-6 shadow sm:rounded-lg sm:px-12">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Password reset</h2>
                    </div>
                    <form onSubmit={handleForm} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send password reset email</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;