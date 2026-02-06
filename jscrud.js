const form = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
const searchInput = document.getElementById("searchInput");

const productIdInput = document.getElementById("productId");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("category");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const toast = document.getElementById("toast");

const toggleThemeBtn = document.getElementById("toggleTheme");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");

const sortSelect = document.getElementById("sortSelect");

let products = JSON.parse(localStorage.getItem("products")) || [];

// =========================
// TOAST
// =========================
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2500);
}

// =========================
// SALVAR NO LOCALSTORAGE
// =========================
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// =========================
// FORMATAR PREÇO
// =========================
function formatPrice(price) {
  return `R$ ${price.toFixed(2)}`;
}

// =========================
// RENDERIZAR PRODUTOS
// =========================
function renderProducts(list = products) {
  productTable.innerHTML = "";

  if (list.length === 0) {
    productTable.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;">Nenhum produto encontrado.</td>
      </tr>
    `;
    return;
  }

  list.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${formatPrice(product.price)}</td>
      <td><span class="badge">${product.category}</span></td>
      <td class="actions">
        <button class="edit" onclick="editProduct(${product.id})">Editar</button>
        <button class="delete" onclick="deleteProduct(${product.id})">Excluir</button>
      </td>
    `;

    productTable.appendChild(row);
  });
}

// =========================
// ADICIONAR / EDITAR PRODUTO
// =========================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const category = categoryInput.value.trim();

  if (!name || !category || isNaN(price)) {
    showToast("⚠️ Preencha todos os campos corretamente!");
    return;
  }

  if (price <= 0) {
    showToast("⚠️ O preço deve ser maior que zero!");
    return;
  }

  if (productIdInput.value) {
    const id = Number(productIdInput.value);

    products = products.map((p) =>
      p.id === id ? { id, name, price, category } : p
    );

    showToast("✅ Produto atualizado com sucesso!");
    submitBtn.textContent = "Adicionar Produto";
    cancelBtn.classList.add("hidden");
    productIdInput.value = "";
  } else {
    const newProduct = {
      id: Date.now(),
      name,
      price,
      category
    };

    products.push(newProduct);
    showToast("✅ Produto adicionado!");
  }

  saveProducts();
  renderProducts();
  form.reset();
});

// =========================
// EDITAR PRODUTO
// =========================
function editProduct(id) {
  const product = products.find((p) => p.id === id);

  if (!product) return;

  productIdInput.value = product.id;
  nameInput.value = product.name;
  priceInput.value = product.price;
  categoryInput.value = product.category;

  submitBtn.textContent = "Salvar Alterações";
  cancelBtn.classList.remove("hidden");
}

// =========================
// CANCELAR EDIÇÃO
// =========================
cancelBtn.addEventListener("click", () => {
  form.reset();
  productIdInput.value = "";
  submitBtn.textContent = "Adicionar Produto";
  cancelBtn.classList.add("hidden");

  showToast("❌ Edição cancelada.");
});

// =========================
// EXCLUIR PRODUTO
// =========================
function deleteProduct(id) {
  const confirmDelete = confirm("Tem certeza que deseja excluir este produto?");

  if (!confirmDelete) return;

  products = products.filter((p) => p.id !== id);

  saveProducts();
  renderProducts();

  showToast("🗑️ Produto removido!");
}

// =========================
// BUSCAR PRODUTO
// =========================
searchInput.addEventListener("input", () => {
  filterAndRender();
});

// =========================
// ORDENAR
// =========================
sortSelect.addEventListener("change", () => {
  filterAndRender();
});

// =========================
// FILTRAR + ORDENAR
// =========================
function filterAndRender() {
  const searchValue = searchInput.value.toLowerCase();
  const sortValue = sortSelect.value;

  let filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue) ||
    product.category.toLowerCase().includes(searchValue)
  );

  if (sortValue === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortValue === "price") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sortValue === "category") {
    filtered.sort((a, b) => a.category.localeCompare(b.category));
  }

  renderProducts(filtered);
}

// =========================
// TEMA DARK/LIGHT
// =========================
function loadTheme() {
  const theme = localStorage.getItem("theme");

  if (theme === "light") {
    document.body.classList.add("light");
    toggleThemeBtn.textContent = "☀️ Light";
  }
}

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    toggleThemeBtn.textContent = "☀️ Light";
    showToast("🌞 Tema claro ativado!");
  } else {
    localStorage.setItem("theme", "dark");
    toggleThemeBtn.textContent = "🌙 Dark";
    showToast("🌙 Tema escuro ativado!");
  }
});

// =========================
// EXPORTAR JSON
// =========================
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(products, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "produtos.json";
  a.click();

  URL.revokeObjectURL(url);
  showToast("📤 Produtos exportados!");
});

// =========================
// IMPORTAR JSON
// =========================
importFile.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const importedProducts = JSON.parse(e.target.result);

      if (!Array.isArray(importedProducts)) {
        showToast("⚠️ Arquivo inválido!");
        return;
      }

      products = importedProducts;
      saveProducts();
      renderProducts();

      showToast("📥 Produtos importados com sucesso!");
    } catch (error) {
      showToast("⚠️ Erro ao importar arquivo!");
    }
  };

  reader.readAsText(file);
});

// =========================
// INICIALIZAR
// =========================
loadTheme();
renderProducts();