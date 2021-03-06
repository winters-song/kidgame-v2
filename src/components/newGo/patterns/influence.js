import {PatternDB, Pattern} from "./Patterns";
import {AFFINE_TRANSFORM} from "../Liberty";

/*
*
* . . . .
  . X . .
  . X . .
  . . . .
*
* . O x x
  . x x x
  . x x x
  . O x .
*
* */
const influencepat0 = [
[685,2],	[684,2],	[686,4],	[758,0],
[795,0],	[757,0],	[759,0],	[796,0],
[723,0]
];


const influencepat1 = [
[686,2],	[684,2],	[649,4],	[832,0],
[758,0],	[759,0],	[796,0],	[833,0],
[795,0],	[723,0],	[760,0],	[797,0],
[834,0]
]

const influencepat2 = [
[722,2],	[684,2],	[686,2],	[649,4],
[869,0],	[832,0],	[795,0],	[759,0],
[796,0],	[833,0],	[870,0],	[758,0],
[723,0],	[760,0],	[797,0],	[834,0],
[871,0]
]

const influencepat3 = [
[649,2],	[684,2],	[610,4],	[612,4],
[611,4],	[832,0],	[758,0],	[759,0],
[796,0],	[833,0],	[795,0],	[686,0],
[723,0],	[760,0],	[797,0],	[834,0]
]

const influencepat4 = [
[685,2],	[684,2],	[687,2],	[686,4],
[650,4],	[649,4],	[795,0],	[759,0],
[796,0],	[833,0],	[870,0],	[758,0],
[723,0],	[760,0],	[797,0],	[834,0],
[871,0],	[832,0],	[869,0],	[724,0],
[761,0],	[798,0],	[835,0],	[872,0]
]

const influencepat5 = [
[648,2],	[684,2],	[687,2],	[686,4],
[650,4],	[649,4],	[795,0],	[759,0],
[796,0],	[833,0],	[870,0],	[758,0],
[723,0],	[760,0],	[797,0],	[834,0],
[871,0],	[832,0],	[869,0],	[724,0],
[761,0],	[798,0],	[835,0],	[872,0]
]

const influencepat6 = [
[687,2],	[684,2],	[722,2],	[649,4],
[650,4],	[686,4],	[832,0],	[795,0],
[759,0],	[796,0],	[833,0],	[870,0],
[907,0],	[758,0],	[723,0],	[760,0],
[797,0],	[834,0],	[871,0],	[908,0],
[869,0],	[906,0],	[724,0],	[761,0],
[798,0],	[835,0],	[872,0],	[909,0]
]

const influencepat7 = [
[687,2],	[684,2],	[650,4],	[649,4],
[758,0],	[759,0],	[796,0],	[833,0],
[686,0],	[723,0],	[760,0],	[797,0],
[834,0],	[795,0],	[832,0],	[724,0],
[761,0],	[798,0],	[835,0]
]

const influencepat8 = [
[650,2],	[684,2],	[685,2],	[649,4],
[869,0],	[795,0],	[758,0],	[759,0],
[796,0],	[833,0],	[870,0],	[686,0],
[723,0],	[760,0],	[797,0],	[834,0],
[871,0],	[832,0],	[687,0],	[724,0],
[761,0],	[798,0],	[835,0],	[872,0]
]

const influencepat9 = [
[650,2],	[684,2],	[648,2],	[649,4],
[758,0],	[832,0],	[759,0],	[796,0],
[833,0],	[686,0],	[723,0],	[760,0],
[797,0],	[834,0],	[795,0],	[687,0],
[724,0],	[761,0],	[798,0],	[835,0]
]

const influencepat10 = [
[650,2],	[684,2],	[649,2],	[758,0],
[832,0],	[759,0],	[796,0],	[833,0],
[686,0],	[723,0],	[760,0],	[797,0],
[834,0],	[795,0],	[687,0],	[724,0],
[761,0],	[798,0],	[835,0]
]

const influencepat11 = [
[650,2],	[684,2],	[686,2],	[649,4],
[869,0],	[795,0],	[759,0],	[796,0],
[833,0],	[870,0],	[758,0],	[723,0],
[760,0],	[797,0],	[834,0],	[871,0],
[832,0],	[687,0],	[724,0],	[761,0],
[798,0],	[835,0],	[872,0]
]

const influencepat12 = [
[650,2],	[684,2],	[723,2],	[686,4],
[649,4],	[869,0],	[759,0],	[796,0],
[833,0],	[870,0],	[758,0],	[795,0],
[760,0],	[797,0],	[834,0],	[871,0],
[832,0],	[687,0],	[724,0],	[761,0],
[798,0],	[835,0],	[872,0]
]

const influencepat13 = [
[650,2],	[684,2],	[649,4],	[758,0],
[832,0],	[759,0],	[796,0],	[833,0],
[686,0],	[723,0],	[760,0],	[797,0],
[834,0],	[795,0],	[687,0],	[724,0],
[761,0],	[798,0],	[835,0]
]

const influencepat14 = [
[684,2],	[610,4],	[868,4],	[573,4],
[869,4],	[572,4],	[609,4],	[832,4],
[831,4],	[757,0],	[794,0],	[719,0],
[645,0],	[682,0],	[758,0],	[795,0],
[756,0],	[793,0],	[574,0],	[611,0],
[759,0],	[796,0],	[833,0],	[870,0],
[575,0],	[612,0],	[649,0],	[686,0],
[723,0],	[760,0],	[797,0],	[834,0],
[871,0]
]

const influencepat15 = [
[684,2],	[758,0],	[757,0],	[759,0]
]

