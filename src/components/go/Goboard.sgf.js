import Goboard from "./Goboard";
// import {Go} from "./Go";
import Board from "../newGo/Board";

import {SgfMoveNode, SgfNode, SgfTree} from "./SgfTree"
import EventEmitter from "events";
import Audio from  './Audio'
import Genmove from "../newGo/Genmove";

const Go = Board

export default class GoboardPlayer extends EventEmitter{

	constructor(cfg) {
		super()

		Object.assign(this, cfg, {

			currentStep: 0,

			master: {},

			history: [],

			history_branch: [],
		});

		// 默认19路棋盘
		if (!this.boardSize) {
			this.boardSize = 19;
		}

		const map = new Map()
		const list = [
			'stone1',
			'stone2',
			'stone3',
			'stone4',
			'stone5',
			'eat1',
			'eat2'
		]
		list.forEach(item => {
			map.set(item, require(`./assets/sound/${item}.mp3`))
		})

		// Audio.init()
		// Audio.loadEffects(map)
	}

	// fullSgf: 带有答案的sgf, 用于正确裁剪棋盘（避免答案部分被裁剪掉）
	// sgfTree, whoFirst, boardSize, fullSgf
	init (cfg) {
		if(!cfg.sgfTree){
			console.warn('缺少sgfTree')
			return
		}

		Object.assign(this, {
			currentStep: 0,
			root: cfg.sgfTree.root,
			currentNode: cfg.sgfTree.root
		},cfg)

		this.fullSgfTree = cfg.fullSgf ? new SgfTree(cfg.fullSgf) : null

		this.el.innerHTML = '';

		this.createBoard();

		//渲染Added Stone
		this.addStones();

		this.setWhoFirst();
		this.initEvents();
	}

	setWhoFirst () {
		this.cb.setClientColor(this.whoFirst);
		this.cb.setCurrentColor(this.whoFirst);
		this.cb.whoFirst = this.whoFirst;
		//设置go的先手
		// this.go.startColor = this.whoFirst;
	}

	initEvents () {
		this.cb.onPlay((color, col, row) => {

			//有棋子的地方不能落子，否则步数出问题
			if (!this.go.canPlay(col, row, color)) {
				return;
			}

			//创建节点
			const node = new SgfMoveNode(col, row, color);
			node.parent = this.currentNode;
			/**
			 *  不在分支上，用户落子，进入分支
			 */
			this.currentNode.children = [node];

			this.currentNode = node;

			this.currentStep += 1;

			this.move(node)

			this.onMove();
		});
	}

	move (node, silent) {
		const eated = this.go.play(node.col, node.row, node.color);

		this.go.print_board()

		this.cb.clientColor = this.cb.oppositeColor(this.cb.clientColor);
		this.cb.currentColor = this.cb.clientColor
		//有silent时 不执行showHead
		this.cb.add(node.color, node.col, node.row, silent);

		if (!silent) {
			var rand = Math.round(1E4 * Math.random()) % 5;
			Audio.play(`stone${rand + 1}`)
		}

		if (eated && eated.length) {
			this.cb.eat(eated);

			if(eated.length<=2){
				Audio.play('eat1')
			}else{
				Audio.play('eat2')
			}
		}
	}

	createBoard () {
		if(this.cb){
			this.cb.destroy()
		}

		const cfg = {
			el: this.el,
			boardSize: this.boardSize,
			// 开启调整尺寸，手机端做题坐标会偏移
			// resizable: false,

			readonly: false,
			clientColor: 1,
			whoFirst: 1,
			showOrder: true,
			showCoordinates: false,
		}
		Object.assign(cfg, this.boardOptions)

		this.cb = new Goboard(cfg);
		this.cb.clearBoard();

		this.go = new Go(this.boardSize);
		window.go = this.go
	}

	toStart () {
		this.fastBackward(this.currentStep);
		this.cb.setCurrentColor();
		this.currentStep = 0;
	}

	toEnd () {
		let node = this.currentNode;
		let step = 0;
		while (node.children) {
			node = node.children[0];
			step++;
		}

		this.fastForward(step);

		this.cb.showHead();
		this.onMove();
	}

	onMove () {
		this.emit('move', {
			currentStep: this.currentStep,
			currentNode: this.currentNode,
			totalStep: this.totalStep
		});
	}

	/**
	 *  获得上一步树节点（父节点）
	 */
	getPrevNode () {
		let node = this.currentNode;
		while (node) {
			node = node.parent;
			if (!node || node instanceof SgfMoveNode) {
				break;
			}
		}
		return node;
	}

	/**
	 *  获得下一步树节点（子节点）
	 */
	getNextNode () {
		let node = this.currentNode;
		while (node) {
			node = node.children && node.children[0]
			if (!node || node instanceof SgfMoveNode) {
				break;
			}
		}
		return node;
	}

	/**
	 *  下一步
	 */
	forward (silent) {
		// tree operation
		let node = this.getNextNode()
		if (!node) {
			return;
		}

		this.currentStep += 1;
		this.currentNode = node;

		this.move(node, silent);

		//更新ai点评
		if (!silent) {
			this.onMove();
		}

		return true;
	}

