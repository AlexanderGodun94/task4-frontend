import { create } from 'zustand';
import { IRequestType } from './types';


interface RequestState {
  types: IRequestType[] | null,
  setTypes: (types: IRequestType[]) => void
}

export const useRequestStore = create<RequestState>((set) => ({
  types: null,
  setTypes: (types: IRequestType[]) => set((state) => (
    { ...state, types: types }
  ))
}));
