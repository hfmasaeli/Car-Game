export type Point = {
    x: number,
    y: number,
}

export type Level = {
    rewards: Point[],
    time: number;
    carPosition?: Point;
}