const influencepat16 = [
[684,2],	[794,0],	[758,0],	[795,0],
[757,0],	[759,0],	[796,0]
]

const influencepat17 = [
[684,2],	[794,0],	[757,0],	[758,0],
[795,0],	[759,0],	[796,0],	[649,0],
[686,0],	[723,0],	[760,0],	[797,0]
]

const influencepat18 = [
[684,2],	[645,4],	[682,4],	[719,0],
[757,0],	[794,0],	[756,0],	[793,0],
[758,0],	[795,0],	[759,0],	[796,0],
[649,0],	[686,0],	[723,0],	[760,0],
[797,0],	[650,0],	[687,0],	[724,0],
[761,0],	[798,0]
]

const influencepat19 = [
[684,2],	[796,4],	[679,4],	[716,4],
[753,4],	[790,4],	[827,4],	[795,4],
[758,4],	[759,4],	[642,0],	[643,0],
[606,0],	[828,0],	[607,0],	[644,0],
[681,0],	[718,0],	[755,0],	[792,0],
[829,0],	[608,0],	[645,0],	[682,0],
[719,0],	[756,0],	[793,0],	[830,0],
[609,0],	[757,0],	[794,0],	[831,0],
[610,0],	[605,0],	[754,0],	[791,0],
[832,0],	[611,0],	[680,0],	[717,0],
[833,0],	[612,0],	[649,0],	[686,0],
[723,0],	[760,0],	[797,0],	[834,0],
[613,0],	[650,0],	[687,0],	[724,0],
[761,0],	[798,0],	[835,0]
]

const influencepat20 = [
[684,2],	[796,4],	[943,4],	[758,4],
[944,4],	[942,4],	[795,4],	[759,4],
[941,4],	[904,0],	[793,0],	[830,0],
[757,0],	[794,0],	[831,0],	[868,0],
[905,0],	[609,0],	[610,0],	[645,0],
[719,0],	[832,0],	[869,0],	[906,0],
[682,0],	[611,0],	[867,0],	[608,0],
[833,0],	[870,0],	[907,0],	[756,0],
[612,0],	[649,0],	[686,0],	[723,0],
[760,0],	[797,0],	[834,0],	[871,0],
[908,0],	[945,0],	[613,0],	[650,0],
[687,0],	[724,0],	[761,0],	[798,0],
[835,0],	[872,0],	[909,0],	[946,0]
]

const influencepat21 = [
[684,2],	[795,4],	[678,4],	[715,4],
[752,4],	[789,4],	[826,4],	[794,4],
[757,4],	[758,4],	[641,0],	[642,0],
[604,0],	[827,0],	[606,0],	[643,0],
[680,0],	[717,0],	[754,0],	[791,0],
[828,0],	[607,0],	[644,0],	[681,0],
[718,0],	[755,0],	[792,0],	[829,0],
[608,0],	[645,0],	[682,0],	[719,0],
[756,0],	[793,0],	[830,0],	[609,0],
[753,0],	[790,0],	[831,0],	[610,0],
[605,0],	[679,0],	[716,0],	[832,0],
[611,0],	[759,0],	[796,0],	[833,0],
[612,0],	[649,0],	[686,0],	[723,0],
[760,0],	[797,0],	[834,0]
]

const influencepat22 = [
[684,2],	[794,4],	[942,4],	[757,4],
[943,4],	[795,4],	[941,4],	[758,4],
[940,4],	[903,0],	[644,0],	[645,0],
[682,0],	[829,0],	[756,0],	[793,0],
[830,0],	[867,0],	[904,0],	[608,0],
[609,0],	[718,0],	[719,0],	[831,0],
[868,0],	[905,0],	[681,0],	[610,0],
[792,0],	[866,0],	[607,0],	[832,0],
[869,0],	[906,0],	[755,0],	[611,0],
[759,0],	[796,0],	[833,0],	[870,0],
[907,0],	[944,0],	[612,0],	[649,0],
[686,0],	[723,0],	[760,0],	[797,0],
[834,0],	[871,0],	[908,0],	[945,0]
]

const influencepat23 = [
[684,2],	[648,2],	[757,0],	[794,0],
[758,0],	[795,0],	[611,0],	[759,0],
[796,0],	[612,0],	[649,0],	[686,0],
[723,0],	[760,0],	[797,0],	[613,0],
[650,0],	[687,0],	[724,0],	[761,0],
[798,0]
]

const influencepat24 = [
[719,1],	[684,2],	[724,4],	[645,4],
[723,4],	[793,4],	[792,4],	[686,4],
[687,4],	[605,0],	[679,0],	[791,0],
[607,0],	[644,0],	[681,0],	[718,0],
[755,0],	[606,0],	[608,0],	[680,0],
[682,0],	[643,0],	[756,0],	[790,0],
[609,0],	[757,0],	[794,0],	[610,0],
[642,0],	[758,0],	[795,0],	[611,0],
[759,0],	[796,0],	[612,0],	[649,0],
[716,0],	[753,0],	[760,0],	[797,0],
[613,0],	[650,0],	[717,0],	[754,0],
[761,0],	[798,0]
]

const influencepat25 = [
[719,1],	[684,2],	[758,4],	[792,4],
[723,4],	[793,4],	[724,4],	[686,4],
[687,4],	[680,0],	[605,0],	[791,0],
[607,0],	[644,0],	[681,0],	[718,0],
[679,0],	[606,0],	[608,0],	[645,0],
[682,0],	[643,0],	[756,0],	[790,0],
[609,0],	[757,0],	[794,0],	[610,0],
[642,0],	[755,0],	[795,0],	[611,0],
[759,0],	[796,0],	[612,0],	[649,0],
[716,0],	[753,0],	[760,0],	[797,0],
[613,0],	[650,0],	[717,0],	[754,0],
[761,0],	[798,0]
]