	backward (silent) {
		if (this.currentStep <= 0) {
			return false;
		}

		this.currentStep -= 1;

		const node = this.currentNode;
		const moveResult = this.go.undo(1);
		this.cb.trace.pop();

		const key = node.col + "," + node.row;
		this.cb.removePiece(key);

		if (moveResult && moveResult.eated && moveResult.eated.size) {
			moveResult.eated.forEach(move => {
				this.cb.recoverPiece(move.col, move.row, move.color);
			});
		}

		if (this.cb.options.showOrder === 'last') {
			this.cb.showLastOrder();
		}


		this.cb.clientColor = node.color;
		this.cb.currentColor = node.color;

		this.currentNode = this.getPrevNode() || this.root;

		if (!silent) {

			if (this.currentNode instanceof SgfMoveNode) {
				this.cb.showHead();
			} else {
				this.cb.hideHead();
			}

			this.cb.updateDummyColor();
			this.onMove();
		}

		return true;
	}

	fastForward (step) {
		let counter = 0;

		for (let i = 0; i < step; i += 1) {
			if (this.forward(true)) {
				counter += 1;
			} else {
				break;
			}
		}
		return counter;
	}

	fastBackward (step) {
		let counter = 0;

		for (let i = 0; i < step; i += 1) {
			if (this.backward()) {
				counter += 1;
			} else {
				break;
			}
		}
		return counter;
	}

	addStones () {
		var stones = this.getTreeStones(this.sgfTree);

		stones.forEach( i => {
			// 暂不判断 pass
			var key = i.col + "," + i.row;

			if (!i.mark && !i.move) {
				this.cb.addPiece(key, i.col, i.row, i.color, -1);
				this.go.add(i.col, i.row, i.color);
			}
		});
		this.go.print_board()

		//后渲染字母，保证不被棋子盖住
		stones.forEach( i => {
			if (i.mark) {
				this.cb.drawMarker(i.mark, i.col, i.row);
			}
		});

		if(this.fullSgfTree){
			stones = this.getTreeStones(this.fullSgfTree);
		}

	}

	loadAnswer (cfg) {
		//本地保存解析结果
		if (cfg._traceAnswer) {
			cfg._traceAnswer.forEach(move => {
				var val = move.split(',');
				this.cb.onPlayCb.call(this.cb, val[2] * 1, val[0] * 1, val[1] * 1);
			});

			return !!cfg._traceAnswer.length;

		} else if (cfg.UserQuizAnswerSgf) {
			const sgf = cfg.UserQuizAnswerSgf;
			const tree = new SgfTree(sgf)
			const stones = this.getTreeStones(tree);

			stones.forEach(move => {
				this.cb.onPlayCb.call(this.cb, move.color, move.col, move.row);
			});

			return !!stones.length;
		}

		return false;
	}

	getTreeStones (tree) {
		this.stones = [];

		tree.walkTrunk(node => {
			//落子 或 答案
			if (node instanceof SgfMoveNode) {
				this.addMoveStone(this.stones, node.col, node.row, node.color);
			}
			//添加多子 或 标记
			else if (node instanceof SgfNode) {
				//循环节点属性
				node.properties.forEach (prop => {

					switch (prop.name) {
						case "AB":
							this.addAddedStones(prop.values, 1);
							break;
						case "AW":
							this.addAddedStones(prop.values, 2);
							break;
						case "LB":
							this.addMarks(prop.values);
							break;
						case "CR": //circle 圆圈
							this.addSpecialMarks(prop.values, "〇");
							break;
						case "TR": //trangle 三角
							this.addSpecialMarks(prop.values, "▲");
							break;
						case "SQ": //square 方块
							this.addSpecialMarks(prop.values, "▣");
							break;
						case "MA": // 叉子
							this.addSpecialMarks(prop.values, "✕");
							break;
						default:
					}

				});
			}
		});

		return this.stones;
	}

	addMoveStone(col, row, color) {
		this.stones.push({
			col: col,
			row: row,
			color: color,
			move: true
		});
	}

	addAddedStones(values, color) {
		values.forEach(pos => {
			const json = this.getCoordinate(pos);
			json.color = color;
			this.stones.push(json);
		});
	}

	getCoordinate(pos) {
		return {
			col: pos[0].charCodeAt(0) - 97,
			row: pos[1].charCodeAt(0) - 97
		};
	}

		//{col: x, row: y, mark: 'A'}
	addMarks(values) {
		values.forEach(mark => {
			const arr = mark.split(':');
			const json = this.getCoordinate(arr[0]);

			json.mark = arr[1];

			if (arr[1] === "~{!o~}") {
				json.mark = "☆";
			}
			this.stones.push(json);
		});
	}

	addSpecialMarks(values, type) {
		values.forEach(pos => {
			const json = this.getCoordinate(pos);
			json.mark = type;
			this.stones.push(json);
		});
	}

	genmove() {
		const generator = new Genmove(this.go)
		generator.genmove(1)
		window.gen = generator
	}

}
