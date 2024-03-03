import './index.css';
import { Link } from 'react-router-dom';

export const SiteHeader = () => {
  return (
    <header className="flex items-center bg-gray-900 text-white font-bold justify-between p-6">
      <Link to="/" className="text-white">Blog</Link>
      <Link to="/contact" className="text-white">お問い合わせ</Link>
    </header>
  )
}