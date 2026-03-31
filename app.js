const formulaSearch = document.getElementById("formula-search");
const scientistSearch = document.getElementById("scientist-search");
const formulaRoot = document.getElementById("formula-root");
const scientistRoot = document.getElementById("scientist-root");
const formulaEmpty = document.getElementById("formula-empty");
const scientistEmpty = document.getElementById("scientist-empty");
const formulaFilterRow = document.getElementById("formula-topic-filters");
const scientistFilterRow = document.getElementById("scientist-field-filters");
const detailOverlay = document.getElementById("detail-overlay");
const detailPanel = document.getElementById("detail-panel");
const detailContent = document.getElementById("detail-content");
const detailClose = document.getElementById("detail-close");
let revealObserver;
let revealRefreshFrame = 0;
let mathTypesetFrame = 0;
const mobileOptimizationMedia = window.matchMedia("(max-width: 820px), (hover: none) and (pointer: coarse)");

const state = {
  formulaQuery: "",
  formulaTopic: "all",
  scientistQuery: "",
  scientistField: "all"
};

const allFormulaItems = [];
window.FORMULA_TOPICS.forEach((topic) => {
  topic.sections.forEach((section) => {
    section.items.forEach((item) => {
      allFormulaItems.push({
        ...item,
        topicId: topic.id,
        topicTitle: topic.title,
        sectionTitle: section.title
      });
    });
  });
});

const scientists = Object.entries(window.SCIENTISTS_BY_FIELD).reduce((result, entry) => {
  const field = entry[0];
  const names = entry[1];

  names.forEach((name) => {
    result.push({
      name,
      field,
      achievement: window.ACHIEVEMENTS[name] || fallbackAchievement(field)
    });
  });

  return result;
}, []);

function fallbackAchievement(field) {
  const textByField = {
    "Математика": "Развил ключевые математические методы, которыми пользуются в науке и технике.",
    "Физика": "Внес вклад в понимание законов природы и развитие современной физики.",
    "Химия": "Сделал открытия, повлиявшие на развитие химии и промышленности.",
    "Биология и медицина": "Повлиял на развитие биологии, медицины и понимание живых систем.",
    "Астрономия и астрофизика": "Расширил представления о строении и эволюции Вселенной.",
    "Информатика": "Развил основы вычислений, алгоритмов и цифровых технологий.",
    "Кибернетика": "Развил идеи управления, обратной связи и системного анализа.",
    "Прикладная математика": "Применил математику к реальным задачам анализа, моделирования и оптимизации.",
    "Космонавтика и инженерия": "Внес вклад в ракетостроение, инженерию и освоение космоса.",
    "Философия": "Сформулировал идеи, повлиявшие на развитие философской мысли.",
    "Филология": "Развил исследования языка, текста и культурной традиции."
  };
  return textByField[field] || "Внес заметный вклад в развитие своей научной дисциплины.";
}

