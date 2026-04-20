const botonEnviar = document.getElementById("botonEnviar");
const error = document.getElementById("error");
botonEnviar.addEventListener("click", obtenerDolares);

function obtenerDolares() {

  const montoInput = document.getElementById("monto").value;
  const monto = parseFloat(montoInput);

  const contenedor = document.getElementById("tablaContainer");

error.textContent = "";

if (montoInput.trim() === "") {
  error.textContent = "Por favor, ingresá un monto.";
  return;
}

if (isNaN(monto)) {
  error.textContent = "El valor ingresado no es válido.";
  return;
}

  fetch("https://monedapi.ar/api/usd")
    .then(response => response.json())
    .then(data => {
      // Creamos la tabla con encabezado
      let tablaHTML = `
        <table border="1">
          <thead>
            <tr>
              <th>Tipo de dólar</th>
              <th>Compra</th>
              <th>Venta</th>
              <th>USD Compra</th>
              <th>USD Venta</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach(dolar => {
       
        if (dolar["origen"] === "BNA") {
          const compraOficial = monto / dolar["compra"];
          const ventaOficial = monto / dolar["venta"];

          tablaHTML += `
            <tr>
              <td>Oficial</td>
              <td>${dolar.compra}</td>
              <td>${dolar.venta}</td>
              <td>${compraOficial.toFixed(2)}</td>
              <td>${ventaOficial.toFixed(2)}</td>
            </tr>
          `;
        }

        if (dolar["origen"] === "BLUE") {
          const compraBlue = monto / dolar["compra"];
          const ventaBlue = monto / dolar["venta"];

          tablaHTML += `
            <tr>
              <td>Blue</td>
              <td>${dolar.compra}</td>
              <td>${dolar.venta}</td>
              <td>${compraBlue.toFixed(2)}</td>
              <td>${ventaBlue.toFixed(2)}</td>
            </tr>
          `;
        }

        if (dolar["origen"] === "BOLSA") {
          const compraMEP = monto / dolar["compra"];
          const ventaMEP = monto / dolar["venta"];

          tablaHTML += `
            <tr>
              <td>MEP</td>
              <td>${dolar.compra}</td>
              <td>${dolar.venta}</td>
              <td>${compraMEP.toFixed(2)}</td>
              <td>${ventaMEP.toFixed(2)}</td>
            </tr>
          `;
        }
      });

      tablaHTML += `</tbody></table>`;

  
      contenedor.innerHTML = tablaHTML;
    })
    .catch(error => console.error(error));
}
