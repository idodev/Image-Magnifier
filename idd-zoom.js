var magpic = function(selector, options ) {
	var _this = this;
	_this.el = $(selector);
	_this.imgSrc = $('img', _this.el).attr('src');

	/*----------------------------------*/
	/* Set instance settings			*/
	/*----------------------------------*/
	var defaults = {
		magnifierSize: 200,
		fadeDuration: 200,
		enabled: true,
		initialPosition: false
	};
	options = options || {};
	_this.settings = $.extend( {}, defaults, options );
	

	/*----------------------------------*/
	/* Store Image Size 				*/
	/*----------------------------------*/
	_this.imgSize = {width:null, height:null};
	_this.img = new Image();
	_this.img.onload = function() {
		_this.imgSize.width = this.width;
		_this.imgSize.height = this.height;

		if(_this.settings.initialPosition!=false) 
			_this.moveTo(_this.settings.initialPosition[0], _this.settings.initialPosition[1]);
	}
	// set image src, this will trigger the event above
	_this.img.src = _this.imgSrc;


	/*----------------------------------*/
	/* Append elements to container		*/
	/*----------------------------------*/
	
	// magnifier div
	_this.magEl = $('<div>').addClass('idd-zoom-mag');
	_this.magEl
		.css('width', _this.settings.magnifierSize + 'px')
		.css('height', _this.settings.magnifierSize + 'px')
		.css('margin-top', -(_this.settings.magnifierSize/2) + 'px')
		.css('margin-left', -(_this.settings.magnifierSize/2) + 'px')

	// magnifier image (appended to mag div)
	_this.magImgEl = $('<img>').attr('src',_this.imgSrc);
	_this.magEl.append(_this.magImgEl);
	// bg fade div 
	_this.fadeEl = $('<div>').addClass('idd-zoom-fade');
	// append new elements to container
	_this.el.append(_this.fadeEl);
	_this.el.append(_this.magEl);


	/*----------------------------------*/
	/* Toggle visibility				*/
	/*----------------------------------*/	
	_this.isVisible = false;	
	_this.toggleVisibility = function (show) {
		if(show == undefined) show = !_this.isVisible;
		if(show) {
			_this.magEl.fadeIn(_this.settings.fadeDuration);
			_this.fadeEl.fadeIn(_this.settings.fadeDuration);
		} else {
			_this.magEl.fadeOut(_this.settings.fadeDuration);
			_this.fadeEl.fadeOut(_this.settings.fadeDuration);
		}
		_this.isVisible = show;
	};



	/*----------------------------------*/
	/* Enable listener for mouse move	*/
	/*----------------------------------*/
	_this.el.on('mousemove', function(e) {
		// if the image size is not yet initialised, don't proceed
		if(_this.imgSize.width == null) return;
		
		var offset, mousePositionInImage;

		// update offset
		offset = $(this).offset();
		mousePositionInImage = {
			'x': e.pageX - offset.left,
			'y': e.pageY - offset.top
		};


		if(mousePositionInImage.y < 0 || mousePositionInImage.y > _this.el.height())
		{
			if(_this.isVisible) _this.toggleVisibility(false);
			return;
		}

		if(mousePositionInImage.x < 0 || mousePositionInImage.x > _this.el.width())
		{
			if(_this.isVisible) _this.toggleVisibility(false);
			return;
		}

		_this.moveTo(mousePositionInImage.x, mousePositionInImage.y);
		

	});

	_this.moveTo = function(x, y) {
		var magnifierImageOffset = {
			'x': -((( x / _this.el.width() ) * _this.imgSize.width ) - ( _this.settings.magnifierSize / 2 )),
			'y': -((( y / _this.el.height() ) * _this.imgSize.height ) - ( _this.settings.magnifierSize / 2 ))
		}

		//set position of magnifier over image
		_this.magEl
			.css('left', x)
			.css('top', y);

		// set margin offset of image within magnifier
		_this.magImgEl
			.css('left',  magnifierImageOffset.x)
			.css('top', magnifierImageOffset.y);

		// if not already displayed, fade in magnifier
		if(!_this.isVisible) _this.toggleVisibility(true);
	}

};
