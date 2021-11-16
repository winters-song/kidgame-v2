
function inherit(subType,superType){
	function F(){};
	F.prototype = superType.prototype;
    var p= new F();
    p.constructor = subType;
    subType.prototype = p;
}

function SgfProperty(name , values){
	this.name = name;
	this.values = values || [];
}
SgfProperty.B = "B"
SgfProperty.W = "W"
SgfProperty.AB = "AB"
SgfProperty.AW = "AW"
SgfProperty.C = "C"
SgfProperty.LB = "LB"
SgfProperty.T = "T"

SgfProperty.prototype.toString = function() {
	var sb = this.name
	for (var i=0;i<this.values.length;i++) {
		sb+='['+this.values[i]+']';
	}
	return sb;
}

function SgfNode(){
	this.parent = null;
	this.children = null;
	this.properties = null;
}

SgfNode.prototype.isFirstNode = function(){
	return null === this.parent;
}
SgfNode.prototype.isLastNode = function() {
	return null === this.children || 0 === this.children.length;
}
SgfNode.prototype.toSgf = function() {
	if(null === this.properties || this.properties.length<=0) {
		return null;
	}
	var SgfTree = ";"
	for(var i = 0 ;i <this.properties.length;i++) {
		SgfTree += this.properties[i].toString();
	}
	return SgfTree;
}
SgfNode.prototype.getComment = function() {
	var c = this.getProperty(SgfProperty.C)
	if(c){
		return c[0]
	}
}
SgfNode.prototype.getProperty = function(name) {
	if(!this.properties) return null;
	var p = null;
	for(var i =0 ;i < this.properties.length;i++) {
		if(this.properties[i].name === name) {
			if (null === p){
				p = this.properties[i].values
			}else {
				p = p.concat(this.properties[i].values)
			}
		}
	}
	return p;
}
//by songyang
SgfNode.prototype.getChildNode = function(col,row){

	if(this.isLastNode()) {
		return false
	}
	for(var i = 0 ; i < this.children.length;i++) {
		if(this.children[i].col === col && this.children[i].row === row) {
			return this.children[i];
		}
	}
	return false
}

SgfNode.create = function(properties){
	if(!properties || properties.length===0) {
		return null;
	}

	var isMoveNode = false;
	var currentProperty = null;
	var name;
	var node = null;

	for(var i in properties){
		name = properties[i].name.toUpperCase();

		if(SgfProperty.B === name|| SgfProperty.W===name) {
			isMoveNode = true;
			currentProperty = properties[i]
			break;
		}
	}
	
	if(isMoveNode){
		var v ;
		if( !currentProperty.values  || currentProperty.values.length === 0){
			v = Vertex.pass();
		}else{
			v = SgfTree.toVertex(currentProperty.values[0]);
		}
		node = new SgfMoveNode(v.col, v.row, SgfTree.toInt(name ));
	}else {
		node = new SgfNode();
	}
	node.properties = properties;
	
	return node;
}

function SgfMoveNode(col , row , color) {
	SgfNode.call(this);
	this.col = col;
	this.row = row;
	this.color = color;
}
inherit(SgfMoveNode,SgfNode);


function SgfTree(sgf) {
	this.root= null;
	this.current = null;
	if(sgf) {
		this.loadSgf(sgf)
	}
}

let AutoPlayStatus = {
	OK:0,
	NO_MATCH:1,
	OVER :2
}

SgfTree.prototype.autoPlay = function(col,row,color){
	if(!this.hasChildNode(col,row)) {
		return {status:AutoPlayStatus.NO_MATCH};
	}
	var result = {status:AutoPlayStatus.OK}
	var playNode = this.forward(col,row)
	result.playNode = playNode;
	if(playNode.isLastNode()) {
		result.status = AutoPlayStatus.OVER;
		return result;
	}
	// 如果存在多个分支，随机选择一个
	result.selectable= playNode.children;
	this.current = playNode.children[Math.floor(Math.random()*playNode.children.length)]
	result.next = this.current;
	if(this.current.isLastNode()) {
		result.status = AutoPlayStatus.OVER;
	}
	return result;
}

SgfTree.prototype.hasChildNode = function(col,row,node){
	node = node || this.current;
	if(node.isLastNode()) {
		return false
	}
	for(var i = 0 ; i < node.children.length;i++) {
		if(node.children[i].col === col &&node.children[i].row === row) {
			return true;
		}
	}
	return false
}


/**
if col or row is undefined and then select main trunk
*/
SgfTree.prototype.forward = function(col,row){
	if(this.current.isLastNode()) {
		return null;
	}
	if('undefined' === typeof col || 'undefined' === typeof row) {
		this.current = this.current.children[0]
	}
	for(var i = 0 ; i < this.current.children.length;i++) {
		if(this.current.children[i].col === col &&this.current.children[i].row === row) {
			this.current = this.current.children[i]
			break;
		}
	}
	return this.current;
}

SgfTree.prototype.back = function() {
	if(this.current.isFirstNode()) {
		return null;
	}
	this.current = this.current.parent;
	return this.current;
}

SgfTree.prototype.walkTrunk = function(cb,node){
	node = node || this.root
	if(!node) return cb()
	while(node) {
		cb(node)
		node = node.children&&node.children[0]
	}
}
SgfTree.prototype.walk = function(cb,node,index){
	node = node || this.root
	index = index || 0;
	cb(node,index);
	if(node.isLastNode()) return;
	for(var i = 0 ;i < node.children.length;i++) {
		this.walk(cb,node.children[i],i)
	}
}

