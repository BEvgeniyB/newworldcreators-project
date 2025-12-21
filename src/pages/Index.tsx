const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center space-y-6">
          <h1 className="text-8xl font-light text-gray-900 tracking-tight leading-tight">
            Создатели<br />Нового Мира
          </h1>
          <p className="text-xl text-gray-400 font-light tracking-wide">
            CREATORS OF THE NEW WORLD
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t border-gray-100">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-gray-900">Философия</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              Мы создаём пространства, где форма следует за смыслом. 
              Каждый проект — это диалог между идеей и воплощением, 
              между традицией и инновацией.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-gray-900">Подход</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              Минимализм — это не отсутствие, это концентрация на главном. 
              Мы убираем лишнее, чтобы дать возможность важному зазвучать.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-light text-gray-900 mb-20 text-center">Направления</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: 'Архитектура', desc: 'Проектирование пространств с глубоким смыслом' },
            { title: 'Дизайн', desc: 'Визуальные решения, которые вдохновляют' },
            { title: 'Стратегия', desc: 'Концепции, меняющие восприятие' }
          ].map((service, i) => (
            <div key={i} className="group">
              <div className="aspect-square border border-gray-200 rounded-sm mb-6 overflow-hidden bg-gray-50 transition-all duration-300 group-hover:border-gray-900">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-20 h-20 border border-gray-300 rounded-full group-hover:border-gray-900 transition-all duration-300"></div>
                </div>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Preview */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <h2 className="text-5xl font-light text-gray-900 mb-20 text-center">Проекты</h2>
        <div className="space-y-16">
          {[1, 2, 3].map((project) => (
            <div key={project} className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] border border-gray-200 rounded-sm bg-gray-50"></div>
              <div className="space-y-6">
                <h3 className="text-4xl font-light text-gray-900">Проект {project}</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Описание концепции и реализации проекта. 
                  История создания и философия, заложенная в основу.
                </p>
                <a href="#" className="inline-block text-gray-900 font-light border-b border-gray-900 hover:border-gray-400 transition-colors">
                  Подробнее
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center border-t border-gray-100">
        <h2 className="text-5xl font-light text-gray-900 mb-8">Начнём диалог</h2>
        <p className="text-gray-500 font-light mb-12 text-lg">
          Готовы обсудить ваш проект и возможности сотрудничества
        </p>
        <a 
          href="mailto:hello@example.com" 
          className="inline-block text-lg text-gray-900 font-light border-b-2 border-gray-900 hover:border-gray-400 transition-colors"
        >
          hello@example.com
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
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
    </div>
  );
};

export default Index;