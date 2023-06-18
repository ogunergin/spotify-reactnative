import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [bottomTabHeight, setBottomTabHeight] = useState();
  const [progress, setProgress] = useState(null);
  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        bottomTabHeight,
        setBottomTabHeight,
        progress,
        setProgress,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
