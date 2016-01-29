function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
$(function() {
    $("form").on("submit", function(e) {
        var cont = 1;
       e.preventDefault();
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 12,
            order: "viewCount",
            channelId: "UC4ZpCy36n9bb_zenSz7gDfA"
       }); 
       request.execute(function(response) {
          var results = response.result;
          
          $("#results").html("");
          $("#results1").html("");
          $("#results2").html("");
          $.each(results.items, function(index, item) {
            $.get("assets/template/item.html", function(data) {
                var fecha = item.snippet.publishedAt;
                var datePrint = formatDate(fecha);
                //alert(fecha);
                    if (cont <=4) {
                        $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId, "description":item.snippet.description, "fecha":datePrint}]));
                    }else if (cont<=8) {
                        $("#results1").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId,  "description":item.snippet.description, "fecha":datePrint}]));
                    }else{
                        $("#results2").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId,  "description":item.snippet.description, "fecha":datePrint}]));
                    }

                    cont ++;
                
            });
          });
          resetVideoHeight();
       });
    });
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
    $(".video").css("height", $("#results1").width() * 9/16);
    $(".video").css("height", $("#results2").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyBo_kaElA0N7yGmXiVdXYcPHvOYHU40eJA");
    gapi.client.load("youtube", "v3", function() {
    });
}
function formatDate(date){
        var fecha = date.split("T");
        return fecha[0];
    }
