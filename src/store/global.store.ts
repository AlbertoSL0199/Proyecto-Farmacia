import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

//definir si se activa el buscador
type SheetContent = "cart" | "search" | null;

export interface GlobalState {
  isSheetOpen: boolean;
  sheetContent: SheetContent;
  activeNavMobile: boolean;
  // TODO: NAvbar mobile

  openSheet: (content: SheetContent) => void;
  closeSheet: () => void;

  //para saber si en el navegador en forma cel que formato mostrar
  setActiveNavMobile: (active: boolean) => void;
}

const storeApi: StateCreator<GlobalState> = (set) => ({
  isSheetOpen: false, //por defecto estara cerrado
  sheetContent: null,
  activeNavMobile: false,

  openSheet: (content) => {
    set({ isSheetOpen: true, sheetContent: content });
  },
  closeSheet: () => {
    set({
      //reniciamos los estados
      isSheetOpen: false,
      sheetContent: null,
    });
  },

  //funcion para abrir o cerrar el menu que redirige a diferentes apartados
  setActiveNavMobile: (active) => {
    set({ activeNavMobile: active });
  },
});

export const useGlobalStore = create<GlobalState>()(devtools(storeApi));
