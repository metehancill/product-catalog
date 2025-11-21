<?php
require_once 'config.php';

$conn = getConnection();

$result = $conn->query("SELECT id, file_url, uploaded_at FROM catalog_pdf ORDER BY uploaded_at DESC LIMIT 1");

if ($row = $result->fetch_assoc()) {
    echo json_encode(['catalog' => $row]);
} else {
    echo json_encode(['catalog' => null]);
}

$conn->close();
