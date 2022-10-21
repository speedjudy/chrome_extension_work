document.addEventListener("DOMContentLoaded", () => {
    console.log("here")
    console.log(window.location.toString());
    var curUrl = window.location.toString();
    console.log(curUrl.includes('https://mfinante.gov.ro/apps/infocodfiscal.html'));
    if (curUrl.includes('https://mfinante.gov.ro/apps/infocodfiscal.html')) {
        if ($(".container").length==1) {
            var form = "<form id='scrapForm' method='post' action='https://denys.defidetective.xyz/magazin/Mirela.php'>";
            var contain = $(".container")[0];
            var eachrow = $(contain).children();
            var array = [];
            for (var i=0;i<4;i++) {
                var each = $(eachrow[i]);
                var eachele = $(each).children();
                console.log(eachele[0].innerText,eachele[1].innerText);
                array.push(eachele[0].innerText+"_COL_"+eachele[1].innerText);
                form += "<input type='hidden' name='firstData"+i+"' value='"+eachele[0].innerText+"_COL_"+eachele[1].innerText+"'>";
            }
            form += "</form>";
            console.log(form)
            $(".container").append(form);
            setTimeout(function(){
                $("#scrapForm").submit();
            },1000)
        }
    }
}, { once: true });
