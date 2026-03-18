// ── Datos de prueba (se usan si la API no responde) ──────────────────────────
const MOCK = [
  { id:1, nombre_producto:"Audífonos Bluetooth Pro",    descripcion:"Cancelación de ruido activa, batería de 30h.", precio:189900, disponible:true  },
  { id:2, nombre_producto:"Camiseta Básica Algodón",    descripcion:"Unisex 100% algodón, tallas S a XXL.",         precio:35000,  disponible:true  },
  { id:3, nombre_producto:"Lámpara LED de Escritorio",  descripcion:"Luz regulable y puerto USB de carga.",         precio:75000,  disponible:true  },
  { id:4, nombre_producto:"Tenis Running Air",          descripcion:"Suela amortiguada para running y gym.",        precio:220000, disponible:true  },
  { id:5, nombre_producto:"Clean Code - R.C. Martin",   descripcion:"Principios de escritura de código limpio.",    precio:58000,  disponible:false },
  { id:6, nombre_producto:"Smartwatch Fit X200",        descripcion:"GPS, monitor cardíaco, resistencia IP68.",     precio:350000, disponible:true  },
];

const EMOJIS = ["📦","🎧","👕","💡","👟","📚","⌚","🔌","🧥","🍳","⚽"];
let todosLosProductos = [];

// ── Utilidades ───────────────────────────────────────────────────────────────
function formatPrecio(v) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(v);
}

function setStatus(tipo, msg) {
  const el = document.getElementById('status');
  el.className = `status ${tipo}`;
  el.innerHTML = `<span class="dot"></span><span>${msg}</span>`;
}

function mostrarSkeletons() {
  document.getElementById('grid').innerHTML =
    Array(6).fill(`<div class="skel-card"></div>`).join('');
}

// ── Render ───────────────────────────────────────────────────────────────────
function renderProductos(lista) {
  const grid = document.getElementById('grid');
  document.getElementById('contador').textContent = `(${lista.length})`;

  if (!lista.length) {
    grid.innerHTML = `<div class="empty">No hay productos que mostrar.</div>`;
    return;
  }

  grid.innerHTML = lista.map((p, i) => {
    const emoji = EMOJIS[p.id % EMOJIS.length];
    return `
      <div class="card" style="animation-delay:${i * 0.06}s">
        <div class="card-img">${emoji}</div>
        <div class="card-body">
          <span class="badge ${p.disponible ? 'ok' : 'off'}">
            ${p.disponible ? '✓ Disponible' : '✗ Agotado'}
          </span>
          <h3>${p.nombre_producto}</h3>
          <p>${p.descripcion}</p>
        </div>
        <div class="card-footer">
          <span class="price">${formatPrecio(p.precio)}</span>
          <button class="btn-add" ${!p.disponible ? 'disabled' : ''}>
            ${p.disponible ? 'Agregar' : 'Agotado'}
          </button>
        </div>
      </div>`;
  }).join('');
}

// ── Filtros ──────────────────────────────────────────────────────────────────
function filtrar(tipo, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filtrado =
    tipo === 'disponible' ? todosLosProductos.filter(p =>  p.disponible) :
    tipo === 'agotado'    ? todosLosProductos.filter(p => !p.disponible) :
    todosLosProductos;

  renderProductos(filtrado);
}

// ── Fetch principal ──────────────────────────────────────────────────────────
async function cargarProductos() {
  const url = document.getElementById('apiUrl').value.trim();
  mostrarSkeletons();
  setStatus('loading', `Conectando con <strong>${url}</strong>...`);

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    todosLosProductos = Array.isArray(data) ? data : (data.productos ?? data.items ?? []);
    setStatus('success', `✓ ${todosLosProductos.length} productos cargados desde la API`);
  } catch (err) {
    todosLosProductos = MOCK;
    setStatus('mock',
      `⚠ No se pudo conectar con la API — mostrando datos de prueba.
       <small style="opacity:.6">(${err.message})</small>`);
  }

  renderProductos(todosLosProductos);
}

// Arrancar al cargar la página
cargarProductos();