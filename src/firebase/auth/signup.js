import firebase_app from "../config";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, getAuth } from "firebase/auth";
import addData from "@/firebase/firestore/addData";

const auth = getAuth(firebase_app);

export default async function signUp(name, email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser).catch((err) =>
            console.log(err)
        );    
        await updateProfile(auth.currentUser, { displayName: name }).catch(
            (err) => console.log(err)
        );
        const user = {displayName: name}
        const {res, error} = await addData('user', result.user.uid, user)
        if (error) {
          return console.log(error)
        }
    } catch (e) {
        error = e;
    }
    console.log(result);

    return { result, error };
}
