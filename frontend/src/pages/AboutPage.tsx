import { Link } from 'react-router-dom'
import { Button } from 'shared-components'

export default function AboutPage() {
  return (
    <div className="min-h-screen pixel-font">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-3xl font-bold pixel-accent-blue">
          О клинике
        </h1>
        <p className="mt-4 pixel-accent-blue opacity-80 text-sm max-w-3xl mx-auto">
          Современная медицинская клиника с акцентом на точную диагностику,
          профилактику и персонализированный подход.
        </p>
      </section>

      {/* ЦЕННОСТИ */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div className="pixel-card text-center">
            <h4 className="font-bold pixel-accent-blue text-sm mb-2">
              Передовые технологии
            </h4>
            <p className="text-xs pixel-accent-blue opacity-80 leading-relaxed">
              Используем современные методы диагностики и собственные алгоритмы анализа данных.
            </p>
          </div>
          <div className="pixel-card text-center">
            <h4 className="font-bold pixel-accent-blue text-sm mb-2">
              Персональный подход
            </h4>
            <p className="text-xs pixel-accent-blue opacity-80 leading-relaxed">
              Каждый пациент получает индивидуальные рекомендации и план действий.
            </p>
          </div>
          <div className="pixel-card text-center">
            <h4 className="font-bold pixel-accent-blue text-sm mb-2">
              Опытные специалисты
            </h4>
            <p className="text-xs pixel-accent-blue opacity-80 leading-relaxed">
              Команда врачей с многолетней практикой и научными публикациями.
            </p>
          </div>
        </div>
      </section>

      {/* ЦИФРЫ */}
      <section className="py-16 pixel-bg">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold pixel-accent-blue">
            Мы в цифрах
          </h2>
          <p className="mt-2 pixel-accent-blue opacity-80 text-xs">
            Результаты, которыми мы гордимся
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="pixel-card text-center">
              <div className="text-3xl font-bold pixel-accent-blue">15 000+</div>
              <p className="pixel-accent-blue opacity-70 text-xs mt-2">Диагностик в год</p>
            </div>
            <div className="pixel-card text-center">
              <div className="text-3xl font-bold pixel-accent">98%</div>
              <p className="pixel-accent-blue opacity-70 text-xs mt-2">Удовлетворённость пациентов</p>
            </div>
            <div className="pixel-card text-center">
              <div className="text-3xl font-bold pixel-accent-blue">50+</div>
              <p className="pixel-accent-blue opacity-70 text-xs mt-2">Специалистов в штате</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold pixel-accent-blue">
          Готовы пройти диагностику?
        </h2>
        <p className="mt-3 pixel-accent-blue opacity-80 text-xs">
          Ответьте на несколько вопросов — система подготовит анализ и рекомендации.
        </p>
        <Link to="/diagnosis" className="inline-block mt-8">
          <Button className="pixel-btn">
            Начать диагностику
          </Button>
        </Link>
      </section>
    </div>
  )
}
