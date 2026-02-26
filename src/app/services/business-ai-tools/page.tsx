import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BusinessAITools() {
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
          Business AI Tools
        </h1>

        {/* Subtitle and Description */}
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl">
          Custom AI-powered tools that automate repetitive tasks, analyze complex data, and provide actionable insights.
        </p>

        {/* What's Included */}
        <h2 className="text-2xl font-semibold text-purple-200 mb-6">What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Process Automation</h3>
            <p className="text-gray-400">Streamline repetitive tasks to save time and resources.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Data Analytics Dashboards</h3>
            <p className="text-gray-400">Visualize complex data for quick, informed decisions.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Document Processing</h3>
            <p className="text-gray-400">Extract and analyze information from documents automatically.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Predictive Analytics</h3>
            <p className="text-gray-400">Forecast trends and outcomes with AI models.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Custom AI Integrations</h3>
            <p className="text-gray-400">Tailored solutions that fit into your existing systems.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-2">Workflow Optimization</h3>
            <p className="text-gray-400">Enhance efficiency with intelligent process redesign.</p>
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
