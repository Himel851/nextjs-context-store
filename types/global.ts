export type AppState = {
  message: string;
};

export type AppContextType = {
  state: AppState;
  setMessage: (message: string) => void;
};

