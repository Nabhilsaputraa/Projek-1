<?php
include("database.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['login'])) {
        // **🔹 Proses Login**
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);

        // Ambil password hash dari database
        $sql = "SELECT Username, Password FROM Users WHERE Username = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($db_username, $db_password);
            $stmt->fetch();

            // **🔹 Debugging: Pastikan password yang diambil benar**
            echo "DEBUG: Password dari database (hashed): " . $db_password . "<br>";

            // **Cek password dengan password_verify()**
            if (password_verify($password, $db_password)) {
                echo "Login berhasil!";
            } else {
                echo "Password salah!";
            }
        } else {
            echo "Akun tidak ditemukan!";
        }
        $stmt->close();

    } elseif (isset($_POST['register'])) {
        // **🔹 Proses Register**
        $new_username = trim($_POST['new_username']);
        $new_password = trim($_POST['new_password']);
        $user_email = trim($_POST['user-email']);
        $user_phone = trim($_POST['phone-number']);

        // **🔹 Cek apakah username sudah ada**
        $sql_check = "SELECT Username FROM Users WHERE Username = ?";
        $stmt_check = $db->prepare($sql_check);
        $stmt_check->bind_param("s", $new_username);
        $stmt_check->execute();
        $stmt_check->store_result();

        if ($stmt_check->num_rows > 0) {
            echo "Username sudah dipakai!";
        } else {
            // **🔹 Hash password sebelum disimpan**
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

            // **🔹 Pembuatan Primary Key Otomatis**
            $first2 = strtoupper(substr($new_username, 0, 2)); // 2 huruf pertama
            $last2 = strtoupper(substr($new_username, -2));   // 2 huruf terakhir
            $last3Phone = substr($user_phone, -3);            // 3 angka terakhir phone
            $random3 = rand(100, 999);                        // 3 angka random

            $user_id = $first2 . $last2 . $last3Phone . $random3;

            // **🔹 Masukkan data ke database**
            $sql = "INSERT INTO Users (user_id, Username, Password, Email, Phone) VALUES (?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("sssss", $user_id, $new_username, $hashed_password, $user_email, $user_phone);

            if ($stmt->execute()) {
                echo "Akun berhasil dibuat! <br>";
                echo "User ID: " . $user_id . "<br>";
            } else {
                echo "Gagal mendaftar!";
            }
            $stmt->close();
        }
        $stmt_check->close();
    }
}
?>
