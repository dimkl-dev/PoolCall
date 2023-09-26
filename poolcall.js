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
function PoolCall(cb, opt={}){
var ms = opt.ms || 100;
var pass = opt.pass || 5 ;
var _this = this;
var _state = "done";
this.state = () => {return _state};

var currpass;

var _start = function(...args) {
	
	currpass = pass;
	try {opt.startf(...args)} catch(e){};
	if (_state == "done"){
		_state = "wait";
		_wait();
	}


};
this.start = _start;
var _wait = () =>{
	if (pass-- > 0) {
		console.log(pass > 0);
		setTimeout(_wait, ms)
	} else {
		this.state = "done";
		console.log("OOps");
		try {cb()} catch(e){};
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
//function cb () {
//	console.log("Haribol")
//}
//let wait = new PoolCall(cb,	opt );
////wait.start();
//st = wait.start.bind(wait);
//st("Start one");
//setTimeout(st, 300, "start two");
