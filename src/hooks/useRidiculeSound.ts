import 비웃기_소리 from "../assets/비웃기.mp3";
import useSound from "use-sound";

export function useRidiculeSound() {
  const [play] = useSound(비웃기_소리);

  return {
    play,
  };
}
