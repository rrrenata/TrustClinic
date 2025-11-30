import { Link } from 'react-router-dom'
import { Button, Capsule } from 'shared-components'

export default function HomePage() {
  return (
    <div className="min-h-screen pixel-font">
      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center md:pt-48">
        <div className="max-w-6xl mx-auto">
          <h1 className="trustclinic-title pixel-font text-4xl md:text-6xl font-bold mb-16">
            TrustClinic
          </h1>

          {/* Круг с капсулой */}
          <div className="flex justify-center mb-16">
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full border-8 border-pink-300 bg-blue-100/20" />
              <div className="absolute inset-0 rounded-full border-4 border-blue-200/50" />
              <Capsule
                size={250}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl pixel-accent mb-6 font-bold">
              Пройди медицинский тест — быстро!
            </h2>
            <p className="text-sm md:text-base pixel-accent-blue opacity-90 mb-8 max-w-2xl mx-auto">
              Пройдите медицинский опрос и получите результат за минуты.
            </p>
            <Link to="/register">
              <Button className="pixel-btn">
                Начать опрос
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ОСОБЕННОСТИ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-xl md:text-2xl text-center pixel-accent mb-12">
          Почему TrustClinic?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="pixel-card text-center">
            <h3 className="font-bold mb-2 pixel-accent">Быстро</h3>
            <p className="text-xs pixel-accent-blue">5 минут на тест</p>
          </div>
          <div className="pixel-card text-center">
            <h3 className="font-bold mb-2 pixel-accent-blue">Точно</h3>
            <p className="text-xs pixel-accent-blue">На основе медицины</p>
          </div>
          <div className="pixel-card text-center">
            <h3 className="font-bold mb-2 pixel-accent">Мило</h3>
            <p className="text-xs pixel-accent-blue">Пиксельный дизайн</p>
          </div>
        </div>
      </section>

      {/* КАК РАБОТАЕТ */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl text-center pixel-accent-blue mb-12">
            Как это работает
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-base font-bold mb-4 pixel-accent">Заполни опрос</h3>
              <p className="text-xs pixel-accent-blue opacity-80">
                Ответь на простые вопросы о здоровье.
              </p>
            </div>
            <div className="pixel-card p-6">
              <p className="text-center text-xs pixel-accent-blue">Вопросы: 10 шт.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="pixel-card p-6">
              <p className="text-center text-xs pixel-accent-blue">Результат: % риска</p>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 pixel-accent">Получи результат</h3>
              <p className="text-xs pixel-accent-blue opacity-80">
                Узнай свой уровень риска и рекомендации.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ПРИМЕРЫ РЕЗУЛЬТАТОВ */}
      <section className="py-16 pixel-bg">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl text-center pixel-accent mb-8">
            Примеры результатов
          </h2>
          <p className="text-center mb-12 text-xs pixel-accent-blue opacity-80">
            Как выглядит вывод после анализа
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="pixel-card">
              <h4 className="font-bold mb-2 pixel-accent-blue">Пациент 1</h4>
              <p className="text-xs pixel-accent-blue">
                Риск: <b className="pixel-accent">24%</b>
              </p>
              <p className="text-xs pixel-accent-blue opacity-70 mt-2">
                Наблюдение, повтор через 30 дней.
              </p>
            </div>
            <div className="pixel-card">
              <h4 className="font-bold mb-2 pixel-accent-blue">Пациент 2</h4>
              <p className="text-xs pixel-accent-blue">
                Риск: <b className="pixel-accent">67%</b>
              </p>
              <p className="text-xs pixel-accent-blue opacity-70 mt-2">
                Визит к врачу и расширенная диагностика.
              </p>
            </div>
            <div className="pixel-card">
              <h4 className="font-bold mb-2 pixel-accent-blue">Пациент 3</h4>
              <p className="text-xs pixel-accent-blue">
                Риск: <b className="pixel-accent-blue">6%</b>
              </p>
              <p className="text-xs pixel-accent-blue opacity-70 mt-2">
                Профилактика.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl text-center pixel-accent-blue mb-12">
            Отзывы пользователей
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="pixel-card">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-200 rounded-full" />
                  <div>
                    <h4 className="font-bold text-xs pixel-accent-blue">Пользователь</h4>
                    <p className="text-xs pixel-accent-blue opacity-70">2 недели назад</p>
                  </div>
                </div>
                <p className="mt-4 text-xs pixel-accent-blue opacity-90">
                  Очень помогло понять уровень риска и что делать дальше.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
