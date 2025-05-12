import { useGlobalStore } from "../../store/global.store";
import { Cart } from "./Cart";
import { Search } from "./Search";
import { useClicks } from "../../actions/useClicks";

export const Sheet = () => {
  const sheetContent = useGlobalStore(state=> state.sheetContent);
  const closeSheet = useGlobalStore(state => state.closeSheet);

  //funcion para cerrar la barra de desplasamiento
    const { ref: sheetRef, closing } = useClicks({
    onClose: closeSheet,
    delay: 300,
  });

  //funcion para saber el compopnente
  const renderContent = () => {
    switch (sheetContent) {
      case "cart":
        return <Cart />;
      case "search":
        return <Search />;
      default:
        return null;
    }
  };
  //barra de buscador
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end animate-fade-in">
      <div
        ref={sheetRef}
        className={`bg-white text-black h-screen w-3/4 md:w-[400px] shadow-lg ${
          closing ? "animate-slide-out" : "animate-slide-in"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};
