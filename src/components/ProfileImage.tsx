"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

export const ProfileImage = () => {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -10, 0]
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.5
        },
        scale: {
          type: "spring",
          stiffness: 260,
          damping: 20
        }
      }}
      className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700"
      style={{
        boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.2), 0 20px 40px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
      {!imageError ? (
        <Image
          src="/images/24PMC123cIC4zbarmb176zCx.jpg"
          alt="Jayasurya - DevOps Engineer"
          width={256}
          height={256}
          priority
          className="object-cover hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          <span>Image not found</span>
        </div>
      )}
      <motion.div
        className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
} 