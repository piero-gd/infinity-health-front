export interface ProductAd {
  id: string;
  image: string;
  introText?: string;
  name: string;
  buttonLabel: string;
  buttonUrl: string;
}

export const productAds: Record<string, ProductAd> = {
  "tren superior": {
    id: "xgo",
    image: "/img/product-sticky-example.png",
    introText: "Potencia tu entrenamiento con",
    name: "XGO! energizante natural",
    buttonLabel: "Ver Producto",
    buttonUrl: "https://xgo.com/tienda",
  },
  "tren inferior": {
    id: "ygo",
    image: "/img/product-sticky-example.png",
    introText: "Recupera tus piernas con",
    name: " YGO! proteína vegetal",
    buttonLabel: "Ver Producto",
    buttonUrl: "https://ygo.com/tienda",
  },
  "abdomen": {
    id: "zgo",
    image: "/img/product-sticky-example.png",
    introText: "Marca tu abdomen con",
    name: "ZGO! quemador natural",
    buttonLabel: "Ver Producto",
    buttonUrl: "https://zgo.com/tienda",
  },
};