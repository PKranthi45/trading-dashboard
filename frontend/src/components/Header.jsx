// src/components/Header.jsx
const Header = () => {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Crypto RSI Dashboard</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:text-gray-200">Dashboard</a>
          <a href="#" className="hover:text-gray-200">Docs</a>
          <a href="#" className="hover:text-gray-200">About</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
