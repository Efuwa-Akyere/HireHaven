import React from 'react'

const Mission = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        
        {/* Mission Card */}
        <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To empower job seekers by providing them with the
            opportunities they need to connect with employers and achieve their
            career goals.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To become the leading job platform that bridges the gap between
            talent and opportunity across industries worldwide.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Mission