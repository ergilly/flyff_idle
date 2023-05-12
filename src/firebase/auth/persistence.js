import firebase_app from "../config";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function setPersistence(checked) {
    console.log('hello');
    let result = null,
        error = null;
    try {
        checked ? result = await setPersistence(auth, inMemoryPersistence) : result = await setPersistence(auth, browserSessionPersistence)
    } catch (e) {
        error = e;
    }
    console.log(result);

    return { result, error };
}