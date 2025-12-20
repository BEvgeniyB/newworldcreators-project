const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <header className="text-center mb-32">
          <h1 className="text-7xl font-light text-gray-900 mb-6 tracking-tight">
            Создатели Нового Мира
          </h1>
          <p className="text-xl text-gray-500 font-light">
            Creators of the New World
          </p>
        </header>

        <div className="h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-8">
            <div className="w-32 h-32 mx-auto border border-gray-200 rounded-full flex items-center justify-center">
              <div className="w-24 h-24 border border-gray-300 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-lg font-light">
              Пространство для творчества
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
