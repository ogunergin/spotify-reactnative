import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [bottomTabHeight, setBottomTabHeight] = useState();
  const [progress, setProgress] = useState(null);
  const [isPlaying, setIsPlaying] = useState();
  const [currentSound, setCurrentSound] = useState(null);


//* Çalan müziği duraklatma / başlatma
  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        bottomTabHeight,
        setBottomTabHeight,
        progress,
        setProgress,
        isPlaying,
        setIsPlaying,
        currentSound,
        setCurrentSound,
        handlePlayPause,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
