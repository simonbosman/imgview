/**
 *      (S)
 *      /0\
 *     /---\
 *    /-----\
 *
 * Image Viewer 1.0 Classes
 *
 * Classes for panning/zoming of images
 *
 * @author simonbosman@gmail.com
 * @version 1.1
 * @since 2007-04-16
 *
 */

/**
 * @namespace simon
 */
var simon = {};

/**
 * simon object containers
 */
simon.Containers = {
	CanvasContainer: {},
	CanvasImage: {},
	Canvas: {},
	Computers: {}
};

/**
*  simon Version consts are defined here
*/
simon.version = {
NAME: 'simon Classes',
VERSION: '1.0',
AUTHOR: 'simonbosman@gmail.com',
show: function(){
	with(simon.version){
		console.log(NAME + ' v' + VERSION + ' by: ' + AUTHOR);
		}
	}
};

/** 
 * Enabling debugging
 */
simon.DEBUG = false;
simon.EDIT = false;


/**
* simon default errors are defined here
*/
simon.errors = {
ERR_OBJECT: 'Not an valid HTML Element Object',
ERR_PARAM: 'Not an valid Parameter',
ERR_LOCAL: 'Local Vars not set'
};


/**
 * This class creates the legend containing the zoomfunctions
 *
 * @param {Object} CanvWidth
 * @param {Object} CanvHeight
 * @param {Object} PosY
 * @param {Object} PosX
 * @param {Object} ZoomContId
 */
simon.CanvasZoomMod = function(CanvWidth, CanvHeight, PosY, PosX, ZoomContId){
	this.ZoomContId = '';
	this.ZoomCont = document.createElement('DIV');
	this.ZoomCont.id = 'ZoomCont'.concat(this.ZoomContId);
	this.ZoomMin = document.createElement('DIV');
	this.ZoomMin.id = 'ZoomMin';
	this.ZoomPlus = document.createElement('DIV');
	this.ZoomPlus.id = 'ZoomPlus';
	this.ZoomContStyles = {
		position: 'absolute',
		border: '1px solid white',
		backgroundColor: '#6495ED',
		filter: 'alpha(opacity=75)',
		opacity: '0.75',
		zIndex: '3'
	};
	this.ZoomControlStyles = {
		position: 'relative',
		width: '20px',
		height: '20px',
		border: '1px solid gray',
		color: 'white',
		backgroundColor: 'white',
		align: 'center'
	};
	this.ZoomControlStylesMin = {
		left: '5px',
		top: '5px',
		styleFloat: 'left'
	};
	this.ZoomControlStylesPlus = {
		top: '5px',
		left: '6px'
	};
	this.init(CanvWidth, CanvHeight, PosY, PosX, ZoomContId);
};

simon.CanvasZoomMod.prototype = {

	/**
	 *
	 * @constructor
	 * @param {Object} CanvWidth
	 * @param {Object} CanvHeight
	 * @param {Object} PosY
	 * @param {Object} PosX
	 * @param {Object} ZoomContId
	 *
	 */
	init: function(CanvWidth, CanvHeight, PosY, PosX, ZoomContId){
	try
	{
		if(parseInt(CanvWidth)){
			this.ZoomContStyles.width = CanvWidth + 'px';
		}
		if(parseInt(CanvHeight)){
			this.ZoomContStyles.height = CanvHeight + 'px';
		}
		if(parseInt(PosX)){
			this.ZoomContStyles.left = PosX + 'px';
		}
		if(parseInt(PosY)){
			this.ZoomContStyles.top = PosY + 'px';
		}
		if(ZoomContId && ZoomContId.length>0){
			this.ZoomCont.id = this.ZoomCont.id.concat(ZoomContId);
		}
		styleZoomCont = new simon.StyleRuleMod(this.ZoomCont);
		for(var prop in this.ZoomContStyles){
			styleZoomCont.setStyle(prop, this.ZoomContStyles[prop]);
		}
		styleZoomControlMin = new simon.StyleRuleMod(this.ZoomMin);
		for(var prop in this.ZoomControlStyles){
			styleZoomControlMin.setStyle(prop, this.ZoomControlStyles[prop]);
		}
		for(var prop in this.ZoomControlStylesMin){
			styleZoomControlMin.setStyle(prop, this.ZoomControlStylesMin[prop]);
		}
		styleZoomControlPlus = new simon.StyleRuleMod(this.ZoomPlus);
		for(var prop in this.ZoomControlStyles){
			styleZoomControlPlus.setStyle(prop, this.ZoomControlStyles[prop]);
		}
		for(var prop in this.ZoomControlStylesPlus){
			styleZoomControlPlus.setStyle(prop, this.ZoomControlStylesPlus[prop]);
		}
		if(this.ZoomPlus.addEventListener){
			styleZoomControlPlus.setStyle('left', '32px');
			styleZoomControlPlus.setStyle('top', '-17px');
		}
		this.ZoomMin.innerHTML = '<img src=icon-minus.png id=minImg>';
		this.ZoomPlus.innerHTML = '<img src=icon-plus.png id=plusImg>';
		this.ZoomCont.appendChild(this.ZoomMin);
		this.ZoomCont.appendChild(this.ZoomPlus);

		document.body.appendChild(this.ZoomCont);
		HandlersZoomMin = new simon.HandlersZoomMod(this.ZoomMin);
		HandlersZoomPlus = new simon.HandlersZoomMod(this.ZoomPlus);
		evMin = new simon.EventMod(this.ZoomMin);
		evPlus = new simon.EventMod(this.ZoomPlus);
		evMin.addEv('mouseover', HandlersZoomMin.mouseOver);
		evMin.addEv('mouseout', HandlersZoomMin.mouseOut);
		evMin.addEv('mousedown', HandlersZoomMin.mouseDownMin);
		evMin.addEv('mouseup', HandlersZoomMin.mouseUpMin);
		evPlus.addEv('mouseover', HandlersZoomPlus.mouseOver);
		evPlus.addEv('mouseout', HandlersZoomPlus.mouseOut);
		evPlus.addEv('mousedown', HandlersZoomPlus.mouseDownPlus);
		evPlus.addEv('mouseup', HandlersZoomPlus.mouseUpPlus);
	}
	catch(e)
	{
		if (simon.DEBUG) console.log(simon.version.NAME + ' simon.CanvasZoomMod->init ' + e.message);
	}
	finally
	{
		delete styleZoomCont;
		delete styleZoom;
		delete styleZoomControlMin;
		delete styleZoomControlPlus;
		delete HandlersZoomMin;
		delete HandlersZoomPlus;
		delete evMin;
		delete evPlus;
	}
	}
};

/**
 * Class for creating the Canvas
 *
 * @param {Object} CanvWidth
 * @param {Object} CanvHeight
 * @param {Object} PosY
 * @param {Object} PosX
 * @param {Object} CanvImg
 * @param {Object} ImgContId
 */
simon.CanvasMod = function(CanvWidth, CanvHeight, PosY, PosX, CanvImg, ImgContId){
	this.ImgContId = '';
	this.ImgCont = document.createElement('DIV');
	this.ImgCont.id = 'ImgCont'.concat(this.ImgContId);
	this.ImgCanv = document.createElement('DIV');
	this.ImgCanv.id = 'ImgCanv'.concat(this.ImgContId);
	this.CanvImg = new Image();
	this.CanvImg.src ='';
	this.CanvImg.id = 'CanvImg'.concat(this.ImgContId);
	this.CanvImg.TotZoomFactor = 0;
	this.stylesShared = {position: 'absolute'};
	this.ImgContStyles = {
		border: '1px solid black',
		overflow: 'hidden',
		zIndex: '0'
	};
	this.ImgCanvStyles = {
		backgroundColor: 'purple',
		filter: 'alpha(opacity=0)',
		opacity: '0.0',
		zIndex : '2'
	};
	this.CanvImgStyles = {
		position: 'relative'
	};
	this.init(CanvWidth, CanvHeight, PosX, PosY, CanvImg, ImgContId);
};

