import { FB_DB, /*FB_AUTH*/ } from "./firebase";
import { ref, set, onValue, child, get,  update, /*push, runTransaction, increment*/} from "firebase/database";


export function decoderErrors(error) {
    let decodedErr = error;
    switch (error) {
        case "auth/email-already-in-use": 
            decodedErr = "Эл. почта уже используется!";
            break;
        case "auth/user-not-found": 
            decodedErr = "Такой пользователь не найден!"
            break;
        case "auth/user/disabled": 
            decodedErr = "Пользователь заблокирован!"
            break;
        case "auth/invalid-credential":
            decodedErr = "Неверный email или пароль!"
            break;
        default:
            break;
    }
    return decodedErr;
}

// ! Работа с AUTH


// ! Работа с DATABASE
// export const getData = async (link) => {
//     try {
//         const dbRef = ref(FB_DB);
//         await get(child(dbRef, link)).then((snapshot) => {
//             // реакция на "выполнено"
//             if (snapshot.exists()) {
//                 // данные "есть"
//                 let data = snapshot.val();
//                 console.log(data);
//                 return data;
//             } else {
//                 return null;
//             }
//         });
//     } catch (error) {
//         console.log(error.message)
//         return null;
//         //throw error
//     }
// };
export const getData = async (link) => {
    try {
        const dbRef = ref(FB_DB);
        const snapshot = await get(child(dbRef, link));

        if (snapshot.exists()) {
            // Если данные существуют, возвращаем их
            return snapshot.val();
        } else {
            // Если данных нет, возвращаем null
            return null;
        }
    } catch (error) {
        console.error("Ошибка при получении данных:", error.message);
        return null; // Или можно пробросить ошибку дальше
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
        await set(dbRef, newElem).then( () => {
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
        await update(dbRef, updates).then( () => {
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
        await update(dbRef, updates).then( () => {
            // данные обновлены
            return true;
        });
    } catch (error) {
        console.log(error.message);
        return null;
        //throw error
    }
}


















/*
import {collection, getDocs, addDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
const musicListCollectionRef = collection(FB_DB,'shoes')
//получение данных из базы
export const getData = (setData) => {
    getDocs(musicListCollectionRef)
        .then((res) => setData(res.docs.map(el => ({...el.data(), id:el.id}) )))
}


// export const getData = async (db_name) => {
//     await getDocs(collection(FB_DB, db_name)).then( (data) => { +
//         data.forEach( (doc) => {
//             console.log(`${doc.id} => ${doc.data()}`);
//         })
//     });
// } 


// обновление товара
export const updateProduct = (id, obj) => {
    const productDoc = doc(db, 'shoes', id)
    updateDoc(productDoc, obj)
}

// удаление товара
export const deleteProduct = (id) => {
    const productDoc = doc(db, 'shoes', id)
    deleteDoc(productDoc)
}

// создание товара
export const createProduct = (image, setProgress, data, setShoes) => {
    if (!image) return;
    const storageRef = ref(storage, image.name)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on("state_changed",
        (snapshot => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(prog)
        }),
        (err) => console.log(err),
        () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (url)=> {
                       await addDoc(musicListCollectionRef, {...data, image:url})
                       await getData(setShoes)
                    })
        })
}
*/