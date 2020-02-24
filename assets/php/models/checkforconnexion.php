<?php

session_start();
if (isset($_POST['pseudo']) and isset($_POST['password'])  /*and isset($_POST_['submit'])*/) {
    // SANETIZATION AND check if password's are the same

    $filters = [
        'pseudo' => FILTER_SANITIZE_STRING,
        'password' => FILTER_SANITIZE_STRING,
    ];

    $SanitizedResult = filter_input_array(INPUT_POST, $filters);
    foreach ($filters as $key => $value) {
        $SanitizedResult[$key] = trim($SanitizedResult[$key]);
    }
    $servername = 'localhost';
    $username_db = 'root';
    $password_db = 'root';
    $dbname = 'Watchmovies';
    $username = $SanitizedResult['pseudo'];
    $password = $SanitizedResult['password'];

    try {
        $connexion = new PDO("mysql:host={$servername};dbname={$dbname}", $username_db, $password_db);
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $check_user_data = $username;
        $check_user = $connexion->prepare('SELECT * FROM users WHERE username=?');
        $check_user->execute([$check_user_data]);
        $sql_user = $check_user->fetch();
        if ($sql_user) {
            if (password_verify($password, $sql_user['password'])) {
                $_SESSION['connected'] = true;
                $_SESSION['pseudo'] = $username;
                $_COOKIES['pseudo'] = $username;
                header('Location:/moviesToWatch/index.php ');
            } else {
                echo 'mauvais mdp';
            }
        } else {
            echo 'Pseudo ou mot de passe invalid';
        }
    } catch (PDOException $e) {
        echo 'Connection failed: '.$e->getMessage();
    }
}
