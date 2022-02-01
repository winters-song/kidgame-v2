import {PatternDB, Pattern} from "./Patterns";
import {AFFINE_TRANSFORM} from "../Liberty";
import { codes } from "../Constants";

/*

* */

const barrierspat0 = [
[721, 5],	[684, 2],	[758, 2]
]

const barrierspat1 = [
[721, 5],	[720, 5],	[758, 2],	[684, 2],
[757, 4]
]

const barrierspat2 = [
[721, 5],	[758, 1],	[684, 1],	[757, 3],
[759, 3]
]

const barrierspat3 = [
[721, 5],	[720, 5],	[758, 1],	[684, 1],
[757, 0]
]

const barrierspat4 = [
[647, 5],	[684, 2]
]

const barrierspat5 = [
[646, 5],	[721, 1],	[684, 2],	[683, 4]
]

const barrierspat6 = [
[685, 5],	[684, 1]
]

const barrierspat7 = [
[647, 5],	[648, 5],	[684, 1]
]

const barrierspat8 = [
[685, 5],	[721, 1],	[684, 2]
]

const barrierspat9 = [
[722, 5],	[685, 5],	[721, 1],	[684, 1]
]

const barrierspat10 = [
[647, 5],	[685, 5],	[648, 2],	[684, 2]
]

const barrierspat11 = [
[647, 5],	[685, 5],	[648, 1],	[684, 1]
]

const barrierspat12 = [
[722, 5],	[684, 1],	[685, 2],	[721, 2]
]

const barrierspat13 = [
[722, 5],	[721, 1],	[685, 1],	[684, 2]
]

const barrierspat14 = [
[722, 5],	[721, 5],	[759, 2],	[684, 2],
[758, 0]
]

const barrierspat15 = [
[722, 5],	[721, 5],	[758, 1],	[685, 1],
[684, 1],	[759, 1]
]

const barrierspat16 = [
[722, 5],	[721, 5],	[759, 1],	[685, 1],
[684, 1],	[758, 4]
]

const barrierspat17 = [
[722, 5],	[721, 5],	[759, 1],	[684, 1],
[757, 3],	[758, 3],	[686, 3],	[723, 3],
[760, 3]
]

const barrierspat18 = [
[722, 5],	[721, 5],	[759, 1],	[684, 1],
[758, 0]
]

const barrierspat19 = [
[722, 5],	[721, 5],	[758, 1],	[759, 1],
[684, 1]
]

const barrierspat20 = [
[722, 5],	[721, 5],	[759, 1],	[684, 1],
[685, 2],	[758, 0]
]

const barrierspat21 = [
[722, 5],	[721, 5],	[759, 1],	[684, 1],
[685, 2],	[758, 2]
]

const barrierspat22 = [
[758, 5],	[721, 5],	[684, 2],	[795, 2],
[796, 4],	[759, 0]
]

const barrierspat23 = [
[758, 5],	[721, 5],	[684, 2],	[795, 2],
[685, 2],	[796, 4],	[759, 0]
]

const barrierspat24 = [
[721, 5],	[758, 5],	[795, 1],	[684, 1],
[757, 3],	[794, 3],	[756, 3],	[719, 3],
[759, 3],	[796, 3],	[723, 3],	[760, 3]
]

const barrierspat25 = [
[721, 5],	[758, 5],	[795, 1],	[684, 1],
[794, 3],	[796, 3],	[759, 0],	[757, 0]
]

const barrierspat26 = [
[721, 5],	[758, 5],	[722, 5],	[759, 5],
[684, 1],	[795, 1],	[757, 3],	[794, 3],
[831, 3],	[682, 3],	[719, 3],	[832, 3],
[756, 3],	[793, 3],	[796, 3],	[833, 3],
[649, 3],	[686, 3],	[723, 3],	[760, 3],
[797, 3],	[834, 3]
]

const barrierspat27 = [
[722, 5],	[759, 5],	[684, 1],	[795, 1],
[797, 3],	[760, 3],	[796, 3],	[686, 3],
[723, 3],	[758, 0]
]

const barrierspat28 = [
[759, 5],	[721, 5],	[758, 5],	[722, 5],
[684, 2],	[796, 2],	[795, 0]
]

const barrierspat29 = [
[759, 5],	[722, 5],	[686, 2],	[684, 2],
[796, 2],	[795, 0],	[758, 0],	[723, 0],
[760, 0],	[797, 0]
]

const barrierspat30 = [
[721, 5],	[759, 5],	[796, 1],	[684, 1],
[757, 3],	[794, 3],	[719, 3],	[761, 3],
[795, 3],	[797, 3],	[756, 3],	[686, 3],
[723, 3],	[760, 3],	[724, 3],	[758, 0]
]

const barrierspat31 = [
[759, 5],	[721, 5],	[758, 5],	[722, 5],
[684, 1],	[796, 1],	[795, 3]
]

const barrierspat32 = [
[686, 5],	[685, 5],	[684, 2],	[649, 4],
[723, 4]
]

const barrierspat33 = [
[686, 5],	[685, 5],	[684, 1],	[649, 3],
[723, 3]
]

const barrierspat34 = [
[647, 5],	[648, 5],	[685, 1],	[684, 2]
]

const barrierspat35 = [
[685, 5],	[722, 1],	[721, 2],	[684, 2]
]

const barrierspat36 = [
[721, 5],	[723, 5],	[722, 5],	[685, 1],
[684, 2],	[759, 4],	[758, 4],	[760, 4],
[612, 4],	[649, 0],	[686, 0]
]

const barrierspat37 = [
[685, 5],	[723, 5],	[722, 5],	[648, 1],
[684, 2],	[758, 4],	[759, 4],	[760, 4],
[686, 0],	[649, 0]
]

const barrierspat38 = [
[759, 5],	[760, 5],	[684, 1],	[722, 1],
[721, 2],	[797, 4],	[758, 4],	[796, 4],
[795, 4],	[723, 0],	[686, 0]
]

const barrierspat39 = [
[723, 5],	[722, 5],	[684, 1],	[721, 2],
[760, 4],	[759, 4],	[758, 4],	[686, 0]
]

const barrierspat40 = [
[722, 5],	[723, 5],	[759, 1],	[684, 1],
[721, 2],	[758, 2],	[686, 0]
]

const barrierspat41 = [
[686, 5],	[723, 5],	[760, 5],	[722, 5],
[759, 5],	[685, 5],	[684, 2],	[758, 2],
[796, 4],	[649, 4],	[795, 4],	[797, 4]
]

const barrierspat42 = [
[686, 5],	[723, 5],	[760, 5],	[722, 5],
[759, 5],	[685, 5],	[684, 1],	[758, 1],
[796, 3],	[649, 3],	[795, 3],	[797, 3]
]

const barrierspat43 = [
[722, 5],	[760, 5],	[759, 5],	[721, 1],
[684, 2],	[797, 3],	[758, 3],	[796, 3],
[795, 3],	[723, 0],	[686, 0]
]

const barrierspat44 = [
[722, 5],	[685, 5],	[721, 1],	[758, 2],
[684, 2]
]

const barrierspat45 = [
[649, 5],	[686, 5],	[650, 5],	[687, 5],
[684, 2],	[611, 2],	[574, 4],	[724, 4],
[575, 4],	[573, 4],	[610, 4],	[723, 4],
[576, 4],	[613, 0],	[612, 0]
]

const barrierspat46 = [
[649, 5],	[686, 5],	[650, 5],	[687, 5],
[684, 1],	[611, 1],	[574, 3],	[724, 3],
[575, 3],	[573, 3],	[610, 3],	[723, 3],
[576, 3],	[613, 0],	[612, 0]
]

const barrierspat47 = [
[759, 5],	[722, 5],	[758, 1],	[795, 2],
[684, 2],	[796, 2]
]

const barrierspat48 = [
[759, 5],	[722, 5],	[758, 1],	[795, 2],
[684, 2],	[796, 0]
]

const barrierspat49 = [
[722, 5],	[721, 1],	[759, 2],	[684, 2]
]

const barrierspat50 = [
[722, 5],	[760, 5],	[759, 5],	[684, 1],
[795, 2],	[685, 2],	[797, 4],	[796, 4],
[649, 4],	[686, 0],	[723, 0],	[758, 0]
]

const barrierspat51 = [
[685, 5],	[723, 5],	[722, 5],	[684, 1],
[648, 2],	[758, 2],	[760, 4],	[649, 0],
[686, 0],	[759, 0]
]

const barrierspat52 = [
[723, 5],	[760, 5],	[759, 5],	[722, 5],
[685, 1],	[795, 1],	[758, 1],	[684, 1],
[686, 0],	[796, 0],	[797, 0]
]

const barrierspat53 = [
[686, 5],	[723, 5],	[759, 5],	[684, 1],
[648, 2],	[758, 2],	[760, 4],	[649, 0]
]

const barrierspat54 = [
[686, 5],	[723, 5],	[687, 5],	[724, 5],
[761, 5],	[722, 5],	[760, 5],	[759, 5],
[685, 5],	[758, 2],	[684, 2],	[795, 4],
[796, 4],	[612, 4],	[649, 4],	[610, 4],
[832, 4],	[797, 4],	[834, 4],	[613, 4],
[650, 4],	[611, 4],	[833, 4],	[798, 4],
[835, 4]
]

const barrierspat55 = [
[685, 5],	[722, 5],	[686, 5],	[687, 5],
[724, 5],	[761, 5],	[759, 5],	[760, 5],
[723, 5],	[758, 1],	[684, 1],	[610, 3],
[795, 3],	[611, 3],	[609, 3],	[831, 3],
[796, 3],	[833, 3],	[612, 3],	[649, 3],
[832, 3],	[797, 3],	[834, 3],	[613, 3],
[650, 3],	[757, 3],	[794, 3],	[798, 3],
[835, 3]
]

const barrierspat56 = [
[723, 5],	[722, 5],	[685, 5],	[760, 2],
[684, 2],	[686, 0],	[759, 0]
]

const barrierspat57 = [
[723, 5],	[685, 5],	[722, 5],	[760, 2],
[684, 2],	[686, 0]
]

const barrierspat58 = [
[758, 5],	[721, 5],	[684, 2],	[795, 2]
]

const barrierspat59 = [
[649, 5],	[648, 5],	[685, 1],	[684, 2],
[610, 4],	[611, 4],	[759, 0],	[612, 0],
[686, 0],	[723, 0],	[760, 0]
]

const barrierspat60 = [
[686, 5],	[685, 1],	[648, 2],	[722, 2],
[684, 2],	[723, 3],	[649, 0]
]

const barrierspat61 = [
[685, 5],	[722, 5],	[759, 5],	[684, 1],
[758, 1],	[721, 2],	[757, 3],	[794, 3],
[795, 3],	[796, 3],	[649, 0],	[686, 0],
[723, 0],	[760, 0],	[797, 0]
]

const barrierspat62 = [
[759, 5],	[722, 5],	[721, 1],	[795, 2],
[684, 2],	[758, 0],	[796, 0]
]

const barrierspat63 = [
[759, 5],	[760, 5],	[684, 1],	[722, 1],
[721, 2],	[685, 2],	[686, 3],	[758, 4],
[723, 0],	[649, 0]
]

const barrierspat64 = [
[759, 5],	[760, 5],	[684, 1],	[686, 1],
[648, 1],	[685, 2],	[721, 2],	[758, 4],
[649, 0],	[723, 0]
]

const barrierspat65 = [
[721, 5],	[684, 1],	[685, 2]
]

const barrierspat66 = [
[720, 5],	[721, 1],	[758, 2],	[684, 2],
[757, 4]
]

const barrierspat67 = [
[683, 5],	[684, 1],	[721, 2]
]

const barrierspat68 = [
[686, 7],	[687, 7],	[684, 1],	[649, 0],
[723, 0],	[650, 0],	[724, 0]
]

const barrierspat69 = [
[685, 5],	[687, 7],	[686, 7],	[684, 2],
[649, 0],	[723, 0],	[650, 0],	[724, 0]
]

const barrierspat70 = [
[609, 7],	[723, 7],	[572, 7],	[724, 7],
[648, 1],	[684, 2],	[645, 4],	[571, 4],
[756, 4],	[759, 4],	[758, 4],	[757, 4],
[608, 4],	[761, 4],	[760, 4],	[682, 4],
[719, 4],	[574, 0],	[611, 0],	[575, 0],
[612, 0],	[649, 0],	[686, 0],	[573, 0],
[576, 0],	[613, 0],	[650, 0],	[687, 0],
[610, 0]
]

const barrierspat71 = [
[649, 7],	[684, 1],	[722, 2],	[647, 3],
[612, 0],	[611, 0],	[686, 0],	[723, 0]
]

const barrierspat72 = [
[686, 5],	[723, 5],	[685, 5],	[684, 1],
[648, 2],	[759, 0],	[649, 0],	[758, 0],
[760, 0],	[650, 0],	[687, 0],	[724, 0],
[761, 0]
]

const barrierspat73 = [
[685, 5],	[723, 5],	[760, 5],	[722, 5],
[684, 1],	[648, 2],	[759, 0],	[649, 0],
[686, 0],	[758, 0],	[650, 0],	[687, 0],
[724, 0],	[761, 0]
]

const barrierspat74 = [
[686, 5],	[685, 5],	[648, 1],	[684, 2],
[649, 3],	[723, 0]
]

const barrierspat75 = [
[724, 5],	[688, 5],	[687, 5],	[686, 1],
[684, 1],	[723, 2],	[611, 0],	[759, 0],
[796, 0],	[612, 0],	[649, 0],	[760, 0],
[797, 0],	[613, 0],	[650, 0],	[758, 0],
[610, 0],	[761, 0],	[798, 0],	[614, 0],
[651, 0],	[795, 0],	[725, 0],	[762, 0],
[799, 0],	[615, 0],	[652, 0],	[689, 0],
[726, 0],	[763, 0],	[800, 0]
]

const barrierspat76 = [
[648, 5],	[611, 5],	[574, 5],	[537, 2],
[684, 2],	[610, 0],	[573, 0],	[536, 0],
[538, 0],	[575, 0],	[612, 0],	[649, 0],
[686, 0],	[539, 0],	[576, 0],	[613, 0],
[650, 0],	[687, 0]
]

const barrierspat77 = [
[573, 7],	[610, 7],	[683, 1],	[684, 2],
[682, 3],	[609, 0],	[572, 0]
]

const barrierspat78 = [
[646, 7],	[609, 7],	[683, 1],	[684, 2],
[682, 3],	[610, 0]
]

const barrierspat79 = [
[647, 7],	[683, 1],	[572, 1],	[684, 2],
[682, 3],	[608, 3],	[645, 3],	[571, 3],
[573, 0],	[610, 0],	[609, 0]
]

const barrierspat80 = [
[610, 7],	[572, 1],	[683, 1],	[684, 2],
[608, 3],	[571, 3],	[645, 3],	[682, 3],
[573, 0],	[609, 0]
]

const barrierspat81 = [
[609, 7],	[572, 7],	[683, 1],	[684, 2],
[682, 3],	[608, 3],	[645, 3],	[571, 3],
[573, 0],	[610, 0]
]

const barrierspat82 = [
[611, 7],	[574, 7],	[609, 1],	[684, 2],
[572, 3],	[573, 0],	[610, 0]
]

const barrierspat83 = [
[611, 7],	[574, 7],	[646, 1],	[684, 2],
[572, 3],	[609, 3],	[573, 0],	[610, 0]
]

const barrierspat84 = [
[685, 7],	[649, 7],	[648, 7],	[758, 1],
[722, 1],	[647, 1],	[721, 2],	[684, 2],
[759, 0],	[686, 0],	[723, 0],	[760, 0]
]

