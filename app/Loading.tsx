import { motion } from "motion/react";
export default function Loading({ className }: { className?: string }) {
  return (
    <motion.div className={`text-[1.5rem] ${className} text-center`}>
      <motion.h1
        animate={{ scale: [0.9, 1, 0.9] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatType: "loop" }}
      >
        Loading...
      </motion.h1>
    </motion.div>
  );
}
