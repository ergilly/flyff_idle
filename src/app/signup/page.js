'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'

function Page() {
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(name, email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/characterSelect")
    }

    const handleSignin = () => {
        return router.push("/signin")
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fog_flyff-transformed.jpg?alt=media&token=574c202d-d695-4481-85bd-8fcdb197fb79')] bg-no-repeat bg-cover bg-center">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white bg-opacity-90 px-6 py-6 shadow sm:rounded-lg sm:px-12">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for Flyff Idle</h2>
                    </div>
                    <form onSubmit={handleForm} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Display name</label>
                            <div className="mt-2">
                                <input onChange={(e) => setName(e.target.value)} required type="text" name="username" id="username" placeholder="username" autoComplete="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
                        </div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?
                            <a onClick={handleSignin} href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in here!</a>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    // <div className="wrapper">
    //     <div className="form-wrapper">
    //         <h1 className="mt-60 mb-30">Sign up</h1>
    //         <form onSubmit={handleForm} className="form">
    //             <label htmlFor="name">
    //                 <p>Display Name</p>
    //                 <input onChange={(e) => setName(e.target.value)} required type="name" name="name" id="name" placeholder="name" />
    //             </label>
    //             <label htmlFor="email">
    //                 <p>Email</p>
    //                 <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
    //             </label>
    //             <label htmlFor="password">
    //                 <p>Password</p>
    //                 <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
    //             </label>
    //             <button type="submit">Sign up</button>
    //         </form>
    //     </div>
    // </div>
    );
}

export default Page;