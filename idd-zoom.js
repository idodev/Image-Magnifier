$(function(){
	
	var imageDims = {w:0,h:0};
	setImageWidth($(".idd-zoom img").attr('src'));
	initMag();

	

	$(".idd-zoom")
		.on('mousemove', function(e){
				var self = $(this);
				var offset = self.offset();
				var $mag = $('.idd-zoom-mag',self);
				var $fade = $('.idd-zoom-fade');
				var $magImg = $('img', $mag);
				var cursorPos = {
					't': e.pageY - offset.top,
					'l': e.pageX - offset.left
				}

				if(cursorPos.t < 0 || cursorPos.t > containerDims().h)
				{
					$mag.fadeOut(200);
					$fade.fadeOut(200);
					return;
				}

				if(cursorPos.l < 0 || cursorPos.l > containerDims().w)
				{
					$mag.fadeOut(200);
					$fade.fadeOut(200);
					return;
				}

				$mag.fadeIn(200);
				$fade.fadeIn(200);

				var pos = {
					't': cursorPos.t / containerDims().h,
					'l':  cursorPos.l / containerDims().w
				}
				var bgpos = {};
				bgpos.t = -((pos.t * imageDims.h) - 100) + 'px';
				bgpos.l = -((pos.l * imageDims.w) - 100) + 'px';
				

				$mag
					.css('left',cursorPos.l)
					.css('top',cursorPos.t);

				$magImg
					.css('left',  bgpos.l)
					.css('top', bgpos.t);

				//console.log(cursorPos, pos, bgpos, containerDims(), imageDims);

		})

	function initMag()
	{
		var self = $('.idd-zoom');
		var $mag = $('.idd-zoom-mag',self);
		var $img = $('img',self);
		$magImg = $('<img>')
		$magImg.attr('src',$img.attr('src'));
		$mag.append($magImg);

	}

	function setImageWidth(src) {
		var img = new Image();
		img.onload = function() {
			imageDims.w = this.width;
			imageDims.h = this.height;
		}
		img.src = src;
	}

	function containerDims() {
		return {
			'w': $('.idd-zoom img').width(),
			'h': $('.idd-zoom img').height()
		};
	}

});