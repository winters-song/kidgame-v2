import {PatternDB, Pattern, ATTACK_MACRO, PatternAttribute, attributeType, DEFEND_MACRO} from "./Patterns";
import {AFFINE_TRANSFORM} from "../Liberty";
import {codes, NO_MOVE} from "../Constants";


const owl_defendpat0 = [
[684,2],	[685,2]
]

const owl_defendpat1 = [
[684,2],	[647,4]
]

const owl_defendpat2 = [
[648,2]
]

const owl_defendpat3 = [
[684,2],	[683,4]
]

const owl_defendpat4 = [
[684,2]
]

const owl_defendpat5 = [
[684,2],	[685,2]
]

const owl_defendpat6 = [
[685,2],	[648,2]
]

const owl_defendpat7 = [
[685,2],	[683,2],	[648,2]
]

const owl_defendpat8 = [
[757,2],	[684,2]
]

const owl_defendpat9 = [
[684,2],	[757,2],	[683,2]
]

const owl_defendpat10 = [
[684,2],	[723,2],	[722,2],	[758,4]
]

const owl_defendpat11 = [
[684,2],	[648,2],	[611,2]
]

const owl_defendpat12 = [
[758,2]
]

const owl_defendpat13 = [
[757,2],	[684,2]
]

const owl_defendpat14 = [
[684,2],	[757,2]
]

const owl_defendpat15 = [
[684,2],	[759,2],	[796,2],	[758,4]
]

const owl_defendpat16 = [
[648,2]
]

const owl_defendpat17 = [
[684,2],	[833,4],	[870,4],	[685,4],
[871,4],	[683,4]
]

const owl_defendpat18 = [
[684,2]
]

const owl_defendpat19 = [
[686,2]
]

const owl_defendpat20 = [
[649,2],	[760,4]
]

const owl_defendpat21 = [
[684,2],	[649,2]
]

const owl_defendpat22 = [
[684,2],	[759,2],	[611,4]
]

const owl_defendpat23 = [
[684,2],	[722,2]
]

const owl_defendpat24 = [
[720,2],	[757,2],	[684,2]
]

const owl_defendpat25 = [
[684,2],	[648,4]
]

const owl_defendpat26 = [
[832,2]
]

const owl_defendpat27 = [
[684,2],	[647,2]
]

const owl_defendpat28 = [
[684,2],	[686,2],	[649,2],	[683,4]
]

const owl_defendpat29 = [
[647,2],	[684,2],	[759,4],	[758,4],
[760,4]
]

const owl_defendpat30 = [
[759,2],	[682,4],	[719,4],	[685,4]
]

const owl_defendpat31 = [
[684,2],	[718,2],	[793,4],	[792,4],
[755,4],	[756,4]
]

const owl_defendpat32 = [
[610,2],	[720,2],	[574,4],	[759,4],
[758,4],	[756,4],	[757,4],	[573,4]
]

const owl_defendpat33 = [
[647,2],	[684,2]
]

const owl_defendpat34 = [
[684,2],	[647,2]
]

const owl_defendpat35 = [
[684,2],	[647,2]
]

const owl_defendpat36 = [
[648,2]
]

const owl_defendpat37 = [
[684,2]
]

const owl_defendpat38 = [
[684,2],	[648,2]
]

const owl_defendpat39 = [
[684,2],	[647,4]
]

const owl_defendpat40 = [
[684,2],	[649,4],	[648,4]
]

const owl_defendpat41 = [
[687,2],	[650,4]
]

const owl_defendpat42 = [
[757,2],	[720,2]
]

const owl_defendpat43 = [
[757,2],	[720,2]
]

const owl_defendpat44 = [
[684,2],	[758,4],	[759,4]
]

const owl_defendpat45 = [
[721,2],	[684,2],	[759,2]
]

const owl_defendpat46 = [
[684,2],	[757,2],	[720,2]
]

const owl_defendpat47 = [
[684,2],	[648,2],	[646,2],	[759,4]
]

const owl_defendpat48 = [
[684,2]
]

const owl_defendpat49 = [
[684,2],	[647,4]
]

const owl_defendpat50 = [
[758,2],	[721,2]
]

const owl_defendpat51 = [
[722,2],	[684,2]
]

const owl_defendpat52 = [
[684,2],	[683,4]
]

const owl_defendpat53 = [
[684,2]
]

const owl_defendpat54 = [
[684,2],	[683,2],	[794,2]
]

const owl_defendpat55 = [
[684,2],	[683,2],	[796,4]
]

const owl_defendpat56 = [
[684,2],	[759,2],	[796,2],	[758,4]
]

const owl_defendpat57 = [
[684,2],	[647,4],	[720,4],	[683,4]
]

const owl_defendpat58 = [
[684,2],	[720,4],	[683,4]
]

const owl_defendpat59 = [
[684,2],	[685,2],	[683,4],	[720,4]
]

const owl_defendpat60 = [
[685,2],	[648,2]
]

const owl_defendpat61 = [
[757,2],	[684,2],	[611,4],	[610,4]
]

const owl_defendpat62 = [
[684,2],	[683,4],	[720,4]
]

const owl_defendpat63 = [
[684,2],	[610,2],	[573,2],	[685,2]
]

const owl_defendpat64 = [
[649,2],	[721,2],	[686,4],	[648,4]
]

const owl_defendpat65 = [
[646,2],	[722,2],	[721,2],	[723,4]
]

const owl_defendpat66 = [
[648,2],	[647,2],	[720,2],	[722,2],
[649,4]
]

const owl_defendpat67 = [
[647,2],	[685,2],	[645,4],	[646,4],
[682,4]
]

const owl_defendpat68 = [
[721,2],	[684,2],	[759,4]
]

const owl_defendpat69 = [
[684,2],	[759,4],	[757,4],	[758,4],
[683,4],	[720,4]
]

const owl_defendpat70 = [
[720,2],	[684,2],	[758,2],	[722,2]
]

const owl_defendpat71 = [
[684,2],	[647,4],	[610,4],	[574,4],
[611,4],	[612,4],	[649,4],	[573,4],
[575,4]
]

const owl_defendpat72 = [
[685,2],	[722,4]
]

const owl_defendpat73 = [
[684,2]
]

const owl_defendpat74 = [
[684,2],	[721,2]
]

const owl_defendpat75 = [
[722,2]
]

const owl_defendpat76 = [
[683,2],	[684,2]
]

const owl_defendpat77 = [
[648,2],	[647,2]
]

const owl_defendpat78 = [
[759,2]
]

const owl_defendpat79 = [
[687,2],	[650,4]
]

const owl_defendpat80 = [
[685,2],	[759,2]
]

const owl_defendpat81 = [
[684,2],	[686,4]
]

const owl_defendpat82 = [
[648,2],	[723,4],	[722,4],	[721,4]
]

const owl_defendpat83 = [
[648,2],	[723,4],	[722,4],	[721,4]
]

const owl_defendpat84 = [
[648,2]
]

const owl_defendpat85 = [
[684,2],	[720,2],	[648,4],	[685,4],
[682,4]
]

const owl_defendpat86 = [
[684,2],	[720,2],	[648,4],	[685,4],
[682,4]
]

const owl_defendpat87 = [
[647,2],	[722,2]
]

const owl_defendpat88 = [
[684,2]
]

const owl_defendpat89 = [
[647,2],	[610,2],	[685,2]
]

const owl_defendpat90 = [
[647,2],	[648,2],	[684,2],	[723,4],
[686,4],	[649,4]
]

const owl_defendpat91 = [
[684,2],	[686,2]
]

const owl_defendpat92 = [
[648,2],	[647,2]
]

const owl_defendpat93 = [
[646,2],	[683,2],	[647,2],	[685,2],
[720,4]
]

const owl_defendpat94 = [
[647,2],	[685,2],	[648,4]
]

const owl_defendpat95 = [
[684,2],	[646,2],	[720,4],	[610,4]
]

const owl_defendpat96 = [
[684,2]
]

const owl_defendpat97 = [
[684,2]
]

const owl_defendpat98 = [
[684,2]
]

const owl_defendpat99 = [
[722,2],	[686,2]
]

const owl_defendpat100 = [
[649,2],	[686,4]
]

const owl_defendpat101 = [
[684,2],	[648,4],	[647,4]
]

const owl_defendpat102 = [
[721,2],	[684,2],	[647,4],	[610,4]
]

const owl_defendpat103 = [
[722,2],	[759,2],	[684,2]
]

const owl_defendpat104 = [
[684,2],	[720,2],	[646,4],	[683,4]
]

const owl_defendpat105 = [
[684,2],	[647,4]
]

const owl_defendpat106 = [
[720,2],	[757,2],	[684,2]
]

const owl_defendpat107 = [
[757,2],	[684,2],	[758,2]
]

const owl_defendpat108 = [
[722,2],	[647,2],	[684,2]
]

const owl_defendpat109 = [
[649,2],	[685,2],	[684,2],	[683,2],
[609,4]
]

const owl_defendpat110 = [
[684,2],	[722,2]
]

const owl_defendpat111 = [
[684,2],	[647,2],	[722,2]
]

const owl_defendpat112 = [
[684,2],	[722,2]
]

const owl_defendpat113 = [
[647,2],	[684,2],	[757,4]
]

const owl_defendpat114 = [
[758,2],	[684,2],	[647,2],	[757,4]
]

const owl_defendpat115 = [
[648,2],	[684,2]
]

const owl_defendpat116 = [
[721,2],	[647,2],	[685,2]
]

const owl_defendpat117 = [
[721,2],	[720,2],	[685,2],	[649,2],
[646,4]
]

const owl_defendpat118 = [
[684,2],	[720,2]
]

const owl_defendpat119 = [
[684,2],	[720,2],	[796,4],	[795,4],
[794,4],	[797,4]
]

const owl_defendpat120 = [
[723,2],	[722,2],	[684,2],	[649,4]
]

const owl_defendpat121 = [
[684,2],	[611,2],	[647,2],	[722,2]
]

const owl_defendpat122 = [
[722,2],	[758,2],	[684,2],	[759,4],
[757,4]
]

const owl_defendpat123 = [
[758,2],	[684,2],	[722,2],	[759,4],
[757,4]
]

const owl_defendpat124 = [
[722,2],	[723,2],	[684,2],	[686,2]
]

const owl_defendpat125 = [
[722,2],	[686,2],	[684,2]
]

const owl_defendpat126 = [
[684,2],	[721,2],	[647,4]
]

const owl_defendpat127 = [
[721,2],	[758,2],	[684,2],	[647,2],
[610,2]
]

const owl_defendpat128 = [
[686,2],	[611,2],	[722,2],	[684,2],
[721,4],	[647,4]
]

const owl_defendpat129 = [
[722,2],	[684,2],	[686,2]
]

const owl_defendpat130 = [
[721,2],	[647,2]
]

const owl_defendpat131 = [
[721,2],	[684,2],	[647,4]
]

const owl_defendpat132 = [
[684,2],	[683,4],	[682,4]
]

const owl_defendpat133 = [
[684,2],	[686,2]
]

const owl_defendpat134 = [
[758,2],	[720,2],	[684,2],	[722,2],
[647,2],	[683,4],	[610,4]
]

const owl_defendpat135 = [
[686,2],	[721,2],	[684,2],	[648,2],
[649,4]
]

const owl_defendpat136 = [
[683,2],	[646,2],	[758,2],	[759,2],
[720,2],	[611,2],	[610,2]
]

const owl_defendpat137 = [
[684,2],	[683,2],	[723,2],	[760,2],
[756,2],	[685,2],	[719,2]
]

const owl_defendpat138 = [
[686,2],	[684,2],	[722,2],	[647,4],
[721,4]
]

const owl_defendpat139 = [
[684,2],	[721,2],	[759,2],	[723,2],
[758,4],	[611,4],	[647,4],	[610,4]
]

const owl_defendpat140 = [
[648,2],	[723,2],	[686,2],	[684,2],
[647,4]
]

const owl_defendpat141 = [
[758,2],	[684,2],	[720,2],	[722,2],
[646,4],	[759,4]
]

const owl_defendpat142 = [
[722,2],	[720,2],	[758,2],	[684,2],
[683,4],	[796,4]
]

const owl_defendpat143 = [
[758,2],	[722,2],	[684,2],	[720,2],
[759,4],	[646,4],	[796,4]
]

const owl_defendpat144 = [
[684,2],	[722,2],	[758,2],	[720,2],
[759,4]
]

const owl_defendpat145 = [
[721,2],	[683,2],	[685,2],	[722,4]
]

const owl_defendpat146 = [
[720,2],	[758,2],	[722,2],	[684,2],
[759,2],	[683,4]
]

const owl_defendpat147 = [
[682,2],	[648,2],	[720,2],	[646,2],
[684,2],	[647,4]
]

const owl_defendpat148 = [
[683,2],	[647,2],	[721,2],	[758,4]
]

const owl_defendpat149 = [
[757,2],	[722,2],	[684,2],	[720,2]
]

const owl_defendpat150 = [
[757,2],	[758,2],	[684,2],	[759,4]
]

const owl_defendpat151 = [
[684,2],	[720,2],	[646,4]
]

const owl_defendpat152 = [
[647,2],	[684,2]
]

const owl_defendpat153 = [
[720,2],	[684,2],	[759,2],	[758,2]
]

const owl_defendpat154 = [
[684,2],	[721,2],	[686,2]
]

const owl_defendpat155 = [
[684,2],	[648,2],	[647,2],	[649,2],
[650,2]
]

const owl_defendpat156 = [
[647,2],	[722,2]
]

const owl_defendpat157 = [
[648,2],	[649,2],	[647,2],	[646,2],
[722,2]
]

const owl_defendpat158 = [
[683,2],	[721,2],	[647,2],	[648,2],
[646,2]
]

const owl_defendpat159 = [
[650,2],	[649,2],	[683,2],	[647,2],
[687,2],	[684,2],	[648,4]
]

const owl_defendpat160 = [
[647,2]
]

const owl_defendpat161 = [
[684,2],	[647,2],	[722,2],	[612,2],
[723,2],	[611,2]
]

const owl_defendpat162 = [
[721,2],	[684,2],	[758,2]
]

const owl_defendpat163 = [
[684,2],	[722,2]
]

const owl_defendpat164 = [
[684,2],	[648,2],	[722,2],	[683,4],
[721,4]
]

const owl_defendpat165 = [
[684,2],	[647,4]
]

const owl_defendpat166 = [
[684,2],	[722,2],	[573,4]
]

const owl_defendpat167 = [
[683,2],	[758,2],	[720,2]
]

const owl_defendpat168 = [
[684,2],	[648,4]
]

const owl_defendpat169 = [
[684,2],	[648,2],	[683,2],	[647,4],
[720,4]
]

const owl_defendpat170 = [
[720,2],	[757,2],	[647,2],	[684,2],
[648,4]
]

const owl_defendpat171 = [
[759,2],	[721,2],	[684,2],	[760,2],
[758,4],	[647,4]
]

const owl_defendpat172 = [
[684,2],	[647,2]
]

const owl_defendpat173 = [
[686,2],	[722,2],	[684,2],	[723,4],
[721,4]
]

const owl_defendpat174 = [
[722,2],	[684,2],	[686,2]
]

const owl_defendpat175 = [
[684,2],	[722,2],	[686,2]
]

const owl_defendpat176 = [
[684,2],	[722,2],	[648,4],	[686,4]
]

const owl_defendpat177 = [
[684,2],	[722,2],	[648,4],	[721,4]
]

const owl_defendpat178 = [
[722,2],	[684,2],	[721,4]
]

const owl_defendpat179 = [
[684,2],	[759,4]
]

const owl_defendpat180 = [
[684,2],	[722,2],	[648,4],	[686,4]
]

const owl_defendpat181 = [
[684,2],	[759,2],	[758,2],	[685,2],
[760,4],	[686,4]
]

const owl_defendpat182 = [
[723,2],	[684,2],	[721,2],	[686,2],
[610,2],	[609,4],	[646,4],	[647,4]
]

const owl_defendpat183 = [
[647,2],	[722,2],	[648,2],	[721,2],
[720,4]
]

const owl_defendpat184 = [
[721,2],	[722,2],	[648,2],	[684,2],
[649,2]
]

const owl_defendpat185 = [
[684,2]
]

const owl_defendpat186 = [
[722,2]
]

const owl_defendpat187 = [
[723,2],	[684,2],	[721,2],	[686,2],
[759,2]
]

const owl_defendpat188 = [
[684,2],	[649,2],	[722,2],	[686,2],
[611,2]
]

const owl_defendpat189 = [
[684,2]
]

const owl_defendpat190 = [
[684,2],	[720,2]
]

const owl_defendpat191 = [
[722,2],	[684,2],	[686,2],	[723,4]
]

const owl_defendpat192 = [
[649,2],	[650,2],	[684,2],	[723,2],
[722,4],	[687,4]
]

const owl_defendpat193 = [
[721,2],	[646,2],	[683,2],	[685,2],
[720,4]
]

const owl_defendpat194 = [
[684,2],	[758,2],	[686,2],	[759,2]
]

const owl_defendpat195 = [
[684,2],	[722,2],	[610,4],	[611,4]
]

const owl_defendpat196 = [
[649,2],	[647,2],	[723,2],	[684,2],
[648,4],	[686,4]
]

const owl_defendpat197 = [
[648,2],	[722,2],	[686,2],	[684,2]
]

const owl_defendpat198 = [
[684,2],	[721,2],	[756,2],	[757,2],
[755,4],	[647,4]
]

const owl_defendpat199 = [
[684,2]
]

const owl_defendpat200 = [
[684,2]
]

const owl_defendpat201 = [
[684,2],	[721,4]
]

const owl_defendpat202 = [
[684,2]
]

const owl_defendpat203 = [
[647,2],	[684,2],	[721,2]
]

const owl_defendpat204 = [
[684,2],	[647,2]
]

const owl_defendpat205 = [
[721,2],	[758,2],	[684,2]
]

const owl_defendpat206 = [
[759,2],	[684,2],	[721,2],	[647,4],
[760,4]
]

const owl_defendpat207 = [
[685,2],	[684,2],	[683,4],	[686,4],
[760,4],	[723,4]
]

const owl_defendpat208 = [
[611,2],	[684,2],	[612,4],	[721,4]
]

const owl_defendpat209 = [
[758,2],	[721,2]
]

const owl_defendpat210 = [
[758,2],	[721,2]
]

const owl_defendpat211 = [
[758,2],	[721,2],	[759,2]
]

const owl_defendpat212 = [
[758,2],	[721,2],	[759,2]
]

const owl_defendpat213 = [
[684,2],	[610,4],	[647,4]
]

const owl_defendpat214 = [
[683,2],	[684,2],	[757,4],	[758,4],
[647,4],	[720,4]
]

const owl_defendpat215 = [
[684,2],	[648,2],	[686,4],	[649,4]
]

const owl_defendpat216 = [
[722,2],	[684,2],	[646,4],	[683,4]
]

const owl_defendpat217 = [
[684,2]
]

const owl_defendpat218 = [
[647,2],	[683,2],	[649,2],	[684,2],
[648,2]
]

const owl_defendpat219 = [
[685,2],	[720,2],	[683,2],	[648,2],
[684,2]
]

const owl_defendpat220 = [
[646,2],	[682,2],	[719,2]
]

const owl_defendpat221 = [
[646,2],	[682,2],	[719,2]
]

const owl_defendpat222 = [
[646,2],	[684,2],	[721,2]
]

const owl_defendpat223 = [
[646,2],	[684,2],	[721,2]
]

const owl_defendpat224 = [
[722,2],	[684,2],	[647,2],	[649,4],
[648,4]
]

const owl_defendpat225 = [
[684,2],	[648,2],	[646,4],	[683,4]
]

const owl_defendpat226 = [
[684,2],	[648,2],	[720,2],	[646,4]
]

const owl_defendpat227 = [
[684,2],	[720,2],	[648,2],	[758,4],
[757,4],	[649,4],	[686,4]
]

const owl_defendpat228 = [
[684,2],	[758,2],	[683,2],	[647,2],
[757,4]
]

const owl_defendpat229 = [
[723,2],	[757,2],	[758,2],	[686,2],
[759,2],	[647,2],	[649,2]
]

const owl_defendpat230 = [
[719,2],	[682,2],	[756,2],	[759,2],
[757,2],	[647,2],	[645,2],	[758,2]
]

const owl_defendpat231 = [
[720,2],	[684,2],	[760,2],	[758,2],
[648,2],	[646,2],	[683,2],	[759,2]
]

const owl_defendpat232 = [
[646,2],	[684,2],	[720,4],	[683,4]
]

const owl_defendpat233 = [
[684,2],	[611,4],	[609,4],	[610,4],
[646,4]
]

const owl_defendpat234 = [
[647,2],	[722,2],	[684,2],	[759,2],
[797,4]
]

const owl_defendpat235 = [
[685,2],	[684,2],	[611,4],	[610,4],
[648,4]
]

const owl_defendpat236 = [
[719,2],	[682,2],	[684,2],	[646,2]
]

const owl_defendpat237 = [
[611,2],	[720,2],	[684,2],	[646,2],
[610,2],	[683,4]
]

const owl_defendpat238 = [
[760,2],	[759,2],	[721,2],	[683,2],
[648,2],	[646,2],	[758,4],	[720,4]
]

const owl_defendpat239 = [
[684,2],	[720,2],	[647,4]
]

const owl_defendpat240 = [
[719,2],	[683,2],	[685,2],	[757,2],
[684,2],	[686,4]
]

const owl_defendpat241 = [
[683,2],	[719,2],	[757,2],	[684,2],
[685,2]
]

const owl_defendpat242 = [
[647,2]
]

const owl_defendpat243 = [
[684,2]
]

const owl_defendpat244 = [
[719,2],	[611,2],	[646,2],	[682,4],
[610,4]
]

const owl_defendpat245 = [
[686,2],	[648,2],	[647,2],	[722,2]
]

const owl_defendpat246 = [
[683,2],	[720,2],	[722,2],	[721,2],
[759,4],	[760,4]
]

const owl_defendpat247 = [
[759,2],	[685,2],	[720,2],	[645,2],
[682,2],	[721,2],	[758,2]
]

const owl_defendpat248 = [
[684,2],	[682,2],	[683,2]
]

const owl_defendpat249 = [
[720,2],	[647,2],	[684,2]
]

const owl_defendpat250 = [
[647,2],	[684,2],	[721,2],	[758,2],
[610,2],	[760,2],	[759,2]
]

const owl_defendpat251 = [
[721,2],	[684,2]
]

const owl_defendpat252 = [
[683,2],	[759,2],	[758,2],	[646,2],
[757,4]
]

const owl_defendpat253 = [
[683,2],	[759,2],	[758,2],	[647,2],
[646,2],	[757,4]
]

const owl_defendpat254 = [
[759,2],	[758,2],	[647,2],	[683,2],
[646,2],	[757,4]
]

const owl_defendpat255 = [
[646,2],	[684,2],	[611,4]
]

const owl_defendpat256 = [
[684,2]
]

const owl_defendpat257 = [
[684,2]
]

const owl_defendpat258 = [
[684,2]
]

const owl_defendpat259 = [
[721,2]
]

const owl_defendpat260 = [
[683,2],	[646,2],	[649,2]
]

const owl_defendpat261 = [
[683,2],	[646,2],	[649,2]
]

const owl_defendpat262 = [
[649,2],	[611,2],	[683,2],	[646,2],
[610,2]
]

const owl_defendpat263 = [
[684,2]
]

const owl_defendpat264 = [
[647,2],	[645,4]
]

const owl_defendpat265 = [
[647,2],	[645,4]
]

const owl_defendpat266 = [
[608,4],	[644,4],	[682,4],	[719,4],
[607,4],	[645,4]
]

const owl_defendpat267 = [
[722,2],	[684,2]
]

const owl_defendpat268 = [
[684,2]
]

const owl_defendpat269 = [
[722,2],	[684,2]
]

const owl_defendpat270 = [
[722,2],	[757,2],	[684,2],	[720,2],
[794,4]
]

const owl_defendpat271 = [
[722,2],	[684,2]
]

const owl_defendpat272 = [
[684,2],	[722,2],	[647,4],	[646,4]
]

const owl_defendpat273 = [
[685,2],	[723,2],	[684,2]
]

const owl_defendpat274 = [
[685,2],	[684,2],	[723,2],	[759,4],
[758,4],	[757,4],	[760,4],	[683,4]
]

const owl_defendpat275 = [
[722,2],	[684,2]
]

const owl_defendpat276 = [
[647,2],	[721,2]
]

const owl_defendpat277 = [
[647,2],	[721,2]
]

const owl_defendpat278 = [
[647,2],	[721,2]
]

const owl_defendpat279 = [
[685,2]
]

const owl_defendpat280 = [
[685,2]
]

const owl_defendpat281 = [
[648,2]
]

const owl_defendpat282 = [
[648,2]
]

const owl_defendpat283 = [
[648,2]
]

const owl_defendpat284 = [
[720,2],	[647,2],	[683,2]
]

const owl_defendpat285 = [
[684,2],	[687,2],	[648,4],	[649,4]
]

const owl_defendpat286 = [
[685,2],	[648,2],	[758,4],	[720,4],
[759,4]
]

const owl_defendpat287 = [
[647,2],	[759,2]
]

const owl_defendpat288 = [
[722,2],	[684,2]
]

const owl_defendpat289 = [
[685,2],	[758,2],	[722,2]
]

const owl_defendpat290 = [
[758,2],	[647,2],	[685,2],	[722,2]
]

const owl_defendpat291 = [
[648,2]
]

const owl_defendpat292 = [
[721,2],	[683,2],	[720,2]
]

const owl_defendpat293 = [
[720,2],	[645,2],	[683,2],	[758,2],
[757,4]
]

const owl_defendpat294 = [
[647,2],	[683,2],	[758,2],	[720,2],
[757,4]
]

const owl_defendpat295 = [
[685,2],	[610,2],	[648,2],	[721,2],
[646,2],	[611,4]
]

const owl_defendpat296 = [
[685,2],	[648,2],	[721,2],	[646,2],
[645,2],	[610,2],	[611,4]
]

const owl_defendpat297 = [
[685,2],	[686,2],	[648,2],	[609,4]
]

const owl_defendpat298 = [
[647,2],	[683,2],	[646,4]
]

const owl_defendpat299 = [
[646,2],	[683,2]
]

const owl_defendpat300 = [
[758,2],	[720,2],	[757,2]
]

const owl_defendpat301 = [
[685,2],	[647,2],	[683,2],	[759,4],
[757,4],	[758,4]
]

const owl_defendpat302 = [
[649,2],	[612,4],	[720,4]
]

const owl_defendpat303 = [
[722,2],	[760,4],	[723,4],	[646,4]
]

const owl_defendpat304 = [
[684,2],	[721,2],	[646,4],	[760,4],
[683,4]
]

const owl_defendpat305 = [
[686,2],	[797,4],	[720,4],	[757,4],
[794,4],	[796,4],	[723,4],	[683,4],
[795,4]
]

const owl_defendpat306 = [
[684,2],	[647,2],	[724,4],	[761,4],
[759,4],	[758,4],	[687,4],	[650,4],
[760,4]
]

const owl_defendpat307 = [
[647,2],	[650,4],	[760,4],	[761,4],
[687,4],	[759,4],	[758,4],	[724,4]
]

const owl_defendpat308 = [
[684,2]
]

const owl_defendpat309 = [
[648,2],	[684,2],	[647,2],	[757,4],
[646,4]
]

const owl_defendpat310 = [
[647,2],	[721,2]
]

const owl_defendpat311 = [
[722,2],	[721,2],	[611,4],	[610,4],
[646,4],	[612,4]
]

const owl_defendpat312 = [
[721,2]
]

const owl_defendpat313 = [
[647,2],	[686,2],	[683,2],	[646,4]
]

const owl_defendpat314 = [
[683,2],	[646,2],	[721,2],	[609,4]
]

const owl_defendpat315 = [
[684,2],	[648,2],	[723,2],	[686,2],
[760,4]
]

const owl_defendpat316 = [
[684,2],	[646,2],	[722,2]
]

const owl_defendpat317 = [
[647,2],	[722,2]
]

const owl_defendpat318 = [
[686,2],	[720,2],	[721,2]
]

const owl_defendpat319 = [
[648,2],	[686,2],	[649,4],	[758,4]
]

const owl_defendpat320 = [
[648,2],	[723,2],	[647,2]
]

const owl_defendpat321 = [
[684,2]
]

const owl_defendpat322 = [
[721,2],	[611,4],	[612,4],	[650,4],
[687,4]
]

const owl_defendpat323 = [
[685,2]
]

const owl_defendpat324 = [
[685,2],	[721,2]
]

const owl_defendpat325 = [
[721,2]
]

const owl_defendpat326 = [
[722,2],	[721,2]
]

const owl_defendpat327 = [
[684,2],	[722,2]
]

const owl_defendpat328 = [
[757,2],	[758,2],	[684,2],	[722,2],
[759,4]
]

const owl_defendpat329 = [
[647,2],	[721,2]
]

const owl_defendpat330 = [
[647,2],	[721,2]
]

const owl_defendpat331 = [
[648,2],	[685,2]
]

const owl_defendpat332 = [
[684,2],	[722,2],	[723,4],	[686,4],
[721,4],	[649,4]
]

const owl_defendpat333 = [
[684,2],	[722,2],	[686,4],	[723,4],
[721,4]
]

const owl_defendpat334 = [
[684,2],	[685,2],	[682,4],	[719,4]
]

const owl_defendpat335 = [
[684,2],	[721,2]
]

const owl_defendpat336 = [
[721,2],	[684,2],	[647,4]
]

const owl_defendpat337 = [
[684,2],	[686,2]
]

const owl_defendpat338 = [
[685,2],	[683,2],	[721,2],	[722,4],
[720,4]
]

const owl_defendpat339 = [
[646,4]
]

const owl_defendpat340 = [
[723,2],	[684,2]
]

const owl_defendpat341 = [
[723,2],	[684,2]
]

const owl_defendpat342 = [
[759,2],	[648,2]
]

const owl_defendpat343 = [
[759,2],	[648,2],	[723,4],	[721,4]
]

const owl_defendpat344 = [
[647,2],	[722,2]
]

const owl_defendpat345 = [
[722,2],	[757,4],	[683,4],	[797,4],
[720,4],	[795,4],	[794,4],	[796,4]
]

const owl_defendpat346 = [
[722,2],	[793,4],	[830,4],	[719,4],
[756,4],	[832,4],	[834,4],	[831,4],
[682,4],	[833,4]
]

const owl_defendpat347 = [
[684,2],	[722,2],	[612,4],	[609,4],
[610,4],	[611,4]
]

const owl_defendpat348 = [
[686,2],	[648,2],	[609,4],	[646,4]
]

const owl_defendpat349 = [
[684,2],	[648,2],	[756,4],	[719,4],
[757,4]
]

const owl_defendpat350 = [
[684,2],	[720,4],	[757,4],	[794,4],
[683,4],	[795,4]
]

const owl_defendpat351 = [
[684,2],	[683,4],	[720,4],	[832,4],
[831,4]
]

const owl_defendpat352 = [
[832,2],	[684,2],	[719,4],	[683,4],
[756,4],	[793,4],	[831,4]
]

const owl_defendpat353 = [
[722,2],	[719,4],	[757,4],	[794,4],
[720,4],	[793,4],	[758,4],	[795,4],
[756,4]
]

const owl_defendpat354 = [
[684,2],	[794,4],	[757,4],	[796,4],
[759,4],	[760,4],	[797,4],	[795,4],
[723,4]
]

const owl_defendpat355 = [
[721,2],	[725,4],	[762,4],	[688,4],
[611,4],	[651,4],	[614,4],	[613,4],
[612,4]
]

const owl_defendpat356 = [
[721,2],	[684,2]
]

const owl_defendpat357 = [
[686,2],	[684,2],	[647,4],	[649,4]
]

const owl_defendpat358 = [
[684,2],	[686,2],	[649,4],	[647,4],
[797,4],	[796,4]
]

const owl_defendpat359 = [
[684,2],	[722,2]
]

const owl_defendpat360 = [
[684,2],	[722,2]
]

const owl_defendpat361 = [
[684,2],	[650,4],	[724,4],	[687,4]
]

const owl_defendpat362 = [
[684,2]
]

const owl_defendpat363 = [
[684,2],	[683,4],	[645,4],	[682,4],
[719,4],	[721,4],	[646,4],	[647,4],
[720,4]
]

const owl_defendpat364 = [
[684,2],	[686,2]
]

const owl_defendpat365 = [
[684,2],	[686,2]
]

const owl_defendpat366 = [
[684,2],	[686,2]
]

const owl_defendpat367 = [
[684,2],	[686,2],	[723,2]
]

const owl_defendpat368 = [
[684,2],	[686,2],	[723,2]
]

const owl_defendpat369 = [
[685,2],	[722,2],	[683,2]
]

const owl_defendpat370 = [
[684,2],	[686,2]
]

const owl_defendpat371 = [
[684,2],	[722,2]
]

const owl_defendpat372 = [
[684,2],	[686,2],	[723,2]
]

const owl_defendpat373 = [
[685,2],	[722,2],	[683,2]
]

const owl_defendpat374 = [
[684,2],	[686,2]
]

const owl_defendpat375 = [
[684,2],	[721,4],	[647,4]
]

const owl_defendpat376 = [
[684,2],	[687,4],	[724,4],	[761,4],
[650,4]
]

const owl_defendpat377 = [
[684,2],	[647,2],	[758,4],	[757,4],
[759,4],	[760,4]
]

const owl_defendpat378 = [
[683,2],	[722,2],	[684,2],	[723,4],
[760,4],	[649,4],	[686,4]
]

const owl_defendpat379 = [
[684,2],	[722,2],	[683,2],	[723,4],
[649,4],	[686,4]
]

const owl_defendpat380 = [
[683,2],	[686,2],	[684,2],	[648,2]
]

const owl_defendpat381 = [
[721,2],	[685,2],	[647,2],	[720,4],
[646,4]
]

const owl_defendpat382 = [
[649,2],	[685,2],	[721,2],	[609,4],
[646,4],	[610,4]
]

const owl_defendpat383 = [
[685,2],	[683,2],	[721,2],	[646,4],
[722,4]
]

const owl_defendpat384 = [
[684,2],	[721,2],	[724,4],	[687,4],
[650,4],	[761,4]
]

const owl_defendpat385 = [
[647,2],	[648,2],	[721,2],	[759,4],
[757,4],	[758,4],	[760,4]
]

const owl_defendpat386 = [
[648,2],	[722,2],	[647,4],	[649,4]
]

const owl_defendpat387 = [
[758,2],	[647,2],	[646,4]
]

const owl_defendpat388 = [
[684,2],	[687,4],	[724,4],	[650,4]
]

const owl_defendpat389 = [
[722,2],	[721,2],	[720,4]
]

const owl_defendpat390 = [
[758,2],	[649,4],	[724,4],	[648,4],
[687,4],	[650,4]
]

const owl_defendpat391 = [
[758,2],	[687,4],	[721,4],	[724,4],
[649,4],	[648,4],	[650,4],	[759,4]
]

const owl_defendpat392 = [
[758,2],	[649,4],	[687,4],	[759,4],
[648,4],	[650,4],	[724,4],	[721,4]
]

const owl_defendpat393 = [
[758,2],	[649,4],	[687,4],	[724,4],
[648,4],	[650,4]
]

const owl_defendpat394 = [
[684,2],	[683,4],	[650,4],	[720,4],
[687,4]
]

const owl_defendpat395 = [
[647,2],	[721,2]
]

const owl_defendpat396 = [
[684,2],	[687,4],	[724,4],	[761,4],
[650,4]
]

const owl_defendpat397 = [
[646,2],	[684,2]
]

const owl_defendpat398 = [
[684,2],	[723,2]
]

const owl_defendpat399 = [
[684,2],	[723,2]
]

const owl_defendpat400 = [
[684,2],	[723,2]
]

const owl_defendpat401 = [
[684,2],	[760,2]
]

const owl_defendpat402 = [
[685,2],	[683,2]
]

const owl_defendpat403 = [
[684,2],	[723,4]
]

const owl_defendpat404 = [
[722,2],	[684,2],	[682,2]
]

const owl_defendpat405 = [
[683,2]
]

const owl_defendpat406 = [
[684,2],	[683,2],	[685,2]
]

const owl_defendpat407 = [
[647,2],	[758,2],	[685,2]
]

const owl_defendpat408 = [
[684,2],	[721,4],	[647,4]
]

const owl_defendpat409 = [
[684,2],	[721,4],	[647,4]
]

const owl_defendpat410 = [
[684,2],	[685,4]
]

const owl_defendpat411 = [
[647,2],	[611,2],	[721,2],	[612,2],
[613,4],	[761,4],	[758,4]
]

const owl_defendpat412 = [
[684,2],	[796,2],	[685,2]
]

const owl_defendpat413 = [
[685,2],	[723,2],	[686,4]
]

const owl_defendpat414 = [
[684,2],	[686,2]
]

const owl_defendpat415 = [
[684,2],	[759,4]
]

const owl_defendpat416 = [
[684,2]
]

const owl_defendpat417 = [
[684,2],	[685,4]
]

const owl_defendpat418 = [
[685,2],	[686,2],	[610,2],	[609,4]
]

const owl_defendpat419 = [
[683,2],	[758,2],	[721,2]
]

const owl_defendpat420 = [
[684,2],	[647,2],	[722,2],	[720,2]
]

const owl_defendpat421 = [
[720,2],	[758,2],	[722,2],	[759,2],
[610,4],	[646,4]
]

const owl_defendpat422 = [
[684,2],	[685,2]
]

const owl_defendpat423 = [
[685,2],	[649,2],	[686,4]
]

const owl_defendpat424 = [
[759,2],	[648,4],	[649,4]
]

const owl_defendpat425 = [
[684,2],	[687,2],	[647,4],	[721,4]
]

const owl_defendpat426 = [
[721,2],	[648,2]
]

const owl_defendpat427 = [
[683,2],	[686,4]
]

const owl_defendpat428 = [
[685,2],	[721,4],	[573,4],	[536,4]
]

const owl_defendpat429 = [
[685,2],	[647,2],	[757,2]
]

const owl_defendpat430 = [
[648,2],	[758,2],	[721,4]
]

const owl_defendpat431 = [
[721,2],	[685,2],	[574,4],	[573,4]
]

const owl_defendpat432 = [
[684,2]
]

