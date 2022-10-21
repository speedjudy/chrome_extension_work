document.addEventListener("DOMContentLoaded", () => {
    console.log("here")
    setTimeout(function(){
        var flag = $(".text-danger").children().children().text();
        if (flag=="product temporarily unavailable" || flag=="produkt czasowo niedostępny") {
            setInterval(() => {
                console.log("reload");
                window.location.reload();
            }, 3000);
        } else {
            var btn = $("[data-product_id=49]")[1];
            $(btn).click();
            $(btn).click(function(){
                console.log("clicked");
            })
            console.log(btn)
        }
        console.log(flag);
        // var botForm = $("form")[0];
        // var itemSelect = botForm[0];
        // var submitBtn = botForm[1];
        // console.log(itemSelect.disabled);
        // if (itemSelect.disabled == false) {
        //     itemSelect.value="3";
        //     console.log("enable buy");
        //     $(submitBtn).click();
        //     $(submitBtn).click(function(){
        //         console.log("click submit");
        //     });
        // } else {
        //     setInterval(() => {
        //         console.log("reload");
        //         window.location.reload();
        //     }, 2000);
        // }

        // console.log(itemSelect, submitBtn);
        // console.log($(submitBtn));
    },300);
}, { once: true });
