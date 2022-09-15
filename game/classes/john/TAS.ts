import { Key } from "./Key";

export class TAS {
    public constructor() {}

    public static frameLength = 7;

    public static playbackMode: boolean = false;

    public static recordMode: boolean = false;

    public static canAdvance: boolean = true;

    public static isPlaying: boolean = true;

    public static frameIndex: number = 0;

    public static saveState = new Object();

    public static isSaved = false;

    public static saveFrame: number = 0;

    public static inputs = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];

    public static buffer: string = "";

    public static cleanExtra() {
        TAS.inputs.forEach((frame, i) => {
            if (frame[TAS.frameLength] == 4) {
                TAS.inputs[i][TAS.frameLength] = 0;
            }
            else if (frame[TAS.frameLength] == 2 && i !== TAS.saveFrame) {
                TAS.inputs[i][TAS.frameLength] = 0;
            }
        });
        TAS.inputs[TAS.frameIndex][TAS.frameLength] = 4;
    }

    public static inputsToString() {
        let output = new Array<string>();
        TAS.inputs.forEach(function (frame) {
            output.push("["+frame.toString()+"]");
        });
        TAS.buffer = output.join(",\n");
    }

    public static stringToInputs() {
        let output = new Array<Array<number>>();
        TAS.buffer.split(",\n").forEach((line) => {
            output.push(line.slice(1,-1).split(',').map((x) => {
                return parseInt(x,10);
            }));
        });
        TAS.inputs = output;
    }

    public static enterPlaybackMode() {
        TAS.playbackMode = true;
        TAS.stopPlaying();
    }

    public static exitPlaybackMode() {
        TAS.playbackMode = false;
        TAS.stopPlaying();
    }

    public static startPlaying() {
        TAS.isPlaying = true;
        TAS.canAdvance = true;
    }

    public static setFrame(i : number) {
        TAS.frameIndex = i;
    }

    public static stopPlaying() {
        TAS.isPlaying = false;
        TAS.canAdvance = false;
    }

    public static advanceFrame() {
        TAS.canAdvance = true;
    }

    public static getFrame(): number {
        if (TAS.frameIndex >= TAS.inputs.length) {return 0;}
        let frame = TAS.inputs[TAS.frameIndex];
        let output = 0;
        for (let i = 0; i < TAS.frameLength; i++) {
            output <<= 1;
            output += frame[i];
        }
        return output;
    }

    public static loadNextFrame() {
        if (TAS.playbackMode || TAS.recordMode) {TAS.frameIndex++;}
        if (!TAS.isPlaying) {TAS.canAdvance = false;}
        if (TAS.playbackMode && (TAS.frameIndex >= TAS.inputs.length - 1)) {TAS.exitPlaybackMode();}
        if (TAS.frameIndex == TAS.inputs.length) {TAS.inputs.push([0,0,0,0,0,0,0,0]);}
    }

    public static primeRecord() {
        TAS.playbackMode = false;
        TAS.stopPlaying();
        TAS.recordMode = true;
    }

    public static stopRecord() {
        TAS.recordMode = false;
    }
}