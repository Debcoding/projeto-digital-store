/* =========================================================
   Digital Store – comportamento do site
   Navegação por hash (#/, #/produtos, #/categorias, #/em-breve)
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)]
const app = $("#app")

/* ---------- Utilitários ---------- */
const norm = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  )
const round2 = (n) => Math.round(n * 100) / 100
const ceil10 = (n) => Math.ceil(round2(n) / 10) * 10 // sobe para a próxima dezena: 136,50 -> 140,00
const brl = (n) =>
  n
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace(/\u00a0/g, " ")

/* ---------- Dados ---------- */
// Preços do PDF (base). Todos recebem +5%; os 3 primeiros ganham 35% de desconto.
// Depois, todo valor é arredondado para cima até a próxima dezena (ex.: 150,00; 200,00).
const RAW_PRODUCTS = [
  {
    name: "Tênis Air Jordan — Masculino",
    img: "public/product-thumb-1.jpeg",
    base: 200,
    marca: "Nike",
    categoria: "Casual",
    genero: "Masculino",
    estado: "Novo",
  },
  {
    name: "Tênis Nike Casual — Unissex",
    img: "public/product-thumb-2.jpeg",
    base: 220,
    marca: "Nike",
    categoria: "Casual",
    genero: "Unissex",
    estado: "Novo",
  },
  {
    name: "Tênis Sport Classic — Feminino",
    img: "public/product-thumb-3.jpeg",
    base: 240,
    marca: "Puma",
    categoria: "Esporte e lazer",
    genero: "Feminino",
    estado: "Novo",
  },
  {
    name: "Tênis Urban — Masculino",
    img: "public/product-thumb-4.jpeg",
    base: 260,
    marca: "Adidas",
    categoria: "Casual",
    genero: "Masculino",
    estado: "Usado",
  },
  {
    name: "Tênis Everyday — Unissex",
    img: "public/product-thumb-5.jpeg",
    base: 280,
    marca: "Nike",
    categoria: "Corrida",
    genero: "Unissex",
    estado: "Novo",
  },
  {
    name: "Tênis Air Jordan — Feminino",
    img: "public/product-thumb-1.jpeg",
    base: 300,
    marca: "Nike",
    categoria: "Casual",
    genero: "Feminino",
    estado: "Novo",
  },
  {
    name: "Tênis Nike Essential — Masculino",
    img: "public/product-thumb-2.jpeg",
    base: 320,
    marca: "Nike",
    categoria: "Esporte e lazer",
    genero: "Masculino",
    estado: "Usado",
  },
  {
    name: "Tênis Sport Comfort — Unissex",
    img: "public/product-thumb-3.jpeg",
    base: 340,
    marca: "K-Swiss",
    categoria: "Utilitário",
    genero: "Unissex",
    estado: "Novo",
  },
  {
    name: "Tênis Urban Classic — Feminino",
    img: "public/product-thumb-4.jpeg",
    base: 360,
    marca: "Balenciaga",
    categoria: "Casual",
    genero: "Feminino",
    estado: "Novo",
  },
  {
    name: "Tênis Everyday Casual — Masculino",
    img: "public/product-thumb-5.jpeg",
    base: 380,
    marca: "Nike",
    categoria: "Corrida",
    genero: "Masculino",
    estado: "Novo",
  },
  {
    name: "Tênis Air Jordan High — Unissex",
    img: "public/product-thumb-1.jpeg",
    base: 400,
    marca: "Nike",
    categoria: "Esporte e lazer",
    genero: "Unissex",
    estado: "Usado",
  },
  {
    name: "Tênis Nike Street — Feminino",
    img: "public/product-thumb-2.jpeg",
    base: 420,
    marca: "Nike",
    categoria: "Utilitário",
    genero: "Feminino",
    estado: "Novo",
  },
]

const PRODUCTS = RAW_PRODUCTS.map((p, i) => {
  const price = ceil10(p.base * 1.05)
  const hasDiscount = i < 3
  return {
    ...p,
    id: i + 1,
    tipo: "tenis",
    categoriaLabel: "Tênis",
    price,
    discount: hasDiscount ? 35 : 0,
    salePrice: hasDiscount ? ceil10(price * 0.65) : null,
  }
})
const finalPrice = (p) => p.salePrice ?? p.price

