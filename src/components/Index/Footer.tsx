const Footer = () => {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 font-light text-sm">
            © 2024 Создатели Нового Мира
          </p>
          <div className="flex gap-8 text-sm font-light">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Behance
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
