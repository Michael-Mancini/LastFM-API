$(document).ready(function(){

	$("#searchForm").submit(function(e){
		e.preventDefault();
		var str = $('#alb').val();
		var album = str.split(' ').join('+');
		var str2 = $('#art').val();
		var artist = str2.split(' ').join('+');
		var count = 0;

		$('#suggestions').empty();
		$('input').blur();

		// Call for album
		$.ajax({
			type: 'GET',
			url: 'http://ws.audioscrobbler.com/2.0/',
			data: 'method=album.search&'+
			'album='+album+
			'&api_key=4d53f4315e689c759c23ee667393383f&'+
			'format=json',
			dataType: 'jsonp',
			success: function(data){

				//console.log('Album search results:');
				//console.log(data);

				$.each(data.results.albummatches.album, function(index, value){
					if(value.artist.toLowerCase() == str2.toLowerCase()){
						$('#artist').html(data.results.albummatches.album[index].artist);
						$('#album').html(data.results.albummatches.album[index].name);
						$('#img').html('<img src="'+data.results.albummatches.album[index].image[2]['#text']+'"/>');
						return false;
					}
				});

			},
			error: function(){
				$('#artist').html('ERROR');
			}
		});

		// Call for artist's other albums
		$.ajax({
			type: 'GET',
			url: 'http://ws.audioscrobbler.com/2.0/',
			data: 'method=artist.gettopalbums&'+
			'artist='+artist+'&limit=4'+
			'&api_key=4d53f4315e689c759c23ee667393383f&'+
			'format=json',
			dataType: 'jsonp',
			success: function(data){

				//console.log('Artist search results:');
				//console.log(data);

				$('#sugHeading').css('display', 'block');

				$.each(data.topalbums.album, function(index, value){

					if(count < 2 && data.topalbums.album[index].name.toLowerCase() != str.toLowerCase()){
						$('#suggestions').append("<li><p>"+data.topalbums.album[index].name+"</p><img src='"+data.topalbums.album[index].image[2]['#text']+"'/></li>");
						count++;
					}

				});

			},
			error: function(){
				$('#artist').html('ERROR');
			}
		});

	});

});