<?php
session_start();

// Подключение к базе данных
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "buildwatch";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // SQL-запрос для проверки пользователя
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password_hash'])) {
        // Успешный вход, сохраняем данные пользователя в сессии
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];

        // Перенаправление на главную страницу
        header("Location: BuildWatch.html");
        exit(); // Останавливаем выполнение скрипта
    } else {
        echo "Неверный email или пароль!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход</title>
</head>
<body>
    <h1>Форма входа</h1>
    <form action="login.php" method="POST">
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br><br>

        <label for="password">Пароль:</label><br>
        <input type="password" id="password" name="password" required><br><br>

        <button type="submit">Войти</button>
    </form>

    <p>Еще нет аккаунта? <a href="register.php">Зарегистрироваться</a></p>
</body>
</html>
