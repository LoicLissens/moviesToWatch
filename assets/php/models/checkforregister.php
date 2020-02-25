<?php

session_start();
if (isset($_POST['pseudo']) and isset($_POST['email']) and isset($_POST['password']) and isset($_POST['password2']) /*and isset($_POST_['submit'])*/) {
    // SANETIZATION AND check if password's are the same
    if ($_POST['password'] === $_POST['password2']) {
        $filters = [
            'pseudo' => FILTER_SANITIZE_STRING,
            'email' => FILTER_SANITIZE_EMAIL,
            'password' => FILTER_SANITIZE_STRING,
            'password2' => FILTER_SANITIZE_STRING,
        ];

        $SanitizedResult = filter_input_array(INPUT_POST, $filters);
        foreach ($filters as $key => $value) {
            $SanitizedResult[$key] = trim($SanitizedResult[$key]);
        }

        $SanitizedResult['password'] = password_hash($SanitizedResult['password'], PASSWORD_DEFAULT);

        // DDB PART
        $servername = 'localhost';
        $username_db = 'root';
        $password_db = 'root';
        $dbname = 'Watchmovies';

        $username = $SanitizedResult['pseudo'];
        $email = $SanitizedResult['email'];
        $password = $SanitizedResult['password'];

        try {
            $connexion = new PDO("mysql:host={$servername};dbname={$dbname}", $username_db, $password_db);
            $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $insert_data = $connexion->prepare('INSERT INTO users(username, email, password) VALUES(?,?,?)');
            $check_user_data = $username;
            $check_user = $connexion->prepare('SELECT * FROM users WHERE username=?');
            $check_user->execute([$check_user_data]);
            $sql_user = $check_user->fetch();

            if ($sql_user) {
                echo "Nom d'utilisateur déjà pris.";
            } else {
                $insert_data->execute([$username, $email, $password]);
                $_SESSION['connected'] = true;
                $_SESSION['pseudo'] = $username;
                $get_id = $connexion->prepare('SELECT id FROM users WHERE username=?');
                $get_id->execute([$check_user_data]);
                $fetch_id = $get_id->fetch();
                $_SESSION['id'] = $fetch_id['id'];

                header('Location:/moviesToWatch/index.php');
            }
        } catch (PDOException $e) {
            echo 'Connection failed: '.$e->getMessage();
        }
    } else {
        echo 'Entrez les deux même mots de passe';
    }
}
