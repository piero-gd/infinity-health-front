import { useEffect } from "react";

//Hook para deshabilitar el scroll del cuerpo cuando está habilitado.

export function useDisableBodyScroll(enabled: boolean) {
  useEffect(() => {
    if (enabled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [enabled]);
}