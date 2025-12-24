"use client";

import { motion } from "framer-motion";

export default function ReservationButton() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-24 md:top-8 z-50">
      <div className="flex flex-col-reverse md:flex-row items-center gap-2 md:gap-4">
        {/* Address */}
        <p className="text-white font-semibold whitespace-nowrap">
          802 Danforth, Toronto, M4J 1L6
        </p>

        {/* Button */}
        <motion.a
          href="https://store.fluffmeup.com/"
          className="
            inline-flex items-center justify-center
            h-12
            w-41
            bg-transparent text-white font-bold
            rounded-full border-2 border-white
            uppercase tracking-widest whitespace-nowrap
            leading-none
            cursor-pointer
          "
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#F7ADCF",
            borderColor: "#F7ADCF",
            color: "#ffffff",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Online store
        </motion.a>
      </div>
    </div>
  );
}
