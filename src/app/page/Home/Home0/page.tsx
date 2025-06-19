import React from 'react'

const Home0 = () => {
  return (
     <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/mountains-8K.jpg')", // 🔁 Replace with your image path
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to Tour </h1>
        <p className="text-xl max-w-xl">
         
        </p>
      </div>
    </div>
  )
}

export default Home0