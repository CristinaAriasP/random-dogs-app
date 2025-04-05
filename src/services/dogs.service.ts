import { DogResponse } from "./model/Dogs";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  export async function getRandomDogImage(breed: string): Promise<DogResponse | undefined> {
    const url =
      breed === '' ? 'https://dog.ceo/api/breeds/image/random' : `https://dog.ceo/api/breed/${breed}/images/random`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json: {message: string; status: string} = await response.json();
  
      // TODO random breed
      return {
        id: Date.now() + Math.random(),
        breed,
        imgUrl: json.message,
        dislikeCount: getRandomInt(0, 2),
        likeCount: getRandomInt(0, 1)
      };
    } catch (error:any) {
      console.error(error.message);
    }

    return undefined;
  }

  export async function getBreeds(): Promise<string[] | undefined> {
    const url = 'https://dog.ceo/api/breeds/list/all';
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = (await response.json());
  
      return  Object.keys(json.message);
    } catch (error: any) {
      console.error(error.message);
    }
  }