const influencepat26 = [
[607,0],	[644,0],	[681,0],	[570,0],
[571,0],	[608,0],	[645,0],	[682,0],
[719,0],	[572,0],	[609,0],	[573,0],
[610,0],	[718,0],	[574,0],	[611,0]
]

const influencepat27 = [
[682,0],	[571,0],	[756,0],	[534,0],
[572,0],	[609,0],	[757,0],	[536,0],
[573,0],	[610,0],	[608,0],	[535,0],
[758,0],	[537,0],	[574,0],	[611,0],
[645,0],	[719,0],	[759,0],	[538,0],
[575,0],	[612,0],	[649,0],	[686,0],
[723,0],	[760,0]
]

const influencepat28 = [
[638,0],	[601,0],	[712,0],	[749,0],
[602,0],	[639,0],	[676,0],	[713,0],
[675,0],	[603,0],	[640,0],	[677,0],
[714,0],	[751,0],	[604,0],	[641,0],
[678,0],	[715,0],	[752,0],	[605,0],
[642,0],	[679,0],	[716,0],	[753,0],
[606,0],	[643,0],	[680,0],	[717,0],
[754,0],	[607,0],	[644,0],	[681,0],
[718,0],	[755,0],	[608,0],	[645,0],
[682,0],	[719,0],	[756,0],	[609,0],
[757,0],	[610,0],	[750,0],	[758,0]
]

const influencepat29 = [
[601,0],	[675,0],	[712,0],	[565,0],
[602,0],	[639,0],	[676,0],	[638,0],
[564,0],	[603,0],	[640,0],	[677,0],
[714,0],	[567,0],	[604,0],	[641,0],
[678,0],	[715,0],	[568,0],	[605,0],
[642,0],	[679,0],	[716,0],	[569,0],
[606,0],	[643,0],	[680,0],	[717,0],
[570,0],	[607,0],	[644,0],	[681,0],
[718,0],	[571,0],	[608,0],	[645,0],
[682,0],	[719,0],	[572,0],	[609,0],
[573,0],	[610,0],	[713,0],	[566,0]
]

const influencepat30 = [
[610,4],	[638,0],	[675,0],	[528,0],
[565,0],	[602,0],	[639,0],	[601,0],
[527,0],	[564,0],	[603,0],	[640,0],
[677,0],	[530,0],	[567,0],	[604,0],
[641,0],	[678,0],	[531,0],	[568,0],
[605,0],	[642,0],	[679,0],	[532,0],
[569,0],	[606,0],	[643,0],	[680,0],
[533,0],	[570,0],	[607,0],	[644,0],
[681,0],	[534,0],	[571,0],	[608,0],
[645,0],	[682,0],	[535,0],	[572,0],
[609,0],	[536,0],	[573,0],	[676,0],
[529,0],	[566,0]
]

const influencepat31 = [
[610,4],	[573,4],	[638,0],	[491,0],
[528,0],	[565,0],	[601,0],	[564,0],
[490,0],	[527,0],	[566,0],	[603,0],
[640,0],	[493,0],	[530,0],	[567,0],
[604,0],	[641,0],	[494,0],	[531,0],
[568,0],	[605,0],	[642,0],	[495,0],
[532,0],	[569,0],	[606,0],	[643,0],
[496,0],	[533,0],	[570,0],	[607,0],
[644,0],	[497,0],	[534,0],	[571,0],
[608,0],	[645,0],	[498,0],	[535,0],
[572,0],	[609,0],	[499,0],	[536,0],
[602,0],	[639,0],	[492,0],	[529,0]
]

const influencepat32 = [
[640,0],	[677,0],	[714,0],	[751,0],
[604,0],	[603,0],	[678,0],	[715,0],
[752,0],	[605,0],	[642,0],	[679,0],
[716,0],	[753,0],	[606,0],	[643,0],
[680,0],	[717,0],	[754,0],	[607,0],
[644,0],	[681,0],	[718,0],	[755,0],
[608,0],	[645,0],	[682,0],	[719,0],
[756,0],	[609,0],	[757,0],	[610,0],
[641,0],	[758,0]
]

const influencepat33 = [
[640,0],	[677,0],	[714,0],	[567,0],
[566,0],	[603,0],	[678,0],	[715,0],
[568,0],	[605,0],	[642,0],	[679,0],
[716,0],	[569,0],	[606,0],	[643,0],
[680,0],	[717,0],	[570,0],	[607,0],
[644,0],	[681,0],	[718,0],	[571,0],
[608,0],	[645,0],	[682,0],	[719,0],
[572,0],	[609,0],	[573,0],	[610,0],
[604,0],	[641,0]
]

const influencepat34 = [
[610,4],	[640,0],	[677,0],	[530,0],
[603,0],	[566,0],	[529,0],	[678,0],
[531,0],	[568,0],	[605,0],	[642,0],
[679,0],	[532,0],	[569,0],	[606,0],
[643,0],	[680,0],	[533,0],	[570,0],
[607,0],	[644,0],	[681,0],	[534,0],
[571,0],	[608,0],	[645,0],	[682,0],
[535,0],	[572,0],	[609,0],	[536,0],
[573,0],	[567,0],	[604,0],	[641,0]
]

const influencepat35 = [
[573,4],	[610,4],	[640,0],	[493,0],
[566,0],	[603,0],	[492,0],	[529,0],
[494,0],	[531,0],	[568,0],	[605,0],
[642,0],	[495,0],	[532,0],	[569,0],
[606,0],	[643,0],	[496,0],	[533,0],
[570,0],	[607,0],	[644,0],	[497,0],
[534,0],	[571,0],	[608,0],	[645,0],
[498,0],	[535,0],	[572,0],	[609,0],
[499,0],	[536,0],	[530,0],	[567,0],
[604,0],	[641,0]
]