const owl_defendpat433 = [
[684,2]
]

const owl_defendpat434 = [
[684,2]
]

const owl_defendpat435 = [
[647,2],	[722,2]
]

const owl_defendpat436 = [
[721,2],	[648,2]
]

const owl_defendpat437 = [
[684,2],	[721,4]
]

const owl_defendpat438 = [
[684,2],	[760,2]
]

const owl_defendpat439 = [
[611,2],	[722,2]
]

const owl_defendpat440 = [
[647,2],	[759,2],	[648,4]
]

const owl_defendpat441 = [
[647,2],	[759,2],	[648,4]
]

const owl_defendpat442 = [
[685,2],	[719,4],	[646,4],	[722,4]
]

const owl_defendpat443 = [
[685,2],	[647,2],	[719,4],	[646,4],
[722,4]
]

const owl_defendpat444 = [
[647,2],	[758,2]
]

const owl_defendpat445 = [
[647,2],	[793,2],	[646,4]
]

const owl_defendpat446 = [
[648,2],	[684,2],	[758,2]
]

const owl_defendpat447 = [
[721,2],	[646,2]
]

const owl_defendpat448 = [
[722,2],	[684,2],	[610,2]
]

const owl_defendpat449 = [
[722,2],	[684,2],	[610,2]
]

const owl_defendpat450 = [
[758,2],	[648,2],	[684,2]
]

const owl_defendpat451 = [
[722,2],	[758,2],	[684,2]
]

const owl_defendpat452 = [
[722,2],	[758,2],	[684,2]
]

const owl_defendpat453 = [
[722,2],	[758,2],	[684,2]
]

const owl_defendpat454 = [
[648,2],	[684,2]
]

const owl_defendpat455 = [
[648,2],	[684,2]
]

const owl_defendpat456 = [
[646,2],	[683,2],	[721,2]
]

const owl_defendpat457 = [
[646,2],	[721,2],	[683,2],	[720,4]
]

const owl_defendpat458 = [
[646,2],	[685,2],	[683,2],	[720,4]
]

const owl_defendpat459 = [
[646,2],	[721,2],	[683,2],	[720,4]
]

const owl_defendpat460 = [
[682,2],	[646,2],	[684,2]
]

const owl_defendpat461 = [
[611,2],	[647,2],	[721,2],	[685,2]
]

const owl_defendpat462 = [
[721,2],	[685,2],	[647,2]
]

const owl_defendpat463 = [
[646,2],	[611,2],	[610,2],	[683,2],
[684,2],	[720,4]
]

const owl_defendpat464 = [
[647,2],	[685,2]
]

const owl_defendpat465 = [
[647,2],	[685,2],	[648,4]
]

const owl_defendpat466 = [
[720,2],	[684,2],	[647,2],	[722,2]
]

const owl_defendpat467 = [
[684,2],	[647,2],	[720,2]
]

const owl_defendpat468 = [
[685,2],	[721,2],	[684,2],	[648,2],
[611,4],	[612,4],	[756,4],	[719,4]
]

const owl_defendpat469 = [
[722,2]
]

const owl_defendpat470 = [
[686,2]
]

const owl_defendpat471 = [
[722,2]
]

const owl_defendpat472 = [
[686,2]
]

const owl_defendpat473 = [
[758,2],	[684,2],	[720,2],	[722,2],
[759,4]
]

const owl_defendpat474 = [
[758,2],	[720,2],	[684,2],	[722,2],
[759,4]
]

const owl_defendpat475 = [
[647,2]
]

const owl_defendpat476 = [
[721,2],	[723,2],	[685,2],	[647,2],
[758,2],	[649,2]
]

const owl_defendpat477 = [
[683,2],	[649,2],	[684,2],	[720,2],
[685,2],	[648,2]
]

const owl_defendpat478 = [
[684,2],	[722,2],	[721,4],	[683,4],
[648,4]
]

const owl_defendpat479 = [
[685,2]
]

const owl_defendpat480 = [
[685,2]
]

const owl_defendpat481 = [
[646,2],	[647,2]
]

const owl_defendpat482 = [
[684,2],	[723,2],	[760,2],	[686,2]
]

const owl_defendpat483 = [
[684,2],	[723,2],	[686,2],	[649,2],
[760,4]
]

const owl_defendpat484 = [
[684,2],	[648,2]
]

const owl_defendpat485 = [
[647,2],	[684,2]
]

const owl_defendpat486 = [
[722,2],	[684,2],	[720,2],	[758,2],
[757,4]
]

const owl_defendpat487 = [
[684,2],	[683,2]
]

const autohelperowl_defendpat0 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);

  return  this.play_attack_defend_n(color, 1, 4, [move, a, b, c, c]);
}

const autohelperowl_defendpat8 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);

  return ATTACK_MACRO.call(this, a) && !this.play_attack_defend_n(color, 1, 1, [move, a]);
}

const autohelperowl_defendpat9 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(573, trans, move);

  return ATTACK_MACRO.call(this, a) && !this.play_attack_defend_n(color, 1, 1, [move, a]);
}

const autohelperowl_defendpat20 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return  !this.play_attack_defend_n(color, 0, 3, [move, a, b, a]);
}

const autohelperowl_defendpat21 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);

  return this.board.countlib(a) >= 4;
}

const autohelperowl_defendpat22 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(796, trans, move);

  return this.board.countlib(a) >= 4;
}

const autohelperowl_defendpat23 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);

  return this.board.countlib(a)>1;
}

const autohelperowl_defendpat27 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_defendpat29 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(648, trans, move);

  return this.play_attack_defend_n(color, 1, 3, [move, a, b, c]) && !ATTACK_MACRO.call(this, c);
}

const autohelperowl_defendpat30 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(645, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat37 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(682, trans, move);

  return !this.somewhere(this.board.OTHER_COLOR(color), 0, 1, A) || !DEFEND_MACRO.call(this,A);
}

const autohelperowl_defendpat43 = (trans, move, color, action)=>{
  let B = AFFINE_TRANSFORM(646, trans, move);

  return  this.play_attack_defend_n(color, 1, 1, [move, B]);
}

const autohelperowl_defendpat48 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(682, trans, move);

  return this.play_attack_defend2_n(color, 1, 4, [move, a, b, c, a, c]);
}

const autohelperowl_defendpat52 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(611, trans, move);

  return  this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat53 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(648, trans, move);

  return  !this.play_attack_defend_n(color, 0, 1, [move, A]);
}

const autohelperowl_defendpat57 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(572, trans, move);
  let b = AFFINE_TRANSFORM(609, trans, move);
  let c = AFFINE_TRANSFORM(573, trans, move);

  return  this.somewhere(color, 0, 3, a, b, c);
}

const autohelperowl_defendpat61 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(758, trans, move);
  let b = AFFINE_TRANSFORM(757, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);

  return this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 2, a, b, c) && !this.play_attack_defend_n(color, 1, 3, [move, a, b, c]);
}

const autohelperowl_defendpat64 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(611, trans, move);

  return this.owl_goal_dragon(a) && this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat65 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(757, trans, move);

  return this.owl_goal_dragon(a) && !this.play_attack_defend_n(color, 1, 1, [move, a]);
}

const autohelperowl_defendpat66 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(573, trans, move);

  return this.owl_goal_dragon(a) && !this.play_attack_defend_n(color, 1, 1, [move, a]);
}

const autohelperowl_defendpat67 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_eyespace(a);
}

const autohelperowl_defendpat68 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(794, trans, move);

  return this.play_connect_n(color, 1, 2, [move, a, move, b]);
}

const autohelperowl_defendpat69 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(610, trans, move);
  let d = AFFINE_TRANSFORM(572, trans, move);
  let e = AFFINE_TRANSFORM(573, trans, move);

  return  this.safe_move(move, color) || ((this.owl_escape_value(c) > 0 || this.owl_escape_value(d) >0 || this.owl_escape_value(e)>0)  && this.play_attack_defend_n(color, 1, 3, move, a, b, a));
}

const autohelperowl_defendpat70 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(610, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);
  let c = AFFINE_TRANSFORM(537, trans, move);
  let d = AFFINE_TRANSFORM(574, trans, move);
  let e = AFFINE_TRANSFORM(648, trans, move);
  let F = AFFINE_TRANSFORM(685, trans, move);

  return this.board.countlib(F)>=3 && this.owl_topological_eye(a, this.board.board[b])<=2 && !this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 3, c, d, e, c);
}

const autohelperowl_defendpat72 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(610, trans, move);
  let C = AFFINE_TRANSFORM(721, trans, move);

  return this.play_connect_n(color, 0, 2, [move, a, a, C]) && this.play_connect_n(color, 0, 2, [move, b, b, C]);
}

const autohelperowl_defendpat73 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(686, trans, move);

  return this.owl_escape_value(a) > 1;
}

const autohelperowl_defendpat74 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_escape_value(a) > 1;
}

const autohelperowl_defendpat77 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);

  return  this.does_attack(move, a);
}

const autohelperowl_defendpat79 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(686, trans, move);
  let d = AFFINE_TRANSFORM(647, trans, move);

  return this.play_attack_defend2_n(color, 1, 4, [move, a, b, c, a, c]) && this.play_attack_defend2_n(color, 1, 4, [move, b, a, d, b, d]);
}

const autohelperowl_defendpat80 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(610, trans, move);
  let D = AFFINE_TRANSFORM(611, trans, move);

  return  this.play_attack_defend_n(color, 1, 4, [move, NO_MOVE, c, b, D]);
}

const autohelperowl_defendpat81 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(647, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, b, b]) && this.play_attack_defend_n(color, 1, 2, [move, c, c]) && this.safe_move(move, this.board.OTHER_COLOR(color));
}

const autohelperowl_defendpat82 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend_n(color, 1, 1, [move, b]) && this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_defendpat83 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, a]) && !this.obvious_false_eye(a, color);
}

const autohelperowl_defendpat84 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, a]) && this.play_attack_defend_n(color, 1, 2, [move, b, b]);
}

const autohelperowl_defendpat85 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(758, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);

  return  this.board.countlib(a)>1 && this.safe_move(b, this.board.OTHER_COLOR(color)) && this.play_attack_defend_n(color, 1, 2, [move, b, b]);
}

const autohelperowl_defendpat86 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(758, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(722, trans, move);

  return  this.board.countlib(a)>2 && this.board.countlib(c)>2 && this.safe_move(b, this.board.OTHER_COLOR(color)) && this.play_attack_defend_n(color, 1, 2, [move, b, b]);
}

const autohelperowl_defendpat87 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_defendpat90 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_defendpat91 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_defendpat92 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(646, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.does_attack(move, A) && this.does_defend(move, b);
}

const autohelperowl_defendpat93 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(646, trans, move);

  return  this.does_attack(move, A);
}

const autohelperowl_defendpat94 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(610, trans, move);

  return  this.board.countlib(A)>1;
}

const autohelperowl_defendpat96 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(646, trans, move);

  return !ATTACK_MACRO.call(this, A);
}

const autohelperowl_defendpat97 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)===1;
}

const autohelperowl_defendpat101 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(645, trans, move);
  let d = AFFINE_TRANSFORM(647, trans, move);

  return  this.somewhere(color, 0, 2, b, c)||!this.play_attack_defend_n(color, 0, 5, [move, a, b, c, d, c]);
}

const autohelperowl_defendpat108 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(719, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, a]) && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 1, [a, a, c]) && this.play_attack_defend_n(color, 1, 3, [move, b, a, b]);
}

const autohelperowl_defendpat109 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(649, trans, move);
  let c = AFFINE_TRANSFORM(648, trans, move);

  return this.owl_proper_eye(a)&& this.play_attack_defend_n(color, 1, 3, [move, b, c, b]);
}

const autohelperowl_defendpat110 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(686, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(648, trans, move);

  return  this.board.countlib(a)>1 && this.safe_move(b, this.board.OTHER_COLOR(color)) && !this.obvious_false_eye(b, color) && this.play_attack_defend_n(color, 1, 2, [move, b, b]) && this.does_attack(b, c);
}

const autohelperowl_defendpat111 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(682, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);
  let d = AFFINE_TRANSFORM(646, trans, move);

  return  this.board.countlib(a)>1 && this.safe_move(b, this.board.OTHER_COLOR(color)) && this.play_attack_defend_n(color, 1, 3, [move, d, b, d]) && this.play_attack_defend_n(this.board.OTHER_COLOR(color), 0, 1, b, c) !== codes.WIN;
}

const autohelperowl_defendpat112 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(682, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);
  let d = AFFINE_TRANSFORM(646, trans, move);

  return  this.board.countlib(a)>1 && this.safe_move(b, this.board.OTHER_COLOR(color)) && this.play_attack_defend_n(color, 1, 2, [move, b, b]) && this.does_attack(b, c) && this.play_attack_defend_n(color, 1, 2, [move, d, d]);
}

const autohelperowl_defendpat113 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(610, trans, move);

  return this.does_defend(move, a);
}

const autohelperowl_defendpat114 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(611, trans, move);

  return this.does_defend(move, a);
}

const autohelperowl_defendpat115 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);

  return this.does_defend(move, a);
}

const autohelperowl_defendpat116 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);

  return this.does_defend(move, a);
}

const autohelperowl_defendpat117 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(756, trans, move);

  return  !this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat120 = (trans, move, color, action)=>{
  let c = AFFINE_TRANSFORM(759, trans, move);
  let A = AFFINE_TRANSFORM(720, trans, move);
  let B = AFFINE_TRANSFORM(758, trans, move);

  return this.board.countlib(A)>1 && this.board.countlib(B)>1 && this.board.countlib(c)===2;
}

const autohelperowl_defendpat121 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);

  return !this.play_attack_defend_n(color, 0, 3, [move, a, b, a]);
}

const autohelperowl_defendpat124 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, a]) && this.play_attack_defend_n(color, 1, 2, [move, b, b]);
}

const autohelperowl_defendpat125 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(759, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, a]) && this.play_attack_defend_n(color, 1, 2, [move, b, b]) && this.play_attack_defend_n(color, 1, 2, [move, c, c]);
}

const autohelperowl_defendpat126 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(647, trans, move);
  let A = AFFINE_TRANSFORM(720, trans, move);

  return (!this.obvious_false_eye(b, color) || this.play_attack_defend_n(color, 1, 1, move, A))&& !this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 1, move, A);
}

const autohelperowl_defendpat127 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(647, trans, move);
  let A = AFFINE_TRANSFORM(610, trans, move);
  let C = AFFINE_TRANSFORM(573, trans, move);

  return  !this.play_attack_defend_n(color, 0, 3, [move, A, b, C]);
}

const autohelperowl_defendpat129 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(758, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(685, trans, move);

  return this.board.countlib(a) === 1 && !this.obvious_false_eye(b, color) && !this.obvious_false_eye(c, color);
}

const autohelperowl_defendpat130 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);
  let C = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countlib(A)===1 && this.board.countlib(B)===1 && this.board.countlib(C)===2;
}

const autohelperowl_defendpat131 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.does_attack(move, A);
}

const autohelperowl_defendpat132 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(682, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_eyespace(a) && this.does_attack(move, B);
}

const autohelperowl_defendpat134 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(832, trans, move);

  return this.board.accuratelib(a, color, this.board.MAX_LIBERTIES, null)===1;
}

const autohelperowl_defendpat135 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(685, trans, move);

  return this.board.countlib(A) === 2;
}

const autohelperowl_defendpat138 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(685, trans, move);

  return this.play_attack_defend_n(color, 0, 1, [move, A]) !== codes.WIN;
}

const autohelperowl_defendpat140 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(683, trans, move);
  let A = AFFINE_TRANSFORM(649, trans, move);

  return this.board.countlib(A)===2 && this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 2, move, b, b);
}

const autohelperowl_defendpat141 = (trans, move, color, action)=>{
  

  return this.board.accuratelib(move, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null)>1;
}

const autohelperowl_defendpat142 = (trans, move, color, action)=>{
  

  return this.board.accuratelib(move, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null)>1;
}

const autohelperowl_defendpat143 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)<=2;
}

const autohelperowl_defendpat144 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(795, trans, move);

  return this.board.countlib(A)<=2;
}

const autohelperowl_defendpat146 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(795, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return this.board.countlib(a)===2 && this.board.countlib(B)===3;
}

const autohelperowl_defendpat148 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(686, trans, move);
  let A = AFFINE_TRANSFORM(758, trans, move);

  return !ATTACK_MACRO.call(this, A) && this.play_attack_defend_n(color, 1, 2, [move, b, b]);
}

const autohelperowl_defendpat149 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(611, trans, move);
  let b = AFFINE_TRANSFORM(609, trans, move);

  return  !this.somewhere(this.board.OTHER_COLOR(color), 0, 1, a) || !this.somewhere(this.board.OTHER_COLOR(color), 0, 1, b);
}

const autohelperowl_defendpat151 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);

  return this.board.countlib(a)===1 && !this.obvious_false_eye(b, color);
}

const autohelperowl_defendpat153 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(646, trans, move);

  return  this.play_attack_defend_n(color, 0, 1, [move, A])  && this.play_attack_defend_n(color, 1, 2, [move, B, A]);
}

const autohelperowl_defendpat154 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(685, trans, move);

  return  !this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 1, move, move) && this.play_attack_defend_n(color, 1, 2, [move, A, A]);
}

const autohelperowl_defendpat156 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return  DEFEND_MACRO.call(this,A) && this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat157 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(686, trans, move);
  let C = AFFINE_TRANSFORM(648, trans, move);

  return  this.play_attack_defend_n(color, 1, 1, [move, C]) && this.play_attack_defend_n(color, 0, 2, [move, A, move]) && this.play_attack_defend_n(color, 0, 2, [move, B, move]);
}

const autohelperowl_defendpat158 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return  this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat160 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);

  return  this.board.countlib(A) < 4 && this.play_attack_defend_n(color, 1, 1, [move, B]);
}

const autohelperowl_defendpat161 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(648, trans, move);
  let e = AFFINE_TRANSFORM(685, trans, move);
  let B = AFFINE_TRANSFORM(646, trans, move);
  let D = AFFINE_TRANSFORM(611, trans, move);
  let F = AFFINE_TRANSFORM(647, trans, move);

  return  !this.play_attack_defend_n(color, 0, 7, [move, a, B, c, D, e, F, a]);
}

const autohelperowl_defendpat162 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return  this.play_attack_defend_n(color, 1, 3, [move, a, B, a]);
}

const autohelperowl_defendpat163 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(720, trans, move);
  let d = AFFINE_TRANSFORM(647, trans, move);
  let A = AFFINE_TRANSFORM(721, trans, move);

  return  this.board.is_ko_point(b) && this.owl_topological_eye(move, this.board.board[A]) > 2 && !this.obvious_false_eye(d, color);
}

const autohelperowl_defendpat165 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(611, trans, move);

  return !this.play_attack_defend_n(color, 0, 1, [move, A]);
}

const autohelperowl_defendpat166 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return !this.obvious_false_eye(a, color) && !this.play_attack_defend_n(color, 1, 2, [b, move, move]);
}

const autohelperowl_defendpat167 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return !this.obvious_false_eye(a, color) || !this.obvious_false_eye(b, color);
}

const autohelperowl_defendpat168 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let C = AFFINE_TRANSFORM(721, trans, move);

  return !this.obvious_false_eye(a, color)&& this.play_attack_defend_n(color, 1, 2, [move, b, C]) && !ATTACK_MACRO.call(this, C);
}

const autohelperowl_defendpat172 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_proper_eye(a) && this.does_attack(move, B) && !this.obvious_false_eye(B, color);
}

const autohelperowl_defendpat174 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(759, trans, move);
  let B = AFFINE_TRANSFORM(722, trans, move);

  return  (this.owl_topological_eye(a, this.board.board[B])>=2) && (this.owl_topological_eye(b, this.board.board[B])===2);
}

const autohelperowl_defendpat175 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return  (this.owl_topological_eye(a, this.board.board[B])===2) && ((this.owl_topological_eye(b, this.board.board[B])===2) || (this.owl_topological_eye(b, this.board.board[B])===3));
}

const autohelperowl_defendpat176 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_topological_eye(a, this.board.board[B])===3 && this.does_attack(move, B);
}

const autohelperowl_defendpat177 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(682, trans, move);

  return  this.owl_topological_eye(a, this.board.board[B])===3 && this.safe_move(b, this.board.OTHER_COLOR(color)) && this.safe_move(move, this.board.OTHER_COLOR(color)) && this.play_attack_defend_n(color, 1, 2, [move, b, b]);
}

const autohelperowl_defendpat178 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(757, trans, move);

  return  (this.safe_move(b, this.board.OTHER_COLOR(color)) || this.safe_move(move, this.board.OTHER_COLOR(color))) && this.play_attack_defend_n(color, 1, 2, [move, b, b]) && (this.somewhere(color, 0, 1, c) || !this.safe_move(c, this.board.OTHER_COLOR(color)));
}

const autohelperowl_defendpat179 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);

  return  this.does_attack(move, a);
}

const autohelperowl_defendpat180 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);

  return  this.board.countlib(a)===2 && this.owl_topological_eye(b, this.board.board[B])===3;
}

const autohelperowl_defendpat181 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(646, trans, move);

  return  this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat182 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);

  return  this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat183 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.accuratelib(a, color, this.board.MAX_LIBERTIES, null)<=2 && this.does_attack(move, A);
}

const autohelperowl_defendpat184 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);

  return !this.owl_big_eyespace(a) && !this.obvious_false_eye(a, color);
}

const autohelperowl_defendpat185 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countlib(A)===1 && this.board.countstones(A)>=3;
}

const autohelperowl_defendpat186 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)===1 && this.board.countstones(A)>=3;
}

const autohelperowl_defendpat187 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(758, trans, move);
  let B = AFFINE_TRANSFORM(795, trans, move);

  return this.owl_topological_eye(a, this.board.board[B])===3;
}

const autohelperowl_defendpat189 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);

  return  this.board.countlib(a)===2 && this.board.accuratelib(move, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null)>1 && this.owl_big_eyespace(move);
}

const autohelperowl_defendpat190 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);

  return this.board.accuratelib(a, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null)>1 && this.owl_big_eyespace(a) && this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_defendpat191 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(719, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(a)===2 && this.board.countlib(B)===3 && this.owl_big_eyespace(move);
}

const autohelperowl_defendpat192 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);

  return this.owl_eyespace(a) && !this.owl_big_eyespace(a);
}

const autohelperowl_defendpat193 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(720, trans, move);

  return !this.play_attack_defend_n(color, 0, 1, [move, A]);
}

const autohelperowl_defendpat195 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);

  return this.owl_proper_eye(a);
}

const autohelperowl_defendpat197 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(648, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);

  return !this.obvious_false_eye(b, color) && this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat203 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);

  return !this.obvious_false_eye(a, color);
}

const autohelperowl_defendpat204 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);

  return this.board.countlib(a) > 2;
}

const autohelperowl_defendpat209 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(758, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);

  return ATTACK_MACRO.call(this, A) && !this.play_attack_defend_n(color, 0, 3, [move, a, b, A]);
}

const autohelperowl_defendpat210 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(758, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);

  return ATTACK_MACRO.call(this, A) && this.play_attack_defend_n(color, 0, 3, [move, a, b, A]) !== codes.WIN;
}

const autohelperowl_defendpat211 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.does_attack(move, A);
}

const autohelperowl_defendpat212 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat213 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);

  return !this.play_attack_defend_n(color, 0, 2, [move, a, a]);
}

const autohelperowl_defendpat221 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(609, trans, move);

  return ATTACK_MACRO.call(this, a) && ! this.play_attack_defend_n(color, 1, 1, [move, a]);
}

const autohelperowl_defendpat222 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);

  return this.play_attack_defend_n(color, 0, 1, [move, A]) !== codes.WIN;
}

const autohelperowl_defendpat223 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(608, trans, move);

  return this.board.countlib(a) === 2;
}

const autohelperowl_defendpat226 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(645, trans, move);

  return !this.play_attack_defend_n(color, 0, 1, [move, A]);
}

const autohelperowl_defendpat228 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(611, trans, move);

  return this.board.countlib(A)===1;
}

const autohelperowl_defendpat232 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);

  return !this.play_attack_defend_n(color, 1, 1, [move, a]) && this.play_attack_defend_n(color, 1, 1, [move, B]);
}

const autohelperowl_defendpat233 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_defendpat236 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(755, trans, move);

  return this.board.countlib(a)===2;
}

const autohelperowl_defendpat237 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(573, trans, move);

  return this.board.countlib(a)===2;
}

const autohelperowl_defendpat239 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.play_attack_defend_n(color, 0, 1, [move, A]) !== codes.WIN;
}

const autohelperowl_defendpat243 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, A, A]);
}

const autohelperowl_defendpat245 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(685, trans, move);

  return this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat246 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(682, trans, move);
  let A = AFFINE_TRANSFORM(720, trans, move);

  return this.does_attack(move, A) && this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 3, b, move, c, A);
}

const autohelperowl_defendpat251 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);

  return this.owl_proper_eye(a) && this.owl_proper_eye(b) && this.owl_big_eyespace(a);
}

const autohelperowl_defendpat252 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(a)===2;
}

const autohelperowl_defendpat255 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);

  return this.play_attack_defend_n(color, 1, 1, move, a)!==codes.WIN;
}

const autohelperowl_defendpat256 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);

  return  this.does_attack(move, A);
}

const autohelperowl_defendpat257 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(720, trans, move);

  return  this.does_attack(move, A);
}

const autohelperowl_defendpat258 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return  this.does_attack(move, A);
}

const autohelperowl_defendpat259 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);

  return  this.does_attack(move, A);
}

const autohelperowl_defendpat262 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_defendpat263 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(a)===1 && this.owl_eyespace(move) && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null) > 0;
}

const autohelperowl_defendpat265 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(686, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 3, a, move, b, b);
}

const autohelperowl_defendpat266 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);

  return  this.somewhere(color, 0, 4, a, b, c, d);
}

const autohelperowl_defendpat267 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);
  let C = AFFINE_TRANSFORM(685, trans, move);

  return  (this.board.countstones(B) > 1 && this.board.countstones(C) > 1)  && this.safe_move(move, this.board.OTHER_COLOR(color)) && !this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 1, move, a);
}

const autohelperowl_defendpat268 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return  this.board.countlib(A) === 1 && this.board.countstones(A) > 2;
}

const autohelperowl_defendpat269 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);

  return !ATTACK_MACRO.call(this, a) || (this.board.countstones(a)<=2 && this.does_attack(move, a));
}

const autohelperowl_defendpat271 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);

  return  !ATTACK_MACRO.call(this, a) && this.board.accuratelib(move, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null) > 1;
}

const autohelperowl_defendpat272 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(686, trans, move);
  let c = AFFINE_TRANSFORM(649, trans, move);

  return this.board.countlib(b)>1
    && this.play_attack_defend_n(color, 1, 2, [move, a, a])
    && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 3, [move, NO_MOVE, a, a, c]);
}

const autohelperowl_defendpat273 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(686, trans, move);
  let c = AFFINE_TRANSFORM(649, trans, move);
  let D = AFFINE_TRANSFORM(722, trans, move);

  return (this.board.countlib(b)>1
    && this.play_attack_defend_n(color, 1, 2, [move, a, a])
    && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 3, [move, NO_MOVE, a, a, c]))
    && (!this.somewhere(this.board.OTHER_COLOR(color), 0, 1, D) || this.play_attack_defend_n(color, 1, 2, move, a, D))
    && (!this.board.is_legal(D, this.board.OTHER_COLOR(color)) || this.play_attack_defend_n(color, 1, 2, move, D, D));
}

const autohelperowl_defendpat276 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);
  let C = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(a)>1 && this.board.countlib(b)>1 && !ATTACK_MACRO.call(this, C);
}

const autohelperowl_defendpat277 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);

  return (this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0) && this.board.countlib(a)>1 && this.board.countlib(b)>1;
}

const autohelperowl_defendpat278 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A) === 2 && this.board.countlib(b)>1 && this.board.countlib(c)>1 && !ATTACK_MACRO.call(this, A) && !this.play_connect_n(color, 0, 1, [move, b, c]);
}

const autohelperowl_defendpat279 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return this.vital_chain(A) && this.vital_chain(B) && !this.board.is_ko_point(move) && !this.play_attack_defend2_n(color, 0, 1, [move, A, B]);
}

const autohelperowl_defendpat280 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return this.vital_chain(A)>1 && this.vital_chain(B)>1 && !this.play_attack_defend2_n(color, 0, 1, [move, A, B]);
}

const autohelperowl_defendpat281 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(685, trans, move);

  return  this.play_break_through_n(color, 2, [move, a, b, a, c]) === codes.WIN;
}

const autohelperowl_defendpat282 = (trans, move, color, action)=>{
  let c = AFFINE_TRANSFORM(720, trans, move);
  let d = AFFINE_TRANSFORM(722, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return (this.board.countlib(A)<=3 && this.board.accuratelib(c, color, this.board.MAX_LIBERTIES, null)>2) || (this.board.countlib(B)<=3 && this.board.accuratelib(d, color, this.board.MAX_LIBERTIES, null)>2);
}

const autohelperowl_defendpat284 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(610, trans, move);

  return this.play_attack_defend2_n(color, 1, 2, [move, a, B, a]);
}

const autohelperowl_defendpat285 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);

  return  this.does_attack(move, a);
}

const autohelperowl_defendpat287 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, B]);
}

const autohelperowl_defendpat289 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(757, trans, move);
  let e = AFFINE_TRANSFORM(796, trans, move);
  let f = AFFINE_TRANSFORM(648, trans, move);
  let B = AFFINE_TRANSFORM(794, trans, move);
  let C = AFFINE_TRANSFORM(758, trans, move);
  let D = AFFINE_TRANSFORM(685, trans, move);

  return  !this.play_attack_defend2_n(color, 0, 3, [move, f, a, B, C]) && this.play_attack_defend_n(color, 1, 1, [move, D]) && !this.safe_move(e, this.board.OTHER_COLOR(color));
}

const autohelperowl_defendpat290 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(686, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);
  let C = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_goal_dragon(a) && !this.play_attack_defend2_n(color, 0, 1, [move, B, C]);
}

const autohelperowl_defendpat291 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return  this.play_attack_defend_n(color, 1, 1, [move, A]) && this.play_attack_defend_n(color, 1, 1, [move, B]);
}

const autohelperowl_defendpat292 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, B]);
}

const autohelperowl_defendpat293 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(759, trans, move);
  let c = AFFINE_TRANSFORM(722, trans, move);
  let d = AFFINE_TRANSFORM(760, trans, move);
  let e = AFFINE_TRANSFORM(797, trans, move);
  let f = AFFINE_TRANSFORM(723, trans, move);
  let g = AFFINE_TRANSFORM(685, trans, move);
  let h = AFFINE_TRANSFORM(720, trans, move);
  let i = AFFINE_TRANSFORM(795, trans, move);

  return this.owl_goal_dragon(h) && this.board.countlib(i)>1 && this.play_attack_defend_n(color, 1, 8, [move, a, b, c, d, e, f, g, e]);
}

const autohelperowl_defendpat294 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(722, trans, move);
  let d = AFFINE_TRANSFORM(648, trans, move);
  let e = AFFINE_TRANSFORM(610, trans, move);
  let f = AFFINE_TRANSFORM(645, trans, move);
  let g = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_goal_dragon(f) && this.board.countlib(g)>1 && this.play_attack_defend_n(color, 1, 6, [move, a, b, c, d, e, c]);
}

const autohelperowl_defendpat295 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(759, trans, move);
  let d = AFFINE_TRANSFORM(724, trans, move);
  let e = AFFINE_TRANSFORM(649, trans, move);

  return this.owl_goal_dragon(d) && this.board.countlib(e)>1 && this.play_attack_defend_n(color, 1, 4, [move, a, b, c, a]);
}

const autohelperowl_defendpat296 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(687, trans, move);
  let d = AFFINE_TRANSFORM(612, trans, move);
  let B = AFFINE_TRANSFORM(611, trans, move);

  return this.owl_goal_dragon(c) && this.board.countlib(d)>1 && this.play_attack_defend_n(color, 1, 2, [move, a, B]);
}

const autohelperowl_defendpat298 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_defendpat299 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, B]);
}

const autohelperowl_defendpat300 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(760, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, B]) && this.board.countstones(B) > 2;
}

const autohelperowl_defendpat302 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(681, trans, move);
  let b = AFFINE_TRANSFORM(795, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat303 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(718, trans, move);
  let b = AFFINE_TRANSFORM(610, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat307 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend2_n(color, 1, 2, [move, a, a, B]);
}

const autohelperowl_defendpat308 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return this.play_attack_defend_n(color, 1, 1, [move, A]) || this.play_attack_defend_n(color, 1, 1, [move, B]);
}

const autohelperowl_defendpat309 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, B]);
}

const autohelperowl_defendpat310 = (trans, move, color, action)=>{
  let c = AFFINE_TRANSFORM(646, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return this.board.countlib(A)===2 && this.owl_escape_value(c)>0 && !this.play_attack_defend2_n(color, 0, 1, [move, A, B]);
}

const autohelperowl_defendpat311 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(611, trans, move);
  let b = AFFINE_TRANSFORM(610, trans, move);
  let c = AFFINE_TRANSFORM(609, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat312 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return this.board.countlib(c)>1 && this.play_attack_defend_n(color, 1, 1, [move, A]) && this.play_attack_defend_n(color, 1, 2, [move, b, B]);
}

const autohelperowl_defendpat313 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);

  return this.board.countlib(a)>1;
}

const autohelperowl_defendpat316 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);

  return  !this.safe_move(a, this.board.OTHER_COLOR(color)) && this.board.countlib(b)>1;
}

const autohelperowl_defendpat317 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let C = AFFINE_TRANSFORM(647, trans, move);
  let D = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_goal_dragon(a) && this.owl_escape_value(b)>0&& this.play_attack_defend_n(color, 1, 1, [move, C]) && this.play_attack_defend_n(color, 1, 1, [move, D]);
}

const autohelperowl_defendpat318 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return  this.play_attack_defend2_n(color, 1, 1, [move, A, B]);
}

const autohelperowl_defendpat319 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);

  return this.owl_escape_value(a)>0;
}

const autohelperowl_defendpat321 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);

  return  this.owl_escape_value(a)>0 && this.play_attack_defend_n(color, 1, 2, [move, a, B]);
}

const autohelperowl_defendpat322 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(611, trans, move);
  let d = AFFINE_TRANSFORM(649, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(B)<=4 && this.owl_escape_value(c) + this.owl_escape_value(d) > 0&& this.play_attack_defend2_n(color, 1, 2, [move, a, a, B]);
}

const autohelperowl_defendpat323 = (trans, move, color, action)=>{
  let d = AFFINE_TRANSFORM(722, trans, move);
  let e = AFFINE_TRANSFORM(609, trans, move);
  let f = AFFINE_TRANSFORM(683, trans, move);
  let A = AFFINE_TRANSFORM(611, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);
  let C = AFFINE_TRANSFORM(685, trans, move);

  return  this.board.countlib(C) === 2 && (this.owl_escape_value(e) > 0 || this.vital_chain(A)) && (this.owl_escape_value(f) > 0 || this.vital_chain(C)) && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null) > 1 && this.play_attack_defend2_n(color, 1, 2, [move, d, B, A]);
}

const autohelperowl_defendpat324 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);

  return  (this.owl_escape_value(move) > 0) && !this.play_attack_defend2_n(color, 0, 1, [move, a, b]);
}

const autohelperowl_defendpat325 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);
  let c = AFFINE_TRANSFORM(648, trans, move);
  let d = AFFINE_TRANSFORM(685, trans, move);

  return (this.owl_escape_value(b) > 0 || this.owl_escape_value(c) > 0 || this.owl_escape_value(d) > 0)&& this.play_attack_defend_n(color, 1, 1, [move, a]);
}

const autohelperowl_defendpat326 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);

  return  this.board.countlib(a) === 2 || this.play_attack_defend_n(color, 1, 1, [move, a]);
}

const autohelperowl_defendpat327 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(759, trans, move);
  let C = AFFINE_TRANSFORM(720, trans, move);

  return  this.does_defend(move, A) && !this.play_attack_defend_n(color, 1, 1, [move, B]) && !this.board.same_string(B, C) && this.vital_chain(B) && this.vital_chain(C) && (this.play_attack_defend_n(color, 1, 1, [move, B]) || this.play_attack_defend_n(color, 1, 1, move, C)) && !this.play_connect_n(color, 1, 1, [move, B, C]);
}

const autohelperowl_defendpat328 = (trans, move, color, action)=>{
  let c = AFFINE_TRANSFORM(758, trans, move);
  let d = AFFINE_TRANSFORM(723, trans, move);
  let A = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(648, trans, move);

  return this.board.countlib(A)===2 && this.board.countlib(c)>1 && this.board.countlib(d)>1 && this.play_attack_defend_n(color, 1, 1, [move, B]);
}

const autohelperowl_defendpat329 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);
  let A = AFFINE_TRANSFORM(721, trans, move);

  return  this.board.countlib(A) === 1 && (this.owl_escape_value(b) > 0 || this.owl_escape_value(c) > 0);
}

const autohelperowl_defendpat330 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);

  return  this.board.countlib(A) === 1;
}

const autohelperowl_defendpat332 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return  this.board.countlib(A)===2;
}

const autohelperowl_defendpat333 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return  this.board.countlib(A)===2 && !this.play_attack_defend2_n(color, 0, 1, [move, A, B]);
}

const autohelperowl_defendpat334 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(685, trans, move);
  let B = AFFINE_TRANSFORM(646, trans, move);

  return this.board.countlib(A) <= 2 && (this.somewhere(color, 0, 1, B) || !ATTACK_MACRO.call(this, A) || DEFEND_MACRO.call(this,A));
}

const autohelperowl_defendpat335 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(646, trans, move);

  return !ATTACK_MACRO.call(this, A) && this.play_attack_defend_n(color, 1, 1, [move, A]) && !this.obvious_false_eye(b, color);
}

const autohelperowl_defendpat336 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countstones(A)>=3 && !ATTACK_MACRO.call(this, A) && this.play_attack_defend_n(color, 1, 1, [move, A]) && !this.obvious_false_eye(b, color);
}

const autohelperowl_defendpat337 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);

  return this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat338 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(685, trans, move);

  return  this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_defendpat339 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(610, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, a]) && this.play_attack_defend_n(color, 1, 2, [move, b, b]);
}

