<?php
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
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_confirm = $_POST['password_confirm'];

    if ($password === $password_confirm) {
        // Хэшируем пароль
        $password_hash = password_hash($password, PASSWORD_BCRYPT);

        // SQL-запрос для вставки данных
        $sql = "INSERT INTO users (username, email, password_hash)
                VALUES (?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $username, $email, $password_hash);

        if ($stmt->execute()) {
            // Перенаправление на главную страницу
            header("Location: BuildWatch.html");
            exit(); // Останавливаем выполнение скрипта
        } else {
            echo "Ошибка регистрации!";
        }
    } else {
        echo "Пароли не совпадают!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация</title>
</head>
<body>
    <h1>Форма регистрации</h1>
    <form action="register.php" method="POST">
        <label for="username">Имя пользователя:</label><br>
        <input type="text" id="username" name="username" required><br><br>

        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br><br>

        <label for="password">Пароль:</label><br>
        <input type="password" id="password" name="password" required><br><br>

        <label for="password_confirm">Подтверждение пароля:</label><br>
        <input type="password" id="password_confirm" name="password_confirm" required><br><br>

        <button type="submit">Зарегистрироваться</button>
    </form>

    <p>Уже зарегистрированы? <a href="login.php">Войти</a></p>
</body>
</html>
