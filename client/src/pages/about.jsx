import React, { useEffect, useState } from "react";
import { FaLeaf, FaHandshake, FaChartLine, FaUsers } from "react-icons/fa";

const About = () => {
  const [stats, setStats] = useState({
    farmersConnected: 0,
    successfulTransactions: 0,
    citiesCovered: 0,
  });

  const [targetStats, setTargetStats] = useState({
    farmersConnected: 0,
    successfulTransactions: 0,
    citiesCovered: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/stats")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setTargetStats({
          farmersConnected: Number(data.farmersConnected) || 0,
          successfulTransactions: Number(data.successfulTransactions) || 0,
          citiesCovered: Number(data.citiesCovered) || 0,
        });
      })
      .catch((error) => console.error("Error fetching stats:", error));
  }, []);
  
  

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const intervalTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setStats((prevStats) => ({
        farmersConnected: Math.min(
          Math.floor((targetStats.farmersConnected / steps) * currentStep),
          targetStats.farmersConnected
        ),
        successfulTransactions: Math.min(
          Math.floor((targetStats.successfulTransactions / steps) * currentStep),
          targetStats.successfulTransactions
        ),
        citiesCovered: Math.min(
          Math.floor((targetStats.citiesCovered / steps) * currentStep),
          targetStats.citiesCovered
        ),
      }));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [targetStats]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            About <span className="text-red-500">AgriVeda</span>
          </h1>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connecting Farmers and Buyers Directly
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white shadow-xl rounded-xl p-10 mb-8 transform transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center mb-6">
            <FaLeaf className="text-red-500 text-3xl mr-4" />
            <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            AgriVeda is dedicated to revolutionizing the agricultural marketplace by creating a direct bridge between farmers and buyers. We believe in empowering farmers with better market access while providing buyers with fresh, quality produce directly from the source.
          </p>
        </div>

        {/* What We Do */}
        <div className="bg-white shadow-xl rounded-xl p-10 mb-8 transform transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center mb-6">
            <FaHandshake className="text-red-500 text-3xl mr-4" />
            <h2 className="text-3xl font-semibold text-gray-900">What We Do</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-medium text-gray-900 mb-4 flex items-center">
                <FaUsers className="text-red-500 mr-2" /> For Farmers
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Direct access to buyers</li>
                <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Fair pricing for produce</li>
                <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Easy product listing and management</li>
                <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Real-time market insights</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-medium text-gray-900 mb-4 flex items-center">
                <FaUsers className="text-red-500 mr-2" /> For Buyers
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Fresh produce directly from farmers</li>
                <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Transparent pricing</li>
                <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Quality assurance</li>
                <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Convenient ordering system</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white shadow-xl rounded-xl p-10 transform transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center mb-6">
            <FaChartLine className="text-red-500 text-3xl mr-4" />
            <h2 className="text-3xl font-semibold text-gray-900">Our Impact</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Since our inception, AgriVeda has helped thousands of farmers reach new markets and enabled buyers to access fresh, quality produce at competitive prices. We're committed to sustainable agriculture and supporting local farming communities.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center transform transition-all duration-300 hover:scale-105">
              <h3 className="text-4xl font-bold text-red-500 mb-2">
                {stats.farmersConnected.toLocaleString()}
              </h3>
              <p className="text-gray-600 font-medium">Farmers Connected</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center transform transition-all duration-300 hover:scale-105">
              <h3 className="text-4xl font-bold text-red-500 mb-2">
                {stats.successfulTransactions.toLocaleString()}
              </h3>
              <p className="text-gray-600 font-medium">Product Transactions</p>
              <p className="text-xs text-gray-500 mt-1">Total number of products sold</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center transform transition-all duration-300 hover:scale-105">
              <h3 className="text-4xl font-bold text-red-500 mb-2">
                {stats.citiesCovered.toLocaleString()}
              </h3>
              <p className="text-gray-600 font-medium">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