const influencepat36 = [
[906,4],	[912,4],	[690,4],	[832,0],
[795,0],	[759,0],	[796,0],	[758,0],
[870,0],	[907,0],	[686,0],	[723,0],
[760,0],	[797,0],	[834,0],	[871,0],
[908,0],	[687,0],	[724,0],	[761,0],
[798,0],	[835,0],	[872,0],	[909,0],
[688,0],	[725,0],	[762,0],	[799,0],
[836,0],	[873,0],	[910,0],	[689,0],
[726,0],	[763,0],	[800,0],	[837,0],
[874,0],	[911,0],	[869,0],	[727,0],
[764,0],	[801,0],	[838,0],	[875,0],
[833,0]
]

const influencepat37 = [
[645,0],	[682,0],	[719,0],	[756,0],
[793,0],	[830,0],	[609,0],	[757,0],
[794,0],	[831,0],	[610,0],	[608,0],
[758,0],	[795,0],	[832,0],	[611,0],
[759,0],	[796,0],	[833,0],	[612,0],
[649,0],	[686,0],	[723,0],	[760,0],
[797,0],	[834,0],	[613,0],	[650,0],
[687,0],	[724,0],	[761,0],	[798,0],
[835,0],	[614,0],	[651,0],	[688,0],
[725,0],	[762,0],	[799,0],	[836,0]
]

const influencepat38 = [
[644,0],	[607,0],	[718,0],	[755,0],
[792,0],	[829,0],	[608,0],	[645,0],
[682,0],	[719,0],	[756,0],	[793,0],
[830,0],	[609,0],	[757,0],	[794,0],
[831,0],	[610,0],	[681,0],	[758,0],
[795,0],	[832,0],	[611,0],	[759,0],
[796,0],	[833,0],	[612,0],	[649,0],
[686,0],	[723,0],	[760,0],	[797,0],
[834,0],	[613,0],	[650,0],	[687,0],
[724,0],	[761,0],	[798,0],	[835,0]
]

const influencepat39 = [
[906,4],	[795,0],	[832,0],	[869,0],
[758,0],	[759,0],	[796,0],	[833,0],
[870,0],	[907,0],	[686,0],	[723,0],
[760,0],	[797,0],	[834,0],	[871,0],
[908,0],	[687,0],	[724,0],	[761,0],
[798,0],	[835,0],	[872,0],	[909,0],
[688,0],	[725,0],	[762,0],	[799,0],
[836,0],	[873,0],	[910,0],	[689,0],
[726,0],	[763,0],	[800,0],	[837,0],
[874,0],	[911,0]
]

const influencepat40 = [
[758,4],	[680,0],	[606,0],	[643,0],
[644,0],	[681,0],	[718,0],	[755,0],
[608,0],	[645,0],	[682,0],	[719,0],
[756,0],	[609,0],	[757,0],	[610,0],
[717,0],	[754,0],	[607,0]
]

const influencepat41 = [
[643,0],	[680,0],	[569,0],	[606,0],
[607,0],	[644,0],	[681,0],	[718,0],
[571,0],	[608,0],	[645,0],	[682,0],
[719,0],	[572,0],	[609,0],	[573,0],
[610,0],	[717,0],	[570,0]
]

const influencepat42 = [
[532,0],	[606,0],	[643,0],	[680,0],
[569,0],	[570,0],	[607,0],	[644,0],
[681,0],	[534,0],	[571,0],	[608,0],
[645,0],	[682,0],	[535,0],	[572,0],
[609,0],	[536,0],	[573,0],	[610,0],
[533,0]
]

const influencepat43 = [
[494,0],	[568,0],	[605,0],	[642,0],
[679,0],	[495,0],	[532,0],	[531,0],
[606,0],	[643,0],	[680,0],	[496,0],
[533,0],	[570,0],	[607,0],	[644,0],
[681,0],	[497,0],	[534,0],	[571,0],
[608,0],	[645,0],	[682,0],	[498,0],
[535,0],	[572,0],	[609,0],	[499,0],
[536,0],	[573,0],	[610,0],	[569,0]
]

const influencepat44 = [
[493,0],	[456,0],	[567,0],	[604,0],
[641,0],	[678,0],	[457,0],	[494,0],
[531,0],	[568,0],	[530,0],	[642,0],
[679,0],	[458,0],	[495,0],	[532,0],
[569,0],	[606,0],	[643,0],	[680,0],
[459,0],	[496,0],	[533,0],	[570,0],
[607,0],	[644,0],	[681,0],	[460,0],
[497,0],	[534,0],	[571,0],	[608,0],
[645,0],	[682,0],	[461,0],	[498,0],
[535,0],	[572,0],	[609,0],	[462,0],
[499,0],	[536,0],	[573,0],	[610,0],
[605,0]
]

const influencepat45 = [
[725,2],	[757,0],	[794,0],	[610,0],
[609,0],	[758,0],	[795,0],	[611,0],
[759,0],	[796,0],	[612,0],	[649,0],
[686,0],	[723,0],	[760,0],	[797,0],
[613,0],	[650,0],	[687,0],	[724,0],
[761,0],	[798,0],	[614,0],	[651,0],
[688,0],	[762,0],	[799,0],	[615,0],
[652,0],	[689,0],	[726,0],	[763,0],
[800,0]
]