SgfTree.prototype.getStep = function(){
	var step = 0;
  this.walkTrunk(function(node){
    //落子 或 答案
    if(node instanceof SgfMoveNode){
			step++;
    }
  });
  return step;
}


SgfTree.prototype.loadSgf = function(sgf){
	this.parseIndex = 0;
	this.root = this.parse(sgf ,SgfStatus.begin)
	// this.parseIndex = 0;
	this.current = this.root
}
var SgfStatus = {
	begin:1,
	branchStart :2,
	newProperty : 3,
	branchEnd : 4,
}
SgfTree.prototype.parse= function(sgf , s){
	s =  s ||SgfStatus.begin;
	var root = null;
	var current = null;
	var next = null;
	var buffer ="";
	var c;
	while (this.parseIndex < sgf.length) {
		c = sgf.charAt(this.parseIndex);
		this.parseIndex++;
		switch (s) {
		case SgfStatus.begin:
			if ('(' === c) {
				s = SgfStatus.branchStart;
			}
			break;
		case SgfStatus.branchStart:
			if (';' === c) {
				s = SgfStatus.newProperty;
			}
			if (null !== current) {
				if (null === current.children) {
					current.children = [];
				}
				var r = this.parse(sgf, s);

				if (r === null){
					break;
				}
				current.children.push(r);
				r.parent = current;
			}
			break;
		case SgfStatus.newProperty:
			if (';' === c || '(' === c || ')' === c) {
				var ps = SgfTree.parseProperty(buffer.replace(/^\s+|\s+$/g, ''));
				buffer = "";
				next = SgfNode.create(ps);
				if (null !== next) {
					if(null === root) {
						root = next;
					}
					if (null !== current) {
						next.parent = current;
						if (null === current.children) {
							current.children = [];
						}
						current.children.push(next);
					}
					current = next;
				}
				if (';' === c) {
					s = SgfStatus.newProperty;
					break;
				}
				if ('(' === c) {
					s = SgfStatus.branchStart;
					break;
				}
				if (')' === c) {
					return root;
				}
				break;
			}
			buffer += c;
			break;
		case SgfStatus.branchEnd:
			console.log("w status:"+s)
			return root;
		default:
			break;
		}
	}
	return root;
}
SgfTree.COLOR_BLACK = 1;
SgfTree.COLOR_WHITE = 2;
SgfTree.COLOR_EMPTY = 0;
SgfTree.parseProperty = function(str) {
	var result = [];
	str.replace( /(\w+)((\[[^\]]*\]\s*)+)/gim, function($0,$1,$2){
		var ps = [];
		$2.replace(/\s*\[([^\]]*)\]\s*/gm , function($$0,$$1) {
			ps.push($$1);
		});
		result.push(new SgfProperty($1, ps));
	});
	return result;
}
SgfTree.toInt = function(color) {
	if("B" === color) {
		return SgfTree.COLOR_BLACK;
	}
	if("W" === color) {
		return SgfTree.COLOR_WHITE;
	}
	return SgfTree.COLOR_EMPTY;
}
SgfTree.fromInt = function(c) {
	if(1 === c) {
		return "B";
	}
	if(2 === c) {
		return "W";
	}
}

SgfTree.addTrace = function(sgf ,trace) {
	var t = new SgfTree(sgf)
	var traceSgf = "("+t.root.toSgf();
	var step ;
	for(var i = 0 ;i < trace.length;i++) {
		step = trace[i].split(',');
		if(step[2]*1!==SgfTree.COLOR_BLACK &&step[2]*1!==SgfTree.COLOR_WHITE){
			continue;
		}
		traceSgf+= ';'+SgfTree.fromInt(step[2])+'['+SgfTree.toGnuCo(step[0],step[1])+']';
	}
	return traceSgf +")"
}
/**
 * ab -> 0,1
 * @param strVertex
 * @return
 */
SgfTree.toVertex = function(strVertex) {
	if(null === strVertex || strVertex.length ===0){
		return Vertex.pass();
	}
	var str = strVertex.toLowerCase();
	if(2 !== str.length) {
		return null;
	}
	return new Vertex(str.charCodeAt(0)-'a'.charCodeAt(0), str.charCodeAt(1)-'a'.charCodeAt(0));
}
SgfTree.toGnuCo = function(col , row) {
	if(-1 >= col || -1 >= row) {
		return "";
	}
	return String.fromCharCode('a'.charCodeAt(0)+col*1)+String.fromCharCode('a'.charCodeAt(0)+row*1);
}


/**
	交叉点
*/
function Vertex(col , row) {
	this.col = col;
	this.row = row;
}
Vertex.pass = function() {
	return new Vertex(-1,-1);
}
Vertex.prototype.equals = function(v){
	return this.col === v.col && this.row === v.row;
}
// Vertex.prototype.hashCode = function(v){
// 	return col+row*19;
// }

window.SgfTree = SgfTree

exports.SgfTree = SgfTree
exports.SgfNode = SgfNode
exports.SgfMoveNode = SgfMoveNode
exports.AutoPlayStatus = AutoPlayStatus