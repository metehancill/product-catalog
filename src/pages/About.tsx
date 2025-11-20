import { Target, Users, Award, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-100">
            Innovating for a better tomorrow
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            <p>
              Founded with a vision to transform the way businesses operate, FutureSolutions
              has been at the forefront of innovation for over a decade. We believe that
              technology should empower, not complicate, and our products reflect this philosophy.
            </p>
            <p>
              Our journey began with a simple mission: to create solutions that make a real
              difference. Today, we serve clients across multiple industries, providing them
              with the tools they need to succeed in an increasingly complex world.
            </p>
            <p>
              We are proud of our commitment to excellence, our dedication to customer satisfaction,
              and our unwavering focus on delivering value. Every product we create is designed
              with care, tested rigorously, and supported by a team that genuinely cares about
              your success.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To deliver innovative solutions that drive growth and success for our clients
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Team</h3>
            <p className="text-gray-600">
              Experienced professionals dedicated to excellence and customer satisfaction
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Quality</h3>
            <p className="text-gray-600">
              Commitment to the highest standards in every product and service we deliver
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
              <TrendingUp className="h-8 w-8 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Growth</h3>
            <p className="text-gray-600">
              Continuous innovation and expansion to serve our clients better
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We're always looking for new partnerships and opportunities to create value.
            Let's work together to build solutions for tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
}
