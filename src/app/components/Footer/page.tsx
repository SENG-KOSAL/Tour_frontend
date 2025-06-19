// components/Footer.tsx
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0a0f2c] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Routehaven</h2>
          <p className="text-sm text-gray-300 mb-4">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaMapMarkerAlt className="text-orange-400" />
            <span>Jl. raya ubud no.70, ubud - bali</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Quick links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">Home</a></li>
            <li><a href="#">Tour</a></li>
            <li><a href="#">Destination</a></li>
            <li><a href="#">News</a></li>
          </ul>
        </div>
        {/* Other Pages */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Other pages</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">Adventure tour</a></li>
            <li><a href="#">Couple tour</a></li>
            <li><a href="#">Family tour</a></li>
            <li><a href="#">Group tour</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Book your holiday</h4>
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <FaPhone className="text-orange-400" />
            <span>012-345-6789</span>
          </div>
          <h4 className="font-semibold mt-6 mb-2 text-white">Email us</h4>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaEnvelope className="text-orange-400" />
            <span>info@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <span>&copy; {new Date().getFullYear()} Routehaven. All rights reserved.</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <FaFacebookF className="hover:text-white cursor-pointer" />
          <FaTwitter className="hover:text-white cursor-pointer" />
          <FaInstagram className="hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
