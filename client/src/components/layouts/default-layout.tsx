import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <header className="flex w-full items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Dr.Robe
        </Link>
        <nav className="space-x-4">
          <Link to="/about" className="text-sm text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="text-sm text-gray-700 hover:text-blue-600">
            Contact
          </Link>
          <Button asChild size="sm">
            <Link to="/auth/login">Login</Link>
          </Button>
        </nav>
      </header>

      {/* ép main full width + full height flex-1 */}
      <main className="flex-1 w-full bg-gradient-to-br from-blue-50 to-white p-6">
        {children}
      </main>

      <footer className="w-full border-t bg-white py-3 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Dr.Robe
      </footer>
    </div>
  )
}
