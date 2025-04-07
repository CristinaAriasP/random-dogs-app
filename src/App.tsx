import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { DogCard } from './components/DogCard.tsx'
import { getBreeds, getRandomDogImage } from './services/dogs.service.ts'

export interface Dog {
  imgUrl: string;
  likes: number;
  dislikes: number;
}

function App() {
  // const [counter, setCounter] = useState(0);
  const [breed, setBreed] = useState('');
  const [name, setName] = useState('');
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [dogList, setDogList] = useState<Dog[]>([
    {
      imgUrl: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      likes: 0,
      dislikes: 0,
    },
  ]);

  useEffect(() => {
    const fetchAllBreeds = async () => {
      const breeds = await getBreeds();
      if (breeds) {
        setAllBreeds(breeds);
      }
    };
    fetchAllBreeds();
  }, []);

  console.log(setDogList)

  const handleAddDogClick  = async () => {
    console.log('Botón clickado');
    const dog = await getRandomDogImage(breed);
   if (dog)  {
    setDogList([...dogList,  
      {
      imgUrl: dog?.imgUrl,
      likes: dog.likeCount,
      dislikes: dog.dislikeCount,
    }
    ]);
   }
  };

  const handleBreedChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBreed(event.target.value);
  };

const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
  setName(event.target.value)
}

  return (
    <>
      <h1>Votalperrico 🐶</h1>
      <div>
        <input placeholder='Nombre del perrico' value={name} onChange={handleNameChange}/>
        <div className='breed-picker'>
          Selecciona la raza de perro que quieras añadir 
          <select value={breed} onChange={handleBreedChange} className='breed-selection'>
          {allBreeds.map((breed) => (
            <option value={breed}>{breed}</option>
          ))}
          </select>
        </div>
      </div>
      <button id="add-1-perrico" onClick={(handleAddDogClick)}>Añadir 1 perrico al final</button>
      <button id="add-1-perrico-start">Añadir 1 perrico al principio</button>
      <button id="add-5-perricos">Añadir 5 perricos más</button>
      <div className="filters">
        <span> Filter by: </span>
        <button id="like-filter">Preciosisimos ❤️</button>
        <button id="dislike-filter">Feísimos 🤮</button>
      </div>

      <DogCard dogList={dogList} />
    </>
  );
}

export default App
