$(function () {
	//XML objekter
	var kategoridata = null;
	var nrkXmlObjekt = null;

	//Opprett HTML objekter
	var $hentUl;
	var $mainContent;

	//set html objekter
	var init = function () {

		var setHTMLObjects = function () {
			$hentBtn = $("#hentBtn");
			$hentUl = $("#hentUl");
			$mainContent = $("#mainContent");

			var initPage = function () {
				getXML();
			}(); //end Initpage
		}(); //end SetHMTMLObjects 
	}(); // end init

	
	//Tittel og adresse hentes fra det innhentede xml-objektet og legges til LI-elementet som opprettes som attributter. Kategoriene legges til i nedtrekksmenyen. 
	function setKategori() {
		$(kategoridata)
			.find("kategori")
			.each(function () {
				var title = $("title", this).text();
				var rssUrl = $("dataUrl", this).text();

				var $nyKategori = $("<li>")
					.addClass("dropdown-item")
					.append($("<a>").html(title))
					.attr({
						"data-url": rssUrl,
					});
				$hentUl.append($nyKategori);
			});
		setEventPaLi();
	};
	
	function setEventPaLi() {
		//på klikk på Li-elementene i nedtrekksmenye settes adresselinken fra xml-lista inn i feed-adressen. og adressen sendes med HentNrkRssXMl-kallet
		$("li").on("click", function () {
			var menyUrl = $(this).attr("data-url");
			var feedUrl = "php/proxy.php?feedUrl=" + menyUrl;
			getNrkRssXML(feedUrl);
		});
	}; //end setEventsPåLi

	//Ajaxkallet mot XMLfila med oversikt over kategorier og adresser til NRKs RSS. 
	//Resultatet hentes inn og setKategorifunksjonen kalles for å lage nedtrekkesmeny.
	function getXML() {
		$.ajax({
			method: "GET",
			url: "xml/nrkRSS.xml",
			dataType: "xml",
			async: "false",

			success: function (xmlResultat) {
				kategoridata = xmlResultat;
				setKategori();
			},

			complete: function () {
				console.log("Ferdig");
			}
		})
	}; // end getXML

	//REsultatet fra NRKs Rss-xml hentes inn.
	function getNrkRssXML(feedUrl) {
		//Visningsområdet tømmes for eksisterende data
		$mainContent.html("");
		$.ajax({
			url: feedUrl,
			method: "GET",
			dataType: "xml",
			success: function (xmlResult) {

				nrkXmlObjekt = xmlResult;
				//Resultatet hentes ut og lages til artikkelelementer
				$(nrkXmlObjekt)
					.find("item")
					.each(function () {
						var title = $("title", this).text();
						var description = $("description", this).text();
						var thumbnail = $("enclosure", this).attr("url");

						var $newArticle = $("<div>")
							.addClass("col-sm-4 col-md-4 col-lg-3")
							.css({
								height: 430
							}) //som gis verdier
							.append(
								$("<h3>").html(title),
								$("<p>").html(description),
								$("<img>", {
									src: thumbnail
								})
								.addClass("img-responsive")
								.attr({
									alt: title
								})

							);
						//og presenteres på visningsområdet
						$("#mainContent").append($newArticle);
					})
			},
			//Feilmelding
			error: function (a, b, c) {
				console.log("Funker Ikke RssFeedResultat");
			}
		})
	}; //end getNrkRssXML
}); //end document.ready
