<?php

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/style.min.css">
    <title>S'enregistrer</title>
</head>
<body>
<header>
      <nav class="nav-top">

       <a class="logo" href="../../../index.php"><img src="../../img/motion-.svg" alt="Logo" /></a>
      </nav>
      
    </header>
    <main>
        
        <div class="form">
            <h3>S'enregistrer</h3>
            <form action="../models/checkforregister.php" method="post" >
                <input type="text" name="pseudo" placeholder="pseudo" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <input type="password" name="password2" placeholder="Confirmer Password" />
                <!-- Honeypot-->
                <input style="display:none" type="text" name="nom" placeholder="nom" />
                <button type="submit" name="submit">Envoyer</button>
                <p>Deja inscrit ? <a href="connection.php">Connectez-vous !</a></p>
            </form>
        </div>
    </main>
</body>
</html>
