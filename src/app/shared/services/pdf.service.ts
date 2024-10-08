import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  private datosDeEmpresa = {
    nombre: 'Lagarto Store',
    ruc: '235343263SDT2342',
    direccion: 'Jr. Tadeo Leguía 153',
    email: 'lagarto@gmail.com',
    web: 'www.lagartostore.com',
  };

  private ticketInfo = {
    titulo: 'Boleta de venta electrónica',
    numero: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    fechaDeEmision: new Date().toLocaleDateString(),
    horaDeEmision: new Date().toLocaleTimeString(),
    cliente: '------',
    dni: '------',
    direccion: '------',
  };

  generarBoleta(carrito: any) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 200],
    });

    // Datos de la empresa
    doc.setFontSize(9);
    doc.text(this.datosDeEmpresa.nombre, 33,10, );
    doc.text(`RUC: ${this.datosDeEmpresa.ruc}`, 23, 16);
    doc.text(this.datosDeEmpresa.direccion, 23, 22);
    doc.text(`Email: ${this.datosDeEmpresa.email}`, 22, 28);
    doc.text(`Web: ${this.datosDeEmpresa.web}`, 22, 34);

    // Información del ticket
    doc.setFontSize(12);
    doc.text(this.ticketInfo.titulo, 18, 45);
    doc.setFontSize(9);
    doc.text(`B033-${this.ticketInfo.numero}`, 35, 50);
    doc.text(`Fecha de emisión: ${this.ticketInfo.fechaDeEmision}`, 10, 60);
    doc.text(`Hora de emisión: ${this.ticketInfo.horaDeEmision}`, 10, 66);
    doc.text(`Cliente: ${this.ticketInfo.cliente}`, 10, 72);
    doc.text(`DNI: ${this.ticketInfo.dni}`, 10, 78);
    doc.text(`Dirección: ${this.ticketInfo.direccion}`, 10, 84);

    // Detalle de productos
    doc.text('CANT      NOMBRE           P. UNIT   TOTAL', 10, 94);
    let y = 100;
    carrito.producto.forEach((item: any) => {
      doc.text(
        `    ${item.cantidad}       ${item.nombre} (${item.tamano})       ${item.precioUnitario}       ${item.precioTotal}`,
        10,
        y
      );
      y += 6;
    });

    // Total a pagar
    doc.setFontSize(12);
    doc.text(`Total a pagar: S/ ${carrito.totalPagar}`, 10, y + 10);

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }
}
