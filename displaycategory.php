<?php
require_once('dbsettings.php');                                                 // Includes the database settings

//**************************************************************************************************************************************************************************************//
//-----------------------------------------------------------------------------------Database connection data----------------------------------------------------------------------------
//**************************************************************************************************************************************************************************************//

$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)                   // Connect to the database
or die('Error connecting to the database')

&nbsp;

//**************************************************************************************************************************************************************************************//
//-----------------------------------------------------------------------------------Applies the data from the get and get the correct category from the database-------------------------
//**************************************************************************************************************************************************************************************//

$category=$_GET['category'];                                                    // Gets the value from the category option form


$variable = array();
$query = "SELECT * FROM videos WHERE category = '$category' ORDER BY id DESC";
$result = mysqli_query($dbc, $query);

while($object = mysqli_fetch_object($result)) {
    $variable[] = $object;
}
echo '{"videos":'.json_encode($variable).'}';                                   // Convert the data from the database to JSON
?>
