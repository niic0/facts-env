import { useEffect, useState } from "react"
import CardFront from "@/components/CardFont"
import CardBack from "@/components/CardBack"

import NextQuestionButton from "@/components/NextQuestionButton";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


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

export default function Home() {
  const[facts, setFacts] = useState()
  const swiper = useSwiper();

  useEffect(() => {
    async function fetchData() {
      const dataFetchRes = await fetchDataFromFirestore()
      setFacts(dataFetchRes)
    }
    fetchData()
  }, [])

  const [indexQuestion, setIndexQuestion] = useState(0)
  const [responseClicked, setResponseClicked] = useState(false)

  return (
    <main className="bg-gradient-to-r from-[#087685] to-[#4CAA7F] w-full h-screen">
      <div className="flex items-center justify-center h-screen">
        <div className="mx-auto w-[26rem] h-screen">
          <Swiper
            direction={'vertical'}
            className="h-screen"
          >
            {facts?.map(fact =>
              <SwiperSlide
                key={fact.id}
                spaceBetween={30}
                className="h-[600px] !flex !items-center"
                slidersPerView={2}
              >
                <Swiper
                  effect={'flip'}
                  grabCursor={true}
                  modules={[EffectFlip]}
                  loop={true}
                  className="h-[600px] w-96 my-auto !flex !items-center"
                >
                  <SwiperSlide className="w-96 h-[600px]">
                    <CardFront fact={fact} setResponseClicked={setResponseClicked} />
                  </SwiperSlide>
                  <SwiperSlide className="w-96 h-[600px]">
                    <CardBack fact={fact} indexQuestion={indexQuestion} setIndexQuestion={setIndexQuestion} setResponseClicked={setResponseClicked} />
                  </SwiperSlide>
                </Swiper>
                <NextQuestionButton />
              </SwiperSlide>
            )}

          </Swiper>
        </div>
      </div>

    </main>
  )
}