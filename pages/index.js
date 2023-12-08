import { useEffect, useState } from "react"
import CardFront from "@/components/CardFont"
import CardBack from "@/components/CardBack"

import Image from "next/image"

import trueSvg from "@/public/true.svg"
import falseSvg from "@/public/false.svg"
import Swipefinale from "@/public/Swipefinale.png"

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
  const swiper = useSwiper();
  const [facts, setFacts] = useState()

  useEffect(() => {
    async function fetchData() {
      const dataFetchRes = await fetchDataFromFirestore()
      setFacts(dataFetchRes)
    }
    fetchData()
    setTutoVisible(true)
  }, [])

  const [indexQuestion, setIndexQuestion] = useState(0)
  const [responseClicked, setResponseClicked] = useState(false)
  const [tutoVisible, setTutoVisible] = useState(true)

  return (
    <main className="bg-gradient-to-r from-[#087685] to-[#4CAA7F] w-full h-screen">
      <div className="flex relative items-center justify-center h-screen">
        <div className="absolute top-10 right-0 -rotate-10 left-0">
          <Image className="mx-auto" width="270" alt="" src={Swipefinale} />
        </div>
        <div className={`${tutoVisible ? "opacity-1" : "opacity-0"} transition-all sm:absolute w-screen h-screen top-0 bottom-0 right-0 left-0`}>
          <div className="flex h-screen items-center justify-center space-x-[30rem]">
            <div className="">
              <Image alt="" src={falseSvg} />
            </div>
            <div className="">
              <Image alt="" src={trueSvg} />
            </div>
          </div>
        </div>

        {facts === undefined ?
          <div class="flex items-center justify-center">
            <button type="button" class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-neutral-800 bg-white transition ease-in-out duration-150 cursor-not-allowed" disabled="">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Chargment...
            </button>
          </div> :
          <div className="mx-auto w-[26rem] h-screen">
            <Swiper
              direction={'vertical'}
              className="h-screen"
              onSlideChange={() => setTutoVisible(false)}
            >
              {facts?.map(fact =>
                <SwiperSlide
                  key={fact.id}
                  spaceBetween={30}
                  className="md:h-[600px] h-[500px] !flex !items-center -ml-3"
                  slidersPerView={1}
                >
                  <Swiper
                    effect={'flip'}
                    grabCursor={true}
                    modules={[EffectFlip]}
                    loop={true}
                    className="md:h-[600px] h-[500px] md:w-96 w-[16rem] my-auto !flex !items-center"
                  >
                    <SwiperSlide className="md:w-96 w-[16rem] md:h-[600px] h-[500px]">
                      <CardFront fact={fact} setResponseClicked={setResponseClicked} />
                    </SwiperSlide>
                    <SwiperSlide className="md:w-96 w-[16rem] md:h-[600px] h-[500px]">
                      <CardBack fact={fact} indexQuestion={indexQuestion} setIndexQuestion={setIndexQuestion} setResponseClicked={setResponseClicked} />
                    </SwiperSlide>
                  </Swiper>
                  <NextQuestionButton />
                </SwiperSlide>
              )}

            </Swiper>
          </div>
        }
      </div>

    </main>
  )
}