const barrierspat85 = [
[649, 7],	[648, 7],	[610, 1],	[721, 1],
[685, 1],	[684, 2],	[612, 0],	[611, 0],
[686, 0],	[723, 0]
]

const barrierspat86 = [
[648, 7],	[685, 1],	[721, 1],	[684, 2]
]

const barrierspat87 = [
[722, 7],	[685, 7],	[648, 1],	[721, 1],
[684, 2],	[649, 3],	[686, 0],	[723, 0]
]

const barrierspat88 = [
[722, 7],	[685, 7],	[721, 1],	[684, 2]
]

const barrierspat89 = [
[721, 7],	[758, 7],	[757, 1],	[722, 1],
[683, 1],	[684, 2],	[759, 0]
]

const barrierspat90 = [
[722, 7],	[721, 7],	[720, 1],	[685, 1],
[684, 2]
]

const barrierspat91 = [
[722, 7],	[683, 1],	[721, 1],	[684, 2]
]

const barrierspat92 = [
[610, 7],	[573, 7],	[646, 1],	[683, 2],
[684, 2],	[645, 3],	[608, 3],	[571, 3],
[572, 0],	[609, 0]
]

const barrierspat93 = [
[686, 7],	[685, 1],	[684, 2],	[649, 0],
[723, 0],	[650, 0],	[687, 0],	[724, 0]
]

const barrierspat94 = [
[647, 7],	[722, 7],	[721, 7],	[648, 7],
[685, 1],	[684, 2],	[649, 0],	[686, 0],
[723, 0],	[650, 0],	[687, 0],	[724, 0]
]

const barrierspat95 = [
[722, 7],	[685, 1],	[684, 2],	[647, 4],
[721, 4],	[649, 0],	[686, 0],	[723, 0]
]

const barrierspat96 = [
[649, 7],	[648, 7],	[575, 1],	[574, 1],
[685, 1],	[610, 2],	[684, 2],	[612, 0],
[611, 0],	[686, 0],	[723, 0],	[576, 0],
[613, 0],	[650, 0],	[687, 0],	[724, 0]
]

const barrierspat97 = [
[687, 7],	[686, 7],	[685, 7],	[648, 1],
[722, 1],	[684, 2],	[721, 2],	[649, 0],
[723, 0],	[760, 0],	[650, 0],	[759, 0],
[724, 0],	[761, 0]
]

const barrierspat98 = [
[649, 7],	[685, 1],	[723, 1],	[684, 2],
[722, 2],	[686, 0]
]

const barrierspat99 = [
[722, 7],	[721, 7],	[685, 7],	[760, 1],
[684, 2],	[723, 3],	[686, 0],	[758, 0],
[759, 0]
]

const barrierspat100 = [
[722, 7],	[721, 7],	[686, 1],	[760, 1],
[684, 2],	[723, 3],	[759, 0],	[758, 0]
]

const barrierspat101 = [
[758, 7],	[721, 7],	[723, 1],	[719, 1],
[684, 2],	[756, 3],	[686, 3],	[760, 3],
[682, 3],	[759, 0],	[757, 0]
]

const barrierspat102 = [
[721, 7],	[723, 1],	[683, 1],	[684, 2],
[760, 3],	[686, 3],	[759, 0],	[758, 0],
[757, 0]
]

const barrierspat103 = [
[721, 7],	[722, 7],	[685, 1],	[648, 2],
[684, 2]
]

const barrierspat104 = [
[722, 7],	[758, 1],	[684, 2],	[686, 3],
[759, 0],	[723, 0],	[760, 0]
]

const barrierspat105 = [
[721, 7],	[757, 1],	[684, 2],	[758, 0],
[759, 0]
]

const barrierspat106 = [
[723, 7],	[758, 1],	[684, 2],	[759, 0],
[686, 0],	[760, 0]
]

const barrierspat107 = [
[722, 7],	[759, 7],	[684, 2],	[758, 0]
]

const barrierspat108 = [
[721, 7],	[758, 7],	[683, 2],	[684, 2],
[757, 0]
]

const barrierspat109 = [
[609, 7],	[646, 7],	[610, 7],	[647, 1],
[720, 2],	[684, 2],	[611, 0],	[612, 0],
[649, 0],	[686, 0],	[723, 0]
]

const barrierspat110 = [
[609, 7],	[646, 7],	[722, 7],	[685, 1],
[647, 1],	[684, 2],	[720, 2],	[610, 0],
[611, 0],	[612, 0],	[649, 0],	[686, 0],
[723, 0]
]

const barrierspat111 = [
[723, 7],	[722, 7],	[684, 2],	[759, 0],
[686, 0],	[758, 0],	[760, 0],	[687, 0],
[724, 0],	[761, 0]
]

const barrierspat112 = [
[686, 7],	[685, 7],	[722, 1],	[684, 2],
[611, 3],	[612, 0],	[649, 0],	[723, 0],
[613, 0],	[650, 0],	[687, 0],	[724, 0]
]

const barrierspat113 = [
[723, 7],	[687, 7],	[686, 7],	[684, 2],
[719, 4],	[757, 4],	[645, 4],	[682, 4],
[756, 4],	[758, 4],	[759, 0],	[649, 0],
[760, 0],	[650, 0],	[724, 0],	[761, 0]
]

const barrierspat114 = [
[723, 7],	[687, 7],	[686, 7],	[647, 1],
[684, 2],	[757, 4],	[719, 4],	[682, 4],
[756, 4],	[758, 4],	[645, 4],	[759, 0],
[649, 0],	[760, 0],	[650, 0],	[724, 0],
[761, 0]
]

const barrierspat115 = [
[686, 7],	[759, 1],	[684, 2],	[758, 4],
[649, 0],	[723, 0],	[760, 0]
]

const barrierspat116 = [
[686, 7],	[722, 7],	[685, 7],	[647, 1],
[684, 2],	[649, 0],	[723, 0],	[687, 0]
]

const barrierspat117 = [
[685, 7],	[647, 1],	[684, 2],	[686, 0]
]

const barrierspat118 = [
[685, 7],	[721, 1],	[647, 1],	[683, 2],
[684, 2],	[686, 0]
]

const barrierspat119 = [
[685, 7],	[721, 1],	[647, 1],	[684, 2],
[686, 0]
]

const barrierspat120 = [
[685, 7],	[687, 7],	[686, 7],	[722, 1],
[648, 1],	[646, 1],	[684, 2],	[574, 0],
[611, 0],	[610, 0],	[572, 0],	[609, 0],
[575, 0],	[612, 0],	[649, 0],	[723, 0],
[576, 0],	[613, 0],	[650, 0],	[573, 0],
[724, 0]
]

const barrierspat121 = [
[721, 7],	[685, 1],	[720, 1],	[684, 2]
]

const barrierspat122 = [
[721, 7],	[722, 1],	[720, 1],	[684, 2]
]

const barrierspat123 = [
[647, 7],	[646, 1],	[684, 2]
]

const barrierspat124 = [
[722, 7],	[721, 7],	[720, 1],	[759, 1],
[684, 2],	[757, 3],	[758, 0]
]

const barrierspat125 = [
[720, 7],	[683, 1],	[684, 2]
]

const barrierspat126 = [
[721, 7],	[720, 7],	[683, 1],	[684, 2]
]

const barrierspat127 = [
[648, 7],	[685, 1],	[647, 1],	[684, 2],
[646, 2],	[611, 0],	[610, 0],	[612, 0],
[649, 0],	[686, 0],	[723, 0]
]

const barrierspat128 = [
[648, 7],	[611, 7],	[646, 1],	[647, 1],
[683, 2],	[684, 2],	[573, 0],	[610, 0]
]

const barrierspat129 = [
[648, 7],	[611, 7],	[647, 1],	[684, 2],
[610, 0]
]

const barrierspat130 = [
[611, 7],	[648, 7],	[683, 1],	[647, 1],
[684, 2],	[609, 0],	[610, 0]
]

const barrierspat131 = [
[648, 7],	[685, 1],	[610, 1],	[684, 2],
[611, 0],	[612, 0],	[649, 0],	[686, 0],
[723, 0]
]

const barrierspat132 = [
[722, 7],	[648, 7],	[685, 1],	[684, 2],
[758, 3],	[761, 3],	[760, 3],	[612, 3],
[610, 3],	[613, 3],	[611, 0],	[686, 0],
[723, 0],	[759, 0],	[650, 0],	[687, 0],
[724, 0],	[649, 0]
]

const barrierspat133 = [
[794, 7],	[756, 1],	[684, 2],	[757, 0],
[793, 0],	[831, 0],	[758, 0],	[795, 0],
[832, 0]
]

const barrierspat134 = [
[758, 7],	[759, 1],	[684, 2],	[719, 3],
[757, 0],	[756, 0]
]

const barrierspat135 = [
[685, 7],	[722, 7],	[721, 1],	[647, 1],
[684, 2]
]

const barrierspat136 = [
[758, 7],	[721, 1],	[684, 2],	[757, 0],
[759, 0]
]

const barrierspat137 = [
[686, 7],	[648, 1],	[722, 1],	[684, 2],
[649, 0],	[723, 0]
]

const barrierspat138 = [
[648, 7],	[722, 7],	[647, 1],	[721, 1],
[685, 1],	[683, 2],	[684, 2]
]

const barrierspat139 = [
[721, 7],	[683, 1],	[722, 1],	[684, 2],
[757, 3],	[758, 0],	[759, 0]
]

const barrierspat140 = [
[758, 7],	[720, 7],	[683, 1],	[721, 1],
[684, 2],	[757, 0]
]

const barrierspat141 = [
[611, 7],	[647, 1],	[683, 1],	[684, 2],
[610, 0],	[609, 0]
]

const barrierspat142 = [
[610, 7],	[609, 7],	[684, 2],	[645, 3],
[608, 3],	[571, 3],	[572, 0],	[573, 0]
]

const barrierspat143 = [
[572, 7],	[573, 7],	[684, 2],	[571, 3],
[645, 3],	[608, 3],	[610, 0],	[609, 0]
]

const barrierspat144 = [
[647, 7],	[683, 1],	[648, 1],	[684, 2]
]

const barrierspat145 = [
[722, 7],	[723, 7],	[685, 1],	[647, 1],
[609, 1],	[646, 2],	[684, 2],	[610, 0],
[649, 0],	[686, 0],	[611, 0]
]

const barrierspat146 = [
[682, 7],	[681, 7],	[757, 1],	[683, 1],
[647, 1],	[684, 2],	[721, 2],	[756, 3],
[755, 3],	[644, 3],	[718, 3],	[645, 0],
[719, 0]
]

const barrierspat147 = [
[722, 7],	[648, 1],	[684, 2],	[686, 2],
[647, 2],	[649, 2]
]

const barrierspat148 = [
[719, 7],	[721, 1],	[683, 1],	[758, 1],
[684, 2],	[722, 2],	[685, 2],	[645, 0],
[757, 0],	[682, 0]
]

const barrierspat149 = [
[648, 7],	[685, 1],	[683, 1],	[722, 2],
[684, 2]
]

const barrierspat150 = [
[796, 7],	[685, 1],	[794, 1],	[720, 1],
[721, 1],	[683, 2],	[756, 2],	[684, 2],
[719, 2],	[682, 4],	[645, 0],	[758, 0],
[795, 0],	[757, 0],	[759, 0]
]

const barrierspat151 = [
[685, 1],	[759, 1],	[758, 2],	[684, 2]
]

const barrierspat152 = [
[685, 1],	[759, 1],	[684, 2],	[758, 0]
]

const barrierspat153 = [
[684, 1],	[759, 2],	[685, 2],	[758, 0]
]

const barrierspat154 = [
[685, 1],	[684, 2],	[612, 2],	[649, 3],
[611, 3]
]

const barrierspat155 = [
[612, 1],	[684, 1],	[685, 2],	[649, 4],
[611, 4]
]

const barrierspat156 = [
[685, 1],	[684, 2]
]

const barrierspat157 = [
[686, 1],	[684, 2],	[649, 3]
]

const barrierspat158 = [
[684, 1],	[686, 2],	[649, 4]
]

const barrierspat159 = [
[684, 1],	[722, 2]
]

const barrierspat160 = [
[684, 1],	[722, 2]
]

const barrierspat161 = [
[684, 1],	[722, 2],	[610, 0],	[611, 0]
]

const barrierspat162 = [
[684, 1],	[721, 2]
]

const barrierspat163 = [
[684, 1],	[721, 2]
]

const barrierspat164 = [
[574, 1],	[684, 1],	[649, 2],	[612, 4],
[611, 0],	[573, 0],	[610, 0]
]

const barrierspat165 = [
[684, 1],	[758, 1],	[721, 2],	[756, 3],
[757, 0],	[682, 0],	[719, 0]
]

const barrierspat166 = [
[686, 1],	[685, 1],	[721, 1],	[648, 2],
[684, 2],	[649, 0],	[723, 0]
]

const barrierspat167 = [
[684, 2]
]

const barrierspat168 = [
[684, 1]
]

const barrierspat169 = [
[721, 1],	[684, 2],	[682, 0]
]

const barrierspat170 = [
[721, 1],	[684, 2],	[719, 0],	[681, 0],
[682, 0]
]

const barrierspat171 = [
[684, 1],	[686, 1],	[649, 2]
]

const barrierspat172 = [
[684, 1],	[722, 1],	[721, 2]
]

const barrierspat173 = [
[685, 1],	[722, 2],	[684, 2]
]

const barrierspat174 = [
[684, 1],	[759, 2],	[721, 2],	[758, 4]
]

const barrierspat175 = [
[684, 1],	[721, 2],	[759, 2],	[758, 4],
[610, 0],	[611, 0]
]

const barrierspat176 = [
[684, 1],	[685, 2]
]

const barrierspat177 = [
[684, 1],	[685, 2]
]

const barrierspat178 = [
[684, 1],	[648, 2]
]

const barrierspat179 = [
[684, 1],	[648, 2]
]

const barrierspat180 = [
[684, 2]
]

const barrierspat181 = [
[684, 1]
]

const barrierspat182 = [
[684, 1],	[721, 2]
]

const barrierspat183 = [
[648, 1],	[684, 1],	[686, 1],	[649, 2],
[611, 2]
]

const barrierspat184 = [
[684, 2],	[758, 0]
]

const barrierspat185 = [
[684, 2]
]

const barrierspat186 = [
[648, 1],	[721, 2],	[684, 2],	[758, 0],
[759, 0]
]

const barrierspat187 = [
[684, 1],	[721, 1],	[648, 2],	[758, 0],
[759, 0]
]

const barrierspat188 = [
[684, 1],	[721, 1],	[758, 1],	[648, 2],
[795, 0],	[759, 0],	[796, 0]
]

const barrierspat189 = [
[612, 1],	[684, 2],	[610, 0],	[611, 0],
[649, 0],	[686, 0]
]

const barrierspat190 = [
[684, 1],	[760, 1],	[758, 2],	[759, 0],
[686, 0],	[723, 0]
]

const barrierspat191 = [
[648, 1],	[686, 2],	[684, 2],	[685, 2],
[649, 3],	[610, 3],	[612, 0],	[611, 0]
]

const barrierspat192 = [
[685, 1],	[684, 2],	[610, 0],	[611, 0]
]

const barrierspat193 = [
[759, 1],	[721, 1],	[684, 2],	[722, 2],
[723, 4],	[686, 0]
]

const barrierspat194 = [
[684, 1],	[722, 1],	[759, 2],	[723, 3],
[686, 0]
]

const barrierspat195 = [
[759, 1],	[721, 1],	[684, 2],	[722, 2],
[760, 2],	[723, 0],	[686, 0]
]

const barrierspat196 = [
[684, 1],	[760, 1],	[722, 1],	[759, 2],
[758, 2],	[686, 0],	[723, 0]
]

