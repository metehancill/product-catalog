import { FileText, Database, Image } from 'lucide-react';

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage your products and catalog via phpMyAdmin</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Manage Database</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Use phpMyAdmin in your cPanel to manage products and catalog.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">Steps:</p>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Login to cPanel</li>
                <li>Open phpMyAdmin</li>
                <li>Select your database</li>
                <li>Manage products table</li>
              </ol>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Image className="h-8 w-8 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Add Products</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Add new products through phpMyAdmin Insert tab.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800 font-medium mb-2">Example SQL:</p>
              <code className="text-xs text-green-700 block bg-white p-2 rounded">
                INSERT INTO products<br />
                (name, description, image_url)<br />
                VALUES<br />
                ('Product Name', 'Description', 'https://...')
              </code>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-8 w-8 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">Upload Catalog PDF</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Upload PDF to server and add URL to database.
            </p>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-800 font-medium mb-2">Steps:</p>
              <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
                <li>Upload PDF to /uploads/pdfs/</li>
                <li>Copy the file URL</li>
                <li>Insert into catalog_pdf table</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Database Tables</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">products</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 px-3 font-semibold">Column</th>
                      <th className="text-left py-2 px-3 font-semibold">Type</th>
                      <th className="text-left py-2 px-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">id</td>
                      <td className="py-2 px-3">INT</td>
                      <td className="py-2 px-3">Auto increment</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">name</td>
                      <td className="py-2 px-3">VARCHAR(255)</td>
                      <td className="py-2 px-3">Product name</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">description</td>
                      <td className="py-2 px-3">TEXT</td>
                      <td className="py-2 px-3">Product description</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">image_url</td>
                      <td className="py-2 px-3">VARCHAR(500)</td>
                      <td className="py-2 px-3">Image URL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">catalog_pdf</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 px-3 font-semibold">Column</th>
                      <th className="text-left py-2 px-3 font-semibold">Type</th>
                      <th className="text-left py-2 px-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">id</td>
                      <td className="py-2 px-3">INT</td>
                      <td className="py-2 px-3">Auto increment</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">file_url</td>
                      <td className="py-2 px-3">VARCHAR(500)</td>
                      <td className="py-2 px-3">PDF file URL</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">uploaded_at</td>
                      <td className="py-2 px-3">TIMESTAMP</td>
                      <td className="py-2 px-3">Upload timestamp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
