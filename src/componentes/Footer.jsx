import React from "react";

const Footer = () => {
  return (
    <footer className="text-white pt-4 mt-5 bg-dark">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Minimercado El Bosque</h5>
            <p className="small">Tu tienda de barrio con todo lo que necesitas: pan, abarrotes, frutas, bebidas, licores, congelados y alimento para mascotas.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Enlaces rápidos</h6>
            <ul className="list-unstyled">
              <li><a href="/productos" className="text-white text-decoration-none">Productos</a></li>
              <li><a href="/nosotros" className="text-white text-decoration-none">Nosotros</a></li>
              <li><a href="/contacto" className="text-white text-decoration-none">Contacto</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contáctanos</h6>
            <p className="mb-1">📍 Av. El Bosque 123, Puerto Montt</p>
            <p className="mb-1">📞 +56 9 1234 5678</p>
            <p className="mb-1">✉️ contacto@minimercado.cl</p>
          </div>
        </div>
        <div className="text-center border-top border-secondary pt-3 mt-3">
          <p className="mb-0 small">© 2025 Minimercado El Bosque - Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
