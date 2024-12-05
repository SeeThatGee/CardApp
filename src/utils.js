export const shuffleCards = (cards) => {
  return cards
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
};

export const shuffleAlbums = (albums) => {
  return albums
    .sort(() => Math.random() - 0.5)
    .map((album) => ({ ...album, id: Math.random() }));
};
