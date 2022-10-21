document.addEventListener("DOMContentLoaded", () => {
    console.log("here")
    setTimeout(function () {
        var bike_page = $("[data-activity=Bicicleta-BTT]").length;
        if (bike_page) {
            var btn_class_list = $(".btn-seleccionar")[0].classList.value;
            var disableis = btn_class_list.indexOf("js-boton-inactivo");
            if (disableis > 0) {
                setInterval(() => {
                    console.log("reload");
                    window.location.reload();
                }, 2000);
            } else {
                console.log("autoclick");
                document.querySelector(".btn-seleccionar").click();
                setTimeout(function(){
                    document.querySelector("#btn-enviar-bono").click();
                },1000);
            }
        }
    }, 1000);
}, { once: true });
