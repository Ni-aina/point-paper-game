import { useEffect, useRef, useState } from "react";
import { WIDTH, HEIGHT, SIZE } from "../enums/data";

const usePlay = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d")!;
        let color = 0;
        let draw = false;
        let sc1 = 0;
        let sc2 = 0;
        const Points: [number | null, boolean, boolean, boolean, boolean][][] = [];

        const drawLines = () => {
            ctx.strokeStyle = "#1E293B";
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 1; i < HEIGHT / SIZE; i++) {
                ctx.moveTo(0, i * SIZE);
                ctx.lineTo(WIDTH, i * SIZE);
            }
            for (let i = 1; i < WIDTH / SIZE; i++) {
                ctx.moveTo(i * SIZE, 0);
                ctx.lineTo(i * SIZE, HEIGHT);
            }
            ctx.stroke();
        }

        const drawPoint = (i: number, j: number) => {
            if (Points[i][j][0] === null) {
                ctx.beginPath();
                Points[i][j][0] = color % 2 === 0 ? 1 : 2;
                const isP1 = color % 2 === 0;
                ctx.fillStyle = isP1 ? "#EF4444" : "#3B82F6";
                ctx.strokeStyle = isP1 ? "#EF4444" : "#3B82F6";
                ctx.shadowColor = isP1 ? "#EF4444" : "#3B82F6";
                ctx.shadowBlur = 8;
                ctx.arc(j * SIZE, i * SIZE, 5, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
                ctx.shadowBlur = 0;
                color++;
            }
        }

        const Matrix = () => {
            const lenX = Math.floor(WIDTH / SIZE);
            const lenY = Math.floor(HEIGHT / SIZE);
            for (let i = 0; i <= lenY + 10; i++) {
                Points.push([]);
                for (let j = 0; j <= lenX + 10; j++) {
                    Points[i].push([null, false, false, false, false]);
                }
            }
        }

        const Lines = () => {
            const lenX = Math.floor(WIDTH / SIZE);
            const lenY = Math.floor(HEIGHT / SIZE);
            let localSc1 = sc1;
            let localSc2 = sc2;

            for (let i = 0; i <= lenY; i++) {
                for (let j = 0; j <= lenX; j++) {
                    let xDraw = true;
                    let yDraw = true;
                    let D = true;
                    let DI = true;
                    let kX = j;
                    let kY = i;
                    let kD = 0;
                    let kDI = 0;

                    for (kX = j; kX < j + 5 && kX <= lenX + 1; kX++) {
                        if (Points[i][kX][0] !== Points[i][j][0] || Points[i][kX][0] === null || Points[i][kX][1] === true) xDraw = false;
                    }
                    for (kY = i; kY < i + 5 && kY <= lenY + 1; kY++) {
                        if (Points[kY][j][0] !== Points[i][j][0] || Points[kY][j][0] === null || Points[kY][j][2] === true) yDraw = false;
                    }
                    for (kD = 0; kD < 5 && kD + j <= lenX && kD + i <= lenY; kD++) {
                        if (
                            Points[i + kD][j + kD][0] !== Points[i][j][0] ||
                            Points[i + kD][j + kD][0] === null ||
                            Points[i + kD][j + kD][3] === true ||
                            (Points[i + kD][j + kD + 1][4] === true &&
                                Points[i + kD + 1][j + kD][4] === true &&
                                kD !== 4 &&
                                Points[i + kD][j + kD + 1][0] !== Points[i + kD][j + kD][0] &&
                                Points[i + kD + 1][j + kD][0] !== Points[i + kD][j + kD][0])
                        ) D = false;
                    }
                    for (kDI = 0; kDI < 5 && kDI + j <= lenX && kDI + i <= lenY; kDI++) {
                        if (
                            Points[i + kDI][j + 4 - kDI][0] !== Points[i][j + 4][0] ||
                            Points[i + kDI][j + 4 - kDI][0] === null ||
                            Points[i + kDI][j + 4 - kDI][4] === true ||
                            (j !== 0 &&
                                Points[i + kDI][j + 3 - kDI][3] === true &&
                                Points[i + kDI + 1][j + 4 - kDI][3] === true &&
                                kDI !== 4 &&
                                Points[i + kDI][j + 3 - kDI][0] !== Points[i + kDI][j + 4 - kDI][0] &&
                                Points[i + kDI + 1][j + 4 - kDI][0] !== Points[i + kDI][j + 4 - kDI][0])
                        ) DI = false;
                    }

                    ctx.beginPath();
                    const isP1Cell = Points[i][j][0] === 1;
                    ctx.strokeStyle = isP1Cell ? "#EF4444" : "#3B82F6";
                    ctx.shadowColor = isP1Cell ? "#EF4444" : "#3B82F6";
                    ctx.lineWidth = 2.5;

                    if (xDraw) {
                        ctx.shadowBlur = 10;
                        isP1Cell ? localSc1++ : localSc2++;
                        ctx.moveTo(j * SIZE, i * SIZE);
                        ctx.lineTo((kX - 1) * SIZE, i * SIZE);
                        for (let k = j; k < j + 5; k++) Points[i][k][1] = true;
                    }
                    if (yDraw) {
                        ctx.shadowBlur = 10;
                        isP1Cell ? localSc1++ : localSc2++;
                        ctx.moveTo(j * SIZE, i * SIZE);
                        ctx.lineTo(j * SIZE, (kY - 1) * SIZE);
                        for (let k = i; k < i + 5; k++) Points[k][j][2] = true;
                    }
                    if (D && kD === 5) {
                        ctx.shadowBlur = 10;
                        isP1Cell ? localSc1++ : localSc2++;
                        ctx.moveTo(j * SIZE, i * SIZE);
                        ctx.lineTo((j + 4) * SIZE, (i + 4) * SIZE);
                        for (let k = 0; k < 5; k++) Points[i + k][j + k][3] = true;
                    }
                    if (DI && kDI === 5) {
                        ctx.shadowBlur = 10;
                        Points[i][j + 4][0] === 1 ? localSc1++ : localSc2++;
                        ctx.strokeStyle = Points[i][j + 4][0] === 1 ? "#EF4444" : "#3B82F6";
                        ctx.shadowColor = Points[i][j + 4][0] === 1 ? "#EF4444" : "#3B82F6";
                        ctx.moveTo(j * SIZE, (i + 4) * SIZE);
                        ctx.lineTo((j + 4) * SIZE, i * SIZE);
                        for (let k = 0; k < 5; k++) Points[i + k][j + 4 - k][4] = true;
                    }

                    ctx.stroke();
                    ctx.shadowBlur = 0;
                    ctx.lineWidth = 1;

                    if (xDraw || yDraw || (D && kD === 5) || (DI && kDI === 5)) {
                        color--;
                        draw = true;
                    }
                }
            }

            sc1 = localSc1;
            sc2 = localSc2;
            setScore1(localSc1);
            setScore2(localSc2);
        }

        ctx.fillStyle = "#0F172A";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        Matrix();
        drawLines();

        canvas.onclick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = WIDTH / rect.width;
            const scaleY = HEIGHT / rect.height;
            const cursorX = Math.round(((e.clientX - rect.left) * scaleX) / SIZE);
            const cursorY = Math.round(((e.clientY - rect.top) * scaleY) / SIZE);

            if (cursorX < 0 || cursorY < 0 || cursorX > Math.floor(WIDTH / SIZE) || cursorY > Math.floor(HEIGHT / SIZE)) return;

            drawPoint(cursorY, cursorX);
            Lines();

            if (draw) {
                draw = false;
            } else {
                setCurrentPlayer(color % 2 === 0 ? 1 : 2);
            }
        }
    }, [])

    return {
        canvasRef,
        score1,
        score2,
        currentPlayer
    }
}

export default usePlay;