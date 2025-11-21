import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Language, translations } from '../translations';

type ContactProps = {
  language: Language;
};

export default function Contact({ language }: ContactProps) {
  const t = translations[language].contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-red-100">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Phone className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.phone}</h3>
            <p className="text-gray-600">+90 (212) 659-0429</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.email}</h3>
            <p className="text-gray-600">bilgi@besyildizlar.com.tr</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.address}</h3>
            <p className="text-gray-600">Malkoçoğlu, Eski Edirne Asf.</p>
            <p className="text-gray-600 text-sm mt-1">No: 917/3 , 34270<br />
            Sultangazi / İSTANBUL</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.getInTouch}</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                {language === 'tr' ? 'Mesajınız başarıyla gönderildi!' : 'Your message has been sent successfully!'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 inline-flex items-center justify-center space-x-2"
              >
                <span>{submitted ? t.sending : t.send}</span>
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.info}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t.phone}</h4>
                  <p className="text-gray-600">+90 (212) 659-0429</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t.email}</h4>
                  <p className="text-gray-600">bilgi@besyildizlar.com.tr</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t.address}</h4>
                  <p className="text-gray-600">
                    Malkoçoğlu, Eski Edirne Asf.<br />
                    No: 917/3 , 34270<br />
                    Sultangazi / İSTANBUL
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.0344855562346!2d28.86788!3d41.099999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA2JzAwLjAiTiAyOMKwNTInMDQuNCJF!5e0!3m2!1sen!2str!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
