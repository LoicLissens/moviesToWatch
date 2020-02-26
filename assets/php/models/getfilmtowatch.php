<?php

session_start();
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
    echo $get_movies['movies'];
} catch (PDOException $e) {
    echo 'Connection failed: '.$e->getMessage();
}
