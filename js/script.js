//**************************************************************************************************************************************************************************************//
//-----------------------------------------------------------------------------------Code that is being executed when the site is loaded-------------------------------------------------
//**************************************************************************************************************************************************************************************//

$(document).ready(function() {                                              //Hides the second wireframe div and calls a function that will show the latest pictures on the first wireframe
    showpictureswireframe1()
    $( "#addedvideos" ).hide();
    $( "#searchvideos" ).hide();
});

//**************************************************************************************************************************************************************************************//
//-----------------------------------------------------------------------------------Show pictures by selecting a category---------------------------------------------------------------
//**************************************************************************************************************************************************************************************//

$('#addbutton').click(function(){                                           //When the add button is clicked a php script will be fired with the values from the hiddenform and insert it into the database and update the pictures
    $.ajax({
        type: "GET",
        url: "searchvideo.php",
        data: 'q=' + $('#searchvid').val(),
        success: function(msg){
            $('#resultvid').html(msg);
            $("#favoritebutton").click(function() {
                var data = 'title=' + $('#title').val() + '&url=' + $('#url').val() + '&thumbnail=' + $('#thumbnail').val() + '&category=' + $('#category').val();
                $.ajax({
                    type: "GET",
                    url: "addfavorite.php",
                    data: data,
                    success: function(result){
                        $("#favoritebutton").html(result);
                        showpictures();
                    }
                });
            });
        }
    });
});

function showpictures(){                                                    //Function that gets the latest pictures from the database with a limit of 10 and orderd DESC -> view getdatabseinfo.php
    var url="getdatabaseinfo.php";
    $("#jsondata tbody").html("");
    $.getJSON(url,function(data){
        $.each(data.videos, function(i,video){
            var newRow ="<img src="+ video.youtube_thumbnail_url+">";
            $(newRow).appendTo("#jsondata tbody");
        });
    });
};

//**************************************************************************************************************************************************************************************//
//-----------------------------------------------------------------------------------Show pictures by opening the main page---------------------------------------------------------------
//**************************************************************************************************************************************************************************************//
function showpictureswireframe1(){                                          //A custom function that will show a video and 4(actually 5 but it hides the first) pictures on wireframe1
    var counter = 0;
    var url="getdatabaseinfo.php";
    $("#jsondata2 tbody").html("");
    $.getJSON(url,function(data){

        $.each(data.videos, function(i,video){
            if(counter < 1){
            counter ++;
            var vid ="<p id='latestvideo'>Latest added video:</p>"+"<iframe width='420' height='315' src="+ video.youtube_url+">";
            $(vid).appendTo("#jsondata2 tbody");

            }if(counter < 6){
            counter ++;
            var newRow ="<img src="+ video.youtube_thumbnail_url+">";
            $(newRow).appendTo("#jsondata2 tbody");
        }
        });
        $("img:first").hide();
    });
};

//**************************************************************************************************************************************************************************************//
//-----------------------------------------------------------------------------------Show pictures by selecting a category---------------------------------------------------------------
//**************************************************************************************************************************************************************************************//

$("#selectcategory").change(function() {                                    //When the category is changes, this script will get the value and send it to the php script and will update the tbody with pictures from the selected category
    var data = 'category=' + $('#selectcategory').val();
    $.ajax({
        type: "GET",
        url: "displaycategory.php",
        data: data,
        success: function(result){
            showcategorypictures(result);
        }
    });
});


function showcategorypictures(result){                                      //This function fires when a catogory is changed to show a video and 4(actually 5 but it hides the first) pictures on wireframe1
    var catcounter = 0;
    $("#jsondata2 tbody").html("");
    var parsed = JSON.parse(result);

        $.each(parsed.videos, function(i,video){
            if(catcounter < 1){
                catcounter ++;
                var vid ="<iframe width='420' height='315' src="+ video.youtube_url+">";
                $(vid).appendTo("#jsondata2 tbody");
            }if(catcounter < 6 && catcounter > 0){
                catcounter ++;
                var newPictures ="<img src="+ video.youtube_thumbnail_url+">";
                $(newPictures).appendTo("#jsondata2 tbody");
            }
        });
        $("img:first").hide();
};

//**************************************************************************************************************************************************************************************//
//-----------------------------------------------------------------------------------Hide wireframe 1 and go to two----------------------------------------------------------------------
//**************************************************************************************************************************************************************************************//

$("#plusbutton").click(function() {                                        //This is the transition function from wireframe 1 to 2, it hides all the divs from wireframe 1 and will show the divs from interface 2
    $( "#favorites" ).hide();
    $( "#videodisplay" ).hide();
    $( "#categoryfield" ).hide();
    $( "#plusbutton" ).hide();

    $( "#addedvideos" ).show();
    $( "#searchvideos" ).show();
    showpictures();                                                        //Updates the pictures agian
});