const influencepat46 = [
[688,2],	[572,0],	[757,0],	[573,0],
[610,0],	[758,0],	[574,0],	[611,0],
[759,0],	[575,0],	[612,0],	[649,0],
[686,0],	[723,0],	[760,0],	[576,0],
[613,0],	[650,0],	[687,0],	[724,0],
[761,0],	[577,0],	[614,0],	[651,0],
[609,0],	[725,0],	[762,0],	[578,0],
[615,0],	[652,0],	[689,0],	[726,0],
[763,0]
]

const influencepat47 = [
[607,0],	[644,0],	[570,0],	[718,0],
[755,0],	[571,0],	[608,0],	[645,0],
[682,0],	[719,0],	[756,0],	[572,0],
[609,0],	[757,0],	[573,0],	[610,0],
[681,0],	[758,0],	[574,0],	[611,0],
[759,0],	[575,0],	[612,0],	[649,0],
[686,0],	[723,0],	[760,0],	[576,0],
[613,0],	[650,0],	[687,0],	[724,0],
[761,0]
]

const influencepat48 = [
[641,0],	[678,0],	[715,0],	[752,0],
[789,0],	[604,0],	[642,0],	[679,0],
[716,0],	[753,0],	[790,0],	[606,0],
[643,0],	[680,0],	[717,0],	[754,0],
[791,0],	[607,0],	[644,0],	[681,0],
[718,0],	[755,0],	[792,0],	[608,0],
[645,0],	[682,0],	[719,0],	[756,0],
[793,0],	[609,0],	[757,0],	[794,0],
[610,0],	[605,0],	[758,0],	[795,0]
]

const influencepat49 = [
[690,2],	[757,3],	[758,3],	[681,0],
[755,0],	[607,0],	[644,0],	[645,0],
[682,0],	[719,0],	[756,0],	[572,0],
[609,0],	[608,0],	[573,0],	[610,0],
[718,0],	[570,0],	[574,0],	[611,0],
[759,0],	[575,0],	[612,0],	[649,0],
[686,0],	[723,0],	[760,0],	[576,0],
[613,0],	[650,0],	[687,0],	[724,0],
[761,0],	[577,0],	[614,0],	[651,0],
[688,0],	[725,0],	[762,0],	[578,0],
[615,0],	[652,0],	[689,0],	[726,0],
[763,0],	[579,0],	[616,0],	[653,0],
[571,0],	[727,0],	[764,0],	[580,0],
[617,0],	[654,0],	[691,0],	[728,0],
[765,0]
]

const autohelperinfluencepat14 = function (trans, move, color, action){
  const a = AFFINE_TRANSFORM(460, trans, move);
  const b = AFFINE_TRANSFORM(461, trans, move);
  const c = AFFINE_TRANSFORM(497, trans, move);
  const d = AFFINE_TRANSFORM(498, trans, move);

  return this.somewhere(color, 0, 4, [a, b, c, d]);
}
const autohelperinfluencepat19 = function (trans, move, color, action){
  const a = AFFINE_TRANSFORM(761, trans, move);
  const b = AFFINE_TRANSFORM(762, trans, move);
  const c = AFFINE_TRANSFORM(798, trans, move);
  const d = AFFINE_TRANSFORM(799, trans, move);

  return this.somewhere(color, 0, 4, [a, b, c, d]);
}
const autohelperinfluencepat20 = function (trans, move, color, action){
  const a = AFFINE_TRANSFORM(572, trans, move);
  const b = AFFINE_TRANSFORM(573, trans, move);
  const c = AFFINE_TRANSFORM(609, trans, move);
  const d = AFFINE_TRANSFORM(610, trans, move);

  return this.somewhere(color, 0, 4, [a, b, c, d]);
}
const autohelperinfluencepat21 = function (trans, move, color, action){
  const a = AFFINE_TRANSFORM(761, trans, move);
  const b = AFFINE_TRANSFORM(762, trans, move);
  const c = AFFINE_TRANSFORM(798, trans, move);
  const d = AFFINE_TRANSFORM(799, trans, move);

  return this.somewhere(color, 0, 4, [a, b, c, d]);
}
const autohelperinfluencepat22 = function (trans, move, color, action){
  const a = AFFINE_TRANSFORM(572, trans, move);
  const b = AFFINE_TRANSFORM(573, trans, move);
  const c = AFFINE_TRANSFORM(609, trans, move);
  const d = AFFINE_TRANSFORM(610, trans, move);

  return this.somewhere(color, 0, 4, [a, b, c, d]);
}


