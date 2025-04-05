import './DogCard.css'

interface Dog {
  imgUrl: string;
  likes: number;
  dislikes: number;
}

interface DogCardProps {
  dogList: Dog[];
}

export const DogCard = ({ dogList }: DogCardProps) => {
  return (
    <div className="dog-list">
      {dogList.map((dog, index) => (
        <div key={index} className="dog">
          <img src={dog.imgUrl} alt="Perro" />
          <br />
          <p className="dog-votes">
            <span className="like-count">{dog.likes}</span> ❤️
            <span className="dislike-count">{dog.dislikes}</span> 🤮
          </p>
          <div className="dog-actions">
            <button className="like">Preciosísimo</button>
            <button className="dislike">Feísisimo</button>
          </div>
        </div>
      ))}
    </div>
  );
};
