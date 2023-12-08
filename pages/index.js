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
  const swiper = useSwiper();
  /*
  const [facts, setFacts] = useState()

  useEffect(() => {
    async function fetchData() {
      const dataFetchRes = await fetchDataFromFirestore()
      setFacts(dataFetchRes)
    }
    fetchData()
  }, [])
  */

  const facts = [
    {
      "fact": "Depuis plus d’un siècle, les activités humaines ont modifié la composition de l’atmosphère, entraînant un changement climatique inédit à l’échelle planétaire.",
      "explanation": "Le réchauffement climatique est induit par les activités humaines, modifiant ainsi l'atmosphère.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Le réchauffement climatique est uniquement dû à des facteurs naturels.",
      "explanation": "Contrairement à cette affirmation, le GIEC souligne que les activités humaines sont la principale cause du réchauffement climatique actuel.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La vapeur d’eau est un gaz à effet de serre naturellement présent dans l’atmosphère et contribue à maintenir une température moyenne sur Terre de 15 °C.",
      "explanation": "La vapeur d'eau est un gaz à effet de serre naturel et fait partie des éléments qui régulent la température sur Terre.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les gaz à effet de serre sont seulement nocifs pour la planète.",
      "explanation": "Bien que les gaz à effet de serre contribuent au réchauffement climatique, ils ont également un rôle naturel dans le maintien de la température sur Terre.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Le dioxyde de carbone (CO2) reste présent dans l’atmosphère jusqu’à 1 000 ans, tandis que le méthane (CH4) persiste pendant environ une décennie.",
      "explanation": "Les différents gaz à effet de serre ont des durées de persistance différentes dans l'atmosphère.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Le réchauffement climatique n'est pas du tout dû à l'activité humaine.",
      "explanation": "L'activité humaine, notamment l'utilisation des combustibles fossiles, est identifiée comme la principale cause du réchauffement climatique.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Depuis le début de l’ère industrielle (1850), l’utilisation accrue de combustibles fossiles a renforcé l’effet de serre naturel.",
      "explanation": "L'utilisation croissante de combustibles fossiles a contribué à l'augmentation des concentrations de gaz à effet de serre.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La température moyenne de la Terre n'a jamais augmenté aussi rapidement au cours des 2 000 dernières années.",
      "explanation": "Le réchauffement actuel est sans précédent au cours des derniers millénaires.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les États-Unis représentent à eux seuls 20,3 % des émissions territoriales de dioxyde de carbone depuis 1850.",
      "explanation": "Certains pays, comme les États-Unis, ont contribué de manière significative aux émissions de gaz à effet de serre.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les pays les moins contributeurs aux émissions de gaz à effet de serre sont également les moins vulnérables aux risques climatiques.",
      "explanation": "Malgré une faible contribution aux émissions, certains pays pauvres sont parmi les plus vulnérables aux impacts du changement climatique.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Un risque climatique n'est pas indépendant d'un enjeu exposé.",
      "explanation": "Le texte souligne que le risque découle de l'association entre l'aléa climatique (phénomène naturel potentiellement dangereux) et un enjeu exposé (personnes, biens et activités susceptibles d'être inondés).",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Un risque climatique dépend d'un enjeu exposé et vulnérable.",
      "explanation": "Bien que l'enjeu exposé soit important, le risque climatique dépend également de l'aléa climatique lui-même, comme l'intensité des pluies entraînant la crue et les inondations.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Pour un aléa donné, plus l'enjeu exposé est vulnérable, plus le risque est important.",
      "explanation": "Le texte mentionne que la vulnérabilité de l'enjeu exposé face à un danger d'inondation affecte l'importance du risque.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Un aléa climatique ne génère pas toujours un risque.",
      "explanation": "Le texte explique que le risque n'existe que s'il y a des enjeux exposés, et il peut y avoir des aléas climatiques sans risque s'il n'y a pas d'enjeux vulnérables.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Un aléa n'est pas dépendant de l'enjeu exposé.",
      "explanation": "L'aléa climatique est lié à la probabilité d'un phénomène naturel potentiellement dangereux, mais il devient un risque en fonction de la présence d'enjeux exposés.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Le changement climatique a des effets sur les aléas climatiques.",
      "explanation": "Le texte indique que le changement climatique peut modifier la fréquence et l'intensité des événements extrêmes climatiques.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "L'élévation du niveau moyen des océans a augmenté de 20 cm entre 1901 et 2018.",
      "explanation": "Le texte précise que le niveau moyen des océans a augmenté de 20 cm entre 1901 et 2018 selon le GIEC.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Le changement climatique a des effets sur les aléas climatiques, potentielles sources de danger pour les populations et les biens exposés et vulnérables.",
      "explanation": "Le texte met en évidence que le changement climatique peut aggraver les aléas climatiques, devenant ainsi des sources de danger.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "L'augmentation des températures moyennes entraîne une diminution de la fréquence des canicules.",
      "explanation": "Le texte indique que l'augmentation des températures moyennes se traduit par des canicules plus fréquentes et plus intenses.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Le changement climatique modifie la fréquence et l'intensité des canicules, des sécheresses et des inondations.",
      "explanation": "Le texte mentionne que le changement climatique a des effets sur la fréquence et l'intensité des canicules, sécheresses et inondations à l'échelle mondiale.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Près de 80 % des populations d’insectes auraient disparu en Europe depuis 30 ans, principalement dans les régions touchées par le réchauffement climatique et l’agriculture intensive.",
      "explanation": "En effet, des études ont montré une disparition importante des populations d'insectes en Europe au cours des dernières décennies, principalement attribuable au réchauffement climatique et à l'agriculture intensive.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La pie-grièche à poitrine rose, bien qu'ayant bénéficié d’une protection totale en France, a disparu en raison de la dégradation de son habitat et du changement climatique.",
      "explanation": "Effectivement, malgré les mesures de protection, la disparition de la pie-grièche à poitrine rose est attribuée à la dégradation de son habitat et aux changements climatiques.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La disparition d'espèces peu connues est moins préoccupante que celle d'animaux populaires comme l'ours blanc et le rhinocéros.",
      "explanation": "Contrairement à cette affirmation, la disparition d'espèces moins connues est tout aussi grave, car elle peut perturber l'équilibre des écosystèmes.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Sur environ 150 000 espèces étudiées, 41 000 sont menacées selon la Liste rouge mondiale des espèces menacées publiée en 2022 par l'UICN.",
      "explanation": "En effet, la Liste rouge de l'UICN montre que de nombreuses espèces sont menacées dans le monde, soulignant l'étendue de la crise de la biodiversité.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "L'inventaire des mammifères et des oiseaux montre que nous connaissons la totalité des espèces d'insectes, de champignons et de plantes à fleurs.",
      "explanation": "Contrairement à cette affirmation, nous ne connaissons pas le nombre exact d’espèces animales et végétales, en particulier celles telles que les insectes, champignons, et micro-organismes.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les forêts tempérées de métropole, tout comme les forêts tropicales d’outre-mer, subissent les effets de la crise de la biodiversité.",
      "explanation": "En effet, les effets de la crise de la biodiversité touchent divers types de forêts, qu'elles soient tempérées ou tropicales, en métropole ou outre-mer.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Le changement climatique n'est pas du tout lié au déclin de la biodiversité.",
      "explanation": "Contrairement à cette affirmation, le changement climatique est l'une des causes du déclin de la biodiversité, avec des impacts sur les écosystèmes à travers des phénomènes tels que les sécheresses, les canicules, et les incendies.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La surexploitation des espèces, comme l'exploitation intensive du cacao en Côte d'Ivoire, contribue à l'érosion de la biodiversité.",
      "explanation": "En effet, des exemples comme la surexploitation du cacao en Côte d'Ivoire montrent comment l'activité humaine peut entraîner une perte massive de biodiversité.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les émissions de CO2 sont la principale cause de l'acidification des océans, absorbant environ 25% des émissions anthropiques totales depuis les années 1980.",
      "explanation": "L'absorption du dioxyde de carbone par les océans entraîne une réaction chimique qui diminue le pH de l'eau, provoquant l'acidification.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La deuxième cause majeure d'acidification est liée aux activités agricoles, émettant des composés azotés tels que le N2O dans l'atmosphère.",
      "explanation": "Bien que les activités agricoles contribuent, les émissions de CO2 restent la principale source d'acidification, suivies de près par l'agriculture.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La variation actuelle du pH des océans en moins de 200 ans, de 8.2 à 8.1, représente une hausse de 30% de l'acidité.",
      "explanation": "L'échelle logarithmique du pH signifie qu'une différence de 0.1 unité équivaut à une augmentation d'acidité de 30%, ce qui souligne l'impact significatif en peu de temps.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La diminution du pH des océans est observée de manière cohérente dans sept endroits du monde au cours des dernières décennies.",
      "explanation": "Les données provenant de différentes régions confirment une tendance à la baisse du pH, indiquant une acidification mondiale des océans.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les changements actuels dans le système carbonaté marin sont sans précédent au cours des 65 derniers millions d'années.",
      "explanation": "Bien que des variations aient eu lieu par le passé, l'ampleur rapide des changements actuels est inédite sur une échelle temporelle récente.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les océans absorbent du dioxyde de carbone, augmentant leur acidité, mesurée grâce à des carottes de glace, des coraux et d'autres \"proxies\" pour remonter jusqu'à un million d'années en arrière.",
      "explanation": "Les méthodes indirectes, telles que l'analyse des archives naturelles, permettent de retracer l'histoire de l'acidification bien au-delà des mesures directes.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les conséquences de l'acidification touchent la vie marine, entraînant des impacts sur la régulation énergétique des organismes et la sensibilité des coquilles calcaires.",
      "explanation": "Les espèces marines, en particulier celles à coquille, subissent des changements dans leur métabolisme et leur structure en raison de l'acidification.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les méthodes de géo-ingénierie ne résolvent pas l'acidification des océans, car elles n'abordent pas la cause fondamentale, l'augmentation du CO2 atmosphérique.",
      "explanation": "Les solutions technologiques visant à limiter le réchauffement ne traitent pas directement l'acidification, soulignant la nécessité de réduire les émissions de CO2.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les communautés dépendantes des océans, en particulier les petites îles, les régions polaires et les zones côtières, sont plus exposées aux changements de l'océan.",
      "explanation": "Les populations qui dépendent étroitement des ressources marines sont plus vulnérables aux conséquences de l'acidification, accentuant les inégalités.",
      "true": 1,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La disparition des récifs coralliens compromettra non seulement la biodiversité mais aussi le tourisme, la sécurité alimentaire et la protection des côtes pour les populations les plus pauvres.",
      "explanation": "En plus des impacts écologiques, la disparition des récifs coralliens a des répercussions économiques et sociales majeures, affectant divers secteurs.",
      "true": 0,
      "source": "https://climat.cned.fr/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "En France, les émissions de gaz à effet de serre des voitures électriques sont de 2 à 5 fois plus faibles que celles des voitures thermiques (essence ou diesel), selon 10 études compilées sur une période de 10 ans.",
      "explanation": "Les résultats  des analyses de cycle de vie montrent que, globalement, la voiture électrique a un impact climatique nettement inférieur en France.",
      "true": 1,
      "source": "https://bonpote.com/la-voiture-electrique-solution-ideale-pour-le-climat/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les SUV électriques peuvent être plus émetteurs en raison de leur poids et de leur moins grande efficacité aérodynamique, mais l'électrification reste essentielle pour réduire les émissions globales des transports.",
      "explanation": "Bien que l'électrification des SUV puisse ne pas être aussi bénéfique que celle des véhicules plus légers, elle contribue toujours à réduire les émissions globales par rapport aux modèles thermiques équivalents.",
      "true": 1,
      "source": "https://bonpote.com/la-voiture-electrique-solution-ideale-pour-le-climat/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "L'électrification des voitures ne résout pas tous les problèmes liés à la voiture, tels que l'utilisation excessive d'espace, l'inactivité physique, l'accidentalité et les inégalités d'accès à la mobilité.",
      "explanation": "Bien que l'électrification réduise les émissions de gaz à effet de serre et les problèmes liés au pétrole, d'autres aspects négatifs de la voiture, tels que la consommation d'espace, l'inactivité physique et les inégalités d'accès à la mobilité, restent inchangés.",
      "true": 1,
      "source": "https://bonpote.com/la-voiture-electrique-solution-ideale-pour-le-climat/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "L'adoption généralisée de la voiture électrique ne nécessite que peu d'investissements dans les infrastructures de recharge existantes. Les batteries sont pratiquement indestructibles et ne présentent aucun défi majeur en termes de gestion des ressources ou de recyclage.",
      "explanation": "Pour une transition réussie vers la voiture électrique, des investissements considérables sont nécessaires pour développer un réseau de recharge robuste et étendu. De plus, il est impératif de perfectionner les méthodes de recyclage des batteries pour minimiser l'impact environnemental de leur production et de leur élimination en fin de vie.",
      "true": 0,
      "source": "https://bonpote.com/la-voiture-electrique-solution-ideale-pour-le-climat/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les émissions de CO2 sont la principale cause de l'acidification des océans, absorbant environ 25% des émissions anthropiques totales depuis les années 1980.",
      "explanation": "L'absorption du dioxyde de carbone par les océans entraîne une réaction chimique qui diminue le pH de l'eau, provoquant l'acidification.",
      "true": 1,
      "source": "https://bonpote.com/acidification-des-oceans-et-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La deuxième cause majeure d'acidification est liée aux activités agricoles, émettant des composés azotés tels que le N2O dans l'atmosphère.",
      "explanation": "Bien que les activités agricoles contribuent, les émissions de CO2 restent la principale source d'acidification, suivies de près par l'agriculture.",
      "true": 0,
      "source": "https://bonpote.com/acidification-des-oceans-et-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La variation actuelle du pH des océans en moins de 200 ans, de 8.2 à 8.1, représente une hausse de 30% de l'acidité.",
      "explanation": "L'échelle logarithmique du pH signifie qu'une différence de 0.1 unité équivaut à une augmentation d'acidité de 30%, ce qui souligne l'impact significatif en peu de temps.",
      "true": 0,
      "source": "https://bonpote.com/acidification-des-oceans-et-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La diminution du pH des océans est observée de manière cohérente dans sept endroits du monde au cours des dernières décennies.",
      "explanation": "Les données provenant de différentes régions confirment une tendance à la baisse du pH, indiquant une acidification mondiale des océans.",
      "true": 1,
      "source": "https://bonpote.com/acidification-des-oceans-et-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les changements actuels dans le système carbonaté marin sont sans précédent au cours des 65 derniers millions d'années.",
      "explanation": "Bien que des variations aient eu lieu par le passé, l'ampleur rapide des changements actuels est inédite sur une échelle temporelle récente.",
      "true": 0,
      "source": "https://bonpote.com/acidification-des-oceans-et-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les océans absorbent du dioxyde de carbone, augmentant leur acidité, mesurée grâce à des carottes de glace, des coraux et d'autres \"proxies\" pour remonter jusqu'à un million d'années en arrière.",
      "explanation": "Les méthodes indirectes, telles que l'analyse des archives naturelles, permettent de retracer l'histoire de l'acidification bien au-delà des mesures directes.",
      "true": 1,
      "source": "https://bonpote.com/acidification-des-oceans-et-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les conséquences de l'acidification touchent la vie marine, entraînant des impacts sur la régulation énergétique des organismes et la sensibilité des coquilles calcaires.",
      "explanation": "Les espèces marines, en particulier celles à coquille, subissent des changements dans leur métabolisme et leur structure en raison de l'acidification.",
      "true": 1,
      "source": "https://bonpote.com/acidification-des-oceans-et-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les méthodes de géo-ingénierie ne résolvent pas l'acidification des océans, car elles n'abordent pas la cause fondamentale, l'augmentation du CO2 atmosphérique.",
      "explanation": "Les solutions technologiques visant à limiter le réchauffement ne traitent pas directement l'acidification, soulignant la nécessité de réduire les émissions de CO2.",
      "true": 0,
      "source": "https://bonpote.com/acidification-des-oceans-et-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les communautés dépendantes des océans, en particulier les petites îles, les régions polaires et les zones côtières, sont plus exposées aux changements de l'océan.",
      "explanation": "Les populations qui dépendent étroitement des ressources marines sont plus vulnérables aux conséquences de l'acidification, accentuant les inégalités.",
      "true": 1,
      "source": "https://bonpote.com/acidification-des-oceans-et-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La disparition des récifs coralliens compromettra non seulement la biodiversité mais aussi le tourisme, la sécurité alimentaire et la protection des côtes pour les populations les plus pauvres.",
      "explanation": "En plus des impacts écologiques, la disparition des récifs coralliens a des répercussions économiques et sociales majeures, affectant divers secteurs.",
      "true": 0,
      "source": "https://bonpote.com/acidification-des-oceans-et-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Réduire les combustions d’énergies fossiles, que ce soit dans nos centrales, nos logements, nos usines ou nos véhicules, c’est réduire les polluants atmosphériques, (notamment les particules fines et le dioxyde d’azote) et donc améliorer la qualité de l’air.",
      "explanation": "La réduction des émissions de combustibles fossiles contribue effectivement à réduire la pollution atmosphérique, améliorant ainsi la qualité de l'air.",
      "true": 1,
      "source": "https://bonpote.com/tout-ce-qui-est-bon-ou-presque-pour-le-climat-est-bon-pour-la-sante/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Décarboner les transports en se reposant principalement sur l’électrification du parc automobile aurait certes un effet sur la qualité de l’air, mais elle passerait à côté des bénéfices potentiels que les transports actifs peuvent générer via l’activité physique qu’ils induisent.",
      "explanation": "Décarboner les transports, y compris l'électrification du parc automobile, peut avoir un impact positif sur la qualité de l'air en réduisant les émissions de polluants. Cependant, la déclaration selon laquelle cela passerait à côté des bénéfices potentiels des transports actifs est fausse, car ces deux approches peuvent coexister et offrir des avantages complémentaires.",
      "true": 0,
      "source": "https://bonpote.com/tout-ce-qui-est-bon-ou-presque-pour-le-climat-est-bon-pour-la-sante/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Réduire les apports carnés, la viande rouge en particulier, et faire plus de place aux produits d’origine végétale dans nos assiettes, c’est également adopter des régimes alimentaires plus sains, et réduire les risques de cancer ou de maladies cardio-vasculaires.",
      "explanation": "La réduction de la consommation de viande rouge au profit de produits d'origine végétale est associée à des régimes alimentaires plus sains et à une diminution des risques de maladies cardio-vasculaires et de cancer.",
      "true": 1,
      "source": "https://bonpote.com/tout-ce-qui-est-bon-ou-presque-pour-le-climat-est-bon-pour-la-sante/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les bénéfices sur le plan climatique de ces actions se feront ressentir à l’échelle de décennies, voire de siècles, certains points de non-retour déjà atteints (en ce qui concerne la fonte de la cryosphère notamment) font que même si nous cessions d’émettre du CO2, il n’y aura pas de retour à la normale.",
      "explanation": "Les bénéfices des actions climatiques, tels que la réduction des émissions de CO2, peuvent se faire sentir à court terme, contribuant à arrêter l'aggravation des problèmes climatiques. Cependant, certains effets, tels que la fonte de la cryosphère, ont déjà atteint des points de non-retour, ce qui signifie que même en cessant les émissions, il n'y aura pas de retour à la normale dans ces cas spécifiques.",
      "true": 0,
      "source": "https://bonpote.com/tout-ce-qui-est-bon-ou-presque-pour-le-climat-est-bon-pour-la-sante/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les politiques d'atténuation du réchauffement climatique généreraient des co-bénéfices de santé publique de grande ampleur, si bien qu’on pourrait presque considérer que ces politiques pourraient se justifier sur cette base seule, indépendamment de leurs bénéfices climatiques.",
      "explanation": "Les politiques visant à atténuer le réchauffement climatique peuvent avoir d'importants co-bénéfices pour la santé publique, ce qui peut justifier ces politiques même en dehors de leurs avantages climatiques. Ces co-bénéfices incluent des améliorations immédiates de la qualité de l'air et de la santé générale.",
      "true": 1,
      "source": "https://bonpote.com/tout-ce-qui-est-bon-ou-presque-pour-le-climat-est-bon-pour-la-sante/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Une canicule avec 50 degrés à Paris d’ici 2050 est une certitude selon le chercheur Fabio D’Andrea.",
      "explanation": "Fabio D'Andrea ne mentionne pas une certitude de 50 degrés à Paris d'ici 2050. Il aborde la probabilité d'augmentation des canicules en général.",
      "true": 0,
      "source": "https://bonpote.com/canicules-a-venir-des-etes-a-50-degres-en-france/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La canicule de 2003 était due à un phénomène de blocage météorologique provoqué par des hautes pressions persistantes.",
      "explanation": "La canicule de 2003 est expliquée comme un exemple de phénomène de blocage météorologique causé par des hautes pressions persistantes.",
      "true": 1,
      "source": "https://bonpote.com/canicules-a-venir-des-etes-a-50-degres-en-france/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les prévisions météo peuvent anticiper un pic de chaleur environ 5 à 7 jours à l’avance.",
      "explanation": "Les prévisions météo peuvent anticiper un pic de chaleur environ 5 à 7 jours à l’avance, même si des phénomènes complexes comme le blocage peuvent être plus difficiles à prévoir.",
      "true": 1,
      "source": "https://bonpote.com/canicules-a-venir-des-etes-a-50-degres-en-france/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La canicule de juillet 2019 en Europe aurait été cent fois moins probable sans changement climatique.",
      "explanation": "Un rapport de recherche conclut que la canicule de juillet 2019 aurait eu une période de retour environ cent fois plus élevée sans l'influence du changement climatique.",
      "true": 1,
      "source": "https://bonpote.com/canicules-a-venir-des-etes-a-50-degres-en-france/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les vagues de chaleur depuis 2000 sont devenues sensiblement plus nombreuses que celles de la période précédente.",
      "explanation": "Le graphique montre une augmentation significative de la fréquence des vagues de chaleur depuis le début du XXIe siècle par rapport à la période précédente.",
      "true": 1,
      "source": "https://bonpote.com/canicules-a-venir-des-etes-a-50-degres-en-france/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Une augmentation de 2 degrés de la température peut augmenter le risque de mortalité de 100%.",
      "explanation": "L'article mentionne que même une augmentation de 2 degrés peut doubler le risque de mortalité.",
      "true": 1,
      "source": "https://bonpote.com/canicules-a-venir-des-etes-a-50-degres-en-france/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les politiques françaises ont réagi efficacement à la canicule de 2003, évitant ainsi des milliers de morts.",
      "explanation": "L'article critique la réaction tardive des politiques à la canicule de 2003, entraînant des conséquences dramatiques.",
      "true": 0,
      "source": "https://bonpote.com/canicules-a-venir-des-etes-a-50-degres-en-france/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Le GIEC alerte sur le risque lié aux vagues de chaleur, mais note que des variations géographiques peuvent influencer les impacts.",
      "explanation": "Le GIEC souligne que les risques liés aux vagues de chaleur dépendent de facteurs géographiques, régionaux et saisonniers.",
      "true": 1,
      "source": "https://bonpote.com/canicules-a-venir-des-etes-a-50-degres-en-france/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "La fréquence des canicules en France devrait doubler d’ici à 2050, selon Météo-France.",
      "explanation": "Selon Météo-France, la fréquence des canicules en France devrait doubler d’ici à 2050.",
      "true": 1,
      "source": "https://bonpote.com/canicules-a-venir-des-etes-a-50-degres-en-france/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les îlots de chaleur urbain peuvent rendre les températures nocturnes en ville jusqu'à 10 degrés plus élevées qu'en zones rurales.",
      "explanation": "L'article mentionne que les îlots de chaleur urbain peuvent entraîner des différences de températures nocturnes jusqu'à 10 degrés entre les zones urbaines et rurales.",
      "true": 1,
      "source": "https://bonpote.com/canicules-a-venir-des-etes-a-50-degres-en-france/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Chaque année, les régions tropicales du globe sont le théâtre de près d’une centaine de tempêtes tropicales, dont la moitié évolue en cyclone. Heureusement, seule une quinzaine « atterrit », c’est-à-dire touche la terre. Les dégâts causés par ces derniers sont très souvent majeurs, avec un fort impact humain et économique.",
      "explanation": "Les régions tropicales sont en effet propices à la formation de tempêtes tropicales, et la distinction entre tempêtes, cyclones, typhons et ouragans dépend de la localisation géographique. Les dégâts causés par les cyclones peuvent être considérables.",
      "true": 1,
      "source": "https://bonpote.com/plus-de-cyclones-avec-le-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "En 2020, l’activité cyclonique a été également très faible. Aucun ouragan majeur n'a été enregistré, marquant une tendance à la baisse.",
      "explanation": "Contrairement à cette affirmation, en 2020, l'activité cyclonique a été très forte, et l'ouragan Laura, par exemple, a touché terre en catégorie 4, frôlant la catégorie 5, avec des vents soutenus de 240 km/h.",
      "true": 0,
      "source": "https://bonpote.com/plus-de-cyclones-avec-le-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "On observe une augmentation de l’activité des cyclones tropicaux dans l’Atlantique nord depuis les années 1970. Leur fréquence semble augmenter encore plus fortement dans les années 2000.",
      "explanation": "En effet, les données depuis les années 1970 montrent une augmentation de l'activité cyclonique dans l'Atlantique nord, avec des années particulièrement actives comme en 2005.",
      "true": 1,
      "source": "https://bonpote.com/plus-de-cyclones-avec-le-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "L'augmentation de l'activité cyclonique est principalement due au réchauffement climatique, et elle montre une tendance claire à la hausse.",
      "explanation": "Malgré l'observation d'une augmentation de l'activité cyclonique, il est souligné que d'autres facteurs, tels que le phénomène climatique \"La Niña\", peuvent influencer cette activité. Il est donc difficile de conclure à une tendance claire à la hausse.",
      "true": 0,
      "source": "https://bonpote.com/plus-de-cyclones-avec-le-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Dans le cinquième rapport du GIEC (2013), les experts estiment que les plus gros cyclones seront probablement plus puissants, avec des vents maximums plus élevés. Les précipitations liées aux systèmes cycloniques devraient être également plus intenses.",
      "explanation": "Les projections du GIEC indiquent effectivement que les plus gros cyclones seront plus puissants en termes de vents maximums et de précipitations.",
      "true": 1,
      "source": "https://bonpote.com/plus-de-cyclones-avec-le-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    },
    {
      "fact": "Les pertes (matérielles et humaines) dues aux cyclones devraient diminuer en raison des avancées dans les techniques de prévention et de protection.",
      "explanation": "Au contraire, avec l'urbanisation croissante des zones côtières et l'élévation du niveau de la mer, les dangers pour les populations et les infrastructures augmentent, contribuant à des pertes potentiellement plus importantes.",
      "true": 0,
      "source": "https://bonpote.com/plus-de-cyclones-avec-le-changement-climatique/",
      "nbrClick": 0,
      "correctAnswer": 0
    }
  ]

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
      </div>

    </main>
  )
}