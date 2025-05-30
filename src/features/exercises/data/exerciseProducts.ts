export interface ProductAd {
  id: string;
  image: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
  badge?: string;
}

export const productAds: Record<string, ProductAd> = {
  "tren superior": {
    id: "xgo",
    image: "/img/product-sticky-example.png",
    description: "Potencia tu entrenamiento con XGO! energizante natural",
    buttonLabel: "Ver Producto",
    buttonUrl: "https://xgo.com/tienda",
  },
  "tren inferior": {
    id: "ygo",
    image: "/img/product-sticky-example.png",
    description: "Recupera tus piernas con YGO! proteína vegetal",
    buttonLabel: "Ver Producto",
    buttonUrl: "https://ygo.com/tienda",
  },
  "abdomen": {
    id: "zgo",
    image: "/img/product-sticky-example.png",
    description: "Marca tu abdomen con ZGO! quemador natural",
    buttonLabel: "Ver Producto",
    buttonUrl: "https://zgo.com/tienda",
  },
};