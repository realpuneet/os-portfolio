import React, { useEffect } from "react";
import { motion } from "motion/react";
import puneetImage from '../assets/puneet.jpg'

export default function BootScreen({ onBootComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onBootComplete();
    }, 6500); // ~6.5 seconds boot time
    return () => clearTimeout(timer);
  }, [onBootComplete]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      
      {/* Profile Image + Name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="flex flex-col items-center mb-6"
      >
        <img
          src={puneetImage} // 👈 apni photo ka link dal dena
          alt="Puneet Yadav"
          className="w-28 h-28 rounded-full mb-3 border-2 border-white shadow-lg"
        />
        {/* <h1 className="text-2xl font-bold">Puneet Yadav</h1> */}
      </motion.div>

      {/* Portfolio OS Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="text-3xl font-semibold mb-8"
      >
      Puneet Yadav  
      </motion.div>

      {/* Loading Spinner */}
      <motion.div
        className="relative w-12 h-12"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
          delay: 2
        }}
      >
        {/* Dots like Windows loading */}
        {[...Array(8)].map((_,i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 bg-green-500 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 72}deg) translate(20px)`
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
