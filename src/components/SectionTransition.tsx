"use client"

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionTransitionProps {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

export const SectionTransition = ({ children, className = "", delay = 0, id }: SectionTransitionProps) => {
  const sectionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay
      }
    }
  }

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className={className}
    >
      {children}
    </motion.section>
  )
} 