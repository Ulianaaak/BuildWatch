<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

try {
    $dbh = new PDO('mysql:dbname=buildwatch;host=localhost', 'root', '');
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sth = $dbh->prepare("SELECT o.*, bt.*
                          FROM `objects` o
                          LEFT JOIN `building_technical` bt ON o.id = bt.building_id
                          ORDER BY o.name");
    $sth->execute();
    $list = $sth->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($list);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка подключения к базе данных: ' . $e->getMessage()]);
}
?>

