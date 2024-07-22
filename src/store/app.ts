import { create } from 'zustand';

type TAppStore = {
  appName: string;
  setAppName: (appName: string) => void;
};

export const useAppStore = create<TAppStore>(set => ({
  appName: '',
  setAppName: appName =>
    set(() => ({
      appName,
    })),
}));
