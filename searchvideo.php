<?php

// Main Source: http://www.w3resource.com/API/youtube/tutorial.php-->
// This php file uses a google library in use with a API to requests video's from google

if ($_GET['q'] ) {
    // Call set_include_path() as needed to point to your client library.
    require_once ('google/src/Google_Client.php');
    require_once ('google/src/contrib/Google_YouTubeService.php');



    $DEVELOPER_KEY = 'AIzaSyDZ1KooQsVa-jMYLndBCxGJEFwzM8QEr5o';

    $client = new Google_Client();
    $client->setDeveloperKey($DEVELOPER_KEY);

    $youtube = new Google_YoutubeService($client);

    try {
        $searchResponse = $youtube->search->listSearch('id,snippet', array(
            'q' => $_GET['q'],
        ));

        $counter = 0;
        $videos = '';

        //This is the main function that will sort the respons from youtube and put in in a hidden from which will be generated here so the information can be submitted to the database for later use so it can be used with Ajax, jquery and Json
        //It will get and show a video in a iframe and a few thumbnails from the google respons
        foreach ($searchResponse['items'] as $searchResult) {
            switch ($searchResult['id']['kind']) {
                case 'youtube#video':
                    if( $counter < 1 ){
                    $counter ++;
                    $videos .= sprintf('<li> %s</li>',
                        "<iframe width='420' height='315' src='http://www.youtube.com/embed/".$searchResult['id']['videoId']."'></iframe>");

                        echo '<p>Add this video to a category:</p>';
                        echo '<form name="favorite" action="addfavorite.php" method="GET">';
                        echo '<input type="hidden" id="title" name="title" value=" '.$searchResult['snippet']['title'].' ">';
                        echo '<input type="hidden" id="url" name="url" value=" http://www.youtube.com/embed/'.$searchResult['id']['videoId'].' ">';
                        echo '<input type="hidden" id="thumbnail" name="thumbnail" value=" '.$searchResult['snippet']['thumbnails']['default']['url'].' ">';
                        echo '<select name="category" id="category">';
                        echo '<option value="games">Games</option>';
                        echo '<option value="music">Music</option>';
                        echo '<option value="tutorials">Tutorials</option>';
                        echo '<option value="sports">Sports</option></select>';
                        echo '</select>';
                        echo '<input type="button" id="favoritebutton" value="Add">';
                        echo '</form>';

                        break;
                    }if ($counter > 0 && $counter < 4){
                    $counter ++;
                    $videos .= "<img src='".$searchResult['snippet']['thumbnails']['default']['url']."'></img>";
                    break;
                    }
            }
        }

    } catch (Google_ServiceException $e) {
        $htmlBody .= sprintf('<p>A service error occurred: <code>%s</code></p>',
            htmlspecialchars($e->getMessage()));
    } catch (Google_Exception $e) {
        $htmlBody .= sprintf('<p>An client error occurred: <code>%s</code></p>',
            htmlspecialchars($e->getMessage()));
    }
}
?>

<!doctype html>
<html>
<head>
    <title>YouTube Search</title>
    <link href="//www.w3resource.com/includes/bootstrap.css" rel="stylesheet">
    <style type="text/css">
        body{margin-top: 50px; margin-left: 50px}
    </style>
</head>
<body>

<h3>Relevant videos;</h3>
<ul><?php echo $videos; ?></ul>

</body>
</html>

