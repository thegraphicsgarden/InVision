$(document).ready(function() {

	displayLogo = function() {
		if( $(this).width() < 400 ) {
			$("img#logo").attr("src","./images/logo-small.png");
		} else {
			$("img#logo").attr("src","./images/logo.png");
		}
	}
	displayLogo();


	$visiblePosts = [];

	/* CHANGE VIEW */
	$all = $("#posts article.post, #posts article.picPost, #posts article.vidPost").toArray();
	$photos = $("#posts article.picPost").toArray();
	$videos = $("#posts article.vidPost").toArray();
	$visiblePosts = $("#posts article:visible").toArray();
	$loadMore = $("#loadMore");
	$hidden1 = $("#hidden1");


	$("#postFilter li a").click(function() {
	//console.log($all);
		if ( !$(this).hasClass("active") ) {
			$(this).addClass("active");
			$(this).parent("li").siblings("li").find("a").removeClass("active");

			$type = $(this).attr("data-posts");
			switch($type) {
				case "all": 
					$(".post, .picPost, .vidPost").show();
					break;
				case 'photos': 
					$(".picPost").show();
					$(".post, .vidPost").hide();
					break;
				case 'videos': 
					$(".vidPost").show();
					$(".post, .picPost").hide();
					break;
				default: 
					$(".post, .picPost, .vidPost").show();
					break;
			}
			$visiblePosts = $("#posts article:visible").toArray();
		}
	});

	/* CHANGE LAYOUT */
	$firstCol = $("[data-col=0]");
	$secondCol = $("[data-col=1]");
	$thirdCol = $("[data-col=2]");
	$listClasses = "col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3";
	$gridClasses = "col-xs-12 col-sm-4";
	$("#viewOptions li a").click(function() {
		//console.log($(this).attr("data-style"));
		if ( !$(this).hasClass("active") ) {
			$(this).addClass("active");
			$(this).parent("li").siblings("li").find("a").removeClass("active");
		
			if ($(this).attr("data-style") === "grid") {
				$firstCol.empty();
				$firstCol.removeClass().addClass($gridClasses);

				var colIndex, nextIndex;
				var curCol, nextCol;
				for(var i = 0; i < $all.length; i++) {
					colIndex = i % 3;
					do {	
						nextIndex = (colIndex + 1 > 2) ? 0 : colIndex + 1;
						curCol = $("[data-col='" + colIndex + "']");
						nextCol = $("[data-col='" + nextIndex + "']");
						if(curCol.height() <= nextCol.height()) {
							//console.log(curCol.height() + " " + nextCol.height() );
							curCol.append($all[i]);
							break;
						}
						colIndex = (colIndex + 1 > 2) ? 0 : colIndex + 1;
					} while(true)
				};
				$("#posts").attr("data-style","grid");
			} else {
				$firstCol.empty();
				$firstCol.removeClass().addClass($listClasses);
				for(var i = 0; i < $all.length; i++) {
					$firstCol.append($all[i]);
				};
				$("#posts").attr("data-style","list");
				//$firstCol.append($loadMore);
				//$firstCol.append($hidden1);
			}
		}


		
	});

	/* DROPDOWN */
	$(".options").mouseenter(function() {
		$("#dropdown").css({display:"block"});
	});
	$(".options").mouseleave(function() {
		$("#dropdown").css({display:"none"});
	});

	/* CHAT */
	$("a#chat").click(function() {
		//console.log("modalActive");
		$("body").addClass("modalActive");
		$("#modalBkg").css({"display":"block"});
		$("#chatModal").css({"visibility":"visible"});
	});
	$("a#close").click(function() {
		$("#modalBkg").css({display:"none"});
		$("#chatModal").css({"visibility":"hidden"});
	});

	/* LOAD MORE */
	$("#loadMore a").click(function() {
		$(this).parent("#loadMore").hide();
		$("#hidden1").css({display: "block"});
	});

	/* EXPAND */
	$("#posts").on("click", ".expand a", function() {
		$article = $(this).parents("article");
		//console.log($article);
		if ($(this).text() === "Expand") {
			$(this).text("Collapse");
			$article.find(".responses").css({display: "block"});
			$article.css({ "padding-bottom": 0});
		} else {
			$(this).text("Expand");
			$article.find(".responses").css({display: "none"});
			$article.css({ "padding-bottom": "20px"});
		}
		
	});

	/* ADAPT LOGO */
	$(window).resize(function() {
	  	displayLogo();
	});



	$("#profileHero #postFilter li a").click(function() {
		$type = $(this).attr("data-option");
		console.log($type);

		$("#posts, #followers, #following").hide();
		$("[data-profile-option='" + $type + "']").css({display: "block"});
	});
})(jQuery);