const barrierspat197 = [
[685, 1],	[684, 1],	[648, 2],	[649, 0],
[686, 0],	[723, 0],	[650, 0],	[687, 0],
[724, 0]
]

const barrierspat198 = [
[611, 1],	[686, 1],	[684, 2],	[722, 2],
[612, 0],	[649, 0]
]

const barrierspat199 = [
[721, 1],	[684, 2],	[722, 2]
]

const barrierspat200 = [
[759, 1],	[760, 1],	[721, 1],	[686, 2],
[684, 2],	[648, 2],	[758, 3],	[649, 4],
[723, 0]
]

const barrierspat201 = [
[796, 1],	[721, 1],	[758, 1],	[684, 2],
[759, 2],	[722, 2],	[833, 3],	[795, 3],
[686, 0],	[723, 0],	[760, 0],	[797, 0],
[834, 0]
]

const barrierspat202 = [
[722, 1],	[758, 1],	[684, 2],	[759, 0]
]

const barrierspat203 = [
[684, 1],	[612, 1],	[687, 1],	[611, 2],
[649, 0],	[686, 0],	[723, 0],	[650, 0]
]

const barrierspat204 = [
[684, 1],	[832, 1],	[794, 4],	[757, 4],
[758, 0],	[795, 0]
]

const barrierspat205 = [
[722, 1],	[684, 2],	[759, 2],	[758, 0]
]

const barrierspat206 = [
[722, 1],	[684, 2],	[649, 0],	[686, 0]
]

const barrierspat207 = [
[611, 1],	[684, 2],	[649, 0],	[686, 0]
]

const barrierspat208 = [
[685, 1],	[723, 1],	[686, 2],	[684, 2],
[649, 0]
]

const barrierspat209 = [
[722, 1],	[759, 2],	[684, 2],	[723, 0]
]

const barrierspat210 = [
[722, 1],	[759, 2],	[758, 2],	[684, 2],
[723, 0]
]

const barrierspat211 = [
[721, 1],	[684, 2],	[758, 0],	[759, 0],
[686, 0],	[723, 0],	[760, 0]
]

const barrierspat212 = [
[684, 1],	[611, 2]
]

const barrierspat213 = [
[684, 1],	[758, 2],	[722, 2],	[757, 0],
[759, 0]
]

const barrierspat214 = [
[648, 1],	[684, 1],	[685, 2],	[611, 0],
[610, 0],	[612, 0],	[649, 0],	[686, 0]
]

const barrierspat215 = [
[684, 1],	[832, 1],	[758, 2],	[795, 2],
[721, 2],	[833, 3],	[759, 0],	[796, 0]
]

const barrierspat216 = [
[648, 1],	[758, 1],	[721, 2],	[684, 2],
[723, 2],	[686, 2],	[759, 0]
]

const barrierspat217 = [
[611, 1],	[723, 1],	[684, 2],	[721, 2],
[686, 2]
]


const autohelperbarrierspat3 = function (trans, move, color, action){
  const a = AFFINE_TRANSFORM(720, trans, move);
  const b = AFFINE_TRANSFORM(719, trans, move);
  const c = AFFINE_TRANSFORM(683, trans, move);
  const d = AFFINE_TRANSFORM(757, trans, move);

  return !(this.play_break_through_n(color, 2, a, b, c, b, d)=== codes.WIN);

}
const autohelperbarrierspat4 = function (trans, move, color, action){}
const autohelperbarrierspat5 = function (trans, move, color, action){}
const autohelperbarrierspat7 = function (trans, move, color, action){}
const autohelperbarrierspat8 = function (trans, move, color, action){}

const autohelperbarrierspat13 = function (trans, move, color, action){}
const autohelperbarrierspat16 = function (trans, move, color, action){}
const autohelperbarrierspat18 = function (trans, move, color, action){}
const autohelperbarrierspat19 = function (trans, move, color, action){}
const autohelperbarrierspat20 = function (trans, move, color, action){}
const autohelperbarrierspat21 = function (trans, move, color, action){}
const autohelperbarrierspat22 = function (trans, move, color, action){}
const autohelperbarrierspat23 = function (trans, move, color, action){}
const autohelperbarrierspat25 = function (trans, move, color, action){}
const autohelperbarrierspat27 = function (trans, move, color, action){}
const autohelperbarrierspat28 = function (trans, move, color, action){}
const autohelperbarrierspat31 = function (trans, move, color, action){}
const autohelperbarrierspat34 = function (trans, move, color, action){}
const autohelperbarrierspat35 = function (trans, move, color, action){}
const autohelperbarrierspat38 = function (trans, move, color, action){}
const autohelperbarrierspat40 = function (trans, move, color, action){}
const autohelperbarrierspat43 = function (trans, move, color, action){}
const autohelperbarrierspat44 = function (trans, move, color, action){}
const autohelperbarrierspat47 = function (trans, move, color, action){}
const autohelperbarrierspat48 = function (trans, move, color, action){}
const autohelperbarrierspat49 = function (trans, move, color, action){}
const autohelperbarrierspat51 = function (trans, move, color, action){}
const autohelperbarrierspat59 = function (trans, move, color, action){}
const autohelperbarrierspat61 = function (trans, move, color, action){}
const autohelperbarrierspat62 = function (trans, move, color, action){}
const autohelperbarrierspat63 = function (trans, move, color, action){}
const autohelperbarrierspat64 = function (trans, move, color, action){}
const autohelperbarrierspat65 = function (trans, move, color, action){}
const autohelperbarrierspat66 = function (trans, move, color, action){}
const autohelperbarrierspat67 = function (trans, move, color, action){}
const autohelperbarrierspat73 = function (trans, move, color, action){}
const autohelperbarrierspat74 = function (trans, move, color, action){}
const autohelperbarrierspat77 = function (trans, move, color, action){}
const autohelperbarrierspat78 = function (trans, move, color, action){}
const autohelperbarrierspat79 = function (trans, move, color, action){}
const autohelperbarrierspat80 = function (trans, move, color, action){}

const autohelperbarrierspat81 = function (trans, move, color, action){}
const autohelperbarrierspat82 = function (trans, move, color, action){}
const autohelperbarrierspat83 = function (trans, move, color, action){}
const autohelperbarrierspat84 = function (trans, move, color, action){}
const autohelperbarrierspat85 = function (trans, move, color, action){}
const autohelperbarrierspat86 = function (trans, move, color, action){}
const autohelperbarrierspat87 = function (trans, move, color, action){}
const autohelperbarrierspat88 = function (trans, move, color, action){}
const autohelperbarrierspat89 = function (trans, move, color, action){}
const autohelperbarrierspat90 = function (trans, move, color, action){}
const autohelperbarrierspat91 = function (trans, move, color, action){}
const autohelperbarrierspat92 = function (trans, move, color, action){}
const autohelperbarrierspat93 = function (trans, move, color, action){}
const autohelperbarrierspat94 = function (trans, move, color, action){}
const autohelperbarrierspat95 = function (trans, move, color, action){}
const autohelperbarrierspat96 = function (trans, move, color, action){}
const autohelperbarrierspat97 = function (trans, move, color, action){}
const autohelperbarrierspat98 = function (trans, move, color, action){}

const autohelperbarrierspat102 = function (trans, move, color, action){}
const autohelperbarrierspat103 = function (trans, move, color, action){}
const autohelperbarrierspat104 = function (trans, move, color, action){}
const autohelperbarrierspat105 = function (trans, move, color, action){}
const autohelperbarrierspat106 = function (trans, move, color, action){}
const autohelperbarrierspat107 = function (trans, move, color, action){}
const autohelperbarrierspat108 = function (trans, move, color, action){}
const autohelperbarrierspat112 = function (trans, move, color, action){}
const autohelperbarrierspat114 = function (trans, move, color, action){}
const autohelperbarrierspat115 = function (trans, move, color, action){}
const autohelperbarrierspat116 = function (trans, move, color, action){}
const autohelperbarrierspat117 = function (trans, move, color, action){}
const autohelperbarrierspat119 = function (trans, move, color, action){}

const autohelperbarrierspat120 = function (trans, move, color, action){}
const autohelperbarrierspat121 = function (trans, move, color, action){}
const autohelperbarrierspat122 = function (trans, move, color, action){}
const autohelperbarrierspat123 = function (trans, move, color, action){}
const autohelperbarrierspat124 = function (trans, move, color, action){}
const autohelperbarrierspat125 = function (trans, move, color, action){}
const autohelperbarrierspat126 = function (trans, move, color, action){}
const autohelperbarrierspat127 = function (trans, move, color, action){}
const autohelperbarrierspat128 = function (trans, move, color, action){}
const autohelperbarrierspat129 = function (trans, move, color, action){}

const autohelperbarrierspat130 = function (trans, move, color, action){}
const autohelperbarrierspat131 = function (trans, move, color, action){}
const autohelperbarrierspat132 = function (trans, move, color, action){}
const autohelperbarrierspat133 = function (trans, move, color, action){}
const autohelperbarrierspat135 = function (trans, move, color, action){}
const autohelperbarrierspat136 = function (trans, move, color, action){}
const autohelperbarrierspat137 = function (trans, move, color, action){}
const autohelperbarrierspat138 = function (trans, move, color, action){}
const autohelperbarrierspat139 = function (trans, move, color, action){}

const autohelperbarrierspat140 = function (trans, move, color, action){}
const autohelperbarrierspat141 = function (trans, move, color, action){}
const autohelperbarrierspat142 = function (trans, move, color, action){}
const autohelperbarrierspat143 = function (trans, move, color, action){}
const autohelperbarrierspat144 = function (trans, move, color, action){}
const autohelperbarrierspat145 = function (trans, move, color, action){}
const autohelperbarrierspat146 = function (trans, move, color, action){}
const autohelperbarrierspat148 = function (trans, move, color, action){}
const autohelperbarrierspat149 = function (trans, move, color, action){}

const autohelperbarrierspat150 = function (trans, move, color, action){}
const autohelperbarrierspat151 = function (trans, move, color, action){}
const autohelperbarrierspat152 = function (trans, move, color, action){}
const autohelperbarrierspat153 = function (trans, move, color, action){}
const autohelperbarrierspat154 = function (trans, move, color, action){}
const autohelperbarrierspat155 = function (trans, move, color, action){}
const autohelperbarrierspat156 = function (trans, move, color, action){}
const autohelperbarrierspat157 = function (trans, move, color, action){}
const autohelperbarrierspat158 = function (trans, move, color, action){}
const autohelperbarrierspat159 = function (trans, move, color, action){}

const autohelperbarrierspat160 = function (trans, move, color, action){}
const autohelperbarrierspat161 = function (trans, move, color, action){}
const autohelperbarrierspat162 = function (trans, move, color, action){}
const autohelperbarrierspat163 = function (trans, move, color, action){}
const autohelperbarrierspat164 = function (trans, move, color, action){}
const autohelperbarrierspat165 = function (trans, move, color, action){}
const autohelperbarrierspat166 = function (trans, move, color, action){}
const autohelperbarrierspat167 = function (trans, move, color, action){}
const autohelperbarrierspat168 = function (trans, move, color, action){}
const autohelperbarrierspat169 = function (trans, move, color, action){}

const autohelperbarrierspat170 = function (trans, move, color, action){}
const autohelperbarrierspat171 = function (trans, move, color, action){}
const autohelperbarrierspat172 = function (trans, move, color, action){}
const autohelperbarrierspat173 = function (trans, move, color, action){}
const autohelperbarrierspat174 = function (trans, move, color, action){}
const autohelperbarrierspat175 = function (trans, move, color, action){}
const autohelperbarrierspat176 = function (trans, move, color, action){}
const autohelperbarrierspat177 = function (trans, move, color, action){}
const autohelperbarrierspat178 = function (trans, move, color, action){}
const autohelperbarrierspat179 = function (trans, move, color, action){}

const autohelperbarrierspat180 = function (trans, move, color, action){}
const autohelperbarrierspat181 = function (trans, move, color, action){}
const autohelperbarrierspat182 = function (trans, move, color, action){}
const autohelperbarrierspat183 = function (trans, move, color, action){}
const autohelperbarrierspat184 = function (trans, move, color, action){}
const autohelperbarrierspat185 = function (trans, move, color, action){}
const autohelperbarrierspat186 = function (trans, move, color, action){}
const autohelperbarrierspat187 = function (trans, move, color, action){}
const autohelperbarrierspat188 = function (trans, move, color, action){}
const autohelperbarrierspat189 = function (trans, move, color, action){}


const autohelperbarrierspat190 = function (trans, move, color, action){}
const autohelperbarrierspat191 = function (trans, move, color, action){}
const autohelperbarrierspat192 = function (trans, move, color, action){}
const autohelperbarrierspat193 = function (trans, move, color, action){}
const autohelperbarrierspat194 = function (trans, move, color, action){}
const autohelperbarrierspat195 = function (trans, move, color, action){}
const autohelperbarrierspat196 = function (trans, move, color, action){}
const autohelperbarrierspat197 = function (trans, move, color, action){}
const autohelperbarrierspat198 = function (trans, move, color, action){}
const autohelperbarrierspat199 = function (trans, move, color, action){}

const autohelperbarrierspat200 = function (trans, move, color, action){}
const autohelperbarrierspat201 = function (trans, move, color, action){}
const autohelperbarrierspat202 = function (trans, move, color, action){}
const autohelperbarrierspat203 = function (trans, move, color, action){}
const autohelperbarrierspat204 = function (trans, move, color, action){}
const autohelperbarrierspat205 = function (trans, move, color, action){}
const autohelperbarrierspat206 = function (trans, move, color, action){}
const autohelperbarrierspat207 = function (trans, move, color, action){}
const autohelperbarrierspat208 = function (trans, move, color, action){}
const autohelperbarrierspat209 = function (trans, move, color, action){}

const autohelperbarrierspat210 = function (trans, move, color, action){}
const autohelperbarrierspat211 = function (trans, move, color, action){}
const autohelperbarrierspat212 = function (trans, move, color, action){}
const autohelperbarrierspat213 = function (trans, move, color, action){}
const autohelperbarrierspat214 = function (trans, move, color, action){}
const autohelperbarrierspat215 = function (trans, move, color, action){}
const autohelperbarrierspat216 = function (trans, move, color, action){}
const autohelperbarrierspat217 = function (trans, move, color, action){}


