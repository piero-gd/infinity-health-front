import React, { useState, useEffect } from "react";

const ZoomSession: React.FC = () => {
  const [iframeHeight, setIframeHeight] = useState("100vh");

  useEffect(() => {
    const updateIframeHeight = () => {
      const academyPage = document.querySelector(".academy-page");
      console.log("AcademyPage Element:", academyPage); // Verifica si el elemento está siendo seleccionado
      if (academyPage) {
        const windowHeight = window.innerHeight; // Altura total de la ventana
        const paddingTop = parseFloat(window.getComputedStyle(academyPage).paddingTop || "0");
        console.log("Padding Top:", paddingTop); // Verifica el padding superior
        const paddingBottom = parseFloat(window.getComputedStyle(academyPage).paddingBottom || "0");
        console.log("Padding Bottom:", paddingBottom); // Verifica el padding inferior
        console.log("Window Height:", windowHeight); // Verifica la altura de la ventana
        const availableHeight = windowHeight - paddingTop - paddingBottom - 130; // Altura disponible
        console.log("Available Height:", availableHeight); // Verifica la altura disponible
        setIframeHeight(`${availableHeight}px`);
      } else {
        console.log("No se encontró el elemento con la clase .academy-page");
      }
    };

    updateIframeHeight();
    window.addEventListener("resize", updateIframeHeight);

    return () => {
      window.removeEventListener("resize", updateIframeHeight);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <iframe
        src="/clase_en_vivo.html"
        title="Clase en Vivo"
        className="w-full border-0"
        allow="microphone *; camera *; microphone https://zoom.us; camera https://zoom.us; fullscreen; display-capture; autoplay; encrypted-media; geolocation"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-modals allow-popups-to-escape-sandbox"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          display: "block",
          height: iframeHeight, // Dinámicamente ajustado
          borderRadius: "0.5rem", // Bordes redondeados
        }}
      />
    </div>
  );
};

export default ZoomSession;