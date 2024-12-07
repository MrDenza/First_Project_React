import { FB_DB } from "./firebase";
import { ref, set, onValue, child, get, update /*push, runTransaction, increment*/ } from "firebase/database";

export function decoderErrors(error) {
    let decodedErr = error;
    switch (error) {
        case "auth/email-already-in-use":
            decodedErr = "Эл. почта уже используется!";
            break;
        case "auth/user-not-found":
            decodedErr = "Такой пользователь не найден!";
            break;
        case "auth/user/disabled":
            decodedErr = "Пользователь заблокирован!";
            break;
        case "auth/invalid-credential":
            decodedErr = "Неверный email или пароль!";
            break;
        case "auth/network-request-failed":
            decodedErr = "Проблемы с соединением! Повторите попытку позже.";
            break;
        default:
            break;
    }
    return decodedErr;
}

export const getData = async (link) => {
    try {
        const dbRef = ref(FB_DB);
        const snapshot = await get(child(dbRef, link));

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Ошибка при получении данных:", error.message);
        return null;
    }
};

export const getSelectData = async (link) => {
    try {
        const dbRef = ref(FB_DB, link);
        onValue(dbRef, (snapshot) => {
            // слушатель обновления данных на сервере
            // данные "есть"
            let data = snapshot.val();
            console.log(data);
            return data;
        });
    } catch (error) {
        console.log(error.message);
        return null;
        //throw error
    }
};

export const setData = async (link, newElem) => {
    try {
        const dbRef = ref(FB_DB, link);
        await set(dbRef, newElem).then(() => {
            // данные записаны
            return true;
        });
    } catch (error) {
        console.log(error.message);
        return null;
        //throw error
    }
};

export const removeData = async (link) => {
    //firebase.database().ref('clients').remove()
    try {
        const dbRef = ref(FB_DB);
        const updates = {};
        updates[link] = null;
        await update(dbRef, updates).then(() => {
            // данные удалены
            return true;
        });
    } catch (error) {
        console.log(error.message);
        return null;
        //throw error
    }
};

export const updateData = async (link, updateElem) => {
    try {
        const dbRef = ref(FB_DB);
        const updates = {};
        updates[link] = updateElem;
        await update(dbRef, updates).then(() => {
            // данные обновлены
            return true;
        });
    } catch (error) {
        console.log(error.message);
        return null;
        //throw error
    }
};
