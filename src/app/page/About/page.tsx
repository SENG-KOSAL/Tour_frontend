// components/AboutPage.js
import { FiGlobe, FiAward, FiUsers, FiMap } from 'react-icons/fi';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-106 w-full">
        <Image
          src="/about/snowy-mountain-nature-river.jpg" // Replace with your tour company hero image
          alt="About Our Tour Company"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 k bg-opacity-40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-light text-white mb-4">Our Story</h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Discovering the world's wonders, one journey at a time
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Why We Do What We Do</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-light text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              At [Your Company Name], we believe travel should be transformative. Our mission is to 
              create unforgettable experiences that connect people with the world's most incredible 
              destinations while respecting local cultures and environments.
            </p>
            <h3 className="text-2xl font-light text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              We envision a world where travel enriches both visitors and host communities, 
              fostering understanding and appreciation across cultures while preserving the 
              planet's natural wonders for future generations.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/about/group_tour.jpg" // Replace with your image
              alt="Tour group enjoying an experience"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <FiGlobe className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-light text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Destinations</p>
            </div>
            <div className="p-6">
              <FiUsers className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-light text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Happy Travelers</p>
            </div>
            <div className="p-6">
              <FiAward className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-light text-gray-900 mb-2">15</h3>
              <p className="text-gray-600">Industry Awards</p>
            </div>
            <div className="p-6">
              <FiMap className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-light text-gray-900 mb-2">100+</h3>
              <p className="text-gray-600">Unique Tours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Meet Our Team</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Our passionate team of travel experts, guides, and support staff are dedicated to 
            making your journey exceptional.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-light text-gray-900">{member.name}</h3>
              <p className="text-blue-500 mb-2">{member.position}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-white mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.id} className="text-center p-6">
                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-light mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample data - replace with your actual data
const teamMembers = [
  {
    id: 1,
    name: "Seng kosal",
    position: "Founder & CEO",
    bio: " Kosal is a 20-year-old university student studying Information Technology Engineering (ITE). Passionate about web development,he enjoys building projects using React, Next.js ,Laravel , python , and CSS. As a junior developer, he’s always eager to learn and grow his skills. Outside of coding, Kosal loves swimming, running, and exploring new ideas. .",
    image: "/images/Kosal.jpg"
    
  },
  {
    id: 2,
    name: "Mark Zuckerberg",
    position: "Co-founder & CEO of Meta Platforms (formerly Facebook)",
    bio: "Mark Zuckerberg is an American programmer and entrepreneur who co-founded Facebook in 2004 while studying at Harvard. He played a major role in shaping the social media landscape and later expanded the company into virtual reality and the metaverse through Meta.",
    image: "/images/Mark_Zuckerberg.jpg"
  },
  {
    id: 3,
    name: "Elon Musk",
    position: "TCEO of Tesla and SpaceX, Owner of X (formerly Twitter)",
    bio: "Elon Musk is a South African-born inventor and entrepreneur known for revolutionizing electric vehicles, space exploration, and digital payments. He is also involved in AI and brain–computer interface technologies through companies like Neuralink and xAI..",
    image: "/images/Elon_Musk.jpg"
  },
  {
    id: 4,
    name: "Susan Wojcicki",
    position: "Former CEO of YouTube",
    bio: "Susan Wojcicki is an American technology executive who was one of Google's earliest employees. She played a key role in Google’s advertising and video strategies, and served as CEO of YouTube from 2014 to 2023, helping the platform grow into the world’s largest video-sharing site.",
    image: "/images/getty.jpg"
  }
];

const values = [
  {
    id: 1,
    title: "Authenticity",
    description: "We create genuine connections with local cultures and communities.",
    icon: FiGlobe
  },
  {
    id: 2,
    title: "Sustainability",
    description: "Responsible travel that benefits both visitors and host communities.",
    icon: FiAward
  },
  {
    id: 3,
    title: "Expertise",
    description: "Deep local knowledge that transforms ordinary trips into extraordinary journeys.",
    icon: FiUsers
  },
  {
    id: 4,
    title: "Personalization",
    description: "Tailored experiences that match your unique travel style.",
    icon: FiMap
  },
  {
    id: 5,
    title: "Passion",
    description: "We love what we do, and it shows in every detail.",
    icon: FiGlobe
  },
  {
    id: 6,
    title: "Integrity",
    description: "Honest recommendations and transparent pricing you can trust.",
    icon: FiAward
  }
];