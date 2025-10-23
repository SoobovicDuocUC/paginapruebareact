export default function Nosotros() {
  return (
    <div className="nosotros-container">
      <div className="nosotros-text">
        <h2>Sobre Nosotros</h2>
        <p>
          Junto a Huerto Hogar vas a poder encontrar productos orgánicos de la mejor calidad!, 
          además de precios bajos todos los días en todo producto envasado trabajado por nosotros. 
          No dudes en venir a visitarnos pronto, ¡Te esperamos!
        </p>
      </div>     
      <div className="nosotros-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1173.644208171468!2d-71.21398621361683!3d-33.69427148898338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966255eae610cb2f%3A0xc3fdb55ead51065b!2sDuoc%20UC%3A%20Sede%20Melipilla!5e0!3m2!1ses!2scl!4v1757447489727!5m2!1ses!2scl"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}