export function LoadingSpinner() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center" dir="rtl">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-lg text-gray-600">בקרוב נגיע לעמוד...</p>
    </div>
  );
}
