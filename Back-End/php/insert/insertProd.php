<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include('../includes/db.php');

    $name = $_POST['name'];
    $quantity = $_POST['quantity'];
    $price = $_POST['price'];

    $sql = "INSERT INTO Producto (Nombre, Existencia, CostoUnitario) 
            VALUES (?, ?, ?)";

    $stmt = mysqli_prepare($con, $sql);

    mysqli_stmt_bind_param($stmt, "sdd", $name, $quantity, $price);
    if (mysqli_stmt_execute($stmt)) {
        header('Content-Type: application/json');
        echo json_encode(array('success' => true));
    } else {
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'Error al insertar los datos.'));
    }

    mysqli_stmt_close($stmt);
    mysqli_close($con);
} else {
    header('Content-Type: application/json');
    echo json_encode(array('success' => false, 'message' => 'No se recibieron datos'));
}
?>
