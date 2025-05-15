
import Link from 'next/link';
import { Terminal } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="bg-card py-3 px-4 sm:px-6 border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
          <Terminal className="h-6 w-6 sm:h-7 sm:w-7" />
          System Panel 
        </Link>
      </div>
    </header>
  );
}
