var app = angular.module("galleryApp", []);

app.controller("GalleryController", function($scope, $http) {
    $scope.photos = [];

    // configurando as credenciais do Cloudinary
    const cloudName = "Untitled";
    const uploadPreset = "ml_default";

    $scope.uploadImage = function() {
        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        // enviando o arquivo para o Cloudinary
        $http.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function(response) {
            // quando o upload for bem-sucedido, obtenha a URL da imagem carregada
            const imageUrl = response.data.secure_url;
            // adicionando a imagem à lista de fotos exibidas na galeria
            $scope.photos.push({ name: file.name, url: imageUrl });
        });
    };
});
