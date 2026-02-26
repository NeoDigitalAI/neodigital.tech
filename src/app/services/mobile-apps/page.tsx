import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MobileApps() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Back Link */}
        <Link href="/#services" className="inline-flex items-center text-purple-200 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Services
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
          Mobile Apps
        </h1>

        {/* Subtitle and Description */}
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl">
          High-performance custom iOS and Android apps built for real business growth. From concept to App Store, we handle everything.
        </p>

        {/* What's Included */}
        <h2 className="text-2xl font-semibold text-purple-200 mb-6">What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Native iOS and Android</h3>
            <p className="text-gray-400">Custom-built apps for optimal performance on each platform.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Cross-platform Flutter</h3>
            <p className="text-gray-400">Efficient development for both platforms with a single codebase.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">UI/UX Design</h3>
            <p className="text-gray-400">Beautiful, user-friendly interfaces tailored to your brand.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">App Store Optimization</h3>
            <p className="text-gray-400">Maximize visibility and downloads with strategic ASO.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Push Notifications & Analytics</h3>
            <p className="text-gray-400">Engage users and track performance with powerful tools.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Ongoing Maintenance</h3>
            <p className="text-gray-400">Keep your app updated and bug-free with our support.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-gray-200 mb-6">Schedule a consultation to see how our AI solutions can drive your growth.</p>
          <Link href="/#contact" className="inline-block bg-white text-purple-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
