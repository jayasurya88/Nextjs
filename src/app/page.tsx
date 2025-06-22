"use client"

import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { BackToTop } from '@/components/BackToTop'
import { PageTransition } from '@/components/PageTransition'
import { SectionTransition } from '@/components/SectionTransition'
import { ProfileImage } from '@/components/ProfileImage'
import { FaGithub, FaLinkedin, FaDocker, FaPython, FaJava } from 'react-icons/fa'
import { SiKubernetes, SiGithubactions, SiAmazon, SiDjango } from 'react-icons/si'
import Image from 'next/image'

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  image: string;
};

type Service = {
  title: string;
  description: string;
};

const defaultHero = {
  title: "Jayasurya",
  subtitle: "Aspiring DevOps Engineer | Automating the Future",
  buttonText: "View My Work",
  buttonLink: "#projects"
};

const defaultAbout = {
  bio: "I am a passionate DevOps enthusiast with a strong foundation in automation and cloud technologies. Currently focusing on mastering the DevOps toolchain and cloud-native technologies to build efficient, scalable, and reliable systems.",
  image: ""
};

export default function Home() {
  const [hero, setHero] = useState(defaultHero);
  const [about, setAbout] = useState(defaultAbout);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/hero')
      .then(res => res.json())
      .then(data => {
        setHero({
          title: data.title || defaultHero.title,
          subtitle: data.subtitle || defaultHero.subtitle,
          buttonText: data.buttonText || defaultHero.buttonText,
          buttonLink: data.buttonLink || defaultHero.buttonLink
        });
      });
    fetch('/api/about')
      .then(res => res.json())
      .then(data => {
        setAbout({
          bio: data.bio || defaultAbout.bio,
          image: data.image || ""
        });
      });
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []));
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(Array.isArray(data) ? data : []));
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        
        {/* Hero Section */}
        <SectionTransition className="min-h-screen flex items-center justify-center px-4 py-20 bg-white dark:bg-gray-900">
          <div className="text-center">
            <ProfileImage />
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
            >
              {hero.title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300"
            >
              {hero.subtitle}
            </motion.p>
            <motion.a
              href={hero.buttonLink}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              {hero.buttonText}
            </motion.a>
          </div>
        </SectionTransition>

        {/* About Section */}
        <SectionTransition id="about" className="relative py-20 px-4 bg-[#1a202c] dark:bg-[#1a202c]" delay={0.2}>
          <div className="absolute inset-0 bg-[#1a202c] dark:bg-[#1a202c]"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">About Me</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  {about.bio}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: FaDocker, name: 'Docker', bgClass: 'bg-gray-800 dark:bg-[#1d2433]' },
                    { icon: SiKubernetes, name: 'Kubernetes', bgClass: 'bg-gray-800 dark:bg-[#1d2433]' },
                    { icon: SiGithubactions, name: 'GitHub Actions', bgClass: 'bg-gray-800 dark:bg-[#1d2433]' },
                    { icon: SiAmazon, name: 'AWS', bgClass: 'bg-gray-800 dark:bg-[#1d2433]' },
                    { icon: FaPython, name: 'Python', bgClass: 'bg-gray-800 dark:bg-[#1d2433]' },
                    { icon: FaJava, name: 'Java', bgClass: 'bg-gray-800 dark:bg-[#1d2433]' },
                    { icon: SiDjango, name: 'Django', bgClass: 'bg-gray-800 dark:bg-[#1d2433]' }
                  ].map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`${tech.bgClass} rounded-2xl p-4 flex items-center space-x-3 shadow-lg transition-colors duration-300`}
                    >
                      <tech.icon className="text-2xl text-blue-400" />
                      <span className="text-gray-200 font-medium">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              {about.image ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={about.image}
                    alt="About"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
              ) : null}
            </div>
          </div>
        </SectionTransition>

        {/* Projects Section */}
        <SectionTransition id="projects" className="relative py-20 px-4 bg-white dark:bg-gray-900" delay={0.3}>
          <div className="absolute inset-0 bg-white dark:bg-gray-900"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white transition-colors duration-300">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80 transition-colors duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(project.tech) && project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                      >
                        <FaGithub className="mr-2" />
                        View on GitHub
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionTransition>

        {/* Services Section */}
        <SectionTransition id="services" className="relative py-20 px-4 bg-gray-100 dark:bg-gray-800" delay={0.4}>
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white transition-colors duration-300">Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title + index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80"
                >
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </motion.div>
              ))}
            </div>
        </div>
        </SectionTransition>
        
        {/* Contact Section */}
        <SectionTransition id="contact" className="relative py-20 px-4 bg-white dark:bg-gray-900" delay={0.5}>
          <div className="absolute inset-0 bg-white dark:bg-gray-900"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white transition-colors duration-300">Get in Touch</h2>
            <motion.div
              key="contact-form"
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80 transition-colors duration-300"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Your Name" className="w-full bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border-transparent focus:ring-2 focus:ring-blue-500" />
                  <input type="email" placeholder="Your Email" className="w-full bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border-transparent focus:ring-2 focus:ring-blue-500" />
                </div>
                <textarea placeholder="Your Message" rows={5} className="w-full bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border-transparent focus:ring-2 focus:ring-blue-500"></textarea>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </SectionTransition>
        
        <BackToTop />
      </main>
    </PageTransition>
  )
}
