import { shuffle } from "lodash-es";
import { useState } from "react";
import "./App.css";

type ImagesProps = {
  images: string[];
};

type Image = {
  id: number;
  imageId: string;
  url: string;
};

function App() {
  return (
    <>
      <MemoryGame
        images={[
          "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
          "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
          "https://images.unsplash.com/photo-1520763185298-1b434c919102",
          "https://images.unsplash.com/photo-1442458017215-285b83f65851",
          "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
          "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
        ]}
      />
    </>
  );
}

// state initialize function

function MemoryGame({ images }: ImagesProps) {
  const [flippedImages, setFlippedImages] = useState<number[]>([]);
  const [matchedImages, setMatchedImages] = useState<number[]>([]);

  const [gameImages, setGameImages] = useState<Image[]>(() => {
    const duplicatedImages = [...images, ...images];
    const shuffledImages = shuffle(duplicatedImages);
    return shuffledImages.map((image, index) => ({
      id: index,
      imageId: `${image.slice(-6)}`,
      url: image,
    }));
  });

  const handleClick = (cardId: number) => {
    const newFlippedImages = [...flippedImages, cardId];
    setFlippedImages(newFlippedImages);

    // If this is the second card, check for a match
    if (newFlippedImages.length === 2) {
      const [firstId, secondId] = newFlippedImages;
      const firstCard = gameImages.find((img) => img.id === firstId);
      const secondCard = gameImages.find((img) => img.id === secondId);

      if (firstCard && secondCard) {
        if (firstCard.imageId === secondCard.imageId) {
          setMatchedImages([...matchedImages, firstId, secondId]);
          setFlippedImages([]);
        } else {
          setTimeout(() => {
            setFlippedImages([]);
          }, 1000);
        }
      }
    }
  };

  const handleRestart = () => {
    setGameImages(() => {
      const duplicatedImages = [...images, ...images];
      const shuffledImages = shuffle(duplicatedImages);
      return shuffledImages.map((image, index) => ({
        id: index,
        imageId: `${image.slice(-6)}`,
        url: image,
      }));
    });
    setFlippedImages([]);
    setMatchedImages([]);
  };

  return (
    <div>
      <h2>Memory Game</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {gameImages.map((image) => (
          <div key={image.id}>
            {flippedImages.includes(image.id) ||
            matchedImages.includes(image.id) ? (
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  margin: "5px",
                  borderRadius: "8px",
                  background: `url(${image.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ) : (
              <div
                onClick={() => handleClick(image.id)}
                style={{
                  width: "250px",
                  height: "250px",
                  margin: "5px",
                  backgroundColor: "gray",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
      {matchedImages.length === gameImages.length && (
        <button onClick={() => handleRestart()}>Restart Game</button>
      )}
    </div>
  );
}

export default App;
