import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Configurer Firebase
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

export default async function handler(req, res) {
  try {
    // Récupérer la référence de la collection
    const factsCollection = collection(db, 'facts');

    // Récupérer les documents de la collection
    const snapshot = await getDocs(factsCollection);

    // Traitement des données
    const factsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("from api " + factsData)
    // Faire quelque chose avec les données
    res.status(200).json({ factsData })
  } catch (error) {
    console.error('Erreur lors de la récupération des données Firestore:', error);
    res.status(501).json({ name: 'Erreur data fetch' })
  }
}
