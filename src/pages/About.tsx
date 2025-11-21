import { Target, Users, Award, TrendingUp } from 'lucide-react';
import { Language, translations } from '../translations';

type AboutProps = {
  language: Language;
};

export default function About({ language }: AboutProps) {
  const t = translations[language].about;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-red-100">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.ourStory}</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            <p>{t.story1}</p>
            <p>{t.story2}</p>
            <p>{t.story3}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Target className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.mission}</h3>
            <p className="text-gray-600">
              {t.missionDesc}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.team}</h3>
            <p className="text-gray-600">
              {t.teamDesc}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.quality}</h3>
            <p className="text-gray-600">
              {t.qualityDesc}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.growth}</h3>
            <p className="text-gray-600">
              {t.growthDesc}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">{t.joinTitle}</h2>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            {t.joinDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
