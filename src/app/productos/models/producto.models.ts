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
  id: string
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
  tamano: string;
  foto: string;
}

export interface ProductoCarritoFire extends ProductoCarrito {
  docId: string;
}