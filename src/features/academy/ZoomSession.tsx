import React from "react";

const ZoomSession: React.FC = () => {
  return (
    <div className="w-full h-screen flex">
      <iframe
        src="/clase_en_vivo.html"
        title="Clase en Vivo"
        className="w-full h-screen border-0"
        allow="microphone *; camera *; microphone https://zoom.us; camera https://zoom.us; fullscreen; display-capture; autoplay; encrypted-media; geolocation"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-pops allow-presentation allow-modals allow-pops-to-escape-sandbox"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ display: "block" }}
      />
    </div>
  );
};

export default ZoomSession;