window.FORMULA_TOPICS = [
  {
    id: "mechanics",
    title: "Механика",
    sections: [
      {
        title: "Кинематика",
        items: [
          { latex: "\\vec{v} = \\frac{d\\vec{r}}{dt}", title: "Скорость", search: ["скорость", "кинематика"] },
          { latex: "\\vec{a} = \\frac{d\\vec{v}}{dt}", title: "Ускорение", search: ["ускорение", "кинематика"] },
          { latex: "s = v_0 t + \\frac{at^2}{2}", title: "Перемещение при равноускоренном движении", search: ["перемещение", "движение"] },
          { latex: "v^2 = v_0^2 + 2as", title: "Связь скорости и перемещения", search: ["скорость", "перемещение"] },
          { latex: "\\omega = \\frac{2\\pi}{T} = 2\\pi f", title: "Угловая скорость", search: ["угловая скорость", "вращение"] },
          { latex: "a_n = \\frac{v^2}{R} = \\omega^2 R", title: "Центростремительное ускорение", search: ["центростремительное", "вращение"] }
        ]
      },
      {
        title: "Динамика",
        items: [
          {
            latex: "\\vec{F} = m\\vec{a}",
            title: "Второй закон Ньютона",
            scientist: "Исаак Ньютон",
            year: "1687",
            applications: "Расчёт движения тел, инженерия, космонавтика",
            search: ["ньютон", "сила", "динамика"]
          },
          {
            latex: "F = G\\frac{m_1 m_2}{r^2}",
            title: "Закон всемирного тяготения",
            scientist: "Исаак Ньютон",
            year: "1687",
            applications: "Астрономия, спутниковые системы, гравитационные расчёты",
            search: ["тяготение", "гравитация", "ньютон"]
          },
          { latex: "F = kx", title: "Закон Гука", search: ["гук", "деформация"] },
          { latex: "F = \\mu N", title: "Сила трения", search: ["трение"] },
          { latex: "p = mv", title: "Импульс", search: ["импульс"] },
          { latex: "\\vec{F}\\Delta t = \\Delta \\vec{p}", title: "Импульс силы", search: ["импульс силы"] }
        ]
      },
      {
        title: "Работа и энергия",
        items: [
          { latex: "A = Fs\\cos\\alpha", title: "Работа силы", search: ["работа"] },
          { latex: "N = \\frac{A}{t} = Fv\\cos\\alpha", title: "Мощность", search: ["мощность"] },
          { latex: "E_k = \\frac{mv^2}{2}", title: "Кинетическая энергия", search: ["энергия"] },
          { latex: "E_p = mgh", title: "Потенциальная энергия в поле тяжести", search: ["потенциальная энергия"] },
          { latex: "E_p = \\frac{kx^2}{2}", title: "Потенциальная энергия упругой деформации", search: ["упругая энергия"] },
          {
            latex: "E_{полная} = E_k + E_p",
            title: "Полная механическая энергия",
            scientist: "Готфрид Лейбниц",
            year: "1695",
            applications: "Механика, энергетика, инженерные расчёты",
            search: ["энергия", "лейбниц"]
          }
        ]
      },
      {
        title: "Колебания и волны",
        items: [
          { latex: "x = A\\cos(\\omega t + \\varphi_0)", title: "Уравнение гармонических колебаний", search: ["колебания"] },
          { latex: "T = 2\\pi\\sqrt{\\frac{m}{k}}", title: "Период пружинного маятника", search: ["маятник", "пружина"] },
          { latex: "T = 2\\pi\\sqrt{\\frac{l}{g}}", title: "Период математического маятника", search: ["маятник"] },
          { latex: "v = \\lambda f", title: "Скорость волны", search: ["волна", "длина волны"] },
          { latex: "\\omega = \\sqrt{\\frac{k}{m}}", title: "Циклическая частота пружинного маятника", search: ["частота"] }
        ]
      }
    ]
  },
  {
    id: "thermodynamics",
    title: "Термодинамика и молекулярная физика",
    sections: [
      {
        title: "Основы МКТ",
        items: [
          { latex: "p = nkT", title: "Уравнение состояния идеального газа", search: ["газ", "мкт"] },
          {
            latex: "pV = \\frac{m}{M}RT",
            title: "Уравнение Менделеева-Клапейрона",
            scientist: "Бенуа Клапейрон",
            year: "1834",
            applications: "Термодинамика, двигатели, климатология",
            search: ["клапейрон", "газ", "менделеев"]
          },
          { latex: "E_k = \\frac{3}{2}kT", title: "Средняя кинетическая энергия молекулы", search: ["энергия молекулы"] },
          { latex: "\\langle v \\rangle = \\sqrt{\\frac{8kT}{\\pi m}}", title: "Средняя скорость молекул", search: ["скорость молекул"] },
          { latex: "v_{кв} = \\sqrt{\\frac{3kT}{m}}", title: "Квадратичная скорость молекул", search: ["квадратичная скорость"] }
        ]
      },
      {
        title: "Термодинамика",
        items: [
          { latex: "\\Delta U = Q - A", title: "Первый закон термодинамики", search: ["первый закон"] },
          { latex: "A = p\\Delta V", title: "Работа газа при изобарном процессе", search: ["работа газа"] },
          { latex: "Q = cm\\Delta T", title: "Количество теплоты", search: ["теплота"] },
          { latex: "\\eta = \\frac{A}{Q_1} = 1 - \\frac{T_2}{T_1}", title: "КПД тепловой машины", search: ["кпд", "карно"] },
          { latex: "\\Delta S \\geq \\frac{Q}{T}", title: "Второй закон термодинамики", search: ["второй закон", "энтропия"] }
        ]
      },
      {
        title: "Агрегатные состояния",
        items: [
          { latex: "\\rho = \\frac{m}{V}", title: "Плотность", search: ["плотность"] },
          { latex: "p = \\rho gh", title: "Давление столба жидкости", search: ["давление"] },
          { latex: "F_A = \\rho gV", title: "Сила Архимеда", search: ["архимед"] },
          { latex: "Q = \\lambda m", title: "Удельная теплота плавления", search: ["плавление"] },
          { latex: "Q = Lm", title: "Удельная теплота парообразования", search: ["парообразование"] }
        ]
      }
    ]
  },
  {
    id: "electrodynamics",
    title: "Электродинамика",
    sections: [
      {
        title: "Электростатика",
        items: [
          { latex: "F = k\\frac{q_1q_2}{r^2}", title: "Закон Кулона", search: ["кулон", "электростатика"] },
          { latex: "E = \\frac{F}{q}", title: "Напряжённость электрического поля", search: ["напряженность"] },
          { latex: "\\varphi = \\frac{W}{q}", title: "Потенциал электрического поля", search: ["потенциал"] },
          { latex: "C = \\frac{q}{U}", title: "Электроёмкость", search: ["электроемкость"] },
          { latex: "W_e = \\frac{qU}{2} = \\frac{CU^2}{2}", title: "Энергия электрического поля", search: ["энергия поля"] }
        ]
      },
      {
        title: "Постоянный ток",
        items: [
          { latex: "I = \\frac{q}{t}", title: "Сила тока", search: ["ток"] },
          {
            latex: "U = IR",
            title: "Закон Ома для участка цепи",
            scientist: "Георг Ом",
            year: "1827",
            applications: "Электротехника, электроника, схемотехника",
            search: ["ом", "сопротивление", "ток"]
          },
          { latex: "R = \\rho\\frac{l}{S}", title: "Сопротивление проводника", search: ["сопротивление"] },
          { latex: "P = UI = I^2R = \\frac{U^2}{R}", title: "Мощность электрического тока", search: ["мощность тока"] },
          { latex: "Q = I^2Rt", title: "Закон Джоуля-Ленца", search: ["джоуль", "теплота"] },
          { latex: "\\varepsilon = I(R + r)", title: "Закон Ома для полной цепи", search: ["полная цепь"] }
        ]
      },
      {
        title: "Магнетизм",
        items: [
          { latex: "F = BIl\\sin\\alpha", title: "Сила Ампера", search: ["ампер"] },
          { latex: "F = qvB\\sin\\alpha", title: "Сила Лоренца", search: ["лоренц"] },
          { latex: "\\Phi = BS\\cos\\alpha", title: "Магнитный поток", search: ["магнитный поток"] },
          {
            latex: "\\varepsilon = -\\frac{\\Delta\\Phi}{\\Delta t}",
            title: "Закон электромагнитной индукции Фарадея",
            scientist: "Майкл Фарадей",
            year: "1831",
            applications: "Генераторы, трансформаторы, электромоторы",
            search: ["фарадей", "индукция"]
          },
          { latex: "L = \\frac{\\Phi}{I}", title: "Индуктивность", search: ["индуктивность"] },
          { latex: "W_m = \\frac{LI^2}{2}", title: "Энергия магнитного поля", search: ["магнитное поле"] }
        ]
      }
    ]
  },
  {
    id: "optics",
    title: "Оптика",
    sections: [
      {
        title: "Геометрическая оптика",
        items: [
          { latex: "n = \\frac{c}{v}", title: "Абсолютный показатель преломления", search: ["преломление"] },
          { latex: "\\frac{\\sin\\alpha}{\\sin\\beta} = n_{21}", title: "Закон преломления света", search: ["преломление", "свет"] },
          { latex: "\\sin\\alpha_{пр} = \\frac{n_2}{n_1}", title: "Предельный угол полного внутреннего отражения", search: ["внутреннее отражение"] },
          { latex: "\\frac{1}{f} + \\frac{1}{d} = \\frac{1}{F}", title: "Формула тонкой линзы", search: ["линза"] },
          { latex: "\\Gamma = \\frac{f}{d}", title: "Увеличение линзы", search: ["увеличение линзы"] }
        ]
      },
      {
        title: "Волновая оптика",
        items: [
          { latex: "\\Delta x = \\frac{\\lambda L}{d}", title: "Ширина интерференционной полосы", search: ["интерференция"] },
          { latex: "d\\sin\\varphi = k\\lambda", title: "Условие максимумов дифракционной решётки", search: ["дифракция"] },
          { latex: "I = I_0\\cos^2\\alpha", title: "Закон Малюса", search: ["малюс"] },
          { latex: "\\lambda = \\frac{c}{\\nu}", title: "Длина волны", search: ["длина волны"] }
        ]
      }
    ]
  },
  {
    id: "quantum",
    title: "Квантовая физика",
    sections: [
      {
        title: "Квантовая оптика",
        items: [
          { latex: "E = h\\nu", title: "Энергия фотона", search: ["фотон"] },
          { latex: "p = \\frac{h}{\\lambda}", title: "Импульс фотона", search: ["импульс фотона"] },
          { latex: "A_{вых} = h\\nu - E_k", title: "Уравнение Эйнштейна для фотоэффекта", search: ["эйнштейн", "фотоэффект"] },
          { latex: "\\lambda = \\frac{h}{mv}", title: "Длина волны де Бройля", search: ["де бройль"] }
        ]
      },
      {
        title: "Атомная физика",
        items: [
          { latex: "E_n = -\\frac{13.6\\,\\text{эВ}}{n^2}", title: "Энергетические уровни атома водорода", search: ["атом водорода"] },
          { latex: "\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)", title: "Формула Бальмера-Ридберга", search: ["ридберг", "бальмер"] },
          { latex: "\\Delta E = h\\nu", title: "Излучение при переходе между уровнями", search: ["переходы", "излучение"] }
        ]
      }
    ]
  },
  {
    id: "nuclear",
    title: "Ядерная физика",
    sections: [
      {
        title: "Ядерные реакции",
        items: [
          {
            latex: "E = mc^2",
            title: "Эквивалентность массы и энергии",
            scientist: "Альберт Эйнштейн",
            year: "1905",
            applications: "Ядерная энергетика, астрофизика, физика частиц",
            search: ["эйнштейн", "масса", "энергия"]
          },
          { latex: "\\Delta E = \\Delta m \\cdot c^2", title: "Энергия ядерной реакции", search: ["ядерная реакция"] },
          { latex: "E_{связи} = \\Delta m \\cdot c^2", title: "Энергия связи ядра", search: ["энергия связи"] },
          { latex: "N(t) = N_0 \\cdot 2^{-t/T_{1/2}}", title: "Закон радиоактивного распада", search: ["распад", "полураспад"] },
          { latex: "T_{1/2} = \\frac{\\ln 2}{\\lambda}", title: "Период полураспада", search: ["полураспад"] }
        ]
      }
    ]
  }
];
