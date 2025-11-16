"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton = memo(function FilterButton({
  active,
  onClick,
  children,
}: FilterButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-[44px] rounded-full px-4 py-2 text-xs font-semibold transition-all ${
        active
          ? "bg-primary-600 text-white shadow-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400"
          : "bg-gray-200 text-gray-700 shadow-sm hover:bg-gray-300 hover:shadow dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {children}
    </motion.button>
  );
});

export default FilterButton;