const data = [
  [barrierspat0,3,2, "Barrier1",0,0,0,2,0,2,0x0,684,
  [ 0x003f0000, 0x00303030, 0x00f00000, 0x30300000, 0x30300000, 0x003f0000, 0x00303030, 0x00f00000],
  [ 0x00110000, 0x00100010, 0x00100000, 0x00100000, 0x00100000, 0x00110000, 0x00100010, 0x00100000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat1,5,4, "Barrier1b",-1,0,0,2,1,2,0x0,685,
  [ 0x2e3f0000, 0x00383c38, 0x00f0e000, 0xf0b00000, 0x3c380000, 0x003f2e00, 0x00b0f0b0, 0xe0f00000],
  [ 0x00110000, 0x00100010, 0x00100000, 0x00100000, 0x00100000, 0x00110000, 0x00100010, 0x00100000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat2,5,2, "Barrier2",-1,0,1,2,2,2,0x0,685,
  [ 0x153f1500, 0x00747474, 0x50f05000, 0x74740000, 0x74740000, 0x153f1500, 0x00747474, 0x50f05000],
  [ 0x00220000, 0x00200020, 0x00200000, 0x00200000, 0x00200000, 0x00220000, 0x00200020, 0x00200000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat3,5,4, "Barrier3",-1,0,0,2,1,2,0x0,685,
  [ 0x3f3f0000, 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0, 0xf0f00000],
  [ 0x00220000, 0x00200020, 0x00200000, 0x00200000, 0x00200000, 0x00220000, 0x00200020, 0x00200000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat3,3,5.000000],
[barrierspat4,2,4, "Barrier4a",0,-1,0,0,0,1,0x8,721,
  [ 0x00f00000, 0x30300000, 0x003c0000, 0x00303000, 0x00303000, 0x00f00000, 0x30300000, 0x003c0000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat4,0,1.000000],
[barrierspat5,4,8, "Barrier4b",-1,-1,0,1,1,2,0x8,722,
  [ 0xe0fc0000, 0x3c383000, 0x00fc2c00, 0x30b0f000, 0x30383c00, 0x00fce000, 0xf0b03000, 0x2cfc0000],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x41,0.000000,null,1,null,autohelperbarrierspat5,0,1.000000],
[barrierspat6,2,4, "Barrier5",0,-1,1,1,1,2,0x2,721,
  [ 0x00747400, 0x50f05000, 0x74740000, 0x143c1400, 0x50f05000, 0x74740000, 0x143c1400, 0x00747400],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat7,3,8, "Barrier6",0,-1,1,0,1,1,0x2,721,
  [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat7,3,4.800000],
[barrierspat8,3,8, "Barrier6b",0,0,1,1,1,1,0x2,684,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat8,0,1.000000],
[barrierspat9,4,4, "Barrier7",0,0,1,1,1,1,0x2,684,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00280000, 0x00202000, 0x00a00000, 0x20200000, 0x20200000, 0x00280000, 0x00202000, 0x00a00000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat10,4,2, "Barrier8",0,-1,1,0,1,1,0x0,721,
  [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
  [ 0x00104000, 0x40100000, 0x04100000, 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x00100400]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat11,4,2, "Barrier9",0,-1,1,0,1,1,0x0,721,
  [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
  [ 0x00208000, 0x80200000, 0x08200000, 0x00200800, 0x00208000, 0x80200000, 0x08200000, 0x00200800]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat12,4,4, "Barrier10",0,0,1,1,1,1,0x0,684,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00241000, 0x00601000, 0x10600000, 0x10240000, 0x10600000, 0x10240000, 0x00241000, 0x00601000]
  , 0x40,0.000000,null,0,null,null,3,0.000000],
[barrierspat13,4,4, "Barrier11",0,0,1,1,1,1,0x0,684,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00182000, 0x00902000, 0x20900000, 0x20180000, 0x20900000, 0x20180000, 0x00182000, 0x00902000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat13,0,2.800000],
[barrierspat14,5,8, "Barrier12",0,0,1,2,1,2,0x0,684,
  [ 0x003f0f00, 0x0030f0f0, 0xc0f00000, 0x3c300000, 0xf0300000, 0x0f3f0000, 0x00303c3c, 0x00f0c000],
  [ 0x00100100, 0x00100040, 0x00100000, 0x00100000, 0x00100000, 0x01100000, 0x00100004, 0x00100000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat15,6,2, "Barrier13",0,0,1,2,1,2,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00222200, 0x00a000a0, 0x20200000, 0x00280000, 0x00a00000, 0x22220000, 0x00280028, 0x00202000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat16,6,8, "Barrier14",0,0,1,2,1,2,0x0,684,
  [ 0x003e3f00, 0x00f0f0e0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3e0000, 0x003c3c2c, 0x00f0f000],
  [ 0x00202200, 0x00a00080, 0x20200000, 0x00280000, 0x00a00000, 0x22200000, 0x00280008, 0x00202000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat16,3,3.000000],
[barrierspat17,9,8, "Barrier15",-1,0,2,2,3,2,0x0,685,
  [ 0x153d1f15, 0x0074f4d4, 0xd0f05000, 0x7d750000, 0xf4740000, 0x1f3d1500, 0x00757d5d, 0x50f0d050],
  [ 0x00200200, 0x00200080, 0x00200000, 0x00200000, 0x00200000, 0x02200000, 0x00200008, 0x00200000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat18,5,5, "Barrier16",0,0,1,2,1,2,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00200200, 0x00200080, 0x00200000, 0x00200000, 0x00200000, 0x02200000, 0x00200008, 0x00200000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat18,3,6.528000],
[barrierspat19,5,8, "Barrier16b",0,0,1,2,1,2,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00220200, 0x002000a0, 0x00200000, 0x00200000, 0x00200000, 0x02220000, 0x00200028, 0x00200000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat19,3,5.160000],
[barrierspat20,6,8, "Barrier17",0,0,1,2,1,2,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00201200, 0x00600080, 0x10200000, 0x00240000, 0x00600000, 0x12200000, 0x00240008, 0x00201000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat20,3,5.880000],
[barrierspat21,6,8, "Barrier18",0,0,1,2,1,2,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00211200, 0x00600090, 0x10200000, 0x00240000, 0x00600000, 0x12210000, 0x00240018, 0x00201000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat21,3,4.800000],
[barrierspat22,6,8, "Barrier19",0,0,1,3,1,3,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat22,0,5.000000],
[barrierspat23,7,8, "Barrier20",0,0,1,3,1,3,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00101000, 0x00500000, 0x10100000, 0x00140000, 0x00500000, 0x10100000, 0x00140000, 0x00101000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat23,0,4.800000],
[barrierspat24,12,2, "Barrier21",-2,0,2,3,4,3,0x0,686,
  [ 0x153f1505, 0x00747575, 0x50f05040, 0x75740000, 0x75740000, 0x153f1505, 0x00747575, 0x50f05040],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat25,8,4, "Barrier22",-1,0,1,3,2,3,0x0,685,
  [ 0x1f3f1f00, 0x0074fcfc, 0xd0f0d000, 0xfc740000, 0xfc740000, 0x1f3f1f00, 0x0074fcfc, 0xd0f0d000],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat25,3,4.800000],
[barrierspat26,22,8, "Barrier22a",-2,-1,2,4,4,5,0x2,723,
  [ 0x557f5f55, 0x5475f5f5, 0xd4f45450, 0x7d755500, 0xf5755400, 0x5f7f5515, 0x55757d7d, 0x54f4d454],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat27,10,4, "Barrier22b",0,0,2,3,2,3,0x0,684,
  [ 0x003f1f15, 0x0070f0f0, 0xd0f00000, 0x3d350000, 0xf0700000, 0x1f3f0000, 0x00353d3d, 0x00f0d050],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat27,3,4.800000],
[barrierspat28,7,5, "Barrier23",0,0,1,3,1,3,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat28,0,4.800000],
[barrierspat29,10,4, "Barrier24",0,-1,2,3,2,4,0x0,721,
  [ 0x003faf3f, 0x80b0f0f0, 0xe8f00000, 0x3f3b0800, 0xf0b08000, 0xaf3f0000, 0x083b3f3f, 0x00f0e8f0],
  [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat30,16,8, "Barrier25",-2,0,3,3,5,3,0x0,686,
  [ 0x153f1f15, 0x0074f5f5, 0xd0f05040, 0x7d750000, 0xf5740000, 0x1f3f1505, 0x00757d7d, 0x50f0d050],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat31,7,5, "Barrier26",0,0,1,3,1,3,0x0,684,
  [ 0x003f1f00, 0x0070f0f0, 0xd0f00000, 0x3c340000, 0xf0700000, 0x1f3f0000, 0x00343c3c, 0x00f0d000],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat31,3,4.800000],
[barrierspat32,5,4, "Barrier27",0,-1,2,1,2,2,0x2,721,
  [ 0x00b8b8b8, 0xa0f0a000, 0xb8b80000, 0x2a3f2a00, 0xa0f0a000, 0xb8b80000, 0x2a3f2a00, 0x00b8b8b8],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat33,5,4, "Barrier28",0,-1,2,1,2,2,0x2,721,
  [ 0x00747474, 0x50f05000, 0x74740000, 0x153f1500, 0x50f05000, 0x74740000, 0x153f1500, 0x00747474],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat34,4,8, "Barrier29",0,-1,1,0,1,1,0x2,721,
  [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat34,0,3.000000],
[barrierspat35,4,8, "Barrier30",0,0,1,1,1,1,0x2,684,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00140800, 0x00109000, 0x80500000, 0x18100000, 0x90100000, 0x08140000, 0x00101800, 0x00508000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat35,0,1.000000],
[barrierspat36,11,8, "Barrier31",0,-2,2,2,2,4,0x2,758,
  [ 0x00fefefe, 0xf0f0f0a0, 0xfcfc0000, 0x3f3f3f02, 0xf0f0f000, 0xfefe0000, 0x3f3f3f2a, 0x00fcfcfe],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat37,10,8, "Barrier32",0,-1,2,2,2,3,0x2,721,
  [ 0x003afefe, 0xc0f0e0a0, 0xfcb00000, 0x2f3f0f00, 0xe0f0c000, 0xfe3a0000, 0x0f3f2f2a, 0x00b0fcfc],
  [ 0x00108000, 0x80100000, 0x08100000, 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x00100800]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat38,11,8, "Barrier33",0,0,2,3,2,3,0x2,684,
  [ 0x003e3f3f, 0x00f0f0e0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3e0000, 0x003f3f2f, 0x00f0f0f0],
  [ 0x00240800, 0x00209000, 0x80600000, 0x18200000, 0x90200000, 0x08240000, 0x00201800, 0x00608000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat38,3,1.000000],
[barrierspat39,8,8, "Barrier34",0,0,2,2,2,2,0x2,684,
  [ 0x003e3e3e, 0x00f0f0a0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3e3e0000, 0x003f3f2a, 0x00f0f0f0],
  [ 0x00240000, 0x00201000, 0x00600000, 0x10200000, 0x10200000, 0x00240000, 0x00201000, 0x00600000]
  , 0x40,0.000000,null,0,null,null,3,0.000000],
[barrierspat40,7,8, "Barrier34b",0,0,2,2,2,2,0x2,684,
  [ 0x003f3f3c, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3c, 0x00f0f0f0],
  [ 0x00250200, 0x00201090, 0x00600000, 0x10200000, 0x10200000, 0x02250000, 0x00201018, 0x00600000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat40,3,1.000000],
[barrierspat41,12,4, "Barrier35",0,-1,2,3,2,4,0x2,721,
  [ 0x00bbbfbf, 0xa0f0e0f0, 0xf8b80000, 0x2f3f2a00, 0xe0f0a000, 0xbfbb0000, 0x2a3f2f3f, 0x00b8f8f8],
  [ 0x00110000, 0x00100010, 0x00100000, 0x00100000, 0x00100000, 0x00110000, 0x00100010, 0x00100000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat42,12,4, "Barrier36",0,-1,2,3,2,4,0x2,721,
  [ 0x00777f7f, 0x50f0d0f0, 0xf4740000, 0x1f3f1500, 0xd0f05000, 0x7f770000, 0x153f1f3f, 0x0074f4f4],
  [ 0x00220000, 0x00200020, 0x00200000, 0x00200000, 0x00200000, 0x00220000, 0x00200020, 0x00200000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat43,11,8, "Barrier37",0,0,2,3,2,3,0x2,684,
  [ 0x003d3f3f, 0x00f0f0d0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3d0000, 0x003f3f1f, 0x00f0f0f0],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat43,0,0.443200],
[barrierspat44,5,8, "Barrier38",0,0,1,2,1,2,0x2,684,
  [ 0x003f3c00, 0x00f0f030, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3f0000, 0x003c3c30, 0x00f0f000],
  [ 0x00190000, 0x00102010, 0x00900000, 0x20100000, 0x20100000, 0x00190000, 0x00102010, 0x00900000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat44,0,0.010000],
[barrierspat45,15,8, "Barrier39",0,-3,3,1,3,4,0x2,795,
  [ 0x00b0f8f8, 0xe0f08000, 0xbf3a0000, 0x0a3f2f2f, 0x80f0e0e0, 0xf8b00000, 0x2f3f0a00, 0x003abfbf],
  [ 0x00100000, 0x00100000, 0x01100000, 0x00100004, 0x00100040, 0x00100000, 0x00100000, 0x00100100]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat46,15,8, "Barrier40",0,-3,3,1,3,4,0x2,795,
  [ 0x0070f4f4, 0xd0f04000, 0x7f350000, 0x053f1f1f, 0x40f0d0d0, 0xf4700000, 0x1f3f0500, 0x00357f7f],
  [ 0x00200000, 0x00200000, 0x02200000, 0x00200008, 0x00200080, 0x00200000, 0x00200000, 0x00200200]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat47,6,8, "Barrier41a",0,0,1,3,1,3,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat47,0,3.000000],
[barrierspat48,6,8, "Barrier41b",0,0,1,3,1,3,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat48,0,3.000000],
[barrierspat49,4,8, "Barrier42",0,0,1,2,1,2,0x0,684,
  [ 0x003c3f00, 0x00f0f0c0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3c0000, 0x003c3c0c, 0x00f0f000],
  [ 0x00180100, 0x00102040, 0x00900000, 0x20100000, 0x20100000, 0x01180000, 0x00102004, 0x00900000]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat49,0,4.800000],
[barrierspat50,12,8, "Barrier43",0,-1,2,3,2,4,0x2,721,
  [ 0x003fbfbf, 0x80f0f0f0, 0xf8f00000, 0x3f3f0a00, 0xf0f08000, 0xbf3f0000, 0x0a3f3f3f, 0x00f0f8f8],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x40,0.000000,null,0,null,null,3,0.000000],
[barrierspat51,10,8, "Barrier44",0,-1,2,2,2,3,0x2,721,
  [ 0x003ffffe, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3f0000, 0x0f3f3f3e, 0x00f0fcfc],
  [ 0x00214000, 0x40200010, 0x04200000, 0x00200400, 0x00204000, 0x40210000, 0x04200010, 0x00200400]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat51,3,4.800000],
[barrierspat52,11,8, "Barrier45",0,0,2,3,2,3,0x2,684,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00222000, 0x00a00020, 0x20200000, 0x00280000, 0x00a00000, 0x20220000, 0x00280020, 0x00202000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat53,8,8, "Barrier46",0,-1,2,2,2,3,0x0,721,
  [ 0x00fffffe, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3e, 0x00fcfcfc],
  [ 0x00214000, 0x40200010, 0x04200000, 0x00200400, 0x00204000, 0x40210000, 0x04200010, 0x00200400]
  , 0x40,0.000000,null,0,null,null,3,0.000000],
[barrierspat54,25,4, "Barrier47",0,-2,3,4,3,6,0x2,758,
  [ 0x00bbbfbf, 0xa0f0e0f0, 0xfaba0000, 0x2f3f2a2a, 0xe0f0a0a0, 0xbfbb0000, 0x2a3f2f3f, 0x00bafafa],
  [ 0x00110000, 0x00100010, 0x00100000, 0x00100000, 0x00100000, 0x00110000, 0x00100010, 0x00100000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat55,29,4, "Barrier48",-1,-2,3,4,4,6,0x2,759,
  [ 0x55777f7f, 0x54f4d4f4, 0xf5755500, 0x5f7f5555, 0xd4f45454, 0x7f775500, 0x557f5f7f, 0x5575f5f5],
  [ 0x00220000, 0x00200020, 0x00200000, 0x00200000, 0x00200000, 0x00220000, 0x00200020, 0x00200000]
  , 0x400,0.000000,null,0,null,null,3,0.000000],
[barrierspat56,7,4, "Barrier49",0,0,2,2,2,2,0x0,684,
  [ 0x003c3f3f, 0x00f0f0c0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3c0000, 0x003f3f0f, 0x00f0f0f0],
  [ 0x00100001, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100001, 0x00100000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat57,6,4, "Barrier50",0,0,2,2,2,2,0x0,684,
  [ 0x00303c3f, 0x00f0c000, 0xf0300000, 0x0f3f0000, 0xc0f00000, 0x3c300000, 0x003f0f03, 0x0030f0f0],
  [ 0x00100001, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100001, 0x00100000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat58,4,8, "Barrier51",-1,0,0,3,1,3,0x0,685,
  [ 0x2c3f0000, 0x00383c30, 0x00f0e000, 0xf0b00000, 0x3c380000, 0x003f2c00, 0x00b0f030, 0xe0f00000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat59,11,8, "Barrier52",0,-2,2,2,2,4,0x2,758,
  [ 0x00fcffff, 0xf0f0f0c0, 0xfefe0000, 0x3f3f3f2b, 0xf0f0f0a0, 0xfffc0000, 0x3f3f3f0f, 0x00fefeff],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x50,0.000000,null,1,null,autohelperbarrierspat59,0,1.000000],
[barrierspat60,7,8, "Barrier53",0,-1,2,1,2,2,0x2,721,
  [ 0x0030fcf4, 0xc0f0c000, 0xfc300000, 0x0d3f0f00, 0xc0f0c000, 0xfc300000, 0x0f3f0d00, 0x0030fc7c],
  [ 0x00106400, 0x40904000, 0x64100000, 0x04180400, 0x40904000, 0x64100000, 0x04180400, 0x00106400]
  , 0x50,0.000000,null,0,null,null,0,0.000000],
[barrierspat61,15,4, "Barrier54",-1,-1,2,3,3,4,0x2,722,
  [ 0x5d7f7fff, 0x54f4fcf4, 0xf4f4d400, 0xff7f5700, 0xfcf45400, 0x7f7f5d00, 0x577fff7f, 0xd4f4f4fc],
  [ 0x00260000, 0x00201020, 0x00600000, 0x10200000, 0x10200000, 0x00260000, 0x00201020, 0x00600000]
  , 0x400,0.000000,null,1,null,autohelperbarrierspat61,3,1.000000],
[barrierspat62,7,8, "Barrier55",0,0,1,3,1,3,0x0,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x50,0.000000,null,1,null,autohelperbarrierspat62,0,0.019600],
[barrierspat63,10,8, "Barrier56",0,-1,2,2,2,3,0x2,721,
  [ 0x007e7fdf, 0x50f0f0e0, 0xf4f40000, 0x3f3d1700, 0xf0f05000, 0x7f7e0000, 0x173d3f2f, 0x00f4f4dc],
  [ 0x00241800, 0x00609000, 0x90600000, 0x18240000, 0x90600000, 0x18240000, 0x00241800, 0x00609000]
  , 0x50,0.000000,null,1,null,autohelperbarrierspat63,3,1.000000],
[barrierspat64,10,8, "Barrier56b",0,-1,2,2,2,3,0x2,721,
  [ 0x007effff, 0xd0f0f0e0, 0xfcf40000, 0x3f3f1f00, 0xf0f0d000, 0xff7e0000, 0x1f3f3f2f, 0x00f4fcfc],
  [ 0x00249020, 0x80601000, 0x18600000, 0x10260800, 0x10608000, 0x90240000, 0x08261000, 0x00601820]
  , 0x50,0.000000,null,1,null,autohelperbarrierspat64,3,1.000000],
[barrierspat65,3,8, "Barrier57",0,0,1,1,1,1,0x0,684,
  [ 0x003c3000, 0x00f03000, 0x30f00000, 0x303c0000, 0x30f00000, 0x303c0000, 0x003c3000, 0x00f03000],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x50,0.000000,null,1,null,autohelperbarrierspat65,3,0.010000],
[barrierspat66,5,8, "Barrier58",-1,0,0,2,1,2,0x0,685,
  [ 0x2e3f0000, 0x00383c38, 0x00f0e000, 0xf0b00000, 0x3c380000, 0x003f2e00, 0x00b0f0b0, 0xe0f00000],
  [ 0x00190000, 0x00102010, 0x00900000, 0x20100000, 0x20100000, 0x00190000, 0x00102010, 0x00900000]
  , 0x50,0.000000,null,1,null,autohelperbarrierspat66,0,0.019600],
[barrierspat67,3,8, "Barrier59",-1,0,0,1,1,1,0x0,685,
  [ 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000],
  [ 0x00240000, 0x00201000, 0x00600000, 0x10200000, 0x10200000, 0x00240000, 0x00201000, 0x00600000]
  , 0x50,0.000000,null,1,null,autohelperbarrierspat67,3,1.000000],
[barrierspat68,7,4, "Barrier60a",0,-1,3,1,3,2,0x2,721,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x404,0.000000,null,0,null,null,3,0.000000],
[barrierspat69,8,4, "Barrier60b",0,-1,3,1,3,2,0x2,721,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x41,0.000000,null,0,null,null,0,0.000000],
[barrierspat70,29,4, "Barrier61",-2,-3,3,2,5,5,0xa,797,
  [ 0xfefefefe, 0xfefefeaa, 0xffffffaa, 0xffffffff, 0xfefefefe, 0xfefefeaa, 0xffffffaa, 0xffffffff],
  [ 0x00108000, 0x80100000, 0x08100000, 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x00100800]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat71,8,8, "Barrier62",0,-2,2,1,2,3,0x0,758,
  [ 0x0070fcfc, 0xd0f0c000, 0xff340000, 0x0f3f1f0f, 0xc0f0d0c0, 0xfc700000, 0x1f3f0f00, 0x0034ffff],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x45,0.000000,null,0,null,null,3,0.000000],
[barrierspat72,13,8, "Barrier63",0,-1,3,2,3,3,0x2,721,
  [ 0x00bfffff, 0xe0f0f0f0, 0xfcf80000, 0x3f3f2f00, 0xf0f0e000, 0xffbf0000, 0x2f3f3f3f, 0x00f8fcfc],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x40,0.000000,null,0,null,null,3,0.000000],
[barrierspat73,14,8, "Barrier64",0,-1,3,2,3,3,0x2,721,
  [ 0x00bfffff, 0xe0f0f0f0, 0xfcf80000, 0x3f3f2f00, 0xf0f0e000, 0xffbf0000, 0x2f3f3f3f, 0x00f8fcfc],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x40,0.000000,null,1,null,autohelperbarrierspat73,3,1.000000],
[barrierspat74,6,8, "Barrier65",0,-1,2,1,2,2,0x2,721,
  [ 0x003cfc7c, 0xc0f0f000, 0xfcf00000, 0x3f3f0d00, 0xf0f0c000, 0xfc3c0000, 0x0d3f3f00, 0x00f0fcf4],
  [ 0x00108000, 0x80100000, 0x08100000, 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x00100800]
  , 0x41,0.000000,null,1,null,autohelperbarrierspat74,0,1.000000],
[barrierspat75,31,8, "Barrier66",0,-2,5,3,5,5,0xa,758,
  [ 0x00ffffff, 0xf0f0f0f0, 0xffff0000, 0x3f3f3f3f, 0xf0f0f0f0, 0xffff0000, 0x3f3f3f3f, 0x00ffffff],
  [ 0x00200024, 0x00200000, 0x00200000, 0x01220000, 0x00200000, 0x00200000, 0x00220100, 0x00200060]
  , 0x40,0.000000,null,0,null,null,3,0.000000],
[barrierspat76,18,8, "Barrier67",0,-4,3,0,3,4,0x2,832,
  [ 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0x003f3f3f],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x40,0.000000,null,0,null,null,0,0.000000],
[barrierspat77,7,8, "Intrusion1",-2,-3,0,0,2,3,0x2,797,
  [ 0xf0f00000, 0x3c3d0000, 0x003f3f10, 0x00f0f0f0, 0x003d3c3c, 0x00f0f010, 0xf0f00000, 0x3f3f0000],
  [ 0x20100000, 0x00180000, 0x00102000, 0x00900000, 0x00180000, 0x00102000, 0x00900000, 0x20100000]
  , 0x200,30.000000,null,2,null,autohelperbarrierspat77,0,0.000000],
[barrierspat78,6,8, "Intrusion1a",-2,-2,0,0,2,2,0xa,760,
  [ 0xf0f00000, 0x3c3d0000, 0x003f3f10, 0x00f0f0f0, 0x003d3c3c, 0x00f0f010, 0xf0f00000, 0x3f3f0000],
  [ 0x20100000, 0x00180000, 0x00102000, 0x00900000, 0x00180000, 0x00102000, 0x00900000, 0x20100000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat78,0,1.000000],
[barrierspat79,11,8, "Intrusion1b",-2,-3,0,0,2,3,0x2,797,
  [ 0xf0f00000, 0x3d3d0000, 0x003f3f15, 0x00f0f0f0, 0x003d3d3d, 0x00f0f050, 0xf0f00000, 0x3f3f0000],
  [ 0x20100000, 0x00180000, 0x00102000, 0x00900000, 0x00180000, 0x00102000, 0x00900000, 0x20100000]
  , 0x200,30.000000,null,2,null,autohelperbarrierspat79,0,0.000000],
[barrierspat80,10,8, "Intrusion1c",-2,-3,0,0,2,3,0x2,797,
  [ 0xf0f00000, 0x3d3d0000, 0x003f3f15, 0x00f0f0f0, 0x003d3d3d, 0x00f0f050, 0xf0f00000, 0x3f3f0000],
  [ 0x20100000, 0x00180000, 0x00102000, 0x00900000, 0x00180000, 0x00102000, 0x00900000, 0x20100000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat80,0,1.000000],
[barrierspat81,10,8, "Intrusion1d",-2,-3,0,0,2,3,0x2,797,
  [ 0xf0f00000, 0x3d3d0000, 0x003f3f15, 0x00f0f0f0, 0x003d3d3d, 0x00f0f050, 0xf0f00000, 0x3f3f0000],
  [ 0x20100000, 0x00180000, 0x00102000, 0x00900000, 0x00180000, 0x00102000, 0x00900000, 0x20100000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat81,0,1.000000],
[barrierspat82,7,8, "Intrusion2",-1,-3,1,0,2,3,0x2,796,
  [ 0x40f0f000, 0xf4f00000, 0x3f3f0700, 0x003c7cfc, 0x00f0f4fc, 0xf0f04000, 0x7c3c0000, 0x073f3f00],
  [ 0x00100000, 0x00100000, 0x00100200, 0x00100080, 0x00100008, 0x00100000, 0x00100000, 0x02100000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat82,0,1.000000],
[barrierspat83,8,8, "Intrusion3",-1,-3,1,0,2,3,0x2,796,
  [ 0xc0f0f000, 0xfcf00000, 0x3f3f0d00, 0x003cfc7c, 0x00f0fcf4, 0xf0f0c000, 0xfc3c0000, 0x0d3f3f00],
  [ 0x80100000, 0x08100000, 0x00100800, 0x00108000, 0x00100800, 0x00108000, 0x80100000, 0x08100000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat83,0,1.000000],
[barrierspat84,12,8, "Intrusion4",0,-1,2,2,2,3,0x2,721,
  [ 0x00ffffff, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3f, 0x00fcfcfc],
  [ 0x00960800, 0x20109020, 0x80580000, 0x18102000, 0x90102000, 0x08960000, 0x20101820, 0x00588000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat84,0,1.000000],
[barrierspat85,10,8, "Intrusion5a",0,-2,2,1,2,3,0x2,758,
  [ 0x00fcfcfc, 0xf0f0f000, 0xffff0000, 0x3f3f3f3f, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0x00ffffff],
  [ 0x00182000, 0x00902000, 0x20920000, 0x20180020, 0x20900020, 0x20180000, 0x00182000, 0x00922000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat85,0,1.000000],
[barrierspat86,4,8, "Intrusion5b",0,-1,1,1,1,2,0x0,721,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00182000, 0x00902000, 0x20900000, 0x20180000, 0x20900000, 0x20180000, 0x00182000, 0x00902000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat86,0,3.000000],
[barrierspat87,8,8, "Intrusion6",0,-1,2,1,2,2,0x0,721,
  [ 0x003cfc7c, 0xc0f0f000, 0xfcf00000, 0x3f3f0d00, 0xf0f0c000, 0xfc3c0000, 0x0d3f3f00, 0x00f0fcf4],
  [ 0x00188000, 0x80102000, 0x08900000, 0x20100800, 0x20108000, 0x80180000, 0x08102000, 0x00900800]
  , 0x200,30.000000,null,2,null,autohelperbarrierspat87,0,0.000000],
[barrierspat88,4,8, "Intrusion7b",0,0,1,1,1,1,0x0,684,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat88,0,3.000000],
[barrierspat89,7,8, "Intrusion8a",-1,0,1,2,2,2,0x0,685,
  [ 0x3f3f0f00, 0x003cfcfc, 0xc0f0f000, 0xfcf00000, 0xfc3c0000, 0x0f3f3f00, 0x00f0fcfc, 0xf0f0c000],
  [ 0x22100800, 0x00188008, 0x80102000, 0x08900000, 0x80180000, 0x08102200, 0x00900880, 0x20108000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat89,0,1.600000],
[barrierspat90,5,8, "Intrusion8b",-1,0,1,1,2,1,0x0,685,
  [ 0x0c3c3c00, 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00, 0xc0f0f000],
  [ 0x08102000, 0x00900800, 0x20108000, 0x80180000, 0x08900000, 0x20100800, 0x00188000, 0x80102000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat90,0,1.600000],
[barrierspat91,4,8, "Intrusion9",-1,0,1,1,2,1,0x0,685,
  [ 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000],
  [ 0x20180000, 0x00182000, 0x00902000, 0x20900000, 0x20180000, 0x00182000, 0x00902000, 0x20900000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat91,0,1.000000],
[barrierspat92,10,8, "Intrusion10",-2,-3,0,1,2,4,0x2,797,
  [ 0xf0f00000, 0x3d3c0000, 0x003f3f05, 0x00f0f0f0, 0x003c3d3d, 0x00f0f040, 0xf0f00000, 0x3f3f0000],
  [ 0x90100000, 0x08140000, 0x00101800, 0x00508000, 0x00140800, 0x00109000, 0x80500000, 0x18100000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat92,0,3.000000],
[barrierspat93,8,4, "Intrusion11",0,-1,3,1,3,2,0x2,721,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat93,0,1.600000],
[barrierspat94,12,4, "Intrusion12a",0,-1,3,1,3,2,0x2,721,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat94,0,1.600000],
[barrierspat95,8,8, "Intrusion12b",0,-1,2,1,2,2,0x0,721,
  [ 0x00b8fcfc, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0x00b8fcfc],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x201,30.000000,null,3,null,autohelperbarrierspat95,0,1.810000],
[barrierspat96,16,8, "Intrusion13",0,-3,3,1,3,4,0x2,795,
  [ 0x00b0fcfc, 0xe0f0c000, 0xff3b0000, 0x0f3f2f3f, 0xc0f0e0f0, 0xfcb00000, 0x2f3f0f00, 0x003bffff],
  [ 0x00102000, 0x00900000, 0x20110000, 0x00180010, 0x00900010, 0x20100000, 0x00180000, 0x00112000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat96,0,0.016000],
[barrierspat97,14,8, "Intrusion14",0,-1,3,2,3,3,0x2,721,
  [ 0x003cffff, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0f, 0x00f0fcfc],
  [ 0x00148800, 0x80109000, 0x88500000, 0x18100800, 0x90108000, 0x88140000, 0x08101800, 0x00508800]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat97,0,3.000000],
[barrierspat98,6,8, "Intrusion15",0,-1,2,1,2,2,0x0,721,
  [ 0x00b8fcfc, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0x00b8fcfc],
  [ 0x00102408, 0x00904000, 0x60100000, 0x06180000, 0x40900000, 0x24100000, 0x00180600, 0x00106080]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat98,0,1.000000],
[barrierspat99,9,8, "Intrusion16",0,0,2,2,2,2,0x0,684,
  [ 0x003f3f37, 0x00f0f0f0, 0xf0f00000, 0x3d3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3d3f, 0x00f0f070],
  [ 0x00100002, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100002, 0x00100000]
  , 0x200,20.000000,null,0,null,null,0,0.000000],
[barrierspat100,8,8, "Intrusion17",0,0,2,2,2,2,0x0,684,
  [ 0x003f3f37, 0x00f0f0f0, 0xf0f00000, 0x3d3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3d3f, 0x00f0f070],
  [ 0x00100022, 0x00100000, 0x00100000, 0x00120000, 0x00100000, 0x00100000, 0x00120002, 0x00100020]
  , 0x200,20.000000,null,0,null,null,0,0.000000],
[barrierspat101,11,8, "Intrusion18",-2,0,2,2,4,2,0x0,686,
  [ 0x2f3f2f1d, 0x00b9fffd, 0xe0f0e0d0, 0xffb90000, 0xffb90000, 0x2f3f2f1d, 0x00b9fffd, 0xe0f0e0d0],
  [ 0x00100008, 0x00100200, 0x00100080, 0x02100000, 0x02100000, 0x00100008, 0x00100200, 0x00100080]
  , 0x200,30.000000,null,0,null,null,0,0.000000],
[barrierspat102,9,8, "Intrusion19",-1,0,2,2,3,2,0x0,685,
  [ 0x3f3f2f1d, 0x00bcfcfc, 0xe0f0f000, 0xfff90000, 0xfcbc0000, 0x2f3f3f00, 0x00f9fffd, 0xf0f0e0d0],
  [ 0x20100008, 0x00180000, 0x00102000, 0x02900000, 0x00180000, 0x00102000, 0x00900200, 0x20100080]
  , 0x200,30.000000,null,2,null,autohelperbarrierspat102,0,0.000000],
[barrierspat103,5,8, "Intrusion20",0,-1,1,1,1,2,0x0,721,
  [ 0x00bcfc00, 0xe0f0f000, 0xfcf80000, 0x3c3c2c00, 0xf0f0e000, 0xfcbc0000, 0x2c3c3c00, 0x00f8fc00],
  [ 0x00106000, 0x40900000, 0x24100000, 0x00180400, 0x00904000, 0x60100000, 0x04180000, 0x00102400]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat103,0,0.610000],
[barrierspat104,7,8, "Intrusion21",0,0,2,2,2,2,0x0,684,
  [ 0x003f3f1f, 0x00f0f0f0, 0xf0f00000, 0x3f3d0000, 0xf0f00000, 0x3f3f0000, 0x003d3f3f, 0x00f0f0d0],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x200,30.000000,null,2,null,autohelperbarrierspat104,0,0.000000],
[barrierspat105,5,8, "Intrusion21b",-1,0,1,2,2,2,0x0,685,
  [ 0x2b3f1f00, 0x0078f8fc, 0xd0f0a000, 0xbcb40000, 0xf8780000, 0x1f3f2b00, 0x00b4bcfc, 0xa0f0d000],
  [ 0x02100000, 0x00100008, 0x00100000, 0x00100000, 0x00100000, 0x00100200, 0x00100080, 0x00100000]
  , 0x200,30.000000,null,2,null,autohelperbarrierspat105,0,0.000000],
[barrierspat106,6,8, "Intrusion22",0,0,2,2,2,2,0x0,684,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x200,10.000000,null,2,null,autohelperbarrierspat106,0,0.000000],
[barrierspat107,4,8, "Intrusion23",0,0,1,2,1,2,0x2,684,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x200,10.000000,null,3,null,autohelperbarrierspat107,0,3.000000],
[barrierspat108,5,8, "Intrusion24",-1,0,0,2,1,2,0x2,685,
  [ 0x3f3f0000, 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0, 0xf0f00000],
  [ 0x10100000, 0x00140000, 0x00101000, 0x00500000, 0x00140000, 0x00101000, 0x00500000, 0x10100000]
  , 0x200,30.000000,null,2,null,autohelperbarrierspat108,0,0.000000],
[barrierspat109,11,8, "Intrusion25",-1,-2,2,1,3,3,0x2,759,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xffffffff],
  [ 0x04900000, 0x20100400, 0x00184000, 0x40102000, 0x04102000, 0x00900400, 0x20104000, 0x40180000]
  , 0x200,30.000000,null,0,null,null,0,0.000000],
[barrierspat110,13,8, "Intrusion26",-1,-2,2,1,3,3,0x2,759,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xffffffff],
  [ 0x04902000, 0x20900400, 0x20184000, 0x40182000, 0x04902000, 0x20900400, 0x20184000, 0x40182000]
  , 0x200,30.000000,null,0,null,null,0,0.000000],
[barrierspat111,10,8, "Intrusion27",0,0,3,2,3,2,0x0,684,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x200,30.000000,null,0,null,null,0,0.000000],
[barrierspat112,12,8, "Intrusion28",0,-2,3,1,3,3,0x2,758,
  [ 0x0030fcfc, 0xc0f0c000, 0xfd300000, 0x0f3f0f07, 0xc0f0c040, 0xfc300000, 0x0f3f0f00, 0x0030fdff],
  [ 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x80100000, 0x08100000, 0x00100800, 0x00108000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat112,0,3.000000],
[barrierspat113,16,8, "Intrusion29",-2,-1,3,2,5,3,0x0,723,
  [ 0xaafeffff, 0xfafafaea, 0xfcfca8a8, 0xbfbfbf00, 0xfafafa00, 0xfffeaaaa, 0xbfbfbfaf, 0xa8fcfcfc],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x200,30.000000,null,0,null,null,0,0.000000],
[barrierspat114,17,8, "Intrusion30",-2,-1,3,2,5,3,0x0,723,
  [ 0xaafeffff, 0xfafafaea, 0xfcfca8a8, 0xbfbfbf00, 0xfafafa00, 0xfffeaaaa, 0xbfbfbfaf, 0xa8fcfcfc],
  [ 0x00900000, 0x20100000, 0x00180000, 0x00102000, 0x00102000, 0x00900000, 0x20100000, 0x00180000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat114,0,1.000000],
[barrierspat115,7,8, "Intrusion30a",-2,-1,3,2,5,3,0x0,723,
  [ 0x00baffff, 0xe0f0e0e0, 0xfcb80000, 0x2f3f2f00, 0xe0f0e000, 0xffba0000, 0x2f3f2f2f, 0x00b8fcfc],
  [ 0x00100200, 0x00100080, 0x00100000, 0x00100000, 0x00100000, 0x02100000, 0x00100008, 0x00100000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat115,0,10.000000],
[barrierspat116,8,8, "Intrusion31",-1,-1,3,1,4,2,0x0,722,
  [ 0xa8fcfcfc, 0xf8f8f800, 0xfcfca800, 0xbfbfbf00, 0xf8f8f800, 0xfcfca800, 0xbfbfbf00, 0xa8fcfcfc],
  [ 0x00900000, 0x20100000, 0x00180000, 0x00102000, 0x00102000, 0x00900000, 0x20100000, 0x00180000]
  , 0x200,30.000000,null,2,null,autohelperbarrierspat116,0,0.000000],
[barrierspat117,4,8, "Intrusion32",-1,-1,2,1,3,2,0x0,722,
  [ 0xa8fcfc30, 0xf8f8f800, 0xfcfca800, 0xbcbfbc00, 0xf8f8f800, 0xfcfca800, 0xbcbfbc00, 0xa8fcfc30],
  [ 0x00900000, 0x20100000, 0x00180000, 0x00102000, 0x00102000, 0x00900000, 0x20100000, 0x00180000]
  , 0x200,30.000000,null,2,null,autohelperbarrierspat117,0,0.000000],
[barrierspat118,6,8, "Intrusion33",-1,-1,2,1,3,2,0x0,722,
  [ 0xb8fcfc30, 0xf8fcf800, 0xfcfcb800, 0xbcffbc00, 0xf8fcf800, 0xfcfcb800, 0xbcffbc00, 0xb8fcfc30],
  [ 0x10980000, 0x20142000, 0x00981000, 0x20502000, 0x20142000, 0x00981000, 0x20502000, 0x10980000]
  , 0x200,30.000000,null,0,null,null,0,0.000000],
[barrierspat119,5,8, "Intrusion34",-1,-1,2,1,3,2,0x0,722,
  [ 0xb8fcfc30, 0xf8fcf800, 0xfcfcb800, 0xbcffbc00, 0xf8fcf800, 0xfcfcb800, 0xbcffbc00, 0xb8fcfc30],
  [ 0x00980000, 0x20102000, 0x00980000, 0x20102000, 0x20102000, 0x00980000, 0x20102000, 0x00980000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat119,0,1.000000],
[barrierspat120,21,8, "Intrusion35",-1,-3,3,1,4,4,0xa,796,
  [ 0xc0f0fcfc, 0xfcf0c000, 0xff3f0f00, 0x0f3fffff, 0xc0f0fcfc, 0xfcf0c000, 0xff3f0f00, 0x0f3fffff],
  [ 0x80108800, 0x88108000, 0x88100800, 0x08108800, 0x80108800, 0x88108000, 0x88100800, 0x08108800]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat120,0,1.000000],
[barrierspat121,4,8, "Intrusion36",-1,0,1,1,2,1,0x0,685,
  [ 0x0c3c3400, 0x00f07c00, 0x70f0c000, 0xf43c0000, 0x7cf00000, 0x343c0c00, 0x003cf400, 0xc0f07000],
  [ 0x08102000, 0x00900800, 0x20108000, 0x80180000, 0x08900000, 0x20100800, 0x00188000, 0x80102000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat121,0,1.000000],
[barrierspat122,4,8, "Intrusion37",-1,0,1,1,2,1,0x0,685,
  [ 0x0c3c2c00, 0x00b0fc00, 0xe0f0c000, 0xfc380000, 0xfcb00000, 0x2c3c0c00, 0x0038fc00, 0xc0f0e000],
  [ 0x08100800, 0x00108800, 0x80108000, 0x88100000, 0x88100000, 0x08100800, 0x00108800, 0x80108000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat122,0,1.000000],
[barrierspat123,3,8, "Intrusion38",-1,-1,0,0,1,1,0x2,722,
  [ 0xc0f00000, 0x3c300000, 0x003c0c00, 0x0030f000, 0x00303c00, 0x00f0c000, 0xf0300000, 0x0c3c0000],
  [ 0x80100000, 0x08100000, 0x00100800, 0x00108000, 0x00100800, 0x00108000, 0x80100000, 0x08100000]
  , 0x200,5.000000,null,3,null,autohelperbarrierspat123,0,1.000000],
[barrierspat124,7,8, "Intrusion39",-1,0,1,2,2,2,0x0,685,
  [ 0x0d3f2f00, 0x00b0fcf4, 0xe0f0c000, 0xfc380000, 0xfcb00000, 0x2f3f0d00, 0x0038fc7c, 0xc0f0e000],
  [ 0x08100200, 0x00100880, 0x00108000, 0x80100000, 0x08100000, 0x02100800, 0x00108008, 0x80100000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat124,0,1.000000],
[barrierspat125,3,8, "Intrusion40",-1,0,0,1,1,1,0x0,685,
  [ 0x3c300000, 0x003c0c00, 0x0030f000, 0xc0f00000, 0x0c3c0000, 0x00303c00, 0x00f0c000, 0xf0300000],
  [ 0x20100000, 0x00180000, 0x00102000, 0x00900000, 0x00180000, 0x00102000, 0x00900000, 0x20100000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat125,0,0.610000],
[barrierspat126,4,8, "Intrusion41",-1,0,0,1,1,1,0x0,685,
  [ 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000],
  [ 0x20100000, 0x00180000, 0x00102000, 0x00900000, 0x00180000, 0x00102000, 0x00900000, 0x20100000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat126,0,0.010000],
[barrierspat127,11,8, "Intrusion42",-1,-2,2,1,3,3,0x2,759,
  [ 0xe8f8fcfc, 0xfcf8e800, 0xffbfac00, 0xafbfff3f, 0xe8f8fcf0, 0xfcf8e800, 0xffbfaf00, 0xacbfffff],
  [ 0x40902000, 0x24900000, 0x20180400, 0x00186000, 0x00902400, 0x20904000, 0x60180000, 0x04182000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat127,0,0.970000],
[barrierspat128,8,8, "Intrusion43",-1,-3,1,0,2,3,0x0,796,
  [ 0xf0f0e000, 0xfcbc0000, 0x2f3f3c00, 0x00f8fc3c, 0x00bcfcf0, 0xe0f0f000, 0xfcf80000, 0x3c3f2f00],
  [ 0x90900000, 0x28140000, 0x00181800, 0x0050a000, 0x00142800, 0x00909000, 0xa0500000, 0x18180000]
  , 0x200,50.000000,null,1,null,autohelperbarrierspat128,0,0.970000],
[barrierspat129,5,8, "Intrusion44a",0,-2,1,0,1,2,0x0,758,
  [ 0x00f0e000, 0xf0b00000, 0x2f3f0000, 0x00383c3c, 0x00b0f0f0, 0xe0f00000, 0x3c380000, 0x003f2f00],
  [ 0x00900000, 0x20100000, 0x00180000, 0x00102000, 0x00102000, 0x00900000, 0x20100000, 0x00180000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat129,0,2.014000],
[barrierspat130,7,8, "Intrusion44b",-1,-2,1,1,2,3,0x0,759,
  [ 0xf0f8e000, 0xfcbc2000, 0x2fbf3f00, 0x20f8fcfc, 0x20bcfcfc, 0xe0f8f000, 0xfcf82000, 0x3fbf2f00],
  [ 0x20900000, 0x20180000, 0x00182000, 0x00902000, 0x00182000, 0x00902000, 0x20900000, 0x20180000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat130,0,2.014000],
[barrierspat131,9,8, "Intrusion45",0,-2,2,1,2,3,0x2,758,
  [ 0x00f8fcfc, 0xf0f0e000, 0xffbf0000, 0x2f3f3f3f, 0xe0f0f0f0, 0xfcf80000, 0x3f3f2f00, 0x00bfffff],
  [ 0x00102000, 0x00900000, 0x20120000, 0x00180020, 0x00900020, 0x20100000, 0x00180000, 0x00122000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat131,0,1.600000],
[barrierspat132,18,4, "Intrusion46",0,-2,3,2,3,4,0x2,758,
  [ 0x00fdfffd, 0xf0f0f0d0, 0xfffd0000, 0x3f3f3f1d, 0xf0f0f0d0, 0xfffd0000, 0x3f3f3f1d, 0x00fdfffd],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x200,10.000000,null,1,null,autohelperbarrierspat132,0,1.000000],
[barrierspat133,9,8, "Intrusion47",-2,0,0,4,2,4,0x2,686,
  [ 0x2f3f0000, 0x00383c3f, 0x00f0e000, 0xf0b00000, 0x3c380000, 0x003f2f03, 0x00b0f0f0, 0xe0f00000],
  [ 0x00100000, 0x00100002, 0x00100000, 0x00100000, 0x00100000, 0x00100002, 0x00100000, 0x00100000]
  , 0x200,20.000000,null,1,null,autohelperbarrierspat133,0,0.010000],
[barrierspat134,6,8, "Intrusion48",-2,0,1,2,3,2,0x0,686,
  [ 0x3f3f3f00, 0x00fcfdff, 0xf0f0f040, 0xfcfc0000, 0xfdfc0000, 0x3f3f3f07, 0x00fcfcfc, 0xf0f0f000],
  [ 0x00100200, 0x00100080, 0x00100000, 0x00100000, 0x00100000, 0x02100000, 0x00100008, 0x00100000]
  , 0x200,20.000000,null,0,null,null,0,0.000000],
[barrierspat135,5,8, "Intrusion49",0,-1,1,1,1,2,0x0,721,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00980000, 0x20102000, 0x00980000, 0x20102000, 0x20102000, 0x00980000, 0x20102000, 0x00980000]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat135,0,1.600000],
[barrierspat136,5,8, "Intrusion50",-1,0,1,2,2,2,0x2,685,
  [ 0x0f3f3f00, 0x00f0fcfc, 0xf0f0c000, 0xfc3c0000, 0xfcf00000, 0x3f3f0f00, 0x003cfcfc, 0xc0f0f000],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x201,30.000000,null,1,null,autohelperbarrierspat136,0,3.000000],
[barrierspat137,6,4, "Intrusion51a",0,-1,2,1,2,2,0x0,721,
  [ 0x0030fcfc, 0xc0f0c000, 0xfc300000, 0x0f3f0f00, 0xc0f0c000, 0xfc300000, 0x0f3f0f00, 0x0030fcfc],
  [ 0x00108800, 0x80108000, 0x88100000, 0x08100800, 0x80108000, 0x88100000, 0x08100800, 0x00108800]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat137,0,5.000000],
[barrierspat138,7,4, "Intrusion51b",-1,-1,1,1,2,2,0x0,722,
  [ 0x30fcfc00, 0xf0fcf000, 0xfcfc3000, 0x3cfc3c00, 0xf0fcf000, 0xfcfc3000, 0x3cfc3c00, 0x30fcfc00],
  [ 0x10982000, 0x20942000, 0x20981000, 0x20582000, 0x20942000, 0x20981000, 0x20582000, 0x10982000]
  , 0x204,20.000000,null,1,null,autohelperbarrierspat138,0,6.476960],
[barrierspat139,7,8, "Intrusion52",-1,0,1,2,2,2,0x0,685,
  [ 0x3d3f3f00, 0x00fcfcf4, 0xf0f0f000, 0xfcfc0000, 0xfcfc0000, 0x3f3f3d00, 0x00fcfc7c, 0xf0f0f000],
  [ 0x20100800, 0x00188000, 0x80102000, 0x08900000, 0x80180000, 0x08102000, 0x00900800, 0x20108000]
  , 0x200,30.000000,null,2,null,autohelperbarrierspat139,0,0.000000],
[barrierspat140,6,8, "Intrusion53",-1,0,0,2,1,2,0x0,685,
  [ 0x3f3f0000, 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0, 0xf0f00000],
  [ 0x20180000, 0x00182000, 0x00902000, 0x20900000, 0x20180000, 0x00182000, 0x00902000, 0x20900000]
  , 0x200,50.000000,null,1,null,autohelperbarrierspat140,0,1.000000],
[barrierspat141,6,8, "Intrusion54",-1,-2,1,1,2,3,0x0,759,
  [ 0xf0f8e800, 0xfcbca000, 0xafbf3f00, 0x28f8fcfc, 0xa0bcfcfc, 0xe8f8f000, 0xfcf82800, 0x3fbfaf00],
  [ 0x20900000, 0x20180000, 0x00182000, 0x00902000, 0x00182000, 0x00902000, 0x20900000, 0x20180000]
  , 0x200,40.000000,null,1,null,autohelperbarrierspat141,0,0.229120],
[barrierspat142,8,8, "Intrusion55",-3,-3,0,0,3,3,0x2,798,
  [ 0xe0f00000, 0x3d380000, 0x003f2f05, 0x00b0f0f0, 0x00383d3d, 0x00f0e040, 0xf0b00000, 0x2f3f0000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat142,0,0.610000],
[barrierspat143,8,8, "Intrusion56",-3,-3,0,0,3,3,0x2,798,
  [ 0xe0f00000, 0x3d380000, 0x003f2f05, 0x00b0f0f0, 0x00383d3d, 0x00f0e040, 0xf0b00000, 0x2f3f0000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat143,0,6.010000],
[barrierspat144,4,8, "Intrusion57",-1,-1,1,0,2,1,0x0,722,
  [ 0x70f0c000, 0xf43c0000, 0x0c3c3400, 0x00f07c00, 0x003cf400, 0xc0f07000, 0x7cf00000, 0x343c0c00],
  [ 0x20108000, 0x80180000, 0x08102000, 0x00900800, 0x00188000, 0x80102000, 0x08900000, 0x20100800]
  , 0x200,30.000000,null,3,null,autohelperbarrierspat144,0,1.000000],
[barrierspat145,11,8, "Intrusion58",-1,-2,2,1,3,3,0x0,759,
  [ 0xe8f8fcfc, 0xfcf8e800, 0xffbfaf00, 0xafbffffc, 0xe8f8fcfc, 0xfcf8e800, 0xffbfaf00, 0xafbffffc],
  [ 0x40902000, 0x24900000, 0x20180600, 0x00186080, 0x00902408, 0x20904000, 0x60180000, 0x06182000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat145,0,16.000000],
[barrierspat146,13,8, "Intrusion59",-3,-1,1,2,4,3,0x8,724,
  [ 0xfffce800, 0xffbfbf0d, 0xacfcfcfc, 0xf8f8fc00, 0xbfbfff00, 0xe8fcfffd, 0xfcf8f8c0, 0xfcfcac00],
  [ 0x22940000, 0x20181008, 0x00582000, 0x10902000, 0x10182000, 0x00942200, 0x20901080, 0x20580000]
  , 0x200,30.000000,null,1,null,autohelperbarrierspat146,0,7.360000],
[barrierspat147,6,8, "Intrusion60",0,-1,2,1,2,2,0x0,721,
  [ 0x00f0fcf0, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0x003cfc3c],
  [ 0x00508050, 0x90100000, 0x08140000, 0x00111900, 0x00109000, 0x80500000, 0x19110000, 0x00140814]
  , 0x200,20.000000,null,0,null,null,0,0.000000],
[barrierspat148,10,8, "Intrusion61",-2,-1,1,2,3,3,0x8,723,
  [ 0xfffffc00, 0xffffff3c, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xfcfffffc, 0xfcfcfcf0, 0xfcfcfc00],
  [ 0x201a1400, 0x00586020, 0x50902000, 0x24940000, 0x60580000, 0x141a2000, 0x00942420, 0x20905000]
  , 0x200,20.000000,null,1,null,autohelperbarrierspat148,0,10.000000],
[barrierspat149,5,8, "Intrusion62",-1,-1,1,1,2,2,0x0,722,
  [ 0xf8fcfc00, 0xfcfcf800, 0xfcfcbc00, 0xbcfcfc00, 0xf8fcfc00, 0xfcfcf800, 0xfcfcbc00, 0xbcfcfc00],
  [ 0x20102400, 0x00984000, 0x60102000, 0x04980000, 0x40980000, 0x24102000, 0x00980400, 0x20106000]
  , 0x200,20.000000,null,3,null,autohelperbarrierspat149,0,1.000000],
[barrierspat150,15,8, "Intrusion63",-2,-1,1,3,3,4,0x2,723,
  [ 0xffffff00, 0xfffeffff, 0xfcfcfcec, 0xfcfcfc00, 0xfffeff00, 0xffffffef, 0xfcfcfcfc, 0xfcfcfc00],
  [ 0x18182000, 0x00942901, 0x20909040, 0xa0580000, 0x29940000, 0x20181805, 0x0058a000, 0x90902000]
  , 0x200,50.000000,null,1,null,autohelperbarrierspat150,0,6.050000],
[barrierspat151,4,4, "Nonterritory1",0,0,1,2,1,2,0x0,684,
  [ 0x00373b00, 0x00f090f0, 0xb0700000, 0x183c0000, 0x90f00000, 0x3b370000, 0x003c183c, 0x0070b000],
  [ 0x00112200, 0x00900090, 0x20100000, 0x00180000, 0x00900000, 0x22110000, 0x00180018, 0x00102000]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat151,0,0.000000],
[barrierspat152,4,8, "Nonterritory1b",0,0,1,2,1,2,0x0,684,
  [ 0x00373b00, 0x00f090f0, 0xb0700000, 0x183c0000, 0x90f00000, 0x3b370000, 0x003c183c, 0x0070b000],
  [ 0x00102200, 0x00900080, 0x20100000, 0x00180000, 0x00900000, 0x22100000, 0x00180008, 0x00102000]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat152,0,0.000000],
[barrierspat153,4,8, "Nonterritory1c",0,0,1,2,1,2,0x0,684,
  [ 0x003b3700, 0x00f060f0, 0x70b00000, 0x243c0000, 0x60f00000, 0x373b0000, 0x003c243c, 0x00b07000],
  [ 0x00201100, 0x00600040, 0x10200000, 0x00240000, 0x00600000, 0x11200000, 0x00240004, 0x00201000]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat153,3,0.000000],
[barrierspat154,5,8, "Nonterritory2",0,-2,2,0,2,2,0x0,758,
  [ 0x0070f040, 0xd0f00000, 0x3d340000, 0x003c1d07, 0x00f0d040, 0xf0700000, 0x1d3c0000, 0x00343d07],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180001, 0x00900000, 0x20100000, 0x00180000, 0x00102001]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat154,0,0.000000],
[barrierspat155,5,8, "Nonterritory3",0,-2,2,0,2,2,0x0,758,
  [ 0x00b0f080, 0xe0f00000, 0x3e380000, 0x003c2e0b, 0x00f0e080, 0xf0b00000, 0x2e3c0000, 0x00383e0b],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240002, 0x00600000, 0x10200000, 0x00240000, 0x00201002]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat155,3,0.000000],
[barrierspat156,2,8, "Nonterritory4",0,-1,1,0,1,1,0x8,721,
  [ 0x0070b000, 0x90f00000, 0x38340000, 0x003c1800, 0x00f09000, 0xb0700000, 0x183c0000, 0x00343800],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat156,0,0.000000],
[barrierspat157,3,8, "Nonterritory5",0,-1,2,0,2,1,0x8,721,
  [ 0x0030f070, 0xc0f00000, 0x3c300000, 0x003f0d00, 0x00f0c000, 0xf0300000, 0x0d3f0000, 0x00303c34],
  [ 0x00100020, 0x00100000, 0x00100000, 0x00120000, 0x00100000, 0x00100000, 0x00120000, 0x00100020]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat157,0,0.000000],
[barrierspat158,3,8, "Nonterritory6",0,-1,2,0,2,1,0x8,721,
  [ 0x0030f0b0, 0xc0f00000, 0x3c300000, 0x003f0e00, 0x00f0c000, 0xf0300000, 0x0e3f0000, 0x00303c38],
  [ 0x00200010, 0x00200000, 0x00200000, 0x00210000, 0x00200000, 0x00200000, 0x00210000, 0x00200010]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat158,3,0.000000],
[barrierspat159,2,8, "Nonterritory7",0,-1,1,1,1,2,0x2,721,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat159,3,1.000000],
[barrierspat160,2,8, "Nonterritory7b",0,-1,1,1,1,2,0x2,721,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat160,3,2.680000],
[barrierspat161,4,8, "Nonterritory7c",0,-2,1,1,1,3,0x2,758,
  [ 0x00f0fc00, 0xf0f0c000, 0xff3f0000, 0x0c3c3c3c, 0xc0f0f0f0, 0xfcf00000, 0x3c3c0c00, 0x003fff00],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat161,3,3.000000],
[barrierspat162,2,8, "Nonterritory8",0,-1,1,1,1,2,0x2,721,
  [ 0x007cf800, 0xd0f0b000, 0xbcf40000, 0x383c1c00, 0xb0f0d000, 0xf87c0000, 0x1c3c3800, 0x00f4bc00],
  [ 0x00240000, 0x00201000, 0x00600000, 0x10200000, 0x10200000, 0x00240000, 0x00201000, 0x00600000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat162,3,1.000000],
[barrierspat163,2,8, "Nonterritory8b",0,-1,1,1,1,2,0x2,721,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00240000, 0x00201000, 0x00600000, 0x10200000, 0x10200000, 0x00240000, 0x00201000, 0x00600000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat163,3,2.800000],
[barrierspat164,7,8, "Nonterritory9",0,-3,2,0,2,3,0x0,795,
  [ 0x00f0c0c0, 0xf0300000, 0x0f3f0000, 0x00303f3e, 0x0030f0f0, 0xc0f00000, 0x3f300000, 0x003f0f0e],
  [ 0x00200040, 0x00200000, 0x00200000, 0x00200100, 0x00200000, 0x00200000, 0x01200000, 0x00200004]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat164,3,1.000000],
[barrierspat165,7,8, "Nonterritory10",-2,0,0,2,2,2,0x0,686,
  [ 0x3f3f0000, 0x003f3f3d, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0x003f3f3d, 0x00f0f0f0, 0xf0f00000],
  [ 0x00260000, 0x00201020, 0x00600000, 0x10200000, 0x10200000, 0x00260000, 0x00201020, 0x00600000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat165,3,1.000000],
[barrierspat166,7,8, "Nonterritory11",0,-1,2,1,2,2,0x2,721,
  [ 0x00bcfcfc, 0xe0f0f000, 0xfcf80000, 0x3f3f2f00, 0xf0f0e000, 0xfcbc0000, 0x2f3f3f00, 0x00f8fcfc],
  [ 0x00186020, 0x40902000, 0x24900000, 0x201a0400, 0x20904000, 0x60180000, 0x041a2000, 0x00902420]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat166,0,1.600000],
[barrierspat167,1,4, "Nonterritory12",-1,0,0,1,1,1,0x0,685,
  [ 0x303c0000, 0x003c3000, 0x00f03000, 0x30f00000, 0x303c0000, 0x003c3000, 0x00f03000, 0x30f00000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat167,0,0.000000],
[barrierspat168,1,4, "Nonterritory13",-1,0,0,1,1,1,0x0,685,
  [ 0x303c0000, 0x003c3000, 0x00f03000, 0x30f00000, 0x303c0000, 0x003c3000, 0x00f03000, 0x30f00000],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat168,3,0.000000],
[barrierspat169,3,8, "Nonterritory14",-2,0,0,1,2,1,0x0,686,
  [ 0x3c3c0000, 0x003f3c00, 0x00f0f030, 0xf0f00000, 0x3c3f0000, 0x003c3c30, 0x00f0f000, 0xf0f00000],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat169,0,1.000000],
[barrierspat170,5,8, "Nonterritory15",-3,0,0,1,3,1,0x8,687,
  [ 0x3c3c0000, 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000, 0xf0f00000],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat170,0,1.000000],
[barrierspat171,3,8, "Nonterritory16",-1,-1,2,0,3,1,0x8,722,
  [ 0xc0f0f0f0, 0xfcf00000, 0x3c3c0c00, 0x003fff00, 0x00f0fc00, 0xf0f0c000, 0xff3f0000, 0x0c3c3c3c],
  [ 0x00200060, 0x00200000, 0x00200000, 0x00220100, 0x00200000, 0x00200000, 0x01220000, 0x00200024]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat171,3,1.000000],
[barrierspat172,3,8, "Nonterritory17",-1,0,1,1,2,1,0x8,685,
  [ 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000],
  [ 0x00240800, 0x00209000, 0x80600000, 0x18200000, 0x90200000, 0x08240000, 0x00201800, 0x00608000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat172,3,3.000000],
[barrierspat173,3,8, "Nonterritory17b",0,0,1,1,1,1,0x8,684,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00102400, 0x00904000, 0x60100000, 0x04180000, 0x40900000, 0x24100000, 0x00180400, 0x00106000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat173,0,3.000000],
[barrierspat174,4,8, "Nonterritory18a",0,-1,1,2,1,3,0x2,721,
  [ 0x00fef700, 0xf0f070e0, 0x7cfc0000, 0x343c3c00, 0x70f0f000, 0xf7fe0000, 0x3c3c342c, 0x00fc7c00],
  [ 0x00240100, 0x00201040, 0x00600000, 0x10200000, 0x10200000, 0x01240000, 0x00201004, 0x00600000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat174,3,3.000000],
[barrierspat175,6,8, "Nonterritory18b",0,-2,1,2,1,4,0x2,758,
  [ 0x00fef700, 0xf0f070e0, 0x7fff0000, 0x343c3c3c, 0x70f0f0f0, 0xf7fe0000, 0x3c3c342c, 0x00ff7f00],
  [ 0x00240100, 0x00201040, 0x00600000, 0x10200000, 0x10200000, 0x01240000, 0x00201004, 0x00600000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat175,3,3.000000],
[barrierspat176,2,8, "Nonterritory19",-1,-1,1,0,2,1,0x0,647,
  [ 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00, 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat176,3,1.600000],
[barrierspat177,2,8, "Nonterritory20",0,-1,1,0,1,1,0x0,647,
  [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat177,3,1.600000],
[barrierspat178,2,8, "Nonterritory21",-1,-1,1,0,2,1,0x0,722,
  [ 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00, 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat178,3,1.600000],
[barrierspat179,2,8, "Nonterritory22",-1,-1,1,0,2,1,0x0,647,
  [ 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0x0030fc00, 0x0030fc00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat179,3,1.000000],
[barrierspat180,1,4, "Nonterritory23",0,0,0,1,0,1,0x0,684,
  [ 0x003c0000, 0x00303000, 0x00f00000, 0x30300000, 0x30300000, 0x003c0000, 0x00303000, 0x00f00000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat180,0,0.000000],
[barrierspat181,1,4, "Nonterritory24",0,0,0,1,0,1,0x0,684,
  [ 0x003c0000, 0x00303000, 0x00f00000, 0x30300000, 0x30300000, 0x003c0000, 0x00303000, 0x00f00000],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x80000,0.000000,null,2,null,autohelperbarrierspat181,3,0.000000],
[barrierspat182,2,8, "Nonterritory25",0,0,1,1,1,1,0x8,684,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00240000, 0x00201000, 0x00600000, 0x10200000, 0x10200000, 0x00240000, 0x00201000, 0x00600000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat182,3,1.810000],
[barrierspat183,5,8, "Nonterritory26",0,-2,2,0,2,2,0x0,758,
  [ 0x00f0f0f0, 0xf0f00000, 0x3f3c0000, 0x003f3f0c, 0x00f0f0c0, 0xf0f00000, 0x3f3f0000, 0x003c3f3c],
  [ 0x00208060, 0x80200000, 0x09200000, 0x00220904, 0x00208040, 0x80200000, 0x09220000, 0x00200924]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat183,3,1.000000],
[barrierspat184,2,4, "Nonterritory27",0,0,0,2,0,2,0x0,684,
  [ 0x003f0000, 0x00303030, 0x00f00000, 0x30300000, 0x30300000, 0x003f0000, 0x00303030, 0x00f00000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat184,0,1.000000],
[barrierspat185,1,8, "Nonterritory28",0,0,1,1,1,1,0x0,684,
  [ 0x003c1c00, 0x0070f000, 0xd0f00000, 0x3c340000, 0xf0700000, 0x1c3c0000, 0x00343c00, 0x00f0d000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat185,0,1.000000],
[barrierspat186,5,8, "Nonterritory29",0,-1,1,2,1,3,0x2,721,
  [ 0x003fff00, 0xc0f0f0f0, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xff3f0000, 0x0c3c3c3c, 0x00f0fc00],
  [ 0x00148000, 0x80101000, 0x08500000, 0x10100800, 0x10108000, 0x80140000, 0x08101000, 0x00500800]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat186,0,1.600000],
[barrierspat187,5,8, "Nonterritory30",0,-1,1,2,1,3,0x2,721,
  [ 0x003fff00, 0xc0f0f0f0, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xff3f0000, 0x0c3c3c3c, 0x00f0fc00],
  [ 0x00284000, 0x40202000, 0x04a00000, 0x20200400, 0x20204000, 0x40280000, 0x04202000, 0x00a00400]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat187,3,1.960000],
[barrierspat188,7,8, "Nonterritory31",0,-1,1,3,1,4,0x2,721,
  [ 0x003fff00, 0xc0f0f0f0, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xff3f0000, 0x0c3c3c3c, 0x00f0fc00],
  [ 0x002a4000, 0x40202020, 0x04a00000, 0x20200400, 0x20204000, 0x402a0000, 0x04202020, 0x00a00400]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat188,3,1.600000],
[barrierspat189,6,4, "Nonterritory32",0,-2,2,0,2,2,0x0,758,
  [ 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0x003f3f3f],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100002, 0x00100000, 0x00100000, 0x00100000, 0x00100002]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat189,0,1.000000],
[barrierspat190,6,4, "Nonterritory33",0,0,2,2,2,2,0x0,684,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00210002, 0x00200010, 0x00200000, 0x00200000, 0x00200000, 0x00210000, 0x00200012, 0x00200000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat190,3,1.600000],
[barrierspat191,8,8, "Nonterritory34",0,-2,2,0,2,2,0x2,758,
  [ 0x00f0f070, 0xf0f00000, 0x3f3d0000, 0x003f3d1f, 0x00f0f0d0, 0xf0f00000, 0x3d3f0000, 0x003d3f37],
  [ 0x00109010, 0x80500000, 0x18100000, 0x00150800, 0x00508000, 0x90100000, 0x08150000, 0x00101810]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat191,0,1.497760],
[barrierspat192,4,8, "Nonterritory35",0,-2,1,0,1,2,0x0,758,
  [ 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0x003f3f00],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat192,0,1.600000],
[barrierspat193,6,8, "Nonterritory36",0,0,2,2,2,2,0x2,684,
  [ 0x003c3f38, 0x00f0f0c0, 0xf0f00000, 0x3e3f0000, 0xf0f00000, 0x3f3c0000, 0x003f3e0c, 0x00f0f0b0],
  [ 0x00180600, 0x00106080, 0x40900000, 0x24100000, 0x60100000, 0x06180000, 0x00102408, 0x00904000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat193,0,0.610000],
[barrierspat194,5,8, "Nonterritory37",0,0,2,2,2,2,0x2,684,
  [ 0x003c3f34, 0x00f0f0c0, 0xf0f00000, 0x3d3f0000, 0xf0f00000, 0x3f3c0000, 0x003f3d0c, 0x00f0f070],
  [ 0x00200900, 0x00208040, 0x80200000, 0x08200000, 0x80200000, 0x09200000, 0x00200804, 0x00208000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat194,3,0.970000],
[barrierspat195,7,8, "Nonterritory38",0,0,2,2,2,2,0x0,684,
  [ 0x003c3f3f, 0x00f0f0c0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3c0000, 0x003f3f0f, 0x00f0f0f0],
  [ 0x00180601, 0x00106080, 0x40900000, 0x24100000, 0x60100000, 0x06180000, 0x00102409, 0x00904000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat195,0,3.000000],
[barrierspat196,7,8, "Nonterritory39",0,0,2,2,2,2,0x0,684,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00210902, 0x00208050, 0x80200000, 0x08200000, 0x80200000, 0x09210000, 0x00200816, 0x00208000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat196,3,3.000000],
[barrierspat197,9,8, "Nonterritory40",0,-1,3,1,3,2,0x2,721,
  [ 0x00bcfcfc, 0xe0f0f000, 0xfcf80000, 0x3f3f2f00, 0xf0f0e000, 0xfcbc0000, 0x2f3f3f00, 0x00f8fcfc],
  [ 0x00206000, 0x40a00000, 0x24200000, 0x00280400, 0x00a04000, 0x60200000, 0x04280000, 0x00202400]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat197,3,1.000000],
[barrierspat198,6,8, "Nonterritory41",0,-2,2,1,2,3,0x0,758,
  [ 0x00b8fcf0, 0xe0f0e000, 0xffb80000, 0x2c3f2f0f, 0xe0f0e0c0, 0xfcb80000, 0x2f3f2c00, 0x00b8ff3f],
  [ 0x00100420, 0x00104000, 0x42100000, 0x04120008, 0x40100080, 0x04100000, 0x00120400, 0x00104220]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat198,0,1.000000],
[barrierspat199,3,8, "Nonterritory42",0,0,1,1,1,1,0x0,684,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00180400, 0x00106000, 0x40900000, 0x24100000, 0x60100000, 0x04180000, 0x00102400, 0x00904000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat199,0,3.960000],
[barrierspat200,9,8, "Nonterritory43",0,-1,2,2,2,3,0x0,721,
  [ 0x00bdffbf, 0xe0f0f0d0, 0xfcf80000, 0x3f3f2e00, 0xf0f0e000, 0xffbd0000, 0x2e3f3f1f, 0x00f8fcf8],
  [ 0x00184212, 0x40102080, 0x04900000, 0x20110400, 0x20104000, 0x42180000, 0x0411200a, 0x00900410]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat200,0,1.600000],
[barrierspat201,13,8, "Nonterritory44",0,0,2,4,2,4,0x2,684,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x001a0500, 0x00106060, 0x40900000, 0x24100000, 0x60100000, 0x051a0000, 0x00102424, 0x00904000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat201,0,1.600000],
[barrierspat202,4,8, "Nonterritory45",0,0,1,2,1,2,0x0,684,
  [ 0x003f0f00, 0x0030f0f0, 0xc0f00000, 0x3c300000, 0xf0300000, 0x0f3f0000, 0x00303c3c, 0x00f0c000],
  [ 0x00120800, 0x00108020, 0x80100000, 0x08100000, 0x80100000, 0x08120000, 0x00100820, 0x00108000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat202,0,1.186000],
[barrierspat203,8,8, "Nonterritory46",0,-2,3,1,3,3,0x0,758,
  [ 0x0030fcfc, 0xc0f0c000, 0xff300000, 0x0f3f0f0f, 0xc0f0c0c0, 0xfc300000, 0x0f3f0f00, 0x0030ffff],
  [ 0x00200000, 0x00200000, 0x01200000, 0x00200006, 0x00200040, 0x00200000, 0x00200000, 0x00200102]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat203,3,1.000000],
[barrierspat204,6,4, "Nonterritory47",-1,0,0,4,1,4,0x0,685,
  [ 0x0a3f0000, 0x00303838, 0x00f08000, 0xb0300000, 0x38300000, 0x003f0a00, 0x0030b0b0, 0x80f00000],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat204,3,1.600000],
[barrierspat205,4,8, "Nonterritory48",-1,0,1,2,2,2,0x0,685,
  [ 0x0c3f0f00, 0x0030fcf0, 0xc0f0c000, 0xfc300000, 0xfc300000, 0x0f3f0c00, 0x0030fc3c, 0xc0f0c000],
  [ 0x00100900, 0x00108040, 0x80100000, 0x08100000, 0x80100000, 0x09100000, 0x00100804, 0x00108000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat205,0,3.000000],
[barrierspat206,4,8, "Nonterritory49",0,-1,2,1,2,2,0x0,721,
  [ 0x0030fcf0, 0xc0f0c000, 0xfc300000, 0x0c3f0f00, 0xc0f0c000, 0xfc300000, 0x0f3f0c00, 0x0030fc3c],
  [ 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x80100000, 0x08100000, 0x00100800, 0x00108000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat206,0,1.600000],
[barrierspat207,4,8, "Nonterritory50",0,-2,2,0,2,2,0x0,758,
  [ 0x0030f0f0, 0xc0f00000, 0x3f300000, 0x003f0f0c, 0x00f0c0c0, 0xf0300000, 0x0f3f0000, 0x00303f3c],
  [ 0x00100000, 0x00100000, 0x02100000, 0x00100008, 0x00100080, 0x00100000, 0x00100000, 0x00100200]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat207,0,1.600000],
[barrierspat208,5,8, "Nonterritory51",0,-1,2,1,2,2,0x0,721,
  [ 0x00f4fcfc, 0xf0f0d000, 0xfc7c0000, 0x1f3f3f00, 0xd0f0f000, 0xfcf40000, 0x3f3f1f00, 0x007cfcfc],
  [ 0x00102018, 0x00900000, 0x20100000, 0x02190000, 0x00900000, 0x20100000, 0x00190200, 0x00102090]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat208,0,2.800000],
[barrierspat209,4,8, "Nonterritory52",0,0,2,2,2,2,0x0,684,
  [ 0x00303f0c, 0x00f0c0c0, 0xf0300000, 0x0f3c0000, 0xc0f00000, 0x3f300000, 0x003c0f0c, 0x0030f0c0],
  [ 0x00100900, 0x00108040, 0x80100000, 0x08100000, 0x80100000, 0x09100000, 0x00100804, 0x00108000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat209,0,1.690000],
[barrierspat210,5,8, "Nonterritory53",0,0,2,2,2,2,0x0,684,
  [ 0x003f3f0c, 0x00f0f0f0, 0xf0f00000, 0x3f3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3f3c, 0x00f0f0c0],
  [ 0x00110900, 0x00108050, 0x80100000, 0x08100000, 0x80100000, 0x09110000, 0x00100814, 0x00108000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat210,0,2.800000],
[barrierspat211,7,8, "Nonterritory54",0,0,2,2,2,2,0x2,684,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat211,0,3.600000],
[barrierspat212,2,8, "Nonterritory55",0,-2,1,1,1,3,0x2,758,
  [ 0x00fcfc00, 0xf0f0f000, 0xfffc0000, 0x3c3c3c0c, 0xf0f0f0c0, 0xfcfc0000, 0x3c3c3c00, 0x00fcff00],
  [ 0x00200000, 0x00200000, 0x01200000, 0x00200004, 0x00200040, 0x00200000, 0x00200000, 0x00200100]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat212,3,1.600000],
[barrierspat213,5,8, "Nonterritory56",-1,0,1,2,2,2,0x0,685,
  [ 0x3f3f0f00, 0x003cfcfc, 0xc0f0f000, 0xfcf00000, 0xfc3c0000, 0x0f3f3f00, 0x00f0fcfc, 0xf0f0c000],
  [ 0x00210400, 0x00204010, 0x40200000, 0x04200000, 0x40200000, 0x04210000, 0x00200410, 0x00204000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat213,3,1.000000],
[barrierspat214,8,8, "Nonterritory57",0,-2,2,0,2,2,0xa,758,
  [ 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0x003f3f3f],
  [ 0x00209000, 0x80600000, 0x18200000, 0x00240800, 0x00608000, 0x90200000, 0x08240000, 0x00201800]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat214,3,1.600000],
[barrierspat215,8,4, "Nonterritory58",0,0,1,4,1,4,0x2,684,
  [ 0x003f1f00, 0x0070f0f0, 0xd0f00000, 0x3c340000, 0xf0700000, 0x1f3f0000, 0x00343c3c, 0x00f0d000],
  [ 0x00250000, 0x00201010, 0x00600000, 0x10200000, 0x10200000, 0x00250000, 0x00201010, 0x00600000]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat215,3,4.800000],
[barrierspat216,7,8, "Nonterritory59",0,-1,2,2,2,3,0x0,721,
  [ 0x003fff3c, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xff3f0000, 0x0c3f3f3c, 0x00f0fcf0],
  [ 0x00168014, 0x80101020, 0x08500000, 0x11110800, 0x10108000, 0x80160000, 0x08111120, 0x00500850]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat216,0,4.800000],
[barrierspat217,5,8, "Nonterritory60",0,-2,2,1,2,3,0x0,758,
  [ 0x003cfc3c, 0xc0f0f000, 0xfff00000, 0x3f3f0c0c, 0xf0f0c0c0, 0xfc3c0000, 0x0c3f3f00, 0x00f0fff0],
  [ 0x00140018, 0x00101000, 0x02500000, 0x12110008, 0x10100080, 0x00140000, 0x00111200, 0x00500290]
  , 0x80000,0.000000,null,3,null,autohelperbarrierspat217,0,4.800000],
[null, 0,0,null,0,0,0,0,0,0,0,0,[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],0,0.0,null,0,null,null,0,0.0]
]


const barrierspat = data.map(item => new Pattern(item))

export const barrierspat_db = new PatternDB([-1, 0, barrierspat, null])