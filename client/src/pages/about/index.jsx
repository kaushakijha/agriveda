import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./about.css";

const About = () => {
  const [statistics, setStatistics] = useState({
    farmersConnected: 0,
    successfulTransactions: 0,
    citiesCovered: 0,
  });

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/stats");
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    // Fetch statistics immediately
    fetchStatistics();

    // Set up interval to refresh statistics every 30 seconds
    const interval = setInterval(fetchStatistics, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Our Impact</h1>
        <p>
          Since our inception, AgriVeda has helped thousands of farmers reach
          new markets and enabled buyers to access fresh, quality produce at
          competitive prices. We're committed to sustainable agriculture and
          supporting local farming communities.
        </p>
      </motion.div>

      <div className="stats-container">
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>{statistics.farmersConnected}</h2>
          <p>Farmers Connected</p>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>{statistics.successfulTransactions}</h2>
          <p>Product Transactions</p>
          <small>Total number of products sold</small>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2>{statistics.citiesCovered}</h2>
          <p>Cities Covered</p>
        </motion.div>
      </div>

      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2>Our Mission</h2>
        <p>
          We are dedicated to bridging the gap between farmers and consumers,
          ensuring fair prices for both parties while promoting sustainable
          agricultural practices.
        </p>

        <h2>Our Vision</h2>
        <p>
          To create a transparent and efficient marketplace where farmers can
          directly connect with consumers, eliminating middlemen and ensuring
          better livelihoods for all stakeholders.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
