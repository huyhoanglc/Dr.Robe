export default function HomePage() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center text-center py-20">
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Welcome to <span className="text-blue-600">Dr.Robe</span>
        </h1>
        <p className="text-lg text-gray-700">
          Veterinary care &amp; overnight pet boarding service.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/about"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700 transition"
          >
            Learn More
          </a>
          <a
            href="/contact"
            className="rounded-lg border border-blue-600 px-6 py-3 text-blue-600 shadow hover:bg-blue-50 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}

