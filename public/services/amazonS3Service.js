(function(){
  angular
      .module('app.dataservice')
      .factory('amazonS3Service', amazonS3Service)

  amazonS3Service.$inject = ['$http'];

  function amazonS3Service ($http) {

    return {
      uploadImageUser: uploadImageUser,
      uploadImageEvent: uploadImageEvent
    };

    //Sends request to server for valid AWS S3 URL
    //Uses URL to send request to AWS to post image
    //Server stores and references AWS URL in User table
    //On Success, updates DOM profile image element to the file uploaded
    function uploadImageUser () {
      var file = document.getElementById("image").files[0];
      console.log('here')
      $http.get('/AWS/sign?file_name=' + file.name + "&file_type=" + file.type)
        .then(getUrlComplete)
        .catch(getUrlFailed)

      function upload(file, signed_request, url, done) {
        var xhr = new XMLHttpRequest()
        xhr.open("PUT", signed_request)
        xhr.setRequestHeader('x-amz-acl', 'public-read')
        xhr.onload = function() {
          if (xhr.status === 200) {
            done()
          }
        }
        xhr.send(file)
      }

      function getUrlComplete (response) {
        upload(file, response.data.signed_request, response.data.url, function() {
          var imageUrl = "https://s3-us-west-2.amazonaws.com/localhosts/" + file.name;
          document.getElementById("profile-image").style.backgroundImage = 'url('+imageUrl+')';
          $http.post('/user/profileImage', {imageUrl: imageUrl}).then(function(response){
          }).catch(getUrlFailed);
        });
      }

      function getUrlFailed (err) {
        console.log("ERROR: ", err)
      }
    }

    //Same as uploadImageUser, but saves to event table
    function uploadImageEvent () {
      var file = document.getElementById("image").files[0];
      console.log('here')
      $http.get('/AWS/sign?file_name=' + file.name + "&file_type=" + file.type)
        .then(getUrlComplete)
        .catch(getUrlFailed)

      function upload(file, signed_request, url, done) {
        var xhr = new XMLHttpRequest()
        xhr.open("PUT", signed_request)
        xhr.setRequestHeader('x-amz-acl', 'public-read')
        xhr.onload = function() {
          if (xhr.status === 200) {
            done()
          }
        }
        xhr.send(file)
      }

      function getUrlComplete (response) {
        upload(file, response.data.signed_request, response.data.url, function() {
          var imageUrl = "https://s3-us-west-2.amazonaws.com/localhosts/" + file.name;
          document.getElementById("upload-event-photo").style.backgroundImage = 'url('+imageUrl+')';
        })
      }

      function getUrlFailed (err) {
        console.log("ERROR: ", err)
      }
    }



  }

}());