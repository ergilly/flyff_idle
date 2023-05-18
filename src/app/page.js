'use client'
import React from 'react'
import firebase_app from "../firebase/config";
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import addData from "@/firebase/firestore/addData";

export default function Home() {
  const auth = getAuth(firebase_app);
  const router = useRouter()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // return router.push("/dashboard")
      console.log("logged in");
      // ...
    } else {
      // User is signed out
      console.log("logged out");
      // ...
    }
  });
  
  const handleClick = function() {
    return router.push("/signin")
  }

    return (
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fog_flyff-transformed.jpg?alt=media&token=574c202d-d695-4481-85bd-8fcdb197fb79')] bg-no-repeat bg-cover bg-center">
        <button onClick={handleClick} type="button" className="place-self-center rounded-md w-40 bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Play Now!</button>
      </div>
    )
}
