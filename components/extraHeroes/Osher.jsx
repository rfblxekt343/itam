export default function Osher() {
    return (
      <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
          <img
            src={`/images/heroes/אושר (שמחה) ברזילי/עבודת מחקר/photo1.jpeg`}
            alt={`תמונה של אושר (שמחה) ברזילי`}
            className="w-full max-w-[90%] sm:max-w-[250px] md:max-w-[300px] h-auto rounded-lg shadow-md"
          />
          <img
            src={`/images/heroes/אושר (שמחה) ברזילי/עבודת מחקר/photo2.jpeg`}
            alt={`תמונה של אושר (שמחה) ברזילי`}
            className="w-full max-w-[90%] sm:max-w-[250px] md:max-w-[300px] h-auto rounded-lg shadow-md"
          />
          <img
            src={`/images/heroes/אושר (שמחה) ברזילי/עבודת מחקר/photo3.jpeg`}
            alt={`תמונה של אושר (שמחה) ברזילי`}
            className="w-full max-w-[90%] sm:max-w-[250px] md:max-w-[300px] h-auto rounded-lg shadow-md"
          />
        </div>
  
        <div className="text-center mt-4">
          <a
            href="/documents/heroes/אושר ברזילי/document.docx"
            download
            className="inline-block px-6 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-md"
          >
            📄 להורדת קובץ המחקר של אושר
          </a>
        </div>
      </div>
    );
  }
  