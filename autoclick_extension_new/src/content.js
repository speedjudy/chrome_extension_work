document.addEventListener("DOMContentLoaded", () => {
    console.log("here")
    setTimeout(function () {
        var flag = $("[data-activity=Portatil-HP]").length;
        console.log(flag);
        if (flag) {
            var btn_class_list = $(".btn-seleccionar")[0].classList.value;
            var disableis = btn_class_list.indexOf("js-boton-inactivo");
            // console.log(btn_class_list);
            if (disableis > 0) {
                setInterval(() => {
                    console.log("reload");
                    window.location.reload();
                }, 2000);
            } else {
                console.log("autoclick");
                document.querySelector(".btn-seleccionar").click();
            }
        }
    }, 1000);
}, { once: true });
