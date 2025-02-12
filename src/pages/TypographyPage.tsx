import React from 'react'

export function TypographyPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-12 pb-12">
      {/* Headings */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Headings</h2>
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-6 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Heading 1</h1>
            <p className="text-sm text-gray-500 mt-2">text-4xl font-bold</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">Heading 2</h2>
            <p className="text-sm text-gray-500 mt-2">text-3xl font-semibold</p>
          </div>
          <div>
            <h3 className="text-2xl font-medium text-gray-900">Heading 3</h3>
            <p className="text-sm text-gray-500 mt-2">text-2xl font-medium</p>
          </div>
          <div>
            <h4 className="text-xl font-medium text-gray-900">Heading 4</h4>
            <p className="text-sm text-gray-500 mt-2">text-xl font-medium</p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-gray-900">Heading 5</h5>
            <p className="text-sm text-gray-500 mt-2">text-lg font-medium</p>
          </div>
          <div>
            <h6 className="text-base font-medium text-gray-900">Heading 6</h6>
            <p className="text-sm text-gray-500 mt-2">text-base font-medium</p>
          </div>
        </div>
      </section>

      {/* Body Text */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Body Text</h2>
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-6 space-y-6">
          <div>
            <p className="text-lg text-gray-700">
              Large paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm text-gray-500 mt-2">text-lg text-gray-700</p>
          </div>
          <div>
            <p className="text-base text-gray-600">
              Regular paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm text-gray-500 mt-2">text-base text-gray-600</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Small paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm text-gray-500 mt-2">text-sm text-gray-500</p>
          </div>
        </div>
      </section>

      {/* Text Styles */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Text Styles</h2>
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-6 space-y-6">
          <div>
            <p className="font-bold text-gray-900">Bold text</p>
            <p className="text-sm text-gray-500 mt-2">font-bold</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Semi-bold text</p>
            <p className="text-sm text-gray-500 mt-2">font-semibold</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Medium text</p>
            <p className="text-sm text-gray-500 mt-2">font-medium</p>
          </div>
          <div>
            <p className="font-normal text-gray-900">Regular text</p>
            <p className="text-sm text-gray-500 mt-2">font-normal</p>
          </div>
          <div>
            <p className="font-light text-gray-900">Light text</p>
            <p className="text-sm text-gray-500 mt-2">font-light</p>
          </div>
          <div>
            <p className="italic text-gray-900">Italic text</p>
            <p className="text-sm text-gray-500 mt-2">italic</p>
          </div>
          <div>
            <p className="underline text-gray-900">Underlined text</p>
            <p className="text-sm text-gray-500 mt-2">underline</p>
          </div>
          <div>
            <p className="line-through text-gray-900">Strikethrough text</p>
            <p className="text-sm text-gray-500 mt-2">line-through</p>
          </div>
        </div>
      </section>

      {/* Links */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Links</h2>
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-6 space-y-6">
          <div>
            <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">Primary Link</a>
            <p className="text-sm text-gray-500 mt-2">text-blue-600 hover:text-blue-700 hover:underline</p>
          </div>
          <div>
            <a href="#" className="text-gray-600 hover:text-gray-900 hover:underline">Secondary Link</a>
            <p className="text-sm text-gray-500 mt-2">text-gray-600 hover:text-gray-900 hover:underline</p>
          </div>
          <div>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 hover:underline">Small Link</a>
            <p className="text-sm text-gray-500 mt-2">text-sm text-gray-500 hover:text-gray-700 hover:underline</p>
          </div>
        </div>
      </section>

      {/* Lists */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Lists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Unordered List</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>First item in the list</li>
              <li>Second item in the list</li>
              <li>Third item in the list</li>
              <li>Fourth item in the list</li>
            </ul>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ordered List</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>First item in the list</li>
              <li>Second item in the list</li>
              <li>Third item in the list</li>
              <li>Fourth item in the list</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}