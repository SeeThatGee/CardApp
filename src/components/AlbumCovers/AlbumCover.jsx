import "./AlbumCover.css";

export const AlbumCover = ({ album, handlePick, flipped, delay }) => {
  const handleclick = () => {
    if (!delay) {
      handlePick(album);
    }
  };

  return (
    <div className="album">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front"
          src={album.src}
          alt="album front"
          draggable="false"
        />
        <img
          className="back"
          src="/img/FrontCover.png"
          onClick={handleclick}
          alt="album back"
          draggable="false"
        />
      </div>
    </div>
  );
};
