import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </PlayerContext.Provider>
  );
};
