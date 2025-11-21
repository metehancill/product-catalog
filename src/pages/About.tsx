import { Target, Users, Award, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl text-red-100">
            Daha iyi bir gelecek için yenilik yapıyoruz
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Hikayemiz</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            <p>
              İşletmelerin çalışma şeklini dönüştürme vizyonuyla kurulan firmamız,
              on yılı aşkın süredir yeniliğin ön saflarında yer almaktadır. Teknolojinin
              karmaşıklaştırmak yerine güçlendirmesi gerektiğine inanıyoruz ve ürünlerimiz
              bu felsefeyi yansıtmaktadır.
            </p>
            <p>
              Yolculuğumuz basit bir misyonla başladı: gerçek bir fark yaratan çözümler
              yaratmak. Bugün, birden fazla sektörde müşterilere hizmet veriyor ve onlara
              giderek karmaşıklaşan bir dünyada başarılı olmaları için ihtiyaç duydukları
              araçları sağlıyoruz.
            </p>
            <p>
              Mükemmeliyete olan bağlılığımız, müşteri memnuniyetine adanmışlığımız ve
              değer sunmaya olan sarsılmaz odağımızla gurur duyuyoruz. Yarattığımız her
              ürün özenle tasarlanır, titizlikle test edilir ve başarınızı gerçekten önemseyen
              bir ekip tarafından desteklenir.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Target className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Misyonumuz</h3>
            <p className="text-gray-600">
              Müşterilerimiz için büyüme ve başarıyı teşvik eden yenilikçi çözümler sunmak
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ekibimiz</h3>
            <p className="text-gray-600">
              Mükemmeliyet ve müşteri memnuniyetine adanmış deneyimli profesyoneller
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Kalitemiz</h3>
            <p className="text-gray-600">
              Sunduğumuz her ürün ve hizmette en yüksek standartlara bağlılık
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Büyümemiz</h3>
            <p className="text-gray-600">
              Müşterilerimize daha iyi hizmet vermek için sürekli yenilik ve genişleme
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Yolculuğumuza Katılın</h2>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Her zaman yeni ortaklıklar ve değer yaratma fırsatları arıyoruz.
            Geleceğin çözümlerini birlikte inşa edelim.
          </p>
        </div>
      </div>
    </div>
  );
}