simon.CanvasMod.prototype = {

	/**
	 * @constructor
	 * @param {Object} CanvWidth
	 * @param {Object} CanvHeight
	 * @param {Object} PosY
	 * @param {Object} PosX
	 * @param {Object} CanvImg
	 * @param {Object} ImgContId
	 */
	init : function(CanvWidth, CanvHeight, PosX, PosY, CanvImg, ImgContId){
	try
	{
			if(parseInt(CanvWidth)){
				this.stylesShared.width = CanvWidth + 'px';
			}
			if(parseInt(CanvHeight)){
				this.stylesShared.height = CanvHeight + 'px';
			}
			if(parseInt(PosX)){
				this.stylesShared.left = PosX + 'px';
			}
			if(parseInt(PosY)){
				this.stylesShared.top = PosY + 'px';
			}
			if(ImgContId && ImgContId.length>0)
				{
					this.ImgCont.id = this.ImgCont.id.concat(ImgContId);
					this.ImgCanv.id = this.ImgCanv.id.concat(ImgContId);
					this.CanvImg.id = this.CanvImg.id.concat(ImgContId);
					this.ImgContId = ImgContId;
				}

			imgObj = new Image();
			if(imgObj.src = CanvImg){
				this.CanvImg.src = CanvImg;
			}
			styleImgCont = new simon.StyleRuleMod(this.ImgCont);
			for(var prop in this.stylesShared){
				styleImgCont.setStyle(prop, this.stylesShared[prop]);
			}
			for(var prop in this.ImgContStyles){
     			styleImgCont.setStyle(prop, this.ImgContStyles[prop]);
   			}
			styleImgCanv = new simon.StyleRuleMod(this.ImgCanv);
			for(var prop in this.stylesShared){
				styleImgCanv.setStyle(prop, this.stylesShared[prop]);
			}
			styleImgCanv.setStyle('cursor', 'url(grab.cur), hand');

			for(var prop in this.ImgCanvStyles){
				styleImgCanv.setStyle(prop, this.ImgCanvStyles[prop]);
			}
			styleCanvImg = new simon.StyleRuleMod(this.CanvImg);
			for(var prop in this.CanvImgStyles){
				styleCanvImg.setStyle(prop, this.CanvImgStyles[prop]);
			}
			
			this.ComputerBak = document.getElementById('ObjectsContainer');
					this.styleComputerBak = new simon.StyleRuleMod(this.ComputerBak);
					if (self.innerWidth){
						if(self.innerWidth <= 1024){
							this.styleComputerBak.setStyle('top', '500');
						}
					}
					else if(document.body.clientWidth){
						if(document.body.clientWidth <= 1024){
							this.styleComputerBak.setStyle('top', '500');
						}
					}
					//this.styleComputerBak.setStyle('display', 'block');
					
			var CanvImg = {};
			var ImgCont = {};
			var ImgCanv = {};
			var ZoomContId = '';
			var styleImgCanv = {};
			var fitCanvImg = {};
			var Completed = false;
			var x = 0;
			var y = 0;

			CanvImg = this.CanvImg;
			ImgCont = this.ImgCont;
			ImgCanv = this.ImgCanv;
			ZoomContId = this.ImgContId;

			function imgLoaded(){
				if(CanvImg.complete){
					Completed = true;
				}
				else{
					Completed = false;
				}
				if(Completed){
					ImgCont.appendChild(CanvImg);
					document.body.appendChild(ImgCont);
					document.body.appendChild(ImgCanv);
					Handlers = new simon.HandlersCanvMod(ImgCanv);
					ev = new simon.EventMod(ImgCanv);
					ev.addEv('mousedown', Handlers.mouseDown);
					ev.addEv('mouseup', Handlers.mouseUp);
					styleImgCont = new simon.StyleRuleMod(ImgCont);
					x = styleImgCont.getStyle('width').slice(0,-2);
					y = styleImgCont.getStyle('height').slice(0,-2);
					PosY = parseInt(styleImgCont.getStyle('top').slice(0,-2))+5;
					PosX = parseInt(styleImgCont.getStyle('left').slice(0,-2))+ parseInt(x)-65;
					simon.Containers.CanvasContainer[ImgCont.id] = ImgCont;
					simon.Containers.CanvasImage[CanvImg.id] = CanvImg;
					simon.Containers.Canvas[ImgCanv.id] = ImgCanv;
					fitCanvImg = new simon.ZoomImgMod(CanvImg);
					fitCanvImg.zoomFit(x, y);
					Legend = new simon.CanvasZoomMod(60, 34, PosY, PosX, ZoomContId);
					return true;
				}
				else{
					setTimeout(imgLoaded,100);
				}
			}
			imgLoaded();
	}
	catch(e)
	{
		if (simon.DEBUG) console.log(simon.version.NAME + ' simon.CanvasMod->init ' + e.message);
	}
	finally
	{
		delete Handlers;
		delete ev;
		delete styleImgCont;
		delete styleImgCanv;
		delete styleCanvImg;
		delete fitCanvImg;
		delete Legend;
	}
	}
};

simon.ComputersMod = function(CompWidth, CompHeight, PosX, PosY, CompImg, CompId, LocId, InBak, CompDescr){
	this.CompId = '';
	this.CompDescr = '';
	this.CompCont = document.createElement('DIV');
	this.CompCont.id = 'CompCont'.concat(this.CompId);
	this.CompCont.CompOnCanvas = false;
	this.CompCont.LocationId = 1;
	this.CompCont.PosRelative = false;
	this.CompImg = new Image();
	this.CompImg.src ='';
	this.CompImg.id = 'CompImg'.concat(CompId);
	this.CompImg.title = 'Computer';
	this.CompWidth = 0;
	this.CompHeight = 0;
	this.PosX = 0;
	this.PosY = 0;
	this.CumY = 0;
	this.isHidden = '';
	this.CompContStyles = {
		position: 'absolute',
		border: '1px solid black',
		zIndex: '2',
		backgroundColor: '#EBECF0',
		color: 'red'
	};
	this.CompImgStyles = {
		position: 'relative'
	};
	//this.CompAllStyles = {}
	this.InBak = false;
	this.init(CompWidth, CompHeight, PosX, PosY, CompImg, CompId, LocId, InBak, CompDescr);
};

