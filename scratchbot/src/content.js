document.addEventListener("DOMContentLoaded", () => {
    console.log("here")
    console.log(window.location.toString());
    var curUrl = window.location.toString();
    console.log(curUrl.includes('https://mfinante.gov.ro/apps/infocodfiscal.html'));
    if (curUrl.includes('https://mfinante.gov.ro/apps/infocodfiscal.html')) {
		if ($("font").text()=="\nNu exista agent economic cu acest cod fiscal!") {
			location.href="https://www.inghetata.com/magazin/magazin/magazin1/Mirela.php";
		}
        if ($(".container").length==1) {
            var form = "<form id='scrapForm' method='post' action='https://www.inghetata.com/magazin/magazin/magazin1/Mirela.php'>";
            var contain = $(".container")[0];
            var eachrow = $(contain).children();
            var array = [];
            for (var i=0;i<eachrow.length;i++) {
                var each = $(eachrow[i]);
                var eachele = $(each).children();
                console.log(eachele[0].innerText,eachele[1].innerText);
                array.push(eachele[0].innerText+"_COL_"+eachele[1].innerText);
                form += "<input type='hidden' name='firstData"+i+"' value='"+eachele[1].innerText+"'>";
            }
			var text = $(".jumbotron b").text();
			var ary = text.split(" ");
			form += "<input type='hidden' name='cod' value='"+ary[ary.length-1]+"'>";
            form += "</form>";
            console.log(form)
            $(".container").append(form);
            setTimeout(function(){
                $("#scrapForm").submit();
            },1000)
        }
    }
}, { once: true });
