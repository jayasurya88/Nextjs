"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ]

  const navbarVariants: Variants = {
    hidden: { 
      y: -100, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  const menuVariants: Variants = {
    closed: {
      scale: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const menuItemVariants: Variants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  }

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Jayasurya
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? (
                      <SunIcon className="h-5 w-5" />
                    ) : (
                      <MoonIcon className="h-5 w-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div
              className="fixed top-[4.5rem] right-4 w-64 rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-6"
              style={{ originY: 0, originX: 1 }}
            >
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={menuItemVariants}
                    whileHover={{ x: 4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={menuItemVariants}
                  className="pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <button
                    onClick={() => {
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                      setIsOpen(false)
                    }}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-200"
                  >
                    {theme === 'dark' ? (
                      <>
                        <SunIcon className="h-5 w-5" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <MoonIcon className="h-5 w-5" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 