const autohelperowl_defendpat340 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(646, trans, move);

  return this.owl_escape_value(c)>0 && this.play_attack_defend2_n(color, 1, 2, [move, a, a, b]);
}

const autohelperowl_defendpat341 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_escape_value(c)>0 && this.play_attack_defend2_n(color, 1, 2, [move, a, a, B]);
}

const autohelperowl_defendpat342 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);
  let d = AFFINE_TRANSFORM(759, trans, move);
  let e = AFFINE_TRANSFORM(685, trans, move);
  let f = AFFINE_TRANSFORM(647, trans, move);
  let g = AFFINE_TRANSFORM(758, trans, move);

  return (!this.owl_goal_dragon(f) || !this.owl_goal_dragon(g))&& (this.play_attack_defend_n(color, 1, 6, [move, a, b, c, d, e, e]) || this.play_attack_defend_n(color, 1, 6, move, a, b, c, e, d, d));
}

const autohelperowl_defendpat343 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);

  return (!this.owl_goal_dragon(a) || !this.owl_goal_dragon(b))&& !this.play_connect_n(color, 0, 1, [move, a, b]);
}

const autohelperowl_defendpat344 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(685, trans, move);
  let e = AFFINE_TRANSFORM(722, trans, move);

  return !(this.somewhere(color, 0, 1, d) && this.somewhere(color, 0, 1, e))&& (!this.owl_goal_dragon(b) || !this.owl_goal_dragon(c)) && this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_defendpat345 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat346 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(719, trans, move);
  let b = AFFINE_TRANSFORM(756, trans, move);
  let c = AFFINE_TRANSFORM(757, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat347 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);
  let c = AFFINE_TRANSFORM(646, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat348 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_defendpat349 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(a) > 0;
}

const autohelperowl_defendpat350 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_defendpat351 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_defendpat352 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(759, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_defendpat353 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(682, trans, move);
  let b = AFFINE_TRANSFORM(719, trans, move);
  let c = AFFINE_TRANSFORM(757, trans, move);
  let d = AFFINE_TRANSFORM(645, trans, move);
  let e = AFFINE_TRANSFORM(646, trans, move);

  return (!this.somewhere(this.board.OTHER_COLOR(color), 0, 1, e) && !this.somewhere(this.board.OTHER_COLOR(color), 0, 1, d) && (this.owl_escape_value(a) > 0))|| this.owl_escape_value(b) > 0|| this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat354 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(758, trans, move);
  let b = AFFINE_TRANSFORM(759, trans, move);
  let c = AFFINE_TRANSFORM(723, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat355 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(650, trans, move);
  let b = AFFINE_TRANSFORM(613, trans, move);
  let c = AFFINE_TRANSFORM(575, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat356 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_defendpat357 = (trans, move, color, action)=>{
  

  return this.owl_escape_value(move) > 0;
}

const autohelperowl_defendpat358 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return  this.owl_escape_value(a) > 0 || this.owl_escape_value(b) > 0;
}

const autohelperowl_defendpat359 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);

  return !this.owl_goal_dragon(a);
}

const autohelperowl_defendpat360 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_strong_dragon(a);
}

const autohelperowl_defendpat361 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(686, trans, move);

  return this.owl_escape_value(a)>0;
}

const autohelperowl_defendpat362 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(723, trans, move);
  let b = AFFINE_TRANSFORM(760, trans, move);
  let c = AFFINE_TRANSFORM(759, trans, move);
  let d = AFFINE_TRANSFORM(686, trans, move);
  let e = AFFINE_TRANSFORM(758, trans, move);

  return this.owl_escape_value(a) > 0 || this.owl_escape_value(b) > 0|| this.owl_escape_value(c) > 0 || this.owl_escape_value(d) > 0|| this.owl_escape_value(e) > 0;
}

const autohelperowl_defendpat364 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return !this.owl_goal_dragon(a) || !this.owl_goal_dragon(b);
}

const autohelperowl_defendpat365 = (trans, move, color, action)=>{
  let c = AFFINE_TRANSFORM(720, trans, move);
  let d = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return  (!this.owl_goal_dragon(A) || !this.owl_goal_dragon(B))
    && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 3, [move, d, c, c, move]);
}

const autohelperowl_defendpat366 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_strong_dragon(a) || this.owl_strong_dragon(b);
}

const autohelperowl_defendpat367 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(686, trans, move);

  return !this.owl_goal_dragon(a) || !this.owl_goal_dragon(b);
}

const autohelperowl_defendpat368 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(686, trans, move);

  return this.owl_strong_dragon(a) || this.owl_strong_dragon(b);
}

const autohelperowl_defendpat369 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let C = AFFINE_TRANSFORM(647, trans, move);

  return (!this.owl_goal_dragon(a) || !this.owl_goal_dragon(b)) && this.board.countlib(C) <= 2 && this.board.countlib(a) > 1;
}

const autohelperowl_defendpat370 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat371 = (trans, move, color, action)=>{
  let d = AFFINE_TRANSFORM(647, trans, move);
  let A = AFFINE_TRANSFORM(682, trans, move);
  let B = AFFINE_TRANSFORM(645, trans, move);
  let C = AFFINE_TRANSFORM(646, trans, move);

  return (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0 || this.owl_escape_value(C) > 0)&& this.play_attack_defend_n(color, 1, 1, [move, d]);
}

const autohelperowl_defendpat372 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(686, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat373 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let C = AFFINE_TRANSFORM(647, trans, move);

  return (this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0) && this.board.countlib(C) <= 2 && this.board.countlib(a) > 1;
}

const autohelperowl_defendpat374 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat376 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(648, trans, move);
  let f = AFFINE_TRANSFORM(686, trans, move);
  let E = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_escape_value(f)>0 && !this.play_attack_defend2_n(color, 0, 5, [move, a, b, c, d, a, E]);
}

const autohelperowl_defendpat377 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);
  let e = AFFINE_TRANSFORM(720, trans, move);
  let C = AFFINE_TRANSFORM(645, trans, move);
  let D = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_escape_value(e)>0 && !this.play_attack_defend2_n(color, 0, 3, [move, a, b, C, D]);
}

const autohelperowl_defendpat378 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(649, trans, move);

  return this.owl_escape_value(a)>0;
}

const autohelperowl_defendpat379 = (trans, move, color, action)=>{
  let c = AFFINE_TRANSFORM(722, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return this.owl_escape_value(c)>0 && this.owl_goal_dragon(d) && !this.play_attack_defend2_n(color, 0, 1, [move, A, B]);
}

const autohelperowl_defendpat380 = (trans, move, color, action)=>{
  let c = AFFINE_TRANSFORM(648, trans, move);
  let d = AFFINE_TRANSFORM(646, trans, move);

  return this.owl_escape_value(c)>0 && this.owl_goal_dragon(d);
}

const autohelperowl_defendpat381 = (trans, move, color, action)=>{
  

  return this.owl_escape_value(move)>0;
}

const autohelperowl_defendpat382 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return this.owl_escape_value(a)>0 && this.owl_goal_dragon(b) && this.board.countlib(b)>1;
}

const autohelperowl_defendpat383 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);

  return  this.owl_escape_value(a)>0;
}

const autohelperowl_defendpat384 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(647, trans, move);
  let d = AFFINE_TRANSFORM(610, trans, move);
  let f = AFFINE_TRANSFORM(648, trans, move);
  let E = AFFINE_TRANSFORM(609, trans, move);

  return this.owl_escape_value(f)>0 && !this.play_attack_defend2_n(color, 0, 5, [move, a, b, c, d, c, E]);
}

const autohelperowl_defendpat385 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let d = AFFINE_TRANSFORM(758, trans, move);
  let C = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_escape_value(d)>0 && !this.play_attack_defend2_n(color, 0, 3, [move, a, b, a, C]);
}

const autohelperowl_defendpat386 = (trans, move, color, action)=>{
  let d = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_escape_value(d)>0;
}

const autohelperowl_defendpat387 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(610, trans, move);
  let d = AFFINE_TRANSFORM(721, trans, move);

  return (this.owl_escape_value(c)>0 || this.owl_escape_value(d)>0) && this.play_attack_defend_n(color, 1, 2, move, a, a)&& !this.play_attack_defend2_n(color, 1, 3, [move, b, a, move, a]) && !this.play_attack_defend2_n(color, 1, 3, [move, b, a, c, a]);
}

const autohelperowl_defendpat388 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(686, trans, move);

  return this.owl_escape_value(a)>0;
}

const autohelperowl_defendpat390 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(649, trans, move);
  let b = AFFINE_TRANSFORM(611, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_defendpat391 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(611, trans, move);
  let b = AFFINE_TRANSFORM(649, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_defendpat392 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(610, trans, move);
  let c = AFFINE_TRANSFORM(682, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);

  return this.somewhere(color, 0, 2, c, d) && (this.owl_escape_value(a) + this.owl_escape_value(b) > 0);
}

const autohelperowl_defendpat393 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(610, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_defendpat394 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(686, trans, move);

  return this.owl_escape_value(a)>0;
}

const autohelperowl_defendpat395 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(646, trans, move);
  let e = AFFINE_TRANSFORM(720, trans, move);
  let D = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(D)===2 && this.board.countlib(c)>1 && this.board.countlib(e)>1&& (this.owl_escape_value(c)>0 || this.owl_escape_value(e)>0)&& !this.play_connect_n(color, 0, 3, [move, b, a, c, e]);
}

const autohelperowl_defendpat396 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(649, trans, move);
  let b = AFFINE_TRANSFORM(686, trans, move);
  let c = AFFINE_TRANSFORM(723, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat397 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(610, trans, move);

  return !this.play_attack_defend_n(color, 0, 1, [move, A]);
}

const autohelperowl_defendpat398 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat399 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_strong_dragon(a) || this.owl_strong_dragon(b);
}

const autohelperowl_defendpat400 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return (this.owl_strong_dragon(a) || this.owl_strong_dragon(b)) && !this.play_connect_n(color, 0, 1, [move, a, b]);
}

const autohelperowl_defendpat401 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return this.owl_strong_dragon(a) || this.owl_strong_dragon(b);
}

const autohelperowl_defendpat402 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(686, trans, move);
  let d = AFFINE_TRANSFORM(649, trans, move);
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countlib(A) === 1&& (this.owl_escape_value(b) + this.owl_escape_value(c) + this.owl_escape_value(d)) > 0;
}

const autohelperowl_defendpat403 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);

  return this.owl_escape_value(a)>0;
}

const autohelperowl_defendpat404 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);
  let d = AFFINE_TRANSFORM(682, trans, move);

  return !this.owl_goal_dragon(a) && this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 3, [b, c, d, b, d]);
}

const autohelperowl_defendpat406 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat407 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(609, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);

  return this.board.countlib(a)>1 && this.board.countlib(b)>1;
}

const autohelperowl_defendpat408 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(648, trans, move);
  let d = AFFINE_TRANSFORM(682, trans, move);

  return  (this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0) && !this.play_connect_n(color, 0, 1, [move, d, move]);
}

const autohelperowl_defendpat409 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(648, trans, move);
  let d = AFFINE_TRANSFORM(682, trans, move);

  return  (this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0) && this.play_connect_n(color, 0, 1, [move, d, move]);
}

const autohelperowl_defendpat410 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(573, trans, move);

  return  (this.owl_escape_value(a) + this.owl_escape_value(move) + this.owl_escape_value(b) > 0) && !this.play_connect_n(color, 0, 1, [move, c, move]);
}

const autohelperowl_defendpat411 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(760, trans, move);
  let b = AFFINE_TRANSFORM(759, trans, move);
  let c = AFFINE_TRANSFORM(758, trans, move);

  return  this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat412 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(609, trans, move);
  let c = AFFINE_TRANSFORM(647, trans, move);
  let d = AFFINE_TRANSFORM(646, trans, move);
  let e = AFFINE_TRANSFORM(683, trans, move);

  return (this.owl_escape_value(a) > 0 || this.owl_escape_value(b) > 0)&& this.play_attack_defend2_n(color, 1, 4, [move, c, d, e, c, e]);
}

const autohelperowl_defendpat413 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(757, trans, move);
  let b = AFFINE_TRANSFORM(719, trans, move);
  let c = AFFINE_TRANSFORM(682, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat414 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_defendpat415 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);
  let C = AFFINE_TRANSFORM(685, trans, move);

  return !this.board.same_string(A, B) && (this.board.countlib(A) <= 4 || this.board.countlib(B) <= 4 || this.board.countlib(C) <= 4);
}

const autohelperowl_defendpat416 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);
  let C = AFFINE_TRANSFORM(685, trans, move);

  return !this.board.same_string(A, B) && (this.board.countlib(A) <= 4 || this.board.countlib(B) <= 4 || this.board.countlib(C) <= 4)&& !this.play_connect_n(color, 1, 1, [move, A, C]);
}

const autohelperowl_defendpat421 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(757, trans, move);

  return this.owl_goal_dragon(a);
}

const autohelperowl_defendpat423 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(686, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);

  return this.board.countlib(a)>1 && this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat424 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(611, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat425 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(682, trans, move);

  return this.owl_escape_value(a)>0;
}

const autohelperowl_defendpat426 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_escape_value(a)>0 && !ATTACK_MACRO.call(this, B);
}

const autohelperowl_defendpat427 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_escape_value(a)>0 && this.does_attack(move, B);
}

const autohelperowl_defendpat428 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(572, trans, move);
  let b = AFFINE_TRANSFORM(609, trans, move);

  return this.somewhere(color, 0, 2, a, b) && this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_defendpat429 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);

  return  DEFEND_MACRO.call(this,A);
}

const autohelperowl_defendpat430 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(757, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);
  let E = AFFINE_TRANSFORM(683, trans, move);

  return  (this.owl_escape_value(a) > 0 || this.owl_escape_value(b) > 0) && ((this.somewhere(color, 0, 1, d) && this.play_attack_defend2_n(color, 1, 2, [move, c, c, E]))     || (!this.somewhere(color, 0, 1, d) && !this.play_attack_defend2_n(color, 0, 3, [move, c, d, c, E])));
}

const autohelperowl_defendpat431 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);

  return DEFEND_MACRO.call(this,A);
}

const autohelperowl_defendpat432 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);

  return  this.vital_chain(A) && this.vital_chain(B) && this.play_attack_defend2_n(color, 1, 1, [move, A, B]) && !this.play_connect_n(color, 1, 1, [move, A, B]);
}

const autohelperowl_defendpat433 = (trans, move, color, action)=>{
  let d = AFFINE_TRANSFORM(721, trans, move);
  let e = AFFINE_TRANSFORM(647, trans, move);
  let A = AFFINE_TRANSFORM(648, trans, move);
  let B = AFFINE_TRANSFORM(610, trans, move);
  let C = AFFINE_TRANSFORM(611, trans, move);

  return  (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0 || this.owl_escape_value(C) > 0) && !ATTACK_MACRO.call(this, d) && this.play_attack_defend_n(color, 1, 2, [move, A, d]) && this.play_attack_defend_n(color, 1, 2, [move, e, d]);
}

const autohelperowl_defendpat434 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(722, trans, move);
  let C = AFFINE_TRANSFORM(685, trans, move);

  return  this.owl_escape_value(A) + this.owl_escape_value(B) + this.owl_escape_value(C) > 3;
}

const autohelperowl_defendpat435 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(646, trans, move);
  let C = AFFINE_TRANSFORM(683, trans, move);

  return  (this.owl_escape_value(B) > 0 || this.owl_escape_value(a) > 0) && this.play_attack_defend2_n(color, 1, 2, [move, a, a, C]);
}

const autohelperowl_defendpat436 = (trans, move, color, action)=>{
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(683, trans, move);
  let A = AFFINE_TRANSFORM(720, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);

  return  (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0) && this.play_attack_defend_n(color, 1, 2, [move, c, d]);
}

const autohelperowl_defendpat437 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(685, trans, move);
  let B = AFFINE_TRANSFORM(682, trans, move);

  return (this.owl_escape_value(a) > 0) && !this.play_connect_n(color, 0, 1, [move, move, B]);
}

const autohelperowl_defendpat438 = (trans, move, color, action)=>{
  let c = AFFINE_TRANSFORM(685, trans, move);
  let d = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(722, trans, move);

  return  (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0) && (!this.somewhere(this.board.OTHER_COLOR(color), 0, 1, c) || this.play_attack_defend2_n(color, 1, 2, [move, d, c, d]));
}

const autohelperowl_defendpat439 = (trans, move, color, action)=>{
  let c = AFFINE_TRANSFORM(647, trans, move);
  let d = AFFINE_TRANSFORM(646, trans, move);
  let e = AFFINE_TRANSFORM(683, trans, move);
  let f = AFFINE_TRANSFORM(609, trans, move);
  let A = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(610, trans, move);

  return  (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0) && (this.play_attack_defend_n(color, 1, 4, [move, c, d, f, e]) && this.play_attack_defend_n(color, 1, 4, move, c, d, f, f));
}

const autohelperowl_defendpat440 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);

  return this.owl_strong_dragon(a) || this.owl_strong_dragon(b);
}

const autohelperowl_defendpat441 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_defendpat442 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(756, trans, move);
  let d = AFFINE_TRANSFORM(719, trans, move);
  let e = AFFINE_TRANSFORM(793, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return (this.owl_escape_value(c)>0 || this.owl_escape_value(d)>0 || this.owl_escape_value(e)>0)&& this.board.countlib(B)===2 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>=2 && !this.play_attack_defend_n(color, 1, 1, [move, a]);
}

const autohelperowl_defendpat443 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);
  let c = AFFINE_TRANSFORM(645, trans, move);
  let d = AFFINE_TRANSFORM(719, trans, move);

  return (this.owl_escape_value(b)>0 || this.owl_escape_value(c)>0 || this.owl_escape_value(d)>0)&& !this.play_attack_defend_n(color, 1, 1, [move, a]);
}

const autohelperowl_defendpat444 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(757, trans, move);

  return (this.owl_strong_dragon(a) || this.owl_strong_dragon(b)) && !this.play_connect_n(color, 0, 1, [move, a, b]);
}

const autohelperowl_defendpat445 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(722, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(758, trans, move);
  let d = AFFINE_TRANSFORM(757, trans, move);
  let A = AFFINE_TRANSFORM(648, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);
  let C = AFFINE_TRANSFORM(794, trans, move);

  return  this.owl_escape_value(d) > 0 && this.play_attack_defend2_n(color, 1, 5, [move, a, b, c, d, B, c]) && this.play_connect_n(color, 1, 6, [move, a, b, c, d, NO_MOVE, A, C]);
}

const autohelperowl_defendpat446 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(610, trans, move);
  let d = AFFINE_TRANSFORM(611, trans, move);
  let C = AFFINE_TRANSFORM(648, trans, move);

  return this.owl_escape_value(a) > 0 && this.play_attack_defend2_n(color, 1, 2, [move, b, C, b])
    && !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 1, [move, a, d]);
}

const autohelperowl_defendpat447 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(721, trans, move);

  return this.board.countlib(A) === 2;
}

const autohelperowl_defendpat448 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(757, trans, move);
  let A = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(758, trans, move);
  let C = AFFINE_TRANSFORM(720, trans, move);
  let D = AFFINE_TRANSFORM(721, trans, move);

  return  (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0)
    && this.play_connect_n(this.board.OTHER_COLOR(color), 0, 0, [A, C]) 
    && this.play_attack_defend_n(color, 1, 2, [move, a, D]);
}

const autohelperowl_defendpat449 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(573, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return  (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0) && this.safe_move(move, this.board.OTHER_COLOR(color)) && !this.play_connect_n(color, 0, 1, [move, A, B]);
}

const autohelperowl_defendpat450 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);

  return (this.owl_escape_value(a) > 0 || this.owl_escape_value(b) > 0)&& this.play_connect_n(color, 0, 1, [move, a, b]) !== codes.WIN;
}

const autohelperowl_defendpat451 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(610, trans, move);
  let B = AFFINE_TRANSFORM(648, trans, move);
  let C = AFFINE_TRANSFORM(646, trans, move);

  return this.board.countlib(A)>1 && this.board.countlib(B)>1 && this.board.countlib(C)>1;
}

const autohelperowl_defendpat452 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countlib(A)===1;
}

const autohelperowl_defendpat453 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(611, trans, move);
  let B = AFFINE_TRANSFORM(649, trans, move);

  return  (this.board.countlib(A)>1) && (this.board.countlib(B)>1);
}

const autohelperowl_defendpat454 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(609, trans, move);
  let B = AFFINE_TRANSFORM(646, trans, move);

  return  (this.board.is_legal(move, color) && this.owl_topological_eye(a, this.board.board[B])===3) || (!this.board.is_legal(move, color) && this.owl_topological_eye(a, this.board.board[B])===2);
}

const autohelperowl_defendpat456 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend_n(color, 0, 1, [move, A]) !== codes.WIN;
}

const autohelperowl_defendpat457 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend_n(color, 0, 1, [move, A]) !== codes.WIN;
}

const autohelperowl_defendpat458 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.play_attack_defend_n(color, 0, 1, [move, A]) !== codes.WIN;
}

const autohelperowl_defendpat464 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);

  return ATTACK_MACRO.call(this, A) !== 0;
}

const autohelperowl_defendpat465 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.play_attack_defend_n(color, 0, 1, [move, A]) !== codes.WIN;
}

const autohelperowl_defendpat467 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(756, trans, move);

  return this.board.countlib(a) > 1;
}

const autohelperowl_defendpat469 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)===1 && this.finish_ko_helper(A);
}

const autohelperowl_defendpat470 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)===1 && this.finish_ko_helper(A);
}

const autohelperowl_defendpat471 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)===2 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>1 && this.squeeze_ko_helper(A);
}

const autohelperowl_defendpat472 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)===2 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>1 && this.squeeze_ko_helper(A);
}

const autohelperowl_defendpat473 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(795, trans, move);

  return ATTACK_MACRO.call(this, A);
}

const autohelperowl_defendpat474 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(795, trans, move);

  return !this.safe_move(a, this.board.OTHER_COLOR(color));
}

const autohelperowl_defendpat475 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend_n(this.board.OTHER_COLOR(color), 0, 1, move, a) !== codes.WIN && this.play_attack_defend_n(color, 1, 1, [move, a]) === 0;
}

const autohelperowl_defendpat476 = (trans, move, color, action)=>{
  let A = AFFINE_TRANSFORM(646, trans, move);

  return this.board.countlib(A)===1;
}

const autohelperowl_defendpat479 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(645, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);
  let c = AFFINE_TRANSFORM(719, trans, move);
  let d = AFFINE_TRANSFORM(683, trans, move);
  let A = AFFINE_TRANSFORM(646, trans, move);

  return  this.somewhere(color, 0, 3, a, b, c) && this.vital_chain(A) && !this.play_attack_defend_n(color, 0, 3, [move, NO_MOVE, d, A]);
}

const autohelperowl_defendpat480 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(645, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);
  let c = AFFINE_TRANSFORM(719, trans, move);
  let d = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);

  return  this.somewhere(color, 0, 3, a, b, c) && this.vital_chain(B) && !this.play_attack_defend_n(color, 0, 3, [move, NO_MOVE, d, B]);
}

const autohelperowl_defendpat481 = (trans, move, color, action)=>{
  let b = AFFINE_TRANSFORM(719, trans, move);
  let A = AFFINE_TRANSFORM(645, trans, move);
  let B = AFFINE_TRANSFORM(682, trans, move);

  return  this.board.countlib(A) >= 3 && this.board.countlib(B) === 3 && this.board.accuratelib(b, color, this.board.MAX_LIBERTIES, null) > 2;
}

const autohelperowl_defendpat484 = (trans, move, color, action)=>{
  // let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(610, trans, move);

  return  this.somewhere(color, 0, 1, b) || (this.somewhere(this.board.OTHER_COLOR(color), 0, 1, b) ? !this.play_attack_defend_n(color, 0, 1, [move, b]) : !this.play_attack_defend_n(color, 0, 2, move, b, b));
}

const autohelperowl_defendpat485 = (trans, move, color, action)=>{
  // let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);

  return  this.somewhere(color, 0, 1, b) || (this.somewhere(this.board.OTHER_COLOR(color), 0, 1, b) ? !this.play_attack_defend_n(color, 0, 1, [move, b]) : !this.play_attack_defend_n(color, 0, 2, move, b, b));
}

const autohelperowl_defendpat487 = (trans, move, color, action)=>{
  let a = AFFINE_TRANSFORM(609, trans, move);
  let B = AFFINE_TRANSFORM(682, trans, move);

  return  this.owl_proper_eye(a) && !ATTACK_MACRO.call(this, B);
}


const rawAttrs = [
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.THREATENS_TO_CAPTURE,0.0,646],
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.THREATENS_TO_CAPTURE,0.0,720],
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.THREATENS_TO_CAPTURE,0.0,645],
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.THREATENS_EYE,0.0,685],
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.THREATENS_EYE,0.0,648],
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.THREATENS_EYE,0.0,648],
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.THREATENS_EYE,0.0,647],
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.THREATENS_EYE,0.0,609],
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.REVERSE_SENTE,0.0,609],
  [attributeType.LAST_ATTRIBUTE,0.0,0]
]

const attributes = rawAttrs.map(item => {
  return new PatternAttribute(item)
})


