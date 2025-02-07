import React from "react";
import { IoTicketOutline } from "react-icons/io5";

const BookTicket = () => {
  return (
    <section
      className="relative md:my-14 py-6 mb-10 md:mb-14 md:px-10 z-50 bg-cover bg-center"
      style={{
        backgroundImage: "url('/Images/voyage-perso.jpg')",
      }}
    >
      {/* Overlay pour l'opacité */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenu */}
      <div className="relative flex flex-col items-center justify-center space-y-8 p-4 md:p-10 lg:flex-row lg:justify-between lg:space-y-0">
        <div className="flex flex-col gap-3">
          <h1 className="cabinet flex gap-2 text-start text-4xl md:text-4xl text-white lg:text-left">
            Personnalisez Chaque Instant de Votre Voyage
          </h1>
          <p className="text-lg md:text-lg text-gray-300">
            Chaque voyage est unique. Dites-nous vos envies, nous créons
            l’itinéraire parfait pour vous. 🌍
          </p>
        </div>

        <button className="cabinet flex h-20 cursor-pointer items-center gap-2 bg-orangeboom px-8 py-3 text-lg text-white transition-transform duration-500 ease-in-out hover:scale-110">
          Personnalisez votre aventure
          <IoTicketOutline />
        </button>
      </div>
    </section>
  );
};

export default BookTicket;
