import React, { useState } from "react";
import { notify } from "../utils/helper/notification";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        notify("Message sent successfully! We will get back to you soon.", "success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        notify("Failed to send message. Please try again later.", "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      notify("Something went wrong. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of your JSX remains unchanged below


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Contact <span className="text-red-500">Us</span>
          </h1>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="grid md:grid-cols-5 gap-8">
              {/* Contact Information Cards */}
              <div className="md:col-span-2 space-y-5">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500">
                  <div className="flex items-start">
                    <div className="bg-red-50 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-red-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        Address
                      </h3>
                      <p className="mt-1 text-gray-600 text-sm leading-relaxed">
                        123 Agriculture Street
                        <br />
                        Farm District
                        <br />
                        City, State 12345
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500">
                  <div className="flex items-start">
                    <div className="bg-red-50 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-red-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        Email
                      </h3>
                      <p className="mt-1 text-gray-600 text-sm">
                        support@agriveda.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500">
                  <div className="flex items-start">
                    <div className="bg-red-50 p-3 rounded-full mr-4">
                      <FaPhone className="text-red-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        Phone
                      </h3>
                      <p className="mt-1 text-gray-600 text-sm">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500">
                  <div className="flex items-start">
                    <div className="bg-red-50 p-3 rounded-full mr-4">
                      <FaClock className="text-red-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        Business Hours
                      </h3>
                      <p className="mt-1 text-gray-600 text-sm leading-relaxed">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="md:col-span-3">
                <div className="bg-white p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                        placeholder="Subject of your message"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows="8"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-red-500 text-white py-2.5 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
