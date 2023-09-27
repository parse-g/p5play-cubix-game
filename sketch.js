let Grid;
let chessFigure;
let w_pawn, w_king, w_bishoop, w_queen, w_rook, w_knight;
let b_pawn, b_king, b_bishoop, b_queen, b_rook, b_knight;
const isOverlap = (a, b) => {
	return a.x >= b.x && a.x <= b.x && a.y >= b.y && a.y <= b.y;
};
function setup() {
	new Canvas(900, 600);
	// Cube size and offset
	const cubeSize = 45;
	const colors = { black: "#c0733d", white: "#e1bc88" };
	const names = { row: "abcdefgh", column: "12345678" };
	const placementOffset = { x: 150, y: 250 };

	// Chess figures group
	chessFigure = new Group();
	// Size as cube
	chessFigure.w = cubeSize;
	chessFigure.h = cubeSize;
	// No move
	chessFigure.collider = "none";
	chessFigure.rotationLock = true;
	// Layer
	chessFigure.layer = 2;

	// Black and Whites groups
	blackFigures = new chessFigure.Group();
	blackFigures.y = placementOffset.y * 0.75;
	whiteFigures = new chessFigure.Group();

	// White Figures
	w_king = new whiteFigures.Sprite();
	w_king.img = "src/w_king.png";

	let calcDistance = (blX = 1, blY = 1) => {
		// make placement by x and y in chess board
		let x = placementOffset.x + cubeSize * 2.25 + blX * cubeSize;
		let y = placementOffset.y + cubeSize * 5.75 - blY * cubeSize;
		return { x, y };
	};

	// Placement
	w_king.x = calcDistance(5, 1).x;
	w_king.y = calcDistance(5, 1).y;

	w_queen = new whiteFigures.Sprite();
	w_queen.img = "src/w_queen.png";

	// Placement
	w_queen.x = calcDistance(4, 1).x;
	w_queen.y = calcDistance(4, 1).y;

	// X8
	w_pawn = new whiteFigures.Group();
	w_pawn.img = "src/w_pawn.png";
	w_pawn.amount = 8;
	// Placement
	w_pawn.x = (i) => calcDistance(i + 1, 2).x;
	w_pawn.y = calcDistance(1, 2).y;
	// X2
	w_rook = new whiteFigures.Group();
	w_rook.img = "src/w_rook.png";
	w_rook.amount = 2;
	// left rook placement
	w_rook[0].x = calcDistance(1, 1).x; // 340
	w_rook[0].y = calcDistance(1, 1).y; // 480
	// right rook placement
	w_rook[1].x = calcDistance(8, 1).x;
	w_rook[1].y = calcDistance(8, 1).y;

	// X2
	w_knight = new whiteFigures.Group();
	w_knight.img = "src/w_knight.png";
	w_knight.amount = 2;
	// left knight placement
	w_knight[0].x = calcDistance(2, 1).x;
	w_knight[0].y = calcDistance(2, 1).y;
	// right knight placement
	w_knight[1].x = calcDistance(7, 1).x;
	w_knight[1].y = calcDistance(7, 1).y;

	// X2
	w_bishoop = new whiteFigures.Group();
	w_bishoop.img = "src/w_bishoop.png";
	w_bishoop.amount = 2;
	// left bishoop placement
	w_bishoop[0].x = calcDistance(3, 1).x;
	w_bishoop[0].y = calcDistance(3, 1).y;
	// right bishoop placement
	w_bishoop[1].x = calcDistance(6, 1).x;
	w_bishoop[1].y = calcDistance(6, 1).y;

	// Black Figures
	b_king = new blackFigures.Sprite();
	b_king.img = "src/b_king.png";
	// Black king placement
	b_king.x = calcDistance(5, 8).x;
	b_king.y = calcDistance(5, 8).y;

	b_queen = new blackFigures.Sprite();
	b_queen.img = "src/b_queen.png";
	// Queen placement
	b_queen.x = calcDistance(4, 8).x;
	b_queen.y = calcDistance(4, 8).y;

	// X8
	b_pawn = new blackFigures.Group();
	b_pawn.img = "src/b_pawn.png";
	b_pawn.amount = 8;
	// Pawns placement
	b_pawn.x = (i) => calcDistance(i + 1, 7).x;
	b_pawn.y = calcDistance(1, 7).y;

	// X2
	b_rook = new blackFigures.Group();
	b_rook.img = "src/b_rook.png";
	b_rook.amount = 2;
	// left rook placement
	b_rook[0].x = calcDistance(1, 8).x;
	b_rook[0].y = calcDistance(1, 8).y;
	// right rook placement
	b_rook[1].x = calcDistance(8, 8).x;
	b_rook[1].y = calcDistance(8, 8).y;

	// X2
	b_knight = new blackFigures.Group();
	b_knight.img = "src/b_knight.png";
	b_knight.amount = 2;
	// right knight placement
	b_knight[0].x = calcDistance(2, 8).x;
	b_knight[0].y = calcDistance(2, 8).y;
	// left knight placement
	b_knight[1].x = calcDistance(7, 8).x;
	b_knight[1].y = calcDistance(7, 8).y;

	// X2
	b_bishoop = new blackFigures.Group();
	b_bishoop.img = "src/b_bishoop.png";
	b_bishoop.amount = 2;
	// right bishoop placement
	b_bishoop[0].x = calcDistance(3, 8).x;
	b_bishoop[0].y = calcDistance(3, 8).y;
	// left bishoop placement
	b_bishoop[1].x = calcDistance(6, 8).x;
	b_bishoop[1].y = calcDistance(6, 8).y;

	noStroke();
	// Grid blocks settings
	Grid = new Group();
	Grid.color = "white";
	// Grid [column][row]
	Grid.x = cubeSize + placementOffset.y;
	// Column offset
	Grid.y = (i) => i * cubeSize + placementOffset.x;
	// Grid Layer
	Grid.layer = 1;

	// Block size set
	Grid.w = cubeSize;
	Grid.h = cubeSize;
	Grid.collider = "n";
	Grid.amount = 8;

	let bl;
	// Grid row
	for (let i = 0; i < 8; i++) {
		Grid[i] = new Grid.Group();

		let c = i * cubeSize;
		// Coloring
		if (i == 0) bl = !bl;
		if (bl) {
			Grid[i].color = colors.white;
		} else {
			Grid[i].color = colors.black;
		}
		// Grid row offset
		Grid[i].x = (i) => i * cubeSize + cubeSize + placementOffset.y;
		// Y offset
		Grid[i].y = c + placementOffset.x;
		Grid[i].color = (ia) => {
			// Chess coloring
			if (ia % 2 === 0 && bl) {
				return colors.white;
			} else if (!bl && ia % 2 !== 0) {
				return colors.white;
			} else {
				return colors.black;
			}
		};
		// Eight elements
		Grid[i].amount = 8;

		// Change color on new line
		bl = !bl;
	}
}

function draw() {
	background("#fff");
}
