"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CgArrowLongRightR } from "react-icons/cg";
import { LuMapPin } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";

const cardsData = [
  {
    image: "/Images/casablanca.jpg",
    from: "Casablanca",
    to: "Marrakech",
    slug: "casa_marrakech",
    price: "à partir de 1800Dhs",
    duration: "6 hours",
  },
  {
    image: "/Images/rabat.jpg",
    from: "Casablanca",
    to: "Rabat",
    slug: "casa-rabat",
    price: "à partir de 1000Dhs",
    duration: "6 hours",
  },
  {
    image: "/Images/marrakech.jpg",
    from: "Casablanca",
    to: "El Jadida",
    slug: "casa-el-jadida",
    price: "à partir de 1300Dhs",
    duration: "6 hours",
  },
  {
    image: "/Images/tanger.jpg",
    from: "Casablanca",
    to: "Apt",
    slug: "casa-apt",
    price: "à partir de 400Dhs",
    duration: "6 hours",
  },
  // {
  //   image: "/Images/casablanca.jpg",
  //   from: "Taroudant",
  //   to: "Casablanca",
  //   slug: "taroudant-casablanca",
  //   price: "320 Dhs",
  //   duration: "6 hours",
  // },
  // {
  //   image: "/Images/rabat.jpg",
  //   from: "Casablanca",
  //   to: "Rabat",
  //   slug: "casablanca-rabat",
  //   price: "320 Dhs",
  //   duration: "6 hours",
  // },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TripsPage = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visibleCards = cardsData.slice(0, visibleCount);

  return (
    <div className="px-6 pt-5 lg:px-20">
      <div className="flex flex-col gap-3">
        <h1 className="cabinet flex gap-2 text-4xl text-bigtitle md:text-5xl">
          Meilleurs forfaits de voyage ce mois-ci
        </h1>
        <p className="max-w-2xl text-gray-500 md:text-xl">
          Découvrez nos meilleures offres de voyage ce mois-ci. Explorez des
          destinations passionnantes à des prix imbattables, parfaits pour votre
          prochaine aventure.
        </p>
      </div>
      <div className="justify-center pt-10">
        <motion.div
          className="grid w-full gap-x-5 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <AnimatePresence>
            {visibleCards.map((card) => (
              <motion.div
                key={card.slug}
                variants={cardVariants}
                transition={{ duration: 0.5 }}
                className="flex cursor-pointer flex-col justify-center gap-2 pb-10"
              >
                {/* Navigate to the dynamic result page */}
                <Link href={`/trips/${card.slug}`}>
                  <div className="z-40 w-full pb-2">
                    <Image
                      className="h-64 w-full rounded-xl shadow-gray-300"
                      alt={`${card.from} to ${card.to}`}
                      src={card.image}
                      width={2000}
                      height={2000}
                    />
                  </div>
                  <div className="z-0 -mt-10 rounded-2xl border p-3 pt-10 shadow-lg">
                    <h1 className="cabinet flex items-center gap-x-3 text-xl transition-transform duration-500 hover:scale-105">
                      {card.from}
                      <CgArrowLongRightR
                        size={20}
                        className="text-orangeboom"
                      />
                      {card.to}
                    </h1>
                    <div className="flex items-center gap-x-2">
                      <LuMapPin color="gray" />
                      <p className="text-gray-600">{card.to}</p>
                    </div>
                    <p className="flex items-center gap-x-2 text-gray-500">
                      <MdAccessTime /> {card.duration}
                    </p>
                    <p className="cabinet flex justify-end text-lg">
                      {card.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {visibleCount < cardsData.length && (
          <div className="flex justify-center pt-5">
            <button
              onClick={handleShowMore}
              className="rounded bg-orangeboom px-4 py-2 text-white hover:bg-orange-600"
            >
              Voir plus
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