const TIPOS = {
  camisetas: "Camisetas",
  calcas: "Calças",
  bones: "Bonés",
  headphones: "Headphones",
  tenis: "Tênis",
}

const FILTER_GROUPS = [
  {
    key: "marca",
    title: "Marca",
    inputType: "checkbox",
    options: ["Adidas", "Balenciaga", "K-Swiss", "Nike", "Puma"],
  },
  {
    key: "categoria",
    title: "Categoria",
    inputType: "checkbox",
    options: ["Esporte e lazer", "Casual", "Utilitário", "Corrida"],
  },
  {
    key: "genero",
    title: "Gênero",
    inputType: "checkbox",
    options: ["Masculino", "Feminino", "Unissex"],
  },
  {
    key: "estado",
    title: "Estado",
    inputType: "radio",
    options: ["Novo", "Usado"],
  },
]

const SLIDES = Array.from(
  { length: 8 },
  (_, i) => `public/home-slide-${i + 1}.jpeg`,
)

/* ---------- Componentes (templates) ---------- */
function productCard(p, variant = "home") {
  const priceHtml = p.salePrice
    ? `<s>${brl(p.price)}</s> <b>${brl(p.salePrice)}</b>`
    : `<b>${brl(p.price)}</b>`
  return `
    <article class="product-card product-card--${variant}">
      <a href="#/produto/${p.id}" class="product-card__link" aria-label="Ver ${esc(p.name)}">
      <div class="product-card__image">
        ${p.discount ? `<span class="badge-tag">${p.discount}% OFF</span>` : ""}
        <img src="${p.img}" alt="${esc(p.name)}" loading="lazy">
      </div>
      <span class="product-card__category">${p.categoriaLabel}</span>
      <h3 class="product-card__name">${esc(p.name)}</h3>
      <p class="product-card__price">${priceHtml}</p>
      </a>
    </article>`
}

function filterGroup(g) {
  const items = g.options
    .map(
      (opt) => `
    <label class="filter-option">
      <input type="${g.inputType}" name="${g.key}" value="${esc(opt)}" data-key="${g.key}">
      <span>${esc(opt)}</span>
    </label>`,
    )
    .join("")
  return `
    <fieldset class="filter-group">
      <legend>${g.title}</legend>
      ${items}
    </fieldset>`
}

/* ---------- Views ---------- */
const ICONS = {
  camisetas:
    '<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M17 7l-11 6 4 9 5-2v21h18V20l5 2 4-9-11-6c-1 3-4 5-7 5s-6-2-7-5z"/></svg>',
  calcas:
    '<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M14 5h20l3 38h-9l-4-23-4 23h-9z"/><path d="M14 11h20"/></svg>',
  bones:
    '<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M8 30c0-12 7-19 16-19s16 7 16 19z"/><path d="M8 30c-3 1-4 3-3 5 6 2 22 2 35 0 1-2 0-4-3-5"/><circle cx="24" cy="11" r="1.5"/></svg>',
  headphones:
    '<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M9 29v-5a15 15 0 0 1 30 0v5"/><rect x="6" y="27" width="9" height="14" rx="4"/><rect x="33" y="27" width="9" height="14" rx="4"/></svg>',
  tenis:
    '<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M5 33V16l8 4c3 2 5 5 9 6l16 4c3 1 5 2 5 4v0H5z"/><path d="M5 37h38"/><path d="M20 24l2-3M25 26l2-3"/></svg>',
}

