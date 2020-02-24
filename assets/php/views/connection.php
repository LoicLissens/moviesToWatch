<?php

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/style.min.css">
    <title>Conenction</title>
</head>
<body>
<header>
      <nav class="nav-top">

       <a class="logo" href="../../../index.php"><img src="../../img/motion-.svg" alt="Logo" /></a>
      </nav>
      
    </header>
    <main>
        
        <div class="form">
            <h3>Connexion</h3>
            <form action="../models/checkforconnexion.php" method="post" >
                
                <input type="text" name="pseudo" placeholder="pseudo" />
                <input type="password" name="password" placeholder="Password" />
                
                <!-- Honeypot-->
                <input style="display:none" type="text" name="nom" placeholder="nom" />
                <button>Envoyer</button>
                <p>Pas encore inscrit ? <a href="register.php">Enregistrez-vous</a></p>
            </form>
        </div>
    </main>
</body>
</html>
