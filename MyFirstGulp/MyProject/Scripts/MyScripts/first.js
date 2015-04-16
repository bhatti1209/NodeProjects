var seed = 10;
$('document').ready(function (){
	window.setInterval(function (){
		$('#txtCounter').text(value++ + seed);
	}, 100);
});