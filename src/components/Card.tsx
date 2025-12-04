import React from 'react';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  const baseStyles = 'bg-white shadow-md rounded-lg overflow-hidden';

  const combinedClassName = `${baseStyles} ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={combinedClassName}
      {...props}
    >
      <div className="p-6">{children}</div>
    </motion.div>
  );
};

export default Card;