function homeView() {
  const categories = Object.entries(TIPOS)
    .map(
      ([key, label], i) => `
    <li>
      <a href="#/produtos?tipo=${key}" class="category${i === 0 ? " is-featured" : ""}">
        <span class="category__icon">${ICONS[key]}</span>
        <span class="category__name">${label}</span>
      </a>
    </li>`,
    )
    .join("")

  return `
    <!-- SLIDE / GALERIA -->
    <section class="hero" aria-label="Destaques">
      <div class="container hero__inner">
        <div class="hero__content">
          <span class="hero__eyebrow">Melhores ofertas personalizadas</span>
          <h1 class="hero__title">Encontre aqui seu próximo passo 👟</h1>
          <p class="hero__text">Faça seu próprio caminho com estilo e conforto para todas as ocasiões.</p>
          <a href="#/produtos" class="btn-primary">Ver Ofertas</a>
        </div>

        <div class="slider" id="slider" aria-roledescription="carrossel">
          <div class="slider__viewport">
            <div class="slider__track" id="slider-track">
              ${SLIDES.map(
                (src, i) => `
                <div class="slider__slide" role="group" aria-label="Slide ${i + 1} de ${SLIDES.length}">
                  <img src="${src}" alt="Destaque ${i + 1}">
                </div>`,
              ).join("")}
            </div>
          </div>
          <div class="slider__nav">
            <button type="button" class="slider__btn" id="slider-prev" aria-label="Slide anterior"><img src="assets/arrow-left.svg" alt="" width="24" height="24"></button>
            <button type="button" class="slider__btn" id="slider-next" aria-label="Próximo slide"><img src="assets/arrow-right.svg" alt="" width="24" height="24"></button>
          </div>
        </div>
      </div>
    </section>

    <!-- COLEÇÕES EM DESTAQUE (banners) -->
    <section class="section container">
      <header class="section__header"><h2 class="section__title">Coleções em destaque</h2></header>
      <div class="banners">
        <a href="#/produtos"><img src="public/collection-1.png" alt="Novo drop Supreme – 30% OFF"></a>
        <a href="#/produtos"><img src="public/collection-2.png" alt="Coleção Adidas – 30% OFF"></a>
        <a href="#/produtos"><img src="public/collection-3.png" alt="Novo Beats Bass – 30% OFF"></a>
      </div>
    </section>

    <!-- COLEÇÕES EM DESTAQUE (ícones) -->
    <section class="section section--center container" id="colecoes">
      <header class="section__header"><h2 class="section__title">Coleções em destaque</h2></header>
      <ul class="categories">${categories}</ul>
    </section>

    <!-- PRODUTOS EM ALTA -->
    <section class="section container">
      <header class="section__header section__header--between">
        <h2 class="section__title">Produtos em alta</h2>
        <a href="#/produtos" class="section__link">Ver todos <span aria-hidden="true">→</span></a>
      </header>
      <div class="product-list product-list--4">
        ${PRODUCTS.slice(0, 8)
          .map((p) => productCard(p, "home"))
          .join("")}
      </div>
    </section>

    <!-- OFERTA ESPECIAL -->
    <section class="offer">
      <div class="container offer__inner">
        <div class="offer__image">
          <img src="public/produc-image-1.jpeg" alt="Air Jordan edição de colecionador">
        </div>
        <div class="offer__content">
          <span class="offer__eyebrow">Oferta especial</span>
          <h2 class="offer__title">Air Jordan edição de colecionador</h2>
          <p class="offer__text">Uma presença marcante em cada detalhe. Descubra o encontro entre atitude, conforto e um estilo que atravessa gerações.</p>
          <a href="#/produtos?q=Air%20Jordan" class="btn-primary">Ver Oferta</a>
        </div>
      </div>
    </section>`
}

function soonView() {
  return `
    <section class="soon">
      <div class="container">
        <h1 class="soon__title">Em breve</h1>
        <p class="soon__text">Esta página não está disponível por enquanto.</p>
        <a href="#/" class="btn-primary">Voltar ao início</a>
      </div>
    </section>`
}

function productsView() {
  return `
    <section class="container listing">
      <div class="listing__top">
        <p class="listing__title" id="listing-title"></p>
        <label class="sort">
          <span>Ordenar por:</span>
          <select id="sort-select">
            <option value="relevancia">mais relevantes</option>
            <option value="menor">menor preço</option>
            <option value="maior">maior preço</option>
          </select>
        </label>
      </div>

      <div class="listing__body">
        <aside class="filters" aria-label="Filtros">
          <h2 class="filters__title">Filtrar por</h2>
          <hr>
          <form id="filters-form">
            ${FILTER_GROUPS.map(filterGroup).join("")}
          </form>
          <button type="button" class="filters__clear" id="filters-clear">Limpar filtros</button>
        </aside>
        <div class="listing__results" id="listing-results"></div>
      </div>
    </section>`
}

/* ---------- Página de produto ---------- */
const THUMBS = Array.from(
  { length: 5 },
  (_, i) => `public/product-thumb-${i + 1}.jpeg`,
)
const SIZES = ["39", "40", "41", "42", "43"]
const COLORS = [
  { name: "Azul", hex: "#5BE4F5" },
  { name: "Rosa", hex: "#FF6B7B" },
  { name: "Cinza", hex: "#555555" },
  { name: "Roxo", hex: "#6C6BB5" },
]

