const formulario = document.getElementById("formulario");
const descripcionInput = document.getElementById("descripcion");
const montoInput = document.getElementById("monto");
const tipoInput = document.getElementById("tipo");
const listaTransacciones = document.getElementById("lista-transacciones");
const totalIngresos = document.getElementById("total-ingresos");
const totalEgresos = document.getElementById("total-egresos");
const balance = document.getElementById("balance");

let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const descripcion = descripcionInput.value.trim();
  const monto = parseFloat(montoInput.value);
  const tipo = tipoInput.value;

  if (descripcion && !isNaN(monto)) {
    const transaccion = { descripcion, monto, tipo };
    transacciones.push(transaccion);
    guardarEnLocalStorage();
    actualizarUI();
    formulario.reset();
  }
});

function actualizarUI() {
  listaTransacciones.innerHTML = "";
  let ingresos = 0;
  let egresos = 0;

  transacciones.forEach((t, index) => {
    const li = document.createElement("li");
    li.textContent = `${t.descripcion}: $${t.monto.toLocaleString()}`;
    li.className = t.tipo === "ingreso" ? "ingreso" : "egreso";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarTransaccion(index);
    li.appendChild(btnEliminar);

    listaTransacciones.appendChild(li);

    if (t.tipo === "ingreso") ingresos += t.monto;
    else egresos += t.monto;
  });

  totalIngresos.textContent = `$${ingresos.toLocaleString()}`;
  totalEgresos.textContent = `$${egresos.toLocaleString()}`;
  balance.textContent = `$${(ingresos - egresos).toLocaleString()}`;
}

function eliminarTransaccion(index) {
  transacciones.splice(index, 1);
  guardarEnLocalStorage();
  actualizarUI();
}

function guardarEnLocalStorage() {
  localStorage.setItem("transacciones", JSON.stringify(transacciones));
}

actualizarUI();
