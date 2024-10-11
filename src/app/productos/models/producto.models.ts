export interface Producto {
  nombre: string;
  descripcion: string;
  tamanosPrecios: {
    pequena: number;
    mediana: number;
    grande: number;
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
