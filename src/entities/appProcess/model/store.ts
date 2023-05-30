import { create } from 'zustand';

interface AppProcessState {
  loading: boolean,
  setIsLoading: (value: boolean) => void
}

export const useAppProcessStore = create<AppProcessState>((set) => ({
  loading: false,
  setIsLoading: (isLoading: boolean) => set(() => (
    { loading: isLoading }
  ))
}));
