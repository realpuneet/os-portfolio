import React, { useEffect } from "react";
import { motion } from "motion/react";

const BootScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
    <motion.div 
    initial={{opacity:0, scale: 0.8}}
    animate={{opacity: 1, scale: 1}}
    transition={{duration: 1}}
    className="flex flex-col items-center"
    >
        <div className="text-4xl font-bold mb-4">
            Portfolio OS
        </div>
    {/* Loading bar */}
    <motion.div
        initial={{width:"0%"}}
        animate={{width: "100%"}}
        transition={{duration: 1.5, delay: 0.5}}
        className="h-1 bg-green-500 rounded"
    />
    </motion.div>
  </div>
  );
};

export default BootScreen;