simon.ComputersMod.prototype = {
	init : function(CompWidth, CompHeight, PosX, PosY, CompImg, CompId, LocId, InBak, CompDescr){
		try
		{
			if(parseInt(LocId)){
				this.CompCont.LocationId = LocId;
			}
			if(InBak){
				this.InBak = InBak;
			}
			if(CompDescr){
				this.CompDescr = CompDescr;
			}
			this.CanvImgId = 'CanvImg' + this.CompCont.LocationId;
			this.CanvImg = simon.Containers.CanvasImage[this.CanvImgId];
			this.CanvContId = 'ImgCont' + this.CompCont.LocationId;
			this.CanvCont = simon.Containers.CanvasContainer[this.CanvContId];
			this.PosCont = new simon.PositionMod(this.CanvCont);
			this.CanvContPosX = this.PosCont.getPosX();
			this.CanvContPosY = this.PosCont.getPosY();
			this.CanvImgPos = new simon.PositionMod(this.CanvImg);
			this.CanvImgPosX = this.CanvImgPos.getPosX(true);
			this.CanvImgPosY = this.CanvImgPos.getPosY(true);
			this.ComputerBak = document.getElementById('ObjectsContainer');
			this.styleComputerBak = new simon.StyleRuleMod(this.ComputerBak);
			styleCompCont = new simon.StyleRuleMod(this.CompCont);
		
			if(parseInt(CompWidth)){
				this.CompContStyles.width = CompWidth + 'px';
			}
			if(parseInt(CompHeight)){
				this.CompContStyles.height = CompHeight + 'px';
			}
			if(parseInt(PosX) || PosX == 0){
				w = parseInt(CompWidth/2);
				h = parseInt(CompHeight/2);
				if(!(this.InBak)){
					PosX = Math.round(PosX * (this.CanvImg.TotZoomFactor / 100) + this.CanvContPosX + this.CanvImgPosX - w);
					this.CompCont.CompOnCanvas = true;
				}
				else{
					with(simon.Containers){
					counter = 1;
						for(var Computer in Computers){
							if(!Computers[Computer].CompOnCanvas){
								counter ++;
							}
						}
					}
					if(counter % 2)
						PosX = 812; 
					else
						PosX = 812+ CompWidth + 5;
					this.CompCont.CompOnCanvas = false;
				}
				this.CompContStyles.left = PosX + 'px';
			}
			if(parseInt(PosY) || PosY == 0){
				if(!(this.InBak)){
					PosY = Math.round(PosY * (this.CanvImg.TotZoomFactor / 100) + this.CanvContPosY + this.CanvImgPosY - h);
					this.CompCont.CompOnCanvas = true;
				}
				else{
					with(simon.Containers){
					counter = 1;
						for(var Computer in Computers){
							if(!Computers[Computer].CompOnCanvas){
								counter ++;
								if(counter % 2){
									this.CumY += CompHeight + 5;	
								}
							}
						}
					}
					if (self.innerWidth){
						if(self.innerWidth <= 1024){
							PosY = 560 + this.CumY;
							this.styleComputerBak.setStyle('top', '520');
						}
						else
							PosY = 295 + this.CumY;
					}
					else if(document.body.clientWidth){
						if(document.body.clientWidth <= 1024){
							PosY = 560 + this.CumY;
							this.styleComputerBak.setStyle('top', '520');
						}
						else
							PosY = 295 + this.CumY;
					}
					this.CompCont.CompOnCanvas = false;
					if(this.styleComputerBak.getStyle('display') == 'none'){
						styleCompCont.setStyle('display', 'none');
					}
					else{
						styleCompCont.setStyle('display', 'block');
					}	
					if(counter % 2){
						this.ComputerBakHeight = parseInt(this.styleComputerBak.getStyle('height').slice(0, -2)); 
						this.ComputerBakHeight +=  CompHeight + 5;
						this.styleComputerBak.setStyle('height', this.ComputerBakHeight);
					}
				}
				this.CompContStyles.top = PosY + 'px';
			}
			if(CompId && CompId.length>0){
					this.CompCont.id = this.CompCont.id.concat(CompId);
			}
			imgObj = new Image();
			if(imgObj.src = CompImg){
				this.CompImg.src = CompImg;
			}
			for(var prop in this.CompContStyles){
				styleCompCont.setStyle(prop, this.CompContStyles[prop]);
			}
			styleCompCont.setStyle('background', ' url(' + this.CompImg.src + ')');
			styleCompCont.setStyle('backgroundRepeat', 'no-repeat');
			styleCompCont.setStyle('backgroundPosition', 'bottom');
			styleCompCont.setStyle('backgroundColor', '#EBECF0');
			this.CompCont.innerHTML = '<b>' + this.CompDescr + '</b>';
			document.body.appendChild(this.CompCont);
			HandlersComputer = new simon.HandlersCompMod(this.CompCont);
			evComp= new simon.EventMod(this.CompCont);
			evComp.addEv('mouseover', HandlersComputer.mouseOver);
			evComp.addEv('mousedown', HandlersComputer.mouseDownEdit);
			simon.Containers.Computers[this.CompCont.id] = this.CompCont;
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.ComputersMod->init ' + e.message);
		}
		finally
		{
			this.CanvImgId = null;
			this.CanvImg = null;
			this.CanvContId = null;
			this.CanvCont = null;
			this.CumY = null;
			this.ComputerBak = null;
			this.styleComputerBak = null;
			this.ComputerBakHeight = null;
			this.isHidden = null;
			delete HandlersComputer;
			delete evComp;
		}
	}
};

/**
 * Class for handling the events in a DOM document.window object
 *
 * @param {Object} HTML Element Object
 *
 */
simon.EventMod = function(obj){
	this.obj = {};
	this.init(obj);
};

simon.EventMod.prototype = {
	/**
	 * @constructor
	 * @param {Object} HTML Element Object
	 */
	init : function(obj){
		try
		{
			if(obj){
				this.obj = obj;
			}

			else{
				throw simon.version.NAME + 'simon.EventMod->init: ' + simon.errors.ERR_OBJECT;
			}
		}

		catch(e)
		{
			if (simon.DEBUG) console.log(e) ;
		}
	},

	/**
	 * Give an observer for the given event(for example: the 'click' event)
	 *
	 * @param {event} type event
	 * @param {function} function name
	 */
	addEv : function(type, fn){
	try
	{
		if (this.obj.addEventListener){
			this.obj.addEventListener(type, fn, false );
		}


		else if (this.obj.attachEvent){
			this.obj.attachEvent('on' + type, fn);
		}

	}

	catch(e)
	{
		if (simon.DEBUG) console.log(simon.version.NAME + ' simon.EventMod->addEv ' + e.message) ;
	}
	},

	/**
	 * Remove a subcribed function from the given event
	 *
	 * @param {event} type event
	 * @param {function} function name
	 */
	removeEv : function(type, fn){
	try
	{
		if (this.obj.removeEventListener){
			this.obj.removeEventListener(type, fn, false);
		}
		else if (this.obj.detachEvent){
			this.obj.detachEvent('on' + type, fn);
		}
	}

	catch(e)
	{
		if (simon.DEBUG) console.log(simon.version.NAME + ' simon.EventMod->removeEv ' + e.message) ;
	}
	}
};

/**
 * Class defining all the Handlers for the Canvas
 *
 * @param {Object} obj
 * @param {Object} img
 */
simon.HandlersCanvMod = function(obj, img){
	this.obj = {};
	var HandlerMouseMove = {};
	this.movableImg = {};
	this.computer = {};
	this.CanvImgId = '';
	this.CanvImg = {};
	this.init(obj);
};

