import { create } from "zustand";

type CoverCvStore = {
  url?: string;
  path?:string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

export const useCoverCV = create<CoverCvStore>((set) => ({
  url: undefined,
  path: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined ,path:undefined}),
  onClose: () => set({ isOpen: false, url: undefined,path:undefined }),
  onReplace: (url) => set({ isOpen: true, url,            })
}));
