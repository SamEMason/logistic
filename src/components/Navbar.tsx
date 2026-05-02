import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-screen p-2 drop-shadow-sm bg-amber-500">
      <Link href="/">Logistic</Link>
      <Link href="/menu-open">
        <Menu size={20} />
      </Link>
    </nav>
  );
}
