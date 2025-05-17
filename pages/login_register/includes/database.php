<?php

$hostname = "localhost";
$username = "root";  // Perbaiki dari $Username ke $username
$password = "";  // Perbaiki dari $Password ke $password
$database_name = "database_user";

// Membuat koneksi
$db = mysqli_connect($hostname, $username, $password, $database_name);

// Cek koneksi
if (!$db) {
    die("Koneksi Gagal: " . mysqli_connect_error());
}
?>
