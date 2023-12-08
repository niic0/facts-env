"use client"
import { useState, useRef, useEffect } from "react"

import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";


// import required modules
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyB0yH4X_VyAC-pgddRuRH-ILd1wLncWEng",
    authDomain: "angrynerds-b28a8.firebaseapp.com",
    projectId: "angrynerds-b28a8",
    storageBucket: "angrynerds-b28a8.appspot.com",
    messagingSenderId: "254997843968",
    appId: "1:254997843968:web:b1d93e150921cb7f55c8e5",
    measurementId: "G-J3ESB1M2K7"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Fonction pour ajouter une structure "fact" à la collection "facts"
const addFactToFirestore = async (fact) => {
    const factsCollection = collection(db, 'facts');

    try {
        // Ajoutez un document à la collection "facts"
        const docRef = await addDoc(factsCollection, fact);
        console.log('Document ajouté avec l\'ID:', docRef.id);
        return docRef.id; // Retournez l'ID du document ajouté
    } catch (error) {
        console.error('Erreur lors de l\'ajout du document Firestore:', error);
        return null;
    }
};

export default function Page() {
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    const router = useRouter();
    const handleRefresh = () => {
      router.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDone(false)
        setLoading(true)
        const factData = {
            fact: e.target[0].value,
            explanation: e.target[1].value,
            source: e.target[2].value,
            true: e.target[3].value,
            nbrClick: "0"
        }
        addFactToFirestore(factData)
        addFactToFirestore(false)
        setLoading(false)
        setDone(true)
    }

    return (
        <div className="p-6 md:w-4/5 mx-auto">
            <div className="font-bold text-3xl">Ajouter un Fact</div>
            <Link className="font-bold text-neutral-600 hover:text-neutral-900 transition mt-5" href="/admin">Retourner à la page d&apos;administration</Link>
            <div className="bg-white border mt-4 drop-shadow-xl p-3 rounded-xl">
                <form onSubmit={(e) => handleSubmit(e)} className="w-full mt-5">
                    <div className="space-y-4">
                        <div>
                            <div className="font-bold text-neutral-600">Fact</div>
                            <textarea required className="border rounded-md w-full p-2" name="" id="" rows="7"></textarea>
                        </div>
                        <div>
                            <div className="font-bold text-neutral-600">Explication</div>
                            <textarea required className="border rounded-md w-full p-2" name="" id="" rows="7"></textarea>
                        </div>
                        <div>
                            <div className="font-bold text-neutral-600">Source</div>
                            <input required placeholder="https://source.fr" className="border rounded-md w-full p-2"></input>
                        </div>
                        <div>
                            <div className="font-bold text-neutral-600">Bonne réponse</div>
                            <select className="bg-white border rounded-lg px-2 py-1" id="correctAnswer" name="correctAnswer" required>
                                <option value="0">Faux</option>
                                <option value="1">Vrai</option>
                            </select>
                        </div>
                    </div>

                    <button className="font-bold text-blue-800 bg-blue-200 rounded-lg px-2 py-1 mt-3 transition hover:bg-blue-300">Mettre en ligne</button>
                    {loading ?
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> : ""}
                    {done ? 
                        <div>
                            <div className="font-bold text-green-500 mt-2">Fact posté avec succès !</div>
                            <button onClick={handleRefresh} className="underline hovre:no-underline">
                                Poster un autre fact
                            </button>
                        </div>
                        : ""}
                </form>
            </div>
        </div>
    )
}