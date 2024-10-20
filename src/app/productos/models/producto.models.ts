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

export interface PriceApi {
  big: number;
  medium: number;
  family: number;
}

export type Productotype = ProductoApiGet[];

export interface ProductoApiGet {
  id: string;
  description: string;
  image: string;
  isGlutenFree: boolean;
  isSpicy: boolean;
  isVegetarian: boolean;
  name: string;
  size: string;
  createdAt: string;
  updatedAt: string;
  price: Price;
}

export interface Price {
  id: string;
  big: number;
  medium: number;
  family: number;
  pizzaId: string;
}

/// api

export interface PizzaApiRegister {
  nombre: string;
  descripcion: string;
  categoria: 'vegetariana' | 'carnes';
  disponible: boolean;
  tiempo_preparacion: number;
  promocion: boolean;
  familiar: number;
  mediana: number;
  personal: number;
  descuento: number;
}

export interface PizzasApi {
  categoria: string;
  created_at: string;
  descripcion: string;
  descuento: number;
  disponible: boolean;
  familiar: number;
  id: string;
  imagen_url: string;
  mediana: number;
  nombre: string;
  personal: number;
  popularidad: number | null;
  promocion: boolean;
  tiempo_preparacion: number;
  updated_at: string;
}

export interface BebidaCrearApi {
  nombre: string;
  descripcion: string;
  precio: number;
}

export interface BebidasApi {
  id: string;
  nombre: string;
  imagen_url: string;
  descripcion: string;
  precio: number;
  created_at: string;
  updated_at: string;
}

export interface BebidaApiPorId {
  id: string;
  nombre: string;
  imagen_url: string;
  descripcion: string;
  precio: number;
  created_at: string;
  updated_at: string;
}

export interface ProductoCarriotApi {
  id_user: string;
  id_producto: string;
  nombre: string;
  imagen_url: string;
  cantidad: number;
  precio_total: number;
  precio_unitario: number;
}


export interface  ProductoListApi {
  id: string
  id_user: string
  id_producto: string
  nombre: string
  imagen_url: string
  cantidad: number
  precio_total: number
  precio_unitario: number
  created_at: string
  updated_at: string
}