const data = [
[owl_defendpat0,2,8, "D1",-2,0,2,3,4,3,0x2,759,
  [ 0x3f3f3f0f, 0x00ffffff, 0xf0f0f0f0, 0xfffc0000, 0xffff0000, 0x3f3f3f3f, 0x00fcffff, 0xf0f0f0c0],
  [ 0x00101008, 0x00500000, 0x10100000, 0x02140000, 0x00500000, 0x10100000, 0x00140200, 0x00101080]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat0,0,1.000000],
[owl_defendpat1,2,8, "D2",-2,-2,2,1,4,3,0x2,720,
  [ 0xffbfffff, 0xefffffff, 0xfcf8fcfc, 0xffffef00, 0xffffef00, 0xffbfffff, 0xefffffff, 0xfcf8fcfc],
  [ 0x20100000, 0x00180000, 0x00102000, 0x00900000, 0x00180000, 0x00102000, 0x00900000, 0x20100000]
  , 0x0,55.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat2,1,8, "D3",0,-2,4,1,4,3,0x2,685,
  [ 0x003fffff, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3f0000, 0x0f3f3f3f, 0x00f0fcfc],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x0,77.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat3,2,8, "D4",-1,-1,3,2,4,3,0x2,685,
  [ 0xecfcfcfc, 0xfcf8fc00, 0xffffef00, 0xffbfffff, 0xfcf8fcfc, 0xfcfcec00, 0xffbfff00, 0xefffffff],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x0,83.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat4,1,8, "D100",-1,-1,2,2,3,3,0x2,721,
  [ 0x3c3fffff, 0xc0fcfcf0, 0xfcf0f000, 0xffff0f00, 0xfcfcc000, 0xff3f3c00, 0x0fffff3f, 0xf0f0fcfc],
  [ 0x28100000, 0x00180800, 0x0010a000, 0x80900000, 0x08180000, 0x00102800, 0x00908000, 0xa0100000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat5,2,8, "D101",-1,-1,3,3,4,4,0x2,645,
  [ 0xf4fcf000, 0xffff3400, 0x3fff7f3f, 0x70fcfcfc, 0x34ffffff, 0xf0fcf4f0, 0xfcfc7000, 0x7fff3f00],
  [ 0x00181000, 0x00502000, 0x10900000, 0x20140000, 0x20500000, 0x10180000, 0x00142000, 0x00901000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat6,2,8, "D102",-1,-1,2,2,3,3,0x2,721,
  [ 0x1cffffff, 0xf0f4fcf0, 0xfcfcd000, 0xff7f3f00, 0xfcf4f000, 0xffff1c00, 0x3f7fff3f, 0xd0fcfcfc],
  [ 0x00a05000, 0x60600000, 0x14280000, 0x00242400, 0x00606000, 0x50a00000, 0x24240000, 0x00281400]
  , 0x0,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat7,3,8, "D103",-1,-1,2,2,3,3,0x2,721,
  [ 0x3cffffff, 0xf0fcfcf0, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xffff3c00, 0x3fffff3f, 0xf0fcfcfc],
  [ 0x10a05000, 0x60640000, 0x14281000, 0x00642400, 0x00646000, 0x50a01000, 0x24640000, 0x10281400]
  , 0x0,85.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat8,2,8, "D104",-1,-1,1,2,2,3,0x2,720,
  [ 0x0fffff00, 0xf0f0fcfc, 0xfcfcc000, 0xfc3c3c00, 0xfcf0f000, 0xffff0f00, 0x3c3cfcfc, 0xc0fcfc00],
  [ 0x01900000, 0x20100004, 0x00180000, 0x00102000, 0x00102000, 0x00900100, 0x20100040, 0x00180000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat8,0,1.600000],
[owl_defendpat9,3,8, "D104b",-1,-1,1,3,2,4,0x2,794,
  [ 0x3fffff00, 0xf0fcfcfc, 0xfcfcf000, 0xfcfc3c00, 0xfcfcf000, 0xffff3f00, 0x3cfcfcfc, 0xf0fcfc00],
  [ 0x11900000, 0x20140004, 0x00181000, 0x00502000, 0x00142000, 0x00901100, 0x20500040, 0x10180000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat9,0,1.600000],
[owl_defendpat10,4,8, "D105",-2,-1,1,2,3,3,0x8,720,
  [ 0xfcfefcfc, 0xfcfcfc20, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfcfefc00, 0xffffff20, 0xfcfcfcfc],
  [ 0x00180404, 0x00106000, 0x40900000, 0x25100000, 0x60100000, 0x04180000, 0x00102500, 0x00904040]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat11,3,8, "D106",0,-2,3,2,3,4,0x2,722,
  [ 0x00ffffff, 0xf0f0f0f0, 0xfffc0000, 0x3f3f3f0f, 0xf0f0f0c0, 0xffff0000, 0x3f3f3f3f, 0x00fcffff],
  [ 0x00924000, 0x60100020, 0x05180000, 0x00102404, 0x00106040, 0x40920000, 0x24100020, 0x00180500]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat12,1,8, "D107",-1,-1,3,2,4,3,0x2,685,
  [ 0x3dffffff, 0xf0fcfcf4, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xffff3d00, 0x3fffff7f, 0xf0fcfcfc],
  [ 0x00210000, 0x00200010, 0x00200000, 0x00200000, 0x00200000, 0x00210000, 0x00200010, 0x00200000]
  , 0x200,70.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat13,2,8, "D108",-2,-1,2,2,4,3,0x2,721,
  [ 0xffffffff, 0xfcfffffd, 0xfcfcfcf0, 0xffffff00, 0xfffffc00, 0xffffff3d, 0xffffffff, 0xfcfcfcfc],
  [ 0x21900000, 0x20180004, 0x00182000, 0x00902000, 0x00182000, 0x00902100, 0x20900040, 0x20180000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat14,2,8, "D109",-2,-1,2,2,4,3,0x2,647,
  [ 0xffffffff, 0xfcfffffd, 0xfcfcfcf0, 0xffffff00, 0xfffffc00, 0xffffff3d, 0xffffffff, 0xfcfcfcfc],
  [ 0x21100000, 0x00180004, 0x00102000, 0x00900000, 0x00180000, 0x00102100, 0x00900040, 0x20100000]
  , 0x800,95.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat15,4,8, "D110",-1,-3,2,3,3,6,0x2,610,
  [ 0xfffeffff, 0xfcfcfcec, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xfffeff00, 0xffffffef, 0xffffffff],
  [ 0x02100100, 0x00100048, 0x00100000, 0x00100000, 0x00100000, 0x01100200, 0x00100084, 0x00100000]
  , 0x0,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat16,1,8, "D111",0,-1,3,1,3,2,0x2,685,
  [ 0x007cfcfc, 0xd0f0f000, 0xfcf40000, 0x3f3f1f00, 0xf0f0d000, 0xfc7c0000, 0x1f3f3f00, 0x00f4fcfc],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x0,79.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat17,6,8, "D112",-1,0,2,5,3,5,0x2,795,
  [ 0x2f3f2f3f, 0x00b8fcfc, 0xe0f0e000, 0xffbb0000, 0xfcb80000, 0x2f3f2f00, 0x00bbffff, 0xe0f0e0f0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat18,1,8, "D113",-1,-2,2,2,3,4,0x2,647,
  [ 0xf4ffffff, 0xfcfcf4f0, 0xffff7f00, 0x7fffffff, 0xf4fcfcfc, 0xfffff400, 0xffff7f3f, 0x7fffffff],
  [ 0x20120000, 0x00180020, 0x00102000, 0x00900000, 0x00180000, 0x00122000, 0x00900020, 0x20100000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat19,1,8, "D114",-1,0,2,2,3,2,0x2,685,
  [ 0x00ffffff, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3f, 0x00fcfcfc],
  [ 0x00200090, 0x00200000, 0x00200000, 0x00210200, 0x00200000, 0x00200000, 0x02210000, 0x00200018]
  , 0x0,77.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat20,2,8, "D115",0,-1,3,2,3,3,0x2,722,
  [ 0x003c3ffe, 0x00f0f0c0, 0xf0f00000, 0x3f3f0300, 0xf0f00000, 0x3f3c0000, 0x033f3f0e, 0x00f0f0fc],
  [ 0x00200040, 0x00200000, 0x00200000, 0x00200100, 0x00200000, 0x00200000, 0x01200000, 0x00200004]
  , 0x0,76.000000,attributes[0],1,null,autohelperowl_defendpat20,3,1.000000],
[owl_defendpat21,2,8, "D116",-1,-2,1,0,2,2,0x2,648,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00900040, 0x20100000, 0x00180000, 0x00102100, 0x00102000, 0x00900000, 0x21100000, 0x00180004]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat21,0,0.010000],
[owl_defendpat22,3,8, "D117",0,-2,2,2,2,4,0x2,647,
  [ 0x00ffffff, 0xf0f0f0f0, 0xfefc0000, 0x3f3f3f08, 0xf0f0f080, 0xffff0000, 0x3f3f3f3f, 0x00fcfefc],
  [ 0x00120100, 0x00100060, 0x00100000, 0x00100000, 0x00100000, 0x01120000, 0x00100024, 0x00100000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat22,0,0.010000],
[owl_defendpat23,2,8, "D118",0,-1,3,2,3,3,0x2,648,
  [ 0x00f0fcfc, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0f, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f00, 0x003cffff],
  [ 0x00900400, 0x20104000, 0x40180000, 0x04102000, 0x40102000, 0x04900000, 0x20100400, 0x00184000]
  , 0x0,81.000000,attributes[0],1,null,autohelperowl_defendpat23,0,0.010000],
[owl_defendpat24,3,8, "D119",-1,-2,2,2,3,4,0x2,647,
  [ 0x3fffffff, 0xf0fcfcfc, 0xfffff000, 0xffff3f3f, 0xfcfcf0f0, 0xffff3f00, 0x3fffffff, 0xf0ffffff],
  [ 0x25100000, 0x00180404, 0x00106000, 0x40900000, 0x04180000, 0x00102500, 0x00904040, 0x60100000]
  , 0x0,81.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat25,2,8, "D120",-1,-1,3,4,4,5,0x2,759,
  [ 0x053fbfff, 0x80f0f4f4, 0xf8f04000, 0x7f3f0b00, 0xf4f08000, 0xbf3f0500, 0x0b3f7f7f, 0x40f0f8fc],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,82.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat26,1,8, "D121",-1,-4,2,1,3,5,0x2,758,
  [ 0xffffffff, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xffffff00, 0xffffffff, 0xfcfcfcfc],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,40.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat27,2,8, "D122",-2,-1,2,3,4,4,0x2,720,
  [ 0xffffffff, 0xfcfcffff, 0xfcfcfcc0, 0xffffff00, 0xfffcfc00, 0xffffff0f, 0xffffffff, 0xfcfcfcfc],
  [ 0xa0500000, 0x18180000, 0x00142800, 0x00909000, 0x00181800, 0x0050a000, 0x90900000, 0x28140000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat27,0,1.000000],
[owl_defendpat28,4,8, "D123",-2,-1,1,3,3,4,0x2,648,
  [ 0x203cfcfc, 0xc0f8f000, 0xfdf02000, 0x3fbf0f04, 0xf0f8c040, 0xfc3c2000, 0x0fbf3f00, 0x20f0fdfc],
  [ 0x00100050, 0x00100000, 0x00100000, 0x00110100, 0x00100000, 0x00100000, 0x01110000, 0x00100014]
  , 0x0,65.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat29,5,8, "D124",-1,-2,2,1,3,3,0x2,721,
  [ 0xfcfe7efe, 0x7cfcfca0, 0xf4fcfc00, 0xfffff700, 0xfcfc7c00, 0x7efefc00, 0xf7ffff2a, 0xfcfcf4fc],
  [ 0x08502000, 0x10900800, 0x20148000, 0x80181000, 0x08901000, 0x20500800, 0x10188000, 0x80142000]
  , 0x0,81.000000,attributes[0],1,null,autohelperowl_defendpat29,0,1.600000],
[owl_defendpat30,4,8, "D125",-2,-1,2,2,4,3,0x2,721,
  [ 0xffffefff, 0xfcbefefc, 0xecfcfca0, 0xfffbff00, 0xfebefc00, 0xefffff28, 0xfffbffff, 0xfcfcecfc],
  [ 0x02200100, 0x00200048, 0x00200000, 0x00200000, 0x00200000, 0x01200200, 0x00200084, 0x00200000]
  , 0x0,77.000000,attributes[0],1,null,autohelperowl_defendpat30,3,0.016000],
[owl_defendpat31,6,8, "D126",-3,-2,2,3,5,5,0xa,758,
  [ 0xffffffff, 0xfffffffe, 0xffffffff, 0xffffffff, 0xffffffff, 0xfffffffe, 0xffffffff, 0xffffffff],
  [ 0x08100000, 0x02120800, 0x00108028, 0x80100000, 0x08120200, 0x001008a0, 0x00108000, 0x80100000]
  , 0x0,85.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat32,8,8, "D127",-2,-3,1,2,3,5,0x2,683,
  [ 0xfefefe00, 0xfcffffaa, 0xfffffff0, 0xfcfcfcfc, 0xfffffcfc, 0xfefefe3e, 0xfcfcfca8, 0xffffff00],
  [ 0x04200000, 0x00200400, 0x00214000, 0x40200010, 0x04200010, 0x00200400, 0x00204000, 0x40210000]
  , 0x0,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat33,2,8, "D200",-1,-1,2,3,3,4,0x2,759,
  [ 0x3cffffff, 0xf0fcfcf0, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xffff3c00, 0x3fffff3f, 0xf0fcfcfc],
  [ 0x28500000, 0x10180800, 0x0014a000, 0x80901000, 0x08181000, 0x00502800, 0x10908000, 0xa0140000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat34,2,8, "D201",-1,-1,2,3,3,4,0x2,759,
  [ 0x3cffffff, 0xf0fcfcf0, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xffff3c00, 0x3fffff3f, 0xf0fcfcfc],
  [ 0x28500000, 0x10180800, 0x0014a000, 0x80901000, 0x08181000, 0x00502800, 0x10908000, 0xa0140000]
  , 0x0,81.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat35,2,8, "D202",-1,-1,2,2,3,3,0x2,722,
  [ 0x3fffffff, 0xf0fcfcfc, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xffff3f00, 0x3fffffff, 0xf0fcfcfc],
  [ 0x20580000, 0x10182000, 0x00942000, 0x20901000, 0x20181000, 0x00582000, 0x10902000, 0x20940000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat36,1,8, "D203",0,-1,2,2,2,3,0x2,685,
  [ 0x00ffffff, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3f, 0x00fcfcfc],
  [ 0x00a04000, 0x60200000, 0x04280000, 0x00202400, 0x00206000, 0x40a00000, 0x24200000, 0x00280400]
  , 0x0,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat37,1,8, "D204",-1,-1,1,2,2,3,0x2,685,
  [ 0x003cf43c, 0xc0f07000, 0x7cf00000, 0x373f0c00, 0x70f0c000, 0xf43c0000, 0x0c3f3700, 0x00f07cf0],
  [ 0x00108000, 0x80100000, 0x08100000, 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x00100800]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat37,0,0.610000],
[owl_defendpat38,2,8, "D205",-1,-1,2,1,3,2,0x2,722,
  [ 0x303cfcfc, 0xc0fcf000, 0xfcf03000, 0x3fff0f00, 0xf0fcc000, 0xfc3c3000, 0x0fff3f00, 0x30f0fcfc],
  [ 0x20184000, 0x40182000, 0x04902000, 0x20900400, 0x20184000, 0x40182000, 0x04902000, 0x20900400]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat39,2,8, "D206",-1,-1,1,3,2,4,0x2,721,
  [ 0x37bc3f00, 0x20fcf4cc, 0xf0f87000, 0x7cfc2000, 0xf4fc2000, 0x3fbc3700, 0x20fc7ccc, 0x70f8f000],
  [ 0x22100000, 0x00180008, 0x00102000, 0x00900000, 0x00180000, 0x00102200, 0x00900080, 0x20100000]
  , 0x0,65.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat40,3,8, "D207",0,-1,2,2,2,3,0x2,722,
  [ 0x003fbdbf, 0x80f0f070, 0xf8f00000, 0x3f3f0a00, 0xf0f08000, 0xbd3f0000, 0x0a3f3f37, 0x00f0f8f8],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x0,66.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat41,2,8, "D208",-1,0,2,3,3,3,0x2,722,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,65.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat42,2,8, "D209",-1,0,1,2,2,2,0x2,721,
  [ 0x0f3f3f00, 0x00f0fcfc, 0xf0f0c000, 0xfc3c0000, 0xfcf00000, 0x3f3f0f00, 0x003cfcfc, 0xc0f0f000],
  [ 0x05200000, 0x00200404, 0x00204000, 0x40200000, 0x04200000, 0x00200500, 0x00204040, 0x40200000]
  , 0x20,70.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat43,2,8, "D209a",-1,0,1,2,2,2,0x2,722,
  [ 0x0f3f3f00, 0x00f0fcfc, 0xf0f0c000, 0xfc3c0000, 0xfcf00000, 0x3f3f0f00, 0x003cfcfc, 0xc0f0f000],
  [ 0x05200000, 0x00200404, 0x00204000, 0x40200000, 0x04200000, 0x00200500, 0x00204040, 0x40200000]
  , 0x20,35.000000,attributes[0],1,null,autohelperowl_defendpat43,3,1.000000],
[owl_defendpat44,3,8, "D209b",0,-1,2,2,2,3,0x2,685,
  [ 0x003efeff, 0xc0f0f0a0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xfe3e0000, 0x0f3f3f2b, 0x00f0fcfc],
  [ 0x00108000, 0x80100000, 0x08100000, 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x00100800]
  , 0x20,70.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat45,3,8, "D210",0,-1,2,2,2,3,0x2,685,
  [ 0x003cffff, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0f, 0x00f0fcfc],
  [ 0x00148100, 0x80101040, 0x08500000, 0x10100800, 0x10108000, 0x81140000, 0x08101004, 0x00500800]
  , 0x0,70.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat46,3,8, "D211",-2,-1,2,1,4,2,0x8,647,
  [ 0x7fffff00, 0xf4fcfcfc, 0xfffdf400, 0xfcfc7c1c, 0xfcfcf4d0, 0xffff7f00, 0x7cfcfcfc, 0xf4fdff00],
  [ 0x25100000, 0x00180404, 0x00106000, 0x40900000, 0x04180000, 0x00102500, 0x00904040, 0x60100000]
  , 0x0,71.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat47,4,8, "D212",-1,-3,1,2,2,5,0x2,722,
  [ 0xc0fcfe00, 0xfcf0f080, 0xffff0c00, 0x3c3cfc3c, 0xf0f0fcf0, 0xfefcc000, 0xfc3c3c08, 0x0cffff00],
  [ 0x40186000, 0x44902000, 0x26900400, 0x20184408, 0x20904480, 0x60184000, 0x44182000, 0x04902600]
  , 0x0,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat48,1,8, "D213",-1,0,2,3,3,3,0x2,723,
  [ 0x003f3fff, 0x00f0f0f0, 0xf0f00000, 0x3f3f0300, 0xf0f00000, 0x3f3f0000, 0x033f3f3f, 0x00f0f0fc],
  [ 0x00100080, 0x00100000, 0x00100000, 0x00100200, 0x00100000, 0x00100000, 0x02100000, 0x00100008]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat48,0,3.000000],
[owl_defendpat49,2,8, "D214",0,-1,2,1,2,2,0x2,685,
  [ 0x00b4fcfc, 0xe0f0d000, 0xfc780000, 0x1f3f2f00, 0xd0f0e000, 0xfcb40000, 0x2f3f1f00, 0x0078fcfc],
  [ 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x80100000, 0x08100000, 0x00100800, 0x00108000]
  , 0x0,50.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat50,2,8, "D215",-2,-1,2,2,4,3,0x2,685,
  [ 0xffffffff, 0xfcfcffff, 0xfcfcfcc0, 0xffffff00, 0xfffcfc00, 0xffffff0f, 0xffffffff, 0xfcfcfcfc],
  [ 0x0a250000, 0x00201818, 0x00608000, 0x90200000, 0x18200000, 0x00250a00, 0x00209090, 0x80600000]
  , 0x0,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat51,2,8, "D216",0,-1,2,2,2,3,0x2,648,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfffc0000, 0x3f3f3f0f, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3f00, 0x00fcffff],
  [ 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x40100000, 0x04100000, 0x00100400, 0x00104000]
  , 0x0,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat52,2,8, "D217",-1,0,1,3,2,3,0x2,758,
  [ 0x2f3f1700, 0x00787cfc, 0x50f0e000, 0xf4b40000, 0x7c780000, 0x173f2f00, 0x00b4f4fc, 0xe0f05000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat52,0,1.000000],
[owl_defendpat53,1,8, "D217a",-1,0,1,3,2,3,0x2,758,
  [ 0x0f3f3700, 0x00f07cfc, 0x70f0c000, 0xf43c0000, 0x7cf00000, 0x373f0f00, 0x003cf4fc, 0xc0f07000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat53,0,1.000000],
[owl_defendpat54,3,8, "D217b",-1,0,1,3,2,3,0x2,758,
  [ 0x3f3f3f00, 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc, 0xf0f0f000],
  [ 0x12100000, 0x00140008, 0x00101000, 0x00500000, 0x00140000, 0x00101200, 0x00500080, 0x10100000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat55,3,8, "D217c",-1,0,1,3,2,3,0x2,758,
  [ 0x3f3f3700, 0x00fc7cfc, 0x70f0f000, 0xf4fc0000, 0x7cfc0000, 0x373f3f00, 0x00fcf4fc, 0xf0f07000],
  [ 0x12100000, 0x00140008, 0x00101000, 0x00500000, 0x00140000, 0x00101200, 0x00500080, 0x10100000]
  , 0x10,10.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat56,4,8, "D218",-1,-3,2,3,3,6,0x2,611,
  [ 0xfffeffff, 0xfcfcfcec, 0xfffffd00, 0xffffff7f, 0xfcfcfcf4, 0xfffeff00, 0xffffffef, 0xfdffffff],
  [ 0x02100100, 0x00100048, 0x00100000, 0x00100000, 0x00100000, 0x01100200, 0x00100084, 0x00100000]
  , 0x0,70.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat57,4,8, "D220",-1,-1,1,3,2,4,0x2,758,
  [ 0x2bbfff00, 0xe0f8f8fc, 0xfcf8a000, 0xbcbc2c00, 0xf8f8e000, 0xffbf2b00, 0x2cbcbcfc, 0xa0f8fc00],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,40.000000,attributes[0],1,null,autohelperowl_defendpat57,0,0.010000],
[owl_defendpat58,3,8, "D221",-1,0,1,3,2,3,0x2,758,
  [ 0x283f3f00, 0x00f8f8f0, 0xf0f0a000, 0xbcbc0000, 0xf8f80000, 0x3f3f2800, 0x00bcbc3c, 0xa0f0f000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat59,4,8, "D221b",-1,0,1,3,2,3,0x2,758,
  [ 0x283f3f00, 0x00f8f8f0, 0xf0f0a000, 0xbcbc0000, 0xf8f80000, 0x3f3f2800, 0x00bcbc3c, 0xa0f0f000],
  [ 0x00101000, 0x00500000, 0x10100000, 0x00140000, 0x00500000, 0x10100000, 0x00140000, 0x00101000]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat60,2,8, "D222",-1,-1,2,2,3,3,0x2,722,
  [ 0x007cfff7, 0xd0f0f0c0, 0xfcf40000, 0x3d3f1f00, 0xf0f0d000, 0xff7c0000, 0x1f3f3d0f, 0x00f4fc7c],
  [ 0x00205000, 0x40600000, 0x14200000, 0x00240400, 0x00604000, 0x50200000, 0x04240000, 0x00201400]
  , 0x0,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat61,4,8, "D223",-1,-2,1,2,2,4,0x2,647,
  [ 0xffffff00, 0xfcfcfcfc, 0xfefefc00, 0xfcfcfc28, 0xfcfcfca0, 0xffffff00, 0xfcfcfcfc, 0xfcfefe00],
  [ 0xa1100000, 0x08180004, 0x00102800, 0x00908000, 0x00180800, 0x0010a100, 0x80900040, 0x28100000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat61,0,1.600000],
[owl_defendpat62,3,8, "D224",-1,-1,1,2,2,3,0x2,685,
  [ 0x283c7cfc, 0x40f8f800, 0xf4f0a000, 0xbfbf0700, 0xf8f84000, 0x7c3c2800, 0x07bfbf00, 0xa0f0f4fc],
  [ 0x00100080, 0x00100000, 0x00100000, 0x00100200, 0x00100000, 0x00100000, 0x02100000, 0x00100008]
  , 0x0,30.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat63,4,8, "D225",-1,-1,2,3,3,4,0x2,648,
  [ 0xc0fcfcfc, 0xfcf0f000, 0xffff0c00, 0x3f3fff3f, 0xf0f0fcf0, 0xfcfcc000, 0xff3f3f00, 0x0cffffff],
  [ 0x80101820, 0x08508000, 0x90110800, 0x08168010, 0x80500810, 0x18108000, 0x80160800, 0x08119020]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat64,4,8, "D226",-1,0,2,2,3,2,0x2,722,
  [ 0x003fbfef, 0x80f0f0f0, 0xf8f00000, 0x3f3e0b00, 0xf0f08000, 0xbf3f0000, 0x0b3e3f3f, 0x00f0f8ec],
  [ 0x00240048, 0x00201000, 0x00600000, 0x12200100, 0x10200000, 0x00240000, 0x01201200, 0x00600084]
  , 0x2000,45.000000,attributes[0],1,null,autohelperowl_defendpat64,3,0.016000],
[owl_defendpat65,4,8, "D227",-1,-1,2,2,3,3,0x2,648,
  [ 0xfcfcfcf8, 0xfcfcfc00, 0xffffff00, 0xfeffffff, 0xfcfcfcfc, 0xfcfcfc00, 0xfffffe00, 0xffffffbf],
  [ 0x48240400, 0x04205800, 0x40608400, 0x94204000, 0x58200400, 0x04244800, 0x40209400, 0x84604000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat65,3,0.610000],
[owl_defendpat66,5,8, "D228",-1,-1,2,2,3,3,0x2,758,
  [ 0xffffffbf, 0xfcfcfcfc, 0xfcfcfc00, 0xfffffe00, 0xfcfcfc00, 0xffffff00, 0xfeffffff, 0xfcfcfcf8],
  [ 0x84684400, 0x58206400, 0x44a44800, 0x64209400, 0x64205800, 0x44688400, 0x94206400, 0x48a44400]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat66,3,0.610000],
[owl_defendpat67,5,8, "D229",-1,-1,1,2,2,3,0x2,683,
  [ 0xbcfcfc00, 0xfafeff00, 0xfcfcf8e8, 0xfcfcbc00, 0xfffefa00, 0xfcfcbcac, 0xbcfcfc00, 0xf8fcfc00],
  [ 0x00609000, 0x90600000, 0x18240000, 0x00241800, 0x00609000, 0x90600000, 0x18240000, 0x00241800]
  , 0x0,76.000000,attributes[0],1,null,autohelperowl_defendpat67,3,0.010000],
[owl_defendpat68,3,8, "D230",0,-2,2,4,2,6,0x2,574,
  [ 0x00fcfefc, 0xf0f0f080, 0xffff0000, 0x3f3f3f3f, 0xf0f0f0f0, 0xfefc0000, 0x3f3f3f08, 0x00ffffff],
  [ 0x00140000, 0x00101000, 0x00500000, 0x10100000, 0x10100000, 0x00140000, 0x00101000, 0x00500000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat68,0,10.000000],
[owl_defendpat69,6,8, "D231",-2,-2,2,1,4,3,0x1,723,
  [ 0x2a3efeff, 0xc0f8f8a8, 0xfcf0a000, 0xbfbf0f00, 0xf8f8c000, 0xfe3e2a00, 0x0fbfbfab, 0xa0f0fcfc],
  [ 0x00100020, 0x00100000, 0x00100000, 0x00120000, 0x00100000, 0x00100000, 0x00120000, 0x00100020]
  , 0x2810,70.000000,attributes[0],1,null,autohelperowl_defendpat69,0,1.141360],
[owl_defendpat70,4,8, "D232",-1,-1,1,3,2,4,0x2,795,
  [ 0x0cffff00, 0xf0f0fcf0, 0xfcfcc000, 0xfc3c3c00, 0xfcf0f000, 0xffff0c00, 0x3c3cfc3c, 0xc0fcfc00],
  [ 0x04910400, 0x20104410, 0x40184000, 0x44102000, 0x44102000, 0x04910400, 0x20104410, 0x40184000]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_defendpat70,0,0.376000],
[owl_defendpat71,9,8, "D233",0,-3,2,1,2,4,0x2,685,
  [ 0x00b0fcbc, 0xe0f0c000, 0xfe3a0000, 0x0f3f2e2a, 0xc0f0e0a0, 0xfcb00000, 0x2e3f0f00, 0x003afefa],
  [ 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x80100000, 0x08100000, 0x00100800, 0x00108000]
  , 0x20,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat72,2,8, "D234",-1,-3,1,1,2,4,0x2,647,
  [ 0xd0f0f800, 0xfcf48000, 0xbf3f1f00, 0x087cfcfc, 0x80f4fcfc, 0xf8f0d000, 0xfc7c0800, 0x1f3fbf00],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat72,3,16.000000],
[owl_defendpat73,1,8, "D300",-1,0,1,4,2,4,0x0,685,
  [ 0x007cfcfc, 0xd0f0f000, 0xfcf40000, 0x3f3f1f00, 0xf0f0d000, 0xfc7c0000, 0x1f3f3f00, 0x00f4fcfc],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x2000,80.000000,attributes[0],1,null,autohelperowl_defendpat73,0,0.010000],
[owl_defendpat74,2,8, "D301",-1,0,1,3,2,3,0x0,686,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00940000, 0x20101000, 0x00580000, 0x10102000, 0x10102000, 0x00940000, 0x20101000, 0x00580000]
  , 0x2000,80.000000,attributes[0],1,null,autohelperowl_defendpat74,0,0.010000],
[owl_defendpat75,1,8, "D302",0,-1,2,2,2,3,0x0,685,
  [ 0x00fcfcf0, 0xf0f0f000, 0xfffc0000, 0x3c3f3f0c, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3c00, 0x00fcff3c],
  [ 0x00280400, 0x00206000, 0x40a00000, 0x24200000, 0x60200000, 0x04280000, 0x00202400, 0x00a04000]
  , 0x0,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat76,2,8, "D303",-1,-1,2,2,3,3,0x0,722,
  [ 0xf0fcff3c, 0xfcfcf0c0, 0xfcfc3c00, 0x3ffffc00, 0xf0fcfc00, 0xfffcf000, 0xfcff3f0c, 0x3cfcfcf0],
  [ 0x90902000, 0x28940000, 0x20181800, 0x0058a000, 0x00942800, 0x20909000, 0xa0580000, 0x18182000]
  , 0x800,70.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat77,2,8, "D304",-1,0,1,2,2,2,0x0,721,
  [ 0x00fcfc0c, 0xf0f0f000, 0xfcfc0000, 0x3f3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3f00, 0x00fcfcc0],
  [ 0x00604000, 0x50200000, 0x04240000, 0x00201400, 0x00205000, 0x40600000, 0x14200000, 0x00240400]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat77,3,1.000000],
[owl_defendpat78,1,8, "D305",-1,-2,2,1,3,3,0x0,685,
  [ 0x30ffffff, 0xf0fcf0f0, 0xfcfc3000, 0x3fff3f00, 0xf0fcf000, 0xffff3000, 0x3fff3f3f, 0x30fcfcfc],
  [ 0x00200100, 0x00200040, 0x00200000, 0x00200000, 0x00200000, 0x01200000, 0x00200004, 0x00200000]
  , 0x0,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat79,2,8, "D306",-1,0,2,3,3,3,0x0,722,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat79,3,4.800000],
[owl_defendpat80,2,8, "D307",-1,-2,1,2,2,4,0x0,721,
  [ 0x30ffff00, 0xf0fcf0f0, 0xfcff3000, 0x3cfc3c30, 0xf0fcf030, 0xffff3000, 0x3cfc3c3c, 0x30fffc00],
  [ 0x00209100, 0x80600040, 0x18200000, 0x00240800, 0x00608000, 0x91200000, 0x08240004, 0x00201800]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat80,3,1.000000],
[owl_defendpat81,2,8, "D308",0,-2,1,0,1,2,0x0,722,
  [ 0x003c3c2c, 0x00f0f000, 0xf0f00000, 0x3f3e0000, 0xf0f00000, 0x3c3c0000, 0x003e3f00, 0x00f0f0e0],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x830,77.000000,attributes[0],1,null,autohelperowl_defendpat81,0,1.960000],
[owl_defendpat82,4,8, "D309",-1,0,1,2,2,2,0x0,685,
  [ 0x0038f838, 0xc0f0a000, 0xbcb00000, 0x2a3f0c00, 0xa0f0c000, 0xf8380000, 0x0c3f2a00, 0x00b0bcb0],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat82,3,1.600000],
[owl_defendpat83,4,8, "D309a",-1,0,1,2,2,2,0x0,685,
  [ 0x0038f838, 0xc0f0a000, 0xbcb00000, 0x2a3f0c00, 0xa0f0c000, 0xf8380000, 0x0c3f2a00, 0x00b0bcb0],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x800,60.000000,attributes[0],1,null,autohelperowl_defendpat83,3,1.006000],
[owl_defendpat84,1,8, "D309b",-1,0,2,2,3,2,0x0,722,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x0,61.000000,attributes[0],1,null,autohelperowl_defendpat84,3,1.600000],
[owl_defendpat85,5,8, "D310a",-2,-1,1,1,3,2,0x0,646,
  [ 0xfcfca000, 0xbcbe3c00, 0x28fcfc20, 0xf0f8f800, 0x3cbebc00, 0xa0fcfc20, 0xf8f8f000, 0xfcfc2800],
  [ 0x04180000, 0x00102400, 0x00904000, 0x60100000, 0x24100000, 0x00180400, 0x00106000, 0x40900000]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_defendpat85,0,0.970000],
[owl_defendpat86,5,8, "D310b",-2,-1,1,1,3,2,0x0,646,
  [ 0xfcfca000, 0xbcbe3c00, 0x28fcfc20, 0xf0f8f800, 0x3cbebc00, 0xa0fcfc20, 0xf8f8f000, 0xfcfc2800],
  [ 0x04180000, 0x00102400, 0x00904000, 0x60100000, 0x24100000, 0x00180400, 0x00106000, 0x40900000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat86,0,0.592000],
[owl_defendpat87,2,8, "D311",0,-1,2,1,2,2,0x0,685,
  [ 0x00f0fcc0, 0xf0f0c000, 0xfc3c0000, 0x0c3c3f00, 0xc0f0f000, 0xfcf00000, 0x3f3c0c00, 0x003cfc0c],
  [ 0x00600400, 0x10204000, 0x40240000, 0x04201000, 0x40201000, 0x04600000, 0x10200400, 0x00244000]
  , 0x20,60.000000,attributes[0],1,null,autohelperowl_defendpat87,3,1.000000],
[owl_defendpat88,1,8, "D313",-1,-2,2,0,3,2,0x0,685,
  [ 0x00fffffc, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3c, 0x00fcfcfc],
  [ 0x00920200, 0x201000a0, 0x00180000, 0x00102000, 0x00102000, 0x02920000, 0x20100028, 0x00180000]
  , 0x0,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat89,3,8, "D314",-1,-2,2,2,3,4,0x0,722,
  [ 0xf0ffffff, 0xfcfcf0f0, 0xffff3f00, 0x3fffffff, 0xf0fcfcfc, 0xfffff000, 0xffff3f3f, 0x3fffffff],
  [ 0x80681000, 0x18602000, 0x10a50a00, 0x20249090, 0x20601818, 0x10688000, 0x90242000, 0x0aa51000]
  , 0x0,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat90,6,8, "D315",-1,0,1,2,2,2,0x0,722,
  [ 0x00fcfca8, 0xf0f0f000, 0xfcfc0000, 0x3e3e3e00, 0xf0f0f000, 0xfcfc0000, 0x3e3e3e00, 0x00fcfca8],
  [ 0x00584000, 0x50102000, 0x04940000, 0x20101400, 0x20105000, 0x40580000, 0x14102000, 0x00940400]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat90,0,1.000000],
[owl_defendpat91,2,8, "D316",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00108010, 0x80100000, 0x08100000, 0x00110800, 0x00108000, 0x80100000, 0x08110000, 0x00100810]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat91,0,1.000000],
[owl_defendpat92,2,8, "D317",-1,0,1,2,2,2,0x0,685,
  [ 0x00fcfc0c, 0xf0f0f000, 0xfcfc0000, 0x3f3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3f00, 0x00fcfcc0],
  [ 0x00604000, 0x50200000, 0x04240000, 0x00201400, 0x00205000, 0x40600000, 0x14200000, 0x00240400]
  , 0x0,95.000000,attributes[0],1,null,autohelperowl_defendpat92,3,1.600000],
[owl_defendpat93,5,8, "D318",-1,-1,1,2,2,3,0x0,722,
  [ 0xf8fcfc7c, 0xfcfcf800, 0xfcfcbc00, 0xbffffd00, 0xf8fcfc00, 0xfcfcf800, 0xfdffbf00, 0xbcfcfcf4],
  [ 0x50609020, 0x94640000, 0x18241400, 0x00665800, 0x00649400, 0x90605000, 0x58660000, 0x14241820]
  , 0x0,82.000000,attributes[0],1,null,autohelperowl_defendpat93,3,1.000000],
[owl_defendpat94,3,8, "D319",-1,-2,1,1,2,3,0x0,721,
  [ 0xffffbf00, 0xbcfcfcfc, 0xf8fcfc00, 0xfcfcf800, 0xfcfcbc00, 0xbfffff00, 0xf8fcfcfc, 0xfcfcf800],
  [ 0x80601200, 0x18600080, 0x10240800, 0x00249000, 0x00601800, 0x12608000, 0x90240008, 0x08241000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat94,3,0.010000],
[owl_defendpat95,4,8, "D320",-2,-1,1,2,3,3,0x0,686,
  [ 0xf8fcfcfc, 0xfcfcf800, 0xfcfebc00, 0xbfffff20, 0xf8fcfc20, 0xfcfcf800, 0xffffbf00, 0xbcfefcfc],
  [ 0x40180000, 0x04102000, 0x00900400, 0x20104000, 0x20100400, 0x00184000, 0x40102000, 0x04900000]
  , 0x0,50.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat96,1,8, "D400",-1,0,1,1,2,1,0x5,685,
  [ 0x00fc7c00, 0x70f0f000, 0xf4fc0000, 0x3c3c3400, 0xf0f07000, 0x7cfc0000, 0x343c3c00, 0x00fcf400],
  [ 0x00900000, 0x20100000, 0x00180000, 0x00102000, 0x00102000, 0x00900000, 0x20100000, 0x00180000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat96,0,1.000000],
[owl_defendpat97,1,8, "D401",-1,0,1,1,2,1,0x5,648,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00900000, 0x20100000, 0x00180000, 0x00102000, 0x00102000, 0x00900000, 0x20100000, 0x00180000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat97,0,0.010000],
[owl_defendpat98,1,8, "D402",0,-2,3,2,3,4,0x6,719,
  [ 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0, 0xffff0000, 0xffff0000, 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat99,2,8, "D403",-2,-1,1,2,3,3,0xa,721,
  [ 0xfffffdf0, 0xfcfcfc7c, 0xfcfcfc00, 0xfcffff00, 0xfcfcfc00, 0xfdffff00, 0xfffffcf4, 0xfcfcfc3c],
  [ 0x00200410, 0x00204000, 0x40200000, 0x04210000, 0x40200000, 0x04200000, 0x00210400, 0x00204010]
  , 0x0,70.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat100,2,8, "D404",-1,0,3,3,4,3,0x6,722,
  [ 0x003fffef, 0xc0f0f0f0, 0xfcf00000, 0x3f3e0f00, 0xf0f0c000, 0xff3f0000, 0x0f3e3f3f, 0x00f0fcec],
  [ 0x00200040, 0x00200000, 0x00200000, 0x00200100, 0x00200000, 0x00200000, 0x01200000, 0x00200004]
  , 0x0,90.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat101,3,8, "D405",0,-1,4,2,4,3,0x6,686,
  [ 0x00b0bcfc, 0xa0f0c000, 0xfb3b0000, 0x0f3f2b3f, 0xc0f0a0f0, 0xbcb00000, 0x2b3f0f00, 0x003bfbff],
  [ 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x80100000, 0x08100000, 0x00100800, 0x00108000]
  , 0x0,90.000000,attributes[0],1,null,autohelperowl_defendpat101,0,0.610000],
[owl_defendpat102,4,8, "D406",0,-2,3,2,3,4,0xa,723,
  [ 0x00bcfcfd, 0xe0f0f000, 0xfffa0000, 0x3f3f2f2f, 0xf0f0e0e0, 0xfcbc0000, 0x2f3f3f01, 0x00faffff],
  [ 0x00140000, 0x00101000, 0x00500000, 0x10100000, 0x10100000, 0x00140000, 0x00101000, 0x00500000]
  , 0x0,70.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat103,3,8, "D407",-1,-2,2,2,3,4,0xa,647,
  [ 0xf0fcffff, 0xfcfcf0c0, 0xffff3f00, 0x3fffffff, 0xf0fcfcfc, 0xfffcf000, 0xffff3f0f, 0x3fffffff],
  [ 0x20180500, 0x00186040, 0x40902000, 0x24900000, 0x60180000, 0x05182000, 0x00902404, 0x20904000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat104,4,8, "D408",-1,-1,1,2,2,3,0xa,721,
  [ 0xacffff00, 0xf8f8fcf0, 0xfcfce800, 0xfcbcbc00, 0xfcf8f800, 0xffffac00, 0xbcbcfc3c, 0xe8fcfc00],
  [ 0x04120000, 0x00100420, 0x00104000, 0x40100000, 0x04100000, 0x00120400, 0x00104020, 0x40100000]
  , 0x0,30.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat105,2,8, "D409",0,-1,3,3,3,4,0x6,722,
  [ 0x00bfffff, 0xe0f0f0f0, 0xfcf80000, 0x3f3f2f00, 0xf0f0e000, 0xffbf0000, 0x2f3f3f3f, 0x00f8fcfc],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat106,3,8, "D500",-1,-1,1,2,2,3,0x2,685,
  [ 0x7fffff00, 0xf4fcfcfc, 0xfcfcf400, 0xfcfc7c00, 0xfcfcf400, 0xffff7f00, 0x7cfcfcfc, 0xf4fcfc00],
  [ 0x25900000, 0x20180404, 0x00186000, 0x40902000, 0x04182000, 0x00902500, 0x20904040, 0x60180000]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat107,3,8, "D502",-1,-1,1,2,2,3,0x2,685,
  [ 0x3fffff00, 0xf0fcfcfc, 0xfcfcf000, 0xfcfc3c00, 0xfcfcf000, 0xffff3f00, 0x3cfcfcfc, 0xf0fcfc00],
  [ 0x21910000, 0x20180014, 0x00182000, 0x00902000, 0x00182000, 0x00912100, 0x20900050, 0x20180000]
  , 0x0,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat108,3,8, "D503",-1,-2,1,0,2,2,0x8,686,
  [ 0x00fcfcf0, 0xf0f0f000, 0xfcfc0000, 0x3c3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3c00, 0x00fcfc3c],
  [ 0x00580400, 0x10106000, 0x40940000, 0x24101000, 0x60101000, 0x04580000, 0x10102400, 0x00944000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat108,0,3.160000],
[owl_defendpat109,5,8, "D503b",-1,-2,2,0,3,2,0x8,647,
  [ 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3e00, 0x00ffffbc, 0x00fcfcf8, 0xf0f0f000, 0xffff0000, 0x3e3f3f3c],
  [ 0x10101060, 0x00540000, 0x10101000, 0x00560100, 0x00540000, 0x10101000, 0x01560000, 0x10101024]
  , 0x10,45.000000,attributes[0],1,null,autohelperowl_defendpat109,0,0.610000],
[owl_defendpat110,2,8, "D504",-1,-2,0,1,1,3,0x0,720,
  [ 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000],
  [ 0x00102400, 0x00904000, 0x60100000, 0x04180000, 0x40900000, 0x24100000, 0x00180400, 0x00106000]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_defendpat110,0,0.959200],
[owl_defendpat111,3,8, "D505",0,-1,2,1,2,2,0x2,686,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00580400, 0x10106000, 0x40940000, 0x24101000, 0x60101000, 0x04580000, 0x10102400, 0x00944000]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_defendpat111,0,1.186000],
[owl_defendpat112,2,8, "D506",0,-1,2,1,2,2,0x2,686,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00180400, 0x00106000, 0x40900000, 0x24100000, 0x60100000, 0x04180000, 0x00102400, 0x00904000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat112,0,1.315600],
[owl_defendpat113,3,8, "D507",-1,-2,1,2,2,4,0x2,721,
  [ 0xfeffff00, 0xfcfcfcf8, 0xfcfffc00, 0xfcfcfc30, 0xfcfcfc30, 0xfffffe00, 0xfcfcfcbc, 0xfcfffc00],
  [ 0xa0500000, 0x18180000, 0x00162800, 0x00909020, 0x00181820, 0x0050a000, 0x90900000, 0x28160000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat113,0,1.000000],
[owl_defendpat114,4,8, "D508",-1,-2,1,2,2,4,0x2,720,
  [ 0xfeffff00, 0xfcfcfcf8, 0xfcfffc00, 0xfcfcfc30, 0xfcfcfc30, 0xfffffe00, 0xfcfcfcbc, 0xfcfffc00],
  [ 0xa0510000, 0x18180010, 0x00162800, 0x00909020, 0x00181820, 0x0051a000, 0x90900010, 0x28160000]
  , 0x0,90.000000,attributes[0],1,null,autohelperowl_defendpat114,0,1.000000],
[owl_defendpat115,2,8, "D509",0,-1,1,1,1,2,0x2,722,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00186000, 0x40902000, 0x24900000, 0x20180400, 0x20904000, 0x60180000, 0x04182000, 0x00902400]
  , 0x0,90.000000,attributes[0],1,null,autohelperowl_defendpat115,0,1.000000],
[owl_defendpat116,3,8, "D510",-1,-1,1,1,2,2,0x0,683,
  [ 0x30fcf000, 0xf0fc3000, 0x3cfc3000, 0x30fc3c00, 0x30fcf000, 0xf0fc3000, 0x3cfc3000, 0x30fc3c00],
  [ 0x00649000, 0x90601000, 0x18640000, 0x10241800, 0x10609000, 0x90640000, 0x18241000, 0x00641800]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat116,3,1.000000],
[owl_defendpat117,5,8, "D511",-1,-1,2,1,3,2,0x0,648,
  [ 0xbcfcfcf4, 0xf8fcfc00, 0xfcfcf800, 0xfdffbf00, 0xfcfcf800, 0xfcfcbc00, 0xbffffd00, 0xf8fcfc7c],
  [ 0x04241860, 0x00609400, 0x90604000, 0x58260100, 0x94600000, 0x18240400, 0x01265800, 0x40609024]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat117,3,1.000000],
[owl_defendpat118,2,8, "D512",-2,-2,2,2,4,4,0x2,682,
  [ 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
  [ 0x24900000, 0x20180400, 0x00186200, 0x40902080, 0x04182008, 0x00902400, 0x20904000, 0x62180000]
  , 0x0,85.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat119,6,8, "D513",-2,-1,2,3,4,4,0x2,721,
  [ 0xffffffff, 0xfcfcffff, 0xfcfcfcc0, 0xffffff00, 0xfffcfc00, 0xffffff0f, 0xffffffff, 0xfcfcfcfc],
  [ 0xa4900000, 0x28180400, 0x00186800, 0x4090a000, 0x04182800, 0x0090a400, 0xa0904000, 0x68180000]
  , 0x0,85.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat120,4,8, "D514",-1,-1,1,2,2,3,0x0,647,
  [ 0x30fcfcbc, 0xf0fcf000, 0xfcfc3000, 0x3fff3e00, 0xf0fcf000, 0xfcfc3000, 0x3eff3f00, 0x30fcfcf8],
  [ 0x20180404, 0x00186000, 0x40902000, 0x25900000, 0x60180000, 0x04182000, 0x00902500, 0x20904040]
  , 0x0,76.000000,attributes[0],1,null,autohelperowl_defendpat120,0,0.019600],
[owl_defendpat121,4,8, "D515",0,-2,2,2,2,4,0x2,649,
  [ 0x00fcffff, 0xf0f0f0c0, 0xfffc0000, 0x3f3f3f0f, 0xf0f0f0c0, 0xfffc0000, 0x3f3f3f0f, 0x00fcffff],
  [ 0x00580600, 0x10106080, 0x41940000, 0x24101004, 0x60101040, 0x06580000, 0x10102408, 0x00944100]
  , 0x0,61.000000,attributes[0],1,null,autohelperowl_defendpat121,0,1.000000],
[owl_defendpat122,5,8, "D600",-1,-2,1,1,2,3,0x2,720,
  [ 0xfef73e00, 0x3cfcdcb8, 0xf07cfc00, 0xdcfcf000, 0xdcfc3c00, 0x3ef7fe00, 0xf0fcdcb8, 0xfc7cf000],
  [ 0x00912400, 0x20904010, 0x60180000, 0x04182000, 0x40902000, 0x24910000, 0x20180410, 0x00186000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat123,5,8, "D600a",-1,-2,1,2,2,4,0x2,683,
  [ 0xfef73e00, 0x3cfcdcb8, 0xf07cff00, 0xdcfcf0c0, 0xdcfc3c0c, 0x3ef7fe00, 0xf0fcdcb8, 0xff7cf000],
  [ 0x00912400, 0x20904010, 0x60180200, 0x04182080, 0x40902008, 0x24910000, 0x20180410, 0x02186000]
  , 0x0,81.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat124,4,8, "D602",-1,0,1,2,2,2,0x2,648,
  [ 0x00f0fcfc, 0xf0f0c000, 0xfc3c0000, 0x0f3f3f00, 0xc0f0f000, 0xfcf00000, 0x3f3f0f00, 0x003cfcfc],
  [ 0x00100414, 0x00104000, 0x40100000, 0x05110000, 0x40100000, 0x04100000, 0x00110500, 0x00104050]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat124,0,1.600000],
[owl_defendpat125,3,8, "D603",-1,0,1,2,2,2,0x2,648,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00180410, 0x00106000, 0x40900000, 0x24110000, 0x60100000, 0x04180000, 0x00112400, 0x00904010]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat125,0,1.960000],
[owl_defendpat126,3,8, "D604",0,-1,1,2,1,3,0x2,722,
  [ 0x00bf3d00, 0x20f0f070, 0xf0f80000, 0x3c3c2000, 0xf0f02000, 0x3dbf0000, 0x203c3c34, 0x00f8f000],
  [ 0x00160000, 0x00101020, 0x00500000, 0x10100000, 0x10100000, 0x00160000, 0x00101020, 0x00500000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat126,0,0.970000],
[owl_defendpat127,5,8, "D604a",0,-2,1,3,1,5,0x2,759,
  [ 0x00ffff00, 0xf0f0f0f0, 0xffff0000, 0x3c3c3c3c, 0xf0f0f0f0, 0xffff0000, 0x3c3c3c3c, 0x00ffff00],
  [ 0x00558000, 0x90101010, 0x0a550000, 0x10101818, 0x10109090, 0x80550000, 0x18101010, 0x00550a00]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat127,0,1.000000],
[owl_defendpat128,6,8, "D605",0,-1,2,2,2,3,0x2,648,
  [ 0x00b8fcfc, 0xe0f0e000, 0xffb80000, 0x2f3f2f0f, 0xe0f0e0c0, 0xfcb80000, 0x2f3f2f00, 0x00b8ffff],
  [ 0x00100418, 0x00104000, 0x41100000, 0x06110004, 0x40100040, 0x04100000, 0x00110600, 0x00104190]
  , 0x0,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat129,3,8, "D606",-1,0,1,2,2,2,0x2,648,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00180418, 0x00106000, 0x40900000, 0x26110000, 0x60100000, 0x04180000, 0x00112600, 0x00904090]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat129,0,0.019600],
[owl_defendpat130,2,8, "D607",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00648800, 0x90209000, 0x88640000, 0x18201800, 0x90209000, 0x88640000, 0x18201800, 0x00648800]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat130,3,0.019600],
[owl_defendpat131,3,8, "D608",0,-1,1,2,1,3,0x2,722,
  [ 0x00bfff00, 0xe0f0f0f0, 0xfcf80000, 0x3c3c2c00, 0xf0f0e000, 0xffbf0000, 0x2c3c3c3c, 0x00f8fc00],
  [ 0x00162000, 0x00901020, 0x20500000, 0x10180000, 0x10900000, 0x20160000, 0x00181020, 0x00502000]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat131,0,1.000000],
[owl_defendpat132,3,8, "D608b",0,-2,1,2,1,4,0x2,721,
  [ 0x2c3c3c3c, 0x00faff00, 0xf0f0e0e0, 0xffbf0000, 0xfffa0000, 0x3c3c2c2c, 0x00bfff00, 0xe0f0f0f0],
  [ 0x08100020, 0x00100800, 0x00108000, 0x80120000, 0x08100000, 0x00100800, 0x00128000, 0x80100020]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat132,0,0.610000],
[owl_defendpat133,2,8, "D609",-1,0,1,2,2,2,0x2,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00108010, 0x80100000, 0x08100000, 0x00110800, 0x00108000, 0x80100000, 0x08110000, 0x00100810]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat134,7,8, "D610",-1,-2,1,2,2,4,0x2,611,
  [ 0x2fffff00, 0xf0f8fcfc, 0xfffee000, 0xfcbc3c2c, 0xfcf8f0e0, 0xffff2f00, 0x3cbcfcfc, 0xe0feff00],
  [ 0x0651a400, 0x90904418, 0x68144000, 0x44181800, 0x44909000, 0xa4510600, 0x18184490, 0x40146800]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_defendpat134,0,0.050000],
[owl_defendpat135,5,8, "D611",-1,-1,1,2,2,3,0x2,722,
  [ 0x7cfcfcbc, 0xf4fcfc00, 0xfcfcf400, 0xffff7e00, 0xfcfcf400, 0xfcfc7c00, 0x7effff00, 0xf4fcfcf8],
  [ 0x20944018, 0x60181000, 0x04582000, 0x12912400, 0x10186000, 0x40942000, 0x24911200, 0x20580490]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat135,0,0.010000],
[owl_defendpat136,7,8, "D612",-1,-2,1,2,2,4,0x2,685,
  [ 0xfcffff00, 0xfcfcfcf0, 0xfffffc00, 0xfcfcfc3c, 0xfcfcfcf0, 0xfffffc00, 0xfcfcfc3c, 0xfcffff00],
  [ 0x54210100, 0x04240450, 0x01215400, 0x40604014, 0x04240450, 0x01215400, 0x40604014, 0x54210100]
  , 0x0,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat137,7,8, "D613",0,-2,2,2,2,4,0x2,721,
  [ 0x3f3f3f0f, 0x00fcffff, 0xf0f0f0c0, 0xfffc0000, 0xfffc0000, 0x3f3f3f0f, 0x00fcffff, 0xf0f0f0c0],
  [ 0x10121005, 0x00540121, 0x10101040, 0x01540000, 0x01540000, 0x10121005, 0x00540121, 0x10101040]
  , 0x0,50.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat138,5,8, "D614",0,-1,2,1,2,2,0x2,648,
  [ 0x00b8fcfc, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0x00b8fcfc],
  [ 0x00100498, 0x00104000, 0x40100000, 0x06110200, 0x40100000, 0x04100000, 0x02110600, 0x00104098]
  , 0x0,30.000000,attributes[0],1,null,autohelperowl_defendpat138,0,1.000000],
[owl_defendpat139,8,8, "D614b",0,-2,2,2,2,4,0x2,649,
  [ 0x00beffff, 0xe0f0f0e0, 0xfefa0000, 0x3f3f2f2b, 0xf0f0e0a0, 0xffbe0000, 0x2f3f3f2f, 0x00fafeff],
  [ 0x00140126, 0x00101040, 0x00500000, 0x11120000, 0x10100000, 0x01140000, 0x00121106, 0x00500060]
  , 0x0,31.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat140,5,8, "D615",-1,-2,1,1,2,3,0x2,721,
  [ 0x0cbcfcfc, 0xe0f0fc00, 0xfcf8c000, 0xff3f2f00, 0xfcf0e000, 0xfcbc0c00, 0x2f3fff00, 0xc0f8fcfc],
  [ 0x00104094, 0x40100000, 0x04100000, 0x01110600, 0x00104000, 0x40100000, 0x06110100, 0x00100458]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat140,0,0.610000],
[owl_defendpat141,6,8, "D616",-1,-2,1,2,2,4,0x2,757,
  [ 0xbfff3e00, 0x38fcfcbc, 0xf0fcfb00, 0xfcfcb0c0, 0xfcfc380c, 0x3effbf00, 0xb0fcfcf8, 0xfbfcf000],
  [ 0x04912400, 0x20904410, 0x60184200, 0x44182080, 0x44902008, 0x24910400, 0x20184410, 0x42186000]
  , 0x0,25.000000,attributes[0],1,null,autohelperowl_defendpat141,0,0.050000],
[owl_defendpat142,6,8, "D616a",-1,-2,1,4,2,6,0x2,685,
  [ 0x2fffff00, 0xf0f8fcfc, 0xfffce000, 0xfcbc3c0c, 0xfcf8f0c0, 0xffff2f00, 0x3cbcfcfc, 0xe0fcff00],
  [ 0x06118400, 0x80104418, 0x48104000, 0x44100800, 0x44108000, 0x84110600, 0x08104490, 0x40104800]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_defendpat142,0,0.050000],
[owl_defendpat143,7,8, "D617",-1,-3,1,2,2,5,0x2,795,
  [ 0xbfff3e00, 0x38fcfcbc, 0xf0fcfb00, 0xfcfcb0c0, 0xfcfc380c, 0x3effbf00, 0xb0fcfcf8, 0xfbfcf000],
  [ 0x06912400, 0x20904418, 0x60184200, 0x44182080, 0x44902008, 0x24910600, 0x20184490, 0x42186000]
  , 0x0,25.000000,attributes[0],1,null,autohelperowl_defendpat143,0,0.010000],
[owl_defendpat144,5,8, "D618",-1,-2,1,2,2,4,0x2,646,
  [ 0xffff3e00, 0x3cfcfcbc, 0xf0fcff00, 0xfcfcf0c0, 0xfcfc3c0c, 0x3effff00, 0xf0fcfcf8, 0xfffcf000],
  [ 0x26912400, 0x20984418, 0x60186200, 0x44982080, 0x44982008, 0x24912600, 0x20984490, 0x62186000]
  , 0x0,25.000000,attributes[0],1,null,autohelperowl_defendpat144,0,0.010000],
[owl_defendpat145,4,8, "D619",-1,-1,1,1,2,2,0x2,647,
  [ 0xfcfcf800, 0xfcfcbc00, 0xbcfcfc00, 0xf8fcfc00, 0xbcfcfc00, 0xf8fcfc00, 0xfcfcf800, 0xfcfcbc00],
  [ 0x90249000, 0x88641000, 0x18601800, 0x10648800, 0x10648800, 0x90249000, 0x88641000, 0x18601800]
  , 0x0,39.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat146,6,8, "D620",-1,-2,1,1,2,3,0x2,647,
  [ 0x2fffff00, 0xf0f8fcfc, 0xfcfce000, 0xfcbc3c00, 0xfcf8f000, 0xffff2f00, 0x3cbcfcfc, 0xe0fcfc00],
  [ 0x06118500, 0x80104458, 0x48104000, 0x44100800, 0x44108000, 0x85110600, 0x08104494, 0x40104800]
  , 0x0,72.000000,attributes[0],1,null,autohelperowl_defendpat146,0,0.016000],
[owl_defendpat147,6,8, "D621",-2,-1,1,2,3,3,0x2,721,
  [ 0xfcbffc00, 0xecfffc30, 0xfcf8fc30, 0xfcfcec00, 0xfcffec00, 0xfcbffc30, 0xecfcfc30, 0xfcf8fc00],
  [ 0x44124000, 0x44110420, 0x04104410, 0x40104400, 0x04114400, 0x40124410, 0x44104020, 0x44100400]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat148,4,8, "D622",-1,-1,1,2,2,3,0x2,646,
  [ 0xfcfeff00, 0xfcfcfce0, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfffefc00, 0xfcfcfc2c, 0xfcfcfc00],
  [ 0x18640000, 0x10241800, 0x00649000, 0x90601000, 0x18241000, 0x00641800, 0x10609000, 0x90640000]
  , 0x20,45.000000,attributes[0],1,null,autohelperowl_defendpat148,3,1.600000],
[owl_defendpat149,4,8, "D623",-1,-2,1,3,2,5,0x2,758,
  [ 0xdfffdf00, 0xfc74fcfc, 0xdffcdc00, 0xfc74fc0c, 0xfc74fcc0, 0xdfffdf00, 0xfc74fcfc, 0xdcfcdf00],
  [ 0x85900400, 0x28104404, 0x40184800, 0x4410a000, 0x44102800, 0x04908500, 0xa0104440, 0x48184000]
  , 0x10,95.000000,attributes[0],1,null,autohelperowl_defendpat149,0,0.016000],
[owl_defendpat150,4,8, "D624",-1,-2,1,1,2,3,0x2,685,
  [ 0x0fff3600, 0x30f07cbc, 0x70fcc000, 0xf43c3000, 0x7cf03000, 0x36ff0f00, 0x303cf4f8, 0xc0fc7000],
  [ 0x01910000, 0x20100014, 0x00180000, 0x00102000, 0x00102000, 0x00910100, 0x20100050, 0x00180000]
  , 0x0,40.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat151,3,8, "D625",-1,-1,0,1,1,2,0x2,683,
  [ 0xbcfc0000, 0x383c3c00, 0x00fcf800, 0xf0f0b000, 0x3c3c3800, 0x00fcbc00, 0xb0f0f000, 0xf8fc0000],
  [ 0x04180000, 0x00102400, 0x00904000, 0x60100000, 0x24100000, 0x00180400, 0x00106000, 0x40900000]
  , 0x20,45.000000,attributes[0],1,null,autohelperowl_defendpat151,0,0.016000],
[owl_defendpat152,2,8, "D626",0,-1,1,2,1,3,0x6,648,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00580200, 0x10102080, 0x00940000, 0x20101000, 0x20101000, 0x02580000, 0x10102008, 0x00940000]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat153,4,8, "D627",-1,0,2,2,3,2,0x8,723,
  [ 0x3f3f3f3f, 0x00fcfcfc, 0xf0f0f000, 0xffff0000, 0xfcfc0000, 0x3f3f3f00, 0x00ffffff, 0xf0f0f0f0],
  [ 0x06110120, 0x00100458, 0x00104000, 0x40120000, 0x04100000, 0x01110600, 0x00124094, 0x40100020]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_defendpat153,0,1.600000],
[owl_defendpat154,3,8, "D628",0,0,2,1,2,1,0x8,722,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00140010, 0x00101000, 0x00500000, 0x10110000, 0x10100000, 0x00140000, 0x00111000, 0x00500010]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat154,0,1.600000],
[owl_defendpat155,5,8, "D629",-1,-1,4,1,5,2,0x8,722,
  [ 0x34fcfcfc, 0xf0fcf400, 0xfcfc7000, 0x7fff3f00, 0xf4fcf000, 0xfcfc3400, 0x3fff7f00, 0x70fcfcfc],
  [ 0x20504040, 0x50180000, 0x04142000, 0x00901500, 0x00185000, 0x40502000, 0x15900000, 0x20140404]
  , 0x10,65.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat156,2,8, "D630",-1,-1,1,1,2,2,0x2,685,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00600400, 0x10204000, 0x40240000, 0x04201000, 0x40201000, 0x04600000, 0x10200400, 0x00244000]
  , 0x800,65.000000,attributes[0],1,null,autohelperowl_defendpat156,3,1.600000],
[owl_defendpat157,5,8, "D631",-1,-1,1,2,2,3,0x2,721,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc],
  [ 0x40606440, 0x54a04000, 0x64240400, 0x04285500, 0x40a05400, 0x64604000, 0x55280400, 0x04246404]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_defendpat157,3,1.960000],
[owl_defendpat158,5,8, "D632",-1,-1,1,2,2,3,0x2,759,
  [ 0xfcffff00, 0xfcfcfcf0, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc3c, 0xfcfcfc00],
  [ 0x58666000, 0x54a41820, 0x24649400, 0x90685400, 0x18a45400, 0x60665800, 0x54689020, 0x94642400]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat158,3,1.000000],
[owl_defendpat159,7,8, "D633",-1,-3,1,1,2,4,0x2,722,
  [ 0x3cfcbcfc, 0xb0fcfc00, 0xf8fcf000, 0xffff3b00, 0xfcfcb000, 0xbcfc3c00, 0x3bffff00, 0xf0fcf8fc],
  [ 0x10500040, 0x10140000, 0x00141000, 0x00501100, 0x00141000, 0x00501000, 0x11500000, 0x10140004]
  , 0x0,65.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat160,1,8, "D634",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00680000, 0x10202000, 0x00a40000, 0x20201000, 0x20201000, 0x00680000, 0x10202000, 0x00a40000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat160,3,0.610000],
[owl_defendpat161,6,8, "D635",0,-1,3,2,3,3,0x2,686,
  [ 0x00f0fcfc, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0f, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f00, 0x003cffff],
  [ 0x00500404, 0x10104000, 0x41140000, 0x05101005, 0x40101040, 0x04500000, 0x10100500, 0x00144141]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat161,0,1.000000],
[owl_defendpat162,3,8, "D636",0,-2,1,2,1,4,0x2,648,
  [ 0x00ffff00, 0xf0f0f0f0, 0xffff0000, 0x3c3c3c3c, 0xf0f0f0f0, 0xffff0000, 0x3c3c3c3c, 0x00ffff00],
  [ 0x00150000, 0x00101010, 0x00520000, 0x10100020, 0x10100020, 0x00150000, 0x00101010, 0x00520000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat162,0,1.000000],
[owl_defendpat163,2,8, "D637",-1,-1,0,1,1,2,0x0,685,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00180400, 0x00106000, 0x40900000, 0x24100000, 0x60100000, 0x04180000, 0x00102400, 0x00904000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat163,0,0.019600],
[owl_defendpat164,5,8, "D638",-1,-1,1,2,2,3,0x2,610,
  [ 0xe0f8fc00, 0xfcf8e000, 0xffbf2d00, 0x2cbcfc7c, 0xe0f8fcf4, 0xfcf8e000, 0xfcbc2c00, 0x2dbfff00],
  [ 0x00904400, 0x60104000, 0x44180000, 0x04102400, 0x40106000, 0x44900000, 0x24100400, 0x00184400]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat165,2,8, "D639",0,-1,1,2,1,3,0x2,721,
  [ 0x00bfff00, 0xe0f0f0f0, 0xfcf80000, 0x3c3c2c00, 0xf0f0e000, 0xffbf0000, 0x2c3c3c3c, 0x00f8fc00],
  [ 0x0012a000, 0x80900020, 0x28100000, 0x00180800, 0x00908000, 0xa0120000, 0x08180020, 0x00102800]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat165,0,1.000000],
[owl_defendpat166,3,8, "D640",0,-1,1,3,1,4,0x2,647,
  [ 0x00f0fc00, 0xf0f0c000, 0xff3f0000, 0x0c3c3c3c, 0xc0f0f0f0, 0xfcf00000, 0x3c3c0c00, 0x003fff00],
  [ 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x40100000, 0x04100000, 0x00100400, 0x00104000]
  , 0x0,56.000000,attributes[0],1,null,autohelperowl_defendpat166,0,0.610000],
[owl_defendpat167,3,8, "D641",-1,-2,1,2,2,4,0x2,721,
  [ 0xffffff00, 0xfcfcfcfc, 0xfffffd00, 0xfcfcfc7c, 0xfcfcfcf4, 0xffffff00, 0xfcfcfcfc, 0xfdffff00],
  [ 0x94210000, 0x08240410, 0x00205800, 0x40608000, 0x04240800, 0x00219400, 0x80604010, 0x58200000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat167,3,0.016000],
[owl_defendpat168,2,8, "D642",0,-2,1,1,1,3,0x2,721,
  [ 0x003fbc00, 0x80f0f030, 0xf8f00000, 0x3c3c0800, 0xf0f08000, 0xbc3f0000, 0x083c3c30, 0x00f0f800],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat168,0,0.970000],
[owl_defendpat169,5,8, "D643",-1,-1,1,1,2,2,0x2,722,
  [ 0x38bcfc00, 0xe0fcf800, 0xfcf8b000, 0xbcfc2c00, 0xf8fce000, 0xfcbc3800, 0x2cfcbc00, 0xb0f8fc00],
  [ 0x10104000, 0x40140000, 0x04101000, 0x00500400, 0x00144000, 0x40101000, 0x04500000, 0x10100400]
  , 0x0,40.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat170,5,8, "D643b",-1,-1,1,2,2,3,0x2,722,
  [ 0x0fffbf00, 0xb0f0fcfc, 0xf8fcc000, 0xfc3c3800, 0xfcf0b000, 0xbfff0f00, 0x383cfcfc, 0xc0fcf800],
  [ 0x05500000, 0x10100404, 0x00144000, 0x40101000, 0x04101000, 0x00500500, 0x10104040, 0x40140000]
  , 0x0,40.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat171,6,8, "D644",0,-1,2,2,2,3,0x2,685,
  [ 0x00beffff, 0xe0f0f0e0, 0xfcf80000, 0x3f3f2f00, 0xf0f0e000, 0xffbe0000, 0x2f3f3f2f, 0x00f8fcfc],
  [ 0x00140181, 0x00101040, 0x00500000, 0x10100200, 0x10100000, 0x01140000, 0x02101005, 0x00500008]
  , 0x0,30.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat172,2,8, "D645",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00580000, 0x10102000, 0x00940000, 0x20101000, 0x20101000, 0x00580000, 0x10102000, 0x00940000]
  , 0x0,96.000000,attributes[0],1,null,autohelperowl_defendpat172,0,0.613600],
[owl_defendpat173,5,4, "D700",-1,0,1,2,2,2,0x0,648,
  [ 0x00f8fcf8, 0xf0f0e000, 0xfcbc0000, 0x2e3f3f00, 0xe0f0f000, 0xfcf80000, 0x3f3f2e00, 0x00bcfcbc],
  [ 0x00100410, 0x00104000, 0x40100000, 0x04110000, 0x40100000, 0x04100000, 0x00110400, 0x00104010]
  , 0x0,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat174,3,8, "D701",-1,0,1,2,2,2,0x0,648,
  [ 0x0030fc3c, 0xc0f0c000, 0xfc300000, 0x0f3f0c00, 0xc0f0c000, 0xfc300000, 0x0c3f0f00, 0x0030fcf0],
  [ 0x00100410, 0x00104000, 0x40100000, 0x04110000, 0x40100000, 0x04100000, 0x00110400, 0x00104010]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat174,0,0.016000],
[owl_defendpat175,3,8, "D702",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00108410, 0x80104000, 0x48100000, 0x04110800, 0x40108000, 0x84100000, 0x08110400, 0x00104810]
  , 0x20,70.000000,attributes[0],1,null,autohelperowl_defendpat175,0,0.019600],
[owl_defendpat176,4,8, "D703",0,-1,2,1,2,2,0x0,721,
  [ 0x003cbc20, 0x80f0f000, 0xf8f00000, 0x3c3e0800, 0xf0f08000, 0xbc3c0000, 0x083e3c00, 0x00f0f820],
  [ 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x40100000, 0x04100000, 0x00100400, 0x00104000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat176,0,0.610000],
[owl_defendpat177,4,8, "D704",-1,0,1,2,2,2,0x0,686,
  [ 0x0038bc3c, 0x80f0e000, 0xf8b00000, 0x2f3f0800, 0xe0f08000, 0xbc380000, 0x083f2f00, 0x00b0f8f0],
  [ 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x40100000, 0x04100000, 0x00100400, 0x00104000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat177,0,1.186000],
[owl_defendpat178,3,8, "D704b",0,-1,1,2,1,3,0x2,648,
  [ 0x00f8fc00, 0xf0f0e000, 0xfcbc0000, 0x2c3c3c00, 0xe0f0f000, 0xfcf80000, 0x3c3c2c00, 0x00bcfc00],
  [ 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x40100000, 0x04100000, 0x00100400, 0x00104000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat178,0,2.091760],
[owl_defendpat179,2,8, "D705",0,0,1,2,1,2,0x2,722,
  [ 0x003f3e00, 0x00f0f0b0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3e3f0000, 0x003c3c38, 0x00f0f000],
  [ 0x00122000, 0x00900020, 0x20100000, 0x00180000, 0x00900000, 0x20120000, 0x00180020, 0x00102000]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_defendpat179,0,1.000000],
[owl_defendpat180,4,8, "D706",0,-1,2,1,2,2,0x0,721,
  [ 0x003cbc20, 0x80f0f000, 0xf8f00000, 0x3c3e0800, 0xf0f08000, 0xbc3c0000, 0x083e3c00, 0x00f0f820],
  [ 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x40100000, 0x04100000, 0x00100400, 0x00104000]
  , 0x20,35.000000,attributes[0],1,null,autohelperowl_defendpat180,0,0.016000],
[owl_defendpat181,6,8, "D707",-1,0,2,2,3,2,0x0,721,
  [ 0x3c3f3f22, 0x00fcfcf0, 0xf0f0f000, 0xfcfe0000, 0xfcfc0000, 0x3f3f3c00, 0x00fefc3e, 0xf0f0f020],
  [ 0x28111100, 0x00580850, 0x1010a000, 0x80940000, 0x08580000, 0x11112800, 0x00948014, 0xa0101000]
  , 0x0,77.000000,attributes[0],1,null,autohelperowl_defendpat181,0,1.000000],
[owl_defendpat182,8,8, "D708",-2,-2,2,1,4,3,0x0,722,
  [ 0x80bcff3c, 0xe8f0f0c0, 0xfcfb0a00, 0x3f3facb0, 0xf0f0e838, 0xffbc8000, 0xac3f3f0c, 0x0afbfcf0],
  [ 0x00140214, 0x00101080, 0x00510000, 0x11110010, 0x10100010, 0x02140000, 0x00111108, 0x00510050]
  , 0x0,77.000000,attributes[0],1,null,autohelperowl_defendpat182,0,1.000000],
[owl_defendpat183,5,8, "D709",-1,-1,1,2,2,3,0x0,685,
  [ 0x38fcfc74, 0xf0fcf800, 0xfcfcb000, 0xbdff3d00, 0xf8fcf000, 0xfcfc3800, 0x3dffbd00, 0xb0fcfc74],
  [ 0x00644400, 0x50205000, 0x44640000, 0x14201400, 0x50205000, 0x44640000, 0x14201400, 0x00644400]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat183,3,0.650000],
[owl_defendpat184,5,8, "D710",-1,0,1,2,2,2,0x0,723,
  [ 0x003cfcfc, 0xc0f0f000, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xfc3c0000, 0x0f3f3f00, 0x00f0fcfc],
  [ 0x00144440, 0x40105000, 0x44500000, 0x14100500, 0x50104000, 0x44140000, 0x05101400, 0x00504404]
  , 0x0,30.000000,attributes[0],1,null,autohelperowl_defendpat184,0,0.016000],
[owl_defendpat185,1,8, "D711",0,0,1,1,1,1,0x0,722,
  [ 0x00303c00, 0x00f0c000, 0xf0300000, 0x0c3c0000, 0xc0f00000, 0x3c300000, 0x003c0c00, 0x0030f000],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x0,25.000000,attributes[0],1,null,autohelperowl_defendpat185,0,0.016000],
[owl_defendpat186,1,8, "D712",-1,0,0,1,1,1,0x0,685,
  [ 0x00303c00, 0x00f0c000, 0xf0300000, 0x0c3c0000, 0xc0f00000, 0x3c300000, 0x003c0c00, 0x0030f000],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x0,25.000000,attributes[0],1,null,autohelperowl_defendpat186,3,0.016000],
[owl_defendpat187,5,4, "D713",0,-1,2,2,2,3,0x0,648,
  [ 0x00fcfffc, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfffc0000, 0x3f3f3f0c, 0x00fcfcfc],
  [ 0x00140114, 0x00101040, 0x00500000, 0x11110000, 0x10100000, 0x01140000, 0x00111104, 0x00500050]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat187,0,0.010000],
[owl_defendpat188,5,8, "D714",0,-1,2,2,2,3,0x0,647,
  [ 0x00f0fcfc, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0c, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f00, 0x003cfffc],
  [ 0x00100450, 0x00104000, 0x41100000, 0x04110104, 0x40100040, 0x04100000, 0x01110400, 0x00104114]
  , 0x20,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat189,1,4, "D715",0,0,0,1,0,1,0x0,685,
  [ 0x00303000, 0x00f00000, 0x30300000, 0x003c0000, 0x00f00000, 0x30300000, 0x003c0000, 0x00303000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat189,0,0.043600],
[owl_defendpat190,2,8, "D715b",-1,-1,0,1,1,2,0x2,646,
  [ 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0xfcfc0000],
  [ 0x04180000, 0x00102400, 0x00904000, 0x60100000, 0x24100000, 0x00180400, 0x00106000, 0x40900000]
  , 0x0,36.000000,attributes[0],1,null,autohelperowl_defendpat190,0,0.416000],
[owl_defendpat191,4,8, "D715c",-1,0,1,2,2,2,0x0,649,
  [ 0x00fcfcf8, 0xf0f0f000, 0xfcfc0000, 0x3e3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3e00, 0x00fcfcbc],
  [ 0x00188410, 0x80106000, 0x48900000, 0x24110800, 0x60108000, 0x84180000, 0x08112400, 0x00904810]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat191,0,0.019600],
[owl_defendpat192,6,8, "D716",-1,0,1,3,2,3,0x0,648,
  [ 0x0030f8fc, 0xc0f08000, 0xbc300000, 0x0b3f0f00, 0x80f0c000, 0xf8300000, 0x0f3f0b00, 0x0030bcfc],
  [ 0x00100044, 0x00100000, 0x00100000, 0x01100100, 0x00100000, 0x00100000, 0x01100100, 0x00100044]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat192,0,0.016000],
[owl_defendpat193,5,8, "D717",-1,-1,1,2,2,3,0x0,648,
  [ 0xf8fcfc54, 0xfcfcf800, 0xfcfcbc00, 0xbdfdfd00, 0xf8fcfc00, 0xfcfcf800, 0xfdfdbd00, 0xbcfcfc54],
  [ 0x50241800, 0x04649000, 0x90601400, 0x18644000, 0x90640400, 0x18245000, 0x40641800, 0x14609000]
  , 0x0,81.000000,attributes[0],1,null,autohelperowl_defendpat193,3,1.000000],
[owl_defendpat194,4,8, "D718",-1,0,2,2,3,2,0x0,685,
  [ 0x003fff3f, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xff3f0000, 0x0c3f3f3f, 0x00f0fcf0],
  [ 0x00118110, 0x80100050, 0x08100000, 0x00110800, 0x00108000, 0x81110000, 0x08110014, 0x00100810]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat195,4,8, "D720",0,-1,1,2,1,3,0x0,648,
  [ 0x00f0fc00, 0xf0f0c000, 0xfe3e0000, 0x0c3c3c28, 0xc0f0f0a0, 0xfcf00000, 0x3c3c0c00, 0x003efe00],
  [ 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x40100000, 0x04100000, 0x00100400, 0x00104000]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_defendpat195,0,0.010000],
[owl_defendpat196,6,8, "D721",-1,-2,1,0,2,2,0x0,722,
  [ 0x00fcbcec, 0xb0f0f000, 0xf8fc0000, 0x3f3e3b00, 0xf0f0b000, 0xbcfc0000, 0x3b3e3f00, 0x00fcf8ec],
  [ 0x00580044, 0x10102000, 0x00940000, 0x21101100, 0x20101000, 0x00580000, 0x11102100, 0x00940044]
  , 0x0,55.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat197,4,8, "D722",-1,-2,1,1,2,3,0x0,721,
  [ 0x0c3cfc30, 0xc0f0fc00, 0xfcf0c000, 0xfc3f0c00, 0xfcf0c000, 0xfc3c0c00, 0x0c3ffc00, 0xc0f0fc30],
  [ 0x08104410, 0x40104800, 0x44108000, 0x84110400, 0x48104000, 0x44100800, 0x04118400, 0x80104410]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat197,0,0.610000],
[owl_defendpat198,6,8, "D723",-3,-1,0,2,3,3,0x0,682,
  [ 0xffbf0000, 0x2f3f3f3f, 0x00f8fcfc, 0xf0f0e000, 0x3f3f2f00, 0x00bfffff, 0xe0f0f0f0, 0xfcf80000],
  [ 0x01160000, 0x00101025, 0x00500000, 0x10100000, 0x10100000, 0x00160101, 0x00101060, 0x00500000]
  , 0x0,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat199,1,8, "D800",0,0,3,3,3,3,0x6,722,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat200,1,8, "D801",0,-1,1,1,1,2,0x6,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00900000, 0x20100000, 0x00180000, 0x00102000, 0x00102000, 0x00900000, 0x20100000, 0x00180000]
  , 0x0,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat201,2,8, "D802",0,0,1,2,1,2,0x6,722,
  [ 0x003b3f00, 0x00f0e0f0, 0xf0b00000, 0x2c3c0000, 0xe0f00000, 0x3f3b0000, 0x003c2c3c, 0x00b0f000],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x0,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat202,1,8, "D803",0,-1,1,1,1,2,0x6,721,
  [ 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000],
  [ 0x08100000, 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x00100800, 0x00108000, 0x80100000]
  , 0x0,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat203,3,8, "D804",0,-1,1,1,1,2,0x6,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00540000, 0x10101000, 0x00540000, 0x10101000, 0x10101000, 0x00540000, 0x10101000, 0x00540000]
  , 0x0,25.000000,attributes[0],1,null,autohelperowl_defendpat203,0,0.010000],
[owl_defendpat204,2,8, "D804a",0,-1,1,1,1,2,0xa,685,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00500800, 0x10108000, 0x80140000, 0x08101000, 0x80101000, 0x08500000, 0x10100800, 0x00148000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat204,0,0.010000],
[owl_defendpat205,3,8, "D804b",0,-1,1,2,1,3,0x6,685,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00958000, 0xa0101010, 0x08580000, 0x10102800, 0x1010a000, 0x80950000, 0x28101010, 0x00580800]
  , 0x0,26.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat206,5,8, "D805",0,-1,2,2,2,3,0xa,686,
  [ 0x00bcfffe, 0xe0f0f0c0, 0xfcf80000, 0x3f3f2f00, 0xf0f0e000, 0xffbc0000, 0x2f3f3f0e, 0x00f8fcfc],
  [ 0x00140100, 0x00101040, 0x00500000, 0x10100000, 0x10100000, 0x01140000, 0x00101004, 0x00500000]
  , 0x0,98.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat207,6,8, "D805a",0,-1,2,2,2,3,0xa,758,
  [ 0x2f3f3f2a, 0x00f8fcfc, 0xf0f0e000, 0xfebe0000, 0xfcf80000, 0x3f3f2f00, 0x00befefe, 0xe0f0f0a0],
  [ 0x00101000, 0x00500000, 0x10100000, 0x00140000, 0x00500000, 0x10100000, 0x00140000, 0x00101000]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat208,4,8, "D805b",0,-1,2,2,2,3,0xa,685,
  [ 0x00f8fcfc, 0xf0f0e000, 0xffbc0000, 0x2f3f3f0e, 0xe0f0f0c0, 0xfcf80000, 0x3f3f2f00, 0x00bcfffe],
  [ 0x00100000, 0x00100000, 0x01100000, 0x00100004, 0x00100040, 0x00100000, 0x00100000, 0x00100100]
  , 0x0,30.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat209,2,8, "D806",0,-1,1,2,1,3,0xa,685,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00250000, 0x00201010, 0x00600000, 0x10200000, 0x10200000, 0x00250000, 0x00201010, 0x00600000]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat209,3,1.600000],
[owl_defendpat210,2,8, "D807",0,-1,1,2,1,3,0xa,685,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00250000, 0x00201010, 0x00600000, 0x10200000, 0x10200000, 0x00250000, 0x00201010, 0x00600000]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat210,3,1.600000],
[owl_defendpat211,3,8, "D808",0,-1,1,2,1,3,0xa,685,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00250100, 0x00201050, 0x00600000, 0x10200000, 0x10200000, 0x01250000, 0x00201014, 0x00600000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat211,3,1.000000],
[owl_defendpat212,3,8, "D809",0,-1,1,2,1,3,0xa,685,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00250100, 0x00201050, 0x00600000, 0x10200000, 0x10200000, 0x01250000, 0x00201014, 0x00600000]
  , 0x0,25.000000,attributes[0],1,null,autohelperowl_defendpat212,3,1.000000],
[owl_defendpat213,3,8, "D810",0,-2,1,2,1,4,0xa,722,
  [ 0x00bfff00, 0xe0f0f0f0, 0xfffa0000, 0x3c3c2c2c, 0xf0f0e0e0, 0xffbf0000, 0x2c3c3c3c, 0x00faff00],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_defendpat213,0,1.000000],
[owl_defendpat214,6,8, "D811",-1,-2,1,1,2,3,0xa,722,
  [ 0x3abeff00, 0xe0fcf8e8, 0xfcf8b000, 0xbcfc2c00, 0xf8fce000, 0xffbe3a00, 0x2cfcbcac, 0xb0f8fc00],
  [ 0x10100000, 0x00140000, 0x00101000, 0x00500000, 0x00140000, 0x00101000, 0x00500000, 0x10100000]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat215,4,8, "D811a",-1,-2,1,1,2,3,0xa,722,
  [ 0x003cfcac, 0xc0f0f000, 0xfcf00000, 0x3f3e0e00, 0xf0f0c000, 0xfc3c0000, 0x0e3e3f00, 0x00f0fce8],
  [ 0x00104000, 0x40100000, 0x04100000, 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x00100400]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat216,4,8, "D812",-1,-1,1,1,2,2,0xa,648,
  [ 0xa0fcfc00, 0xf8f8f000, 0xfcfc2800, 0x3cbcbc00, 0xf0f8f800, 0xfcfca000, 0xbcbc3c00, 0x28fcfc00],
  [ 0x00182400, 0x00906000, 0x60900000, 0x24180000, 0x60900000, 0x24180000, 0x00182400, 0x00906000]
  , 0x0,70.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat217,1,8, "D813",0,-1,1,1,1,2,0xa,685,
  [ 0x00fc3c00, 0x30f0f000, 0xf0fc0000, 0x3c3c3000, 0xf0f03000, 0x3cfc0000, 0x303c3c00, 0x00fcf000],
  [ 0x00900000, 0x20100000, 0x00180000, 0x00102000, 0x00102000, 0x00900000, 0x20100000, 0x00180000]
  , 0x0,30.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat218,5,8, "D814",-1,-1,3,1,4,2,0xa,686,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x10504040, 0x50140000, 0x04141000, 0x00501500, 0x00145000, 0x40501000, 0x15500000, 0x10140404]
  , 0x0,85.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat219,5,8, "D815",-1,-2,2,1,3,3,0xa,759,
  [ 0x3f3fffff, 0xc0fcfcfc, 0xfcf0f000, 0xffff0f00, 0xfcfcc000, 0xff3f3f00, 0x0fffffff, 0xf0f0fcfc],
  [ 0x14105000, 0x40540400, 0x14105000, 0x40540400, 0x04544000, 0x50101400, 0x04544000, 0x50101400]
  , 0x0,85.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat220,3,8, "D816",-1,0,2,2,3,2,0xa,721,
  [ 0xffff0000, 0x3f3f3f3f, 0x00fcfcfc, 0xf0f0f000, 0x3f3f3f00, 0x00ffffff, 0xf0f0f0f0, 0xfcfc0000],
  [ 0x40200000, 0x06210100, 0x00200458, 0x00204000, 0x01210600, 0x00204094, 0x40200000, 0x04200000]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat221,3,8, "D817",-1,0,2,2,3,2,0xa,721,
  [ 0xffff0000, 0x3f3f3f3f, 0x00fcfcfc, 0xf0f0f000, 0x3f3f3f00, 0x00ffffff, 0xf0f0f0f0, 0xfcfc0000],
  [ 0x40200000, 0x06210100, 0x00200458, 0x00204000, 0x01210600, 0x00204094, 0x40200000, 0x04200000]
  , 0x10,45.000000,attributes[0],1,null,autohelperowl_defendpat221,3,1.600000],
[owl_defendpat222,3,8, "D818",-1,-1,1,1,2,2,0xa,648,
  [ 0xc0fcfc00, 0xfcf0f000, 0xfcfc0c00, 0x3c3cfc00, 0xf0f0fc00, 0xfcfcc000, 0xfc3c3c00, 0x0cfcfc00],
  [ 0x40142000, 0x04901000, 0x20500400, 0x10184000, 0x10900400, 0x20144000, 0x40181000, 0x04502000]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_defendpat222,0,1.000000],
[owl_defendpat223,3,8, "D818b",-1,-1,1,1,2,2,0xa,722,
  [ 0xc0fcfc00, 0xfcf0f000, 0xfcfc0c00, 0x3c3cfc00, 0xf0f0fc00, 0xfcfcc000, 0xfc3c3c00, 0x0cfcfc00],
  [ 0x40142000, 0x04901000, 0x20500400, 0x10184000, 0x10900400, 0x20144000, 0x40181000, 0x04502000]
  , 0x10,76.000000,attributes[0],1,null,autohelperowl_defendpat223,0,0.010000],
[owl_defendpat224,5,8, "D819",-1,-2,1,0,2,2,0xa,686,
  [ 0x00fcbcbc, 0xb0f0f000, 0xf8fc0000, 0x3f3f3a00, 0xf0f0b000, 0xbcfc0000, 0x3a3f3f00, 0x00fcf8f8],
  [ 0x00500400, 0x10104000, 0x40140000, 0x04101000, 0x40101000, 0x04500000, 0x10100400, 0x00144000]
  , 0x0,30.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat225,4,8, "D820",-1,-1,1,2,2,3,0xa,722,
  [ 0xa0fcff00, 0xf8f8f0c0, 0xfcfc2800, 0x3cbcbc00, 0xf0f8f800, 0xfffca000, 0xbcbc3c0c, 0x28fcfc00],
  [ 0x00186200, 0x40902080, 0x24900000, 0x20180400, 0x20904000, 0x62180000, 0x04182008, 0x00902400]
  , 0x10,40.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat226,4,8, "D820b",-1,-1,1,2,2,3,0xa,722,
  [ 0xbcfcff00, 0xf8fcfcc0, 0xfcfcf800, 0xfcfcbc00, 0xfcfcf800, 0xfffcbc00, 0xbcfcfc0c, 0xf8fcfc00],
  [ 0x24186200, 0x40982480, 0x24906000, 0x60980400, 0x24984000, 0x62182400, 0x04986008, 0x60902400]
  , 0x10,40.000000,attributes[0],1,null,autohelperowl_defendpat226,0,1.000000],
[owl_defendpat227,7,8, "D821",-1,-2,2,1,3,3,0xa,722,
  [ 0x0e3effaf, 0xc0f0fce8, 0xfcf0c000, 0xff3e0e00, 0xfcf0c000, 0xff3e0e00, 0x0e3effaf, 0xc0f0fce8],
  [ 0x04104000, 0x40100400, 0x04104000, 0x40100400, 0x04104000, 0x40100400, 0x04104000, 0x40100400]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat228,5,8, "D822",-1,-2,1,1,2,3,0xa,721,
  [ 0x3effff00, 0xf0fcfcf8, 0xfcfcf000, 0xfcfc3c00, 0xfcfcf000, 0xffff3e00, 0x3cfcfcbc, 0xf0fcfc00],
  [ 0x10518800, 0x90148010, 0x88141000, 0x08501800, 0x80149000, 0x88511000, 0x18500810, 0x10148800]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat228,0,0.010000],
[owl_defendpat229,7,8, "D823a",-2,-1,1,2,3,3,0xa,685,
  [ 0xd7fffffc, 0xfcf4f4fc, 0xfcfc5c00, 0x7f7fff00, 0xf4f4fc00, 0xffffd700, 0xff7f7ffc, 0x5cfcfcfc],
  [ 0x01690154, 0x10202054, 0x00a40000, 0x21211100, 0x20201000, 0x01690100, 0x11212154, 0x00a40054]
  , 0x0,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat230,8,8, "D823b",-2,-1,1,2,3,3,0xa,646,
  [ 0xd7fff700, 0xfff777ff, 0x7cfc5cfc, 0x747cfc00, 0x77f7ff00, 0xf7ffd7ff, 0xfc7c74fc, 0x5cfc7c00],
  [ 0x01692100, 0x11a12155, 0x20a40054, 0x20281000, 0x21a11100, 0x21690155, 0x10282054, 0x00a42000]
  , 0x0,46.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat231,8,8, "D824",-1,-1,2,2,3,3,0xa,721,
  [ 0xfcffffff, 0xfcfcfcf0, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfffffc00, 0xffffff3f, 0xfcfcfcfc],
  [ 0x54116921, 0x44948450, 0xa4105400, 0x485a4400, 0x84944400, 0x69115400, 0x445a4815, 0x5410a420]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat232,4,8, "D825",-1,-1,2,1,3,2,0xa,722,
  [ 0xe8fcfcfc, 0xfcf8f800, 0xfcfcac00, 0xbfbfff00, 0xf8f8fc00, 0xfcfce800, 0xffbfbf00, 0xacfcfcfc],
  [ 0x40902000, 0x24900000, 0x20180400, 0x00186000, 0x00902400, 0x20904000, 0x60180000, 0x04182000]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_defendpat232,0,1.600000],
[owl_defendpat233,5,8, "D826",-2,-1,0,1,2,2,0xa,648,
  [ 0x80f0f000, 0xf8f00000, 0x3e3e0a00, 0x003cbca8, 0x00f0f8a8, 0xf0f08000, 0xbc3c0000, 0x0a3e3e00],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,25.000000,attributes[0],1,null,autohelperowl_defendpat233,0,1.000000],
[owl_defendpat234,5,8, "D827",-1,-2,2,3,3,5,0xa,648,
  [ 0xf0ffffff, 0xfcfcf0f0, 0xffff3f00, 0x3fffffff, 0xf0fcfcfc, 0xfffff000, 0xffff3f3f, 0x3fffffff],
  [ 0xa05a0500, 0x18186060, 0x40942800, 0x24909000, 0x60181800, 0x055aa000, 0x90902424, 0x28944000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat235,5,8, "D828",-1,-2,1,1,2,3,0xa,646,
  [ 0xfcfcb000, 0xbcfc3c00, 0x3afeff00, 0xf0fcf8e8, 0x3cfcbcac, 0xb0fcfc00, 0xf8fcf000, 0xfffe3a00],
  [ 0x20181000, 0x00582000, 0x10902000, 0x20940000, 0x20580000, 0x10182000, 0x00942000, 0x20901000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat236,4,8, "D829",-2,-1,1,2,3,3,0xa,648,
  [ 0xfcfcfc00, 0xfcffff00, 0xfffffcf0, 0xfcfcfc3c, 0xfffffcf0, 0xfcfcfc3c, 0xfcfcfc00, 0xfcffff00],
  [ 0x40100000, 0x04110100, 0x00100450, 0x00104000, 0x01110400, 0x00104014, 0x40100000, 0x04100000]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_defendpat236,0,0.010000],
[owl_defendpat237,6,8, "D830",-2,-1,1,1,3,2,0xa,722,
  [ 0xecfcfc00, 0xfcf8fc00, 0xffffec00, 0xfcbcfc3c, 0xfcf8fcf0, 0xfcfcec00, 0xfcbcfc00, 0xecffff00],
  [ 0x44102000, 0x04900400, 0x21114400, 0x40184014, 0x04900450, 0x20104400, 0x40184000, 0x44112100]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_defendpat237,0,0.010000],
[owl_defendpat238,8,8, "D831",-1,-1,2,2,3,3,0xa,686,
  [ 0xf8fefff7, 0xfcfcf8e0, 0xfcfcbc00, 0xbdffff00, 0xf8fcfc00, 0xfffef800, 0xffffbd2f, 0xbcfcfc7c],
  [ 0x50246901, 0x44a49040, 0xa4601400, 0x18684400, 0x90a44400, 0x69245000, 0x44681805, 0x1460a400]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat239,3,8, "D832",-1,-1,1,1,2,2,0xa,722,
  [ 0x0cbcfc00, 0xe0f0fc00, 0xfcf8c000, 0xfc3c2c00, 0xfcf0e000, 0xfcbc0c00, 0x2c3cfc00, 0xc0f8fc00],
  [ 0x0410a000, 0x80900400, 0x28104000, 0x40180800, 0x04908000, 0xa0100400, 0x08184000, 0x40102800]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_defendpat239,0,1.000000],
[owl_defendpat240,6,8, "D833",-2,0,2,2,4,2,0x6,759,
  [ 0x3f3d3f2f, 0x00fcffdc, 0xf0f0f0c0, 0xfffe0000, 0xfffc0000, 0x3f3d3f0c, 0x00feffdf, 0xf0f0f0e0],
  [ 0x11101000, 0x00540104, 0x10101040, 0x00540000, 0x01540000, 0x10101104, 0x00540040, 0x10101000]
  , 0x0,40.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat241,5,8, "D834",-2,0,2,2,4,2,0x6,722,
  [ 0x3f3f3f3f, 0x00fcfffc, 0xf0f0f0c0, 0xffff0000, 0xfffc0000, 0x3f3f3f0c, 0x00ffffff, 0xf0f0f0f0],
  [ 0x11101200, 0x00540184, 0x10101040, 0x00540000, 0x01540000, 0x12101104, 0x00540048, 0x10101000]
  , 0x0,40.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat242,1,8, "D835",-1,-1,2,1,3,2,0xa,683,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc],
  [ 0x00600000, 0x10200000, 0x00240000, 0x00201000, 0x00201000, 0x00600000, 0x10200000, 0x00240000]
  , 0x0,65.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat243,1,8, "D836",0,0,1,1,1,1,0xa,722,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat243,0,1.000000],
[owl_defendpat244,5,8, "D837",-2,-2,2,2,4,4,0x6,722,
  [ 0xffffffff, 0xfcfeffff, 0xfffefce0, 0xffffff2f, 0xfffefce0, 0xffffff2f, 0xffffffff, 0xfcfeffff],
  [ 0x40200000, 0x04200100, 0x01200440, 0x00204004, 0x01200440, 0x00204004, 0x40200000, 0x04200100]
  , 0x0,55.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat245,4,8, "D838",-1,-1,2,1,3,2,0xa,683,
  [ 0x3cfcfc3c, 0xf0fcfc00, 0xfcfcf000, 0xffff3c00, 0xfcfcf000, 0xfcfc3c00, 0x3cffff00, 0xf0fcfcf0],
  [ 0x00606410, 0x50a04000, 0x64240000, 0x04291400, 0x40a05000, 0x64600000, 0x14290400, 0x00246410]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_defendpat245,3,1.000000],
[owl_defendpat246,6,8, "D839",-2,-1,2,2,4,3,0xa,648,
  [ 0xfcfcfefe, 0xfffffc80, 0xfcfcfc3c, 0xffffff00, 0xfcffff00, 0xfefcfcf0, 0xffffff0a, 0xfcfcfcfc],
  [ 0x14242400, 0x00a65400, 0x60605020, 0x54680000, 0x54a60000, 0x24241420, 0x00685400, 0x50606000]
  , 0x0,88.000000,attributes[0],1,null,autohelperowl_defendpat246,3,1.600000],
[owl_defendpat247,7,8, "D840",-2,-1,1,2,3,3,0xa,683,
  [ 0xfcffff00, 0xfffffcf0, 0xfcfcfc3c, 0xfcfcfc00, 0xfcffff00, 0xfffffcf0, 0xfcfcfc3c, 0xfcfcfc00],
  [ 0x04a51100, 0x21611450, 0x10684014, 0x50242000, 0x14612100, 0x11a50450, 0x20245014, 0x40681000]
  , 0x0,25.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat248,3,8, "D841",-2,-2,2,1,4,3,0xa,648,
  [ 0xf0fcfcfc, 0xfffff000, 0xffff3f3f, 0x3fffffff, 0xf0ffffff, 0xfcfcf0f0, 0xffff3f00, 0x3fffffff],
  [ 0x10180000, 0x00152000, 0x00901010, 0x20500000, 0x20150000, 0x00181010, 0x00502000, 0x10900000]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat249,3,8, "D842",-2,-2,2,2,4,4,0x6,722,
  [ 0xffffffff, 0xfcfcffff, 0xfffffcc0, 0xffffff3f, 0xfffcfcf0, 0xffffff0f, 0xffffffff, 0xfcffffff],
  [ 0xa4500000, 0x18180600, 0x00166880, 0x40909020, 0x06181820, 0x0050a408, 0x90904000, 0x68160000]
  , 0x0,76.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat250,7,8, "D843",0,-2,2,2,2,4,0xa,685,
  [ 0x00ffffff, 0xf0f0f0f0, 0xffff0000, 0x3f3f3f3f, 0xf0f0f0f0, 0xffff0000, 0x3f3f3f3f, 0x00ffffff],
  [ 0x00550181, 0x10101050, 0x00550000, 0x10101210, 0x10101010, 0x01550000, 0x12101015, 0x00550008]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat251,2,8, "D844",0,-1,1,1,1,2,0xa,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00140000, 0x00101000, 0x00500000, 0x10100000, 0x10100000, 0x00140000, 0x00101000, 0x00500000]
  , 0x0,40.000000,attributes[0],1,null,autohelperowl_defendpat251,0,0.019600],
[owl_defendpat252,5,8, "D845",-1,-1,1,2,2,3,0xa,647,
  [ 0xfeffff00, 0xfcfcfcf8, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfffffe00, 0xfcfcfcbc, 0xfcfcfc00],
  [ 0x50210100, 0x04240050, 0x00201400, 0x00604000, 0x00240400, 0x01215000, 0x40600014, 0x14200000]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_defendpat252,3,0.010000],
[owl_defendpat253,6,8, "D846",-1,-1,1,2,2,3,0xa,685,
  [ 0xfeffff00, 0xfcfcfcf8, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfffffe00, 0xfcfcfcbc, 0xfcfcfc00],
  [ 0x50610100, 0x14240050, 0x00241400, 0x00605000, 0x00241400, 0x01615000, 0x50600014, 0x14240000]
  , 0x0,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat254,6,8, "D847",-1,-1,1,2,2,3,0xa,721,
  [ 0xfeffff00, 0xfcfcfcf8, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfffffe00, 0xfcfcfcbc, 0xfcfcfc00],
  [ 0x50612100, 0x14a40050, 0x20241400, 0x00685000, 0x00a41400, 0x21615000, 0x50680014, 0x14242000]
  , 0x0,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat255,3,8, "D900",-1,-1,1,2,2,3,0x2,648,
  [ 0xc0fcf400, 0xfcf07000, 0x7efc0c00, 0x343cfc08, 0x70f0fc80, 0xf4fcc000, 0xfc3c3400, 0x0cfc7e00],
  [ 0x40182000, 0x04902000, 0x20900400, 0x20184000, 0x20900400, 0x20184000, 0x40182000, 0x04902000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat255,0,1.000000],
[owl_defendpat256,1,8, "D902",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00188000, 0x80102000, 0x08900000, 0x20100800, 0x20108000, 0x80180000, 0x08102000, 0x00900800]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat256,0,1.000000],
[owl_defendpat257,1,8, "D903",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00980000, 0x20102000, 0x00980000, 0x20102000, 0x20102000, 0x00980000, 0x20102000, 0x00980000]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_defendpat257,0,1.000000],
[owl_defendpat258,1,8, "D904",0,-1,1,1,1,2,0x2,648,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00980000, 0x20102000, 0x00980000, 0x20102000, 0x20102000, 0x00980000, 0x20102000, 0x00980000]
  , 0x0,84.000000,attributes[0],1,null,autohelperowl_defendpat258,0,1.000000],
[owl_defendpat259,1,8, "D905",0,-1,1,2,1,3,0x2,647,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00260000, 0x00201020, 0x00600000, 0x10200000, 0x10200000, 0x00260000, 0x00201020, 0x00600000]
  , 0x0,86.000000,attributes[0],1,null,autohelperowl_defendpat259,3,1.000000],
[owl_defendpat260,3,8, "D906",-1,-2,1,2,2,4,0x2,720,
  [ 0xfcfcfcfc, 0xfcffff00, 0xfcfcfcf0, 0xffffff00, 0xfffffc00, 0xfcfcfc3c, 0xffffff00, 0xfcfcfcfc],
  [ 0x50200040, 0x04260000, 0x00201420, 0x00604100, 0x00260400, 0x00205020, 0x41600000, 0x14200004]
  , 0x0,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat261,3,8, "D907",-1,-2,1,2,2,4,0x2,685,
  [ 0xfcfcfcfc, 0xfcffff00, 0xfcfcfcf0, 0xffffff00, 0xfffffc00, 0xfcfcfc3c, 0xffffff00, 0xfcfcfcfc],
  [ 0x50200040, 0x04260000, 0x00201420, 0x00604100, 0x00260400, 0x00205020, 0x41600000, 0x14200004]
  , 0x0,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat262,5,8, "D908",-2,-2,1,2,3,4,0x2,685,
  [ 0xfcfcfcfc, 0xfcffff00, 0xfffffcf0, 0xffffff3c, 0xfffffcf0, 0xfcfcfc3c, 0xffffff00, 0xfcfffffc],
  [ 0x50200040, 0x04260000, 0x01211420, 0x00604114, 0x00260450, 0x00205020, 0x41600000, 0x14210104]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat262,3,1.000000],
[owl_defendpat263,1,4, "D909",0,0,0,1,0,1,0x0,685,
  [ 0x00303000, 0x00f00000, 0x30300000, 0x003c0000, 0x00f00000, 0x30300000, 0x003c0000, 0x00303000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_defendpat263,0,0.034000],
[owl_defendpat264,2,8, "D910a",-1,-2,1,2,2,4,0x2,683,
  [ 0xfcfcfcfc, 0xfeffff00, 0xfcfcfcf8, 0xffffff00, 0xfffffe00, 0xfcfcfcbc, 0xffffff00, 0xfcfcfcfc],
  [ 0x00600080, 0x10200000, 0x00240000, 0x00201200, 0x00201000, 0x00600000, 0x12200000, 0x00240008]
  , 0x0,65.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat265,2,8, "D910b",-1,-2,1,2,2,4,0x2,683,
  [ 0xfcfcfcfc, 0xfeffff00, 0xfcfcfcf8, 0xffffff00, 0xfffffe00, 0xfcfcfcbc, 0xffffff00, 0xfcfcfcfc],
  [ 0x00600080, 0x10200000, 0x00240000, 0x00201200, 0x00201000, 0x00600000, 0x12200000, 0x00240008]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat265,3,1.000000],
[owl_defendpat266,6,8, "D911",-3,-2,0,3,3,5,0x2,646,
  [ 0xffff0000, 0x3e3e3e3c, 0x00ffffaa, 0xf0f0f0f0, 0x3e3e3e3e, 0x00ffffa8, 0xf0f0f0f0, 0xffff0000],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat266,3,0.010000],
[owl_defendpat267,2,4, "D1000",0,0,1,1,1,1,0x0,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00102400, 0x00904000, 0x60100000, 0x04180000, 0x40900000, 0x24100000, 0x00180400, 0x00106000]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat267,0,0.592000],
[owl_defendpat268,1,4, "D1000a",0,0,0,1,0,1,0x0,685,
  [ 0x00303000, 0x00f00000, 0x30300000, 0x003c0000, 0x00f00000, 0x30300000, 0x003c0000, 0x00303000],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,95.000000,attributes[0],1,null,autohelperowl_defendpat268,0,0.016000],
[owl_defendpat269,2,8, "D1001",-1,-1,0,1,1,2,0x0,685,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00188400, 0x80106000, 0x48900000, 0x24100800, 0x60108000, 0x84180000, 0x08102400, 0x00904800]
  , 0x20,70.000000,attributes[0],1,null,autohelperowl_defendpat269,0,1.366000],
[owl_defendpat270,5,8, "D1001b",-1,-1,1,3,2,4,0x2,795,
  [ 0x3fff7f00, 0x70fcfcfc, 0xf4fcf000, 0xfcfc3400, 0xfcfc7000, 0x7fff3f00, 0x34fcfcfc, 0xf0fcf400],
  [ 0x25920400, 0x20184424, 0x40186000, 0x44902000, 0x44182000, 0x04922500, 0x20904460, 0x60184000]
  , 0x20,71.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat271,2,8, "D1002",-1,-1,0,1,1,2,0x0,685,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00188400, 0x80106000, 0x48900000, 0x24100800, 0x60108000, 0x84180000, 0x08102400, 0x00904800]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat271,0,1.030000],
[owl_defendpat272,4,8, "D1003",-2,-2,1,1,3,3,0x0,720,
  [ 0xbcbc3c00, 0x28fcfc00, 0xf0f8f800, 0xfcfca000, 0xfcfc2800, 0x3cbcbc00, 0xa0fcfc00, 0xf8f8f000],
  [ 0x00102400, 0x00904000, 0x60100000, 0x04180000, 0x40900000, 0x24100000, 0x00180400, 0x00106000]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_defendpat272,0,1.690000],
[owl_defendpat273,3,8, "D1004",-2,-1,0,2,2,3,0x0,721,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00101024, 0x00500000, 0x10100000, 0x01160000, 0x00500000, 0x10100000, 0x00160100, 0x00101060]
  , 0x20,69.000000,attributes[0],1,null,autohelperowl_defendpat273,0,1.872304],
[owl_defendpat274,8,8, "D1004b",-2,-1,0,2,2,3,0x1,721,
  [ 0x2e3e3e3e, 0x00f8fca8, 0xf0f0e000, 0xffbf0000, 0xfcf80000, 0x3e3e2e00, 0x00bfffaa, 0xe0f0f0f0],
  [ 0x00101024, 0x00500000, 0x10100000, 0x01160000, 0x00500000, 0x10100000, 0x00160100, 0x00101060]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat275,2,8, "D1005",-1,-2,1,1,2,3,0x0,721,
  [ 0xffff7f00, 0x7cfcfcfc, 0xf4fcfc00, 0xfcfcf400, 0xfcfc7c00, 0x7fffff00, 0xf4fcfcfc, 0xfcfcf400],
  [ 0x00902400, 0x20904000, 0x60180000, 0x04182000, 0x40902000, 0x24900000, 0x20180400, 0x00186000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat276,2,4, "D1006",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00640000, 0x10201000, 0x00640000, 0x10201000, 0x10201000, 0x00640000, 0x10201000, 0x00640000]
  , 0x20,60.000000,attributes[0],1,null,autohelperowl_defendpat276,3,0.376000],
[owl_defendpat277,2,4, "D1006b",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00640000, 0x10201000, 0x00640000, 0x10201000, 0x10201000, 0x00640000, 0x10201000, 0x00640000]
  , 0x2020,80.000000,attributes[0],1,null,autohelperowl_defendpat277,3,0.021760],
[owl_defendpat278,2,4, "D1007",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00640000, 0x10201000, 0x00640000, 0x10201000, 0x10201000, 0x00640000, 0x10201000, 0x00640000]
  , 0x4000,90.000000,attributes[0],1,null,autohelperowl_defendpat278,3,1.531600],
[owl_defendpat279,1,4, "D1100",0,0,1,1,1,1,0x0,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00201800, 0x00608000, 0x90200000, 0x08240000, 0x80600000, 0x18200000, 0x00240800, 0x00209000]
  , 0x800,88.000000,attributes[0],1,null,autohelperowl_defendpat279,3,0.731600],
[owl_defendpat280,1,4, "D1100b",0,0,1,1,1,1,0x0,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00201800, 0x00608000, 0x90200000, 0x08240000, 0x80600000, 0x18200000, 0x00240800, 0x00209000]
  , 0x800,92.000000,attributes[0],1,null,autohelperowl_defendpat280,3,1.160000],
[owl_defendpat281,1,4, "D1101",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00204020, 0x40200000, 0x04200000, 0x00220400, 0x00204000, 0x40200000, 0x04220000, 0x00200420]
  , 0x0,95.000000,attributes[0],1,null,autohelperowl_defendpat281,3,5.000000],
[owl_defendpat282,1,4, "D1102",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00204020, 0x40200000, 0x04200000, 0x00220400, 0x00204000, 0x40200000, 0x04220000, 0x00200420]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat282,3,0.054400],
[owl_defendpat283,1,4, "D1102a",-1,-1,1,3,2,4,0x0,685,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc],
  [ 0x00204020, 0x40200000, 0x04200000, 0x00220400, 0x00204000, 0x40200000, 0x04220000, 0x00200420]
  , 0x0,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat284,3,8, "D1103",-1,-1,2,2,3,3,0x2,758,
  [ 0x3fff3fff, 0x30fcfcfc, 0xf0fcf000, 0xffff3300, 0xfcfc3000, 0x3fff3f00, 0x33ffffff, 0xf0fcf0fc],
  [ 0x14680000, 0x10242400, 0x00a45000, 0x60601000, 0x24241000, 0x00681400, 0x10606000, 0x50a40000]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_defendpat284,3,3.000000],
