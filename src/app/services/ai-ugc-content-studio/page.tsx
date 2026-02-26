import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AIUGCContentStudio() {
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
          AI UGC Content Studio
        </h1>

        {/* Subtitle and Description */}
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl">
          Generate unlimited authentic-looking user-generated content that converts. No actors, no expensive shoots.
        </p>

        {/* What's Included */}
        <h2 className="text-2xl font-semibold text-purple-200 mb-6">What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">AI-generated Product Photos</h3>
            <p className="text-gray-400">Professional-grade images without the photoshoot cost.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">UGC-style Video Testimonials</h3>
            <p className="text-gray-400">Authentic video content that looks user-created.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Social Media at Scale</h3>
            <p className="text-gray-400">Generate endless content for all your platforms.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Brand-consistent Outputs</h3>
            <p className="text-gray-400">Content that always aligns with your brand guidelines.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">A/B Testing Variations</h3>
            <p className="text-gray-400">Create multiple versions to test what works best.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Multi-platform Optimization</h3>
            <p className="text-gray-400">Content tailored for each social media platform's specs.</p>
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
