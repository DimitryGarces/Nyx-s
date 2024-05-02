document.getElementById('product-form').addEventListener('submit', addProduct);

function addProduct(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('quantity', document.getElementById('quantity').value);
    formData.append('price', document.getElementById('price').value);

    fetch('../../Back-End/php/insert/insertProd.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Producto agregado correctamente');
                document.getElementById('name').value = '';
                document.getElementById('quantity').value = '';
                document.getElementById('price').value = '';
                return fetchProductList();
            } else {
                alert('Hubo un error al agregar el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al agregar el producto');
        });
}

function fetchProductList() {
    return new Promise((resolve, reject) => {
        fetch('../../Back-End/php/select/verProd.php')
            .then(response => response.json())
            .then(data => {
                const productList = document.getElementById('product-list');
                productList.innerHTML = '';

                if (data.length === 0) {
                    const row = document.createElement('tr');
                    row.innerHTML = '<td colspan="3">No hay productos aun</td>';
                    productList.appendChild(row);
                } else {
                    data.forEach(product => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>${product.Nombre}</td>
                        <td>$${product.Existencia}</td>
                        <td>$${product.CostoUnitario}</td>
                    `;
                        productList.appendChild(row);
                    });
                }
                resolve();
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

fetchProductList()
    .catch(error => console.error('Error en fetchProductList:', error));