[owl_defendpat285,4,8, "D1104",-1,-1,2,3,3,4,0x2,723,
  [ 0x3f3fbfbf, 0x80fcfcfc, 0xf8f0f000, 0xffff0a00, 0xfcfc8000, 0xbf3f3f00, 0x0affffff, 0xf0f0f8f8],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,100.000000,attributes[0],1,null,autohelperowl_defendpat285,0,1.000000],
[owl_defendpat286,5,8, "D1105",-1,-1,2,2,3,3,0x2,721,
  [ 0x083efeff, 0xc0f0f8a0, 0xfcf08000, 0xbf3f0f00, 0xf8f0c000, 0xfe3e0800, 0x0f3fbf2b, 0x80f0fcfc],
  [ 0x00205800, 0x40608000, 0x94200000, 0x08240400, 0x80604000, 0x58200000, 0x04240800, 0x00209400]
  , 0x800,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat287,2,8, "D1106",-2,0,1,2,3,2,0x0,685,
  [ 0x00fffffc, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3c, 0x00fcfcfc],
  [ 0x00600180, 0x10200040, 0x00240000, 0x00201200, 0x00201000, 0x01600000, 0x12200004, 0x00240008]
  , 0x0,77.000000,attributes[0],1,null,autohelperowl_defendpat287,3,1.000000],
