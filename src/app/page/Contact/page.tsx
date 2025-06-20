// components/ContactPage.js

"use client";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import React, { useEffect, useRef } from "react";

import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_qh7cn3m",
          "template_osgwhnw",
          form.current,
          "DkqQZ1OKd61yzjsWa"
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("Message sent successfully!");
          },
          (error) => {
            console.log(error.text);
            alert("Failed to send message, please try again.");
          }
        );

      (e.target as HTMLFormElement).reset(); // Reset form fields after submission
    }
  };
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section - More Minimal */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl font-light text-gray-900 sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          We're here to help. Reach out and we'll respond promptly.
        </p>
      </div>

      {/* Main Content - Simplified Layout */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form Section - Cleaner */}
          <div className="w-full lg:w-1/2">
            <form action="/api/contact" method="POST" className="space-y-6" ref={form} onSubmit={sendEmail}>
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  required
                  className="w-full border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  required
                  className="w-full border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* <div className="space-y-1">
                <label htmlFor="subject" className="text-sm text-gray-600">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  className="w-full border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div> */}

              <div className="space-y-1">
                <label htmlFor="message" className="text-sm text-gray-600">
                  Message
                </label>
                <textarea
                  id="message"
                  name="Message"
                  rows={4}
                  required
                  className="w-full border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full py-3 px-6 text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info - More Minimal */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-light text-gray-900">
                  Contact Details
                </h2>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-gray-400">
                    <FiMapPin className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-gray-600">
                    <p>Tour company</p>
                    <p>Cambodia</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-gray-400">
                    <FiPhone className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-gray-600">
                    <p>+855 (0979925420)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-gray-400">
                    <FiMail className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-gray-600">
                    <p>sengkosal023@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Map - Simplified */}
              <div className="pt-4 w-full h-64 md:h-80">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6212.6626653914345!2d104.89556246795176!3d11.571958414578587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e434660!2sRoyal%20University%20of%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1749784723809!5m2!1sen!2skh"
                    className="w-full h-full rounded-lg border"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
