import {
  IoFastFood,
  IoRestaurant,
  IoCafe,
  IoPizza,
  IoNutrition,
  IoCar,
  IoBus,
  IoAirplane,
  IoBicycle,
  IoWalk,
  IoHome,
  IoBed,
  IoWater,
  IoFlash,
  IoWifi,
  IoMedkit,
  IoFitness,
  IoBody,
  IoCart,
  IoBag,
  IoShirt,
  IoGameController,
  IoMusicalNotes,
  IoTicket,
  IoTv,
  IoSchool,
  IoBook,
  IoBriefcase,
  IoCash,
  IoCard,
  IoWallet,
  IoTrendingUp,
  IoPaw,
  IoGift,
  IoConstruct,
  IoShapes,
} from "react-icons/io5";

// Mapeo: Clave (String) -> Componente
export const CATEGORY_ICONS: Record<string, React.ElementType> = {
  // Comida
  food: IoFastFood,
  restaurant: IoRestaurant,
  coffee: IoCafe,
  pizza: IoPizza,
  grocery: IoNutrition,

  // Transporte
  car: IoCar,
  bus: IoBus,
  travel: IoAirplane,
  bike: IoBicycle,
  walk: IoWalk, // Integrado

  // Casa y Servicios
  home: IoHome,
  hotel: IoBed,
  water: IoWater,
  electricity: IoFlash,
  internet: IoWifi,

  // Salud
  health: IoMedkit,
  fitness: IoFitness,
  body: IoBody, // Integrado

  // Compras
  shopping: IoCart,
  bag: IoBag, // Integrado
  clothing: IoShirt,

  // Ocio
  gaming: IoGameController,
  music: IoMusicalNotes,
  movies: IoTicket,
  tv: IoTv, // Integrado

  // Educación y Trabajo
  education: IoSchool,
  book: IoBook, // Integrado
  work: IoBriefcase,

  // Dinero
  money: IoCash,
  bills: IoCard,
  wallet: IoWallet, // Reemplazo perfecto para ahorros/finanzas
  invest: IoTrendingUp,

  // Otros
  pets: IoPaw,
  gift: IoGift,
  services: IoConstruct,
  other: IoShapes,
};