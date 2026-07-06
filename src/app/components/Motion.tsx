"use client";

import { motion, Variants, HTMLMotionProps } from "framer-motion";
import React from "react";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export const PageTransition = ({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) => (
  <motion.div initial="hidden" animate="visible" variants={pageVariants} className={className} {...rest}>
    {children}
  </motion.div>
);

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const FadeInStagger = ({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) => (
  <motion.div initial="hidden" animate="visible" variants={staggerContainerVariants} className={className} {...rest}>
    {children}
  </motion.div>
);

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const FadeInItem = ({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) => (
  <motion.div variants={staggerItemVariants} className={className} {...rest}>
    {children}
  </motion.div>
);

export const TapScale = ({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={className} {...rest}>
    {children}
  </motion.div>
);