[owl_defendpat288,2,8, "D1107",0,-1,1,2,1,3,0x2,648,
  [ 0x00fdff00, 0xf0f0f0d0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfffd0000, 0x3c3c3c1c, 0x00fcfc00],
  [ 0x00982400, 0x20906000, 0x60980000, 0x24182000, 0x60902000, 0x24980000, 0x20182400, 0x00986000]
  , 0x0,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat289,3,8, "D1108",-1,-2,2,2,3,4,0x0,647,
  [ 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xffffffff],
  [ 0x02299400, 0x80606018, 0x58a00000, 0x24240800, 0x60608000, 0x94290200, 0x08242490, 0x00a05800]
  , 0x200,95.000000,attributes[0],1,null,autohelperowl_defendpat289,3,3.960000],
[owl_defendpat290,4,8, "D1108b",-1,-2,2,2,3,4,0x0,720,
  [ 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xffffffff],
  [ 0x02699400, 0x90606018, 0x5aa40000, 0x24241808, 0x60609080, 0x94690200, 0x18242490, 0x00a45a00]
  , 0x200,95.000000,attributes[0],1,null,autohelperowl_defendpat290,3,1.810000],
[owl_defendpat291,1,8, "D1109",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00204820, 0x40208000, 0x84200000, 0x08220400, 0x80204000, 0x48200000, 0x04220800, 0x00208420]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_defendpat291,3,1.600000],
[owl_defendpat292,3,8, "D1110",-1,-1,1,2,2,3,0x0,685,
  [ 0xfcfcfc3c, 0xfcfcfc00, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcffff00, 0xfcfcfcf0],
  [ 0x94240800, 0x08249400, 0x80605800, 0x58608000, 0x94240800, 0x08249400, 0x80605800, 0x58608000]
  , 0x800,75.000000,attributes[0],1,null,autohelperowl_defendpat292,3,1.000000],
[owl_defendpat293,5,8, "D1111",-2,-2,2,2,4,4,0x0,647,
  [ 0xfeffff3f, 0xfffcfcf8, 0xfcffff0c, 0xfffffcf0, 0xfcfcff3c, 0xfffffec0, 0xfcffffbf, 0xfffffcf0],
  [ 0x94290200, 0x09242490, 0x00a05804, 0x60608000, 0x24240900, 0x02299440, 0x80606018, 0x58a00000]
  , 0x210,90.000000,attributes[0],1,null,autohelperowl_defendpat293,3,0.376000],
[owl_defendpat294,5,8, "D1112",-1,-2,2,2,3,4,0x0,722,
  [ 0x3effff3f, 0xf0fcfcf8, 0xfcfcf000, 0xffff3c00, 0xfcfcf000, 0xffff3e00, 0x3cffffbf, 0xf0fcfcf0],
  [ 0x14690200, 0x10242490, 0x00a45000, 0x60601000, 0x24241000, 0x02691400, 0x10606018, 0x50a40000]
  , 0x200,90.000000,attributes[0],1,null,autohelperowl_defendpat294,3,0.376000],
[owl_defendpat295,6,8, "D1113",-1,-2,2,2,3,4,0x0,645,
  [ 0xfcfcf000, 0xffff3c00, 0x3effff3f, 0xf0fcfcf8, 0x3cffffbf, 0xf0fcfcf0, 0xfcfcf000, 0xffff3e00],
  [ 0x60a45000, 0x64681000, 0x14692600, 0x10a46490, 0x10686418, 0x50a46000, 0x64a41000, 0x26691400]
  , 0x200,90.000000,attributes[0],1,null,autohelperowl_defendpat295,3,0.376000],
[owl_defendpat296,7,8, "D1114",-1,-2,2,2,3,4,0x0,682,
  [ 0xfcfcf000, 0xffff3c00, 0x3effff3f, 0xf0fcfcf8, 0x3cffffbf, 0xf0fcfcf0, 0xfcfcf000, 0xffff3e00],
  [ 0x60a45000, 0x65681000, 0x14692606, 0x10a46490, 0x1068651a, 0x50a46040, 0x64a41000, 0x26691400]
  , 0x200,90.000000,attributes[0],1,null,autohelperowl_defendpat296,3,0.376000],
[owl_defendpat297,4,8, "D1115",-2,-1,1,2,3,3,0x0,647,
  [ 0xf0fcfcf0, 0xfcfcf000, 0xffff3e00, 0x3cffffbc, 0xf0fcfcf8, 0xfcfcf000, 0xffff3c00, 0x3effff3c],
  [ 0x00205890, 0x40608000, 0x96200000, 0x08250608, 0x80604080, 0x58200000, 0x06250800, 0x00209618]
  , 0x0,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat298,3,8, "D1116",-1,-2,1,1,2,3,0x2,685,
  [ 0xbcfcfcfc, 0xf8fcfc00, 0xfcfcf800, 0xffffbf00, 0xfcfcf800, 0xfcfcbc00, 0xbfffff00, 0xf8fcfcfc],
  [ 0x18608080, 0x90240800, 0x08249000, 0x80601a00, 0x08249000, 0x80601800, 0x1a608000, 0x90240808]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat298,3,1.000000],
[owl_defendpat299,2,8, "D1117",-2,-2,1,1,3,3,0x2,647,
  [ 0xf4f4fcfc, 0xfcfcd400, 0xfd7f7c00, 0x5fffff37, 0xd4fcfc70, 0xfcf4f400, 0xffff5f00, 0x7c7ffdff],
  [ 0x50200000, 0x04240000, 0x00221400, 0x00604020, 0x00240420, 0x00205000, 0x40600000, 0x14220000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat299,3,1.000000],
[owl_defendpat300,3,8, "D1117a",-2,-1,1,2,3,3,0x2,683,
  [ 0xfffff700, 0xfffd7ffc, 0x7cfcfcdc, 0xf4fcfc00, 0x7ffdff00, 0xf7ffffdc, 0xfcfcf4fc, 0xfcfc7c00],
  [ 0x05290200, 0x00202694, 0x00a04080, 0x60200000, 0x26200000, 0x02290508, 0x00206058, 0x40a00000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat300,3,1.006000],
[owl_defendpat301,6,8, "D1118",-2,-1,1,2,3,3,0x0,721,
  [ 0x3efefe30, 0xf0fcfca8, 0xfcfcf000, 0xfcff3c00, 0xfcfcf000, 0xfefe3e00, 0x3cfffca8, 0xf0fcfc30],
  [ 0x18601820, 0x10648800, 0x90249000, 0x88661000, 0x88641000, 0x18601800, 0x10668800, 0x90249020]
  , 0x0,85.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat302,3,8, "D1119",-2,-2,2,2,4,4,0x0,648,
  [ 0xf8fcfcfc, 0xfcfcf800, 0xfcffbf00, 0xbffffff2, 0xf8fcfc3c, 0xfcfcf800, 0xffffbf00, 0xbffffcfe],
  [ 0x00200060, 0x00200000, 0x00220000, 0x00220120, 0x00200020, 0x00200000, 0x01220000, 0x00220024]
  , 0x2000,70.000000,attributes[0],1,null,autohelperowl_defendpat302,3,0.016000],
[owl_defendpat303,4,8, "D1120",-2,-2,2,2,4,4,0x0,685,
  [ 0xbffffcfa, 0xf8fcfc3c, 0xfcfcf800, 0xfeffbf00, 0xfcfcf800, 0xfcffbf00, 0xbffffef2, 0xf8fcfcbc],
  [ 0x00220420, 0x00204020, 0x40200000, 0x04220000, 0x40200000, 0x04220000, 0x00220420, 0x00204020]
  , 0x2000,81.000000,attributes[0],1,null,autohelperowl_defendpat303,3,0.016000],
[owl_defendpat304,5,8, "D1120b",-1,-1,2,2,3,3,0x0,685,
  [ 0xaf3ffffe, 0xc8f8fcfc, 0xfcf0e800, 0xffbf8f00, 0xfcf8c800, 0xff3faf00, 0x8fbffffe, 0xe8f0fcfc],
  [ 0x08168800, 0x80109820, 0x88508000, 0x98100800, 0x98108000, 0x88160800, 0x08109820, 0x80508800]
  , 0x0,81.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat305,9,8, "D1121a",-2,0,1,3,3,3,0x0,722,
  [ 0x2a3f3f3b, 0x00f8f8f8, 0xf0f0a000, 0xbebf0000, 0xf8f80000, 0x3f3f2a00, 0x00bfbebf, 0xa0f0f0b0],
  [ 0x00200012, 0x00200000, 0x00200000, 0x00210000, 0x00200000, 0x00200000, 0x00210002, 0x00200010]
  , 0x0,70.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat306,9,8, "D1121b",0,-1,3,2,3,3,0x0,685,
  [ 0x00fefefe, 0xf0f0f0a0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfefe0000, 0x3f3f3f2a, 0x00fcfcfc],
  [ 0x00588080, 0x90102000, 0x08940000, 0x20101a00, 0x20109000, 0x80580000, 0x1a102000, 0x00940808]
  , 0x0,70.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat307,8,8, "D1121c",-1,0,2,3,3,3,0x0,685,
  [ 0x00fefefe, 0xf0f0f0a0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfefe0000, 0x3f3f3f2a, 0x00fcfcfc],
  [ 0x00680080, 0x10202000, 0x00a40000, 0x20201200, 0x20201000, 0x00680000, 0x12202000, 0x00a40008]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat307,3,3.000000],
[owl_defendpat308,1,4, "D1122",0,-1,1,1,1,2,0x2,685,
  [ 0x0030fc00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0x0030fc00],
  [ 0x00108800, 0x80108000, 0x88100000, 0x08100800, 0x80108000, 0x88100000, 0x08100800, 0x00108800]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_defendpat308,0,1.600000],
[owl_defendpat309,5,8, "D1123",-1,-1,2,2,3,3,0x0,720,
  [ 0xbefffffc, 0xf8fcfcf8, 0xfcfcf800, 0xffffbf00, 0xfcfcf800, 0xffffbe00, 0xbfffffbc, 0xf8fcfcfc],
  [ 0x20586080, 0x50982000, 0x24942000, 0x20981600, 0x20985000, 0x60582000, 0x16982000, 0x20942408]
  , 0x800,86.000000,attributes[0],1,null,autohelperowl_defendpat309,0,1.000000],
[owl_defendpat310,2,8, "D1124",0,-1,1,1,1,2,0x0,685,
  [ 0x00fc3c00, 0x30f0f000, 0xf0fc0000, 0x3c3c3000, 0xf0f03000, 0x3cfc0000, 0x303c3c00, 0x00fcf000],
  [ 0x00640800, 0x10209000, 0x80640000, 0x18201000, 0x90201000, 0x08640000, 0x10201800, 0x00648000]
  , 0x2800,90.000000,attributes[0],1,null,autohelperowl_defendpat310,3,1.096000],
[owl_defendpat311,6,8, "D1125",-2,-2,1,1,3,3,0x0,685,
  [ 0xbcfcfcf0, 0xf8fcfc00, 0xfefef800, 0xfcffbf2a, 0xfcfcf8a0, 0xfcfcbc00, 0xbffffc00, 0xf8fefe3e],
  [ 0x08240400, 0x00205800, 0x40608000, 0x94200000, 0x58200000, 0x04240800, 0x00209400, 0x80604000]
  , 0x2000,79.000000,attributes[0],1,null,autohelperowl_defendpat311,3,0.019600],
[owl_defendpat312,1,8, "D1126",-1,0,1,2,2,2,0x0,685,
  [ 0x00fcfc3c, 0xf0f0f000, 0xfcfc0000, 0x3f3f3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3f3f00, 0x00fcfcf0],
  [ 0x00240800, 0x00209000, 0x80600000, 0x18200000, 0x90200000, 0x08240000, 0x00201800, 0x00608000]
  , 0x800,82.000000,attributes[0],1,null,autohelperowl_defendpat312,3,0.970000],
[owl_defendpat313,4,8, "D1127",-2,-1,1,1,3,2,0x0,685,
  [ 0xb0fcfcfc, 0xf8fcf000, 0xfcfc3800, 0x3fffbf00, 0xf0fcf800, 0xfcfcb000, 0xbfff3f00, 0x38fcfcfc],
  [ 0x10608810, 0x90248000, 0x88241000, 0x08611800, 0x80249000, 0x88601000, 0x18610800, 0x10248810]
  , 0x800,35.000000,attributes[0],1,null,autohelperowl_defendpat313,3,0.010000],
[owl_defendpat314,4,8, "D1128",-2,-2,1,1,3,3,0x0,685,
  [ 0xf0fcfcf0, 0xfcfcf000, 0xffff3e00, 0x3cffffbf, 0xf0fcfcf8, 0xfcfcf000, 0xffff3c00, 0x3effff3f],
  [ 0x50240800, 0x04249000, 0x80601400, 0x18604000, 0x90240400, 0x08245000, 0x40601800, 0x14608000]
  , 0x200,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat315,5,8, "D1129",-2,-1,1,2,3,3,0x0,759,
  [ 0x3fffff3e, 0xf0fcfcfc, 0xfcfcf000, 0xffff3c00, 0xfcfcf000, 0xffff3f00, 0x3cfffffe, 0xf0fcfcf0],
  [ 0x00906814, 0x60908000, 0xa4180000, 0x09192400, 0x80906000, 0x68900000, 0x24190900, 0x0018a450]
  , 0x200,77.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat316,3,8, "D1130",-1,-1,1,2,2,3,0x0,721,
  [ 0xf0ff7c00, 0x7cfcf030, 0xf4fc3c00, 0x3cfcf400, 0xf0fc7c00, 0x7cfff000, 0xf4fc3c30, 0x3cfcf400],
  [ 0x40922400, 0x24904020, 0x60180400, 0x04186000, 0x40902400, 0x24924000, 0x60180420, 0x04186000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat316,0,1.006000],
[owl_defendpat317,2,8, "D1131",-1,0,1,1,2,1,0x0,685,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00608400, 0x90204000, 0x48240000, 0x04201800, 0x40209000, 0x84600000, 0x18200400, 0x00244800]
  , 0x2000,90.000000,attributes[0],1,null,autohelperowl_defendpat317,3,0.592000],
[owl_defendpat318,3,8, "D1132",0,-1,1,2,1,3,0x0,685,
  [ 0x0c3c3c3c, 0x00f0fc00, 0xf0f0c000, 0xff3f0000, 0xfcf00000, 0x3c3c0c00, 0x003fff00, 0xc0f0f0f0],
  [ 0x04240810, 0x00209400, 0x80604000, 0x58210000, 0x94200000, 0x08240400, 0x00215800, 0x40608010]
  , 0x800,45.000000,attributes[0],1,null,autohelperowl_defendpat318,3,3.000000],
[owl_defendpat319,4,8, "D1133",0,-1,2,2,2,3,0x2,722,
  [ 0x003edfbf, 0xc070f0e0, 0xdcf00000, 0x3f370e00, 0xf070c000, 0xdf3e0000, 0x0e373f2f, 0x00f0dcf8],
  [ 0x00204010, 0x40200000, 0x04200000, 0x00210400, 0x00204000, 0x40200000, 0x04210000, 0x00200410]
  , 0x2000,65.000000,attributes[0],1,null,autohelperowl_defendpat319,3,0.010000],
[owl_defendpat320,3,8, "D1134",-2,-1,1,1,3,2,0x0,685,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x006048a4, 0x50208000, 0x84240000, 0x09221600, 0x80205000, 0x48600000, 0x16220900, 0x00248468]
  , 0x800,5.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat321,1,8, "D1135",0,0,1,2,1,2,0x0,685,
  [ 0x003c3c30, 0x00f0f000, 0xf0f00000, 0x3c3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3c00, 0x00f0f030],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x2000,35.000000,attributes[0],1,null,autohelperowl_defendpat321,0,0.610000],
[owl_defendpat322,5,8, "D1137",-2,0,1,3,3,3,0x0,685,
  [ 0x003cfcf0, 0xc0f0f000, 0xfef00000, 0x3c3f0f0a, 0xf0f0c080, 0xfc3c0000, 0x0f3f3c00, 0x00f0fe3e],
  [ 0x00240000, 0x00201000, 0x00600000, 0x10200000, 0x10200000, 0x00240000, 0x00201000, 0x00600000]
  , 0x2200,65.000000,attributes[0],1,null,autohelperowl_defendpat322,3,0.667600],
[owl_defendpat323,1,8, "D1138",-1,-1,1,2,2,3,0x0,721,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00209800, 0x80608000, 0x98200000, 0x08240800, 0x80608000, 0x98200000, 0x08240800, 0x00209800]
  , 0x2810,85.000000,attributes[0],1,null,autohelperowl_defendpat323,3,0.186496],
