/*
 
originally found here: http://net.tutsplus.com/tutorials/html-css-techniques/learn-how-to-create-a-retro-animated-flip-down-clock/

simple jQuery Port made by team Odeon. http://od-eon.com

*/
    var current = {
        "s1": -1,
        "s2": -1
    };
    
    var paths = {
        "singles": 'Single',
        "doubles": 'Double',
		"golds": 'Gold'
    };
    
   	var now = 0; 
	var handle;
	var seq = 1;
	
    function flip(upperId, lowerId, changeNumber, pathUpper, pathLower){
        var upperBackId = upperId+"Back";
        $(upperId)
            .attr('src', $(upperBackId).attr('src'))
            .height("480px")
            .css({"visibility": "visible", 'display': 'inline-block' });
        
        $(upperBackId).attr('src', pathUpper + parseInt(changeNumber, 10) + ".png");
        
        $(lowerId)
            .attr('src', pathLower + parseInt(changeNumber, 10) + ".png")
            .height('0px')
            .css({"visibility": "visible", 'display': 'inline-block'});
        
        $(upperId).animate({'height': 0}, { 'duration': 200, defaultEasing: 'easeinoutsine', 'complete': function(){
            $(lowerId).animate({'height': 64}, { 'duration': 200, defaultEasing: 'easeinoutsine', 'complete': function(){
                $(lowerId + "Back").attr('src', $(lowerId).attr('src') );
                $(lowerId).add(upperId).css({"visibility": "hidden",
                                             "display": 'inline-block' }).height('0');
            } } );
        } });
    }

    
    function tick(){
        var total = $('#total').val(),
            s1 = now / 10,
            s2 = now % 10,
            pathSingle = paths.singles,
            pathDouble = paths.doubles,
			pathGold = paths.golds;
         
			
         if (now <= total && now < 100){
			var audio = new Audio('audio/smw_coin.wav');
			audio.play();
		 
			now++;
            flip('#secondsUpRight', '#secondsDownRight', s2, pathGold + '/', pathGold + '/');
            current.s2 = s2;
            
            flip('#secondsUpLeft', '#secondsDownLeft', s1, pathGold + '/', pathGold + '/');
            current.s1 = s1;
			
			if( now == total )
			{
			var audio = new Audio('audio/smw_1-up.wav');
			audio.play();
			
			//var no = $('#scoreboard > tbody').children().size();
			//$('#scoreboard > tbody:last').append('<tr class="warning"><td>'+no+'</td><td>'+total+'</td></tr>');
			//$('#score'+seq).append('<h3>'+total+'</h3>');
			$('#score'+seq).append('<input type="text" class="form-control  input-lg " value="'+total+'"/>');
			seq++;
			}
        } 

    }
    

    function retroClock(){
        tick();
		clearInterval(handle);
        handle = setInterval(tick, 90);
    }
	
    function calc(){
		var scores = $('#score').val().split(",");
		var total = 0;
		for (var i = 0; i < scores.length; i++) {
			total += scores[i] << 0;
		}
		now = 0;
		$('#total').attr('value',total);
		retroClock();
    }
    
