import { create } from 'zustand';

export enum RouterMode {
  noMode = 'noMode',
  auth = 'auth',
  investor = 'investor',
  admin = 'admin'
}

interface RouterState {
  mode: RouterMode,
  setMode: (mode: RouterMode) => void
}

export const useRouterStore = create<RouterState>((set) => ({
  mode: RouterMode.noMode,
  setMode: (mode: RouterMode) => set(state => (
    { ...state, mode }
  ))
}));
