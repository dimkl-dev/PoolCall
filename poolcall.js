//`
//`var wait = {
//`	ms: 100,
//`	pass: 5,
//`	state: "done" /*done/wait*/,
//`	start(...arg)/*callin this.startf*/{
//`		this.curPass  = this.pass;
//`		try{this.startf(...arg)} catch(e){};
//`
//`		if (this.state == "done"){
//`			this.state = "wait";
//`			this.wait(this.wait.bind(this), this);
//`		}
//`	},
//`	wait(func, _this)/*calling this.cb*/{
//`		if (_this.curPass-- > 0) {
//`			console.log(_this.curPass > 0);
//`			setTimeout(func, _this.ms, func, _this)
//`		} else {
//`			_this.state = "done";
//`			console.log("OOps");
//`			try {_this.cb()} catch(e){};
//`		};
//`	}
//`
//`}

//wait.cb = ()=>{console.log("hari")};
//wait.cb = ()=>{console.log("Yeees")};
//wait.startf=(val)=>{console.log(val)};
//st = wait.start.bind(wait);
//st("Start one");
//setTimeout(st, 300, "start two");

/**
 * Входные опции для конструктора
 * @typedef {Object} PoolCall~opt
 * @property {Number} [ms=100] - милесекунды между проходами
 * @property {Number} [pass=5] - число проходов
 * @property {Function} [startf] - фунция которая будет вызвана при вызове функции PoolCall#start
 *
 */




/**
/*
 * @constructor
 * @class
 * @param {endCallback} cb - функция которая будет вызвана в конце
 * @param {PoolCall~opt} opt  - дополнительные опции определяющие поведение экземпляра
 * @property {string} [state="done"|"wait"] - состояние экземпляра:
 * "wait" - проходы ещё не  завершились
 * "done" - все проходы завершены
 * @description - вызывает функуию обратного вызова(cb) по имтечение времени после вызова метода PoolCall#start. Вызов PoolCall#start возвращает счётчик в исходное состояние
 */
function PoolCall(cb, opt={}, pdeb = false){
var ms;
var pass;
var _state;
var _this = this;
	let _init = ()=>{
		 ms = opt.ms || 100;
		 pass = opt.pass || 5 ;
		 _state = "done";

	};
	_init();

this._cb = cb;
this.state = () => {return _state};
function debf(pmsg){if (pdeb){console.debug(pmsg)}};
var currpass;

var _start = function(...args) {
	debf('PoolCall: Start');
	currpass = pass;
	try {opt.startf(...args)} catch(e){};
	if (_state == "done"){
		_state = "wait";
		debf('PoolCall: ready to call of _wait');
		_wait();
	}


};

this.start = _start;
var _wait = () =>{
	debf('PoolCall: called _wait');
	if (pass-- > 0) {
		//console.log(pass > 0);
		debf('PoolCall: will call _wait');
		setTimeout(_wait, ms)
	} else {
		debf('PoolCall: end of  wait');
		this.state = "done";
		//console.log("OOps");
		_init();
		try {debf('PoolCall: calling cb');cb()} catch(e){debf('PoolCall: cb not call '); console.debug(cb);};
	};
};


////////////////////
}

/**
 * функция обратного вызова для PoolCall
 * @callback endCallback
 *
 */
module.exports.PoolCall = PoolCall;
//
//var opt =	{startf(val){console.log(val)}};
//
//let ind = 5;
//function cb () {
//	console.log("Haribol", ind);
//	ind = ind - 1;
//	if (ind > 0) {
//		//debugger;
//		wait.start()}
//}
//let wait = new PoolCall(cb/*,	opt*/ ,{} ,true);
//wait.start();
//st = wait.start.bind(wait);
//st("Start one");
//setTimeout(st, 300, "start two");
