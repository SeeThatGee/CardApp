import { AlbumCover } from "./AlbumCover";
import "./AlbumGrid.css";

export const AlbumsGrid = ({
  albums,
  handlePick,
  pickOne,
  pickTwo,
  delay,
  isEasy,
}) => {
  return (
    <div className={`album-grid ${isEasy ? "easy" : "hard"}`}>
      {albums.map((album) => (
        <AlbumCover
          key={album.id}
          album={album}
          handlePick={handlePick}
          flipped={album === pickOne || album === pickTwo || album.matched}
          delay={delay}
        />
      ))}
    </div>
  );
};
