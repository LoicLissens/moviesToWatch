<?php

session_start();
$filters = [
    'id' => FILTER_SANITIZE_STRING,
];

$SanitizedResult = filter_input_array(INPUT_POST, $filters);
foreach ($filters as $key => $value) {
    $SanitizedResult[$key] = trim($SanitizedResult[$key]);
}
$film_id = $SanitizedResult['id'];
$servername = 'localhost';
$username_db = 'root';
$password_db = 'root';
$dbname = 'Watchmovies';

try {
    $connexion = new PDO("mysql:host={$servername};dbname={$dbname}", $username_db, $password_db);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $check_movies = $connexion->prepare('SELECT movies FROM users WHERE username=?');
    $check_movies->execute([$_SESSION['pseudo']]);
    $get_movies = $check_movies->fetch();
    $movies_to_insert = trim($get_movies['movies'].$film_id.',');
    $data = [
        'username' => $_SESSION['pseudo'],
        'movies' => $movies_to_insert,
    ];
    $insert_movies = $connexion->prepare('UPDATE users SET movies=:movies WHERE username=:username');
    $insert_movies->execute($data);
    echo 'Film ajouté à la liste';
} catch (PDOException $e) {
    echo 'Connection failed: '.$e->getMessage();
}