[owl_defendpat324,2,8, "D1139",-1,0,1,1,2,1,0x0,648,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00241800, 0x00609000, 0x90600000, 0x18240000, 0x90600000, 0x18240000, 0x00241800, 0x00609000]
  , 0x2820,75.000000,attributes[0],1,null,autohelperowl_defendpat324,3,1.810000],
[owl_defendpat325,1,8, "D1140",0,-1,2,1,2,2,0x0,685,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00240000, 0x00201000, 0x00600000, 0x10200000, 0x10200000, 0x00240000, 0x00201000, 0x00600000]
  , 0x2800,70.000000,attributes[0],1,null,autohelperowl_defendpat325,3,0.235600],
[owl_defendpat326,2,8, "D1141",-2,-1,1,1,3,2,0x0,683,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc],
  [ 0x08248400, 0x80205800, 0x48608000, 0x94200800, 0x58208000, 0x84240800, 0x08209400, 0x80604800]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_defendpat326,3,0.610000],
[owl_defendpat327,2,8, "D1142",-1,-1,1,1,2,2,0x0,647,
  [ 0x30fc3c00, 0x30fcf000, 0xf0fc3000, 0x3cfc3000, 0xf0fc3000, 0x3cfc3000, 0x30fc3c00, 0x30fcf000],
  [ 0x20182400, 0x00986000, 0x60902000, 0x24980000, 0x60980000, 0x24182000, 0x00982400, 0x20906000]
  , 0x800,30.000000,attributes[0],1,null,autohelperowl_defendpat327,0,2.025232],
[owl_defendpat328,5,8, "D1143",-1,-1,1,2,2,3,0x2,683,
  [ 0xfffffe00, 0xfcfcfcbc, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfeffff00, 0xfcfcfcf8, 0xfcfcfc00],
  [ 0x09990400, 0x20106814, 0x40988000, 0xa4102000, 0x68102000, 0x04990900, 0x2010a450, 0x80984000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat328,0,0.235600],
[owl_defendpat329,2,8, "D1144",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00640800, 0x10209000, 0x80640000, 0x18201000, 0x90201000, 0x08640000, 0x10201800, 0x00648000]
  , 0x0,82.000000,attributes[0],1,null,autohelperowl_defendpat329,3,0.019600],
[owl_defendpat330,2,8, "D1144b",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00640800, 0x10209000, 0x80640000, 0x18201000, 0x90201000, 0x08640000, 0x10201800, 0x00648000]
  , 0x0,40.000000,attributes[0],1,null,autohelperowl_defendpat330,3,0.010000],
[owl_defendpat331,2,8, "D1200",-1,-2,2,2,3,4,0x6,647,
  [ 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xffffffff],
  [ 0x80205800, 0x48608000, 0x94200800, 0x08248400, 0x80604800, 0x58208000, 0x84240800, 0x08209400]
  , 0x0,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat332,6,8, "D1201a",0,-1,2,1,2,2,0x0,648,
  [ 0x00f8fca8, 0xf0f0e000, 0xfcbc0000, 0x2e3e3e00, 0xe0f0f000, 0xfcf80000, 0x3e3e2e00, 0x00bcfca8],
  [ 0x00900400, 0x20104000, 0x40180000, 0x04102000, 0x40102000, 0x04900000, 0x20100400, 0x00184000]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat332,0,0.010000],
[owl_defendpat333,5,8, "D1201b",0,-1,2,1,2,2,0x0,648,
  [ 0x00f8fce8, 0xf0f0e000, 0xfcbc0000, 0x2e3e3f00, 0xe0f0f000, 0xfcf80000, 0x3f3e2e00, 0x00bcfcac],
  [ 0x00900480, 0x20104000, 0x40180000, 0x04102200, 0x40102000, 0x04900000, 0x22100400, 0x00184008]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat333,0,1.810000],
[owl_defendpat334,4,8, "D1202",-1,-2,1,1,2,3,0x2,720,
  [ 0xfcfcf000, 0xfffe3e00, 0x3cfcfcac, 0xf0fcfc00, 0x3efeff00, 0xf0fcfce8, 0xfcfcf000, 0xfcfc3c00],
  [ 0x00181000, 0x00502000, 0x10900000, 0x20140000, 0x20500000, 0x10180000, 0x00142000, 0x00901000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat334,0,0.592000],
[owl_defendpat335,2,8, "D1203",0,-1,1,1,1,2,0x2,685,
  [ 0x00fc7c00, 0x70f0f000, 0xf4fc0000, 0x3c3c3400, 0xf0f07000, 0x7cfc0000, 0x343c3c00, 0x00fcf400],
  [ 0x00940000, 0x20101000, 0x00580000, 0x10102000, 0x10102000, 0x00940000, 0x20101000, 0x00580000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_defendpat335,0,1.603600],
[owl_defendpat336,3,8, "D1204",0,-1,1,1,1,2,0x2,685,
  [ 0x00bcfc00, 0xe0f0f000, 0xfcf80000, 0x3c3c2c00, 0xf0f0e000, 0xfcbc0000, 0x2c3c3c00, 0x00f8fc00],
  [ 0x00148000, 0x80101000, 0x08500000, 0x10100800, 0x10108000, 0x80140000, 0x08101000, 0x00500800]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_defendpat336,0,0.972160],
[owl_defendpat337,2,4, "D1205",-1,0,1,2,2,2,0x0,685,
  [ 0x0030fc30, 0xc0f0c000, 0xfc300000, 0x0c3f0c00, 0xc0f0c000, 0xfc300000, 0x0c3f0c00, 0x0030fc30],
  [ 0x00108810, 0x80108000, 0x88100000, 0x08110800, 0x80108000, 0x88100000, 0x08110800, 0x00108810]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat337,0,1.000000],
[owl_defendpat338,5,8, "D1206",-1,-1,1,1,2,2,0x0,647,
  [ 0x38fcf800, 0xf0fcb800, 0xbcfcb000, 0xb8fc3c00, 0xb8fcf000, 0xf8fc3800, 0x3cfcb800, 0xb0fcbc00],
  [ 0x10249000, 0x80641000, 0x18601000, 0x10640800, 0x10648000, 0x90241000, 0x08641000, 0x10601800]
  , 0x0,40.000000,attributes[0],1,null,autohelperowl_defendpat338,3,1.000000],
[owl_defendpat339,1,8, "D1207",-1,-1,1,2,2,3,0x2,721,
  [ 0xbdffff00, 0xf8fcfcf4, 0xfcfcf800, 0xfcfcbc00, 0xfcfcf800, 0xffffbd00, 0xbcfcfc7c, 0xf8fcfc00],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x10,40.000000,attributes[0],1,null,autohelperowl_defendpat339,3,1.600000],
[owl_defendpat340,2,8, "D1300",0,0,2,1,2,1,0x0,722,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00180024, 0x00102000, 0x00900000, 0x21120000, 0x20100000, 0x00180000, 0x00122100, 0x00900060]
  , 0x6000,90.000000,attributes[0],1,null,autohelperowl_defendpat340,0,1.810000],
[owl_defendpat341,2,8, "D1300b",0,0,2,1,2,1,0x0,685,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00180024, 0x00102000, 0x00900000, 0x21120000, 0x20100000, 0x00180000, 0x00122100, 0x00900060]
  , 0x6000,89.000000,attributes[0],1,null,autohelperowl_defendpat341,0,1.810000],
[owl_defendpat342,2,8, "D1301",0,-1,2,2,2,3,0x0,685,
  [ 0x003cffff, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0f, 0x00f0fcfc],
  [ 0x00204100, 0x40200040, 0x04200000, 0x00200400, 0x00204000, 0x41200000, 0x04200004, 0x00200400]
  , 0x4000,90.000000,attributes[0],1,null,autohelperowl_defendpat342,3,0.592000],
[owl_defendpat343,4,8, "D1301b",0,-1,2,2,2,3,0x0,685,
  [ 0x0038ffd8, 0xc0f0e0c0, 0xfcb00000, 0x2e3d0f00, 0xe0f0c000, 0xff380000, 0x0f3d2e0c, 0x00b0fc9c],
  [ 0x00204100, 0x40200040, 0x04200000, 0x00200400, 0x00204000, 0x41200000, 0x04200004, 0x00200400]
  , 0x4000,90.000000,attributes[0],1,null,autohelperowl_defendpat343,3,3.616000],
[owl_defendpat344,2,8, "D1302",0,-1,2,1,2,2,0x0,685,
  [ 0x00f0fcc0, 0xf0f0c000, 0xfc3c0000, 0x0c3c3f00, 0xc0f0f000, 0xfcf00000, 0x3f3c0c00, 0x003cfc0c],
  [ 0x00600400, 0x10204000, 0x40240000, 0x04201000, 0x40201000, 0x04600000, 0x10200400, 0x00244000]
  , 0x4000,80.000000,attributes[0],1,null,autohelperowl_defendpat344,3,0.151360],
[owl_defendpat345,8,4, "D1303",-2,0,2,4,4,4,0x0,758,
  [ 0x2a3f0f03, 0x0038f8f8, 0xc0f0a000, 0xbcb00000, 0xf8380000, 0x0f3f2a00, 0x00b0bcbf, 0xa0f0c000],
  [ 0x00200402, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200402, 0x00204000]
  , 0x2000,80.000000,attributes[0],1,null,autohelperowl_defendpat345,3,0.019600],
[owl_defendpat346,10,4, "D1304",-2,0,2,4,4,4,0x0,758,
  [ 0x3f3f0f03, 0x003efefe, 0xc0f0f0a0, 0xfcf00000, 0xfe3e0000, 0x0f3f3f2a, 0x00f0fcff, 0xf0f0c000],
  [ 0x00200402, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200402, 0x00204000]
  , 0x2000,80.000000,attributes[0],1,null,autohelperowl_defendpat346,3,0.019600],
[owl_defendpat347,6,8, "D1305",-3,-2,1,1,4,3,0x0,647,
  [ 0xdcfcfcf0, 0xfcf4fc00, 0xfefede00, 0xfc7fffaa, 0xfcf4fca8, 0xfcfcdc00, 0xff7ffc00, 0xdefefe3e],
  [ 0x08100420, 0x00104800, 0x40108000, 0x84120000, 0x48100000, 0x04100800, 0x00128400, 0x80104020]
  , 0x2000,75.000000,attributes[0],1,null,autohelperowl_defendpat347,0,0.019600],
[owl_defendpat348,4,8, "D1306",-1,-1,2,2,3,3,0x0,647,
  [ 0x80f4fcf0, 0xf8f0d000, 0xff7f0a00, 0x1c3fbfbf, 0xd0f0f8f8, 0xfcf48000, 0xbf3f1c00, 0x0a7fff3f],
  [ 0x00204810, 0x40208000, 0x84200000, 0x08210402, 0x80204000, 0x48200000, 0x04210800, 0x00208412]
  , 0x2000,79.000000,attributes[0],1,null,autohelperowl_defendpat348,3,0.016000],
[owl_defendpat349,5,8, "D1307",-2,-2,1,2,3,4,0x0,720,
  [ 0x3efcfc34, 0xf0fcfe0a, 0xfcfcf080, 0xfdff3c00, 0xfefcf000, 0xfcfc3e0a, 0x3cfffd80, 0xf0fcfc70],
  [ 0x00104820, 0x40108000, 0x84100000, 0x08120400, 0x80104000, 0x48100000, 0x04120800, 0x00108420]
  , 0x2000,80.000000,attributes[0],1,null,autohelperowl_defendpat349,0,0.010000],
[owl_defendpat350,6,8, "D1308",-1,0,2,4,3,4,0x2,758,
  [ 0x2a3f3f3f, 0x00f8f8f8, 0xf0f0a000, 0xbfbf0000, 0xf8f80000, 0x3f3f2a00, 0x00bfbfbf, 0xa0f0f0f0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x2000,75.000000,attributes[0],1,null,autohelperowl_defendpat350,0,0.016000],
[owl_defendpat351,5,8, "D1309",-1,0,2,4,3,4,0x2,795,
  [ 0x2b3f3f3f, 0x00f8f8fc, 0xf0f0a000, 0xbfbf0000, 0xf8f80000, 0x3f3f2b00, 0x00bfbfff, 0xa0f0f0f0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x2000,81.000000,attributes[0],1,null,autohelperowl_defendpat351,0,0.016000],
[owl_defendpat352,7,8, "D1309b",-2,0,2,4,4,4,0x2,757,
  [ 0x2f3f3f3f, 0x00f8fefe, 0xf0f0e080, 0xffbf0000, 0xfef80000, 0x3f3f2f0a, 0x00bfffff, 0xe0f0f0f0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x2000,82.000000,attributes[0],1,null,autohelperowl_defendpat352,0,0.016000],
[owl_defendpat353,9,8, "D1310",-2,0,1,3,3,3,0x0,721,
  [ 0x0a3e0f00, 0x0030faea, 0xc0f08080, 0xbc300000, 0xfa300000, 0x0f3e0a0a, 0x0030bcac, 0x80f0c000],
  [ 0x00200600, 0x00204080, 0x40200000, 0x04200000, 0x40200000, 0x06200000, 0x00200408, 0x00204000]
  , 0x2000,80.000000,attributes[0],1,null,autohelperowl_defendpat353,3,0.023056],
[owl_defendpat354,9,8, "D1311",-3,-1,0,2,3,3,0x0,721,
  [ 0x1e3f3e0a, 0x00f4fcb8, 0xf0f0d000, 0xfe7c0000, 0xfcf40000, 0x3e3f1e00, 0x007cfeba, 0xd0f0f080],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x2000,80.000000,attributes[0],1,null,autohelperowl_defendpat354,0,0.019600],
[owl_defendpat355,9,8, "D1312",-4,-2,0,2,4,4,0x0,722,
  [ 0x003cffff, 0xc0f0f0c0, 0xfef00000, 0x3f3f0f0a, 0xf0f0c080, 0xff3c0000, 0x0f3f3f0f, 0x00f0fefe],
  [ 0x00240200, 0x00201080, 0x00600000, 0x10200000, 0x10200000, 0x02240000, 0x00201008, 0x00600000]
  , 0x2000,80.000000,attributes[0],1,null,autohelperowl_defendpat355,3,0.019600],
[owl_defendpat356,2,8, "D1313",-1,0,2,3,3,3,0x0,686,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00140000, 0x00101000, 0x00500000, 0x10100000, 0x10100000, 0x00140000, 0x00101000, 0x00500000]
  , 0x2000,55.000000,attributes[0],1,null,autohelperowl_defendpat356,0,0.016000],
[owl_defendpat357,4,8, "D1314",-1,-2,4,1,5,3,0x0,796,
  [ 0x3fbfffbf, 0xe0fcfcfc, 0xfcf8f000, 0xffff2e00, 0xfcfce000, 0xffbf3f00, 0x2effffff, 0xf0f8fcf8],
  [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
  , 0x2000,55.000000,attributes[0],1,null,autohelperowl_defendpat357,0,0.010000],
[owl_defendpat358,6,8, "D1315",-1,0,3,2,4,2,0x0,759,
  [ 0x00bfffbf, 0xe0f0f0f0, 0xfcf80000, 0x3f3f2e00, 0xf0f0e000, 0xffbf0000, 0x2e3f3f3f, 0x00f8fcf8],
  [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
  , 0x2000,50.000000,attributes[0],1,null,autohelperowl_defendpat358,0,0.016000],
[owl_defendpat359,2,8, "D1316",0,0,1,1,1,1,0x0,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00102400, 0x00904000, 0x60100000, 0x04180000, 0x40900000, 0x24100000, 0x00180400, 0x00106000]
  , 0x20,35.000000,attributes[0],1,null,autohelperowl_defendpat359,0,0.010000],
[owl_defendpat360,2,8, "D1316b",0,0,1,1,1,1,0x0,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00102400, 0x00904000, 0x60100000, 0x04180000, 0x40900000, 0x24100000, 0x00180400, 0x00106000]
  , 0x20,90.000000,attributes[0],1,null,autohelperowl_defendpat360,0,0.010000],
[owl_defendpat361,4,8, "D1317",-1,-3,2,0,3,3,0x0,685,
  [ 0x00fffffc, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3c, 0x00fcfcfc],
  [ 0x00920200, 0x201000a0, 0x00180000, 0x00102000, 0x00102000, 0x02920000, 0x20100028, 0x00180000]
  , 0x2000,90.000000,attributes[0],1,null,autohelperowl_defendpat361,0,0.010000],
[owl_defendpat362,1,8, "D1318",-3,-5,0,0,3,5,0x0,722,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat362,0,0.023056],
[owl_defendpat363,9,8, "D1319",-4,-1,2,1,6,2,0x2,686,
  [ 0xa8b8fcfc, 0xeafaea00, 0xfcb8a8a8, 0xafbfaf00, 0xeafaea00, 0xfcb8a8a8, 0xafbfaf00, 0xa8b8fcfc],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,82.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat364,2,2, "D1320",0,0,0,2,0,2,0x0,685,
  [ 0x00303030, 0x00f00000, 0x30300000, 0x003f0000, 0x00f00000, 0x30300000, 0x003f0000, 0x00303030],
  [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
  , 0x20,35.000000,attributes[0],1,null,autohelperowl_defendpat364,0,0.016000],
[owl_defendpat365,2,8, "D1320a",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00108010, 0x80100000, 0x08100000, 0x00110800, 0x00108000, 0x80100000, 0x08110000, 0x00100810]
  , 0x20,70.000000,attributes[0],1,null,autohelperowl_defendpat365,0,1.096000],
[owl_defendpat366,2,2, "D1320b",0,0,0,2,0,2,0x0,685,
  [ 0x00303030, 0x00f00000, 0x30300000, 0x003f0000, 0x00f00000, 0x30300000, 0x003f0000, 0x00303030],
  [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
  , 0x20,90.000000,attributes[0],1,null,autohelperowl_defendpat366,0,0.016000],
[owl_defendpat367,3,8, "D1321",-1,0,0,2,1,2,0x0,721,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00100014, 0x00100000, 0x00100000, 0x01110000, 0x00100000, 0x00100000, 0x00110100, 0x00100050]
  , 0x4020,36.000000,attributes[0],1,null,autohelperowl_defendpat367,0,0.016000],
[owl_defendpat368,3,8, "D1321b",-1,0,0,2,1,2,0x0,721,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00100014, 0x00100000, 0x00100000, 0x01110000, 0x00100000, 0x00100000, 0x00110100, 0x00100050]
  , 0x4020,91.000000,attributes[0],1,null,autohelperowl_defendpat368,0,0.016000],
[owl_defendpat369,3,8, "D1322",-1,-1,0,1,1,2,0x0,721,
  [ 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000],
  [ 0x10201400, 0x00644000, 0x50201000, 0x04640000, 0x40640000, 0x14201000, 0x00640400, 0x10205000]
  , 0x4020,36.000000,attributes[0],1,null,autohelperowl_defendpat369,3,0.021760],
[owl_defendpat370,2,2, "D1323",0,0,0,2,0,2,0x0,685,
  [ 0x00303030, 0x00f00000, 0x30300000, 0x003f0000, 0x00f00000, 0x30300000, 0x003f0000, 0x00303030],
  [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
  , 0x2020,35.000000,attributes[0],1,null,autohelperowl_defendpat370,0,0.016000],
[owl_defendpat371,2,8, "D1323a",-1,-1,1,1,2,2,0x0,685,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00108400, 0x80104000, 0x48100000, 0x04100800, 0x40108000, 0x84100000, 0x08100400, 0x00104800]
  , 0x2020,55.000000,attributes[0],1,null,autohelperowl_defendpat371,0,0.235600],
[owl_defendpat372,3,8, "D1324",-1,0,0,2,1,2,0x0,721,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00100014, 0x00100000, 0x00100000, 0x01110000, 0x00100000, 0x00100000, 0x00110100, 0x00100050]
  , 0x6020,86.000000,attributes[0],1,null,autohelperowl_defendpat372,0,0.016000],
[owl_defendpat373,3,8, "D1325",-1,-1,0,1,1,2,0x0,721,
  [ 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000],
  [ 0x10201400, 0x00644000, 0x50201000, 0x04640000, 0x40640000, 0x14201000, 0x00640400, 0x10205000]
  , 0x6020,86.000000,attributes[0],1,null,autohelperowl_defendpat373,3,0.021760],
[owl_defendpat374,2,2, "D1326",0,0,0,2,0,2,0x0,685,
  [ 0x00303030, 0x00f00000, 0x30300000, 0x003f0000, 0x00f00000, 0x30300000, 0x003f0000, 0x00303030],
  [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
  , 0x2000,35.000000,attributes[0],1,null,autohelperowl_defendpat374,0,0.016000],
[owl_defendpat375,3,8, "D1329",-1,0,1,4,2,4,0x0,686,
  [ 0x00b8fcfc, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0x00b8fcfc],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x0,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat376,5,8, "D1330",0,-1,3,2,3,3,0x0,685,
  [ 0x003dffff, 0xc0f0f0d0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3d0000, 0x0f3f3f1f, 0x00f0fcfc],
  [ 0x00108200, 0x80100080, 0x08100000, 0x00100800, 0x00108000, 0x82100000, 0x08100008, 0x00100800]
  , 0x2000,90.000000,attributes[0],1,null,autohelperowl_defendpat376,0,1.810000],
[owl_defendpat377,6,8, "D1331",-1,-1,2,2,3,3,0x0,722,
  [ 0x3efefe7e, 0xf0fcfca8, 0xfcfcf000, 0xffff3d00, 0xfcfcf000, 0xfefe3e00, 0x3dffffaa, 0xf0fcfcf4],
  [ 0x20580020, 0x10182000, 0x00942000, 0x20921000, 0x20181000, 0x00582000, 0x10922000, 0x20940020]
  , 0x2200,90.000000,attributes[0],1,null,autohelperowl_defendpat377,0,1.810000],
[owl_defendpat378,7,8, "D1332",-1,-1,2,2,3,3,0x0,721,
  [ 0x31ff7faa, 0x70fcf0f4, 0xf4fc3000, 0x3efe3600, 0xf0fc7000, 0x7fff3100, 0x36fe3e7e, 0x30fcf4a8],
  [ 0x10922400, 0x20944020, 0x60181000, 0x04582000, 0x40942000, 0x24921000, 0x20580420, 0x10186000]
  , 0x2000,95.000000,attributes[0],1,null,autohelperowl_defendpat378,0,0.010000],
[owl_defendpat379,6,8, "D1333",-1,-1,2,1,3,2,0x0,648,
  [ 0x30fcfca8, 0xf0fcf000, 0xfcfc3000, 0x3efe3e00, 0xf0fcf000, 0xfcfc3000, 0x3efe3e00, 0x30fcfca8],
  [ 0x10982400, 0x20946000, 0x60981000, 0x24582000, 0x60942000, 0x24981000, 0x20582400, 0x10986000]
  , 0x2200,90.000000,attributes[0],1,null,autohelperowl_defendpat379,0,1.096000],
[owl_defendpat380,4,8, "D1333b",-1,-1,2,1,3,2,0x0,722,
  [ 0x30fcfc30, 0xf0fcf000, 0xfcfc3000, 0x3cff3c00, 0xf0fcf000, 0xfcfc3000, 0x3cff3c00, 0x30fcfc30],
  [ 0x10986010, 0x60942000, 0x24981000, 0x20592400, 0x20946000, 0x60981000, 0x24592000, 0x10982410]
  , 0x2000,90.000000,attributes[0],1,null,autohelperowl_defendpat380,0,0.016000],
[owl_defendpat381,5,4, "D1334",-1,-1,1,1,2,2,0x0,683,
  [ 0xb8fcfc00, 0xf8fcf800, 0xfcfcb800, 0xbcfcbc00, 0xf8fcf800, 0xfcfcb800, 0xbcfcbc00, 0xb8fcfc00],
  [ 0x00649800, 0x90609000, 0x98640000, 0x18241800, 0x90609000, 0x98640000, 0x18241800, 0x00649800]
  , 0x2000,95.000000,attributes[0],1,null,autohelperowl_defendpat381,3,0.010000],
[owl_defendpat382,6,4, "D1335",-1,-1,2,2,3,3,0x0,647,
  [ 0xb0fcf0c0, 0xf8fc3000, 0x3ffe3a00, 0x30fcbfac, 0x30fcf8e8, 0xf0fcb000, 0xbffc3000, 0x3afe3f0c],
  [ 0x00249040, 0x80601000, 0x18600000, 0x10240900, 0x10608000, 0x90240000, 0x09241000, 0x00601804]
  , 0x2200,95.000000,attributes[0],1,null,autohelperowl_defendpat382,3,0.019600],
[owl_defendpat383,5,8, "D1336",-1,-1,1,1,2,2,0x0,647,
  [ 0xbcfcf800, 0xf8fcbc00, 0xbcfcf800, 0xf8fcbc00, 0xbcfcf800, 0xf8fcbc00, 0xbcfcf800, 0xf8fcbc00],
  [ 0x18249000, 0x80641800, 0x18609000, 0x90640800, 0x18648000, 0x90241800, 0x08649000, 0x90601800]
  , 0x2000,95.000000,attributes[0],1,null,autohelperowl_defendpat383,3,0.010000],
[owl_defendpat384,6,8, "D1337",0,-1,3,2,3,3,0x0,723,
  [ 0x003cffff, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0f, 0x00f0fcfc],
  [ 0x00148200, 0x80101080, 0x08500000, 0x10100800, 0x10108000, 0x82140000, 0x08101008, 0x00500800]
  , 0x2200,90.000000,attributes[0],1,null,autohelperowl_defendpat384,0,1.810000],
[owl_defendpat385,7,8, "D1338",-1,-2,2,1,3,3,0x0,685,
  [ 0x3efefe3e, 0xf0fcfca8, 0xfcfcf000, 0xffff3c00, 0xfcfcf000, 0xfefe3e00, 0x3cffffaa, 0xf0fcfcf0],
  [ 0x20644020, 0x50281000, 0x04642000, 0x10a21400, 0x10285000, 0x40642000, 0x14a21000, 0x20640420]
  , 0x2000,90.000000,attributes[0],1,null,autohelperowl_defendpat385,3,1.810000],
[owl_defendpat386,4,4, "D1339",-1,0,1,2,2,2,0x0,685,
  [ 0x00b0fcb0, 0xe0f0c000, 0xfc380000, 0x0c3f2e00, 0xc0f0e000, 0xfcb00000, 0x2e3f0c00, 0x0038fc38],
  [ 0x00204420, 0x40204000, 0x44200000, 0x04220400, 0x40204000, 0x44200000, 0x04220400, 0x00204420]
  , 0x2000,93.000000,attributes[0],1,null,autohelperowl_defendpat386,3,0.010000],
[owl_defendpat387,3,8, "D1340",-1,-1,1,2,2,3,0x2,721,
  [ 0xbcffff00, 0xf8fcfcf0, 0xfcfcf800, 0xfcfcbc00, 0xfcfcf800, 0xffffbc00, 0xbcfcfc3c, 0xf8fcfc00],
  [ 0x08610000, 0x10200810, 0x00248000, 0x80201000, 0x08201000, 0x00610800, 0x10208010, 0x80240000]
  , 0x6000,85.000000,attributes[0],1,null,autohelperowl_defendpat387,3,1.412800],
[owl_defendpat388,4,8, "D1341",0,-1,3,2,3,3,0x0,685,
  [ 0x0030fffc, 0xc0f0c0c0, 0xfc300000, 0x0f3f0f00, 0xc0f0c000, 0xff300000, 0x0f3f0f0c, 0x0030fcfc],
  [ 0x00108200, 0x80100080, 0x08100000, 0x00100800, 0x00108000, 0x82100000, 0x08100008, 0x00100800]
  , 0x2000,60.000000,attributes[0],1,null,autohelperowl_defendpat388,0,0.010000],
[owl_defendpat389,3,8, "D1342",-2,-1,1,2,3,3,0x2,685,
  [ 0xf8fcfcfc, 0xfcfcf800, 0xfcffbf00, 0xbffffff0, 0xf8fcfc3c, 0xfcfcf800, 0xffffbf00, 0xbffffcfc],
  [ 0x00248408, 0x80205000, 0x48600000, 0x16200800, 0x50208000, 0x84240000, 0x08201600, 0x00604880]
  , 0x0,60.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat390,6,8, "D1343a",-1,-3,2,0,3,3,0x0,722,
  [ 0x003fbfbd, 0x80f0f0f0, 0xf8f00000, 0x3f3f0a00, 0xf0f08000, 0xbf3f0000, 0x0a3f3f3d, 0x00f0f8f8],
  [ 0x00210000, 0x00200010, 0x00200000, 0x00200000, 0x00200000, 0x00210000, 0x00200010, 0x00200000]
  , 0x2000,77.000000,attributes[0],1,null,autohelperowl_defendpat390,3,0.016000],
[owl_defendpat391,8,8, "D1343b",-3,-1,0,2,3,3,0x0,722,
  [ 0x003bbebf, 0x80f0e0b0, 0xf8b00000, 0x2f3f0a00, 0xe0f08000, 0xbe3b0000, 0x0a3f2f3b, 0x00b0f8f8],
  [ 0x00210002, 0x00200010, 0x00200000, 0x00200000, 0x00200000, 0x00210000, 0x00200012, 0x00200000]
  , 0x2000,60.000000,attributes[0],1,null,autohelperowl_defendpat391,3,0.016000],
[owl_defendpat392,8,8, "D1343c",-1,-3,2,0,3,3,0x0,723,
  [ 0x003bbebf, 0x80f0e0b0, 0xf8b00000, 0x2f3f0a00, 0xe0f08000, 0xbe3b0000, 0x0a3f2f3b, 0x00b0f8f8],
  [ 0x00210000, 0x00200010, 0x00200000, 0x00200000, 0x00200000, 0x00210000, 0x00200010, 0x00200000]
  , 0x2000,60.000000,attributes[0],1,null,autohelperowl_defendpat392,3,0.019600],
[owl_defendpat393,6,8, "D1343d",-1,-3,2,0,3,3,0x0,723,
  [ 0x003fbfbf, 0x80f0f0f0, 0xf8f00000, 0x3f3f0a00, 0xf0f08000, 0xbf3f0000, 0x0a3f3f3f, 0x00f0f8f8],
  [ 0x00210000, 0x00200010, 0x00200000, 0x00200000, 0x00200000, 0x00210000, 0x00200010, 0x00200000]
  , 0x2200,55.000000,attributes[0],1,null,autohelperowl_defendpat393,3,0.016000],
[owl_defendpat394,5,8, "D1344",-1,-1,1,3,2,4,0x2,685,
  [ 0x28fcfc3c, 0xf0f8f800, 0xfcfca000, 0xbfbf3c00, 0xf8f8f000, 0xfcfc2800, 0x3cbfbf00, 0xa0fcfcf0],
  [ 0x00908000, 0xa0100000, 0x08180000, 0x00102800, 0x0010a000, 0x80900000, 0x28100000, 0x00180800]
  , 0x2000,85.000000,attributes[0],1,null,autohelperowl_defendpat394,0,0.010000],
[owl_defendpat395,2,8, "D1345",0,-1,1,1,1,2,0x0,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00640000, 0x10201000, 0x00640000, 0x10201000, 0x10201000, 0x00640000, 0x10201000, 0x00640000]
  , 0x6800,85.000000,attributes[0],1,null,autohelperowl_defendpat395,3,0.800656],
[owl_defendpat396,5,8, "D1346",0,-1,3,2,3,3,0x0,722,
  [ 0x003fff7f, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0d00, 0xf0f0c000, 0xff3f0000, 0x0d3f3f3f, 0x00f0fcf4],
  [ 0x00128000, 0x80100020, 0x08100000, 0x00100800, 0x00108000, 0x80120000, 0x08100020, 0x00100800]
  , 0x2000,65.000000,attributes[0],1,null,autohelperowl_defendpat396,0,0.019600],
[owl_defendpat397,2,8, "D1347",-1,-1,1,1,2,2,0x2,721,
  [ 0xf0fcfc00, 0xfcfcf000, 0xfcfc3c00, 0x3cfcfc00, 0xf0fcfc00, 0xfcfcf000, 0xfcfc3c00, 0x3cfcfc00],
  [ 0x60900000, 0x24180000, 0x00182400, 0x00906000, 0x00182400, 0x00906000, 0x60900000, 0x24180000]
  , 0x4000,75.000000,attributes[0],1,null,autohelperowl_defendpat397,0,1.000000],
[owl_defendpat398,2,8, "D1348",0,0,1,2,1,2,0x0,722,
  [ 0x003c3c0c, 0x00f0f000, 0xf0f00000, 0x3f3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3f00, 0x00f0f0c0],
  [ 0x00100004, 0x00100000, 0x00100000, 0x01100000, 0x00100000, 0x00100000, 0x00100100, 0x00100040]
  , 0x6020,36.000000,attributes[0],1,null,autohelperowl_defendpat398,0,0.016000],
[owl_defendpat399,2,8, "D1348b",0,0,1,2,1,2,0x0,722,
  [ 0x003c3c0c, 0x00f0f000, 0xf0f00000, 0x3f3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3f00, 0x00f0f0c0],
  [ 0x00100004, 0x00100000, 0x00100000, 0x01100000, 0x00100000, 0x00100000, 0x00100100, 0x00100040]
  , 0x6020,90.000000,attributes[0],1,null,autohelperowl_defendpat399,0,0.016000],
[owl_defendpat400,2,8, "D1348c",0,0,1,2,1,2,0x0,722,
  [ 0x003c1c1c, 0x0070f000, 0xd0f00000, 0x3f350000, 0xf0700000, 0x1c3c0000, 0x00353f00, 0x00f0d0d0],
  [ 0x00100004, 0x00100000, 0x00100000, 0x01100000, 0x00100000, 0x00100000, 0x00100100, 0x00100040]
  , 0x6020,90.000000,attributes[0],1,null,autohelperowl_defendpat400,0,3.616000],
[owl_defendpat401,2,8, "D1348d",0,0,2,2,2,2,0x0,722,
  [ 0x003c3f0f, 0x00f0f0c0, 0xf0f00000, 0x3f3c0000, 0xf0f00000, 0x3f3c0000, 0x003c3f0f, 0x00f0f0c0],
  [ 0x00100001, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100001, 0x00100000]
  , 0x6020,90.000000,attributes[0],1,null,autohelperowl_defendpat401,0,0.016000],
[owl_defendpat402,2,8, "D1350",-1,-1,0,2,1,3,0x0,721,
  [ 0x303c3c3c, 0x00fcf000, 0xf0f03000, 0x3fff0000, 0xf0fc0000, 0x3c3c3000, 0x00ff3f00, 0x30f0f0f0],
  [ 0x10201000, 0x00640000, 0x10201000, 0x00640000, 0x00640000, 0x10201000, 0x00640000, 0x10201000]
  , 0x2000,85.000000,attributes[0],1,null,autohelperowl_defendpat402,3,0.021760],
