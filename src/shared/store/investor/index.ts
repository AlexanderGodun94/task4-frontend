import { create } from 'zustand';
import { IInvestor } from 'shared/types';

interface InvestorState {
  investor: IInvestor | null,
  setInvestor: (mode: IInvestor) => void,
  deleteInvestor: () => void
}

export const useInvestorStore = create<InvestorState>((set) => ({
  investor: null,
  setInvestor: (investor: IInvestor) => set(() => (
    { investor: investor }
  )),
  deleteInvestor: () => set(() => (
    { investor: null }
  ))
}));
