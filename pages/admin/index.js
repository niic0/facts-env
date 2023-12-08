import { useEffect, useState } from "react";
import Link from "next/link";

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import Modal from "@/components/Modal";


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

const fetchDataFromFirestore = async () => {
    try {
        // Récupérer la référence de la collection
        const qcmCollection = collection(db, 'facts');

        // Récupérer les documents de la collection
        const snapshot = await getDocs(qcmCollection);

        // Traitement des données
        const qcmData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return qcmData
    } catch (error) {
        console.error('Erreur lors de la récupération des données Firestore:', error);
        return null
    }
};

// Fonction pour supprimer un document par son ID
const deleteDocument = async (documentId) => {
    try {
      const documentRef = doc(db, "facts", documentId);
      await deleteDoc(documentRef);
      console.log('Document supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression du document :', error);
    }
  };
  


export default function Page() {
    const [facts, setFacts] = useState()
    const [deleteModal, setDeleteModal] = useState(false)
    const [factId, setFactId] = useState()

    useEffect(() => {
        async function fetchData() {
            const dataFetchRes = await fetchDataFromFirestore()
            setFacts(dataFetchRes)
        }
        fetchData()
    }, [])

    return (
        <div className="p-6 md:w-4/5 mx-auto">
            <Modal openModal={deleteModal} setOpenModal={setDeleteModal}>
                Voulez vous vraiment supprimer ce Fact ?
                <button onClick={() => {deleteDocument(factId); setDeleteModal(false);}} className="mt-3 font-bold text-red-800 bg-red-200 rounded-md px-3 py-1 hover:bg-red-400 transition">Supprimer</button>
            </Modal>
            <div className="font-bold text-2xl text-neutral-700">
                Bienvenue sur la page d&apos;administration
            </div>

            <div className={`bg-white p-3 rounded-lg shadow-lg mt-10`}>
                <Link href="/admin/creer-fact" className="flex items-center space-x-2 justify-center w-fit text-md hover:bg-blue-400 transition font-bold px-3 py-2 rounded-xl bg-blue-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                    <div>Ajouter un Fact</div>
                </Link>

                <div className="overflow-auto h-[600px]">
                    <table className="table-auto w-full border-separate border-spacing-y-6">
                        <thead className="text-left text-neutral-500 sticky top-0 bg-white z-10 border-b-2 py-3">
                            <tr>
                                <th className="p-2">Fact</th>
                                <th className="p-2">Source</th>
                                <th className="p-2">Réponse</th>
                                <th className="p-2">Nombre de clics</th>
                                <th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {facts?.map((fact, key) =>
                                <tr key={key}>
                                    <td className="p-2 border-b">
                                        <div className="w-64 truncate font-bold">{fact.fact}</div>
                                    </td>
                                    <td className="p-2 border-b">
                                        <div className="w-64 truncate italic">{fact.source}</div>
                                    </td>
                                    <td className="p-2 border-b">{fact.true ?
                                        <div className="bg-green-200 text-green-800 px-2 text-center font-bold rounded-lg py-1">Vrai</div> :
                                        <div className="bg-orange-200 text-orange-800 px-2 text-center font-bold rounded-lg py-1">Faux</div>}
                                    </td>
                                    <td className="p-2 border-b ">{fact.nbrClick}</td>
                                    <td className="p-2 border-b flex space-x-3">
                                        <Link href={`/admin/forums/modifier-topic?topicid=${fact.id}`} className="bg-blue-200 text-blue-800 px-2 py-1 font-bold rounded-md hover:bg-blue-400 transition">Modifier</Link>
                                        <button onClick={() => { setDeleteModal(true); setFactId(fact.id) }} className="text-red-800 bg-red-200 px-2 py-1 font-bold rounded-md hover:bg-red-400 transition">Supprimer</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}