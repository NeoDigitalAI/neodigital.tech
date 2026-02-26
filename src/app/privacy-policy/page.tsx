"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#030014] text-white/70 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-sm text-white/40 mb-12">Last updated: February 24, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>INNOVATEX NEST TREND S.R.L. (&quot;NeoDigital&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the NeoDigital website (neodigital.tech) and mobile applications including SmartScan AI, QR Pro, and BetAI Pro. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3"><strong className="text-white/90">Personal Information:</strong> We may collect information you voluntarily provide, such as your name, email address, phone number, and any other information you choose to provide when contacting us or using our services.</p>
            <p className="mb-3"><strong className="text-white/90">Usage Data:</strong> We automatically collect certain information when you use our apps, including device type, operating system, app version, and usage statistics to improve our services.</p>
            <p><strong className="text-white/90">Camera and Storage Access:</strong> Some of our apps (SmartScan AI, QR Pro) require camera access for scanning functionality and storage access to save scanned documents or generated QR codes. This data is processed locally on your device and is not transmitted to our servers unless you explicitly choose to share it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, operate, and maintain our services</li>
              <li>To improve, personalize, and expand our services</li>
              <li>To communicate with you, including customer support</li>
              <li>To send you updates and marketing communications (with your consent)</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage and Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal information. Data processed by our mobile apps (document scans, QR codes) is stored locally on your device. We do not store this data on our servers unless you use cloud backup features.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p>Our apps may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We may use analytics services (such as Firebase Analytics) to understand app usage patterns. These services collect anonymized usage data in accordance with their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Children&apos;s Privacy</h2>
            <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13, we will take steps to delete that information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights (GDPR)</h2>
            <p className="mb-3">Under the General Data Protection Regulation (GDPR), if you are a resident of the European Economic Area, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Data Retention</h2>
            <p>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
            <p className="mb-3">If you have questions about this Privacy Policy or wish to exercise your rights, contact us:</p>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 space-y-2">
              <p><strong className="text-white/90">INNOVATEX NEST TREND S.R.L.</strong></p>
              <p>Str. Pavel Roșca Nr. 9, Cluj-Napoca, Cluj, România</p>
              <p>CUI: 43049318 | J12/2020/004152235</p>
              <p>Email: office@neodigital.tech</p>
              <p>Phone: +40 799 977 755</p>
              <p>Website: neodigital.tech</p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] text-center text-sm text-white/30">
          <p>© 2026 INNOVATEX NEST TREND S.R.L. All rights reserved.</p>
          <a href="/" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">← Back to NeoDigital.tech</a>
        </div>
      </div>
    </div>
  );
}