simon.HandlersCanvMod.prototype = {
	/**
	 * @constructor
	 * @param {Object} obj
	 * @param {Object} img
	 */
	init : function(obj){
		if(obj && obj.id)
			this.obj = obj;
	},

	/**
	 * Add grabbing hand on mouseover
	 * Add handler for mousemovement
	 * @param {Object} ev
	 */
	mouseDown : function(ev){
		try
		{
			this.obj = (ev.target || ev.srcElement);
			styleImgCanv = new simon.StyleRuleMod(this.obj);
			styleImgCanv.setStyle('cursor', 'url(grabbing.cur), hand');
			HandlerMouseMove = new simon.HandlersCanvMod(this.obj);
			this.ev = new simon.EventMod(this.obj);
			this.ev.addEv('mousemove', HandlerMouseMove.mouseMove);
			this.ImgContId = this.obj.id;
			this.Id = new String();
			this.Id  = this.ImgContId.substr(7,4);
			this.ImgContId = 'ImgCont' + this.Id;
			this.ImgCont = simon.Containers.CanvasContainer[this.ImgContId];
			this.ImgContPos = new simon.PositionMod(this.ImgCont);
			with(simon.Containers){
				for(var Computer in Computers){
					if(!(Computers[Computer].PosRelative) && Computers[Computer].CompOnCanvas){
						document.body.removeChild(Computers[Computer]);
						this.ImgCont.appendChild(Computers[Computer]);
						Computers[Computer].PosRelative = true;
						this.x = this.ImgContPos.getPosX();
						this.y = this.ImgContPos.getPosY();
						if(this.obj.attachEvent){
							this.x += 1;
							this.y += 1;
						}
						this.PosComputer = new simon.PositionMod(Computers[Computer]);
						this.PosComputer.movPosX(-this.x);
						this.PosComputer.movPosY(-this.y);
					}
				}
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersCanvMod->MouseDown ' + e.message) ;
		}
		finally
		{
			this.obj = null;
			this.ev = null;
			this.Id = null;
			this.ImgContId = null;
			this.ImgCont = null;
			this.ImgContPos = null;
			this.PosComputer = null;
			this.x = null;
			this.y = null;
		}
	},

	/**
	 * Move the image around
	 * @param {Object} event
	 */
	mouseMove: function(event){
		try
		{
			if(!this.movableImg){
				this.Id = new String();
				this.obj = (event.target || event.srcElement);
				this.CanvImgId = this.obj.id;
				this.Id  = this.CanvImgId.substr(7,4);
				this.CanvImgId = 'CanvImg' + this.Id;
				this.CanvImg = simon.Containers.CanvasImage[this.CanvImgId];
				this.movableImg = new simon.PositionMod(this.CanvImg);
				with(this.movableImg){
					posXBegin = 0;
					posXEnd = 0;
					posYBegin = 0;
					posYEnd = 0;
				}
			}
			else{
				with(this.movableImg){
					posXBegin = event.clientX;
					distX = (posXBegin - posXEnd);
					if(distX != 0){
						movPosX(distX);
						with(simon.Containers){
							for(var Computer in Computers){
								if(Computers[Computer].CompOnCanvas){
									this.moveComputer = new simon.PositionMod(Computers[Computer]);
									this.moveComputer.movPosX(distX);
									this.moveComputer = null;
								}
							}
						}				
					}
					posYBegin = event.clientY;
					distY = (posYBegin - posYEnd);
					if(distY != 0){
						movPosY(distY);
						with(simon.Containers){
							for(var Computer in Computers){
								if(Computers[Computer].CompOnCanvas){
									this.moveComputer = new simon.PositionMod(Computers[Computer]);
									this.moveComputer.movPosY(distY);
									this.moveComputer = null;
								}
							}
						}
					}
				}
			}
			this.movableImg.posXEnd = event.clientX;
			this.movableImg.posYEnd = event.clientY;
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersCanvMod->MouseMove ' + e.message) ;
	
		}
		finally
		{
			this.Id = null;
			this.obj = null;
			this.CanvImgId = null;
			this.CanvImg = null;
			this.moveComputer = null;
		}
	},

	/**
	 * Remove mousemovement event
	 * @param {Object} ev
	 */
	mouseUp: function(ev){
		try
		{
			this.obj = (ev.target || ev.srcElement);
			this.styleImgCanv = new simon.StyleRuleMod(this.obj);
			this.styleImgCanv.setStyle('cursor', 'url(grab.cur), hand');
			this.ev = new simon.EventMod(this.obj);
			this.ev.removeEv('mousemove', HandlerMouseMove.mouseMove);
			this.ImgContId = this.obj.id;
			this.Id = new String();
			this.Id  = this.ImgContId.substr(7,4);
			this.ImgContId = 'ImgCont' + this.Id;
			this.ImgCont = simon.Containers.CanvasContainer[this.ImgContId];
			this.posCanv = new simon.PositionMod(this.ImgCont);
			this.parCanvXR = parseInt(this.styleImgCanv.getStyle('width').slice(0,-2)) + this.posCanv.getPosX();
			this.parCanvYR = parseInt(this.styleImgCanv.getStyle('height').slice(0,-2)) + this.posCanv.getPosY();
			with(simon.Containers){
				for(var Computer in Computers){
					if((Computers[Computer].PosRelative)){
						this.ImgCont.removeChild(Computers[Computer]);
						document.body.appendChild(Computers[Computer]);
						Computers[Computer].PosRelative = false;
						this.x = this.posCanv.getPosX()+1;
						this.y = this.posCanv.getPosY()+1;
						this.posComputer = new simon.PositionMod(Computers[Computer]);
						this.posComputer.movPosX(this.x);
						this.posComputer.movPosY(this.y);
						this.styleComputer = new simon.StyleRuleMod(Computers[Computer]);
						this.parCompXR = parseInt(this.styleComputer.getStyle('width').slice(0,-2)) + this.posComputer.getPosX();
						this.parCompYR = parseInt(this.styleComputer.getStyle('height').slice(0,-2)) + this.posComputer.getPosY();
						if((this.parCompXR > this.parCanvXR) || (this.posComputer.getPosX() < this.posCanv.getPosX()) || (this.parCompYR > this.parCanvYR) || (this.posComputer.getPosY() < this.posCanv.getPosY())){
							(this.obj.attachEvent) ? this.styleComputer.setStyle('filter', 'alpha(opacity=0)') : this.styleComputer.setStyle('opacity', '0.0');
						}
						else{
							(this.obj.attachEvent) ? this.styleComputer.setStyle('filter', 'alpha(opacity=100)') : this.styleComputer.setStyle('opacity', '1.0');
						}
					}
				}
			
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersCanvMod->MouseUp ' + e.message) ;
		}
		finally
		{
			this.styleImgCanv = null;
			this.ev = null;
			this.Id = null;
			this.ImgContId = null;
			this.ImgCont = null;
			this.CanvImgId = null;
			this.CanvImg = null;
			this.posCanv = null;
			this.parCanvXR = null;
			this.parCanvYR = null;
			this.ImgContPos = null;
			this.movableImg = null;
			this.x = null;
			this.y = null;
			this.posComputer = null;
			this.styleComputer = null;
			this.parCompXR = null;
			this.parCompYR = null;
			HandlerMouseMove = {};
		}
	}
};

simon.HandlersCompMod = function(obj){
	this.obj = {};
	this.ImgCanv = {};
	this.CanvImg = {};
	var movable = {};
	var HandlerMouseMove = {};
	var CompCont = {};
	var CompOrgX = 0;
	var CompOrgY = 0;
	var StyleComp = {};
	var w = 0;
	var h = 0;
	this.startXY = {};
	this.startX = 0;
	this.startY = 0;
	this.DeltaX = 0;
	this.DeltaY = 0;
	this.CumY = 0;
	this.Computer = {};
	this.PosComputer = {};
};

simon.HandlersCompMod.prototype = {
	init: function(obj){
		try
		{
			if (obj && obj.id){
				this.obj = obj;
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersCompMod->init ' + e.message) ;
		}

	},
	
	mouseDblClick: function(ev){
		try
		{
			this.obj = (ev.target || ev.srcElement);
			this.Id = this.obj.id.substr(8,4);
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersCompMod->mouseDown ' + e.message) ;
		}
		finally
		{
			this.Id = null;
			movable = null;
		}
				
	},
	mouseDownDefault: function(ev){
		try
		{
			this.obj = (ev.target || ev.srcElement);
			this.Id = this.obj.id.substr(8,4);
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersCompMod->mouseDownDefault ' + e.message) ;
		}
		finally
		{
			this.Id = null;
			movable = null;
		}
				
	},
	mouseDownEdit: function(ev){
		try
		{
			this.obj = (ev.target || ev.srcElement);
			HandlerMouseMove = new simon.HandlersCompMod(this.obj);
			
			if(simon.EDIT){
				CompCont = simon.Containers.Computers[this.obj.id];
				for(var CanvasContainer in simon.Containers.CanvasContainer){
					CanvasCont = simon.Containers.CanvasContainer[CanvasContainer];
				}
				PosComp = new simon.PositionMod(CompCont);
				CompOrgX = parseInt(PosComp.getPosX());
				CompOrgY = parseInt(PosComp.getPosY());
				styleComp = new simon.StyleRuleMod(CompCont);
				styleComp.setStyle('cursor', 'url(grabbing.cur), hand');
				styleComp.setStyle('zIndex', '1000');
				styleComp.setStyle('backgroundColor', 'pink');
				w = styleComp.getStyle('width').slice(0, -2);
				h = styleComp.getStyle('height').slice(0, -2);
				w = parseInt(w)/2;
				h = parseInt(h)/2;
				(this.obj.attachEvent) ? styleComp.setStyle('filter', 'alpha(opacity=75)') : styleComp.setStyle('opacity', '0.75');
				eventObj = new simon.EventMod(window);
				eventObj.addEv('mousemove', HandlerMouseMove.mouseMove);
				eventObj.addEv('mouseup', HandlerMouseMove.mouseUp);
				eventObjComp = new simon.EventMod(CompCont);
				eventObjComp.addEv('dblclick', HandlerMouseMove.mouseDblClick);
			}
			else{
				HandlerMouseMove.mouseDownDefault(ev);
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersCompMod->mouseDownEdit ' + e.message) ;
		}
		finally
		{
			delete eventObj;
			delete eventObjComp;
			delete PosComp;
			this.startXY = null;
			movable = null;
		}
	},

	mouseMove: function(ev){
		try
		{
			if(movable == null)
			{
				movable = new simon.PositionMod(CompCont);
				with(this.movable){
					posXBegin =  0;
					posXEnd =  0;
					posYBegin = 0;
					posYEnd = 0;
				}
			}
		else{
			with(movable){
				posXBegin = (ev.clientX) + document.documentElement.scrollLeft || 0;
				posYBegin = (ev.clientY) + document.documentElement.scrollTop || 0;
				distX = parseInt(posXBegin - posXEnd);
				distY = parseInt(posYBegin - posYEnd);

				if(!isNaN(parseInt(distX, 10)))
					movPosX(distX);
				if(!isNaN(parseInt(distY, 10)))
					movPosY(distY);
				}
			}
			movable.posXEnd = (ev.clientX) + document.documentElement.scrollLeft || 0;
			movable.posYEnd = (ev.clientY) + document.documentElement.scrollTop || 0;
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersCompMod->mouseMove ' + e.message) ;
		}
	},
	/**
	 * Change cursor on mouseover
	 *
	 * @param {Object} ev
	 */
	mouseOver : function(ev){
		try
		{
			this.obj = (ev.target || ev.srcElement);
			styleHover = new simon.StyleRuleMod(this.obj);
			styleHover.setStyle('cursor', 'url(grab.cur), hand');
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersCompMod->mouseOver ' + e.message) ;
		}
		finally
		{
			delete styleHover;
		}
	},
	mouseUp: function(ev){
		try
		{
			this.CumY = 0;
			if(movable!= null){
				PosComp = new simon.PositionMod(CompCont);
				PosCont = new simon.PositionMod(CanvasCont);
				CompX = parseInt(PosComp.getPosX()+w);
				CompY = parseInt(PosComp.getPosY()+h);
				ContX = parseInt(PosCont.getPosX());
				ContY = parseInt(PosCont.getPosY());
				with(simon.Containers){
					checkAllCanvas = false;
					for(var CanvasId in Canvas)
					{
						CanvCont = Canvas[CanvasId];
						CanvWidth = parseInt(Canvas[CanvasId].style.width.slice(0,-2));
						CanvHeight = parseInt(Canvas[CanvasId].style.height.slice(0,-2));
						CanvLocationId = Canvas[CanvasId].id.substr(7,4);
						PosCanv = new simon.PositionMod(Canvas[CanvasId]);
						this.Id = new String();
						this.CanvImgId = CompCont.id;
						this.CanvImgId = 'CanvImg' + CanvLocationId;
						this.CanvImg = simon.Containers.CanvasImage[this.CanvImgId];
						CanvX = PosCanv.getPosX();
						CanvY = PosCanv.getPosY();
						delete PosCanv;
						if(CompX - w > CanvX && CompX + w < (CanvX+CanvWidth) && CompY - h > CanvY && CompY + h < CanvY+CanvHeight){
							CompCont.CompOnCanvas = true;
							CompCont.LocationId = CanvLocationId;
							CompCont.ZoomFactor = (this.CanvImg.TotZoomFactor / 100);
							this.styleCanvImg = new simon.StyleRuleMod(this.CanvImg);
							if(this.styleCanvImg.getStyle('top') == 'auto')
								this.DeltaX = parseInt(0);
							else
								this.DeltaX = parseInt(this.styleCanvImg.getStyle('left').slice(0,-2));
							if(this.styleCanvImg.getStyle('left') == 'auto')
								this.DeltaY = parseInt(0);
							else
								this.DeltaY = parseInt(this.styleCanvImg.getStyle('top').slice(0,-2));
							CompX = (CompX - this.DeltaX - ContX);
							CompY = (CompY - this.DeltaY - ContY);
							CompX = Math.round(CompX / CompCont.ZoomFactor);
							CompY = Math.round(CompY / CompCont.ZoomFactor);
							var parameters = 'id=' + CompCont.id.substr(8) + '&loc=' + CompCont.LocationId + '&cx=' + CompX + '&cy=' + CompY;
							//var c1 = new Ajax.Request('/werkplekken/setWorkstationPosition', { method: 'post', postBody: parameters, onComplete:handleRequest});
						}
						else{
							CompCont.CompOnCanvas = false;
							this.ComputerBak = document.getElementById('ObjectsContainer');
							this.styleComputerBak = new simon.StyleRuleMod(this.ComputerBak);
							this.ComputerBakHeight = 80;
							with(simon.Containers){
								counter = 0;
								for(var Computer in Computers){
									if(!Computers[Computer].CompOnCanvas){
										counter ++;
										this.Computer = Computers[Computer];
										this.PosComputer = new simon.PositionMod(this.Computer);
										if(counter % 2){
											this.PosX = 812;
											this.CumY += h * 2 + 5;
											this.ComputerBakHeight +=  (h * 2 + 5);
										}
										else
											this.PosX = 812 + w * 2 + 5;
										
										if (self.innerWidth){
											if(self.innerWidth <= 1024){
												this.PosY = 555 + this.CumY - (h * 2);
												this.styleComputerBak.setStyle('top', '500');
											}
											else
												this.PosY = 290 + this.CumY - (h * 2);
										}
										else if(document.body.clientWidth){
											if(document.body.clientWidth <= 1024){
												this.PosY = 555 + this.CumY - (h * 2);
												this.styleComputerBak.setStyle('top', '500');
											}
											else
												this.PosY = 290 + this.CumY - (h * 2);
										}
										this.PosComputer.setPosX(this.PosX);
										this.PosComputer.setPosY(this.PosY);	
										this.Computer = null;
										this.PosComputer = null;
									}
								}	
							}
							this.styleComputerBak.setStyle('height', this.ComputerBakHeight);
							var parameters = 'id=' + CompCont.id.substr(8) + '&loc=' + CompCont.LocationId + '&cx=' + 0 + '&cy=' + 0;
							//var c1 = new Ajax.Request('/werkplekken/setWorkstationPosition', { method: 'post', postBody: parameters, onComplete:handleRequest});
						}
					}
				/*
				with(simon.Containers){
					for(var Computer in Computers){
						if(!Computers[Computer].CompOnCanvas)
						{
							this.CumY += ((h * 2)+5);
							PosX = 865;
							PosY = 530 + this.CumY;
							PosComp.setPosX(PosX);
							PosComp.setPosY(PosY);
						}
					}
				}
				*/
				}
			}
			//(CompCont.attachEvent) ? styleComp.setStyle('cursor', 'url(/templates/images/grab.cur), hand') : styleComp.setStyle('cursor', '-moz-grab')
			styleComp.setStyle('backgroundColor', '#EBECF0');
			styleComp.setStyle('zIndex', '2');
				
			(CompCont.attachEvent) ? styleComp.setStyle('filter', 'alpha(opacity=100)') : styleComp.setStyle('opacity', '1.0');
			eventWindow = new simon.EventMod(window);
			eventWindow.removeEv('mousemove', HandlerMouseMove.mouseMove);
			eventWindow.removeEv('mouseup', HandlerMouseMove.mouseUp);
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersCompMod->mouseUp ' + e.message);

		}
		finally
		{
			this.CanvImg = null;
			this.CanvImgId = null;
			this.styleCanvImg = null;
			this.DeltaX = null;
			this.DeltaY = null;
			this.CumY = null;
			delete eventWindow;
			delete PosComp;
			delete PosCont;
			delete HandlerMouseMove;
			styleComp = null;
			CompCont = null;
			movable = null;
			CompX = null;
			CompY = null;
			ContX = null;
			ContY = null;
			w = 0;
			h = 0;
		}
	}
};

/**
 * Class containing all handlers for the Zoom legend
 * @param {Object} obj
 */
simon.HandlersZoomMod = function(obj){
	this.obj = {};
	this.init(obj);
	this.CanvImgId = '';
	this.ImgContId = '';
	this.ImgCanvId = '';
	this.CanvImg = {};
	this.ImgCont = {};
	this.ImgCanv = {};
};

simon.HandlersZoomMod.prototype = {
	/**
	 * @constructor
	 * @param {Object} obj
	 */
	init : function(obj){
		try
		{
			if (obj && obj.id){
				this.obj = obj;
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersZoomMod->init ' + e.message) ;

		}
	},
	/**
	 * Change cursor on mouseover
	 *
	 * @param {Object} ev
	 */
	mouseOver : function(ev){
		try
		{
			this.obj = (ev.target || ev.srcElement);
			styleHover = new simon.StyleRuleMod(this.obj.parentNode);
			styleHover.setStyle('cursor', 'pointer');
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersZoomMod->mouseDownMin ' + e.message) ;
		}
		finally
		{
			delete styleHover;
		}

	},
	/**
	 * Change cursor on mouse out
	 * @param {Object} ev
	 */
	mouseOut : function(ev){
		try
		{
			this.obj = (ev.target || ev.srcElement);
			styleOut = new simon.StyleRuleMod(this.obj.parentNode);
			styleOut.setStyle('cursor', 'auto');
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersZoomMod->mouseDownMin ' + e.message) ;
		}
		finally
		{
			delete styleOut;
		}

	},
	/**
	 * Zoom the image for the given percentage
	 *
	 * @param {Object} ev
	 */
	mouseDownMin : function(ev){
		try
		{
			this.obj = (ev.target || ev.srcElement);
			id = new String();
			id  = this.obj.parentNode.parentNode.id.substr(8,4);
			this.CanvImgId = 'CanvImg' + id;
			this.ImgContId = 'ImgCont' + id;
			this.ImgCanvId = 'ImgCanv' + id;
			this.CanvImg = simon.Containers.CanvasImage[this.CanvImgId];
			this.ImgCont = simon.Containers.CanvasContainer[this.ImgContId];
			this.ImgCanv = simon.Containers.Canvas[this.ImgCanvId];
			this.styleCanvImg = new simon.StyleRuleMod(this.CanvImg);
			this.styleImgCanv = new simon.StyleRuleMod(this.ImgCanv);
			this.PosCanvImg = new simon.PositionMod(this.CanvImg);
			this.posCanv = new simon.PositionMod(this.ImgCont);
			this.parCanvXR = parseInt(this.styleImgCanv.getStyle('width').slice(0,-2)) + this.posCanv.getPosX();
			this.parCanvYR = parseInt(this.styleImgCanv.getStyle('height').slice(0,-2)) + this.posCanv.getPosY();
			this.dx = this.PosCanvImg.getPosX();
			this.dy = this.PosCanvImg.getPosY();
			this.Zoomer = new simon.ZoomImgMod(this.CanvImg);
			this.Zoomer.zoomPerc(80, this.ImgCont, this.ImgCanv);
			this.CanvImg.TotZoomFactor = Math.round(this.CanvImg.TotZoomFactor * 0.8);
			with(simon.Containers){
				for(var Computer in Computers){
					if(Computers[Computer].CompOnCanvas){
						this.StyleComputer = new simon.StyleRuleMod(Computers[Computer]);
						this.WidthComputer = parseInt(this.StyleComputer.getStyle('width').slice(0,-2)); 
						this.HeightComputer = parseInt(this.StyleComputer.getStyle('height').slice(0,-2)); 
						this.PosComputer = new simon.PositionMod(Computers[Computer]);
						this.PosComputer.setPosX(Math.round((((this.PosComputer.getPosX() + (0.5 * this.WidthComputer)) - this.dx) * 0.8) + this.dx - (0.5 * this.WidthComputer)));
						this.PosComputer.setPosY(Math.round((((this.PosComputer.getPosY() + (0.5 * this.HeightComputer)) - this.dy) * 0.8) + this.dy - (0.5 * this.HeightComputer)));
						this.parCompXR = parseInt(this.StyleComputer.getStyle('width').slice(0,-2)) + this.PosComputer.getPosX();
						this.parCompYR = parseInt(this.StyleComputer.getStyle('height').slice(0,-2)) + this.PosComputer.getPosY();
						if((this.parCompXR > this.parCanvXR) || (this.PosComputer.getPosX() < this.posCanv.getPosX()) || (this.parCompYR > this.parCanvYR) || (this.PosComputer.getPosY() < this.posCanv.getPosY())){
							(Computers[Computer].attachEvent) ? this.StyleComputer.setStyle('filter', 'alpha(opacity=0)') : this.StyleComputer.setStyle('opacity', '0.0');
						}
						else{
							(Computers[Computer].attachEvent) ? this.StyleComputer.setStyle('filter', 'alpha(opacity=100)') : this.StyleComputer.setStyle('opacity', '1.0');
						}
					}
				}
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersZoomMod->mouseDownMin ' + e.message) ;
		}
		finally
		{
			this.CanvImgId = null;
			this.ImgContId = null;
			this.ImgCanvId = null;
			this.styleImgCanv = null;
			this.styleCanvImg = null;
			this.CanvImg = null;
			this.ImgCont = null;
			this.ImgCanv = null;
			this.PosCanvImg = null;
			this.Zoomer = null;
			this.posCanv = null;
			this.parCanvXR = null;
			this.parCanvYR = null;
			this.dx = null;
			this.dy = null;
			this.StyleComputer = null;
			this.WidthComputer = null;
			this.HeightComputer = null;
			this.PosComputer = null;
			this.parCompXR = null;
			this.parCompYR = null;
		}
	},
	/**
	 *
	 *
	 * @param {Object} ev
	 */
	mouseUpMin: function(ev){
		try
		{
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersZoomMod->mouseDownMin ' + e.message) ;
		}
		finally
		{
			delete styleMin;
		}
	},
	/**
	 * Zoom the image for the given percentage
	 *
	 * @param {Object} ev
	 */
	mouseDownPlus: function(ev){
		try
		{
		this.obj = (ev.target || ev.srcElement);
			id = new String();
			id  = this.obj.parentNode.parentNode.id.substr(8,2);
			this.CanvImgId = 'CanvImg' + id;
			this.ImgContId = 'ImgCont' + id;
			this.ImgCanvId = 'ImgCanv' + id;
			this.CanvImg = simon.Containers.CanvasImage[this.CanvImgId];
			this.ImgCont = simon.Containers.CanvasContainer[this.ImgContId];
			this.ImgCanv = simon.Containers.Canvas[this.ImgCanvId];
			this.styleCanvImg = new simon.StyleRuleMod(this.CanvImg);
			this.styleImgCanv = new simon.StyleRuleMod(this.ImgCanv);
			this.PosCanvImg = new simon.PositionMod(this.CanvImg);
			this.posCanv = new simon.PositionMod(this.ImgCont);
			this.parCanvXR = parseInt(this.styleImgCanv.getStyle('width').slice(0,-2)) + this.posCanv.getPosX();
			this.parCanvYR = parseInt(this.styleImgCanv.getStyle('height').slice(0,-2)) + this.posCanv.getPosY();
			this.dx = this.PosCanvImg.getPosX();
			this.dy = this.PosCanvImg.getPosY();
			this.Zoomer = new simon.ZoomImgMod(this.CanvImg);
			this.Zoomer.zoomPerc(125, this.ImgCont, this.ImgCanv);
			this.CanvImg.TotZoomFactor = Math.round(this.CanvImg.TotZoomFactor * 1.25);
			with(simon.Containers){
				for(var Computer in Computers){
					if(Computers[Computer].CompOnCanvas){
						this.StyleComputer = new simon.StyleRuleMod(Computers[Computer]);
						this.WidthComputer = parseInt(this.StyleComputer.getStyle('width').slice(0,-2)); 
						this.HeightComputer = parseInt(this.StyleComputer.getStyle('height').slice(0,-2)); 
						this.PosComputer = new simon.PositionMod(Computers[Computer]);
						this.PosComputer.setPosX(Math.round((((this.PosComputer.getPosX() + (0.5 * this.WidthComputer)) - this.dx) * 1.25) + this.dx - (0.5 * this.WidthComputer)));
						this.PosComputer.setPosY(Math.round((((this.PosComputer.getPosY() + (0.5 * this.HeightComputer)) - this.dy) * 1.25) + this.dy - (0.5 * this.HeightComputer)));
						this.parCompXR = parseInt(this.StyleComputer.getStyle('width').slice(0,-2)) + this.PosComputer.getPosX();
						this.parCompYR = parseInt(this.StyleComputer.getStyle('height').slice(0,-2)) + this.PosComputer.getPosY();
						if((this.parCompXR > this.parCanvXR) || (this.PosComputer.getPosX() < this.posCanv.getPosX()) || (this.parCompYR > this.parCanvYR) || (this.PosComputer.getPosY() < this.posCanv.getPosY())){
							(Computers[Computer].attachEvent) ? this.StyleComputer.setStyle('filter', 'alpha(opacity=0)') : this.StyleComputer.setStyle('opacity', '0.0');
						}
						else{
							(Computers[Computer].attachEvent) ? this.StyleComputer.setStyle('filter', 'alpha(opacity=100)') : this.StyleComputer.setStyle('opacity', '1.0');
						}
					}
				}
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersZoomMod->mouseDownPlus ' + e.message) ;
		}
		finally
		{
			this.CanvImgId = null;
			this.ImgContId = null;
			this.ImgCanvId = null;
			this.styleCanvImg = null;
			this.CanvImg = null;
			this.ImgCont = null;
			this.ImgCanv = null;
			this.PosCanvImg = null;
			this.Zoomer = null;
			this.posCanv = null;
			this.parCanvXR = null;
			this.parCanvYR = null;
			this.dx = null;
			this.dy = null;
			this.StyleComputer = null;
			this.WidthComputer = null;
			this.HeightComputer = null;
			this.PosComputer = null;
			this.parCompXR = null;
			this.parCompYR = null;
		}
	},
	/**
	 *
	 *
	 * @param {Object} ev
	 */
	mouseUpPlus: function(ev){
		try
		{
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.HandlersZoomMod->mouseDownPlus ' + e.message) ;
		}
		finally
		{
			delete styleMin;
		}
	}
};

/**
 * Class for getting/setting/moving x,y co�rdinates of an HTML Element Object
 *
 * @param {Object} HTML Element Object
 *
 */
simon.PositionMod = function(obj){

	this.obj = {};
	this.posXrel = 0;
	this.posYrel = 0;
	this.posXtot = 0;
	this.posYtot = 0;
	this.init(obj);
};

simon.PositionMod.prototype = {

	/**
	 * Parameter is type of HTML Element Object
	 * @param {Object} HTML Element Object
	 * @constructor
	 */

	init : function(obj){
		try
		{
			if (obj && obj.id){
				this.obj = obj;
				this.posXrel = obj.offsetLeft;
				this.posYrel = obj.offsetTop;
				this.posXrel += document.documentElement.scrollTop || 0;
				this.posYrel += + document.documentElement.scrollLeft || 0;
				this.posXtot = obj.offsetLeft;
				this.posYtot = obj.offsetTop;
				while (obj = obj.offsetParent){
					this.posXtot += obj.offsetLeft;
					this.posYtot += obj.offsetTop;
				}
				this.posXtot += document.documentElement.scrollTop || 0;
				this.posYtot += + document.documentElement.scrollLeft || 0;
			}

			else{
					throw simon.version.NAME + ' simon.PositionMod->init: ' + simon.errors.ERR_OBJECT;
			}

		}

		catch(e)
		{
			if (simon.DEBUG) console.log(e) ;
		}
	},

	/**
	 * Returns the x co�rdinate of the given Object.
	 * Set parameter true to get the position relative to the parent object
	 *
	 * @param {boolean} Set to 1 if relative position is needed
	 */

	getPosX : function(rel){
		if (rel){
			return this.posXrel;
		}
		else{
			return this.posXtot;
		}
	},

	/**
	 * Returns the y co�rdinate of the given Object.
	 * Set parameter true to get the position relative to the parent object
	 *
	 * @param {boolean} Set to 1 if relative position is needed
	 */
	getPosY : function(rel){
		if (rel){
			return this.posYrel;
		}
		else{
			return this.posYtot;
		}
	},

	/**
	 * Set position x
	 * @param {int} In pixels
	 */
	setPosX : function(x){
		try
		{
			if(parseInt(x)){
				this.posXrel = x - (this.posXtot - this.posXrel);
				this.posXtot = x;
				x = this.posXrel + 'px';
				this.obj.style.left = x;
			}
			else{
				throw simon.version.NAME + ' simon.PositionMod->setPosX: ' + simon.errors.ERR_PARAM + ' must be an integer';
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(e) ;
		}
		},
	/**
	 * Set postion y
	 * @param {Object} In pixels
	 */
	setPosY : function(y){
		try
		{
			if(parseInt(y)){
				this.posYrel = y - (this.posYtot - this.posYrel);
				this.posYtot = y;
				y = this.posYrel + 'px';
				this.obj.style.top = y;
			}
			else{
				throw simon.version.NAME + ' simon.PositionMod->setPosY: ' + simon.errors.ERR_PARAM + ' must be an integer';
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(e) ;
		}

	},

	/**
	 * Move object x distance
	 * @param {int} In pixels
	 */
	movPosX : function(x){
		try
		{
			if(parseInt(x)){
				movx = parseInt((this.posXtot + x), 10);
				(movx > 0 || movx < 0) ? this.setPosX(movx) : this.setPosX(1);
			}
		}
		catch(e)
		{
		 	if (simon.DEBUG) console.log(simon.version.NAME + ' simon.PositionMod->movPosX ' + e.message) ;
		}

	},

	/**
	 * Move object y distance
	 * @param {int} In pixels
	 */
	movPosY : function(y){
		try
		{
			if(parseInt(y)){
				movy = parseInt((this.posYtot + y), 10);
				(movy > 0 || movy < 0) ? this.setPosY(movy) : this.setPosY(1);
			}
		}
		catch(e)
		{
		 	 	if (simon.DEBUG) console.log(simon.version.NAME + ' simon.PositionMod->movPosY ' + e.message) ;
		}
	}
};

/**
 * Class for getting and setting the Style Ryle of an HTML Element
 *
 * @param {Object} HTML Element Object
 */
simon.StyleRuleMod = function(obj){
	this.obj = {};
	this.init(obj);
};

simon.StyleRuleMod.prototype = {
	/**
	 * @constructor
	 * @param {Object} HTML Element Object
	 */
	init : function(obj){
		try
		{
			if(obj && obj.id){
				this.obj = obj;
			}

			else{
				throw simon.version.NAME + ' simon.StyleRuleMod->init: ' + simon.errors.ERR_OBJECT;
			}
		}

		catch(e)
		{
			if (simon.DEBUG) console.log(e) ;
		}
	},

	/**
	 * Sets the Style Rule of an HTML Element Attribute
	 *
	 * @param {Object} Attribute of an HTML Element Object
	 * @param {Object} Value for the Attribute
	 */
	setStyle : function(stylerule, value){
		try
		{
			if(stylerule && value){
				this.obj.style[stylerule] = value;
			}
		}

		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.StyleRuleMod->setStyle ' + e.message) ;
		}

	},

	/**
	 * Get the Style Rule of an HTML Element Attribute
	 * @param {Object} styleRule
	 */
	getStyle : function(styleProp){
		try
		{
			if (this.obj.currentStyle){
				var y = this.obj.currentStyle[styleProp];
			}
			else if (window.getComputedStyle){
				var y = document.defaultView.getComputedStyle(this.obj,null).getPropertyValue(styleProp);
			}
		return y;
		}

		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.StyleRuleMod->getStyle ' + e.message) ;
		}

	}

};

/**
 * Class for zooming and panning of a given image
 *
 * @param {Object} HTML Element Object of type img
 */
simon.ZoomImgMod = function(imgObj){
	this.imgObj = {};
	this.OrgWidth = '';
	this.OrgHeight = '';
	this.init(imgObj);
};

simon.ZoomImgMod.prototype = {
	/**
	 * @constructor
	 * @param {Object} HTML Element Object of type img
	 */
	init : function(imgObj){
		try
		{
			if(imgObj && imgObj.width && imgObj.height){
				this.imgObj = imgObj;
				this.OrgWidth = imgObj.width;
				this.OrgHeight = imgObj.height;
			}

			else{
				throw simon.version.NAME + ' simon.ZoomMod->init: ' + simon.errors.ERR_OBJECT + ' of type IMG';
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(e) ;
		}
	},



	/**
	 * The zoomfactor for the image enlargement.
	 * NOTE: Give percentage as int
	 *
	 * @param {perc}
	 */
	zoomPerc: function(perc, ImgCont, ImgCanv){
		try
		{
			if(parseInt(perc)){
				aspectRatio = parseFloat(this.imgObj.width/this.imgObj.height);
				
				var orgWidth = this.imgObj.width;
				var orgHeight = this.imgObj.height;
				var orgLeft = this.imgObj.offsetLeft;
				var orgTop = this.imgObj.offsetTop;
				
				this.imgObj.width = Math.round(this.imgObj.width *(perc/100));
				this.imgObj.height = this.imgObj.width / aspectRatio;
			
				this.imgObj.style.left = orgLeft + ((orgWidth - Number(this.imgObj.width))/2) + "px";
				this.imgObj.style.top = orgTop + ((orgHeight - Number(this.imgObj.height))/2) + "px";
			}
		}
		catch(e)
		{
			if (simon.DEBUG)  console.log(simon.version.NAME + ' simon.ZoomMod->ZoomPerc ' + e.message) ;
		}
		finally
		{
		}
	},


	/**
	 * Resize the image to the given width and height
	 *
	 * @param {width} Width of the desirec rectangle
	 * @param {height} Height of the desired rectangle
	 */
	zoomFit : function(x, y){
		try
		{
			if(parseInt(x) && parseInt(y)){
				RatioWidth = 0;
				RatioHeight = 0;
				RatioWidth = this.imgObj.width/x;
				RatioHeight = this.imgObj.height/y;
				this.Id = new String();
				this.CanvImgId = this.imgObj.id;
				this.Id = this.CanvImgId.substr(7,4);
				this.CanvImgId = 'CanvImg' + this.Id;
				this.CanvImg = simon.Containers.CanvasImage[this.CanvImgId];
				if (RatioWidth <= RatioHeight){
					if(this.imgObj.attachEvent){
						this.imgObj.width = Math.round(this.imgObj.width/RatioHeight);
					}
					this.imgObj.height = y;
					this.CanvImg.TotZoomFactor= Math.round(RatioWidth * 100); 
				}
				else
				{
					this.imgObj.width = x;
					if(this.imgObj.attachEvent){
						this.imgObj.height = Math.round(this.imgObj.height/RatioWidth);
					}
					this.CanvImg.TotZoomFactor = Math.round(RatioHeight * 100);
				}
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(simon.version.NAME + ' simon.ZoomMod->ZoomFit ' + e.message) ;
		}
		finally
		{
			this.Id = null;
			this.CanvImgId = null;
			this.CanvImg = null;
		}

	},

	/**
	 * Resize the image to the initial orginal size
	 *
	 */
	reset : function(){
		try
		{
			if(this.OrgWidth && this.OrgHeight){
				this.obj.width = this.OrgWidth;
				this.obj.height = this.OrgWidth;
			}
			else{
				throw simon.version.NAME + ' simon.ZoomMod->reset: ' + simon.errors.ERR_LOCAL;
			}
		}
		catch(e)
		{
			if (simon.DEBUG) console.log(e) ;
		}
	}
};


function handleRequest(req)
{
	var id = 'CompCont'+req.responseText;
	var CompCont = simon.Containers.Computers[id];

	styleComp = new simon.StyleRuleMod(CompCont);

	styleComp.setStyle('backgroundColor', '#EBECF0');
}
