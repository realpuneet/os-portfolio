import React, { useEffect } from "react";
import { motion } from "motion/react";
import puneetImage from "../assets/puneet.jpg"; // 👈 apni photo ka link dal dena

export default function BootScreen({ onBootComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onBootComplete();
    }, 6500); // ~6.5 sec boot time
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
          className="w-24 h-24 rounded-full mb-3 border-2 border-white shadow-lg"
        />
      </motion.div>

      {/* Portfolio OS Text with Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, textShadow: "0px 0px 15px #00ffcc" }}
        transition={{ duration: 1.5, delay: 1 }}
        className="text-3xl font-semibold mb-6"
      >
        Puneet Yadav
      </motion.div>

      {/* Glow Bar Animation */}
      <div className="relative w-48 h-1 bg-gray-700 overflow-hidden rounded mb-8">
        <motion.div
          className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-green-400 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
            delay: 1.5
          }}
        />
      </div>

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
        {[...Array(5)].map((_, i) => (
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
