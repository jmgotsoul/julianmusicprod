var player;

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
});

function refreshUpload() {
    var fileUploader = document.getElementById("fileUploader");
    fileUploader.src = fileUploader.src;

    var uploadView = document.getElementById("uploadView");
    uploadView.src = uploadView.src;
}