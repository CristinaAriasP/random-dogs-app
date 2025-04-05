import { useState } from 'react'
import './App.css'
import { DogCard } from './components/DogCard.tsx'
import { getRandomDogImage } from './services/add-dog.service.ts'

interface Dog {
  imgUrl: string;
  likes: number;
  dislikes: number;
}

function App() {
  // const [counter, setCounter] = useState(0);
  const [dogList, setDogList] = useState<Dog[]>([
    {
      imgUrl: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      likes: 0,
      dislikes: 0,
    },
  ]);

  console.log(setDogList)

  const handleClick  = async () => {
    console.log('Botón clickado');
    const dog = await getRandomDogImage('');
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

  return (
    <>
      <h1>Votalperrico 🐶</h1>

      <button id="add-1-perrico" onClick={(handleClick)}>Añadir 1 perrico al final</button>
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
