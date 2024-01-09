declare module 'use-sound' {
    interface UseSoundOptions {
      volume?: number;
      onplay?: () => void;
      onend?: () => void;
      onpause?: () => void;
      format?: string[];
    }
  
    type PlayFunction = () => void;
    type PauseFunction = () => void;
  
    interface UseSoundResult {
      play: PlayFunction;
      pause: PauseFunction;
      sound: {
        play: PlayFunction;
        pause: PauseFunction;
        unload: () => void;
      };
    }
  
    function useSound(url: string, options?: UseSoundOptions): UseSoundResult;
  
    export = useSound;
  }