function productView(p) {
  // Recomendados: os 4 produtos seguintes ao atual (muda a cada produto aberto)
  const related = [1, 2, 3, 4].map(
    (k) => PRODUCTS[(p.id - 1 + k) % PRODUCTS.length],
  )
  const priceHtml = p.salePrice
    ? `<b class="buybox__price">${brl(p.salePrice)}</b><s class="buybox__old">${brl(p.price)}</s>`
    : `<b class="buybox__price">${brl(p.price)}</b>`
  const marcaHref = `#/produtos?tipo=tenis&marca=${encodeURIComponent(p.marca)}`

  return `
    <div class="pdp">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho">
          <a href="#/" class="breadcrumb__first">Home</a><span>/</span>
          <a href="#/produtos">Produtos</a><span>/</span>
          <a href="#/produtos?tipo=tenis">Tênis</a><span>/</span>
          <a href="${marcaHref}">${esc(p.marca)}</a><span>/</span>
          <span aria-current="page">${esc(p.name)}</span>
        </nav>

        <div class="pdp__main">
          <!-- Galeria -->
          <div class="gallery">
            <div class="gallery__viewport">
              <div class="gallery__track" id="g-track">
                ${THUMBS.map(
                  (src, i) => `
                  <div class="gallery__slide"><img src="${src}" alt="${esc(p.name)} – imagem ${i + 1}"></div>`,
                ).join("")}
              </div>
              <button type="button" class="gallery__arrow gallery__arrow--prev" id="g-prev" aria-label="Imagem anterior"><img src="assets/arrow-left.svg" alt="" width="16" height="16"></button>
              <button type="button" class="gallery__arrow gallery__arrow--next" id="g-next" aria-label="Próxima imagem"><img src="assets/arrow-right.svg" alt="" width="16" height="16"></button>
            </div>
            <div class="gallery__thumbs">
              ${THUMBS.map(
                (src, i) => `
                <button type="button" class="gallery__thumb" data-index="${i}" aria-label="Ver imagem ${i + 1}"><img src="${src}" alt=""></button>`,
              ).join("")}
            </div>
          </div>

          <!-- Buy box -->
          <div class="buybox">
            <h1 class="buybox__name">${esc(p.name)}</h1>
            <p class="buybox__ref">Tênis | REF:${p.id}</p>

            <div class="rating">
              <span class="rating__stars" aria-hidden="true">★★★★★</span>
              <span class="rating__badge">4.5 <img src="assets/star-icon.svg" alt="" width="12" height="12"></span>
              <span class="rating__count">(100 avaliações)</span>
            </div>

            <div class="buybox__prices">${priceHtml}</div>

            <h2 class="buybox__label">Descrição do produto</h2>
            <p class="buybox__desc">Conforto e beleza para seu dia a dia. Seu estilo moderno e casual combina com a maioria dos looks.</p>

            <div class="option">
              <h2 class="buybox__label">Tamanho</h2>
              <div class="option__list" role="group" aria-label="Tamanho">
                ${SIZES.map((s) => `<button type="button" class="opt-square" aria-pressed="false">${s}</button>`).join("")}
              </div>
            </div>

            <div class="option">
              <h2 class="buybox__label">Cor</h2>
              <div class="option__list" role="group" aria-label="Cor">
                ${COLORS.map((c) => `<button type="button" class="opt-circle" style="background:${c.hex}" aria-label="${c.name}" aria-pressed="false"></button>`).join("")}
              </div>
            </div>

            <button type="button" class="buybox__cta" data-toast="A compra não está disponível ainda.">COMPRAR</button>
          </div>
        </div>
      </div>

      <section class="container related">
        <header class="section__header section__header--between">
          <h2 class="section__title">Produtos recomendados</h2>
          <a href="#/produtos" class="section__link">Ver todos <span aria-hidden="true">→</span></a>
        </header>
        <div class="product-list product-list--4">
          ${related.map((r) => productCard(r, "related")).join("")}
        </div>
      </section>
    </div>`
}

