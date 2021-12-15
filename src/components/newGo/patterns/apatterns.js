import {PatternDB, Pattern} from "./Patterns";

const attpat0 = [
[684,1],[722,1],[758,2],[686,2],
[796,0],[759,0],[723,0],[760,0],
[724,0]
];

const data = [
  [attpat0,9,8, "Attack1",0,0,3,3,3,3,0x0,760,
    [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
    [ 0x00251810, 0x00609010, 0x90600000, 0x18250000, 0x90600000, 0x18250000, 0x00251810, 0x00609010]
    , 0x400,0.000000,null,0,null,null,3,0.000000]
]
const attpat = data.map(item => new Pattern(item))

export const attpat_db = new PatternDB([-1, 0, attpat, null])