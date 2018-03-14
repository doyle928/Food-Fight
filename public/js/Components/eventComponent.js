(function() {
  var eventComponent = {
    templateUrl: "Partials/event.html",
    controller: "controllerFunction"
	};
  angular
    .module("App")
    .component("eventComponent", eventComponent);
})();

// FB.ui({
// method: 'share_open_graph',
// action_type: 'og.shares',
// action_properties: JSON.stringify({
// object : {
// 'og:url': "redirection url from facebook", // your url to share
// 'og:title': "Title of post",
// 'og:site_name':'Name of post',
// 'og:description':'description about post',
// 'og:image': 'Image of post',
// 'og:image:width':'200',//size of image in pixel
// 'og:image:height':'200'
// }
// })
// }, function(response){
// console.log("response is ",response);
// });