function initProductPage(p) {
  const track = $("#g-track")
  const prev = $("#g-prev")
  const next = $("#g-next")
  const thumbs = $$(".gallery__thumb")
  const last = THUMBS.length - 1
  let index = Math.max(0, THUMBS.indexOf(p.img)) // imagem principal = a do card clicado

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`
    prev.disabled = index === 0
    next.disabled = index === last
    thumbs.forEach((t, i) => {
      t.classList.toggle("is-selected", i === index)
      t.setAttribute("aria-current", i === index ? "true" : "false")
    })
  }

  track.style.transition = "none"
  update()
  track.getBoundingClientRect()
  track.style.transition = ""

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--
      update()
    }
  })
  next.addEventListener("click", () => {
    if (index < last) {
      index++
      update()
    }
  })
  thumbs.forEach((t) =>
    t.addEventListener("click", () => {
      index = Number(t.dataset.index)
      update()
    }),
  )

  // Tamanho e cor: uma opção selecionada por grupo
  $$(".option__list").forEach((list) => {
    list.addEventListener("click", (e) => {
      const btn = e.target.closest("button")
      if (!btn) return
      $$("button", list).forEach((b) => {
        const on = b === btn
        b.classList.toggle("is-selected", on)
        b.setAttribute("aria-pressed", on)
      })
    })
  })
}

/* ---------- Slider ---------- */
function initSlider() {
  const track = $("#slider-track")
  const prev = $("#slider-prev")
  const next = $("#slider-next")
  if (!track) return
  let index = 0
  const last = SLIDES.length - 1

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`
    prev.disabled = index === 0
    next.disabled = index === last
  }
  prev.addEventListener("click", () => {
    if (index > 0) {
      index--
      update()
    }
  })
  next.addEventListener("click", () => {
    if (index < last) {
      index++
      update()
    }
  })
  update()
}

/* ---------- Página de produtos (filtros, ordenação, busca) ---------- */
function initProducts(params) {
  const state = {
    marca: new Set(),
    categoria: new Set(),
    genero: new Set(),
    estado: null,
    sort: "relevancia",
    tipo: params.get("tipo") || "",
    q: (params.get("q") || "").trim(),
  }

  // Marca vinda da URL (ex.: link do caminho de navegação do produto)
  const marcaParam = params.get("marca")
  let marcaTitle = marcaParam
  if (marcaParam) {
    state.marca.add(marcaParam)
    const box = $$('#filters-form input[data-key="marca"]').find(
      (i) => i.value === marcaParam,
    )
    if (box) box.checked = true
  }

  const titleEl = $("#listing-title")
  const resultsEl = $("#listing-results")

  function getList() {
    const tokens = state.q ? norm(state.q).split(/\s+/) : []
    const list = PRODUCTS.filter((p) => {
      if (state.tipo && p.tipo !== state.tipo) return false
      if (tokens.length) {
        const n = norm(p.name)
        if (!tokens.every((t) => n.includes(t))) return false
      }
      for (const k of ["marca", "categoria", "genero"]) {
        if (state[k].size && !state[k].has(p[k])) return false
      }
      if (state.estado && p.estado !== state.estado) return false
      return true
    })
    if (state.sort === "menor")
      list.sort((a, b) => finalPrice(a) - finalPrice(b))
    if (state.sort === "maior")
      list.sort((a, b) => finalPrice(b) - finalPrice(a))
    return list
  }

  function update() {
    const list = getList()
    let heading = "Todos os produtos"
    if (state.q) heading = `Resultados para “${esc(state.q)}”`
    else if (state.tipo && TIPOS[state.tipo])
      heading = TIPOS[state.tipo] + (marcaTitle ? ` ${esc(marcaTitle)}` : "")
    else if (marcaTitle) heading = esc(marcaTitle)
    const count = `${list.length} ${list.length === 1 ? "produto" : "produtos"}`
    titleEl.innerHTML = `<strong>${heading}</strong> - <span>${count}</span>`

    resultsEl.innerHTML = list.length
      ? `<div class="product-list product-list--3">${list.map((p) => productCard(p, "listing")).join("")}</div>`
      : `<div class="empty">
           <p>Nenhum produto encontrado.</p>
           <a href="#/produtos" class="btn-primary">Ver todos os produtos</a>
         </div>`
  }

  $("#filters-form").addEventListener("change", (e) => {
    const input = e.target.closest("input")
    if (!input) return
    const key = input.dataset.key
    if (key === "marca") marcaTitle = null
    if (input.type === "radio") state.estado = input.value
    else if (input.checked) state[key].add(input.value)
    else state[key].delete(input.value)
    update()
  })

  $("#sort-select").addEventListener("change", (e) => {
    state.sort = e.target.value
    update()
  })

  $("#filters-clear").addEventListener("click", () => {
    $("#filters-form").reset()
    marcaTitle = null
    state.marca.clear()
    state.categoria.clear()
    state.genero.clear()
    state.estado = null
    update()
  })

  update()
}