[owl_defendpat403,2,8, "D1351",0,-1,2,1,2,2,0x0,685,
  [ 0x003cfc38, 0xc0f0f000, 0xfcf00000, 0x3e3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3e00, 0x00f0fcb0],
  [ 0x00188000, 0x80102000, 0x08900000, 0x20100800, 0x20108000, 0x80180000, 0x08102000, 0x00900800]
  , 0x2000,65.000000,attributes[0],1,null,autohelperowl_defendpat403,0,0.010000],
[owl_defendpat404,3,8, "D1352",0,-2,1,1,1,3,0x0,721,
  [ 0x3c3c3c00, 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00, 0xf0f0f000],
  [ 0x00102400, 0x00914000, 0x60100010, 0x04180000, 0x40910000, 0x24100010, 0x00180400, 0x00106000]
  , 0x4000,80.000000,attributes[0],1,null,autohelperowl_defendpat404,0,1.810000],
[owl_defendpat405,1,8, "D1353",-2,-1,1,2,3,3,0x2,647,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xffffffff],
  [ 0x10200000, 0x00240000, 0x00201200, 0x00600080, 0x00240008, 0x00201000, 0x00600000, 0x12200000]
  , 0x0,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat406,3,8, "D1354",-3,-2,0,2,3,4,0x0,758,
  [ 0x3f3f3f0c, 0x00fcfdfc, 0xf0f0f040, 0xfffc0000, 0xfdfc0000, 0x3f3f3f04, 0x00fcfffc, 0xf0f0f0c0],
  [ 0x10101008, 0x00540000, 0x10101000, 0x02540000, 0x00540000, 0x10101000, 0x00540200, 0x10101080]
  , 0x2000,65.000000,attributes[0],1,null,autohelperowl_defendpat406,0,0.019600],
[owl_defendpat407,3,8, "D1355",0,-1,1,2,1,3,0x2,722,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00691000, 0x10602010, 0x10a40000, 0x20241000, 0x20601000, 0x10690000, 0x10242010, 0x00a41000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_defendpat407,3,0.016000],
[owl_defendpat408,3,4, "D1356",-1,0,1,4,2,4,0x0,686,
  [ 0x00b8fcfc, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0x00b8fcfc],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x2000,90.000000,attributes[0],1,null,autohelperowl_defendpat408,0,2.179600],
[owl_defendpat409,3,4, "D1356a",-1,0,1,4,2,4,0x0,686,
  [ 0x00b8fcfc, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0x00b8fcfc],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x2200,80.000000,attributes[0],1,null,autohelperowl_defendpat409,0,2.179600],
[owl_defendpat410,2,8, "D1356b",-1,0,2,4,3,4,0x2,795,
  [ 0x0f3f2f3f, 0x00b0fcfc, 0xe0f0c000, 0xff3b0000, 0xfcb00000, 0x2f3f0f00, 0x003bffff, 0xc0f0e0f0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x2000,91.000000,attributes[0],1,null,autohelperowl_defendpat410,0,2.179600],
[owl_defendpat411,7,8, "D1357",-3,-2,0,2,3,4,0x0,685,
  [ 0x00feffff, 0xf0f0f0e0, 0xfffc0000, 0x3f3f3f0f, 0xf0f0f0c0, 0xfffe0000, 0x3f3f3f2f, 0x00fcffff],
  [ 0x00640000, 0x10201000, 0x01640000, 0x10201005, 0x10201040, 0x00640000, 0x10201000, 0x00640101]
  , 0x2000,61.000000,attributes[0],1,null,autohelperowl_defendpat411,3,0.019600],
[owl_defendpat412,3,8, "D1358",0,0,1,3,1,3,0x0,759,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00101000, 0x00500000, 0x10100000, 0x00140000, 0x00500000, 0x10100000, 0x00140000, 0x00101000]
  , 0x6000,61.000000,attributes[0],1,null,autohelperowl_defendpat412,0,1.096000],
[owl_defendpat413,3,8, "D1359",-2,-3,2,1,4,4,0x0,721,
  [ 0xffffff2f, 0xfcffffff, 0xfcfcfcf0, 0xfffefc00, 0xfffffc00, 0xffffff3f, 0xfcfeffff, 0xfcfcfce0],
  [ 0x00209004, 0x80600000, 0x18200000, 0x01240800, 0x00608000, 0x90200000, 0x08240100, 0x00201840]
  , 0x2000,65.000000,attributes[0],1,null,autohelperowl_defendpat413,3,0.019600],
[owl_defendpat414,2,8, "D1360",-2,-1,2,2,4,3,0x0,720,
  [ 0xfffffdfd, 0xfcfcff7f, 0xfcfcfcc0, 0xffffff00, 0xfffcfc00, 0xfdffff0f, 0xfffffff5, 0xfcfcfcfc],
  [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
  , 0x2000,65.000000,attributes[0],1,null,autohelperowl_defendpat414,0,0.019600],
[owl_defendpat415,2,8, "D1361a",-1,0,1,2,2,2,0x0,721,
  [ 0x3f3f0e00, 0x003cfcbc, 0xc0f0f000, 0xfcf00000, 0xfc3c0000, 0x0e3f3f00, 0x00f0fcf8, 0xf0f0c000],
  [ 0x22100800, 0x00188008, 0x80102000, 0x08900000, 0x80180000, 0x08102200, 0x00900880, 0x20108000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat415,0,0.021760],
[owl_defendpat416,1,8, "D1361b",-1,0,1,2,2,2,0x0,721,
  [ 0x3f3f0f00, 0x003cfcfc, 0xc0f0f000, 0xfcf00000, 0xfc3c0000, 0x0f3f3f00, 0x00f0fcfc, 0xf0f0c000],
  [ 0x22100a00, 0x00188088, 0x80102000, 0x08900000, 0x80180000, 0x0a102200, 0x00900888, 0x20108000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_defendpat416,0,1.317760],
[owl_defendpat417,2,8, "D1362",-2,0,2,3,4,3,0x2,757,
  [ 0x0f3f2f3f, 0x00b0ffff, 0xe0f0c0c0, 0xff3b0000, 0xffb00000, 0x2f3f0f0f, 0x003bffff, 0xc0f0e0f0],
  [ 0x00100000, 0x00100200, 0x00100080, 0x00100000, 0x02100000, 0x00100008, 0x00100000, 0x00100000]
  , 0x0,85.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat418,4,8, "D1363",-2,-1,2,2,4,3,0x0,647,
  [ 0xfcffff3f, 0xfcfcfcf0, 0xfffffe00, 0xfffffcbc, 0xfcfcfcf8, 0xfffffc00, 0xfcffff3f, 0xfefffff0],
  [ 0x00201810, 0x00608000, 0x92210000, 0x08250018, 0x80600090, 0x18200000, 0x00250800, 0x00219210]
  , 0x200,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat419,3,8, "D1364",-1,-1,2,2,3,3,0x0,685,
  [ 0xfcffff3f, 0xfcfcfcf0, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc00, 0xfffffc00, 0xfcffff3f, 0xfcfcfcf0],
  [ 0x18250800, 0x00249810, 0x80609000, 0x98600000, 0x98240000, 0x08251800, 0x00609810, 0x90608000]
  , 0x200,85.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat420,4,8, "D1365",-1,-1,2,1,3,2,0x0,648,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x24582400, 0x10986400, 0x60946000, 0x64981000, 0x64981000, 0x24582400, 0x10986400, 0x60946000]
  , 0x200,85.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat421,6,8, "D1366",-2,-1,2,2,4,3,0x0,685,
  [ 0xbfffffd0, 0xf8fcfcfc, 0xfffef800, 0xfcfdbf2f, 0xfcfcf8e0, 0xffffbf00, 0xbffdfcfc, 0xf8feff1f],
  [ 0x06290500, 0x00206458, 0x40a04000, 0x64200000, 0x64200000, 0x05290600, 0x00206494, 0x40a04000]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_defendpat421,3,0.010000],
[owl_defendpat422,2,8, "D1367",-3,-1,0,2,3,3,0x0,758,
  [ 0x0f3f3f0c, 0x00f0fcfc, 0xf0f0c000, 0xff3c0000, 0xfcf00000, 0x3f3f0f00, 0x003cfffc, 0xc0f0f0c0],
  [ 0x00101008, 0x00500000, 0x10100000, 0x02140000, 0x00500000, 0x10100000, 0x00140200, 0x00101080]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat423,3,8, "D1368",-1,-2,2,1,3,3,0x0,647,
  [ 0xf0f0fce0, 0xfcfcc000, 0xff3f3f00, 0x0cfeffff, 0xc0fcfcfc, 0xfcf0f000, 0xfffe0c00, 0x3f3fff2f],
  [ 0x00201840, 0x00608000, 0x90200000, 0x08240102, 0x80600000, 0x18200000, 0x01240800, 0x00209006]
  , 0x2000,70.000000,attributes[0],1,null,autohelperowl_defendpat423,3,0.016000],
[owl_defendpat424,3,8, "D1370",-1,-2,2,0,3,2,0x0,722,
  [ 0x003cbfbf, 0x80f0f0c0, 0xf8f00000, 0x3f3f0a00, 0xf0f08000, 0xbf3c0000, 0x0a3f3f0f, 0x00f0f8f8],
  [ 0x00200102, 0x00200040, 0x00200000, 0x00200000, 0x00200000, 0x01200000, 0x00200006, 0x00200000]
  , 0x2000,75.000000,attributes[0],1,null,autohelperowl_defendpat424,3,0.016000],
[owl_defendpat425,4,8, "D1371",0,-1,3,1,3,2,0x0,686,
  [ 0x00b8fcfc, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0xe0f0e000, 0xfcb80000, 0x2f3f2f00, 0x00b8fcfc],
  [ 0x00100008, 0x00100000, 0x00100000, 0x02100000, 0x00100000, 0x00100000, 0x00100200, 0x00100080]
  , 0x2800,85.000000,attributes[0],1,null,autohelperowl_defendpat425,0,0.010000],
[owl_defendpat426,2,8, "D1372",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00244000, 0x40201000, 0x04600000, 0x10200400, 0x10204000, 0x40240000, 0x04201000, 0x00600400]
  , 0x2000,85.000000,attributes[0],1,null,autohelperowl_defendpat426,3,0.610000],
[owl_defendpat427,2,4, "D1373",0,-2,0,1,0,3,0x0,685,
  [ 0x30303020, 0x00fc0000, 0x30303000, 0x00fe0000, 0x00fc0000, 0x30303000, 0x00fe0000, 0x30303020],
  [ 0x10200000, 0x00240000, 0x00201000, 0x00600000, 0x00240000, 0x00201000, 0x00600000, 0x10200000]
  , 0x2800,85.000000,attributes[0],1,null,autohelperowl_defendpat427,3,0.610000],
[owl_defendpat428,4,8, "D1374",0,-4,1,1,1,5,0x2,648,
  [ 0x00f8fc00, 0xf0f0e000, 0xffbf0000, 0x2c3c3c3c, 0xe0f0f0f0, 0xfcf80000, 0x3c3c2c00, 0x00bfff00],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x2000,55.000000,attributes[0],1,null,autohelperowl_defendpat428,3,0.019600],
[owl_defendpat429,3,8, "D1375",-1,-2,1,1,2,3,0x0,721,
  [ 0x33ffff00, 0xf0fcf0fc, 0xfcfc3000, 0x3cfc3c00, 0xf0fcf000, 0xffff3300, 0x3cfc3cfc, 0x30fcfc00],
  [ 0x01601000, 0x10600004, 0x10240000, 0x00241000, 0x00601000, 0x10600100, 0x10240040, 0x00241000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_defendpat429,3,1.000000],
[owl_defendpat430,3,8, "D1376",0,-2,1,1,1,3,0x2,685,
  [ 0x003bfd00, 0xc0f0e070, 0xfcb00000, 0x2c3c0c00, 0xe0f0c000, 0xfd3b0000, 0x0c3c2c34, 0x00b0fc00],
  [ 0x00214000, 0x40200010, 0x04200000, 0x00200400, 0x00204000, 0x40210000, 0x04200010, 0x00200400]
  , 0x6000,75.000000,attributes[0],1,null,autohelperowl_defendpat430,3,0.902176],
[owl_defendpat431,4,8, "D1377",-1,-1,1,3,2,4,0x2,647,
  [ 0x00fcfc00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0x00ffff00],
  [ 0x00241000, 0x00601000, 0x10600000, 0x10240000, 0x10600000, 0x10240000, 0x00241000, 0x00601000]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_defendpat431,3,1.000000],
[owl_defendpat432,1,4, "D1378",-1,-1,0,1,1,2,0x0,685,
  [ 0x0030fc00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0x0030fc00],
  [ 0x00108800, 0x80108000, 0x88100000, 0x08100800, 0x80108000, 0x88100000, 0x08100800, 0x00108800]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_defendpat432,0,3.320000],
[owl_defendpat433,1,8, "D1379",-2,0,1,2,3,2,0x0,685,
  [ 0x0070fcf0, 0xd0f0c000, 0xfc340000, 0x0c3f1f00, 0xc0f0d000, 0xfc700000, 0x1f3f0c00, 0x0034fc3c],
  [ 0x00100820, 0x00108000, 0x80100000, 0x08120000, 0x80100000, 0x08100000, 0x00120800, 0x00108020]
  , 0x2000,65.000000,attributes[0],1,null,autohelperowl_defendpat433,0,0.442960],
[owl_defendpat434,1,8, "D1380",-2,0,0,2,2,2,0x0,722,
  [ 0x003c3f0f, 0x00f0f0c0, 0xf0f00000, 0x3f3c0000, 0xf0f00000, 0x3f3c0000, 0x003c3f0f, 0x00f0f0c0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x2000,65.000000,attributes[0],1,null,autohelperowl_defendpat434,0,0.019600],
[owl_defendpat435,2,8, "D1381",-1,-1,0,1,1,2,0x0,685,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00600400, 0x10204000, 0x40240000, 0x04201000, 0x40201000, 0x04600000, 0x10200400, 0x00244000]
  , 0x6000,70.000000,attributes[0],1,null,autohelperowl_defendpat435,3,1.096000],
[owl_defendpat436,2,8, "D1382",-1,-1,1,0,2,1,0x0,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00244000, 0x40201000, 0x04600000, 0x10200400, 0x10204000, 0x40240000, 0x04201000, 0x00600400]
  , 0x6000,70.000000,attributes[0],1,null,autohelperowl_defendpat436,3,0.376000],
[owl_defendpat437,2,8, "D1383",0,-1,4,1,4,2,0x0,686,
  [ 0x0038fc3c, 0xc0f0e000, 0xfcb00000, 0x2f3f0c00, 0xe0f0c000, 0xfc380000, 0x0c3f2f00, 0x00b0fcf0],
  [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
  , 0x2810,71.000000,attributes[0],1,null,autohelperowl_defendpat437,0,6.010000],
[owl_defendpat438,2,8, "D1384",0,0,2,2,2,2,0x0,722,
  [ 0x003c3f33, 0x00f0f0c0, 0xf0f00000, 0x3c3f0000, 0xf0f00000, 0x3f3c0000, 0x003f3c0f, 0x00f0f030],
  [ 0x00100001, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100001, 0x00100000]
  , 0x2000,65.000000,attributes[0],1,null,autohelperowl_defendpat438,0,0.667600],
[owl_defendpat439,2,8, "D1385",-2,0,1,1,3,1,0x0,685,
  [ 0x00f0fc00, 0xf0f0c000, 0xff3f0000, 0x0c3c3c3c, 0xc0f0f0f0, 0xfcf00000, 0x3c3c0c00, 0x003fff00],
  [ 0x00200400, 0x00204000, 0x41200000, 0x04200004, 0x40200040, 0x04200000, 0x00200400, 0x00204100]
  , 0x2000,75.000000,attributes[0],1,null,autohelperowl_defendpat439,3,0.592000],
[owl_defendpat440,3,8, "D1386a",0,-1,1,2,1,3,0x2,685,
  [ 0x00fdbf00, 0xb0f0f0d0, 0xf8fc0000, 0x3c3c3800, 0xf0f0b000, 0xbffd0000, 0x383c3c1c, 0x00fcf800],
  [ 0x00600100, 0x10200040, 0x00240000, 0x00201000, 0x00201000, 0x01600000, 0x10200004, 0x00240000]
  , 0x2800,90.000000,attributes[0],1,null,autohelperowl_defendpat440,3,0.016000],
[owl_defendpat441,3,8, "D1386b",0,-1,1,2,1,3,0x2,685,
  [ 0x00fdbf00, 0xb0f0f0d0, 0xf8fc0000, 0x3c3c3800, 0xf0f0b000, 0xbffd0000, 0x383c3c1c, 0x00fcf800],
  [ 0x00600100, 0x10200040, 0x00240000, 0x00201000, 0x00201000, 0x01600000, 0x10200004, 0x00240000]
  , 0x2800,35.000000,attributes[0],1,null,autohelperowl_defendpat441,3,0.016000],
[owl_defendpat442,4,8, "D1387",-2,-1,1,2,3,3,0x0,647,
  [ 0xbffff800, 0xf8fcbe3c, 0xbcfcf880, 0xf8fcbc00, 0xbefcf800, 0xf8ffbf08, 0xbcfcf8f0, 0xf8fcbc00],
  [ 0x00229000, 0x80600020, 0x18200000, 0x00240800, 0x00608000, 0x90220000, 0x08240020, 0x00201800]
  , 0x2200,75.000000,attributes[0],1,null,autohelperowl_defendpat442,3,0.106000],
[owl_defendpat443,5,8, "D1388",-2,-1,1,2,3,3,0x0,721,
  [ 0xbfff3800, 0x38fcbe3c, 0xb0fcf880, 0xf8fcb000, 0xbefc3800, 0x38ffbf08, 0xb0fcf8f0, 0xf8fcb000],
  [ 0x00621000, 0x10600020, 0x10240000, 0x00241000, 0x00601000, 0x10620000, 0x10240020, 0x00241000]
  , 0x2800,75.000000,attributes[0],1,null,autohelperowl_defendpat443,3,0.235600],
[owl_defendpat444,2,8, "D1389",0,-1,1,2,1,3,0x2,685,
  [ 0x00ff3c00, 0x30f0f030, 0xf0fc0000, 0x3c3c3000, 0xf0f03000, 0x3cff0000, 0x303c3c30, 0x00fcf000],
  [ 0x00610000, 0x10200010, 0x00240000, 0x00201000, 0x00201000, 0x00610000, 0x10200010, 0x00240000]
  , 0x6000,84.000000,attributes[0],1,null,autohelperowl_defendpat444,3,3.616000],
[owl_defendpat445,3,8, "D1390",-2,-1,1,3,3,4,0x2,683,
  [ 0xbfff1c00, 0x387cfc3f, 0xd0fcf800, 0xfcf4b000, 0xfc7c3800, 0x1cffbf03, 0xb0f4fcf0, 0xf8fcd000],
  [ 0x00600000, 0x10200000, 0x00240000, 0x00201000, 0x00201000, 0x00600000, 0x10200000, 0x00240000]
  , 0x800,80.000000,attributes[0],1,null,autohelperowl_defendpat445,3,5.410000],
[owl_defendpat446,3,8, "D1391",0,-1,1,2,1,3,0x0,721,
  [ 0x00fff000, 0xf0f03030, 0x3cfc0000, 0x303c3c00, 0x30f0f000, 0xf0ff0000, 0x3c3c3030, 0x00fc3c00],
  [ 0x00116000, 0x40900010, 0x24100000, 0x00180400, 0x00904000, 0x60110000, 0x04180010, 0x00102400]
  , 0x4000,80.000000,attributes[0],1,null,autohelperowl_defendpat446,0,5.410000],
[owl_defendpat447,2,8, "D1392",-1,-1,0,1,1,2,0x0,647,
  [ 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0xfcfc0000],
  [ 0x48240000, 0x04201800, 0x00608400, 0x90204000, 0x18200400, 0x00244800, 0x40209000, 0x84600000]
  , 0x800,40.000000,attributes[0],1,null,autohelperowl_defendpat447,3,0.010000],
[owl_defendpat448,3,8, "D1393",0,-2,1,1,1,3,0x0,648,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcff0000, 0x3c3c3c30, 0xf0f0f030, 0xfcfc0000, 0x3c3c3c00, 0x00fffc00],
  [ 0x00102400, 0x00904000, 0x60110000, 0x04180010, 0x40900010, 0x24100000, 0x00180400, 0x00116000]
  , 0x200,50.000000,attributes[0],1,null,autohelperowl_defendpat448,0,3.832000],
[owl_defendpat449,3,8, "D1394",0,-2,1,1,1,3,0x0,721,
  [ 0x00fc3c00, 0x30f0f000, 0xf0ff0000, 0x3c3c3030, 0xf0f03030, 0x3cfc0000, 0x303c3c00, 0x00fff000],
  [ 0x00102400, 0x00904000, 0x60110000, 0x04180010, 0x40900010, 0x24100000, 0x00180400, 0x00116000]
  , 0x4000,70.000000,attributes[0],1,null,autohelperowl_defendpat449,0,2.536000],
[owl_defendpat450,3,8, "D1395",0,-1,1,2,1,3,0x2,722,
  [ 0x003ffd00, 0xc0f0f070, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfd3f0000, 0x0c3c3c34, 0x00f0fc00],
  [ 0x00196000, 0x40902010, 0x24900000, 0x20180400, 0x20904000, 0x60190000, 0x04182010, 0x00902400]
  , 0x810,40.000000,attributes[0],1,null,autohelperowl_defendpat450,0,3.616000],
[owl_defendpat451,3,8, "D1400",-1,-2,1,1,2,3,0x1,721,
  [ 0x3fff3c00, 0x30fcfc3c, 0xf0fcf000, 0xfcfc3000, 0xfcfc3000, 0x3cff3f00, 0x30fcfcf0, 0xf0fcf000],
  [ 0x20912400, 0x20984010, 0x60182000, 0x04982000, 0x40982000, 0x24912000, 0x20980410, 0x20186000]
  , 0x0,95.000000,attributes[0],1,null,autohelperowl_defendpat451,0,0.019600],
[owl_defendpat452,3,8, "D1400b",-1,-2,1,1,2,3,0x1,720,
  [ 0x3fff3c00, 0x30fcfc3c, 0xf0fcf000, 0xfcfc3000, 0xfcfc3000, 0x3cff3f00, 0x30fcfcf0, 0xf0fcf000],
  [ 0x20912400, 0x20984010, 0x60182000, 0x04982000, 0x40982000, 0x24912000, 0x20980410, 0x20186000]
  , 0x0,95.000000,attributes[0],1,null,autohelperowl_defendpat452,0,0.010000],
[owl_defendpat453,3,8, "D1401",-1,-2,1,1,2,3,0x1,720,
  [ 0x3fff3c00, 0x30fcfc3c, 0xf0fcf000, 0xfcfc3000, 0xfcfc3000, 0x3cff3f00, 0x30fcfcf0, 0xf0fcf000],
  [ 0x20912400, 0x20984010, 0x60182000, 0x04982000, 0x40982000, 0x24912000, 0x20980410, 0x20186000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat453,0,0.016000],
[owl_defendpat454,2,8, "D1402",0,-1,1,2,1,3,0x2,722,
  [ 0x00fcff00, 0xf0f0f0c0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfffc0000, 0x3c3c3c0c, 0x00fcfc00],
  [ 0x00186200, 0x40902080, 0x24900000, 0x20180400, 0x20904000, 0x62180000, 0x04182008, 0x00902400]
  , 0x10,45.000000,attributes[0],1,null,autohelperowl_defendpat454,0,0.076160],
[owl_defendpat455,2,8, "D1403",0,-1,1,1,1,2,0xa,722,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00186000, 0x40902000, 0x24900000, 0x20180400, 0x20904000, 0x60180000, 0x04182000, 0x00902400]
  , 0x10,30.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat456,3,8, "D1404",-1,-1,1,1,2,2,0xa,685,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00],
  [ 0x58240000, 0x04241800, 0x00609400, 0x90604000, 0x18240400, 0x00245800, 0x40609000, 0x94600000]
  , 0x10,80.000000,attributes[0],1,null,autohelperowl_defendpat456,3,1.000000],
[owl_defendpat457,4,8, "D1405",-1,-1,1,1,2,2,0xa,685,
  [ 0xf8fcf400, 0xfcfc7800, 0x7cfcbc00, 0xb4fcfc00, 0x78fcfc00, 0xf4fcf800, 0xfcfcb400, 0xbcfc7c00],
  [ 0x50248000, 0x84241000, 0x08601400, 0x10604800, 0x10248400, 0x80245000, 0x48601000, 0x14600800]
  , 0x10,80.000000,attributes[0],1,null,autohelperowl_defendpat457,3,1.000000],
[owl_defendpat458,4,8, "D1405b",-1,-1,1,1,2,2,0xa,721,
  [ 0xf8fcfc00, 0xfcfcf800, 0xfcfcbc00, 0xbcfcfc00, 0xf8fcfc00, 0xfcfcf800, 0xfcfcbc00, 0xbcfcfc00],
  [ 0x50209000, 0x84640000, 0x18201400, 0x00644800, 0x00648400, 0x90205000, 0x48640000, 0x14201800]
  , 0x10,80.000000,attributes[0],1,null,autohelperowl_defendpat458,3,1.000000],
[owl_defendpat459,4,8, "D1406",-1,-1,1,1,2,2,0xa,647,
  [ 0xf8fcfc00, 0xfcfcf800, 0xfcfcbc00, 0xbcfcfc00, 0xf8fcfc00, 0xfcfcf800, 0xfcfcbc00, 0xbcfcfc00],
  [ 0x50248000, 0x84241000, 0x08601400, 0x10604800, 0x10248400, 0x80245000, 0x48601000, 0x14600800]
  , 0x0,55.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat460,3,8, "D1407",-2,-1,1,2,3,3,0xa,647,
  [ 0xfcfcfc00, 0xffffff00, 0xfffffcfc, 0xfcfcfc3c, 0xfffffff0, 0xfcfcfcfc, 0xfcfcfc00, 0xfcffff00],
  [ 0x40100000, 0x06110000, 0x00120418, 0x00104020, 0x00110620, 0x00104090, 0x40100000, 0x04120000]
  , 0x0,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat461,4,8, "D1408",-2,-1,1,2,3,3,0x0,683,
  [ 0xfcfcf000, 0xfcff3c00, 0x3ffffc30, 0xf0fcfc3c, 0x3cfffcf0, 0xf0fcfc30, 0xfcfcf000, 0xfcff3f00],
  [ 0x88641000, 0x18621800, 0x11668820, 0x90249024, 0x18621860, 0x10648820, 0x90249000, 0x88661100]
  , 0x10,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat462,3,8, "D1409",-2,-1,1,1,3,2,0x4,683,
  [ 0xfcfcf000, 0xfcff3c00, 0x3cfcfc30, 0xf0fcfc00, 0x3cfffc00, 0xf0fcfc30, 0xfcfcf000, 0xfcfc3c00],
  [ 0x88641000, 0x18621800, 0x10648820, 0x90249000, 0x18621800, 0x10648820, 0x90249000, 0x88641000]
  , 0x10,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_defendpat463,6,8, "D1410",-2,-1,1,1,3,2,0x6,722,
  [ 0xf8fcfc00, 0xfcfcf800, 0xffffbc00, 0xbcfcfc3c, 0xf8fcfcf0, 0xfcfcf800, 0xfcfcbc00, 0xbcffff00],
  [ 0x5010a000, 0x84940000, 0x29111400, 0x00584814, 0x00948450, 0xa0105000, 0x48580000, 0x14112900]
  , 0x10,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat464,2,8, "D1411",0,-1,1,1,1,2,0xa,721,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00601800, 0x10608000, 0x90240000, 0x08241000, 0x80601000, 0x18600000, 0x10240800, 0x00249000]
  , 0x10,45.000000,attributes[0],1,null,autohelperowl_defendpat464,3,1.000000],
[owl_defendpat465,3,8, "D1411b",0,-1,1,1,1,2,0xa,721,
  [ 0x00fcbc00, 0xb0f0f000, 0xf8fc0000, 0x3c3c3800, 0xf0f0b000, 0xbcfc0000, 0x383c3c00, 0x00fcf800],
  [ 0x00601800, 0x10608000, 0x90240000, 0x08241000, 0x80601000, 0x18600000, 0x10240800, 0x00249000]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_defendpat465,3,1.000000],
[owl_defendpat466,4,8, "D1412",-1,-1,1,1,2,2,0xa,648,
  [ 0x0cfcfc00, 0xf0f0fc00, 0xfcfcc000, 0xfc3c3c00, 0xfcf0f000, 0xfcfc0c00, 0x3c3cfc00, 0xc0fcfc00],
  [ 0x04502400, 0x10904400, 0x60144000, 0x44181000, 0x44901000, 0x24500400, 0x10184400, 0x40146000]
  , 0x0,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat467,3,8, "D1413",-1,-1,1,1,2,2,0xa,648,
  [ 0x0cfcfc00, 0xf0f0fc00, 0xfcfcc000, 0xfc3c3c00, 0xfcf0f000, 0xfcfc0c00, 0x3c3cfc00, 0xc0fcfc00],
  [ 0x04582000, 0x10902400, 0x20944000, 0x60181000, 0x24901000, 0x20580400, 0x10186000, 0x40942000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat467,0,0.010000],
[owl_defendpat468,8,8, "D1414",-2,-2,2,2,4,4,0xa,720,
  [ 0x0f3fffff, 0xc0f0fefe, 0xfef0c080, 0xff3f0f0a, 0xfef0c080, 0xff3f0f0a, 0x0f3fffff, 0xc0f0fefe],
  [ 0x00165822, 0x40509020, 0x94500000, 0x18160400, 0x90504000, 0x58160000, 0x04161822, 0x00509420]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat469,1,8, "D1415",-1,0,0,1,1,1,0x0,685,
  [ 0x00303c00, 0x00f0c000, 0xf0300000, 0x0c3c0000, 0xc0f00000, 0x3c300000, 0x003c0c00, 0x0030f000],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat469,3,0.040000],
[owl_defendpat470,1,4, "D1416",0,0,0,2,0,2,0x0,685,
  [ 0x00303030, 0x00f00000, 0x30300000, 0x003f0000, 0x00f00000, 0x30300000, 0x003f0000, 0x00303030],
  [ 0x00200010, 0x00200000, 0x00200000, 0x00210000, 0x00200000, 0x00200000, 0x00210000, 0x00200010]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat470,3,0.040000],
[owl_defendpat471,1,8, "D1417",-1,0,0,1,1,1,0x0,685,
  [ 0x00303c00, 0x00f0c000, 0xf0300000, 0x0c3c0000, 0xc0f00000, 0x3c300000, 0x003c0c00, 0x0030f000],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat471,3,0.050800],
[owl_defendpat472,1,4, "D1418",0,0,0,2,0,2,0x0,685,
  [ 0x00303030, 0x00f00000, 0x30300000, 0x003f0000, 0x00f00000, 0x30300000, 0x003f0000, 0x00303030],
  [ 0x00200010, 0x00200000, 0x00200000, 0x00210000, 0x00200000, 0x00200000, 0x00210000, 0x00200010]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_defendpat472,3,0.050800],
[owl_defendpat473,5,8, "D1419",-1,-2,1,1,2,3,0x2,646,
  [ 0xffff3e00, 0x3cfcfcbc, 0xf0fcfc00, 0xfcfcf000, 0xfcfc3c00, 0x3effff00, 0xf0fcfcf8, 0xfcfcf000],
  [ 0x26912400, 0x20984418, 0x60186000, 0x44982000, 0x44982000, 0x24912600, 0x20984490, 0x60186000]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_defendpat473,0,1.000000],
[owl_defendpat474,5,8, "D1420",-1,-2,1,1,2,3,0x2,646,
  [ 0xffff3e00, 0x3cfcfcbc, 0xf0fcfc00, 0xfcfcf000, 0xfcfc3c00, 0x3effff00, 0xf0fcfcf8, 0xfcfcf000],
  [ 0x24912400, 0x20984410, 0x60186000, 0x44982000, 0x44982000, 0x24912400, 0x20984410, 0x60186000]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_defendpat474,0,1.000000],
[owl_defendpat475,1,8, "D1421",0,-1,1,1,1,2,0x2,648,
  [ 0x00f4fc00, 0xf0f0d000, 0xfc7c0000, 0x1c3c3c00, 0xd0f0f000, 0xfcf40000, 0x3c3c1c00, 0x007cfc00],
  [ 0x00600800, 0x10208000, 0x80240000, 0x08201000, 0x80201000, 0x08600000, 0x10200800, 0x00248000]
  , 0x10,25.000000,attributes[0],1,null,autohelperowl_defendpat475,3,1.600000],
[owl_defendpat476,6,8, "D1422",-1,-1,2,2,3,3,0xa,760,
  [ 0xf0ffffff, 0xfcfcf0f0, 0xfcfc3c00, 0x3fffff00, 0xf0fcfc00, 0xfffff000, 0xffff3f3f, 0x3cfcfcfc],
  [ 0xa0651a44, 0x18689090, 0x90642800, 0x19a49100, 0x90681800, 0x1a65a000, 0x91a41918, 0x28649044]
  , 0x10,25.000000,attributes[0],1,null,autohelperowl_defendpat476,3,0.010000],
[owl_defendpat477,6,8, "D1423",-1,-1,2,1,3,2,0xa,723,
  [ 0x3c3cfcfc, 0xc0fcfc00, 0xfcf0f000, 0xffff0f00, 0xfcfcc000, 0xfc3c3c00, 0x0fffff00, 0xf0f0fcfc],
  [ 0x14105840, 0x40548400, 0x94105000, 0x48540500, 0x84544000, 0x58101400, 0x05544800, 0x50109404]
  , 0x10,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat478,5,8, "D1424",-1,-1,1,1,2,2,0xa,646,
  [ 0xe0f8bc00, 0xbcf8e000, 0xf8bc2c00, 0x2cbcf800, 0xe0f8bc00, 0xbcf8e000, 0xf8bc2c00, 0x2cbcf800],
  [ 0x00900400, 0x20104000, 0x40180000, 0x04102000, 0x40102000, 0x04900000, 0x20100400, 0x00184000]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_defendpat479,1,8, "DC01a",-1,0,1,2,2,2,0x0,722,
  [ 0x003f3c00, 0x00f0f030, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3f0000, 0x003c3c30, 0x00f0f000],
  [ 0x00221000, 0x00600020, 0x10200000, 0x00240000, 0x00600000, 0x10220000, 0x00240020, 0x00201000]
  , 0x100,35.000000,attributes[1],1,null,autohelperowl_defendpat479,3,0.400000],
[owl_defendpat480,1,8, "DC01b",-1,0,1,2,2,2,0x0,722,
  [ 0x003f3c00, 0x00f0f030, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3f0000, 0x003c3c30, 0x00f0f000],
  [ 0x00221000, 0x00600020, 0x10200000, 0x00240000, 0x00600000, 0x10220000, 0x00240020, 0x00201000]
  , 0x100,35.000000,attributes[3],1,null,autohelperowl_defendpat480,3,0.400000],
[owl_defendpat481,2,8, "DC02",-1,-1,1,2,2,3,0x2,685,
  [ 0xfcffff00, 0xfcfcfcf0, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc3c, 0xfcfcfc00],
  [ 0x60600000, 0x14280000, 0x00242400, 0x00a05000, 0x00281400, 0x00606000, 0x50a00000, 0x24240000]
  , 0x100,35.000000,attributes[5],1,null,autohelperowl_defendpat481,3,0.034000],
[owl_defendpat482,4,8, "DE01a",0,-1,2,2,2,3,0x0,721,
  [ 0x003cff7f, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0d00, 0xf0f0c000, 0xff3c0000, 0x0d3f3f0f, 0x00f0fcf4],
  [ 0x00100015, 0x00100000, 0x00100000, 0x01110000, 0x00100000, 0x00100000, 0x00110101, 0x00100050]
  , 0x100,30.000000,attributes[7],0,null,null,0,0.000000],
[owl_defendpat483,5,8, "DE01b",0,-1,2,2,2,3,0x0,721,
  [ 0x003cfffe, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0e, 0x00f0fcfc],
  [ 0x00100054, 0x00100000, 0x00100000, 0x01110100, 0x00100000, 0x00100000, 0x01110100, 0x00100054]
  , 0x100,30.000000,attributes[9],0,null,null,0,0.000000],
[owl_defendpat484,2,8, "DE02",0,-1,1,1,1,2,0x2,721,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00104000, 0x40100000, 0x04100000, 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x00100400]
  , 0x100,30.000000,attributes[11],1,null,autohelperowl_defendpat484,0,0.592000],
[owl_defendpat485,2,8, "DE03",0,-1,1,1,1,2,0x2,722,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00500000, 0x10100000, 0x00140000, 0x00101000, 0x00101000, 0x00500000, 0x10100000, 0x00140000]
  , 0x100,30.000000,attributes[13],1,null,autohelperowl_defendpat485,0,0.592000],
[owl_defendpat486,5,8, "DE04",-1,-1,1,3,2,4,0x2,796,
  [ 0x7effff00, 0xf4fcfcf8, 0xfcfcf400, 0xfcfc7c00, 0xfcfcf400, 0xffff7e00, 0x7cfcfcbc, 0xf4fcfc00],
  [ 0x24918600, 0xa0184490, 0x48186000, 0x44902800, 0x4418a000, 0x86912400, 0x28904418, 0x60184800]
  , 0x100,30.000000,attributes[15],0,null,null,0,0.000000],
[owl_defendpat487,2,8, "DR01",-1,-2,1,2,2,4,0x2,722,
  [ 0xfcfdff00, 0xfcfcfcd0, 0xfffffc00, 0xfcfcfc3c, 0xfcfcfcf0, 0xfffdfc00, 0xfcfcfc1c, 0xfcffff00],
  [ 0x18180000, 0x00142800, 0x00909000, 0xa0500000, 0x28140000, 0x00181800, 0x0050a000, 0x90900000]
  , 0x100,30.000000,attributes[17],1,null,autohelperowl_defendpat487,0,0.610000],
[null, 0,0,null,0,0,0,0,0,0,0,0,[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],0,0.0,null,0,null,null,0,0.0]
]



const owl_defendpat = data.map(item => new Pattern(item))
// export const owl_defendpat_db = new PatternDB([-1, 0, owl_defendpat, dfa_owl_defendpat])
export const owl_defendpat_db = new PatternDB([-1, 0, owl_defendpat, null])
