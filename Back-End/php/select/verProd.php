<?php
include('../includes/db.php');

// Consulta para obtener los productos
$query = "SELECT Nombre, Existencia, CostoUnitario FROM producto";
$result = mysqli_query($con, $query);

if (!$result) {
    throw new Exception("Error al ejecutar la consulta: " . mysqli_error($con));
}

// Convertir resultados a un array asociativo
$products = array();
while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

// Devolver los productos como JSON
header('Content-Type: application/json');
echo json_encode($products);
?>
