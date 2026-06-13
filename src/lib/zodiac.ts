const ANIMALS = [
  "Rata",
  "Buey",
  "Tigre",
  "Conejo",
  "Dragón",
  "Serpiente",
  "Caballo",
  "Cabra",
  "Mono",
  "Gallo",
  "Perro",
  "Cerdo",
] as const;

const ANIMAL_TRAITS: Record<string, string> = {
  Rata: "Ingenioso, ágil y siempre con un ojo puesto en la oportunidad.",
  Buey: "Trabajador, honesto y de paso firme.",
  Tigre: "Valiente, apasionado y con un carisma imposible de ignorar.",
  Conejo: "Amable, elegante y con buen gusto en todo.",
  Dragón: "Carismático, ambicioso y con suerte de sobra.",
  Serpiente: "Sabio, intuitivo y misterioso.",
  Caballo: "Libre, enérgico y aventurero.",
  Cabra: "Creativo, tranquilo y de buen corazón.",
  Mono: "Inteligente, curioso y muy divertido.",
  Gallo: "Puntual, observador y de gran confianza.",
  Perro: "Leal, justo y siempre dispuesto a ayudar.",
  Cerdo: "Generoso, optimista y amante de la buena mesa (¡como el chifa!).",
};

const ELEMENTS = ["Metal", "Agua", "Madera", "Fuego", "Tierra"] as const;

export type ChineseZodiac = {
  animal: string;
  element: string;
  trait: string;
};

/**
 * Approximates the Chinese zodiac year using the Lichun (~Feb 4) cutoff,
 * since the lunar new year date varies year to year.
 */
export function getChineseZodiac(year: number, month: number, day: number): ChineseZodiac {
  let zodiacYear = year;
  if (month === 1 || (month === 2 && day < 4)) {
    zodiacYear -= 1;
  }

  const animalIndex = (((zodiacYear - 4) % 12) + 12) % 12;
  const elementIndex = (((Math.floor((zodiacYear - 4) / 2)) % 5) + 5) % 5;

  const animal = ANIMALS[animalIndex];

  return {
    animal,
    element: ELEMENTS[elementIndex],
    trait: ANIMAL_TRAITS[animal],
  };
}
