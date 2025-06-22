"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

export const AboutImage = () => {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="relative w-full max-w-md mx-auto mb-8 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-[4/3]"
      style={{
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      }}
    >
      {!imageError ? (
        <Image
          src="/images/WhatsApp Image 2025-06-20 at 19.10.07_9f289ddf.jpg"
          alt="Jayasurya - Additional Photo"
          fill
          priority
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 400px"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          <span>Image not found</span>
        </div>
      )}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />
    </motion.div>
  )
} 