const data = [
  [ influencepat0,9,8, "Enhance1",-1,0,2,3,3,3,0x0,758,
    [ 0x2f3f3f2c, 0x00f8fcfc, 0xf0f0e000, 0xffbe0000, 0xfcf80000, 0x3f3f2f00, 0x00befffc, 0xe0f0f0e0],
    [ 0x00101000, 0x00500000, 0x10100000, 0x00140000, 0x00500000, 0x10100000, 0x00140000, 0x00101000]
    , 0x2000,30.000000,null,0,null,null,0,0.000000],
  [ influencepat1,13,4, "Enhance2",0,-1,2,4,2,5,0x0,796,
    [ 0x00bfafbf, 0xa0b0f0f0, 0xe8f80000, 0x3f3b2a00, 0xf0b0a000, 0xafbf0000, 0x2a3b3f3f, 0x00f8e8f8],
    [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
    , 0x2000,30.000000,null,0,null,null,0,0.000000],
  [ influencepat2,17,4, "Enhance3",0,-1,2,5,2,6,0x0,833,
    [ 0x00bfafbf, 0xa0b0f0f0, 0xe8f80000, 0x3f3b2a00, 0xf0b0a000, 0xafbf0000, 0x2a3b3f3f, 0x00f8e8f8],
    [ 0x00100410, 0x00104000, 0x40100000, 0x04110000, 0x40100000, 0x04100000, 0x00110400, 0x00104010]
    , 0x2000,30.000000,null,0,null,null,0,0.000000],
  [ influencepat3,16,8, "Enhance4",0,-2,2,4,2,6,0x0,796,
    [ 0x00bfafff, 0xa0b0f0f0, 0xeafa0000, 0x3f3b2b2a, 0xf0b0a0a0, 0xafbf0000, 0x2b3b3f3f, 0x00faeafe],
    [ 0x00100040, 0x00100000, 0x00100000, 0x00100100, 0x00100000, 0x00100000, 0x01100000, 0x00100004]
    , 0x2000,20.000000,null,0,null,null,0,0.000000],
  [ influencepat4,24,8, "Enhance5",0,-1,3,5,3,6,0x0,833,
    [ 0x00bfbfaf, 0xa0f0f0f0, 0xf8f80000, 0x3f3e2a00, 0xf0f0a000, 0xbfbf0000, 0x2a3e3f3f, 0x00f8f8e8],
    [ 0x00101000, 0x00500000, 0x10100000, 0x00140000, 0x00500000, 0x10100000, 0x00140000, 0x00101000]
    , 0x2000,30.000000,null,0,null,null,0,0.000000],
  [ influencepat5,24,8, "Enhance6",0,-1,3,5,3,6,0x0,833,
    [ 0x00bfffaf, 0xe0f0f0f0, 0xfcf80000, 0x3f3e2e00, 0xf0f0e000, 0xffbf0000, 0x2e3e3f3f, 0x00f8fce8],
    [ 0x00104000, 0x40100000, 0x04100000, 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x00100400]
    , 0x2000,20.000000,null,0,null,null,0,0.000000],
  [ influencepat6,28,8, "Enhance7",0,-1,3,6,3,7,0x0,870,
    [ 0x00bfafaf, 0xa0b0f0f0, 0xe8f80000, 0x3f3a2a00, 0xf0b0a000, 0xafbf0000, 0x2a3a3f3f, 0x00f8e8e8],
    [ 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x40100000, 0x04100000, 0x00100400, 0x00104000]
    , 0x2000,20.000000,null,0,null,null,0,0.000000],
  [ influencepat7,19,8, "Enhance8",0,-1,3,4,3,5,0x0,796,
    [ 0x00bfbfbf, 0xa0f0f0f0, 0xf8f80000, 0x3f3f2a00, 0xf0f0a000, 0xbfbf0000, 0x2a3f3f3f, 0x00f8f8f8],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,15.000000,null,0,null,null,0,0.000000],
  [ influencepat8,24,8, "Enhance9",0,-1,3,5,3,6,0x0,833,
    [ 0x00bfbfbf, 0xa0f0f0f0, 0xf8f80000, 0x3f3f2a00, 0xf0f0a000, 0xbfbf0000, 0x2a3f3f3f, 0x00f8f8f8],
    [ 0x00101000, 0x00500000, 0x10100000, 0x00140000, 0x00500000, 0x10100000, 0x00140000, 0x00101000]
    , 0x2000,20.000000,null,0,null,null,0,0.000000],
  [ influencepat9,20,8, "Enhance10",0,-1,3,4,3,5,0x0,796,
    [ 0x00bfffbf, 0xe0f0f0f0, 0xfcf80000, 0x3f3f2e00, 0xf0f0e000, 0xffbf0000, 0x2e3f3f3f, 0x00f8fcf8],
    [ 0x00104000, 0x40100000, 0x04100000, 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x00100400]
    , 0x2000,30.000000,null,0,null,null,0,0.000000],
  [ influencepat10,19,8, "Enhance11",0,-1,3,4,3,5,0x0,796,
    [ 0x00bfbfff, 0xa0f0f0f0, 0xf8f80000, 0x3f3f2b00, 0xf0f0a000, 0xbfbf0000, 0x2b3f3f3f, 0x00f8f8fc],
    [ 0x00100040, 0x00100000, 0x00100000, 0x00100100, 0x00100000, 0x00100000, 0x01100000, 0x00100004]
    , 0x2000,30.000000,null,0,null,null,0,0.000000],
  [ influencepat11,23,8, "Enhance12",0,-1,3,5,3,6,0x0,833,
    [ 0x00bfbfbf, 0xa0f0f0f0, 0xf8f80000, 0x3f3f2a00, 0xf0f0a000, 0xbfbf0000, 0x2a3f3f3f, 0x00f8f8f8],
    [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
    , 0x2000,30.000000,null,0,null,null,0,0.000000],
  [ influencepat12,23,8, "Enhance13",0,-1,3,5,3,6,0x0,833,
    [ 0x00bfafaf, 0xa0b0f0f0, 0xe8f80000, 0x3f3a2a00, 0xf0b0a000, 0xafbf0000, 0x2a3a3f3f, 0x00f8e8e8],
    [ 0x00100004, 0x00100000, 0x00100000, 0x01100000, 0x00100000, 0x00100000, 0x00100100, 0x00100040]
    , 0x2000,30.000000,null,0,null,null,0,0.000000],
  [ influencepat13,19,8, "Enhance14",0,-1,3,4,3,5,0x0,796,
    [ 0x00bfbfbf, 0xa0f0f0f0, 0xf8f80000, 0x3f3f2a00, 0xf0f0a000, 0xbfbf0000, 0x2a3f3f3f, 0x00f8f8f8],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,20.000000,null,0,null,null,0,0.000000],
  [ influencepat14,33,8, "Enhance15",-2,-3,2,5,4,8,0x2,796,
    [ 0xffffffff, 0xffffffff, 0xfffefefc, 0xffffffaf, 0xffffffe8, 0xffffffff, 0xffffffff, 0xfefeffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,30.000000,null,1,null,autohelperinfluencepat14,0,0.010000],
  [ influencepat15,4,4, "Enhance16",-1,-1,1,2,2,3,0x4,758,
    [ 0xafbfaf00, 0xa8b8fcfc, 0xe8f8e800, 0xfcb8a800, 0xfcb8a800, 0xafbfaf00, 0xa8b8fcfc, 0xe8f8e800],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,20.000000,null,0,null,null,0,0.000000],
  [ influencepat16,7,4, "Enhance17",-1,-1,1,3,2,4,0x4,758,
    [ 0xafbfaf00, 0xa8b8fcfc, 0xe8f8e800, 0xfcb8a800, 0xfcb8a800, 0xafbfaf00, 0xa8b8fcfc, 0xe8f8e800],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,20.000000,null,0,null,null,0,0.000000],
  [ influencepat17,12,8, "Enhance18",-1,-1,2,3,3,4,0x2,759,
    [ 0xafbfffff, 0xe8f8fcfc, 0xfcf8e800, 0xffbfaf00, 0xfcf8e800, 0xffbfaf00, 0xafbfffff, 0xe8f8fcfc],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,20.000000,null,0,null,null,0,0.000000],
  [ influencepat18,22,8, "Enhance19",-2,-1,3,3,5,4,0x2,757,
    [ 0xafbfffff, 0xeafaffff, 0xfcf8e8e8, 0xffbfaf00, 0xfffaea00, 0xffbfafaf, 0xafbfffff, 0xe8f8fcfc],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,20.000000,null,0,null,null,0,0.000000],
  [ influencepat19,55,8, "Enhance20",-5,-2,3,4,8,6,0xa,681,
    [ 0xfffefeff, 0xffffffaf, 0xffffffff, 0xffffffff, 0xffffffff, 0xfefeffff, 0xffffffeb, 0xffffffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,50.000000,null,1,null,autohelperinfluencepat19,0,0.010000],
  [ influencepat20,52,8, "Enhance21",-2,-2,3,7,5,9,0xa,870,
    [ 0xfffefeff, 0xffffffaf, 0xffffffff, 0xffffffff, 0xffffffff, 0xfefeffff, 0xffffffeb, 0xffffffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,50.000000,null,1,null,autohelperinfluencepat20,0,0.010000],
  [ influencepat21,55,8, "Enhance22",-6,-2,2,4,8,6,0xa,680,
    [ 0xfefeffff, 0xffffffeb, 0xffffffff, 0xffffffff, 0xffffffff, 0xfffefeff, 0xffffffaf, 0xffffffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,40.000000,null,1,null,autohelperinfluencepat21,0,0.010000],
  [ influencepat22,52,8, "Enhance23",-3,-2,2,7,5,9,0xa,869,
    [ 0xfefeffff, 0xffffffeb, 0xffffffff, 0xffffffff, 0xffffffff, 0xfffefeff, 0xffffffaf, 0xffffffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x2000,40.000000,null,1,null,autohelperinfluencepat22,0,0.010000],
  [ influencepat23,21,8, "Enhance24",-1,-2,3,3,4,5,0x2,759,
    [ 0x3f3fffff, 0xc0fcfcfc, 0xfff0f000, 0xffff0f0f, 0xfcfcc0c0, 0xff3f3f00, 0x0fffffff, 0xf0f0ffff],
    [ 0x00104000, 0x40100000, 0x04100000, 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x00100400]
    , 0x2000,30.000000,null,0,null,null,0,0.000000],
  [ influencepat24,46,8, "Enhance25",-5,-2,3,3,8,5,0x9,758,
    [ 0xffffffeb, 0xfeffffff, 0xfffffffb, 0xfefeffff, 0xfffffeff, 0xffffffbf, 0xfffefeff, 0xffffffaf],
    [ 0x00100000, 0x00100200, 0x00100080, 0x00100000, 0x02100000, 0x00100008, 0x00100000, 0x00100000]
    , 0x2000,15.000000,null,0,null,null,0,0.000000],
  [ influencepat25,46,8, "Enhance26",-5,-2,3,3,8,5,0x9,645,
    [ 0xfffeffeb, 0xffffffef, 0xffffffff, 0xfefeffff, 0xffffffff, 0xfffeffff, 0xfffefeef, 0xffffffaf],
    [ 0x00100000, 0x00100200, 0x00100080, 0x00100000, 0x02100000, 0x00100008, 0x00100000, 0x00100000]
    , 0x2000,15.000000,null,0,null,null,0,0.000000],
  [ influencepat26,16,4, "Invade1",-3,-3,1,1,4,4,0x9,646,
    [ 0xfcfcfc00, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xffffffff, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x10000,3.000000,null,0,null,null,0,0.000000],
  [ influencepat27,26,8, "Invade2",-2,-4,2,2,4,6,0x9,610,
    [ 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
    [ 0x00184800, 0x4010a000, 0x84900000, 0x28100400, 0xa0104000, 0x48180000, 0x04102800, 0x00908400]
    , 0x10000,3.000000,null,0,null,null,0,0.000000],
  [ influencepat28,44,8, "Invade3",-9,-2,0,2,9,4,0x8,679,
    [ 0xffff0000, 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0, 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0, 0xffff0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11010,0.200000,null,0,null,null,0,0.000000],
  [ influencepat29,44,8, "Invade4",-9,-3,0,1,9,4,0x8,642,
    [ 0xfcbc0000, 0x2f3f3f00, 0x00fbffff, 0xf0f0e0f0, 0x3f3f2f3f, 0x00bcfcfc, 0xe0f0f000, 0xfffb0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11010,0.200000,null,0,null,null,0,0.000000],
  [ influencepat30,46,8, "Invade4b",-9,-4,0,0,9,4,0x8,605,
    [ 0xf0b00000, 0x2f3f0000, 0x003a3f3f, 0x00f0e0e0, 0x003f2f2f, 0x00b0f0f0, 0xe0f00000, 0x3f3a0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11010,0.200000,null,0,null,null,0,0.000000],
  [ influencepat31,48,8, "Invade4c",-9,-5,0,0,9,5,0x8,568,
    [ 0xc0b00000, 0x2f300000, 0x003a0f0f, 0x0030e0e0, 0x00302f2f, 0x00b0c0c0, 0xe0300000, 0x0f3a0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11010,0.200000,null,0,null,null,0,0.000000],
  [ influencepat32,34,8, "Invade5",-7,-2,0,2,7,4,0x8,680,
    [ 0xffff0000, 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0, 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0, 0xffff0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.200000,null,0,null,null,0,0.000000],
  [ influencepat33,34,8, "Invade6",-7,-3,0,1,7,4,0x8,643,
    [ 0xfcbc0000, 0x2f3f3f00, 0x00fbffff, 0xf0f0e0f0, 0x3f3f2f3f, 0x00bcfcfc, 0xe0f0f000, 0xfffb0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.200000,null,0,null,null,0,0.000000],
  [ influencepat34,36,8, "Invade6b",-7,-4,0,0,7,4,0x8,606,
    [ 0xf0b00000, 0x2f3f0000, 0x003a3f3f, 0x00f0e0e0, 0x003f2f2f, 0x00b0f0f0, 0xe0f00000, 0x3f3a0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.200000,null,0,null,null,0,0.000000],
  [ influencepat35,38,8, "Invade6c",-7,-5,0,0,7,5,0x8,569,
    [ 0xc0b00000, 0x2f300000, 0x003a0f0f, 0x0030e0e0, 0x00302f2f, 0x00b0c0c0, 0xe0300000, 0x0f3a0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.200000,null,0,null,null,0,0.000000],
  [ influencepat36,45,4, "Invade7a",0,0,6,6,6,6,0x0,798,
    [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.200000,null,0,null,null,0,0.000000],
  [ influencepat37,40,4, "Invade7b",-2,-2,4,4,6,6,0x0,760,
    [ 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.200000,null,0,null,null,0,0.000000],
  [ influencepat38,40,4, "Invade7c",-3,-2,3,4,6,6,0x0,758,
    [ 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.200000,null,0,null,null,0,0.000000],
  [ influencepat39,38,8, "Invade7d",0,0,5,6,5,6,0x2,798,
    [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.200000,null,0,null,null,0,0.000000],
  [ influencepat40,19,8, "Invade8",-4,-2,0,2,4,4,0x9,682,
    [ 0xfffa0000, 0x3f3f2f2f, 0x00bfffff, 0xe0f0f0f0, 0x2f3f3f3f, 0x00faffff, 0xf0f0e0e0, 0xffbf0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x10010,2.000000,null,0,null,null,0,0.000000],
  [ influencepat41,19,8, "Invade9",-4,-3,0,1,4,4,0x9,645,
    [ 0xfcf80000, 0x3f3f2f00, 0x00bfffff, 0xe0f0f0f0, 0x2f3f3f3f, 0x00f8fcfc, 0xf0f0e000, 0xffbf0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x10010,2.000000,null,0,null,null,0,0.000000],
  [ influencepat42,21,4, "Invade10",-4,-4,0,0,4,4,0x9,608,
    [ 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0, 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x10010,2.000000,null,0,null,null,0,0.000000],
  [ influencepat43,32,4, "Invade11",-5,-5,0,0,5,5,0x9,570,
    [ 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0, 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x10010,2.000000,null,0,null,null,0,0.000000],
  [ influencepat44,45,4, "Invade12",-6,-6,0,0,6,6,0x9,532,
    [ 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0, 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x10010,2.000000,null,0,null,null,0,0.000000],
  [ influencepat45,33,8, "Invade13",-1,-2,5,3,6,5,0x8,686,
    [ 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xffffffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.200000,null,0,null,null,0,0.000000],
  [ influencepat46,33,8, "Invade14",-1,-3,5,2,6,5,0x8,686,
    [ 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xffffffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.200000,null,0,null,null,0,0.000000],
  [ influencepat47,33,8, "Invade15",-3,-3,3,2,6,5,0x8,610,
    [ 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x11000,0.400000,null,0,null,null,0,0.000000],
  [ influencepat48,36,8, "Invade16",-6,-2,0,3,6,5,0x9,680,
    [ 0xffff0000, 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0, 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0, 0xffff0000],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x10010,2.000000,null,0,null,null,0,0.000000],
  [ influencepat49,57,8, "Invade17",-3,-3,7,2,10,5,0x9,687,
    [ 0xfdfdffff, 0xffffffd7, 0xffffffff, 0xffffffff, 0xffffffff, 0xfffdfdff, 0xffffff5f, 0xffffffff],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
    , 0x10010,0.500000,null,0,null,null,0,0.000000],
  [null, 0,0,null,0,0,0,0,0,0,0,0,[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],0,0.0,null,0,null,null,0,0.0]
]


const influencepat = data.map(item => new Pattern(item))

export const influencepat_db = new PatternDB([-1, 0, influencepat, null])