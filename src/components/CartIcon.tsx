"use client";

export default function CartIcon() {
  return (
    <a
      href="https://www.store.fluffmeup.com"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-6 left-6 md:top-8 md:left-8 z-50 group"
    >
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50 cursor-pointer group">
        <div className="relative bg-gradient-to-br from-pink-400 to-pink-500 p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95">
          {/* Shopping Cart SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 md:w-7 md:h-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 bg-yellow-400 text-pink-900 text-xs font-bold w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            0
          </div>
        </div>
      </div>
    </a>
  );
}
