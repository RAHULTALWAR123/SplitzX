import Image from 'next/image'
import React from 'react'
import "./Hero.css"
import Link from 'next/link'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 space-y-6">
            <h1 className="landing-title">
              The Smartest Way to Split <br/> Expenses With Friends
            </h1>
            
            <p className="landing-subtitle">
              Split bills effortlessly, and settle up quickly with our intuitive platform.
            </p>
            
<div className="flex sm:flex-row gap-4 pt-4">
   <Link href={"/text-animations/split-text"} className="landing-button">
          <span>Browse Components</span>
          <div className="button-arrow-circle">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="#4c1d95"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
</div>
          </div>

          {/* Image Content */}
          <div className="order-1 md:order-2 relative">
            <div className="relative w-full h-80 md:h-[500px]">
              <Image 
                src="/hero.png" 
                alt="App screenshot showing expense splitting" 
                fill
                priority
                className="object-contain object-right rounded-3xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-0 right-0 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
