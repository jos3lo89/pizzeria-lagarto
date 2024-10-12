export interface Producto {
  nombre: string;
  descripcion: string;
  tamanosPrecios: {
    pequena: number;
    mediana: number;
    grande: number;
  };
}

export interface ProductoAPi {
  name: string;
  description: string;
  // image: string;
  isSpicy: boolean;
  isGlutenFree: boolean;
  isVegetarian: boolean;
  size: 'big' | 'medium' | 'family';
  price: {
    big: number;
    medium: number;
    family: number;
  };
}

export interface ProductoFire extends Producto {
  id: string;
  foto: string;
  nombreNormalizado: string;
}

export interface ProductoCarrito {
  id: string;
  idUser: string;
  cantidad: number;
  nombre: string;
  precioTotal: number;
  precioUnitario: number;
  tamano: string | null;
  foto: string;
}

export interface ProductoCarritoFire extends ProductoCarrito {
  docId: string;
}

export interface Bebida {
  nombre: string;
  precio: number;
}

export interface BebidaFirebase extends Bebida {
  foto: string;
  id: string;
}

export interface PizzaApiRegister {
  name: string;
  description: string;
  image: string;
  isSpicy: boolean;
  isGlutenFree: boolean;
  isVegetarian: boolean;
  size: string;
  price: PriceApi;
}

export interface PriceApi {
  big: number;
  medium: number;
  family: number;
}


export type Productotype = ProductoApiGet[]

export interface ProductoApiGet {
  id: string
  description: string
  image: string
  isGlutenFree: boolean
  isSpicy: boolean
  isVegetarian: boolean
  name: string
  size: string
  createdAt: string
  updatedAt: string
  price: Price
}

export interface Price {
  id: string
  big: number
  medium: number
  family: number
  pizzaId: string
}
