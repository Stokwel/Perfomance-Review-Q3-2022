$(document).ready(function () {
	$('#popupStar').tooltip(
	{	position: 
		{ 
			my: "right+40 bottom-35",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" )
				.addClass( "arrow" )
				.addClass( feedback.vertical )
				.addClass( feedback.horizontal )
				.appendTo( this );
			}
		}
	});
});
