/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module("PlaylistService", [])
        .service("PlaylistService", ["$http", PlaylistService]);

function PlaylistService($http) {
    this.getPlaylist = function (id, getPlaylistSuccess, getPlaylistError) {
        var url = "http://localhost:8080/VirtualMp3/playlist?id="+id;
        
        var successCallback = function(response){
            getPlaylistSuccess(response.data);
        };
        
        var errorCallback = function(response){
            getPlaylistError();
        };
        
        CallServer($http,url,successCallback,errorCallback);
    };
    
    this.getTopPlaylist = function (getPlaylistSuccess, getPlaylistError){
        var url = "http://localhost:8080/VirtualMp3/home";
        
        var successCallback = function(response){
            getPlaylistSuccess(response.data);
        };
        
        var errorCallback = function(response){
            getPlaylistError();
        };
        
        CallServer($http,url,successCallback,errorCallback);
    }
}
;

function CallServer($http, url, successCallBack, errorCallBack) {
    $http({
        method: "JSONP",
        url: url+"&callback=JSON_CALLBACK"
    }).then(
            function success(response) {
                successCallBack(response);
            },
            function error(response) {
                errorCallBack(response);
            });
}