
document.getElementById('formu').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const mail = document.getElementById('mail').value.trim();

  if (name === '' || lastname === '' || mail === '') {
    alert('Todos los campos son obligatorios y no pueden ser solo espacios.');
    return;
  }

  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${name}</td>
    <td>${lastname}</td>
    <td>${mail}</td>
    <td><button class="eliminar">Eliminar</button></td>
  `;
  document.querySelector('#tablaDatos tbody').appendChild(fila);
  this.reset();
});


document.querySelector('#tablaDatos').addEventListener('click', function(e) {
  if (e.target.classList.contains('eliminar')) {
    e.target.closest('tr').remove();
  }
});   

