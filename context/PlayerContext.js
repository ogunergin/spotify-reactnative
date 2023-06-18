import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [bottomTabHeight, setBottomTabHeight] = useState();
  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong,bottomTabHeight,setBottomTabHeight }}>
      {children}
    </PlayerContext.Provider>
  );
};
