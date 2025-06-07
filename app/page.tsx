'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import logo from "@/uploads/logo.jpeg"

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 text-white flex flex-col items-center p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">
          Home Visit Physiotherapy & Scientific Massage
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Expert care in the comfort of your home — from pain relief to posture correction, feel the difference with professional physiotherapy & therapeutic massage.
        </p>
      </motion.div>

      {/* Doctor Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-10"
      >
        <Image
          src={logo}
          alt="Dr. Arjun Mehta"
          className="rounded-full shadow-xl w-48 h-48 object-cover border-4 border-white"
        />
        <h3 className="mt-4 text-xl font-semibold">Md Asgar Ansari</h3>
        <p className="text-white/80 text-sm">Certified Physiotherapist & Massage Expert</p>
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 mt-10 w-full max-w-5xl"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-300">What I Offer</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center text-white">
          <div className="bg-white/5 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-green-300">Home Visit Physiotherapy</h3>
            <p>Personalized sessions for pain, mobility & recovery at your home.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-blue-300">Scientific Massage</h3>
            <p>Relieve muscle tension and stress with expert massage techniques.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-pink-300">Posture & Rehab Plans</h3>
            <p>Correct posture & strengthen weak areas with guided therapy plans.</p>
          </div>
        </div>
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 w-full max-w-6xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Session Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            'https://images.unsplash.com/photo-1609113160023-4e31f3765fd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1699523229208-be1e1dd9252d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1692372372810-c848c9cca1c5?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Session ${i + 1}`}
              className="rounded-xl shadow-md hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-16 max-w-4xl text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-4">Meet Your Therapist</h2>
        <p className="text-lg text-white/90">
          Hi, I’m <span className="font-semibold text-yellow-300">Md Asgar Ansari</span>, a certified physiotherapist with over 10 years of experience helping patients recover through a blend of modern physiotherapy and scientific massage therapy.
        </p>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-20 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold text-yellow-200 mb-4">Book a Session</h2>
        <p className="mb-4">Available in: Kolkata</p>
        <div className="flex justify-center gap-4">
          <a
            href="tel:+919999999999"
            className="bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PhoneCall size={20} />
            Call Now
          </a>
          <a
            href="https://wa.me/9903354677"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 text-sm text-white/70 text-center">
        © {new Date().getFullYear()} Md Asgar Ansari
      </footer>
    </div>
  );
};

export default Page;
