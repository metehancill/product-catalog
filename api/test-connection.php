<?php
require_once 'config.php';

echo "Testing database connection...\n\n";

try {
    $conn = getConnection();

    echo "✓ Database connection successful!\n\n";

    echo "Database Info:\n";
    echo "- Host: " . DB_HOST . "\n";
    echo "- Database: " . DB_NAME . "\n";
    echo "- User: " . DB_USER . "\n";
    echo "- Server Version: " . $conn->server_info . "\n\n";

    // Test if tables exist
    echo "Checking tables:\n";

    $tables = ['products', 'catalog_pdfs'];
    foreach ($tables as $table) {
        $result = $conn->query("SHOW TABLES LIKE '$table'");
        if ($result && $result->num_rows > 0) {
            echo "✓ Table '$table' exists\n";

            // Count rows
            $countResult = $conn->query("SELECT COUNT(*) as count FROM $table");
            if ($countResult) {
                $row = $countResult->fetch_assoc();
                echo "  - Contains {$row['count']} row(s)\n";
            }
        } else {
            echo "✗ Table '$table' does NOT exist\n";
        }
    }

    $conn->close();

} catch (Exception $e) {
    echo "✗ Connection failed: " . $e->getMessage() . "\n";
    exit(1);
}
