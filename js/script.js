//Default Script
$(document).ready(function() {

    var uploadedPhoto;

  $("#upload-photo").on('change', function() {
      uploadedPhoto = $("#upload-photo")[0].files[0];
      console.log(uploadedPhoto);
      $("#error-text").text("");
      $("#photo-preview").css('background-color', "#ddd");
      $("#photo-preview").text("");

      readURL(this);
  });

  function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#photo-preview').css('background-image', "url(" + e.target.result + ")");
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

  $("#submit_button").on('click' ,function() {
    var locationName = $("#loc_number_field").val();

    if (uploadedPhoto == null) {
      $("#error-text").text("Error: Make sure you enter a Clue Number and select a photo");
      $("#photo-preview").css('background-color', "#880000");
      $("#photo-preview").text("No Photo Uploaded");
      console.log("Error: No Photo Selected");
    } else if (locationName == "") {
      $("#error-text").text("Error: Make sure you entered a Clue Number and selected a photo");
      console.log("Error: No Location Name Entered");
      $("#loc_number_field").css('border', "2px solid #cc0000");
    } else {

        $("#error-text").text("");
        $("#loc_number_field").css('border', "2px solid #ccc");
        console.log("uploading");
        $("#submit_button").addClass("spinner-button");
        $("#submit_button").html('<img src="img/oval.svg" />');
        var fileType = uploadedPhoto.type;
        var file = uploadedPhoto;
        var metadata = {
            'name': locationName, // Filename at Google Drive
            'mimeType': fileType, // mimeType at Google Drive
            'parents': ['SET-THIS_GOOGLE_DRIVE_FOLDER_ID'], // Folder ID at Google Drive
        };

        var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
        var form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
        form.append('file', file);

        var xhr = new XMLHttpRequest();
        xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        xhr.responseType = 'json';
        xhr.onload = () => {
            console.log(xhr.response.id); // Retrieve uploaded file ID.

            $("#submit_button").html('<img src="img/check-mark.svg" />');
            $("#submit_button").css('background-color', "#00cc00");


            setTimeout(function(){
              console.log("RELOAD NOW");
              location.reload();
            }, 2000);

        };
        xhr.send(form);

    }
  });






});