/* ---------- Roteamento ---------- */
function parseHash() {
  const raw = location.hash.replace(/^#/, "") || "/"
  const [path, qs = ""] = raw.split("?")
  return { path, params: new URLSearchParams(qs) }
}

let currentView = null

function setActiveNav(name) {
  $$(".nav__link[data-nav]").forEach((a) => {
    const active = a.dataset.nav === name
    a.classList.toggle("is-active", active)
    if (active) a.setAttribute("aria-current", "page")
    else a.removeAttribute("aria-current")
  })
}

function route() {
  const { path, params } = parseHash()
  const searchInput = $("#search-input")
  const prevView = currentView

  if (path === "/produtos") {
    app.innerHTML = productsView()
    currentView = "produtos"
    searchInput.value = params.get("q") || ""
    initProducts(params)
    setActiveNav("produtos")
    document.title = "Produtos – Digital Store"
    window.scrollTo(0, 0)
    return
  }

  if (path.startsWith("/produto/")) {
    const product = PRODUCTS.find((x) => x.id === Number(path.split("/")[2]))
    if (!product) {
      location.hash = "#/produtos"
      return
    }
    app.innerHTML = productView(product)
    currentView = "produto"
    searchInput.value = ""
    initProductPage(product)
    setActiveNav("produtos")
    document.title = `${product.name} – Digital Store`
    window.scrollTo(0, 0)
    return
  }

  if (path === "/em-breve") {
    app.innerHTML = soonView()
    currentView = "soon"
    searchInput.value = ""
    setActiveNav(null)
    document.title = "Em breve – Digital Store"
    window.scrollTo(0, 0)
    return
  }

  // Home (/ ou /categorias)
  if (currentView !== "home") {
    app.innerHTML = homeView()
    currentView = "home"
    initSlider()
  }
  searchInput.value = ""
  document.title = "Digital Store"

  if (path === "/categorias") {
    setActiveNav("categorias")
    const target = $("#colecoes")
    const instant = prevView !== "home"
    requestAnimationFrame(() => {
      const y = target.getBoundingClientRect().top + window.scrollY - 24
      window.scrollTo({ top: y, behavior: instant ? "auto" : "smooth" })
    })
  } else {
    setActiveNav("home")
    window.scrollTo({
      top: 0,
      behavior: prevView === "home" ? "smooth" : "auto",
    })
  }
}

window.addEventListener("hashchange", route)

/* ---------- Pop-up "ainda não está disponível" ---------- */
const toast = $("#toast")
let toastTimer
function hideToast() {
  toast.classList.remove("is-visible")
}
function showToast(message) {
  $("#toast-text").textContent = message
  toast.classList.add("is-visible")
  clearTimeout(toastTimer)
  toastTimer = setTimeout(hideToast, 4000)
}
$("#toast-close").addEventListener("click", hideToast)

/* ---------- Eventos globais ---------- */
document.addEventListener("click", (e) => {
  // Itens sem página: abrem o pop-up
  const soon = e.target.closest("[data-soon]")
  if (soon) {
    e.preventDefault()
    showToast(`${soon.dataset.soon} não está disponível ainda.`)
    return
  }
  // Pop-up com mensagem própria (ex.: botão Comprar)
  const msg = e.target.closest("[data-toast]")
  if (msg) {
    e.preventDefault()
    showToast(msg.dataset.toast)
    return
  }
  // Link para a rota em que já estamos: reexecuta (rolagem / limpar filtros)
  const link = e.target.closest('a[href^="#/"]')
  if (link && link.getAttribute("href") === location.hash) {
    e.preventDefault()
    route()
  }
})

// Busca por nome
$("#search-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const q = $("#search-input").value.trim()
  const target = "#/produtos" + (q ? `?q=${encodeURIComponent(q)}` : "")
  if (location.hash === target) route()
  else location.hash = target
})

$("#year").textContent = new Date().getFullYear()
route()
