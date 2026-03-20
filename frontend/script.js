const EMOJIS = ["📦","🎧","👕","💡","👟","📚","⌚","🔌","🧥","🍳","⚽","🎮","🖥️","🎒","🕶️"];

let todos  = [];
let carrito = []; // [{ producto, cantidad }]

// ── Formato ──────────────────────────────────────────────────────────────────
function fmt(v) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(v);
}

// ── Status ───────────────────────────────────────────────────────────────────
function setStatus(tipo, msg) {
  const el = document.getElementById('status');
  el.className = `status show ${tipo}`;
  el.innerHTML = `<span class="dot"></span><span>${msg}</span>`;
}

function skeletons() {
  document.getElementById('grid').innerHTML =
    Array(6).fill('<div class="skel"></div>').join('');
}

// ── Carrito: lógica ──────────────────────────────────────────────────────────
function agregarAlCarrito(id) {
  const producto = todos.find(p => p.id === id);
  if (!producto) return;

  const item = carrito.find(i => i.producto.id === id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ producto, cantidad: 1 });
  }

  actualizarCarrito();
  actualizarBotonesGrid();
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(i => i.producto.id === id);
  if (!item) return;

  item.cantidad += delta;
  if (item.cantidad <= 0) {
    carrito = carrito.filter(i => i.producto.id !== id);
  }

  actualizarCarrito();
  actualizarBotonesGrid();
}

function actualizarCarrito() {
  // Contador del header
  const total = carrito.reduce((s, i) => s + i.cantidad, 0);
  document.getElementById('cart-count').textContent = total;

  // Total precio
  const suma = carrito.reduce((s, i) => s + i.producto.precio * i.cantidad, 0);
  document.getElementById('total').textContent = fmt(suma);

  // Items del panel
  const container = document.getElementById('carrito-items');

  if (carrito.length === 0) {
    container.innerHTML = `
      <div class="carrito-vacio">
        <span>🛒</span>
        <p>Tu carrito está vacío</p>
      </div>`;
    document.querySelector('.btn-checkout').disabled = true;
    return;
  }

  document.querySelector('.btn-checkout').disabled = false;

  container.innerHTML = carrito.map(({ producto: p, cantidad }) => `
    <div class="c-item">
      <span class="c-emoji">${EMOJIS[p.id % EMOJIS.length]}</span>
      <div class="c-info">
        <h4>${p.nombre_producto}</h4>
        <p>${fmt(p.precio * cantidad)}</p>
      </div>
      <div class="c-qty">
        <button class="qty-btn" onclick="cambiarCantidad(${p.id}, -1)">−</button>
        <span class="qty-num">${cantidad}</span>
        <button class="qty-btn" onclick="cambiarCantidad(${p.id}, +1)">+</button>
      </div>
    </div>
  `).join('');
}

// Actualiza el texto del botón en las tarjetas según si ya está en el carrito
function actualizarBotonesGrid() {
  todos.forEach(p => {
    const btn = document.getElementById(`btn-${p.id}`);
    if (!btn) return;
    const enCarrito = carrito.some(i => i.producto.id === p.id);
    btn.textContent = enCarrito ? '✓ Agregado' : 'Agregar';
    btn.classList.toggle('en-carrito', enCarrito);
  });
}

// ── Carrito: panel ───────────────────────────────────────────────────────────
function toggleCarrito() {
  document.getElementById('carrito').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

function checkout() {
  alert(`¡Pedido realizado! Total: ${document.getElementById('total').textContent}`);
  carrito = [];
  actualizarCarrito();
  actualizarBotonesGrid();
  toggleCarrito();
}

// ── Render catálogo ──────────────────────────────────────────────────────────
function render(lista) {
  const grid = document.getElementById('grid');

  if (!lista.length) {
    grid.innerHTML = '<div class="empty">No hay productos que mostrar.</div>';
    return;
  }

  grid.innerHTML = lista.map((p, i) => `
    <div class="card" style="animation-delay:${i * 0.05}s">
      <div class="card-thumb">
        ${EMOJIS[p.id % EMOJIS.length]}
        <span class="card-id">#${p.id}</span>
      </div>
      <div class="card-body">
        <span class="badge ${p.disponible ? 'ok' : 'off'}">
          ${p.disponible ? '✓ Disponible' : '✗ Agotado'}
        </span>
        <h3>${p.nombre_producto}</h3>
        <p>${p.descripcion}</p>
      </div>
      <div class="card-footer">
        <span class="price">${fmt(p.precio)}</span>
        <button
          id="btn-${p.id}"
          class="btn-buy"
          ${!p.disponible ? 'disabled' : `onclick="agregarAlCarrito(${p.id})"`}>
          ${p.disponible ? 'Agregar' : 'Agotado'}
        </button>
      </div>
    </div>
  `).join('');

  actualizarBotonesGrid();
}

// ── Filtros ──────────────────────────────────────────────────────────────────
function filtrar(tipo, btn) {
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const lista =
    tipo === 'disponible' ? todos.filter(p =>  p.disponible) :
    tipo === 'agotado'    ? todos.filter(p => !p.disponible) :
    todos;

  render(lista);
}

// ── Fetch por ID hasta 404 ───────────────────────────────────────────────────
async function fetchTodos(base) {
  const productos = [];
  let id = 1;

  while (true) {
    try {
      const res = await fetch(`${base}/producto/${id}`, {
        signal: AbortSignal.timeout(4000)
      });
      if (res.status === 404) break;
      if (!res.ok) break;

      const data = await res.json();
      productos.push(data);
      setStatus('loading', `Cargando productos... (${productos.length} encontrados)`);
      render(productos);
      id++;
    } catch {
      break;
    }
  }

  return productos;
}

// ── Inicio ───────────────────────────────────────────────────────────────────
async function iniciar() {
  const base = document.getElementById('apiBase').value.trim().replace(/\/$/, '');
  skeletons();
  setStatus('loading', 'Conectando con la API...');
  todos = [];
  carrito = [];
  actualizarCarrito();

  todos = await fetchTodos(base);

  if (todos.length === 0) {
    setStatus('error', '⚠ La API no devolvió productos. Verifica que la BD tenga datos.');
  } else {
    setStatus('ok', `✓ ${todos.length} productos cargados desde la API`);
  }

  render(todos);
}

// Inicializar carrito vacío al arrancar
actualizarCarrito();
iniciar();
