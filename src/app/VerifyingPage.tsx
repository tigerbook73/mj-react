export default function VerifyingPage() {
  return (
    <div className="relative inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="flex items-center space-x-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-6 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-xl text-gray-600">Verifying session ...</span>
      </div>
    </div>
  );
}
