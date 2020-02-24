<?php

?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="assets/css/style.min.css" />
    <title>Document</title>
  </head>
  <body>
    <header>
      <nav class="nav-top">
        <?php if (!isset($_SESSION)) { ?>
          <a  href="assets/php/views/connection.php">Se Connecter</a>
        <?php } else { ?>
          <a>Se Déconnecter</a>
        <?php }?>
        <a class="logo" href="index.php"><img src="assets/img/motion-.svg" alt="Logo" /></a>
        <?php if (!isset($_SESSION)) { ?>
          <p id="list-button">Non Connecté</p>
        <?php } else { ?>
          <p id="list-button">Bonjour</p>
        <?php }?>
      </nav>
    </header>
    <main>
      <aside>
        <h2>Trier:</h2>
        <button id="bestever">Les mieux notés</button>
        <button id="trends">Tendances</button>
        <select id="selectgenre">
          <option>Selectionez un genre</option>
        </select>
        <?php if (isset($_SESSION)) { ?>
          <button id="mylist">Ma liste</button>
        <?php } ?>
      </aside>
      <h2 id="showfilm"></h2>
      <section id="movielist"></section>
    </main>
  </body>

  <script src="app.js"></script>
</html>
