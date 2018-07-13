$('#yt-thumbnail').click( function (e) {
    e.preventDefault();
    $(this).hide();
    $('#video-container').show();


    autoPlayVideo();

});

function autoPlayVideo(){
    $("#video-container").html('<iframe id="yt-video" src="https://www.youtube.com/embed/eOqN2EpXa2E?rel=0&autoplay=1" frameborder="0"></iframe>');
}