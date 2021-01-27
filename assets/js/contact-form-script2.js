/*==============================================================*/
// Raque Contact Form 2  JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm2").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Avez-vous correctement rempli le formulaire?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });


    function submitForm(){
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
		var ville = $("#ville").val();
		var phone_number = $("#phone_number").val();
		var travau = $("#travau").val();
		var subvention = $("#subvention").val();
		var actuel = $("#actuel").val();
		var finition = $("#finition").val();
		var surface = $("#surface").val();		
		var delai= $("#delai").val();
        var message = $("#message").val();


        $.ajax({
            type: "POST",
            url: "assets/php/form-process2.php",
            data: "name=" + name + "&email=" + email + "&ville=" + ville + "&phone_number=" + phone_number + "&travau=" + travau + "&subvention=" + subvention + "&actuel=" + actuel + "&finition=" + finition + "&surface=" + surface + "&delai=" + delai + "&message=" + message,
            success : function(text){
                if (text == "success"){
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false,text);
                }
            }
        });
    }

    function formSuccess(){
        $("#contactForm2")[0].reset();
        submitMSG(true, "Merci. Votre demande est bien prise en compte, vous serez contacté dans les plus brefs délais!")
    }

    function formError(){
        $("#contactForm2").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h4 tada animated text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
}(jQuery)); // End of use strict