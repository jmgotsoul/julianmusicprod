var player;
var uploadViewTimer;
var executeRefreshOfUploadView = false;

$(document).ready(function() {
    $('.collapse').collapse();

    var settings = {
        instanceName: "dark",
        sourcePath: "",
        activePlaylist: "",
        activeItem: 0,
        volume: 0.75,
        autoPlay: true,
        preload: "auto",
        randomPlay: false,
        loopingOn: false,
        mediaEndAction: "next",
        soundCloudAppId: "",
        gDriveAppId: "",
        usePlaylistScroll: true,
        playlistScrollOrientation: "vertical",
        playlistScrollTheme: "light-thin",
        useKeyboardNavigationForPlayback: true,
        facebookAppId: "",
        useNumbersInPlaylist: false,
        sortableTracks: false,
        playlistItemContent: "title",
        createDownloadIconsInPlaylist: false,
        createLinkIconsInPlaylist: false
    };

    player = $("#hap-wrapper").hap(settings);

    var musicComposingAccordion = $('#musicComposingAccordion');

    musicComposingAccordion.on('show.bs.collapse', function(e) {
       if (e.target.id === 'collapseUpload') {
           refreshUploadView();
       }
    });

    musicComposingAccordion.on('hide.bs.collapse', function(e) {
        if (e.target.id === 'collapseUpload') {
            console.log('stopping refresh of upload view');
            clearTimeout(uploadViewTimer);
        }
    });
});

function refreshUploadView() {
    if (executeRefreshOfUploadView) {
        console.log('refreshing upload view');
        var uploadView = document.getElementById('uploadView');
        uploadView.src = uploadView.src;
    } else {
        executeRefreshOfUploadView = true;
    }

    uploadViewTimer = setTimeout(refreshUploadView, 15000);
}

function refreshFileUploader() {
    var fileUploader = document.getElementById('fileUploader');
    fileUploader.src = fileUploader.src;
}