CREATE DATA BASE Nyxs;

CREATE TABLE Producto (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Existencia INT NOT NULL,
    CostoUnitario DECIMAL(10, 2) NOT NULL
);