function normalize(text) {
  return text.toLowerCase().trim();
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function createChip(text, extraClass = "") {
  return `<span class="micro-chip ${extraClass}">${text}</span>`;
}

function getRelatedFormulaTitles(scientistName) {
  return allFormulaItems
    .filter((item) => item.scientist === scientistName)
    .map((item) => item.title);
}

function buildFormulaCopy(item) {
  if (item.scientist) {
    return `Связана с именем ${item.scientist}. Открой карточку, чтобы увидеть контекст, год и применение.`;
  }
  return "";
}

function buildFormulaFilters() {
  const filters = [{ id: "all", title: "Все темы" }, ...window.FORMULA_TOPICS.map(({ id, title }) => ({ id, title }))];
  formulaFilterRow.innerHTML = filters
    .map(
      ({ id, title }) =>
        `<button class="chip-button${id === state.formulaTopic ? " is-active" : ""}" type="button" data-formula-filter="${id}">${title}</button>`
    )
    .join("");
}

function buildScientistFilters() {
  const filters = [{ field: "all", title: "Все области" }, ...Object.keys(window.SCIENTISTS_BY_FIELD).map((field) => ({ field, title: field }))];
  scientistFilterRow.innerHTML = filters
    .map(
      ({ field, title }) =>
        `<button class="chip-button${field === state.scientistField ? " is-active" : ""}" type="button" data-scientist-filter="${field}">${title}</button>`
    )
    .join("");
}

function matchFormula(item, query) {
  if (!query) {
    return true;
  }
  const haystack = [
    item.title,
    item.latex,
    item.topicTitle,
    item.sectionTitle,
    item.scientist || "",
    ...(item.search || [])
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function matchScientist(item, query) {
  if (!query) {
    return true;
  }
  return [item.name, item.field, item.achievement].join(" ").toLowerCase().includes(query);
}

function typesetMath() {
  if (!window.MathJax || typeof window.MathJax.typesetPromise !== "function") {
    return;
  }

  if (mathTypesetFrame) {
    cancelAnimationFrame(mathTypesetFrame);
  }

  mathTypesetFrame = requestAnimationFrame(() => {
    const targets = [formulaRoot, detailContent].filter((node) => node && node.childElementCount > 0);
    if (!targets.length) {
      return;
    }
    window.MathJax.typesetPromise(targets).catch(() => {});
  });
}

function renderFormulas() {
  const query = normalize(state.formulaQuery);
  const visibleByTopic = window.FORMULA_TOPICS.map((topic) => {
    const sections = topic.sections
      .map((section) => {
        const items = section.items.filter((item) => {
          const topicMatch = state.formulaTopic === "all" || topic.id === state.formulaTopic;
          return topicMatch && matchFormula({ ...item, topicTitle: topic.title, sectionTitle: section.title }, query);
        });
        return { ...section, items };
      })
      .filter((section) => section.items.length > 0);
    return { ...topic, sections };
  }).filter((topic) => topic.sections.length > 0);

  const visibleCount = visibleByTopic.reduce(
    (sum, topic) => sum + topic.sections.reduce((inner, section) => inner + section.items.length, 0),
    0
  );

  document.getElementById("formula-visible-count").textContent = String(visibleCount);
  document.getElementById("formula-total-count").textContent = String(allFormulaItems.length);
  formulaEmpty.hidden = visibleCount !== 0;

  formulaRoot.innerHTML = visibleByTopic
    .map(
      (topic) => `
        <article class="formula-block">
          <div class="formula-block__head">
            <h3>${topic.title}</h3>
            <span class="formula-block__count">${topic.sections.reduce((sum, section) => sum + section.items.length, 0)} карточек</span>
          </div>
          ${topic.sections
            .map(
              (section) => `
                <section class="formula-subsection">
                  <h4>${section.title}</h4>
                  <div class="formula-grid">
                    ${section.items
                      .map((item) => {
                        const meta = [
                          createChip(topic.title),
                          createChip(section.title),
                          item.scientist ? createChip(item.scientist, "micro-chip--accent") : createChip("Справка"),
                          createChip("Нажми для деталей", "micro-chip--blue")
                        ].join("");
                        return `
                          <article
                            class="formula-card reveal-item${item.scientist ? " is-important" : ""}"
                            tabindex="0"
                            data-detail-type="formula"
                            data-title="${escapeAttribute(item.title)}"
                            data-latex="${escapeAttribute(item.latex)}"
                            data-topic="${escapeAttribute(topic.title)}"
                            data-section="${escapeAttribute(section.title)}"
                            data-scientist="${escapeAttribute(item.scientist || "")}"
                            data-year="${escapeAttribute(item.year || "")}"
                            data-applications="${escapeAttribute(item.applications || "")}"
                          >
                            <div class="formula-card__meta">${meta}</div>
                            <div class="formula-card__formula">$$${item.latex}$$</div>
                            <h4 class="formula-card__title">${item.title}</h4>
                            ${item.scientist ? `<p class="formula-card__copy">${buildFormulaCopy(item)}</p>` : ""}
                          </article>
                        `;
                      })
                      .join("")}
                  </div>
                </section>
              `
            )
            .join("")}
        </article>
      `
    )
    .join("");

  typesetMath();
  refreshRevealAnimations();
}

function renderScientists() {
  const query = normalize(state.scientistQuery);
  const visibleScientists = scientists.filter((scientist) => {
    const fieldMatch = state.scientistField === "all" || scientist.field === state.scientistField;
    return fieldMatch && matchScientist(scientist, query);
  });

  document.getElementById("scientist-visible-count").textContent = String(visibleScientists.length);
  document.getElementById("scientist-total-count").textContent = String(scientists.length);
  scientistEmpty.hidden = visibleScientists.length !== 0;

  scientistRoot.innerHTML = visibleScientists
    .map((scientist, index) => {
      const related = getRelatedFormulaTitles(scientist.name);
      return `
        <article
          class="scientist-card reveal-item"
          tabindex="0"
          data-detail-type="scientist"
          data-name="${escapeAttribute(scientist.name)}"
          data-field="${escapeAttribute(scientist.field)}"
          data-achievement="${escapeAttribute(scientist.achievement)}"
          data-related="${escapeAttribute(related.join(" | "))}"
        >
          <div class="scientist-card__meta">
            ${createChip(scientist.field)}
            ${createChip(`#${index + 1}`, "micro-chip--blue")}
            ${related.length ? createChip(`${related.length} связ. формул`, "micro-chip--accent") : createChip("Каталог")}
          </div>
          <h3 class="scientist-card__title">${scientist.name}</h3>
          <p class="scientist-card__copy">${scientist.achievement}</p>
        </article>
      `;
    })
    .join("");

  refreshRevealAnimations();
}

function copyText(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    navigator.clipboard.writeText(text).catch(() => copyTextFallback(text));
    return;
  }
  copyTextFallback(text);
}

function copyTextFallback(text) {
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
}

function openDetailPanel(markup) {
  detailContent.innerHTML = markup;
  detailOverlay.hidden = false;
  detailPanel.hidden = false;
  typesetMath();
}

function closeDetailPanel() {
  detailOverlay.hidden = true;
  detailPanel.hidden = true;
  detailContent.innerHTML = "";
}

function isMobileOptimizationEnabled() {
  return mobileOptimizationMedia.matches;
}

function syncPerformanceMode() {
  document.body.classList.toggle("is-mobile-optimized", isMobileOptimizationEnabled());
}

function refreshRevealAnimations() {
  const selectors = [
    ".hero",
    ".hub-card",
    ".section-head",
    ".toolbar",
    ".formula-block",
    ".formula-card",
    ".scientist-card",
    ".empty-state"
  ];

  document.querySelectorAll(selectors.join(", ")).forEach((node) => {
    node.classList.add("reveal-item");
  });

  const revealNodes = document.querySelectorAll(".reveal-item");
  syncPerformanceMode();

  if (isMobileOptimizationEnabled()) {
    document.body.classList.remove("has-reveal");
    revealNodes.forEach((node) => {
      node.classList.add("is-visible");
    });

    if (revealObserver) {
      revealObserver.disconnect();
    }
    return;
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  revealNodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    const isInitiallyVisible = rect.top < viewportHeight * 0.96 && rect.bottom > viewportHeight * 0.04;
    node.classList.toggle("is-visible", isInitiallyVisible);
  });

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.01,
        rootMargin: "12% 0px 18% 0px"
      }
    );
  }

  revealObserver.disconnect();
  document.body.classList.add("has-reveal");
  revealNodes.forEach((node) => {
    revealObserver.observe(node);
  });
}

function scheduleRevealRefresh() {
  if (revealRefreshFrame) {
    cancelAnimationFrame(revealRefreshFrame);
  }

  revealRefreshFrame = requestAnimationFrame(() => {
    refreshRevealAnimations();
  });
}

function showFormulaDetails(card) {
  const title = card.dataset.title;
  const latex = card.dataset.latex;
  const scientist = card.dataset.scientist;
  const topic = card.dataset.topic;
  const section = card.dataset.section;
  const year = card.dataset.year;
  const applications = card.dataset.applications;

  copyText(latex);

  openDetailPanel(`
    ${createChip(topic)}
    ${createChip(section, "micro-chip--blue")}
    ${scientist ? createChip(scientist, "micro-chip--accent") : ""}
    <h3>${title}</h3>
    <div class="formula-card__formula">$$${latex}$$</div>
    <p>Формула скопирована в буфер обмена. Так её удобнее использовать в конспектах и заметках.</p>
    <div class="detail-list">
      <p><strong>Тема:</strong> ${topic}</p>
      <p><strong>Подраздел:</strong> ${section}</p>
      ${scientist ? `<p><strong>Связанное имя:</strong> ${scientist}</p>` : ""}
      ${year ? `<p><strong>Год:</strong> ${year}</p>` : ""}
      ${applications ? `<p><strong>Применение:</strong> ${applications}</p>` : ""}
    </div>
    <div class="detail-link-row">
      <a class="detail-link" href="#formulas">Остаться в формулах</a>
      ${scientist ? `<a class="detail-link" href="#scientists" data-open-scientist="${escapeAttribute(scientist)}">Открыть учёного</a>` : ""}
    </div>
  `);
}

function showScientistDetails(card) {
  const name = card.dataset.name;
  const field = card.dataset.field;
  const achievement = card.dataset.achievement;
  const related = card.dataset.related ? card.dataset.related.split(" | ").filter(Boolean) : [];

  openDetailPanel(`
    ${createChip(field)}
    <h3>${name}</h3>
    <p>${achievement}</p>
    <div class="detail-list">
      <p><strong>Область:</strong> ${field}</p>
      <p><strong>Связанные формулы:</strong> ${related.length ? related.join(", ") : "В текущем наборе прямой связи пока нет."}</p>
    </div>
    <div class="detail-link-row">
      <a class="detail-link" href="#scientists">Остаться в каталоге</a>
      ${related
        .map((title) => `<a class="detail-link" href="#formulas" data-formula-title="${escapeAttribute(title)}">${title}</a>`)
        .join("")}
    </div>
  `);
}

function handleBodyClick(event) {
  const formulaCard = event.target.closest(".formula-card");
  if (formulaCard) {
    showFormulaDetails(formulaCard);
    return;
  }

  const scientistCard = event.target.closest(".scientist-card");
  if (scientistCard) {
    showScientistDetails(scientistCard);
    return;
  }

  const scientistLink = event.target.closest("[data-open-scientist]");
  if (scientistLink) {
    event.preventDefault();
    closeDetailPanel();
    const targetName = scientistLink.dataset.openScientist;
    document.getElementById("scientists").scrollIntoView({ behavior: "smooth", block: "start" });
    state.scientistQuery = targetName;
    scientistSearch.value = targetName;
    renderScientists();
    return;
  }

  const formulaLink = event.target.closest("[data-formula-title]");
  if (formulaLink) {
    event.preventDefault();
    closeDetailPanel();
    const targetTitle = formulaLink.dataset.formulaTitle;
    document.getElementById("formulas").scrollIntoView({ behavior: "smooth", block: "start" });
    state.formulaQuery = targetTitle;
    formulaSearch.value = targetTitle;
    renderFormulas();
    return;
  }

  const plainDetailLink = event.target.closest(".detail-link[href^='#']");
  if (plainDetailLink) {
    setTimeout(closeDetailPanel, 0);
  }
}

function setHeroCounters() {
  document.getElementById("hero-topic-count").textContent = String(window.FORMULA_TOPICS.length);
  document.getElementById("hero-formula-count").textContent = String(allFormulaItems.length);
  document.getElementById("hero-scientist-count").textContent = String(scientists.length);
}

function attachEvents() {
  formulaSearch.addEventListener("input", (event) => {
    state.formulaQuery = event.target.value;
    renderFormulas();
  });

  scientistSearch.addEventListener("input", (event) => {
    state.scientistQuery = event.target.value;
    renderScientists();
  });

  formulaFilterRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-formula-filter]");
    if (!button) {
      return;
    }
    state.formulaTopic = button.dataset.formulaFilter;
    buildFormulaFilters();
    renderFormulas();
  });

  scientistFilterRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-scientist-filter]");
    if (!button) {
      return;
    }
    state.scientistField = button.dataset.scientistFilter;
    buildScientistFilters();
    renderScientists();
  });

  document.body.addEventListener("click", handleBodyClick);

  document.body.addEventListener("keydown", (event) => {
    const card = event.target.closest(".formula-card, .scientist-card");
    if (card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      card.click();
    }
    if (event.key === "Escape" && !detailPanel.hidden) {
      closeDetailPanel();
    }
  });

  detailClose.addEventListener("click", closeDetailPanel);
  detailOverlay.addEventListener("click", closeDetailPanel);
  window.addEventListener("resize", scheduleRevealRefresh);
  if (typeof mobileOptimizationMedia.addEventListener === "function") {
    mobileOptimizationMedia.addEventListener("change", scheduleRevealRefresh);
  } else if (typeof mobileOptimizationMedia.addListener === "function") {
    mobileOptimizationMedia.addListener(scheduleRevealRefresh);
  }
}

function init() {
  syncPerformanceMode();
  buildFormulaFilters();
  buildScientistFilters();
  setHeroCounters();
  renderFormulas();
  renderScientists();
  scheduleRevealRefresh();
  attachEvents();
}

init();
