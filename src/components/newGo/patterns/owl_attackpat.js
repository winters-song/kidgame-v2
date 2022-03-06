import {PatternDB, Pattern, ATTACK_MACRO, PatternAttribute, attributeType, DEFEND_MACRO} from "./Patterns";
import {AFFINE_TRANSFORM} from "../Liberty";
import {codes, NO_MOVE} from "../Constants";


const owl_attackpat0 = [
  [758, 1],	[721, 1],	[757, 3]
]

const owl_attackpat1 = [
  [719, 1],	[721, 1],	[757, 3]
]

const owl_attackpat2 = [
  [685, 1],	[684, 1]
]

const owl_attackpat3 = [
  [684, 1]
]

const owl_attackpat4 = [
  [685, 1],	[647, 1],	[610, 1]
]

const owl_attackpat5 = [
  [646, 1],	[647, 1],	[757, 3],	[758, 3]
]

const owl_attackpat6 = [
  [647, 1],	[685, 1]
]

const owl_attackpat7 = [
  [609, 1],	[684, 1],	[646, 3]
]

const owl_attackpat8 = [
  [719, 1],	[758, 1],	[684, 1]
]

const owl_attackpat9 = [
  [684, 1]
]

const owl_attackpat10 = [
  [684, 1],	[720, 3],	[721, 3]
]

const owl_attackpat11 = [
  [684, 1]
]

const owl_attackpat12 = [
  [685, 1],	[648, 1],	[647, 1]
]

const owl_attackpat13 = [
  [684, 1],	[721, 3]
]

const owl_attackpat14 = [
  [685, 1],	[684, 1]
]

const owl_attackpat15 = [
  [648, 1],	[758, 1],	[759, 3]
]

const owl_attackpat16 = [
  [687, 1],	[684, 1]
]

const owl_attackpat17 = [
  [722, 1],	[684, 1]
]

const owl_attackpat18 = [
  [721, 1],	[685, 1],	[648, 1],	[758, 1]
]

const owl_attackpat19 = [
  [684, 1],	[648, 1],	[647, 3],	[758, 3]
]

const owl_attackpat20 = [
  [722, 1]
]

const owl_attackpat21 = [
  [684, 1],	[721, 1]
]

const owl_attackpat22 = [
  [684, 1],	[647, 1]
]

const owl_attackpat23 = [
  [685, 1],	[721, 1]
]

const owl_attackpat24 = [
  [685, 1],	[647, 1]
]

const owl_attackpat25 = [
  [758, 1]
]

const owl_attackpat26 = [
  [684, 1],	[648, 3],	[647, 3]
]

const owl_attackpat27 = [
  [684, 1],	[648, 3],	[647, 3],	[610, 3],
  [611, 3]
]

const owl_attackpat28 = [
  [684, 1],	[796, 1],	[647, 3],	[610, 3],
  [648, 3],	[611, 3]
]

const owl_attackpat29 = [
  [684, 1],	[721, 1]
]

const owl_attackpat30 = [
  [684, 1]
]

const owl_attackpat31 = [
  [648, 1],	[723, 1],	[686, 1],	[649, 3]
]

const owl_attackpat32 = [
  [684, 1],	[683, 1]
]

const owl_attackpat33 = [
  [684, 1]
]

const owl_attackpat34 = [
  [684, 1],	[648, 3],	[647, 3]
]

const owl_attackpat35 = [
  [684, 1],	[647, 3],	[794, 3],	[648, 3],
  [795, 3]
]

const owl_attackpat36 = [
  [759, 1]
]

const owl_attackpat37 = [
  [683, 1],	[647, 1],	[646, 3]
]

const owl_attackpat38 = [
  [685, 1],	[686, 1],	[646, 3],	[723, 3]
]

const owl_attackpat39 = [
  [684, 1],	[647, 1]
]

const owl_attackpat40 = [
  [684, 1],	[647, 1]
]

const owl_attackpat41 = [
  [758, 1],	[721, 1]
]

const owl_attackpat42 = [
  [758, 1],	[721, 1]
]

const owl_attackpat43 = [
  [758, 1],	[721, 1]
]

const owl_attackpat44 = [
  [758, 1],	[721, 1]
]

const owl_attackpat45 = [
  [685, 1],	[647, 1]
]

const owl_attackpat46 = [
  [684, 1],	[720, 3],	[683, 3],	[647, 3]
]

const owl_attackpat47 = [
  [684, 1],	[720, 3],	[683, 3],	[647, 3]
]

const owl_attackpat48 = [
  [648, 1],	[684, 1],	[610, 1]
]

const owl_attackpat49 = [
  [758, 1]
]

const owl_attackpat50 = [
  [685, 1],	[648, 1]
]

const owl_attackpat51 = [
  [759, 1],	[721, 1],	[760, 3]
]

const owl_attackpat52 = [
  [759, 1],	[721, 1],	[760, 3]
]

const owl_attackpat53 = [
  [648, 1],	[723, 1],	[685, 1],	[721, 1],
  [645, 3],	[646, 3]
]

const owl_attackpat54 = [
  [686, 1],	[722, 1],	[723, 3],	[610, 3]
]

const owl_attackpat55 = [
  [721, 1]
]

const owl_attackpat56 = [
  [647, 1],	[685, 1],	[794, 3],	[795, 3],
  [757, 3]
]

const owl_attackpat57 = [
  [721, 1],	[649, 3],	[650, 3],	[648, 3]
]

const owl_attackpat58 = [
  [721, 1],	[649, 3],	[648, 3]
]

const owl_attackpat59 = [
  [648, 1],	[721, 1]
]

const owl_attackpat60 = [
  [759, 1]
]

const owl_attackpat61 = [
  [650, 1]
]

const owl_attackpat62 = [
  [648, 1]
]

const owl_attackpat63 = [
  [684, 1]
]

const owl_attackpat64 = [
  [723, 1]
]

const owl_attackpat65 = [
  [684, 1],	[722, 1],	[721, 3]
]

const owl_attackpat66 = [
  [685, 1],	[722, 1],	[684, 1],	[720, 3]
]

const owl_attackpat67 = [
  [684, 1],	[685, 1],	[683, 3],	[686, 3]
]

const owl_attackpat68 = [
  [684, 1],	[648, 1],	[647, 3]
]

const owl_attackpat69 = [
  [760, 1],	[686, 1],	[723, 3]
]

const owl_attackpat70 = [
  [684, 1]
]

const owl_attackpat71 = [
  [646, 1],	[684, 1]
]

const owl_attackpat72 = [
  [684, 1]
]

const owl_attackpat73 = [
  [685, 1],	[722, 3]
]

const owl_attackpat74 = [
  [647, 1],	[648, 1],	[758, 1]
]

const owl_attackpat75 = [
  [684, 1],	[722, 1],	[720, 1],	[611, 3],
  [758, 3]
]

const owl_attackpat76 = [
  [684, 1],	[721, 3],	[758, 3],	[648, 3],
  [647, 3]
]

const owl_attackpat77 = [
  [684, 1]
]

const owl_attackpat78 = [
  [684, 1]
]

const owl_attackpat79 = [
  [684, 1]
]

const owl_attackpat80 = [
  [648, 1],	[649, 1]
]

const owl_attackpat81 = [
  [648, 1],	[649, 1]
]

const owl_attackpat82 = [
  [686, 1],	[722, 1],	[684, 1],	[723, 3],
  [721, 3]
]

const owl_attackpat83 = [
  [722, 1],	[611, 3],	[610, 3],	[612, 3]
]

const owl_attackpat84 = [
  [722, 1],	[611, 3],	[612, 3],	[610, 3]
]

const owl_attackpat85 = [
  [648, 1],	[759, 3],	[758, 3]
]

const owl_attackpat86 = [
  [649, 1],	[685, 1],	[645, 3],	[686, 3],
  [682, 3],	[608, 3]
]

const owl_attackpat87 = [
  [684, 1],	[648, 1]
]

const owl_attackpat88 = [
  [684, 1],	[720, 1]
]

const owl_attackpat89 = [
  [684, 1]
]

const owl_attackpat90 = [
  [720, 1],	[684, 1],	[610, 3],	[612, 3],
  [611, 3]
]

const owl_attackpat91 = [
  [684, 1],	[685, 1],	[719, 3],	[645, 3],
  [682, 3]
]

const owl_attackpat92 = [
  [684, 1]
]

const owl_attackpat93 = [
  [684, 1]
]

const owl_attackpat94 = [
  [684, 1]
]

const owl_attackpat95 = [
  [684, 1],	[688, 3],	[651, 3],	[725, 3]
]

const owl_attackpat96 = [
  [684, 1]
]

const owl_attackpat97 = [
  [684, 1],	[723, 1]
]

const owl_attackpat98 = [
  [686, 1],	[684, 1],	[723, 3]
]

const owl_attackpat99 = [
  [684, 1],	[687, 3],	[650, 3],	[724, 3],
  [761, 3]
]

const owl_attackpat100 = [
  [721, 1],	[685, 1],	[722, 3]
]

const owl_attackpat101 = [
  [684, 1],	[723, 1]
]

const owl_attackpat102 = [
  [684, 1],	[723, 1]
]

const owl_attackpat103 = [
  [683, 1],	[684, 1],	[649, 3],	[686, 3],
  [760, 3],	[723, 3]
]

const owl_attackpat104 = [
  [759, 1],	[648, 3],	[649, 3]
]

const owl_attackpat105 = [
  [648, 1],	[759, 1],	[686, 3]
]

const owl_attackpat106 = [
  [648, 1],	[759, 1],	[686, 3]
]

const owl_attackpat107 = [
  [721, 1],	[684, 1],	[687, 1]
]

const owl_attackpat108 = [
  [721, 1],	[684, 1],	[687, 1]
]

const owl_attackpat109 = [
  [720, 1],	[683, 1],	[685, 1],	[722, 1]
]

const owl_attackpat110 = [
  [758, 1],	[686, 1]
]

const owl_attackpat111 = [
  [684, 1],	[758, 3]
]

const owl_attackpat112 = [
  [648, 1],	[723, 1],	[721, 1],	[686, 1]
]

const owl_attackpat113 = [
  [720, 1],	[757, 1],	[684, 1],	[759, 1],
  [685, 1]
]

const owl_attackpat114 = [
  [646, 1],	[683, 1],	[720, 1],	[610, 1],
  [611, 1],	[685, 1]
]

const owl_attackpat115 = [
  [684, 1],	[722, 1]
]

const owl_attackpat116 = [
  [758, 1],	[721, 1]
]

const owl_attackpat117 = [
  [648, 1],	[649, 1]
]

const owl_attackpat118 = [
  [686, 1],	[684, 1]
]

const owl_attackpat119 = [
  [611, 1],	[684, 1],	[647, 3],	[612, 3]
]

const owl_attackpat120 = [
  [721, 1],	[686, 1],	[684, 1],	[647, 3],
  [649, 3]
]

const owl_attackpat121 = [
  [685, 1],	[648, 1],	[647, 1],	[645, 1]
]

const owl_attackpat122 = [
  [684, 1],	[758, 3],	[760, 3],	[759, 3]
]

const owl_attackpat123 = [
  [684, 1],	[720, 1],	[683, 3]
]

const owl_attackpat124 = [
  [684, 1]
]

const owl_attackpat125 = [
  [646, 1],	[685, 1],	[684, 1],	[720, 3]
]

const owl_attackpat126 = [
  [758, 1],	[721, 1],	[684, 1],	[759, 1]
]

const owl_attackpat127 = [
  [720, 1],	[758, 1],	[683, 1]
]

const owl_attackpat128 = [
  [758, 1],	[683, 1],	[720, 1],	[796, 1],
  [757, 3],	[794, 3]
]

const owl_attackpat129 = [
  [721, 1],	[684, 1],	[722, 1],	[683, 3],
  [646, 3]
]

const owl_attackpat130 = [
  [648, 1],	[684, 1],	[650, 3],	[649, 3]
]

const owl_attackpat131 = [
  [684, 1]
]

const owl_attackpat132 = [
  [684, 1],	[647, 1],	[611, 3],	[610, 3]
]

const owl_attackpat133 = [
  [684, 1],	[758, 3],	[647, 3]
]

const owl_attackpat134 = [
  [721, 1],	[684, 1]
]

const owl_attackpat135 = [
  [684, 1]
]

const owl_attackpat136 = [
  [610, 1],	[684, 1],	[647, 3],	[611, 3]
]

const owl_attackpat137 = [
  [647, 1],	[684, 1]
]

const owl_attackpat138 = [
  [684, 1]
]

const owl_attackpat139 = [
  [684, 1],	[647, 3]
]

const owl_attackpat140 = [
  [684, 1],	[721, 1]
]

const owl_attackpat141 = [
  [684, 1],	[721, 3]
]

const owl_attackpat142 = [
  [647, 1],	[721, 1]
]

const owl_attackpat143 = [
  [758, 1],	[684, 1]
]

const owl_attackpat144 = [
  [758, 1],	[684, 1],	[647, 1],	[720, 3]
]

const owl_attackpat145 = [
  [685, 1],	[684, 1],	[720, 1],	[758, 1]
]

const owl_attackpat146 = [
  [649, 1],	[684, 1],	[647, 1]
]

const owl_attackpat147 = [
  [649, 1],	[648, 1],	[684, 1],	[723, 1]
]

const owl_attackpat148 = [
  [721, 1],	[647, 1],	[684, 1]
]

const owl_attackpat149 = [
  [646, 1],	[684, 1],	[720, 3],	[757, 3]
]

const owl_attackpat150 = [
  [686, 1],	[720, 1],	[684, 1],	[685, 1],
  [758, 1]
]

const owl_attackpat151 = [
  [648, 1],	[647, 1],	[722, 1],	[685, 1],
  [683, 1]
]

const owl_attackpat152 = [
  [684, 1]
]

const owl_attackpat153 = [
  [684, 1],	[722, 3]
]

const owl_attackpat154 = [
  [721, 1],	[759, 1]
]

const owl_attackpat155 = [
  [648, 1],	[684, 1],	[647, 3]
]

const owl_attackpat156 = [
  [684, 1],	[647, 3]
]

const owl_attackpat157 = [
  [684, 1],	[721, 1],	[723, 1],	[611, 1],
  [648, 1],	[759, 1]
]

const owl_attackpat158 = [
  [722, 1],	[684, 1],	[686, 1],	[649, 3]
]

const owl_attackpat159 = [
  [722, 1],	[684, 1],	[686, 1],	[610, 3]
]

const owl_attackpat160 = [
  [684, 1],	[685, 1],	[723, 1],	[760, 3]
]

const owl_attackpat161 = [
  [686, 1],	[722, 1],	[684, 1]
]

const owl_attackpat162 = [
  [686, 1],	[684, 1]
]

const owl_attackpat163 = [
  [722, 1],	[684, 1],	[686, 1]
]

const owl_attackpat164 = [
  [722, 1],	[684, 1],	[686, 1]
]

const owl_attackpat165 = [
  [684, 1],	[722, 1],	[648, 3],	[686, 3]
]

const owl_attackpat166 = [
  [684, 1],	[722, 1],	[648, 3],	[721, 3]
]

const owl_attackpat167 = [
  [684, 1],	[722, 1],	[648, 3],	[686, 3]
]

const owl_attackpat168 = [
  [684, 1],	[722, 1],	[723, 1],	[650, 1],
  [687, 1],	[721, 3]
]

const owl_attackpat169 = [
  [684, 1],	[721, 1],	[760, 1],	[759, 1]
]

const owl_attackpat170 = [
  [686, 1],	[723, 1],	[684, 1],	[721, 1],
  [760, 3],	[758, 3]
]

const owl_attackpat171 = [
  [684, 1],	[685, 1],	[757, 1],	[795, 1],
  [723, 1],	[797, 3],	[760, 3]
]

const owl_attackpat172 = [
  [686, 1],	[684, 1],	[721, 1],	[649, 3],
  [611, 3],	[722, 3]
]

const owl_attackpat173 = [
  [722, 1],	[686, 1],	[684, 1],	[649, 3],
  [723, 3],	[721, 3]
]

const owl_attackpat174 = [
  [610, 1],	[721, 1],	[685, 1],	[611, 1]
]

const owl_attackpat175 = [
  [686, 1],	[684, 1],	[721, 3],	[649, 3],
  [722, 3],	[647, 3],	[723, 3]
]

const owl_attackpat176 = [
  [684, 1],	[721, 1],	[686, 1],	[648, 1],
  [723, 1],	[759, 1]
]

const owl_attackpat177 = [
  [647, 1],	[684, 1],	[686, 1],	[649, 1],
  [722, 1]
]

const owl_attackpat178 = [
  [758, 1],	[757, 1],	[647, 3],	[646, 3]
]

const owl_attackpat179 = [
  [684, 1],	[721, 1],	[686, 1],	[648, 1],
  [723, 1]
]

const owl_attackpat180 = [
  [758, 1],	[720, 1],	[684, 1],	[648, 1],
  [647, 3],	[683, 3],	[757, 3]
]

const owl_attackpat181 = [
  [686, 1],	[722, 1],	[684, 1],	[723, 3],
  [721, 3]
]

const owl_attackpat182 = [
  [720, 1],	[721, 1],	[646, 3],	[683, 3]
]

const owl_attackpat183 = [
  [684, 1]
]

const owl_attackpat184 = [
  [609, 1],	[721, 1],	[720, 1],	[646, 3],
  [683, 3]
]

const owl_attackpat185 = [
  [684, 1],	[757, 1]
]

const owl_attackpat186 = [
  [683, 1],	[684, 1]
]

const owl_attackpat187 = [
  [647, 1],	[685, 1]
]

const owl_attackpat188 = [
  [645, 1],	[646, 1],	[684, 1]
]

const owl_attackpat189 = [
  [686, 1],	[684, 1]
]

const owl_attackpat190 = [
  [686, 1],	[722, 1],	[684, 1],	[649, 1]
]

const owl_attackpat191 = [
  [684, 1],	[686, 1]
]

const owl_attackpat192 = [
  [646, 1],	[684, 1],	[685, 1]
]

const owl_attackpat193 = [
  [646, 1],	[684, 1],	[685, 1]
]

const owl_attackpat194 = [
  [648, 1],	[719, 1],	[684, 1],	[683, 1],
  [682, 1]
]

const owl_attackpat195 = [
  [647, 1],	[721, 1]
]

const owl_attackpat196 = [
  [647, 1],	[721, 1]
]

const owl_attackpat197 = [
  [758, 1],	[683, 1],	[720, 1],	[646, 3]
]

const owl_attackpat198 = [
  [683, 1],	[647, 1],	[685, 1],	[720, 3]
]

const owl_attackpat199 = [
  [685, 1],	[683, 1],	[722, 1]
]

const owl_attackpat200 = [
  [646, 1],	[648, 1],	[684, 1],	[721, 1],
  [759, 1]
]

const owl_attackpat201 = [
  [646, 1],	[722, 1],	[684, 1],	[721, 1],
  [759, 1]
]

const owl_attackpat202 = [
  [722, 1],	[683, 1],	[721, 1],	[684, 1],
  [759, 3]
]

const owl_attackpat203 = [
  [646, 1],	[760, 1],	[684, 1],	[721, 1],
  [722, 1]
]

const owl_attackpat204 = [
  [647, 1],	[683, 1],	[722, 1],	[684, 1],
  [648, 1]
]

const owl_attackpat205 = [
  [647, 1],	[684, 1],	[721, 1]
]

const owl_attackpat206 = [
  [610, 1],	[611, 1],	[684, 1]
]

const owl_attackpat207 = [
  [758, 1],	[720, 1],	[684, 1]
]

const owl_attackpat208 = [
  [683, 1],	[684, 1],	[720, 1],	[686, 1]
]

const owl_attackpat209 = [
  [683, 1],	[684, 1],	[720, 1],	[686, 1]
]

const owl_attackpat210 = [
  [610, 1],	[722, 1],	[684, 1]
]

const owl_attackpat211 = [
  [720, 1],	[758, 1],	[647, 1],	[684, 1],
  [757, 3]
]

const owl_attackpat212 = [
  [648, 1],	[686, 1],	[720, 1],	[684, 1],
  [758, 1]
]

const owl_attackpat213 = [
  [720, 1],	[758, 1],	[648, 1],	[684, 1]
]

const owl_attackpat214 = [
  [648, 1],	[684, 1],	[721, 1],	[759, 1],
  [797, 3]
]

const owl_attackpat215 = [
  [721, 1],	[684, 1],	[759, 1],	[648, 1],
  [612, 3],	[760, 3]
]

const owl_attackpat216 = [
  [647, 1],	[684, 1],	[611, 1],	[722, 1],
  [760, 3],	[612, 3]
]

const owl_attackpat217 = [
  [684, 1],	[722, 1]
]

const owl_attackpat218 = [
  [684, 1],	[722, 1]
]

const owl_attackpat219 = [
  [722, 1],	[684, 1]
]

const owl_attackpat220 = [
  [722, 1],	[684, 1]
]

const owl_attackpat221 = [
  [648, 1],	[721, 1]
]

const owl_attackpat222 = [
  [648, 1],	[721, 1]
]

const owl_attackpat223 = [
  [721, 1],	[647, 1]
]

const owl_attackpat224 = [
  [721, 1],	[647, 1]
]

const owl_attackpat225 = [
  [722, 1],	[648, 1]
]

const owl_attackpat226 = [
  [684, 1],	[686, 1]
]

const owl_attackpat227 = [
  [683, 1],	[686, 1]
]

const owl_attackpat228 = [
  [649, 1],	[684, 1]
]

const owl_attackpat229 = [
  [721, 1],	[647, 1],	[722, 3],	[648, 3]
]

const owl_attackpat230 = [
  [646, 1],	[722, 1],	[684, 1]
]

const owl_attackpat231 = [
  [721, 1],	[684, 1]
]

const owl_attackpat232 = [
  [685, 1],	[647, 3],	[795, 3],	[832, 3]
]

const owl_attackpat233 = [
  [684, 1],	[724, 1],	[721, 1],	[687, 1]
]

const owl_attackpat234 = [
  [684, 1],	[724, 1],	[721, 1],	[687, 1]
]

const owl_attackpat235 = [
  [758, 1],	[648, 1],	[721, 3]
]

const owl_attackpat236 = [
  [758, 1],	[648, 1],	[721, 3]
]

const owl_attackpat237 = [
  [720, 1],	[686, 1],	[684, 1],	[683, 3]
]

const owl_attackpat238 = [
  [758, 1],	[686, 1]
]

const owl_attackpat239 = [
  [684, 1],	[650, 1]
]

const owl_attackpat240 = [
  [684, 1]
]

const owl_attackpat241 = [
  [686, 1],	[684, 1]
]

const owl_attackpat242 = [
  [684, 1],	[686, 1],	[610, 1]
]

const owl_attackpat243 = [
  [684, 1],	[687, 1],	[650, 3],	[647, 3],
  [613, 3],	[724, 3]
]

const owl_attackpat244 = [
  [647, 1],	[759, 1],	[648, 3]
]

const owl_attackpat245 = [
  [647, 1],	[759, 1],	[648, 3]
]

const owl_attackpat246 = [
  [684, 1],	[723, 1]
]

const owl_attackpat247 = [
  [648, 1]
]

const owl_attackpat248 = [
  [648, 1]
]

const owl_attackpat249 = [
  [684, 1]
]

const owl_attackpat250 = [
  [723, 1],	[648, 1]
]

const owl_attackpat251 = [
  [685, 1],	[721, 1]
]

const owl_attackpat252 = [
  [685, 1],	[647, 1],	[649, 3],	[648, 3]
]

const owl_attackpat253 = [
  [685, 1],	[721, 1],	[647, 1],	[648, 3],
  [649, 3],	[686, 3]
]

const owl_attackpat254 = [
  [647, 1]
]

const owl_attackpat255 = [
  [647, 1]
]

const owl_attackpat256 = [
  [647, 1]
]

const owl_attackpat257 = [
  [684, 1],	[722, 1]
]

const owl_attackpat258 = [
  [720, 1],	[684, 1],	[683, 3]
]

const owl_attackpat259 = [
  [684, 1]
]

const owl_attackpat260 = [
  [685, 1],	[647, 1],	[648, 1],	[610, 3]
]

const owl_attackpat261 = [
  [646, 1],	[683, 1]
]

const owl_attackpat262 = [
  [723, 1],	[760, 3],	[646, 3]
]

const owl_attackpat263 = [
  [648, 1],	[612, 3],	[611, 3],	[720, 3]
]

const owl_attackpat264 = [
  [684, 1],	[685, 1],	[646, 3],	[760, 3],
  [647, 3]
]

const owl_attackpat265 = [
  [683, 1],	[722, 1],	[684, 1],	[723, 3],
  [649, 3],	[686, 3]
]

const owl_attackpat266 = [
  [722, 1],	[647, 1]
]

const owl_attackpat267 = [
  [722, 1],	[647, 1]
]

const owl_attackpat268 = [
  [646, 1],	[684, 1]
]

const owl_attackpat269 = [
  [684, 1],	[723, 1]
]

const owl_attackpat270 = [
  [684, 1]
]

const owl_attackpat271 = [
  [684, 1],	[723, 1]
]

const owl_attackpat272 = [
  [684, 1],	[723, 1]
]

const owl_attackpat273 = [
  [684, 1],	[723, 1]
]

const owl_attackpat274 = [
  [758, 1],	[648, 1],	[721, 3]
]

const owl_attackpat275 = [
  [758, 1],	[648, 1],	[721, 3]
]

const owl_attackpat276 = [
  [647, 1]
]

const owl_attackpat277 = [
  [647, 1],	[722, 3],	[649, 3],	[686, 3],
  [723, 3]
]

const owl_attackpat278 = [
  [721, 1],	[648, 3],	[686, 3],	[649, 3]
]

const owl_attackpat279 = [
  [685, 1],	[647, 1],	[683, 1],	[759, 3],
  [757, 3],	[758, 3]
]

const owl_attackpat280 = [
  [684, 1]
]

const owl_attackpat281 = [
  [684, 1],	[648, 1]
]

const owl_attackpat282 = [
  [684, 1],	[648, 1]
]

const owl_attackpat283 = [
  [648, 1],	[684, 1],	[722, 1],	[610, 1]
]

const owl_attackpat284 = [
  [720, 1],	[684, 1],	[683, 1],	[649, 3],
  [646, 3]
]

const owl_attackpat285 = [
  [721, 1],	[683, 1],	[722, 1],	[646, 3]
]

const owl_attackpat286 = [
  [683, 1],	[686, 1]
]

const owl_attackpat287 = [
  [722, 1],	[759, 1],	[760, 1],	[684, 1],
  [721, 1]
]

const owl_attackpat288 = [
  [758, 1],	[759, 3]
]

const owl_attackpat289 = [
  [758, 1]
]

const owl_attackpat290 = [
  [647, 1],	[721, 1]
]

const owl_attackpat291 = [
  [647, 1],	[721, 1]
]

const owl_attackpat292 = [
  [647, 1],	[721, 1]
]

const owl_attackpat293 = [
  [647, 1],	[721, 1]
]

const owl_attackpat294 = [
  [611, 1],	[721, 1]
]

const owl_attackpat295 = [
  [720, 1],	[723, 1]
]

const owl_attackpat296 = [
  [648, 1],	[685, 1],	[645, 3],	[682, 3],
  [720, 3],	[608, 3]
]

const owl_attackpat297 = [
  [686, 1],	[722, 1],	[610, 3],	[572, 3],
  [573, 3],	[609, 3]
]

const owl_attackpat298 = [
  [758, 1],	[684, 1],	[720, 1],	[757, 3]
]

const owl_attackpat299 = [
  [684, 1],	[648, 1],	[758, 1]
]

const owl_attackpat300 = [
  [684, 1],	[648, 1],	[758, 1]
]

const owl_attackpat301 = [
  [723, 1],	[684, 1]
]

const owl_attackpat302 = [
  [723, 1],	[684, 1]
]

const owl_attackpat303 = [
  [685, 1]
]

const owl_attackpat304 = [
  [684, 1]
]

const owl_attackpat305 = [
  [684, 1]
]

const owl_attackpat306 = [
  [684, 1],	[722, 1]
]

const owl_attackpat307 = [
  [684, 1],	[722, 1]
]

const owl_attackpat308 = [
  [722, 1],	[684, 1],	[647, 1]
]

const owl_attackpat309 = [
  [645, 1],	[684, 1]
]

const owl_attackpat310 = [
  [721, 1],	[684, 1]
]

const owl_attackpat311 = [
  [722, 1],	[648, 1]
]

const owl_attackpat312 = [
  [647, 1],	[648, 1],	[685, 1]
]

const owl_attackpat313 = [
  [647, 1],	[684, 1]
]

const owl_attackpat314 = [
  [684, 1],	[686, 1],	[721, 1]
]

const owl_attackpat315 = [
  [684, 1],	[685, 1],	[683, 1],	[758, 1]
]

const owl_attackpat316 = [
  [721, 1],	[647, 1],	[720, 1]
]

const owl_attackpat317 = [
  [648, 1],	[684, 1]
]

const owl_attackpat318 = [
  [647, 1],	[684, 1],	[721, 1],	[759, 1],
  [760, 1]
]

const owl_attackpat319 = [
  [721, 1],	[684, 1],	[612, 1],	[611, 1]
]

const owl_attackpat320 = [
  [647, 1],	[684, 1],	[721, 1],	[759, 1],
  [760, 1]
]

const owl_attackpat321 = [
  [646, 1],	[684, 1],	[720, 1],	[758, 1],
  [759, 1],	[683, 3]
]

const owl_attackpat322 = [
  [720, 1],	[647, 1],	[611, 1],	[684, 1],
  [683, 3],	[610, 3]
]

const owl_attackpat323 = [
  [610, 1],	[684, 1],	[647, 3],	[611, 3]
]

const owl_attackpat324 = [
  [758, 1],	[684, 1],	[759, 3]
]

const owl_attackpat325 = [
  [646, 1],	[684, 1],	[720, 1],	[758, 1],
  [759, 1],	[683, 3]
]

const owl_attackpat326 = [
  [686, 1],	[647, 1],	[648, 1],	[683, 1]
]

const owl_attackpat327 = [
  [683, 1],	[647, 1],	[648, 1],	[686, 1]
]

const owl_attackpat328 = [
  [647, 1],	[683, 1],	[611, 1],	[684, 1],
  [612, 3]
]

const owl_attackpat329 = [
  [684, 1],	[683, 3]
]

const owl_attackpat330 = [
  [683, 1],	[684, 1],	[757, 3]
]

const owl_attackpat331 = [
  [684, 1],	[682, 1],	[720, 1]
]

const owl_attackpat332 = [
  [759, 1],	[684, 1],	[721, 1],	[760, 1]
]

const owl_attackpat333 = [
  [684, 1],	[647, 1],	[646, 1]
]

const owl_attackpat334 = [
  [684, 1],	[722, 1],	[720, 1],	[721, 1]
]

const owl_attackpat335 = [
  [685, 1],	[720, 1],	[684, 1],	[648, 3]
]

const owl_attackpat336 = [
  [758, 1],	[720, 1],	[759, 1]
]

const owl_attackpat337 = [
  [685, 1],	[720, 1],	[759, 1],	[684, 1],
  [648, 3]
]

const owl_attackpat338 = [
  [648, 1],	[683, 1],	[684, 1]
]

const owl_attackpat339 = [
  [646, 1],	[721, 1],	[684, 1]
]

const owl_attackpat340 = [
  [723, 1],	[684, 1],	[721, 1]
]

const owl_attackpat341 = [
  [647, 1],	[684, 1],	[722, 1],	[723, 1]
]

const owl_attackpat342 = [
  [684, 1]
]

const owl_attackpat343 = [
  [648, 1],	[686, 1],	[722, 1],	[684, 1]
]

const owl_attackpat344 = [
  [684, 1],	[648, 1]
]

const owl_attackpat345 = [
  [720, 1],	[684, 1],	[648, 1]
]

const owl_attackpat346 = [
  [684, 1],	[720, 1],	[648, 1],	[758, 3],
  [757, 3],	[649, 3],	[686, 3]
]

const owl_attackpat347 = [
  [720, 1],	[684, 1],	[648, 3],	[649, 3]
]

const owl_attackpat348 = [
  [646, 1],	[683, 1],	[648, 1],	[684, 1],
  [721, 1],	[722, 1]
]

const owl_attackpat349 = [
  [683, 1],	[647, 1],	[685, 1]
]

const owl_attackpat350 = [
  [686, 1],	[684, 1],	[611, 1],	[612, 3],
  [721, 3],	[647, 3]
]

const owl_attackpat351 = [
  [719, 1],	[682, 1],	[645, 1],	[611, 1],
  [610, 1],	[721, 1],	[609, 1]
]

const owl_attackpat352 = [
  [720, 1],	[683, 1],	[646, 1],	[721, 1],
  [611, 1],	[612, 1],	[610, 1],	[722, 1]
]

const owl_attackpat353 = [
  [722, 1],	[684, 1],	[683, 1]
]

const owl_attackpat354 = [
  [685, 1],	[721, 1],	[720, 1]
]

const owl_attackpat355 = [
  [647, 1],	[684, 1],	[721, 1],	[759, 1],
  [686, 1]
]

const owl_attackpat356 = [
  [646, 1],	[683, 1],	[759, 1],	[760, 1],
  [648, 1],	[721, 1],	[758, 3],	[720, 3]
]

const owl_attackpat357 = [
  [686, 1],	[648, 1],	[722, 1],	[760, 1],
  [684, 1],	[723, 3]
]

const owl_attackpat358 = [
  [758, 1],	[720, 1],	[684, 1],	[757, 3],
  [759, 3],	[683, 3]
]

const owl_attackpat359 = [
  [720, 1],	[647, 1],	[646, 1],	[611, 1],
  [610, 3]
]

const owl_attackpat360 = [
  [719, 1],	[683, 1],	[685, 1],	[757, 1],
  [684, 1]
]

const owl_attackpat361 = [
  [721, 1],	[611, 1],	[722, 1],	[647, 1],
  [684, 1]
]

const owl_attackpat362 = [
  [683, 1],	[684, 1],	[647, 3],	[649, 3],
  [720, 3],	[648, 3]
]

const owl_attackpat363 = [
  [647, 1],	[684, 1],	[721, 1],	[648, 1]
]

const owl_attackpat364 = [
  [684, 1],	[648, 1]
]

const owl_attackpat365 = [
  [646, 1],	[684, 1],	[685, 1],	[645, 3],
  [722, 3],	[682, 3]
]

const owl_attackpat366 = [
  [685, 1],	[684, 1],	[723, 1],	[720, 3],
  [757, 3]
]

const owl_attackpat367 = [
  [648, 1],	[682, 1],	[722, 1],	[721, 1],
  [720, 1],	[684, 1],	[645, 3],	[683, 3]
]

const owl_attackpat368 = [
  [758, 1],	[760, 1],	[724, 1],	[720, 1],
  [759, 1],	[684, 1]
]

const owl_attackpat369 = [
  [684, 1],	[759, 1],	[760, 1],	[719, 1],
  [724, 1],	[758, 1],	[720, 1]
]

const owl_attackpat370 = [
  [757, 1],	[720, 1],	[683, 1],	[648, 1],
  [685, 1],	[684, 1],	[759, 1]
]

const owl_attackpat371 = [
  [722, 1],	[720, 1],	[646, 1],	[723, 1],
  [684, 1],	[758, 1]
]

const owl_attackpat372 = [
  [646, 1],	[610, 1],	[722, 1],	[684, 1],
  [685, 1],	[723, 3]
]

const owl_attackpat373 = [
  [646, 1],	[610, 1],	[722, 1],	[684, 1],
  [685, 1],	[723, 3]
]

const owl_attackpat374 = [
  [684, 1]
]

const owl_attackpat375 = [
  [758, 1]
]

const owl_attackpat376 = [
  [684, 1]
]

const owl_attackpat377 = [
  [684, 1]
]

const owl_attackpat378 = [
  [722, 1],	[686, 1],	[648, 1],	[684, 1]
]

const owl_attackpat379 = [
  [722, 1],	[686, 1],	[648, 1],	[684, 1]
]

const owl_attackpat380 = [
  [648, 1],	[646, 1],	[647, 1],	[722, 1],
  [684, 1],	[686, 1]
]

const owl_attackpat381 = [
  [684, 1],	[723, 1],	[648, 3],	[649, 3]
]

const owl_attackpat382 = [
  [684, 1],	[648, 1],	[722, 1]
]

const owl_attackpat383 = [
  [684, 1],	[720, 1],	[685, 1]
]

const owl_attackpat384 = [
  [647, 1],	[684, 1],	[722, 1],	[686, 1]
]

const owl_attackpat385 = [
  [647, 1],	[684, 1],	[723, 1],	[722, 1]
]

const owl_attackpat386 = [
  [649, 1],	[648, 1],	[684, 1],	[722, 1]
]

const owl_attackpat387 = [
  [757, 1],	[720, 1],	[685, 1],	[684, 1]
]

const owl_attackpat388 = [
  [649, 1],	[648, 1],	[722, 1],	[684, 1]
]

const owl_attackpat389 = [
  [686, 1],	[647, 1],	[684, 1],	[722, 1],
  [610, 3]
]

const owl_attackpat390 = [
  [758, 1],	[684, 1],	[720, 1],	[648, 1]
]

const owl_attackpat391 = [
  [611, 1],	[647, 1],	[684, 1],	[721, 1],
  [649, 1]
]

const owl_attackpat392 = [
  [611, 1],	[647, 1],	[684, 1],	[721, 1],
  [759, 1],	[758, 3]
]

const owl_attackpat393 = [
  [722, 1],	[720, 1],	[684, 1],	[758, 1]
]

const owl_attackpat394 = [
  [683, 1],	[720, 1],	[647, 1],	[685, 1],
  [759, 1],	[758, 3]
]

const owl_attackpat395 = [
  [722, 1],	[684, 1],	[723, 1],	[648, 3],
  [647, 3]
]

const owl_attackpat396 = [
  [684, 1],	[682, 1],	[720, 1],	[646, 1],
  [721, 3],	[719, 3]
]


const autohelperowl_attackpat0 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(721, trans, move);
  return  this.board.countlib(A)<4;
}

const autohelperowl_attackpat6 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(610, trans, move);
  return  this.board.countlib(a)>2;
}

const autohelperowl_attackpat11 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  return  (this.somewhere(color, 0, 1, a) || !this.somewhere(color, 0, 1, b));
}

const autohelperowl_attackpat14 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(722, trans, move);
  return  this.board.countlib(A)>2;
}

const autohelperowl_attackpat17 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(609, trans, move);
  let b = AFFINE_TRANSFORM(610, trans, move);
  return this.somewhere(color, 0, 2, [a, b]);
}

const autohelperowl_attackpat18 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);
  let c = AFFINE_TRANSFORM(756, trans, move);
  return  this.play_attack_defend_n(color, 1, 2, [move, a, a]) || !this.play_attack_defend_n(color, 1, 4, [move, a, b, c, move]);
}

const autohelperowl_attackpat27 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(758, trans, move);
  return !this.somewhere(this.board.OTHER_COLOR(color), 0, 1, a) || ATTACK_MACRO.call(this, a);
}

const autohelperowl_attackpat28 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(758, trans, move);
  return !ATTACK_MACRO.call(this, a);
}

const autohelperowl_attackpat32 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  return !this.play_attack_defend_n(color, 1, 2, [move, a, move]);
}

const autohelperowl_attackpat33 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  return this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_attackpat34 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(646, trans, move);
  return this.board.countlib(a)>2;
}

const autohelperowl_attackpat35 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(758, trans, move);
  return this.owl_escape_value(a)>0;
}

const autohelperowl_attackpat37 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(646, trans, move);
  return this.board.countlib(A)>1;
}

const autohelperowl_attackpat40 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  return !this.play_attack_defend_n(color, 1, 2, [move, a, move]);
}

const autohelperowl_attackpat42 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  return this.board.countlib(a)===2;
}

const autohelperowl_attackpat43 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);
  let c = AFFINE_TRANSFORM(646, trans, move);

  return !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 3, [move, b, c, a, b]);
}

const autohelperowl_attackpat45 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(645, trans, move);
  let b = AFFINE_TRANSFORM(608, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);
  let d = AFFINE_TRANSFORM(721, trans, move);
  let e = AFFINE_TRANSFORM(610, trans, move);
  let f = AFFINE_TRANSFORM(685, trans, move);
  let A = AFFINE_TRANSFORM(609, trans, move);

  return (this.board.accuratelib(a, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null)===1  || this.board.countlib(b)>2)
    && this.board.countlib(A)<=3 && this.board.accuratelib(e, color, this.board.MAX_LIBERTIES, null)>1
    && this.play_attack_defend_n(color, 1, 6, [move, c, a, d, e, f, A])
    && this.play_attack_defend_n(color, 0, 4, [move, c, a, e, move]);
}

const autohelperowl_attackpat46 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);
  let c = AFFINE_TRANSFORM(719, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);

  return  (this.owl_escape_value(b) <= 0 && this.owl_escape_value(c) <= 0) || !this.play_attack_defend_n(color, 1, 2, [move, a, d]);
}

const autohelperowl_attackpat47 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(682, trans, move);

  return this.owl_escape_value(a) < 1;
}

const autohelperowl_attackpat49 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(B)<=3 && this.play_attack_defend_n(color, 1, 2, [move, a, B]);
}

const autohelperowl_attackpat50 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_attackpat52 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let C = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 2, [move, a, C])
    || !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 3, [move, a, b, a, C]);
}

const autohelperowl_attackpat53 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_escape_value(a)>0;
}

const autohelperowl_attackpat54 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_escape_value(a)>0 && !this.play_attack_defend_n(color, 1, 3, [move, a, b, move]);
}

const autohelperowl_attackpat55 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return  this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 1, [move, a]);
}

const autohelperowl_attackpat56 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(757, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_attackpat57 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(649, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_attackpat58 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) > 0;
}

const autohelperowl_attackpat59 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_escape_value(a) > 0;
}

const autohelperowl_attackpat60 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(610, trans, move);
  let b = AFFINE_TRANSFORM(611, trans, move);

  return this.owl_escape_value(a)+this.owl_escape_value(b) > 0;
}

const autohelperowl_attackpat62 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);

  return  this.play_attack_defend_n(color, 1, 4, [move, a, b, c, c]);
}

const autohelperowl_attackpat63 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(719, trans, move);
  let e = AFFINE_TRANSFORM(682, trans, move);

  return  this.board.accuratelib(d, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null)<=2
    && this.board.countlib(e)>3 && this.play_attack_defend_n(color, 1, 4, [move, a, b, c, c]);
}

const autohelperowl_attackpat67 = function (trans, move, color, action){
  return  !this.play_attack_defend_n(color, 1, 1, [move, move]);
}

const autohelperowl_attackpat68 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(610, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);
  let A = AFFINE_TRANSFORM(721, trans, move);

  return  (this.somewhere(this.board.OTHER_COLOR(color), 0, 1, a) || ! this.safe_move(a, color))
    && !this.play_attack_defend_n(this.board.OTHER_COLOR(color), 0, 3, [move, b, c, A]);
}

const autohelperowl_attackpat72 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(609, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);

  return !this.play_connect_n(color, 0, 1, [move, a, b]);
}

const autohelperowl_attackpat73 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(610, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);

  return this.play_connect_n(this.board.OTHER_COLOR(color), 0, 2, [move, a, a, c])
    && this.play_connect_n(this.board.OTHER_COLOR(color), 0, 2, [move, b, b, c]);
}

const autohelperowl_attackpat74 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(757, trans, move);

  return !this.owl_goal_dragon(A);
}

const autohelperowl_attackpat77 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);

  return  this.play_attack_defend2_n(color, 0, 2, [move, a, move, b])
    && !this.play_attack_defend_n(color, 1, 2, [move, a, b]);
}

const autohelperowl_attackpat78 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);

  return  this.play_attack_defend2_n(color, 0, 2, [move, a, move, b]);
}

const autohelperowl_attackpat79 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countlib(a)<=2 || this.board.accuratelib(move, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null)>2;
}

const autohelperowl_attackpat80 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(682, trans, move);
  let d = AFFINE_TRANSFORM(647, trans, move);
  let A = AFFINE_TRANSFORM(645, trans, move);

  return  this.play_attack_defend2_n(color, 0, 4, [move, a, b, c, A, b])
    && this.play_attack_defend2_n(color, 0, 4, [move, b, a, d, move, A]);
}

const autohelperowl_attackpat81 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(682, trans, move);
  let d = AFFINE_TRANSFORM(647, trans, move);
  let e = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(645, trans, move);

  return  this.owl_escape_value(e)>0 && this.play_attack_defend2_n(color, 0, 4, [move, a, b, c, A, b])
    && this.play_attack_defend2_n(color, 0, 4, [move, b, a, d, move, A]);
}

const autohelperowl_attackpat83 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(610, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);

  return  (this.owl_escape_value(a)>0)||(this.owl_escape_value(b)>0);
}

const autohelperowl_attackpat84 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(610, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);
  let c = AFFINE_TRANSFORM(719, trans, move);
  let d = AFFINE_TRANSFORM(682, trans, move);

  return this.owl_escape_value(a)>0&& (!this.somewhere(this.board.OTHER_COLOR(color), 0, 2, [b, c])
    || this.somewhere(color, 0, 2, [b, d])
    || (this.somewhere(color, 0, 1, c) && !this.safe_move(d, this.board.OTHER_COLOR(color))));
}

const autohelperowl_attackpat85 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);
  let d = AFFINE_TRANSFORM(647, trans, move);
  let e = AFFINE_TRANSFORM(610, trans, move);

  return this.owl_escape_value(a)>0 &&
    (this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 4, [b, c, move, d, d])
    || !this.play_attack_defend_n(this.board.OTHER_COLOR(color), 0, 4, [move, b, d, e, e]));
}

const autohelperowl_attackpat86 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(682, trans, move);

  return this.owl_escape_value(a)>0;
}

const autohelperowl_attackpat87 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(722, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);

  return !(this.somewhere(color, 0, 1, a) && this.somewhere(color, 0, 1, b))
    || this.somewhere(this.board.OTHER_COLOR(color), 0, 1, c);
}

const autohelperowl_attackpat89 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(610, trans, move);
  let b = AFFINE_TRANSFORM(609, trans, move);
  let c = AFFINE_TRANSFORM(573, trans, move);
  let d = AFFINE_TRANSFORM(572, trans, move);
  let e = AFFINE_TRANSFORM(685, trans, move);

  return this.somewhere(color, 0, 4, [a, b, c, d]) && this.owl_escape_value(e) > 0;
}

const autohelperowl_attackpat90 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);
  let c = AFFINE_TRANSFORM(649, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_attackpat91 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_escape_value(a)>0;
}

const autohelperowl_attackpat92 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(758, trans, move);
  let b = AFFINE_TRANSFORM(611, trans, move);
  let c = AFFINE_TRANSFORM(610, trans, move);
  let d = AFFINE_TRANSFORM(719, trans, move);
  let e = AFFINE_TRANSFORM(718, trans, move);
  let f = AFFINE_TRANSFORM(717, trans, move);
  let g = AFFINE_TRANSFORM(682, trans, move);
  let h = AFFINE_TRANSFORM(681, trans, move);
  let i = AFFINE_TRANSFORM(680, trans, move);
  let j = AFFINE_TRANSFORM(648, trans, move);

  return this.owl_escape_value(a)>0&& ((this.somewhere(color, 0, 3, [b, c, j])
    && this.somewhere(color, 0, 6, [d, e, f, g, h, i]))
    || (this.somewhere(color, 0, 1, j) && this.owl_escape_value(d)===0 && this.owl_escape_value(e)===0));
}

const autohelperowl_attackpat93 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(758, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);
  let c = AFFINE_TRANSFORM(681, trans, move);
  let d = AFFINE_TRANSFORM(719, trans, move);
  let e = AFFINE_TRANSFORM(718, trans, move);
  let f = AFFINE_TRANSFORM(648, trans, move);
  let g = AFFINE_TRANSFORM(611, trans, move);
  let h = AFFINE_TRANSFORM(610, trans, move);
  let i = AFFINE_TRANSFORM(574, trans, move);
  let j = AFFINE_TRANSFORM(573, trans, move);

  return this.owl_escape_value(a)>0 && this.somewhere(color, 0, 5, [f, g, h, i, j])
    && this.somewhere(color, 0, 4, [b, c, d, e]);
}

const autohelperowl_attackpat94 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);
  let c = AFFINE_TRANSFORM(649, trans, move);
  let d = AFFINE_TRANSFORM(612, trans, move);
  let e = AFFINE_TRANSFORM(647, trans, move);
  let f = AFFINE_TRANSFORM(611, trans, move);
  let i = AFFINE_TRANSFORM(613, trans, move);
  let j = AFFINE_TRANSFORM(650, trans, move);
  let k = AFFINE_TRANSFORM(687, trans, move);

  return (this.somewhere(color, 0, 1, j) ||
    (this.somewhere(color, 0, 1, i) && this.somewhere(color, 0, 1, k)))
    && !this.play_attack_defend_n(color, 1, 7, [move, a, b, c, d, e, f, move])
    && !this.play_attack_defend_n(color, 1, 5, [move, a, b, e, f, move]);
}

const autohelperowl_attackpat95 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(795, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);
  let c = AFFINE_TRANSFORM(794, trans, move);
  let d = AFFINE_TRANSFORM(757, trans, move);
  let e = AFFINE_TRANSFORM(722, trans, move);
  let f = AFFINE_TRANSFORM(610, trans, move);
  let g = AFFINE_TRANSFORM(573, trans, move);
  let h = AFFINE_TRANSFORM(609, trans, move);
  let i = AFFINE_TRANSFORM(572, trans, move);
  let j = AFFINE_TRANSFORM(608, trans, move);
  let k = AFFINE_TRANSFORM(571, trans, move);

  return  this.somewhere(color, 0, 4, [a, b, c, d])
    && this.owl_escape_value(e)>0 && this.somewhere(color, 0, 6, [f, g, h, i, j, k]);
}

const autohelperowl_attackpat96 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(760, trans, move);
  let b = AFFINE_TRANSFORM(538, trans, move);
  let c = AFFINE_TRANSFORM(537, trans, move);
  let d = AFFINE_TRANSFORM(536, trans, move);
  let e = AFFINE_TRANSFORM(757, trans, move);
  let f = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(a)>0 && this.owl_escape_value(b)===0 && this.owl_escape_value(c)===0 && this.owl_escape_value(d)===0
    && this.somewhere(color, 0, 2, [e, f]);
}

const autohelperowl_attackpat97 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);
  let A = AFFINE_TRANSFORM(722, trans, move);

  return this.owl_escape_value(A)>0 && this.play_attack_defend2_n(color, 0, 2, [move, b, move, c]);
}

const autohelperowl_attackpat99 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(649, trans, move);
  let b = AFFINE_TRANSFORM(686, trans, move);
  let c = AFFINE_TRANSFORM(723, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_attackpat100 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(758, trans, move);

  return  this.board.countlib(A)>1;
}

const autohelperowl_attackpat101 = function (trans, move, color, action){
  let c = AFFINE_TRANSFORM(647, trans, move);
  let d = AFFINE_TRANSFORM(648, trans, move);
  let A = AFFINE_TRANSFORM(685, trans, move);

  return (this.owl_escape_value(A)>0) && this.play_attack_defend2_n(color, 0, 2, [move, c, move, d]);
}

const autohelperowl_attackpat102 = function (trans, move, color, action){
  let c = AFFINE_TRANSFORM(647, trans, move);
  let d = AFFINE_TRANSFORM(648, trans, move);
  let A = AFFINE_TRANSFORM(646, trans, move);

  return (this.owl_escape_value(A)>0) && this.play_attack_defend2_n(color, 0, 2, [move, c, move, d]);
}

const autohelperowl_attackpat103 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(610, trans, move);
  let c = AFFINE_TRANSFORM(609, trans, move);
  let d = AFFINE_TRANSFORM(647, trans, move);
  let e = AFFINE_TRANSFORM(648, trans, move);

  return this.owl_escape_value(e)>0 && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 3, [move, a, b, c, d]);
}

const autohelperowl_attackpat104 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(611, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_attackpat105 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);

  return (!this.owl_goal_dragon(b))&& !this.play_connect_n(this.board.OTHER_COLOR(color), 0, 1, [move, a, b]);
}

const autohelperowl_attackpat106 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);

  return (!this.owl_goal_dragon(a))&& !this.play_connect_n(this.board.OTHER_COLOR(color), 0, 1, [move, a, b]);
}

const autohelperowl_attackpat107 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(685, trans, move);

  return (this.owl_escape_value(a) > 0);
}

const autohelperowl_attackpat108 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(719, trans, move);

  return (this.owl_escape_value(a) > 0);
}

const autohelperowl_attackpat109 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_escape_value(a) > 0;
}

const autohelperowl_attackpat112 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return  ATTACK_MACRO.call(this, a);
}

const autohelperowl_attackpat114 = function (trans, move, color, action){
  return this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>1;
}

const autohelperowl_attackpat120 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(720, trans, move);

  return this.board.countlib(A)<=3 && this.board.accuratelib(b, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null) <= 2
    && this.play_attack_defend_n(color, 1, 2, [move, b, b]);
}

const autohelperowl_attackpat122 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);

  return this.owl_eyespace(a);
}

const autohelperowl_attackpat124 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);

  return this.somewhere(this.board.OTHER_COLOR(color), 0, 1, b)
    || this.play_attack_defend_n(color, 1, 2, [a, b, a]);
}

const autohelperowl_attackpat125 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(611, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);
  let C = AFFINE_TRANSFORM(646, trans, move);
  let W = AFFINE_TRANSFORM(648, trans, move);

  return  this.play_attack_defend_n(color, 1, 1, [move, W])
    && !this.play_attack_defend_n(color, 1, 4, [move, A, b, C, b]);
}

const autohelperowl_attackpat126 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return !this.play_attack_defend_n(color, 1, 3, [move, a, b, move]);
}

const autohelperowl_attackpat127 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return !this.obvious_false_eye(a, this.board.OTHER_COLOR(color)) || !this.obvious_false_eye(b, color);
}

const autohelperowl_attackpat131 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(646, trans, move);

  return !ATTACK_MACRO.call(this, a);
}

const autohelperowl_attackpat132 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(757, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);
  let c = AFFINE_TRANSFORM(610, trans, move);

  return !ATTACK_MACRO.call(this, a) && this.owl_proper_eye(b)
    && (this.somewhere(this.board.OTHER_COLOR(color), 0, 1, c) || this.owl_proper_eye(c));
}

const autohelperowl_attackpat133 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(758, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_eyespace(b) && !ATTACK_MACRO.call(this, a);
}

const autohelperowl_attackpat136 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countlib(c) > 1 && !this.play_attack_defend_n(color, 1, 3, [move, a, b, move]);
}

const autohelperowl_attackpat137 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_maxeye(b) > 0 && !this.play_attack_defend_n(color, 1, 1, [move, a])
    && !this.obvious_false_eye(b, this.board.OTHER_COLOR(color));
}

const autohelperowl_attackpat138 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);

  return this.owl_maxeye(b)>0 && !this.play_attack_defend_n(color, 1, 1, [move, a])
    && !this.obvious_false_eye(b, this.board.OTHER_COLOR(color));
}

const autohelperowl_attackpat139 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_eyespace(b) && !this.play_attack_defend_n(color, 1, 2, [move, b, a]);
}

const autohelperowl_attackpat140 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);
  let c = AFFINE_TRANSFORM(610, trans, move);
  let d = AFFINE_TRANSFORM(609, trans, move);

  return this.owl_maxeye(b)===0&& ((this.somewhere(color, 0, 1, c) && this.owl_lunch(c))
    || (this.somewhere(color, 0, 1, d) && this.owl_lunch(d)))
    && !this.play_attack_defend_n(color, 1, 1, [move, a]) && !this.obvious_false_eye(b, this.board.OTHER_COLOR(color));
}

const autohelperowl_attackpat141 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let C = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(C)===2 && this.board.countstones(C)>1
    && !this.play_attack_defend_n(color, 1, 1, [move, a])
    && !this.obvious_false_eye(b, this.board.OTHER_COLOR(color));
}

const autohelperowl_attackpat143 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(609, trans, move);

  return !ATTACK_MACRO.call(this, a);
}

const autohelperowl_attackpat144 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(609, trans, move);

  return this.board.countlib(A)===2;
}

const autohelperowl_attackpat145 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(795, trans, move);

  return this.board.countlib(a) > 1;
}

const autohelperowl_attackpat146 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);
  let D = AFFINE_TRANSFORM(610, trans, move);

  return this.play_attack_defend_n(color, 1, 4, [move, a, b, c, D]);
}

const autohelperowl_attackpat147 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(648, trans, move);

  return !this.play_attack_defend_n(color, 1, 2, [a, move, move]);
}

const autohelperowl_attackpat148 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(682, trans, move);

  return this.board.countlib(A) === 3;
}

const autohelperowl_attackpat149 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(610, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);
  let C = AFFINE_TRANSFORM(609, trans, move);

  return  !ATTACK_MACRO.call(this, C) && (!this.somewhere(this.board.OTHER_COLOR(color), 0, 1, b)
    || (this.somewhere(this.board.OTHER_COLOR(color), 0, 1, b) && this.somewhere(color, 0, 1, a)));
}

const autohelperowl_attackpat150 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(645, trans, move);

  return  this.board.countlib(A) === 3;
}

const autohelperowl_attackpat151 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(610, trans, move);
  let A = AFFINE_TRANSFORM(685, trans, move);

  return  this.play_attack_defend2_n(color, 0, 2, [move, A, b, move]);
}

const autohelperowl_attackpat153 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return !this.obvious_false_eye(a, this.board.OTHER_COLOR(color));
}

const autohelperowl_attackpat154 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(757, trans, move);

  return this.board.countlib(A)<3 && this.owl_eyespace(move);
}

const autohelperowl_attackpat155 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(609, trans, move);

  return  this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 2, [move, a, a])
    && (this.somewhere(this.board.OTHER_COLOR(color), 0, 1, b) || !this.safe_move(b, color));
}

const autohelperowl_attackpat157 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_proper_eye(a);
}

const autohelperowl_attackpat158 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(759, trans, move);

  return this.board.countlib(A)>1;
}

const autohelperowl_attackpat159 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(759, trans, move);

  return this.board.countlib(A)>1;
}

const autohelperowl_attackpat162 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);

  return this.owl_eyespace(a) && this.board.accuratelib(b, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null) <= 2
    && this.play_attack_defend_n(color, 1, 2, [move, b, b]);
}

const autohelperowl_attackpat163 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(759, trans, move);
  let A = AFFINE_TRANSFORM(722, trans, move);

  return  (this.owl_topological_eye(a, this.board.board[A])<=2) && (this.owl_topological_eye(b, this.board.board[A])===2);
}

const autohelperowl_attackpat164 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let A = AFFINE_TRANSFORM(685, trans, move);

  return  (this.owl_topological_eye(a, this.board.board[A])===2)
    && ((this.owl_topological_eye(b, this.board.board[A])===2) || (this.owl_topological_eye(b, this.board.board[A])===3));
}

const autohelperowl_attackpat165 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(648, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_topological_eye(a, this.board.board[B])===3 && this.does_attack(move, B);
}

const autohelperowl_attackpat166 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(682, trans, move);

  return  this.owl_topological_eye(a, this.board.board[A])===3 && this.safe_move(b, color) && this.safe_move(move, color)
    && this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 2, [move, b, b]);
}

const autohelperowl_attackpat167 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);
  let A = AFFINE_TRANSFORM(647, trans, move);

  return  this.board.countlib(a)===2 && this.owl_topological_eye(b, this.board.board[A])===3;
}

const autohelperowl_attackpat170 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(610, trans, move);
  let b = AFFINE_TRANSFORM(572, trans, move);

  return !ATTACK_MACRO.call(this, b) && this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 1, [a, b]);
}

const autohelperowl_attackpat171 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)===1;
}

const autohelperowl_attackpat172 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(760, trans, move);

  return !this.owl_proper_eye(move) && !ATTACK_MACRO.call(this, a);
}

const autohelperowl_attackpat173 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 1, [move, a]);
}

const autohelperowl_attackpat174 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(648, trans, move);
  let A = AFFINE_TRANSFORM(685, trans, move);

  return  this.owl_big_eyespace(A) && this.play_attack_defend_n(color, 1, 1, [move, b]);
}

const autohelperowl_attackpat175 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(647, trans, move);

  return  1 || this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_attackpat176 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_mineye(move)===1 && this.board.accuratelib(b, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null)===2
    && !this.play_attack_defend_n(color, 1, 1, [move, c])
    && !this.play_attack_defend_n(color, 1, 3, [move, a, b, b]);
}

const autohelperowl_attackpat177 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);

  return this.board.accuratelib(b, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null)===2
    && !this.play_attack_defend_n(color, 1, 1, [move, c])
    && !this.play_attack_defend_n(color, 1, 3, [move, a, b, b]);
}

const autohelperowl_attackpat178 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(682, trans, move);

  return (this.owl_eyespace(a) || this.owl_eyespace(c))
    && this.play_attack_defend_n(color, 1, 1, [a, a])
    && this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 1, [move, a]);
}

const autohelperowl_attackpat179 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(647, trans, move);
  let e = AFFINE_TRANSFORM(720, trans, move);
  let A = AFFINE_TRANSFORM(648, trans, move);

  return this.board.countlib(A) === 3 && !this.obvious_false_eye(d, this.board.OTHER_COLOR(color))
    && this.play_attack_defend_n(color, 0, 3, [move, b, c, move])
    && this.play_attack_defend_n(color, 0, 3, [move, e, c, move])
    && this.play_attack_defend2_n(color, 0, 5, [move, c, b, d, e, b, e]);
}

const autohelperowl_attackpat182 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(646, trans, move);

  return  ATTACK_MACRO.call(this, A) && !this.play_attack_defend_n(color, 1, 1, move, A);
}

const autohelperowl_attackpat183 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(647, trans, move);

  return  this.does_attack(move, A);
}

const autohelperowl_attackpat188 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(645, trans, move);

  return  this.board.countlib(A)>2;
}

const autohelperowl_attackpat189 = function (trans, move, color, action){
  return this.owl_eyespace(move);
}

const autohelperowl_attackpat190 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(757, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let C = AFFINE_TRANSFORM(722, trans, move);

  return  this.board.countlib(C) <= 3 && this.owl_proper_eye(a) && this.owl_proper_eye(b);
}

const autohelperowl_attackpat191 = function (trans, move, color, action){
  return this.owl_eyespace(move);
}

const autohelperowl_attackpat192 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(649, trans, move);
  let d = AFFINE_TRANSFORM(723, trans, move);

  return (!ATTACK_MACRO.call(this, a) && this.board.accuratelib(d, color, this.board.MAX_LIBERTIES, null)>=3)
    || (!ATTACK_MACRO.call(this, b) && this.board.accuratelib(c, color, this.board.MAX_LIBERTIES, null)>=3);
}

const autohelperowl_attackpat193 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(685, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countlib(B) === 3 && this.owl_big_eyespace(move) && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>2
    && this.board.accuratelib(a, color, this.board.MAX_LIBERTIES, null)>1;
}

const autohelperowl_attackpat195 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);

  return this.board.countlib(a)===1 && this.board.countlib(b)===1 && this.board.countlib(c)<=2;
}

const autohelperowl_attackpat196 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);

  return this.board.countlib(a)<=2 && this.board.countlib(b)===1 && this.board.countlib(c)<=2;
}

const autohelperowl_attackpat198 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(610, trans, move);
  let B = AFFINE_TRANSFORM(609, trans, move);

  return this.board.countlib(a) === 1 && this.board.countlib(B) > 1;
}

const autohelperowl_attackpat200 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(718, trans, move);

  return !this.somewhere(color, 0, 1, a) || !DEFEND_MACRO.call(this, a);
}

const autohelperowl_attackpat201 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(718, trans, move);

  return !this.somewhere(color, 0, 1, a) || !DEFEND_MACRO.call(this, a);
}

const autohelperowl_attackpat202 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return !DEFEND_MACRO.call(this, a);
}

const autohelperowl_attackpat203 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);

  return this.board.accuratelib(a, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null) === 2;
}

const autohelperowl_attackpat205 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);

  return !this.obvious_false_eye(a, this.board.OTHER_COLOR(color)) && this.owl_maxeye(move)>1;
}

const autohelperowl_attackpat206 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(609, trans, move);

  return this.board.countlib(A)===2;
}

const autohelperowl_attackpat208 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(647, trans, move);
  let A = AFFINE_TRANSFORM(645, trans, move);

  return this.board.countlib(A)===2 && !this.safe_move(b, color);
}

const autohelperowl_attackpat209 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);

  return !this.safe_move(a, color);
}

const autohelperowl_attackpat210 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(757, trans, move);
  let b = AFFINE_TRANSFORM(795, trans, move);

  return this.somewhere(color, 0, 2, [a, b]);
}

const autohelperowl_attackpat216 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(721, trans, move);

  return this.play_attack_defend_n(color, 0, 1, [move, A])!==codes.WIN;
}

const autohelperowl_attackpat217 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);
  let C = AFFINE_TRANSFORM(721, trans, move);

  return (this.owl_escape_value(B)>0 || this.owl_escape_value(C)>0)&& !this.play_attack_defend2_n(color, 1, 1, [move, move, a]);
}

const autohelperowl_attackpat218 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);

  return  !this.play_attack_defend2_n(color, 1, 1, [move, move, a]);
}

const autohelperowl_attackpat219 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(719, trans, move);

  return  !this.safe_move(a, color) && !this.play_attack_defend2_n(color, 1, 3, [move, NO_MOVE, a, a, c])
    && !this.play_attack_defend_n(color, 1, 2, [move, a, move]);
}

const autohelperowl_attackpat220 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(719, trans, move);

  return  !this.safe_move(a, color) && !this.play_attack_defend2_n(color, 1, 3, [move, NO_MOVE, a, a, c]);
}

const autohelperowl_attackpat221 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let C = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(C)>0 && this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 2, [move, a, a, b]);
}

const autohelperowl_attackpat222 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let C = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_escape_value(C)>0 && this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 2, [move, a, a, b]);
}

const autohelperowl_attackpat224 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(a) <= 2;
}

const autohelperowl_attackpat225 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_attackpat226 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);

  return (this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0) && this.play_attack_defend_n(color, 1, 2, [move, c, c]);
}

const autohelperowl_attackpat227 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);

  return this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 2, [move, a, a]);
}

const autohelperowl_attackpat228 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend_n(color, 1, 2, [move, a, B]);
}

const autohelperowl_attackpat229 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_attackpat230 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);

  return  !this.safe_move(a, color) && this.board.countlib(b)>1;
}

const autohelperowl_attackpat231 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(648, trans, move);
  let c = AFFINE_TRANSFORM(610, trans, move);
  let A = AFFINE_TRANSFORM(647, trans, move);

  return  this.owl_escape_value(b)>0 && this.play_attack_defend2_n(color, 0, 3, [move, A, b, c, b])
    && this.play_attack_defend2_n(color, 0, 3, [move, A, b, b, move]);
}

const autohelperowl_attackpat232 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(794, trans, move);
  let B = AFFINE_TRANSFORM(757, trans, move);

  return this.somewhere(this.board.OTHER_COLOR(color), 0, 2, [A, B]) && this.owl_escape_value(A) + this.owl_escape_value(B) > 0;
}

const autohelperowl_attackpat233 = function (trans, move, color, action){
  let e = AFFINE_TRANSFORM(683, trans, move);
  let f = AFFINE_TRANSFORM(720, trans, move);
  let g = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(682, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return  (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0)
    && this.play_attack_defend2_n(color, 0, 4, [move, g, f, e, f, move]);
}

const autohelperowl_attackpat234 = function (trans, move, color, action){
  let e = AFFINE_TRANSFORM(683, trans, move);
  let f = AFFINE_TRANSFORM(720, trans, move);
  let g = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(682, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return  (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0)
    && this.play_attack_defend2_n(color, 0, 4, [move, g, f, e, f, move]);
}

const autohelperowl_attackpat235 = function (trans, move, color, action){
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);
  let e = AFFINE_TRANSFORM(683, trans, move);
  let A = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(757, trans, move);

  return  (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0)
    && ((this.somewhere(this.board.OTHER_COLOR(color), 0, 1, d)
      && this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 2, [move, c, c, e]))
      || (!this.somewhere(this.board.OTHER_COLOR(color), 0, 1, d)
        && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 3, [move, c, d, c, e])));
}

const autohelperowl_attackpat236 = function (trans, move, color, action){
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);
  let e = AFFINE_TRANSFORM(683, trans, move);
  let A = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(757, trans, move);

  return  (this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0)
    && ((this.somewhere(this.board.OTHER_COLOR(color), 0, 1, d)
      && this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 2, [move, c, c, e]))
      || (!this.somewhere(this.board.OTHER_COLOR(color), 0, 1, d)
        && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 3, [move, c, d, c, e])));
}

const autohelperowl_attackpat237 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let C = AFFINE_TRANSFORM(648, trans, move);

  return !this.play_attack_defend_n(color, 1, 2, [move, a, move])
    && (this.somewhere(color, 0, 1, b)
      || !this.play_attack_defend_n(color, 1, 2, [move, b, move])) && !ATTACK_MACRO.call(this, C);
}

const autohelperowl_attackpat239 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(685, trans, move);
  let d = AFFINE_TRANSFORM(722, trans, move);
  let e = AFFINE_TRANSFORM(723, trans, move);
  let f = AFFINE_TRANSFORM(758, trans, move);
  let g = AFFINE_TRANSFORM(759, trans, move);
  let A = AFFINE_TRANSFORM(686, trans, move);

  return !this.owl_goal_dragon(A) && !this.play_attack_defend2_n(color, 1, 5, [move, b, c, d, e, c, e])
    && (this.somewhere(color, 0, 1, f) || !this.play_attack_defend2_n(color, 1, 5, [move, d, b, f, g, b, g]));
}

const autohelperowl_attackpat240 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(688, trans, move);
  let b = AFFINE_TRANSFORM(651, trans, move);
  let c = AFFINE_TRANSFORM(614, trans, move);
  let d = AFFINE_TRANSFORM(577, trans, move);
  let e = AFFINE_TRANSFORM(540, trans, move);
  let f = AFFINE_TRANSFORM(539, trans, move);
  let g = AFFINE_TRANSFORM(538, trans, move);
  let h = AFFINE_TRANSFORM(537, trans, move);
  let i = AFFINE_TRANSFORM(536, trans, move);

  return (this.owl_escape_value(a)>0) + (this.owl_escape_value(b)>0)+(this.owl_escape_value(c)>0) +
    (this.owl_escape_value(d)>0) + (this.owl_escape_value(e)>0) + (this.owl_escape_value(f)>0)+
    (this.owl_escape_value(g)>0) + (this.owl_escape_value(h)>0) + (this.owl_escape_value(i)>0) < 2;
}

const autohelperowl_attackpat241 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(685, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return !this.owl_goal_dragon(A) && !this.play_connect_n(color, 1, 1, [move, A, B]);
}

const autohelperowl_attackpat242 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(722, trans, move);
  let B = AFFINE_TRANSFORM(646, trans, move);

  return !this.play_connect_n(color, 1, 1, [move, A, B]);
}

const autohelperowl_attackpat243 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);
  let C = AFFINE_TRANSFORM(686, trans, move);

  return this.play_connect_n(color, 0, 2, [move, a, B, C]);
}

const autohelperowl_attackpat244 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(758, trans, move);

  return this.owl_strong_dragon(B) && !this.play_connect_n(this.board.OTHER_COLOR(color), 0, 1, [move, A, B]);
}

const autohelperowl_attackpat245 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(758, trans, move);
  let B = AFFINE_TRANSFORM(646, trans, move);

  return this.owl_strong_dragon(B) && !this.play_connect_n(this.board.OTHER_COLOR(color), 0, 1, [move, A, B]);
}

const autohelperowl_attackpat246 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(646, trans, move);

  return this.owl_escape_value(c)>0 && this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 2, [move, a, a, b]);
}

const autohelperowl_attackpat247 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(685, trans, move);

  return  this.play_break_through_n(this.board.OTHER_COLOR(color), 2, [move, a, b, a, c]) === codes.WIN;
}

const autohelperowl_attackpat248 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(685, trans, move);

  return  this.board.countlib(b)<=4 && this.board.countlib(c)<=4
    && this.play_break_through_n(this.board.OTHER_COLOR(color), 2, [move, a, b, a, c]) === codes.WIN;
}

const autohelperowl_attackpat249 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);

  return  this.vital_chain(A) && this.vital_chain(B) && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 1, [move, A, B]);
}

const autohelperowl_attackpat250 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);

  return !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 3, [move, a, b, a, c]);
}

const autohelperowl_attackpat251 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(648, trans, move);
  let A = AFFINE_TRANSFORM(686, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return  this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 2, [move, a, B])
    && !this.play_attack_defend_n(color, 0, 1, [move, A]);
}

const autohelperowl_attackpat252 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let A = AFFINE_TRANSFORM(648, trans, move);

  return !ATTACK_MACRO.call(this, A) && this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 2, [move, a, b]);
}

const autohelperowl_attackpat253 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(648, trans, move);
  let A = AFFINE_TRANSFORM(611, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);

  return !ATTACK_MACRO.call(this, A) && ATTACK_MACRO.call(this, a) && !this.play_attack_defend_n(color, 0, 1,[ move, B]);
}

const autohelperowl_attackpat254 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return  this.vital_chain(a) && this.vital_chain(b) && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 1, [move, a, b]);
}

const autohelperowl_attackpat255 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(648, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);
  let c = AFFINE_TRANSFORM(611, trans, move);

  return this.board.countlib(c)>2 && this.vital_chain(b) && this.vital_chain(c)
    && this.play_attack_defend_n(color, 1, 2, [move, a, a])
    && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 1, [a, b, c]);
}

const autohelperowl_attackpat256 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(610, trans, move);

  return this.board.countlib(c)>2 && this.vital_chain(b) && this.vital_chain(c)
    && this.play_attack_defend_n(color, 1, 2, [move, a, a])
    && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 1, [a, b, c]);
}

const autohelperowl_attackpat257 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(B) > 0 && this.does_defend(move, a);
}

const autohelperowl_attackpat258 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(646, trans, move);
  let b = AFFINE_TRANSFORM(609, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);

  return  this.somewhere(color, 0, 2, [a, b]) && ATTACK_MACRO.call(this, c);
}

const autohelperowl_attackpat261 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);

  return  ATTACK_MACRO.call(this, a);
}

const autohelperowl_attackpat262 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(681, trans, move);
  let b = AFFINE_TRANSFORM(573, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_attackpat263 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(796, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);

  return this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0;
}

const autohelperowl_attackpat265 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let C = AFFINE_TRANSFORM(722, trans, move);
  let D = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(C)>0 && this.owl_goal_dragon(D)
    && !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 1, [move, a, b]);
}

const autohelperowl_attackpat266 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 1, [move, a, b]);
}

const autohelperowl_attackpat267 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 0, 1, [move, a, b]);
}

const autohelperowl_attackpat268 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(610, trans, move);

  return  ATTACK_MACRO.call(this, A) && !this.play_attack_defend_n(color, 1, 1, [move, A]);
}

const autohelperowl_attackpat269 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);
  let D = AFFINE_TRANSFORM(720, trans, move);
  let E = AFFINE_TRANSFORM(685, trans, move);

  return (this.owl_escape_value(a)>0 || this.owl_escape_value(b)>0)
    && ((this.somewhere(color, 0, 1, E) || this.somewhere(this.board.OTHER_COLOR(color), 0, 1, E))
      || this.owl_escape_value(a) < 0) && !this.play_attack_defend2_n(color, 1, 3, [move, c, D, move, D]);
}

const autohelperowl_attackpat270 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(647, trans, move);

  return !this.board.same_string(a, b) && (this.board.countlib(a) <= 4 || this.board.countlib(b) <= 4 || this.board.countlib(c) <= 4);
}

const autohelperowl_attackpat271 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return !this.owl_goal_dragon(b) && !this.play_connect_n(color, 1, 1, [move, a, b]);
}

const autohelperowl_attackpat272 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return !this.owl_goal_dragon(a) && !this.play_connect_n(color, 1, 1, [move, a, b]);
}

const autohelperowl_attackpat273 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return this.board.countlib(a) === 2 && !this.play_connect_n(color, 1, 1, [move, a, b]);
}

const autohelperowl_attackpat274 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(757, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);
  let E = AFFINE_TRANSFORM(683, trans, move);

  return  (this.owl_escape_value(a) > 0 || this.owl_escape_value(b) > 0)
    && this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 3, [move, c, d, c, E]);
}

const autohelperowl_attackpat275 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(757, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);
  let E = AFFINE_TRANSFORM(683, trans, move);

  return  (this.owl_escape_value(a) > 0 || this.owl_escape_value(b) > 0)
    && this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 3, [move, c, d, c, E]);
}

const autohelperowl_attackpat276 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(758, trans, move);
  let c = AFFINE_TRANSFORM(722, trans, move);
  let d = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(720, trans, move);

  return (this.owl_escape_value(c) > 0 || this.owl_escape_value(b) > 0)
    && this.play_attack_defend2_n(color, 0, 2, [move, d, A, move]);
}

const autohelperowl_attackpat277 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(722, trans, move);
  let d = AFFINE_TRANSFORM(685, trans, move);
  let e = AFFINE_TRANSFORM(647, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);

  return (this.owl_escape_value(d) > 0 || this.owl_escape_value(b) > 0 || this.owl_escape_value(c) > 0)
    && !this.play_attack_defend2_n(color, 0, 2, [e, move, A, e]);
}

const autohelperowl_attackpat278 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(610, trans, move);
  let c = AFFINE_TRANSFORM(611, trans, move);
  let d = AFFINE_TRANSFORM(648, trans, move);
  let e = AFFINE_TRANSFORM(647, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);

  return (this.owl_escape_value(d) > 0 || this.owl_escape_value(b) > 0 || this.owl_escape_value(c) > 0)
    && this.play_connect_n(this.board.OTHER_COLOR(color), 1, 2, [e, move, e, A])
    && this.play_connect_n(color, 0, 2, [move, e, e, A]);
}

const autohelperowl_attackpat280 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);

  return  this.vital_chain(a) && this.vital_chain(b)
    && this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 1, [move, a, b])
    && !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 1, [move, a, b]);
}

const autohelperowl_attackpat281 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(647, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);
  let A = AFFINE_TRANSFORM(646, trans, move);

  return  (ATTACK_MACRO.call(this, A) !== codes.WIN || (this.board.countstones(A)<=2 && this.does_attack(move, A)))
    && (!this.owl_goal_dragon(b) || !this.owl_goal_dragon(c));
}

const autohelperowl_attackpat282 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(647, trans, move);
  let c = AFFINE_TRANSFORM(683, trans, move);
  let A = AFFINE_TRANSFORM(646, trans, move);

  return  (ATTACK_MACRO.call(this, A) !== codes.WIN || (this.board.countstones(A)<=2 && this.does_attack(move, A)))
    && (!this.owl_goal_dragon(b) || !this.owl_goal_dragon(c));
}

const autohelperowl_attackpat283 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(722, trans, move);
  let d = AFFINE_TRANSFORM(648, trans, move);

  return  this.owl_escape_value(a) > 0
    && this.play_attack_defend_n(color, 1, 1, [move, b])
    && !this.play_attack_defend_n(color, 1, 3, [move, c, d, d]);
}

const autohelperowl_attackpat284 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(722, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 2, [move, a, B]);
}

const autohelperowl_attackpat286 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(649, trans, move);

  return this.owl_strong_dragon(A) && !this.play_connect_n(this.board.OTHER_COLOR(color), 0, 1, [move, A, B]);
}

const autohelperowl_attackpat288 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(610, trans, move);
  let b = AFFINE_TRANSFORM(611, trans, move);
  let c = AFFINE_TRANSFORM(612, trans, move);
  let d = AFFINE_TRANSFORM(649, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) +this.owl_escape_value(c) + this.owl_escape_value(d) > 0;
}

const autohelperowl_attackpat289 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(611, trans, move);
  let b = AFFINE_TRANSFORM(612, trans, move);
  let c = AFFINE_TRANSFORM(613, trans, move);
  let d = AFFINE_TRANSFORM(650, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) +this.owl_escape_value(c) + this.owl_escape_value(d) > 0;
}

const autohelperowl_attackpat290 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(646, trans, move);

  return  this.board.countlib(a) === 1 && this.owl_escape_value(B) > 0;
}

const autohelperowl_attackpat291 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);

  return  this.board.countlib(a) === 1 && this.owl_escape_value(B) > 0;
}

const autohelperowl_attackpat292 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);

  return  this.board.countlib(a) === 1;
}

const autohelperowl_attackpat293 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);

  return  this.board.countlib(a) === 1;
}

const autohelperowl_attackpat294 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(610, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(A)>0
    && !this.play_connect_n(this.board.OTHER_COLOR(color), 0, 1,[ move, A, B])
    && !this.play_connect_n(color, 1, 1, [move, A, B]);
}

const autohelperowl_attackpat295 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(686, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_escape_value(A)>0
    && !this.play_connect_n(this.board.OTHER_COLOR(color), 0, 1, [move, A, B])
    && !this.play_connect_n(color, 1, 1, [move, A, B]);
}

const autohelperowl_attackpat296 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(645, trans, move);
  let b = AFFINE_TRANSFORM(682, trans, move);
  let c = AFFINE_TRANSFORM(719, trans, move);

  return this.owl_escape_value(a) + this.owl_escape_value(b) + this.owl_escape_value(c) > 0;
}

const autohelperowl_attackpat298 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(722, trans, move);
  let b = AFFINE_TRANSFORM(759, trans, move);
  let c = AFFINE_TRANSFORM(796, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);

  return this.play_attack_defend_n(color, 1, 1, [b, d])
    && this.play_attack_defend_n(color, 1, 2, [move, a, a])
    && this.play_attack_defend_n(color, 1, 4, [move, b, NO_MOVE, a, a])
    && !this.play_attack_defend_n(color, 1, 2, [move, b, c]);
}

const autohelperowl_attackpat299 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(A) > 0 && this.play_connect_n(this.board.OTHER_COLOR(color), 0, 1, move, A, B) !== codes.WIN;
}

const autohelperowl_attackpat300 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(646, trans, move);
  let B = AFFINE_TRANSFORM(720, trans, move);

  return this.owl_escape_value(B) > 0 && this.play_connect_n(this.board.OTHER_COLOR(color), 0, 1, move, A, B) !== codes.WIN;
}

const autohelperowl_attackpat301 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return !this.play_connect_n(color, 1, 1, move, a, b);
}

const autohelperowl_attackpat302 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);

  return !this.play_connect_n(color, 1, 1, move, a, b);
}

const autohelperowl_attackpat303 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(720, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return  (this.board.countlib(a)===1) && (this.board.countlib(B)===1);
}

const autohelperowl_attackpat304 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countstones(A)>3 && this.board.countlib(A)===1;
}

const autohelperowl_attackpat305 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countstones(A)<=3 && this.board.countlib(A)===1 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null) > 1;
}

const autohelperowl_attackpat306 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countstones(A)>3 && this.does_attack(move, A);
}

const autohelperowl_attackpat307 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countstones(A)<=3 && this.does_attack(move, A)
    && (this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null) > 1 || this.board.is_ko_point(move));
}

const autohelperowl_attackpat308 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(721, trans, move);

  return  this.does_attack(move, A);
}

const autohelperowl_attackpat310 = function (trans, move, color, action){
  return this.owl_proper_eye(move);
}

const autohelperowl_attackpat311 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(647, trans, move);
  let C = AFFINE_TRANSFORM(721, trans, move);

  return ATTACK_MACRO.call(this, a)
    && !this.play_attack_defend_n(color, 1, 1, [move, a])
    && !this.play_attack_defend2_n(color, 0, 1, [move, B, C]);
}

const autohelperowl_attackpat312 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(643, trans, move);
  let b = AFFINE_TRANSFORM(644, trans, move);

  return  this.somewhere(color, 0, 2, [a, b]);
}

const autohelperowl_attackpat316 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return DEFEND_MACRO.call(this, a) !== codes.WIN;
}

const autohelperowl_attackpat317 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(720, trans, move);
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countlib(A)===2 && !this.obvious_false_eye(b, this.board.OTHER_COLOR(color));
}

const autohelperowl_attackpat323 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);

  return this.board.countlib(a)>1 && !this.obvious_false_eye(b, this.board.OTHER_COLOR(color));
}

const autohelperowl_attackpat330 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(609, trans, move);

  return !ATTACK_MACRO.call(this, a);
}

const autohelperowl_attackpat333 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(645, trans, move);

  return this.board.countlib(A) === 4 && ATTACK_MACRO.call(this, A) !== codes.WIN;
}

const autohelperowl_attackpat334 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(757, trans, move);

  return this.board.countlib(A) === 2 && ATTACK_MACRO.call(this, A) !== codes.WIN;
}

const autohelperowl_attackpat335 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(646, trans, move);

  return !ATTACK_MACRO.call(this, A);
}

const autohelperowl_attackpat337 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(682, trans, move);

  return !ATTACK_MACRO.call(this, A);
}

const autohelperowl_attackpat348 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(722, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)<=3 && DEFEND_MACRO.call(this, a) !== codes.WIN;
}

const autohelperowl_attackpat349 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(757, trans, move);

  return this.play_attack_defend_n(color, 1, 1, [a, a]);
}

const autohelperowl_attackpat350 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);

  return this.play_attack_defend_n(color, 0, 2, [move, a, move]);
}

const autohelperowl_attackpat351 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(609, trans, move);
  let B = AFFINE_TRANSFORM(610, trans, move);

  return !this.somewhere(this.board.OTHER_COLOR(color), 0, 1, a) || (this.board.countlib(B) <= 6);
}

const autohelperowl_attackpat353 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(573, trans, move);

  return this.play_attack_defend_n(color, 1, 1, [a, a]) !== 0
    && !this.play_attack_defend_n(color, 1, 1, [a, b]);
}

const autohelperowl_attackpat354 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(759, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);

  return this.play_attack_defend_n(color, 1, 1, [a, c]) !== 0
    || this.play_attack_defend_n(color, 1, 1, [a, a]);
}

const autohelperowl_attackpat355 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(757, trans, move);
  let c = AFFINE_TRANSFORM(720, trans, move);
  let d = AFFINE_TRANSFORM(758, trans, move);

  return !this.play_attack_defend_n(color, 1, 3, [move, a, b, b])
    && this.play_attack_defend_n(color, 0, 2, [move, c, d]);
}

const autohelperowl_attackpat367 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(645, trans, move);
  let B = AFFINE_TRANSFORM(719, trans, move);

  return this.board.countlib(a)===1 && this.board.countlib(B)<=3 && DEFEND_MACRO.call(this, a)!==codes.WIN;
}

const autohelperowl_attackpat368 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(722, trans, move);

  return !ATTACK_MACRO.call(this, A);
}

const autohelperowl_attackpat369 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(722, trans, move);

  return !ATTACK_MACRO.call(this, A);
}

const autohelperowl_attackpat370 = function (trans, move, color, action){
  let A;

  A = AFFINE_TRANSFORM(718, trans, move);

  return this.board.countlib(A)===3;
}

const autohelperowl_attackpat372 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);

  return this.is_proper_eye_space(a);
}

const autohelperowl_attackpat373 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);
  let c = AFFINE_TRANSFORM(647, trans, move);

  return this.is_proper_eye_space(a) && this.play_attack_defend_n(color, 0, 3, [move, b, c, move]);
}

const autohelperowl_attackpat376 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)===2 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>1 && this.finish_ko_helper(A);
}

const autohelperowl_attackpat377 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)===2 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>1 && this.finish_ko_helper(A);
}

const autohelperowl_attackpat378 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0;
}

const autohelperowl_attackpat379 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return this.owl_escape_value(A) > 0 || this.owl_escape_value(B) > 0;
}

const autohelperowl_attackpat380 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(614, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);
  let c = AFFINE_TRANSFORM(648, trans, move);

  return !ATTACK_MACRO.call(this, a) && !this.play_attack_defend_n(this.board.OTHER_COLOR(color), 0, 1, [b, c]);
}

const autohelperowl_attackpat381 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let c = AFFINE_TRANSFORM(648, trans, move);

  return !this.safe_move(a, color)
    && this.play_attack_defend_n(color, 0, 2, [move, a, move])
    && !this.play_attack_defend_n(color, 1, 3, [move, b, c, c]);
}

const autohelperowl_attackpat382 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);
  let C = AFFINE_TRANSFORM(682, trans, move);

  return !this.play_attack_defend_n(color, 0, 3, [move, a, b, C]);
}

const autohelperowl_attackpat383 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(647, trans, move);
  let C = AFFINE_TRANSFORM(610, trans, move);

  return !this.play_attack_defend_n(color, 0, 3, [move, a, b, C]);
}

const autohelperowl_attackpat384 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(758, trans, move);

  return !this.play_attack_defend_n(color, 0, 3, [move, NO_MOVE, a, B]);
}

const autohelperowl_attackpat385 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(758, trans, move);

  return !this.play_attack_defend_n(color, 0, 3, [move, NO_MOVE, a, B]);
}

const autohelperowl_attackpat386 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(683, trans, move);
  let B = AFFINE_TRANSFORM(682, trans, move);

  return !this.play_attack_defend_n(color, 0, 3, [move, NO_MOVE, a, B]);
}

const autohelperowl_attackpat387 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(610, trans, move);

  return !this.play_attack_defend_n(color, 0, 3, [move, NO_MOVE, a, B]);
}

const autohelperowl_attackpat391 = function (trans, move, color, action){
  let b = AFFINE_TRANSFORM(571, trans, move);
  let c = AFFINE_TRANSFORM(647, trans, move);
  let d = AFFINE_TRANSFORM(646, trans, move);
  let e = AFFINE_TRANSFORM(609, trans, move);
  let f = AFFINE_TRANSFORM(683, trans, move);
  let A = AFFINE_TRANSFORM(608, trans, move);

  return this.board.countlib(A)===3 && !ATTACK_MACRO.call(this, b)
    && !this.play_attack_defend_n(color, 1, 5, [move, c, d, e, f, f]);
}

const autohelperowl_attackpat392 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);
  let d = AFFINE_TRANSFORM(720, trans, move);
  let e = AFFINE_TRANSFORM(683, trans, move);
  let f = AFFINE_TRANSFORM(794, trans, move);

  return this.play_attack_defend_n(color, 1, 6, [move, a, b, c, d, e, e])
    && !this.play_attack_defend_n(color, 1, 1, [move, f]);
}

const autohelperowl_attackpat393 = function (trans, move, color, action){
  let e = AFFINE_TRANSFORM(685, trans, move);
  let A = AFFINE_TRANSFORM(797, trans, move);
  let B = AFFINE_TRANSFORM(686, trans, move);
  let C = AFFINE_TRANSFORM(760, trans, move);
  let D = AFFINE_TRANSFORM(722, trans, move);

  return this.board.countlib(A) > 2 && !this.play_attack_defend_n(color, 0, 7, [move, NO_MOVE, B, NO_MOVE, C, NO_MOVE, D, e]);
}

const autohelperowl_attackpat395 = function (trans, move, color, action){
  let A = AFFINE_TRANSFORM(757, trans, move);
  let B = AFFINE_TRANSFORM(756, trans, move);

  return  this.board.countlib(A) === 2 && this.board.countlib(B) > 1 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null) > 1;
}

const autohelperowl_attackpat396 = function (trans, move, color, action){
  let a = AFFINE_TRANSFORM(682, trans, move);
  let B = AFFINE_TRANSFORM(644, trans, move);

  return  this.owl_proper_eye(a) && !ATTACK_MACRO.call(this, B);
}

const rawAttrs = [
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.THREATENS_TO_CAPTURE,0.0,757],
  [attributeType.LAST_ATTRIBUTE,0.0,0],
  [attributeType.THREATENS_EYE,0.0,682],
  [attributeType.LAST_ATTRIBUTE,0.0,0]
]

const attributes = rawAttrs.map(item => {
  return new PatternAttribute(item)
})

const data = [
[owl_attackpat0,3,8, "A1",-1,-2,2,2,3,4,0x2,683,
  [ 0xfdffffff, 0xfcfcfcf4, 0xfffffc00, 0xffffff3f, 0xfcfcfcf0, 0xfffffd00, 0xffffff7f, 0xfcffffff],
  [ 0x041a0000, 0x00102420, 0x00904000, 0x60100000, 0x24100000, 0x001a0400, 0x00106020, 0x40900000]
  , 0x20,80.000000,attributes[0],1,null,autohelperowl_attackpat0,0,0.010000],
[owl_attackpat1,3,8, "A2",-2,-2,2,2,4,4,0x2,683,
  [ 0xfdffffff, 0xfffffff7, 0xfffffcfc, 0xffffff3f, 0xfffffff0, 0xfffffdff, 0xffffff7f, 0xfcffffff],
  [ 0x00180000, 0x00102200, 0x00900080, 0x20100000, 0x22100000, 0x00180008, 0x00102000, 0x00900000]
  , 0x0,65.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat2,2,8, "A3",-1,-2,2,1,3,3,0x2,720,
  [ 0xfcfcf000, 0xffff3f00, 0x3fffffff, 0xf0fcfcfc, 0x3fffffff, 0xf0fcfcfc, 0xfcfcf000, 0xffff3f00],
  [ 0x00242000, 0x00a11000, 0x20600010, 0x10280000, 0x10a10000, 0x20240010, 0x00281000, 0x00602000]
  , 0x0,65.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat3,1,8, "A101",-1,0,2,2,3,2,0x2,721,
  [ 0x3f3f3800, 0x00ffbf3f, 0xb0f0f0f0, 0xf8fc0000, 0xbfff0000, 0x383f3f3f, 0x00fcf8f0, 0xf0f0b000],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x0,70.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat4,3,8, "A102",-1,-2,2,2,3,4,0x2,721,
  [ 0xfcffffff, 0xfcfcfcf0, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xfffffc00, 0xffffff3f, 0xffffffff],
  [ 0x40902000, 0x24900000, 0x201a0500, 0x00186060, 0x00902424, 0x20904000, 0x60180000, 0x051a2000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat5,4,8, "A103",-2,-2,1,1,3,3,0x2,720,
  [ 0xfdfdfc00, 0xfcfeff14, 0xfcfcfce0, 0xfcfcfc00, 0xfffefc00, 0xfcfdfd2c, 0xfcfcfc50, 0xfcfcfc00],
  [ 0x80900000, 0x28100100, 0x00180840, 0x0010a000, 0x01102800, 0x00908004, 0xa0100000, 0x08180000]
  , 0x0,50.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat6,2,8, "A104",-1,-2,2,1,3,3,0x2,721,
  [ 0xfcffffff, 0xfcfcfcf0, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfffffc00, 0xffffff3f, 0xfcfcfcfc],
  [ 0x40902000, 0x24900000, 0x20180400, 0x00186000, 0x00902400, 0x20904000, 0x60180000, 0x04182000]
  , 0x0,90.000000,attributes[0],1,null,autohelperowl_attackpat6,0,0.010000],
[owl_attackpat7,3,8, "A105",-1,-3,2,2,3,5,0x2,721,
  [ 0x7fffffff, 0xf4fcfcfc, 0xfffff700, 0xffff7fff, 0xfcfcf4fc, 0xffff7f00, 0x7fffffff, 0xf7ffffff],
  [ 0x10200000, 0x00240000, 0x00201200, 0x00600080, 0x00240008, 0x00201000, 0x00600000, 0x12200000]
  , 0x0,99.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat8,3,8, "A106",-2,-2,1,1,3,3,0x2,683,
  [ 0xffffff00, 0xfcfcfffc, 0xfcfcfcc0, 0xfcfcfc00, 0xfffcfc00, 0xffffff0c, 0xfcfcfcfc, 0xfcfcfc00],
  [ 0x40620000, 0x14200220, 0x00240480, 0x00205000, 0x02201400, 0x00624008, 0x50200020, 0x04240000]
  , 0x0,60.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat9,1,8, "A107",-1,0,2,4,3,4,0x2,686,
  [ 0x00ffffff, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3f, 0x00fcfcfc],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat10,3,8, "A108",-1,-1,1,1,2,2,0x2,646,
  [ 0xf4f4fc00, 0xfcfcd400, 0xfc7c7c00, 0x5cfcfc00, 0xd4fcfc00, 0xfcf4f400, 0xfcfc5c00, 0x7c7cfc00],
  [ 0x00600000, 0x10200000, 0x00240000, 0x00201000, 0x00201000, 0x00600000, 0x10200000, 0x00240000]
  , 0x20,70.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat11,1,8, "A109",-1,0,2,2,3,2,0x2,685,
  [ 0x00f8fcf8, 0xf0f0e000, 0xffbf0000, 0x2e3f3f3f, 0xe0f0f0f0, 0xfcf80000, 0x3f3f2e00, 0x00bfffbf],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x0,79.000000,attributes[0],1,null,autohelperowl_attackpat11,3,0.016000],
[owl_attackpat12,3,8, "A110",-1,-1,2,2,3,3,0x2,721,
  [ 0xfeffffff, 0xfcfcfcf8, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfffffe00, 0xffffffbf, 0xfcfcfcfc],
  [ 0x4090a000, 0xa4900000, 0x28180400, 0x00186800, 0x0090a400, 0xa0904000, 0x68180000, 0x04182800]
  , 0x0,85.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat13,2,8, "A111",-2,0,2,3,4,3,0x2,686,
  [ 0x0037ffff, 0xc0f0d0f0, 0xff700000, 0x1f3f0f0e, 0xd0f0c0c0, 0xff370000, 0x0f3f1f3f, 0x0070fffe],
  [ 0x00200000, 0x00200000, 0x01200000, 0x00200004, 0x00200040, 0x00200000, 0x00200000, 0x00200100]
  , 0x0,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat14,2,8, "A112",-1,-2,2,1,3,3,0x2,683,
  [ 0xfcfcf000, 0xffff3f00, 0x3fffffff, 0xf0fcfcfc, 0x3fffffff, 0xf0fcfcfc, 0xfcfcf000, 0xffff3f00],
  [ 0x00242000, 0x00a11000, 0x20600010, 0x10280000, 0x10a10000, 0x20240010, 0x00281000, 0x00602000]
  , 0x0,79.000000,attributes[0],1,null,autohelperowl_attackpat14,3,0.010000],
[owl_attackpat15,3,8, "A113",-2,-3,1,0,3,3,0x8,685,
  [ 0x003ffdff, 0xc0f0f070, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xfd3f0000, 0x0f3f3f37, 0x00f0fcfc],
  [ 0x00128000, 0x80100020, 0x08100000, 0x00100800, 0x00108000, 0x80120000, 0x08100020, 0x00100800]
  , 0x80,99.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat16,2,8, "A114",0,-2,3,1,3,3,0x8,686,
  [ 0x00fcfcfc, 0xf0f0f000, 0xffff0000, 0x3f3f3f3f, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0x00ffffff],
  [ 0x00200004, 0x00200000, 0x00200000, 0x01200000, 0x00200000, 0x00200000, 0x00200100, 0x00200040]
  , 0x80,99.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat17,2,8, "A115",0,-3,3,1,3,4,0x2,648,
  [ 0x00f0fcfc, 0xf0f0c000, 0xff3f0000, 0x0f3f3f3f, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0f00, 0x003fffff],
  [ 0x00200800, 0x00208000, 0x80200000, 0x08200000, 0x80200000, 0x08200000, 0x00200800, 0x00208000]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_attackpat17,3,0.010000],
[owl_attackpat18,4,8, "A201",-1,-2,2,2,3,4,0x2,611,
  [ 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xffffff00, 0xffffffff, 0xffffffff],
  [ 0x055aa000, 0x90902424, 0x28944000, 0x60181800, 0x24909000, 0xa05a0500, 0x18186060, 0x40942800]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_attackpat18,0,1.600000],
[owl_attackpat19,4,8, "A203",-1,-2,1,1,2,3,0x2,721,
  [ 0x0c7dff00, 0xd0f0fcd0, 0xfcf4c000, 0xfc3c1c00, 0xfcf0d000, 0xff7d0c00, 0x1c3cfc1c, 0xc0f4fc00],
  [ 0x04208000, 0x80200400, 0x08204000, 0x40200800, 0x04208000, 0x80200400, 0x08204000, 0x40200800]
  , 0x80,60.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat20,1,8, "A204",0,-2,2,2,2,4,0x2,685,
  [ 0x0030fcff, 0xc0f0c000, 0xfc300000, 0x0f3f0f03, 0xc0f0c000, 0xfc300000, 0x0f3f0f03, 0x0030fcff],
  [ 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x80100000, 0x08100000, 0x00100800, 0x00108000]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat21,2,8, "A205",-1,-1,1,1,2,2,0x2,647,
  [ 0xb0fcfc00, 0xf8fcf000, 0xfcfc3800, 0x3cfcbc00, 0xf0fcf800, 0xfcfcb000, 0xbcfc3c00, 0x38fcfc00],
  [ 0x10280000, 0x00242000, 0x00a01000, 0x20600000, 0x20240000, 0x00281000, 0x00602000, 0x10a00000]
  , 0x0,60.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat22,2,8, "A205b",-1,-1,1,1,2,2,0x2,721,
  [ 0x38fcfc00, 0xf0fcf800, 0xfcfcb000, 0xbcfc3c00, 0xf8fcf000, 0xfcfc3800, 0x3cfcbc00, 0xb0fcfc00],
  [ 0x10a01000, 0x20640000, 0x10281000, 0x00642000, 0x00642000, 0x10a01000, 0x20640000, 0x10281000]
  , 0x0,70.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat23,2,8, "A206",-1,-1,2,1,3,2,0x2,648,
  [ 0x30bcfcfc, 0xe0fcf000, 0xfcf83000, 0x3fff2f00, 0xf0fce000, 0xfcbc3000, 0x2fff3f00, 0x30f8fcfc],
  [ 0x10182000, 0x00942000, 0x20901000, 0x20580000, 0x20940000, 0x20181000, 0x00582000, 0x10902000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat24,2,8, "A206b",-1,-1,2,1,3,2,0x2,722,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x04902000, 0x20900400, 0x20184000, 0x40182000, 0x04902000, 0x20900400, 0x20184000, 0x40182000]
  , 0x0,78.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat25,1,8, "A207",0,0,2,2,2,2,0x2,722,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x0,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat26,3,8, "A207b",0,-2,2,1,2,3,0x2,722,
  [ 0x007f7f3f, 0x50f0f0f0, 0xf4f40000, 0x3f3f1400, 0xf0f05000, 0x7f7f0000, 0x143f3f3f, 0x00f4f4f0],
  [ 0x00210000, 0x00200010, 0x00200000, 0x00200000, 0x00200000, 0x00210000, 0x00200010, 0x00200000]
  , 0x0,58.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat27,5,8, "A207c",0,-3,2,2,2,5,0x2,722,
  [ 0x007f7f3f, 0x50f0f0f0, 0xf5f50000, 0x3f3f1414, 0xf0f05050, 0x7f7f0000, 0x143f3f3f, 0x00f5f5f0],
  [ 0x00210000, 0x00200010, 0x00200000, 0x00200000, 0x00200000, 0x00210000, 0x00200010, 0x00200000]
  , 0x0,78.000000,attributes[0],1,null,autohelperowl_attackpat27,3,0.610000],
[owl_attackpat28,6,8, "A207d",0,-3,2,2,2,5,0x2,722,
  [ 0x007f7f3f, 0x50f0f0f0, 0xf5f50000, 0x3f3f1414, 0xf0f05050, 0x7f7f0000, 0x143f3f3f, 0x00f5f5f0],
  [ 0x00210000, 0x00200010, 0x00200000, 0x00200000, 0x00200000, 0x00210000, 0x00200010, 0x00200000]
  , 0x80,60.000000,attributes[0],1,null,autohelperowl_attackpat28,3,1.000000],
[owl_attackpat29,2,8, "A208a",-1,-2,1,0,2,2,0x2,686,
  [ 0x00bcbcfc, 0xa0f0f000, 0xf8f80000, 0x3f3f2b00, 0xf0f0a000, 0xbcbc0000, 0x2b3f3f00, 0x00f8f8fc],
  [ 0x00280004, 0x00202000, 0x00a00000, 0x21200000, 0x20200000, 0x00280000, 0x00202100, 0x00a00040]
  , 0x0,55.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat30,1,8, "A208b",-1,-2,1,0,2,2,0x2,686,
  [ 0x00f8f8fc, 0xf0f0a000, 0xbcbc0000, 0x2b3f3f00, 0xa0f0f000, 0xf8f80000, 0x3f3f2b00, 0x00bcbcfc],
  [ 0x00200040, 0x00200000, 0x00200000, 0x00200100, 0x00200000, 0x00200000, 0x01200000, 0x00200004]
  , 0x0,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat31,4,8, "A208c",-1,0,2,2,3,2,0x2,722,
  [ 0x003ffe7e, 0xc0f0f0b0, 0xfcf00000, 0x3f3f0d00, 0xf0f0c000, 0xfe3f0000, 0x0d3f3f3a, 0x00f0fcf4],
  [ 0x00108028, 0x80100000, 0x08100000, 0x02120800, 0x00108000, 0x80100000, 0x08120200, 0x001008a0]
  , 0x0,56.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat32,2,8, "A208d",-1,-2,1,0,2,2,0x2,647,
  [ 0xf0f0a000, 0xbcbc0000, 0x2b3f3f00, 0x00f8f8fc, 0x00bcbcfc, 0xa0f0f000, 0xf8f80000, 0x3f3f2b00],
  [ 0x20200000, 0x00280000, 0x00202100, 0x00a00040, 0x00280004, 0x00202000, 0x00a00000, 0x21200000]
  , 0x0,56.000000,attributes[0],1,null,autohelperowl_attackpat32,3,1.000000],
[owl_attackpat33,1,8, "A208e",-1,-2,1,0,2,2,0x2,647,
  [ 0xf0f0a000, 0xbcbc0000, 0x2b3f3f00, 0x00f8f8fc, 0x00bcbcfc, 0xa0f0f000, 0xf8f80000, 0x3f3f2b00],
  [ 0x00200000, 0x00200000, 0x00200100, 0x00200040, 0x00200004, 0x00200000, 0x00200000, 0x01200000]
  , 0x0,56.000000,attributes[0],1,null,autohelperowl_attackpat33,3,1.000000],
[owl_attackpat34,3,8, "A209",-1,-1,1,2,2,3,0x2,721,
  [ 0x3a7f7f00, 0x50fcf8f8, 0xf4f4b000, 0xbcfc1400, 0xf8fc5000, 0x7f7f3a00, 0x14fcbcbc, 0xb0f4f400],
  [ 0x10200000, 0x00240000, 0x00201000, 0x00600000, 0x00240000, 0x00201000, 0x00600000, 0x10200000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_attackpat34,3,0.010000],
[owl_attackpat35,5,8, "A210",-1,-1,1,3,2,4,0x2,721,
  [ 0x3c7f7f00, 0x50fcfcf0, 0xf4f4f000, 0xfcfc1400, 0xfcfc5000, 0x7f7f3c00, 0x14fcfc3c, 0xf0f4f400],
  [ 0x14200000, 0x00240400, 0x00205000, 0x40600000, 0x04240000, 0x00201400, 0x00604000, 0x50200000]
  , 0x80,85.000000,attributes[0],1,null,autohelperowl_attackpat35,3,0.010000],
[owl_attackpat36,1,8, "A211",0,-1,3,2,3,3,0x2,723,
  [ 0x0038bfbf, 0x80f0e0c0, 0xf8b00000, 0x2f3f0a00, 0xe0f08000, 0xbf380000, 0x0a3f2f0f, 0x00b0f8f8],
  [ 0x00100200, 0x00100080, 0x00100000, 0x00100000, 0x00100000, 0x02100000, 0x00100008, 0x00100000]
  , 0x0,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat37,3,8, "A214",-1,-1,1,2,2,3,0x1,685,
  [ 0x7cfcfc3c, 0xf4fcfc00, 0xfcfcf400, 0xffff7c00, 0xfcfcf400, 0xfcfc7c00, 0x7cffff00, 0xf4fcfcf0],
  [ 0x20904000, 0x60180000, 0x04182000, 0x00902400, 0x00186000, 0x40902000, 0x24900000, 0x20180400]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_attackpat37,0,0.010000],
[owl_attackpat38,4,8, "A215",-1,-1,2,2,3,3,0x2,647,
  [ 0x40f8fcf4, 0xf4f0e000, 0xffbf0700, 0x2d3f7fff, 0xe0f0f4fc, 0xfcf84000, 0x7f3f2d00, 0x07bfff7f],
  [ 0x00102420, 0x00904000, 0x60100000, 0x041a0000, 0x40900000, 0x24100000, 0x001a0400, 0x00106020]
  , 0x80,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat39,2,8, "A216",-1,-1,2,1,3,2,0x2,722,
  [ 0x0cfcfcfc, 0xf0f0fc00, 0xfcfcc000, 0xff3f3f00, 0xfcf0f000, 0xfcfc0c00, 0x3f3fff00, 0xc0fcfcfc],
  [ 0x04a40000, 0x20201400, 0x00684000, 0x50202000, 0x14202000, 0x00a40400, 0x20205000, 0x40680000]
  , 0x0,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat40,2,8, "A216b",-1,-1,2,1,3,2,0x2,685,
  [ 0x0cfcfcfc, 0xf0f0fc00, 0xfcfcc000, 0xff3f3f00, 0xfcf0f000, 0xfcfc0c00, 0x3f3fff00, 0xc0fcfcfc],
  [ 0x04a40000, 0x20201400, 0x00684000, 0x50202000, 0x14202000, 0x00a40400, 0x20205000, 0x40680000]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_attackpat40,3,1.000000],
[owl_attackpat41,2,8, "A217",0,-1,2,2,2,3,0x2,685,
  [ 0x003fffff, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3f0000, 0x0f3f3f3f, 0x00f0fcfc],
  [ 0x001a0000, 0x00102020, 0x00900000, 0x20100000, 0x20100000, 0x001a0000, 0x00102020, 0x00900000]
  , 0x0,40.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat42,2,8, "A217b",0,-1,2,2,2,3,0x2,685,
  [ 0x003fffff, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3f0000, 0x0f3f3f3f, 0x00f0fcfc],
  [ 0x001a0000, 0x00102020, 0x00900000, 0x20100000, 0x20100000, 0x001a0000, 0x00102020, 0x00900000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_attackpat42,0,0.010000],
[owl_attackpat43,2,8, "A217c",0,-1,2,2,2,3,0x2,685,
  [ 0x00ffffff, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3f, 0x00fcfcfc],
  [ 0x001a0000, 0x00102020, 0x00900000, 0x20100000, 0x20100000, 0x001a0000, 0x00102020, 0x00900000]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_attackpat43,0,3.000000],
[owl_attackpat44,2,8, "A218",-1,-1,2,2,3,3,0x2,685,
  [ 0xffffffff, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xffffff00, 0xffffffff, 0xfcfcfcfc],
  [ 0x051a0000, 0x00102424, 0x00904000, 0x60100000, 0x24100000, 0x001a0500, 0x00106060, 0x40900000]
  , 0x0,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat45,2,8, "A219",-1,-1,2,2,3,3,0x2,722,
  [ 0xfcfcfffc, 0xfcfcfcc0, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfffcfc00, 0xffffff0c, 0xfcfcfcfc],
  [ 0x40902000, 0x24900000, 0x20180400, 0x00186000, 0x00902400, 0x20904000, 0x60180000, 0x04182000]
  , 0x10,70.000000,attributes[0],1,null,autohelperowl_attackpat45,0,0.277760],
[owl_attackpat46,4,8, "A220",-2,-1,1,2,3,3,0x2,721,
  [ 0x177fff00, 0xd0f4f4fc, 0xfcf45000, 0x7c7c1c00, 0xf4f4d000, 0xff7f1700, 0x1c7c7cfc, 0x50f4fc00],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat46,3,0.376000],
[owl_attackpat47,4,8, "A221",-2,-1,1,3,3,4,0x2,758,
  [ 0x177fff00, 0xd0f4f4fc, 0xfcf45000, 0x7c7c1c00, 0xf4f4d000, 0xff7f1700, 0x1c7c7cfc, 0x50f4fc00],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_attackpat47,3,0.010000],
[owl_attackpat48,3,8, "A222",-2,-2,1,3,3,5,0x2,721,
  [ 0xeaffff00, 0xfefbfaf8, 0xffffacb8, 0xbcbcfc3c, 0xfafbfef0, 0xffffeab8, 0xfcbcbcbc, 0xacffff00],
  [ 0x40608000, 0x94210000, 0x08260410, 0x00205820, 0x00219420, 0x80604010, 0x58200000, 0x04260800]
  , 0x0,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat49,1,8, "A223",0,0,2,2,2,2,0x2,759,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat49,0,0.610000],
[owl_attackpat50,2,8, "A224",-1,-1,2,2,3,3,0x2,722,
  [ 0x00fcffff, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfffc0000, 0x3f3f3f0f, 0x00fcfcfc],
  [ 0x0050a000, 0x90900000, 0x28140000, 0x00181800, 0x00909000, 0xa0500000, 0x18180000, 0x00142800]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat50,0,1.000000],
[owl_attackpat51,3,8, "A225",0,-1,2,2,2,3,0x2,685,
  [ 0x003cfffd, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0d, 0x00f0fcfc],
  [ 0x00180200, 0x00102080, 0x00900000, 0x20100000, 0x20100000, 0x02180000, 0x00102008, 0x00900000]
  , 0x0,50.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat52,3,8, "A226",0,-1,2,2,2,3,0x2,685,
  [ 0x00fcfffd, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfffc0000, 0x3f3f3f0d, 0x00fcfcfc],
  [ 0x00180200, 0x00102080, 0x00900000, 0x20100000, 0x20100000, 0x02180000, 0x00102008, 0x00900000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat52,0,2.800000],
[owl_attackpat53,6,8, "A227",-1,-2,1,2,2,4,0x2,683,
  [ 0x7cfcfc0c, 0xf5ffff00, 0xfcfcf4f4, 0xfffc7c00, 0xfffff500, 0xfcfc7c7c, 0x7cfcff00, 0xf4fcfcc0],
  [ 0x0058a008, 0x90902000, 0x28940000, 0x22181800, 0x20909000, 0xa0580000, 0x18182200, 0x00942880]
  , 0x80,35.000000,attributes[0],1,null,autohelperowl_attackpat53,0,0.010000],
[owl_attackpat54,4,8, "A227b",0,-1,2,2,2,3,0x2,648,
  [ 0x00f0fcf4, 0xf0f0c000, 0xff3d0000, 0x0d3f3f1f, 0xc0f0f0d0, 0xfcf00000, 0x3f3f0d00, 0x003dff7f],
  [ 0x00100820, 0x00108000, 0x80100000, 0x08120000, 0x80100000, 0x08100000, 0x00120800, 0x00108020]
  , 0x80,65.000000,attributes[0],1,null,autohelperowl_attackpat54,0,0.610000],
[owl_attackpat55,1,8, "A228",0,-2,1,0,1,2,0x2,685,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat55,0,1.000000],
[owl_attackpat56,5,8, "A229",-1,-3,1,1,2,4,0x2,721,
  [ 0x3dffff00, 0xf0fcfcf4, 0xfcfcf000, 0xfcfc3c00, 0xfcfcf000, 0xffff3d00, 0x3cfcfc7c, 0xf0fcfc00],
  [ 0x10902000, 0x20940000, 0x20181000, 0x00582000, 0x00942000, 0x20901000, 0x20580000, 0x10182000]
  , 0x80,80.000000,attributes[0],1,null,autohelperowl_attackpat56,0,0.019600],
[owl_attackpat57,4,8, "A229b",-1,-3,1,0,2,3,0x2,685,
  [ 0x003c7c7c, 0x40f0f000, 0xf4f00000, 0x3f3f0500, 0xf0f04000, 0x7c3c0000, 0x053f3f00, 0x00f0f4f4],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x80,79.000000,attributes[0],1,null,autohelperowl_attackpat57,0,0.016000],
[owl_attackpat58,3,8, "A229c",-1,-2,1,0,2,2,0x2,685,
  [ 0x003c7c7c, 0x40f0f000, 0xf4f00000, 0x3f3f0500, 0xf0f04000, 0x7c3c0000, 0x053f3f00, 0x00f0f4f4],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x0,79.000000,attributes[0],1,null,autohelperowl_attackpat58,0,0.016000],
[owl_attackpat59,2,8, "A229d",-1,-1,1,0,2,1,0x2,685,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00188000, 0x80102000, 0x08900000, 0x20100800, 0x20108000, 0x80180000, 0x08102000, 0x00900800]
  , 0x80,79.000000,attributes[0],1,null,autohelperowl_attackpat59,0,0.010000],
[owl_attackpat60,1,8, "A230",0,-1,2,2,2,3,0x2,722,
  [ 0x0038ffff, 0xc0f0e0c0, 0xfcb00000, 0x2f3f0f00, 0xe0f0c000, 0xff380000, 0x0f3f2f0f, 0x00b0fcfc],
  [ 0x00100200, 0x00100080, 0x00100000, 0x00100000, 0x00100000, 0x02100000, 0x00100008, 0x00100000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat60,0,0.016000],
// [owl_attackpat61,1,8, "A231",-1,0,1,3,2,3,0x0,686,
//   [ 0x003cfcfc, 0xc0f0f000, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xfc3c0000, 0x0f3f3f00, 0x00f0fcfc],
//   [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
//   , 0x0,50.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat62,1,8, "A232",0,-1,3,2,3,3,0x2,686,
  [ 0x003cfcff, 0xc0f0f000, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xfc3c0000, 0x0f3f3f03, 0x00f0fcfc],
  [ 0x00148000, 0x80101000, 0x08500000, 0x10100800, 0x10108000, 0x80140000, 0x08101000, 0x00500800]
  , 0x80,80.000000,attributes[0],1,null,autohelperowl_attackpat62,0,1.000000],
[owl_attackpat63,1,8, "A232b",-1,0,2,2,3,2,0x2,722,
  [ 0x0f3f3f3f, 0x00f0fcfc, 0xf0f0c000, 0xff3f0000, 0xfcf00000, 0x3f3f0f00, 0x003fffff, 0xc0f0f0f0],
  [ 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat63,3,0.416000],
[owl_attackpat64,1,8, "A233",0,-1,3,2,3,3,0x2,686,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfffc0000, 0x3f3f3f0c, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3f00, 0x00fcfffc],
  [ 0x00140008, 0x00101000, 0x00500000, 0x12100000, 0x10100000, 0x00140000, 0x00101200, 0x00500080]
  , 0x0,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat65,3,8, "A234",-1,0,2,1,3,1,0x2,648,
  [ 0x00f4fc00, 0xf0f0d000, 0xff7f0000, 0x1c3c3c3c, 0xd0f0f0f0, 0xfcf40000, 0x3c3c1c00, 0x007fff00],
  [ 0x00201800, 0x00608000, 0x90200000, 0x08240000, 0x80600000, 0x18200000, 0x00240800, 0x00209000]
  , 0x80,20.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat66,4,8, "A235",-1,-1,1,3,2,4,0x2,758,
  [ 0xf73f3f00, 0x0cfcf4fc, 0xf0f07c00, 0x7cfcc000, 0xf4fc0c00, 0x3f3ff700, 0xc0fc7cfc, 0x7cf0f000],
  [ 0x00202900, 0x00a08040, 0xa0200000, 0x08280000, 0x80a00000, 0x29200000, 0x00280804, 0x0020a000]
  , 0x0,77.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat67,4,8, "A236",-1,0,2,2,3,2,0x1,758,
  [ 0x1f3f3f1f, 0x00f4fcfc, 0xf0f0d000, 0xff7d0000, 0xfcf40000, 0x3f3f1f00, 0x007dffff, 0xd0f0f0d0],
  [ 0x00202004, 0x00a00000, 0x20200000, 0x01280000, 0x00a00000, 0x20200000, 0x00280100, 0x00202040]
  , 0x0,66.000000,attributes[0],1,null,autohelperowl_attackpat67,3,1.000000],
[owl_attackpat68,3,8, "A237",-1,-1,1,2,2,3,0x2,721,
  [ 0x0f7ffe00, 0xd0f0fcbc, 0xfcf4c000, 0xfc3c1c00, 0xfcf0d000, 0xfe7f0f00, 0x1c3cfcf8, 0xc0f4fc00],
  [ 0x04218000, 0x80200410, 0x08204000, 0x40200800, 0x04208000, 0x80210400, 0x08204010, 0x40200800]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat68,3,0.970000],
[owl_attackpat69,3,8, "A238",0,-1,3,2,3,3,0x2,758,
  [ 0x2b3f0f37, 0x0038f8fc, 0xc0f0a000, 0xbdb30000, 0xf8380000, 0x0f3f2b00, 0x00b3bdff, 0xa0f0c070],
  [ 0x00100022, 0x00100000, 0x00100000, 0x00120000, 0x00100000, 0x00100000, 0x00120002, 0x00100020]
  , 0x0,55.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat70,1,8, "A239",0,-1,2,1,2,2,0x2,685,
  [ 0x00f8fcfc, 0xf0f0e000, 0xfcbc0000, 0x2f3f3f00, 0xe0f0f000, 0xfcf80000, 0x3f3f2f00, 0x00bcfcfc],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x0,85.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat71,2,8, "A240",-1,-2,1,1,2,3,0x2,647,
  [ 0xf0fcfc00, 0xfcfcf000, 0xfefe3c00, 0x3cfcfc28, 0xf0fcfca0, 0xfcfcf000, 0xfcfc3c00, 0x3cfefe00],
  [ 0x90240000, 0x08241000, 0x00601800, 0x10608000, 0x10240800, 0x00249000, 0x80601000, 0x18600000]
  , 0x80,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat72,1,8, "A241",0,-2,2,1,2,3,0x2,685,
  [ 0x00fcf8fc, 0xf0f0b000, 0xbeff0000, 0x3b3f3f3b, 0xb0f0f0b0, 0xf8fc0000, 0x3f3f3b00, 0x00ffbeff],
  [ 0x00240000, 0x00201000, 0x00610000, 0x10200010, 0x10200010, 0x00240000, 0x00201000, 0x00610000]
  , 0x0,37.000000,attributes[0],1,null,autohelperowl_attackpat72,3,10.000000],
[owl_attackpat73,2,8, "A242",-1,-3,1,1,2,4,0x2,647,
  [ 0xe0f0f400, 0xfcf84000, 0x7f3f2f00, 0x04bcfcfc, 0x40f8fcfc, 0xf4f0e000, 0xfcbc0400, 0x2f3f7f00],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_attackpat73,0,16.000000],
[owl_attackpat74,3,8, "A301",0,-1,1,2,1,3,0x2,685,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00928000, 0xa0100020, 0x08180000, 0x00102800, 0x0010a000, 0x80920000, 0x28100020, 0x00180800]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_attackpat74,0,0.010000],
[owl_attackpat75,5,8, "A302",-1,-2,1,2,2,4,0x2,648,
  [ 0xbcfdfe00, 0xf8fcfc90, 0xfdfcf800, 0xfcfcbc04, 0xfcfcf840, 0xfefdbc00, 0xbcfcfc18, 0xf8fcfd00],
  [ 0x18600800, 0x10248800, 0x80249000, 0x88601000, 0x88241000, 0x08601800, 0x10608800, 0x90248000]
  , 0x0,30.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat76,5,8, "A305",0,-1,2,3,2,4,0x2,686,
  [ 0x00757fff, 0x50f0d0d0, 0xf4740000, 0x1f3f1700, 0xd0f05000, 0x7f750000, 0x173f1f1f, 0x0074f4fc],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x80,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat77,1,8, "A401",-1,0,1,3,2,3,0x0,721,
  [ 0x0f3f3f00, 0x00f0fcfc, 0xf0f0c000, 0xfc3c0000, 0xfcf00000, 0x3f3f0f00, 0x003cfcfc, 0xc0f0f000],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat77,3,3.600000],
[owl_attackpat78,1,8, "A401a",-1,0,1,3,2,3,0x0,721,
  [ 0x0f3f3f00, 0x00f0fcfc, 0xf0f0c000, 0xfc3c0000, 0xfcf00000, 0x3f3f0f00, 0x003cfcfc, 0xc0f0f000],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_attackpat78,3,3.000000],
[owl_attackpat79,1,8, "A402",-1,0,2,3,3,3,0x0,722,
  [ 0x0f3f3f00, 0x00f0fcfc, 0xf0f0c000, 0xfc3c0000, 0xfcf00000, 0x3f3f0f00, 0x003cfcfc, 0xc0f0f000],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_attackpat79,3,0.040000],
[owl_attackpat80,2,8, "A403",-1,0,1,2,2,2,0x0,723,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00508080, 0x90100000, 0x08140000, 0x00101a00, 0x00109000, 0x80500000, 0x1a100000, 0x00140808]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_attackpat80,0,4.800000],
[owl_attackpat81,2,8, "A403b",-2,0,1,2,3,2,0x0,723,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00508080, 0x90100000, 0x08140000, 0x00101a00, 0x00109000, 0x80500000, 0x1a100000, 0x00140808]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat81,0,2.890000],
[owl_attackpat82,5,4, "A404",-1,0,1,2,2,2,0x0,648,
  [ 0x00f4fcf4, 0xf0f0d000, 0xfc7c0000, 0x1d3f3f00, 0xd0f0f000, 0xfcf40000, 0x3f3f1d00, 0x007cfc7c],
  [ 0x00200820, 0x00208000, 0x80200000, 0x08220000, 0x80200000, 0x08200000, 0x00220800, 0x00208020]
  , 0x0,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat83,4,8, "A406",-2,-2,1,0,3,2,0x0,685,
  [ 0x00f0fcfc, 0xf0f0c000, 0xfd3d0000, 0x0f3f3f15, 0xc0f0f050, 0xfcf00000, 0x3f3f0f00, 0x003dfdfd],
  [ 0x00100804, 0x00108000, 0x80100000, 0x09100000, 0x80100000, 0x08100000, 0x00100900, 0x00108040]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_attackpat83,0,0.016000],
[owl_attackpat84,4,8, "A406b",-2,-3,1,1,3,4,0x0,685,
  [ 0xa0f0fcfc, 0xf8f8c000, 0xfd3d2800, 0x0fbfbf15, 0xc0f8f850, 0xfcf0a000, 0xbfbf0f00, 0x283dfdfd],
  [ 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x80100000, 0x08100000, 0x00100800, 0x00108000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat84,0,0.151360],
[owl_attackpat85,3,8, "A406c",-2,-2,1,0,3,2,0x0,723,
  [ 0x00fdfdfc, 0xf0f0f050, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfdfd0000, 0x3f3f3f14, 0x00fcfcfc],
  [ 0x00508000, 0x90100000, 0x08140000, 0x00101800, 0x00109000, 0x80500000, 0x18100000, 0x00140800]
  , 0x0,81.000000,attributes[0],1,null,autohelperowl_attackpat85,0,0.970000],
[owl_attackpat86,6,8, "A406d",-2,-3,2,1,4,4,0x0,647,
  [ 0xf8f8f0d0, 0xfdfd2800, 0x3fbfbf15, 0xa0fdfffc, 0x28fdfdfd, 0xf0f8f850, 0xfffda000, 0xbfbf3f1c],
  [ 0x00102080, 0x00900000, 0x20100000, 0x00180200, 0x00900000, 0x20100000, 0x02180000, 0x00102008]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat86,0,0.010000],
[owl_attackpat87,2,8, "A407",-1,-2,2,1,3,3,0x0,721,
  [ 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc, 0xfcfcfc00, 0xfcfcfc00],
  [ 0x00208400, 0x80204000, 0x48200000, 0x04200800, 0x40208000, 0x84200000, 0x08200400, 0x00204800]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat87,3,0.019600],
[owl_attackpat88,2,8, "A407b",-1,-2,2,1,3,3,0x0,648,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xfeffff00, 0xfffffff8, 0xfcfcfcbc, 0xfcfcfc00, 0xffffff00, 0xfffffefc],
  [ 0x48200000, 0x04200800, 0x00218500, 0x80204050, 0x08200414, 0x00204800, 0x40208000, 0x85210000]
  , 0x0,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat89,1,8, "A408",-2,-3,3,0,5,3,0x0,686,
  [ 0x00fefffe, 0xf0f0f0e0, 0xfcff0000, 0x3f3f3f30, 0xf0f0f030, 0xfffe0000, 0x3f3f3f2e, 0x00fffcfc],
  [ 0x00200100, 0x00200040, 0x00200000, 0x00200000, 0x00200000, 0x01200000, 0x00200004, 0x00200000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_attackpat89,3,0.016000],
[owl_attackpat90,5,8, "A409",-2,-2,1,2,3,4,0x0,647,
  [ 0xfcfcfcf8, 0xfefffc00, 0xfdfdfc38, 0xfeffff15, 0xfcfffe50, 0xfcfcfcb0, 0xfffffe00, 0xfcfdfdbd],
  [ 0x48200410, 0x04214800, 0x40208410, 0x84214000, 0x48210400, 0x04204810, 0x40218400, 0x84204010]
  , 0x80,80.000000,attributes[0],1,null,autohelperowl_attackpat90,3,0.019600],
[owl_attackpat91,5,4, "A410",-2,-1,1,1,3,2,0x0,683,
  [ 0xfcfc3000, 0x3dfd3d00, 0x30fcfc54, 0xf0fcf000, 0x3dfd3d00, 0x30fcfc54, 0xf0fcf000, 0xfcfc3000],
  [ 0x00642000, 0x10a01000, 0x20640000, 0x10281000, 0x10a01000, 0x20640000, 0x10281000, 0x00642000]
  , 0x200,90.000000,attributes[0],1,null,autohelperowl_attackpat91,3,0.010000],
[owl_attackpat92,1,8, "A411",-3,-4,1,3,4,7,0x0,722,
  [ 0x0a3fbfaf, 0x80f0fafa, 0xf8f08080, 0xbf3e0a00, 0xfaf08000, 0xbf3f0a0a, 0x0a3ebfbf, 0x80f0f8e8],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,79.000000,attributes[0],1,null,autohelperowl_attackpat92,3,0.023834],
[owl_attackpat93,1,8, "A411a",-3,-4,2,2,5,6,0x0,722,
  [ 0x0a3fbfaf, 0x80f0fafa, 0xfaf08080, 0xbf3e0a0a, 0xfaf08080, 0xbf3f0a0a, 0x0a3ebfbf, 0x80f0faea],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,79.000000,attributes[0],1,null,autohelperowl_attackpat93,3,0.019600],
[owl_attackpat94,1,8, "A413a",-3,-2,0,3,3,5,0x0,646,
  [ 0xf0f0f0b0, 0xffff0000, 0x3f3f3f3f, 0x00fffefe, 0x00ffffff, 0xf0f0f0f0, 0xfeff0000, 0x3f3f3f3a],
  [ 0x00200010, 0x00200000, 0x00200000, 0x00210000, 0x00200000, 0x00200000, 0x00210000, 0x00200010]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_attackpat94,3,0.365200],
// [owl_attackpat95,4,8, "A414",-4,-3,0,3,4,6,0x0,686,
//   [ 0x00fcfefe, 0xf0f0f080, 0xfefc0000, 0x3f3f3f0a, 0xf0f0f080, 0xfefc0000, 0x3f3f3f0a, 0x00fcfefe],
//   [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
//   , 0x0,82.000000,attributes[0],1,null,autohelperowl_attackpat95,3,0.019600],
[owl_attackpat96,1,8, "A414a",-3,-3,0,3,3,6,0x0,722,
  [ 0x00feffff, 0xf0f0f0e0, 0xfffe0000, 0x3f3f3f2f, 0xf0f0f0e0, 0xfffe0000, 0x3f3f3f2f, 0x00feffff],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_attackpat96,3,0.023056],
[owl_attackpat97,2,8, "A415",-1,-2,1,0,2,2,0x0,685,
  [ 0x00fcfcbc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3e00, 0xf0f0f000, 0xfcfc0000, 0x3e3f3f00, 0x00fcfcf8],
  [ 0x00240008, 0x00201000, 0x00600000, 0x12200000, 0x10200000, 0x00240000, 0x00201200, 0x00600080]
  , 0x80,80.000000,attributes[0],1,null,autohelperowl_attackpat97,3,1.810000],
[owl_attackpat98,3,8, "A416",-1,-2,1,2,2,4,0x0,683,
  [ 0xfcfc3c34, 0x3cfffc00, 0xf0fcfc30, 0xfdfff000, 0xfcff3c00, 0x3cfcfc30, 0xf0fffd00, 0xfcfcf070],
  [ 0x00600020, 0x10200000, 0x00240000, 0x00221000, 0x00201000, 0x00600000, 0x10220000, 0x00240020]
  , 0x0,65.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat99,5,8, "A417",0,-1,3,2,3,3,0x0,722,
  [ 0x003fffbf, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0e00, 0xf0f0c000, 0xff3f0000, 0x0e3f3f3f, 0x00f0fcf8],
  [ 0x00214000, 0x40200010, 0x04200000, 0x00200400, 0x00204000, 0x40210000, 0x04200010, 0x00200400]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat99,3,0.019600],
[owl_attackpat100,3,8, "A418",-1,-2,1,1,2,3,0x0,647,
  [ 0xfcfcf400, 0xfcfc7c00, 0x7fffff00, 0xf4fcfcfc, 0x7cfcfcfc, 0xf4fcfc00, 0xfcfcf400, 0xffff7f00],
  [ 0x04182000, 0x00902400, 0x21904000, 0x60180004, 0x24900040, 0x20180400, 0x00186000, 0x40902100]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat100,0,0.010000],
[owl_attackpat101,2,8, "A419",0,0,1,2,1,2,0x0,722,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00200018, 0x00200000, 0x00200000, 0x02210000, 0x00200000, 0x00200000, 0x00210200, 0x00200090]
  , 0x80,68.000000,attributes[0],1,null,autohelperowl_attackpat101,3,1.810000],
[owl_attackpat102,2,8, "A419b",0,0,1,2,1,2,0x0,722,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00200018, 0x00200000, 0x00200000, 0x02210000, 0x00200000, 0x00200000, 0x00210200, 0x00200090]
  , 0x80,68.000000,attributes[0],1,null,autohelperowl_attackpat102,3,1.810000],
[owl_attackpat103,6,8, "A420",-1,-1,2,2,3,3,0x0,722,
  [ 0x3effff55, 0xf0fcfcf8, 0xfcfcf000, 0xfdfd3d00, 0xfcfcf000, 0xffff3e00, 0x3dfdfdbd, 0xf0fcfc54],
  [ 0x20611000, 0x10680010, 0x10242000, 0x00a41000, 0x00681000, 0x10612000, 0x10a40010, 0x20241000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat103,3,1.810000],
[owl_attackpat104,3,8, "A421",-1,-2,2,0,3,2,0x0,722,
  [ 0x003c7f7f, 0x40f0f0c0, 0xf4f00000, 0x3f3f0500, 0xf0f04000, 0x7f3c0000, 0x053f3f0f, 0x00f0f4f4],
  [ 0x00100201, 0x00100080, 0x00100000, 0x00100000, 0x00100000, 0x02100000, 0x00100009, 0x00100000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat104,0,0.016000],
[owl_attackpat105,3,8, "A422",0,-1,2,2,2,3,0x0,685,
  [ 0x0038ff18, 0xc0f0e0c0, 0xfcb00000, 0x2e3d0c00, 0xe0f0c000, 0xff380000, 0x0c3d2e0c, 0x00b0fc90],
  [ 0x00108200, 0x80100080, 0x08100000, 0x00100800, 0x00108000, 0x82100000, 0x08100008, 0x00100800]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_attackpat105,0,6.010000],
[owl_attackpat106,3,8, "A422a",0,-1,2,2,2,3,0x0,685,
  [ 0x0038ff18, 0xc0f0e0c0, 0xfcb00000, 0x2e3d0c00, 0xe0f0c000, 0xff380000, 0x0c3d2e0c, 0x00b0fc90],
  [ 0x00108200, 0x80100080, 0x08100000, 0x00100800, 0x00108000, 0x82100000, 0x08100008, 0x00100800]
  , 0x0,85.000000,attributes[0],1,null,autohelperowl_attackpat106,0,6.010000],
[owl_attackpat107,3,8, "A423",-1,0,1,3,2,3,0x0,686,
  [ 0x003c3cfc, 0x00f0f000, 0xf0f00000, 0x3f3f0300, 0xf0f00000, 0x3c3c0000, 0x033f3f00, 0x00f0f0fc],
  [ 0x00280040, 0x00202000, 0x00a00000, 0x20200100, 0x20200000, 0x00280000, 0x01202000, 0x00a00004]
  , 0x80,61.000000,attributes[0],1,null,autohelperowl_attackpat107,3,0.010000],
[owl_attackpat108,3,8, "A423a",-1,0,1,3,2,3,0x0,686,
  [ 0x003c3cfc, 0x00f0f000, 0xf0f00000, 0x3f3f0300, 0xf0f00000, 0x3c3c0000, 0x033f3f00, 0x00f0f0fc],
  [ 0x00280040, 0x00202000, 0x00a00000, 0x20200100, 0x20200000, 0x00280000, 0x01202000, 0x00a00004]
  , 0x0,61.000000,attributes[0],1,null,autohelperowl_attackpat108,3,0.010000],
[owl_attackpat109,4,8, "A424",-1,-1,1,2,2,3,0x0,648,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfffefc00, 0xfcfcfc2c, 0xfcfcfce0, 0xfcfcfc00, 0xfcfcfc00, 0xfcfeff00],
  [ 0x68102800, 0x04988800, 0xa010a400, 0x88984000, 0x88980400, 0x28106800, 0x40988800, 0xa410a000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat109,0,0.010000],
[owl_attackpat110,2,4, "A425",0,0,2,2,2,2,0x0,722,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00120021, 0x00100020, 0x00100000, 0x00120000, 0x00100000, 0x00120000, 0x00120021, 0x00100020]
  , 0x20,90.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat111,2,8, "A501",0,-2,2,1,2,3,0x2,722,
  [ 0x003dffff, 0xc0f0f0d0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3d0000, 0x0f3f3f1f, 0x00f0fcfc],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x80,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat112,4,8, "A502",-1,0,1,2,2,2,0x2,685,
  [ 0x003cfcbc, 0xc0f0f000, 0xfcf00000, 0x3f3f0e00, 0xf0f0c000, 0xfc3c0000, 0x0e3f3f00, 0x00f0fcf8],
  [ 0x00188028, 0x80102000, 0x08900000, 0x22120800, 0x20108000, 0x80180000, 0x08122200, 0x009008a0]
  , 0xa0,45.000000,attributes[0],1,null,autohelperowl_attackpat112,0,1.000000],
[owl_attackpat113,5,8, "A503",-1,0,1,2,2,2,0x2,721,
  [ 0x0f3f3f00, 0x00f0fcfc, 0xf0f0c000, 0xfc3c0000, 0xfcf00000, 0x3f3f0f00, 0x003cfcfc, 0xc0f0f000],
  [ 0x0a212200, 0x00a00898, 0x20208000, 0x80280000, 0x08a00000, 0x22210a00, 0x00288098, 0x80202000]
  , 0x90,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat114,6,8, "A503b",-1,-2,1,1,2,3,0x2,722,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc3c, 0xfcfcfcf0, 0xfcfcfc00, 0xfcfcfc00, 0xfcffff00],
  [ 0xa8102000, 0x08980800, 0x2212a800, 0x80988028, 0x089808a0, 0x2010a800, 0x80988000, 0xa8122200]
  , 0x10,32.000000,attributes[0],1,null,autohelperowl_attackpat114,0,0.050000],
[owl_attackpat115,2,8, "A504",0,0,1,1,1,1,0x2,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00201800, 0x00608000, 0x90200000, 0x08240000, 0x80600000, 0x18200000, 0x00240800, 0x00209000]
  , 0x80,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat116,2,8, "A505",0,-1,2,2,2,3,0x2,722,
  [ 0x003fffff, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3f0000, 0x0f3f3f3f, 0x00f0fcfc],
  [ 0x001a0000, 0x00102020, 0x00900000, 0x20100000, 0x20100000, 0x001a0000, 0x00102020, 0x00900000]
  , 0x0,45.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat117,2,8, "A506",-1,0,1,2,2,2,0x2,685,
  [ 0x003cfcfc, 0xc0f0f000, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xfc3c0000, 0x0f3f3f00, 0x00f0fcfc],
  [ 0x00108080, 0x80100000, 0x08100000, 0x00100a00, 0x00108000, 0x80100000, 0x0a100000, 0x00100808]
  , 0x0,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat118,2,8, "A507",-1,0,1,2,2,2,0x2,685,
  [ 0x00f0fcf0, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0x003cfc3c],
  [ 0x00200420, 0x00204000, 0x40200000, 0x04220000, 0x40200000, 0x04200000, 0x00220400, 0x00204020]
  , 0x80,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat119,4,8, "A508",0,-2,2,2,2,4,0x2,685,
  [ 0x007effff, 0xd0f0f0e0, 0xfff40000, 0x3f3f1f0d, 0xf0f0d0c0, 0xff7e0000, 0x1f3f3f2f, 0x00f4fffd],
  [ 0x00200100, 0x00200040, 0x02200000, 0x00200008, 0x00200080, 0x01200000, 0x00200004, 0x00200200]
  , 0x80,65.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat120,5,8, "A509",-1,0,1,2,2,2,0x2,685,
  [ 0x007cfc7c, 0xd0f0f000, 0xfcf40000, 0x3f3f1d00, 0xf0f0d000, 0xfc7c0000, 0x1d3f3f00, 0x00f4fcf4],
  [ 0x00280024, 0x00202000, 0x00a00000, 0x21220000, 0x20200000, 0x00280000, 0x00222100, 0x00a00060]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat120,3,0.400000],
[owl_attackpat121,4,8, "A510",-1,-2,1,2,2,4,0x2,683,
  [ 0xfcfcfcfc, 0xffffff00, 0xfcfcfcfc, 0xffffff00, 0xffffff00, 0xfcfcfcfc, 0xffffff00, 0xfcfcfcfc],
  [ 0x0090a410, 0xa2904000, 0x68180008, 0x04192800, 0x4090a200, 0xa4900080, 0x28190400, 0x00186810]
  , 0x80,55.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat122,4,8, "A511",0,-1,2,2,2,3,0x2,685,
  [ 0x003dfdfd, 0xc0f0f050, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xfd3d0000, 0x0f3f3f15, 0x00f0fcfc],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_attackpat122,3,0.010000],
[owl_attackpat123,3,8, "A512",-1,-2,1,1,2,3,0x2,685,
  [ 0x1c38fcfc, 0xc0f4ec00, 0xfcb0d000, 0xef7f0f00, 0xecf4c000, 0xfc381c00, 0x0f7fef00, 0xd0b0fcfc],
  [ 0x08204000, 0x40200800, 0x04208000, 0x80200400, 0x08204000, 0x40200800, 0x04208000, 0x80200400]
  , 0x0,70.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat124,1,8, "A513",-2,0,1,2,3,2,0x4,722,
  [ 0x003f3f00, 0x00f0f0f0, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3f3f0000, 0x003c3c3c, 0x00f0f000],
  [ 0x00201000, 0x00600000, 0x10200000, 0x00240000, 0x00600000, 0x10200000, 0x00240000, 0x00201000]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat124,3,0.610000],
[owl_attackpat125,4,8, "A514",-1,-1,2,1,3,2,0x4,721,
  [ 0xf7ffbf00, 0xbcfcf4fc, 0xf8fc7c00, 0x7cfcf800, 0xf4fcbc00, 0xbffff700, 0xf8fc7cfc, 0x7cfcf800],
  [ 0x80602400, 0x18a04000, 0x60240800, 0x04289000, 0x40a01800, 0x24608000, 0x90280400, 0x08246000]
  , 0x10,45.000000,attributes[0],1,null,autohelperowl_attackpat125,3,1.600000],
[owl_attackpat126,4,8, "A515",0,-2,1,2,1,4,0x2,647,
  [ 0x00ffff00, 0xf0f0f0f0, 0xffff0000, 0x3c3c3c3c, 0xf0f0f0f0, 0xffff0000, 0x3c3c3c3c, 0x00ffff00],
  [ 0x002a1600, 0x006060a0, 0x50a10000, 0x24240010, 0x60600010, 0x162a0000, 0x00242428, 0x00a15000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_attackpat126,3,1.000000],
[owl_attackpat127,3,8, "A516",-1,-2,1,2,2,4,0x2,721,
  [ 0xffffff00, 0xfcfcfcfc, 0xfffffe00, 0xfcfcfcbc, 0xfcfcfcf8, 0xffffff00, 0xfcfcfcfc, 0xfeffff00],
  [ 0x68120000, 0x04180820, 0x0010a400, 0x80904000, 0x08180400, 0x00126800, 0x40908020, 0xa4100000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_attackpat127,0,0.016000],
[owl_attackpat128,6,8, "A517",-1,-2,1,3,2,5,0x2,647,
  [ 0xfdffff00, 0xfcfcfcf4, 0xfffffc00, 0xfcfcfc3c, 0xfcfcfcf0, 0xfffffd00, 0xfcfcfc7c, 0xfcffff00],
  [ 0x68120000, 0x04180820, 0x0010a400, 0x80904000, 0x08180400, 0x00126800, 0x40908020, 0xa4100000]
  , 0x0,5.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat129,5,8, "A518",-1,-3,1,1,2,4,0x2,610,
  [ 0x50fcfc00, 0xf4f4f000, 0xffff1700, 0x3c7c7cfc, 0xf0f4f4fc, 0xfcfc5000, 0x7c7c3c00, 0x17ffff00],
  [ 0x00280800, 0x0020a000, 0x80a00000, 0x28200000, 0xa0200000, 0x08280000, 0x00202800, 0x00a08000]
  , 0x0,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat130,4,8, "A601",-1,0,1,3,2,3,0x1,723,
  [ 0x003cfc7c, 0xc0f0f000, 0xfcf00000, 0x3f3f0d00, 0xf0f0c000, 0xfc3c0000, 0x0d3f3f00, 0x00f0fcf4],
  [ 0x00248000, 0x80201000, 0x08600000, 0x10200800, 0x10208000, 0x80240000, 0x08201000, 0x00600800]
  , 0x0,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat131,1,8, "A602",-1,0,1,1,2,1,0x5,685,
  [ 0x00fcbc00, 0xb0f0f000, 0xf8fc0000, 0x3c3c3800, 0xf0f0b000, 0xbcfc0000, 0x383c3c00, 0x00fcf800],
  [ 0x00600000, 0x10200000, 0x00240000, 0x00201000, 0x00201000, 0x00600000, 0x10200000, 0x00240000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_attackpat131,3,1.000000],
[owl_attackpat132,4,8, "A603",0,-2,1,2,1,4,0x2,685,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfdfd0000, 0x3c3c3c14, 0xf0f0f050, 0xffff0000, 0x3c3c3c3c, 0x00fdfd00],
  [ 0x00a10000, 0x20200010, 0x00280000, 0x00202000, 0x00202000, 0x00a10000, 0x20200010, 0x00280000]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_attackpat132,3,1.011760],
[owl_attackpat133,3,8, "A603b",0,-1,1,2,1,3,0x2,685,
  [ 0x007dff00, 0xd0f0f0d0, 0xfcf40000, 0x3c3c1c00, 0xf0f0d000, 0xff7d0000, 0x1c3c3c1c, 0x00f4fc00],
  [ 0x00200100, 0x00200040, 0x00200000, 0x00200000, 0x00200000, 0x01200000, 0x00200004, 0x00200000]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_attackpat133,3,0.610000],
[owl_attackpat134,2,8, "A604",0,-1,1,3,1,4,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0x00ffff00],
  [ 0x00280000, 0x00202000, 0x00a00000, 0x20200000, 0x20200000, 0x00280000, 0x00202000, 0x00a00000]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat135,1,8, "A605",0,-1,1,2,1,3,0xa,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0x00ffff00],
  [ 0x00200000, 0x00200000, 0x00210000, 0x00200010, 0x00200010, 0x00200000, 0x00200000, 0x00210000]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat136,4,8, "A606",0,-2,1,2,1,4,0x2,685,
  [ 0x007fff00, 0xd0f0f0f0, 0xfdf70000, 0x3c3c1c34, 0xf0f0d070, 0xff7f0000, 0x1c3c3c3c, 0x00f7fd00],
  [ 0x00214000, 0x40200010, 0x04220000, 0x00200420, 0x00204020, 0x40210000, 0x04200010, 0x00220400]
  , 0x10,50.000000,attributes[0],1,null,autohelperowl_attackpat136,3,0.610000],
[owl_attackpat137,2,8, "A607a",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00a40000, 0x20201000, 0x00680000, 0x10202000, 0x10202000, 0x00a40000, 0x20201000, 0x00680000]
  , 0x10,36.000000,attributes[0],1,null,autohelperowl_attackpat137,3,0.613600],
[owl_attackpat138,1,8, "A607b",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00600000, 0x10200000, 0x00240000, 0x00201000, 0x00201000, 0x00600000, 0x10200000, 0x00240000]
  , 0x10,36.000000,attributes[0],1,null,autohelperowl_attackpat138,3,0.613600],
[owl_attackpat139,2,8, "A607c",0,-1,1,1,1,2,0x2,685,
  [ 0x007cfc00, 0xd0f0f000, 0xfcf40000, 0x3c3c1c00, 0xf0f0d000, 0xfc7c0000, 0x1c3c3c00, 0x00f4fc00],
  [ 0x00240400, 0x00205000, 0x40600000, 0x14200000, 0x50200000, 0x04240000, 0x00201400, 0x00604000]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_attackpat139,3,0.610000],
[owl_attackpat140,2,8, "A607d",0,-1,1,2,1,3,0x2,722,
  [ 0x003fbf00, 0x80f0f0f0, 0xf8f00000, 0x3c3c0800, 0xf0f08000, 0xbf3f0000, 0x083c3c3c, 0x00f0f800],
  [ 0x00290000, 0x00202010, 0x00a00000, 0x20200000, 0x20200000, 0x00290000, 0x00202010, 0x00a00000]
  , 0x10,36.000000,attributes[0],1,null,autohelperowl_attackpat140,3,0.101283],
[owl_attackpat141,2,8, "A608",0,-1,1,1,1,2,0x2,685,
  [ 0x00f4fc00, 0xf0f0d000, 0xfc7c0000, 0x1c3c3c00, 0xd0f0f000, 0xfcf40000, 0x3c3c1c00, 0x007cfc00],
  [ 0x00600000, 0x10200000, 0x00240000, 0x00201000, 0x00201000, 0x00600000, 0x10200000, 0x00240000]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_attackpat141,3,0.378160],
[owl_attackpat142,2,8, "A609",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00980000, 0x20102000, 0x00980000, 0x20102000, 0x20102000, 0x00980000, 0x20102000, 0x00980000]
  , 0x10,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat143,2,8, "A610",0,-2,1,1,1,3,0x2,722,
  [ 0x00ff3f00, 0x30f0f0f0, 0xf0fc0000, 0x3c3c3000, 0xf0f03000, 0x3fff0000, 0x303c3c3c, 0x00fcf000],
  [ 0x00620000, 0x10200020, 0x00240000, 0x00201000, 0x00201000, 0x00620000, 0x10200020, 0x00240000]
  , 0x10,55.000000,attributes[0],1,null,autohelperowl_attackpat143,3,1.000000],
[owl_attackpat144,4,8, "A611",-1,-1,1,2,2,3,0x2,722,
  [ 0x34ffff00, 0xf0fcf4f0, 0xfcfc7000, 0x7cfc3c00, 0xf4fcf000, 0xffff3400, 0x3cfc7c3c, 0x70fcfc00],
  [ 0x10a24000, 0x60240020, 0x04281000, 0x00602400, 0x00246000, 0x40a21000, 0x24600020, 0x10280400]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat144,3,0.010000],
[owl_attackpat145,4,8, "A612",-1,-1,1,2,2,3,0x2,648,
  [ 0xbcffff00, 0xf8fcfcf0, 0xfcfcf800, 0xfcfcbc00, 0xfcfcf800, 0xffffbc00, 0xbcfcfc3c, 0xf8fcfc00],
  [ 0x18622100, 0x10a40860, 0x20249000, 0x80681000, 0x08a41000, 0x21621800, 0x10688024, 0x90242000]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_attackpat145,3,0.010000],
[owl_attackpat146,3,8, "A613",-1,-2,1,1,2,3,0x2,721,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x10a00080, 0x20240000, 0x00281000, 0x00602200, 0x00242000, 0x00a01000, 0x22600000, 0x10280008]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_attackpat146,3,1.000000],
[owl_attackpat147,4,8, "A614",-1,-2,1,1,2,3,0x2,721,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x10608088, 0x90240000, 0x08241000, 0x02601a00, 0x00249000, 0x80601000, 0x1a600200, 0x10240888]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_attackpat147,3,1.000000],
[owl_attackpat148,3,4, "A615",0,-2,2,2,2,4,0x2,686,
  [ 0x00fffcfc, 0xf0f0f030, 0xfcff0000, 0x3f3f3f30, 0xf0f0f030, 0xfcff0000, 0x3f3f3f30, 0x00fffcfc],
  [ 0x00a90000, 0x20202010, 0x00a90000, 0x20202010, 0x20202010, 0x00a90000, 0x20202010, 0x00a90000]
  , 0x10,65.000000,attributes[0],1,null,autohelperowl_attackpat148,3,0.010000],
[owl_attackpat149,4,8, "A616",-1,-2,2,1,3,3,0x4,722,
  [ 0xf5ffbf00, 0xbcfcf4f4, 0xf8fc7c00, 0x7cfcf800, 0xf4fcbc00, 0xbffff500, 0xf8fc7c7c, 0x7cfcf800],
  [ 0x80600000, 0x18200000, 0x00240800, 0x00209000, 0x00201800, 0x00608000, 0x90200000, 0x08240000]
  , 0x10,45.000000,attributes[0],1,null,autohelperowl_attackpat149,3,1.011760],
[owl_attackpat150,5,8, "A617",-1,0,2,2,3,2,0x2,723,
  [ 0x3c3f3f3f, 0x00fcfcf0, 0xf0f0f000, 0xffff0000, 0xfcfc0000, 0x3f3f3c00, 0x00ffff3f, 0xf0f0f0f0],
  [ 0x18222120, 0x00a40860, 0x20209000, 0x806a0000, 0x08a40000, 0x21221800, 0x006a8024, 0x90202020]
  , 0x10,50.000000,attributes[0],1,null,autohelperowl_attackpat150,3,0.010000],
[owl_attackpat151,5,8, "A618",-1,-1,1,1,2,2,0x2,720,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00],
  [ 0x6090a800, 0xa4988000, 0xa8182400, 0x08986800, 0x8098a400, 0xa8906000, 0x68980800, 0x2418a800]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat151,0,3.000000],
[owl_attackpat152,1,8, "A619",0,-1,1,0,1,1,0xa,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat153,2,8, "A620",0,-1,1,1,1,2,0x2,648,
  [ 0x00fcf400, 0xf0f07000, 0x7cfc0000, 0x343c3c00, 0x70f0f000, 0xf4fc0000, 0x3c3c3400, 0x00fc7c00],
  [ 0x00241000, 0x00601000, 0x10600000, 0x10240000, 0x10600000, 0x10240000, 0x00241000, 0x00601000]
  , 0x10,65.000000,attributes[0],1,null,autohelperowl_attackpat153,3,0.010000],
[owl_attackpat154,2,8, "A621",0,-2,1,2,1,4,0x2,648,
  [ 0x00bcff00, 0xe0f0f0c0, 0xfff80000, 0x3c3c2c0c, 0xf0f0e0c0, 0xffbc0000, 0x2c3c3c0c, 0x00f8ff00],
  [ 0x00180200, 0x00102080, 0x00900000, 0x20100000, 0x20100000, 0x02180000, 0x00102008, 0x00900000]
  , 0x10,10.000000,attributes[0],1,null,autohelperowl_attackpat154,0,0.016000],
[owl_attackpat155,3,8, "A622",0,-1,1,2,1,3,0x2,722,
  [ 0x007ffe00, 0xd0f0f0b0, 0xfcf40000, 0x3c3c1c00, 0xf0f0d000, 0xfe7f0000, 0x1c3c3c38, 0x00f4fc00],
  [ 0x00218000, 0x80200010, 0x08200000, 0x00200800, 0x00208000, 0x80210000, 0x08200010, 0x00200800]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_attackpat155,3,1.366000],
[owl_attackpat156,2,8, "A623",0,-2,2,2,2,4,0xa,649,
  [ 0x007fffff, 0xd0f0f0f0, 0xfff70000, 0x3f3f1f3f, 0xf0f0d0f0, 0xff7f0000, 0x1f3f3f3f, 0x00f7ffff],
  [ 0x00210100, 0x00200050, 0x00200000, 0x00200000, 0x00200000, 0x01210000, 0x00200014, 0x00200000]
  , 0x0,65.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat157,6,8, "A626",0,-2,2,3,2,5,0x2,649,
  [ 0x003fffff, 0xc0f0f0f0, 0xfff00000, 0x3f3f0f0f, 0xf0f0c0c0, 0xff3f0000, 0x0f3f3f3f, 0x00f0ffff],
  [ 0x00298208, 0x80202090, 0x0aa00000, 0x22200808, 0x20208080, 0x82290000, 0x08202218, 0x00a00a80]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_attackpat157,3,0.010000],
[owl_attackpat158,4,8, "A701",-1,-2,1,1,2,3,0x0,647,
  [ 0xf8fcfc70, 0xfcfcf800, 0xfcfcbc00, 0xbcfffd00, 0xf8fcfc00, 0xfcfcf800, 0xfdffbc00, 0xbcfcfc34],
  [ 0x10240820, 0x00249000, 0x80601000, 0x18620000, 0x90240000, 0x08241000, 0x00621800, 0x10608020]
  , 0x0,79.000000,attributes[0],1,null,autohelperowl_attackpat158,3,0.010000],
[owl_attackpat159,4,8, "A702",-1,-2,2,1,3,3,0x0,647,
  [ 0xf8fcfcf0, 0xfcfcf800, 0xfcfdbc00, 0xbcffff10, 0xf8fcfc10, 0xfcfcf800, 0xffffbc00, 0xbcfdfc3c],
  [ 0x50240820, 0x04249000, 0x80601400, 0x18624000, 0x90240400, 0x08245000, 0x40621800, 0x14608020]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat159,3,0.010000],
[owl_attackpat160,4,8, "A703",0,-1,2,2,2,3,0x0,721,
  [ 0x0c3f3f0d, 0x00f0fcf0, 0xf0f0c000, 0xff3c0000, 0xfcf00000, 0x3f3f0c00, 0x003cff3d, 0xc0f0f0c0],
  [ 0x04202008, 0x00a00400, 0x20204000, 0x42280000, 0x04a00000, 0x20200400, 0x00284200, 0x40202080]
  , 0x0,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat161,3,8, "A704",-1,-1,1,2,2,3,0x0,647,
  [ 0xf0fcfc30, 0xfcfcf000, 0xfcfc3c00, 0x3cfffc00, 0xf0fcfc00, 0xfcfcf000, 0xfcff3c00, 0x3cfcfc30],
  [ 0x10241820, 0x00649000, 0x90601000, 0x18660000, 0x90640000, 0x18241000, 0x00661800, 0x10609020]
  , 0x80,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat162,2,8, "A705b",-1,0,1,2,2,2,0x0,685,
  [ 0x0030fc30, 0xc0f0c000, 0xfc300000, 0x0c3f0c00, 0xc0f0c000, 0xfc300000, 0x0c3f0c00, 0x0030fc30],
  [ 0x00200020, 0x00200000, 0x00200000, 0x00220000, 0x00200000, 0x00200000, 0x00220000, 0x00200020]
  , 0x80,61.000000,attributes[0],1,null,autohelperowl_attackpat162,3,0.400000],
[owl_attackpat163,3,8, "A706",-1,0,1,2,2,2,0x0,648,
  [ 0x0030fc3c, 0xc0f0c000, 0xfc300000, 0x0f3f0c00, 0xc0f0c000, 0xfc300000, 0x0c3f0f00, 0x0030fcf0],
  [ 0x00200820, 0x00208000, 0x80200000, 0x08220000, 0x80200000, 0x08200000, 0x00220800, 0x00208020]
  , 0x80,70.000000,attributes[0],1,null,autohelperowl_attackpat163,3,0.016000],
[owl_attackpat164,3,8, "A707",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00204820, 0x40208000, 0x84200000, 0x08220400, 0x80204000, 0x48200000, 0x04220800, 0x00208420]
  , 0x80,70.000000,attributes[0],1,null,autohelperowl_attackpat164,3,0.019600],
[owl_attackpat165,4,8, "A708",0,-1,2,1,2,2,0x0,721,
  [ 0x003c7c10, 0x40f0f000, 0xf4f00000, 0x3c3d0400, 0xf0f04000, 0x7c3c0000, 0x043d3c00, 0x00f0f410],
  [ 0x00200800, 0x00208000, 0x80200000, 0x08200000, 0x80200000, 0x08200000, 0x00200800, 0x00208000]
  , 0x20,80.000000,attributes[0],1,null,autohelperowl_attackpat165,3,0.610000],
[owl_attackpat166,4,8, "A709",-1,0,1,2,2,2,0x0,686,
  [ 0x00347c3c, 0x40f0d000, 0xf4700000, 0x1f3f0400, 0xd0f04000, 0x7c340000, 0x043f1f00, 0x0070f4f0],
  [ 0x00200800, 0x00208000, 0x80200000, 0x08200000, 0x80200000, 0x08200000, 0x00200800, 0x00208000]
  , 0x80,45.000000,attributes[0],1,null,autohelperowl_attackpat166,3,1.186000],
[owl_attackpat167,4,8, "A710",0,-1,2,1,2,2,0x0,721,
  [ 0x003c7c10, 0x40f0f000, 0xf4f00000, 0x3c3d0400, 0xf0f04000, 0x7c3c0000, 0x043d3c00, 0x00f0f410],
  [ 0x00200800, 0x00208000, 0x80200000, 0x08200000, 0x80200000, 0x08200000, 0x00200800, 0x00208000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_attackpat167,3,0.016000],
[owl_attackpat168,6,8, "A711",-1,0,1,3,2,3,0x0,648,
  [ 0x00f4fcfc, 0xf0f0d000, 0xfc7c0000, 0x1f3f3f00, 0xd0f0f000, 0xfcf40000, 0x3f3f1f00, 0x007cfcfc],
  [ 0x00600808, 0x10208000, 0x80240000, 0x0a201000, 0x80201000, 0x08600000, 0x10200a00, 0x00248080]
  , 0x80,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat169,4,8, "A712",0,-1,3,2,3,3,0x0,686,
  [ 0x003cffff, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f00, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0f, 0x00f0fcfc],
  [ 0x00280202, 0x00202080, 0x00a00000, 0x20200000, 0x20200000, 0x02280000, 0x0020200a, 0x00a00000]
  , 0x80,60.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat170,6,8, "A713",-1,0,2,2,3,2,0x0,759,
  [ 0x00fdff3d, 0xf0f0f0d0, 0xfcfc0000, 0x3f3f3c00, 0xf0f0f000, 0xfffd0000, 0x3c3f3f1d, 0x00fcfcf0],
  [ 0x00684028, 0x50202000, 0x04a40000, 0x22221400, 0x20205000, 0x40680000, 0x14222200, 0x00a404a0]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat170,3,1.600000],
[owl_attackpat171,7,8, "A714",0,-1,3,2,3,3,0x0,758,
  [ 0x0f3f3f0d, 0x00f0fcfc, 0xf0f0c000, 0xff3c0000, 0xfcf00000, 0x3f3f0f00, 0x003cfffd, 0xc0f0f0c0],
  [ 0x06202008, 0x00a00408, 0x20204000, 0x42280000, 0x04a00000, 0x20200600, 0x00284280, 0x40202080]
  , 0x80,82.000000,attributes[0],1,null,autohelperowl_attackpat171,3,0.010000],
[owl_attackpat172,6,8, "A715",0,-2,2,1,2,3,0x0,647,
  [ 0x00fcf47c, 0xf0f07000, 0x7dfc0000, 0x373f3d04, 0x70f0f040, 0xf4fc0000, 0x3d3f3700, 0x00fc7df4],
  [ 0x00280024, 0x00202000, 0x00a00000, 0x21220000, 0x20200000, 0x00280000, 0x00222100, 0x00a00060]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_attackpat172,3,0.610000],
[owl_attackpat173,6,8, "A716",-1,0,1,2,2,2,0x0,648,
  [ 0x00f4fc74, 0xf0f0d000, 0xfc7c0000, 0x1d3f3d00, 0xd0f0f000, 0xfcf40000, 0x3d3f1d00, 0x007cfc74],
  [ 0x00600820, 0x10208000, 0x80240000, 0x08221000, 0x80201000, 0x08600000, 0x10220800, 0x00248020]
  , 0x80,50.000000,attributes[0],1,null,autohelperowl_attackpat173,3,1.000000],
[owl_attackpat174,4,8, "A717",-1,-1,1,2,2,3,0x0,647,
  [ 0x30fcf000, 0xf0fc3000, 0x3fff3000, 0x30fc3c3c, 0x30fcf0f0, 0xf0fc3000, 0x3cfc3000, 0x30ff3f00],
  [ 0x00182000, 0x00902000, 0x22920000, 0x20180028, 0x209000a0, 0x20180000, 0x00182000, 0x00922200]
  , 0x90,75.000000,attributes[0],1,null,autohelperowl_attackpat174,0,0.610000],
[owl_attackpat175,7,8, "A718",0,-1,2,2,2,3,0x0,648,
  [ 0x0074f474, 0xd0f05000, 0x7f740000, 0x153f1d0c, 0x50f0d0c0, 0xf4740000, 0x1d3f1500, 0x00747f74],
  [ 0x00200020, 0x00200000, 0x01200000, 0x00220004, 0x00200040, 0x00200000, 0x00220000, 0x00200120]
  , 0x80,50.000000,attributes[0],1,null,autohelperowl_attackpat175,3,1.000000],
[owl_attackpat176,6,8, "A719",0,-1,2,2,2,3,0x0,722,
  [ 0x003fff3f, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xff3f0000, 0x0c3f3f3f, 0x00f0fcf0],
  [ 0x00298228, 0x80202090, 0x08a00000, 0x22220800, 0x20208000, 0x82290000, 0x08222218, 0x00a008a0]
  , 0x10,50.000000,attributes[0],1,null,autohelperowl_attackpat176,3,0.616000],
[owl_attackpat177,5,8, "A719b",0,-1,2,1,2,2,0x8,685,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00a408a0, 0x20209000, 0x80680000, 0x18222200, 0x90202000, 0x08a40000, 0x22221800, 0x00688028]
  , 0x10,50.000000,attributes[0],1,null,autohelperowl_attackpat177,3,1.010000],
[owl_attackpat178,4,8, "A720",-2,-2,2,1,4,3,0x0,721,
  [ 0x7f7ffc3c, 0xd4fcff3c, 0xfcf4f4c0, 0xffff5c00, 0xfffcd400, 0xfc7f7f0c, 0x5cfffff0, 0xf4f4fcf0],
  [ 0x02120014, 0x00100028, 0x00100000, 0x01110000, 0x00100000, 0x00120200, 0x001101a0, 0x00100050]
  , 0x80,40.000000,attributes[0],1,null,autohelperowl_attackpat178,0,0.592000],
[owl_attackpat179,5,8, "A721",0,-1,2,2,2,3,0x0,722,
  [ 0x003fff3f, 0xc0f0f0f0, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xff3f0000, 0x0c3f3f3f, 0x00f0fcf0],
  [ 0x00288028, 0x80202000, 0x08a00000, 0x22220800, 0x20208000, 0x80280000, 0x08222200, 0x00a008a0]
  , 0x10,45.000000,attributes[0],1,null,autohelperowl_attackpat179,3,0.980800],
[owl_attackpat180,7,8, "A801",-1,-1,1,2,2,3,0x2,722,
  [ 0x1d7fff00, 0xd0f4fcf4, 0xfcf4d000, 0xfc7c1c00, 0xfcf4d000, 0xff7f1d00, 0x1c7cfc7c, 0xd0f4fc00],
  [ 0x08228100, 0x80200860, 0x08208000, 0x80200800, 0x08208000, 0x81220800, 0x08208024, 0x80200800]
  , 0x20,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat181,5,8, "A802",-1,0,1,2,2,2,0x2,648,
  [ 0x00f4fcf4, 0xf0f0d000, 0xfc7c0000, 0x1d3f3f00, 0xd0f0f000, 0xfcf40000, 0x3f3f1d00, 0x007cfc7c],
  [ 0x00200860, 0x00208000, 0x80200000, 0x08220100, 0x80200000, 0x08200000, 0x01220800, 0x00208024]
  , 0x20,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat182,4,8, "A803",-1,-1,1,2,2,3,0x2,722,
  [ 0x5cbfff00, 0xe4f4fcf0, 0xfcf8d400, 0xfc7c6c00, 0xfcf4e400, 0xffbf5c00, 0x6c7cfc3c, 0xd4f8fc00],
  [ 0x08190000, 0x00102810, 0x00908000, 0xa0100000, 0x28100000, 0x00190800, 0x0010a010, 0x80900000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat182,0,1.600000],
[owl_attackpat183,1,8, "A804",0,-1,1,2,1,3,0x2,685,
  [ 0x00fcfa00, 0xf0f0b080, 0xbcfc0000, 0x383c3c00, 0xb0f0f000, 0xfafc0000, 0x3c3c3808, 0x00fcbc00],
  [ 0x00244000, 0x40201000, 0x04600000, 0x10200400, 0x10204000, 0x40240000, 0x04201000, 0x00600400]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat183,3,1.000000],
[owl_attackpat184,5,8, "A805",-1,-2,1,2,2,4,0x2,722,
  [ 0x5cbfff00, 0xe4f4fcf0, 0xfffbd700, 0xfc7c6cfc, 0xfcf4e4fc, 0xffbf5c00, 0x6c7cfc3c, 0xd7fbff00],
  [ 0x08190000, 0x00102810, 0x00908200, 0xa0100080, 0x28100008, 0x00190800, 0x0010a010, 0x82900000]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat185,2,8, "A806",-1,-1,1,2,2,3,0x2,721,
  [ 0xffffff00, 0xfcfcfcfc, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc, 0xfcfcfc00],
  [ 0x42600000, 0x14200008, 0x00240400, 0x00205000, 0x00201400, 0x00604200, 0x50200080, 0x04240000]
  , 0x80,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat186,2,8, "A807",-1,-1,1,1,2,2,0x2,721,
  [ 0x3cfcfc00, 0xf0fcfc00, 0xfcfcf000, 0xfcfc3c00, 0xfcfcf000, 0xfcfc3c00, 0x3cfcfc00, 0xf0fcfc00],
  [ 0x20601000, 0x10680000, 0x10242000, 0x00a41000, 0x00681000, 0x10602000, 0x10a40000, 0x20241000]
  , 0x0,65.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat187,2,8, "A808",0,-1,1,2,1,3,0xa,722,
  [ 0x00fcfc00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0x00ffff00],
  [ 0x00906000, 0x60900000, 0x24190000, 0x00182410, 0x00906010, 0x60900000, 0x24180000, 0x00192400]
  , 0x0,60.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat188,3,8, "A809",-1,-2,1,2,2,4,0x2,721,
  [ 0xfcfcfc0c, 0xffffff00, 0xfcfcfcfc, 0xfffcfc00, 0xffffff00, 0xfcfcfcfc, 0xfcfcff00, 0xfcfcfcc0],
  [ 0x80205000, 0x4a610100, 0x14200858, 0x00248400, 0x01614a00, 0x50208094, 0x84240000, 0x08201400]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat188,3,0.010000],
[owl_attackpat189,2,8, "A810",-1,0,1,2,2,2,0x0,648,
  [ 0x0030fc30, 0xc0f0c000, 0xfc300000, 0x0c3f0c00, 0xc0f0c000, 0xfc300000, 0x0c3f0c00, 0x0030fc30],
  [ 0x00200420, 0x00204000, 0x40200000, 0x04220000, 0x40200000, 0x04200000, 0x00220400, 0x00204020]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat189,3,0.010000],
[owl_attackpat190,4,8, "A811",-1,0,1,2,2,2,0x0,648,
  [ 0x00fcfcf0, 0xf0f0f000, 0xfcfc0000, 0x3c3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3c00, 0x00fcfc3c],
  [ 0x002008a0, 0x00208000, 0x80200000, 0x08220200, 0x80200000, 0x08200000, 0x02220800, 0x00208028]
  , 0x10,65.000000,attributes[0],1,null,autohelperowl_attackpat190,3,0.019600],
[owl_attackpat191,2,8, "A812",-2,-1,1,1,3,2,0x2,721,
  [ 0xbcfcfc3c, 0xf8fcfc00, 0xfcfcf800, 0xffffbc00, 0xfcfcf800, 0xfcfcbc00, 0xbcffff00, 0xf8fcfcf0],
  [ 0x00604020, 0x50200000, 0x04240000, 0x00221400, 0x00205000, 0x40600000, 0x14220000, 0x00240420]
  , 0x80,40.000000,attributes[0],1,null,autohelperowl_attackpat191,3,0.010000],
[owl_attackpat192,3,8, "A813",-1,-1,1,1,2,2,0x2,683,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00],
  [ 0x80642000, 0x18a01000, 0x20640800, 0x10289000, 0x10a01800, 0x20648000, 0x90281000, 0x08642000]
  , 0x90,85.000000,attributes[0],1,null,autohelperowl_attackpat192,3,1.400800],
[owl_attackpat193,3,8, "A814",-1,-1,1,1,2,2,0x2,721,
  [ 0xfcfc3c00, 0x3cfcfc00, 0xf0fcfc00, 0xfcfcf000, 0xfcfc3c00, 0x3cfcfc00, 0xf0fcfc00, 0xfcfcf000],
  [ 0x80602000, 0x18a00000, 0x20240800, 0x00289000, 0x00a01800, 0x20608000, 0x90280000, 0x08242000]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_attackpat193,3,0.044800],
[owl_attackpat194,5,8, "A901",-1,-1,1,2,2,3,0xa,722,
  [ 0x3c3cfc00, 0xc0ffff00, 0xfcf0f0f0, 0xfcfc0c00, 0xffffc000, 0xfc3c3c3c, 0x0cfcfc00, 0xf0f0fc00],
  [ 0x20249000, 0x806a1200, 0x186020a0, 0x10a40800, 0x126a8000, 0x90242028, 0x08a41000, 0x20601800]
  , 0x10,70.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat195,2,8, "A902",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00984400, 0x60106000, 0x44980000, 0x24102400, 0x60106000, 0x44980000, 0x24102400, 0x00984400]
  , 0x10,70.000000,attributes[0],1,null,autohelperowl_attackpat195,0,0.019600],
[owl_attackpat196,2,8, "A902b",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00984400, 0x60106000, 0x44980000, 0x24102400, 0x60106000, 0x44980000, 0x24102400, 0x00984400]
  , 0x10,30.000000,attributes[0],1,null,autohelperowl_attackpat196,0,0.019600],
[owl_attackpat197,4,8, "A903",-1,-1,1,2,2,3,0xa,722,
  [ 0x7cffff00, 0xf4fcfcf0, 0xfcfcf400, 0xfcfc7c00, 0xfcfcf400, 0xffff7c00, 0x7cfcfc3c, 0xf4fcfc00],
  [ 0x28120000, 0x00180820, 0x0010a000, 0x80900000, 0x08180000, 0x00122800, 0x00908020, 0xa0100000]
  , 0x10,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat198,4,8, "A904",-1,-1,1,1,2,2,0xa,722,
  [ 0x34fcfc00, 0xf0fcf400, 0xfcfc7000, 0x7cfc3c00, 0xf4fcf000, 0xfcfc3400, 0x3cfc7c00, 0x70fcfc00],
  [ 0x20906000, 0x60980000, 0x24182000, 0x00982400, 0x00986000, 0x60902000, 0x24980000, 0x20182400]
  , 0x10,55.000000,attributes[0],1,null,autohelperowl_attackpat198,0,0.016000],
[owl_attackpat199,3,8, "A905",-1,-1,1,1,2,2,0xa,646,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00],
  [ 0x24102800, 0x00988400, 0xa0106000, 0x48980000, 0x84980000, 0x28102400, 0x00984800, 0x6010a000]
  , 0x10,36.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat200,5,8, "A906a",-1,-1,2,2,3,3,0xa,649,
  [ 0xc0fcffff, 0xfcf0f0c0, 0xfcfc0c00, 0x3f3fff00, 0xf0f0fc00, 0xfffcc000, 0xff3f3f0f, 0x0cfcfcfc],
  [ 0x80289204, 0x88602080, 0x18a00800, 0x21248800, 0x20608800, 0x92288000, 0x88242108, 0x08a01840]
  , 0x10,32.000000,attributes[0],1,null,autohelperowl_attackpat200,3,0.610000],
[owl_attackpat201,5,8, "A906b",-1,-1,2,2,3,3,0xa,649,
  [ 0xc0fcffff, 0xfcf0f0c0, 0xfcfc0c00, 0x3f3fff00, 0xf0f0fc00, 0xfffcc000, 0xff3f3f0f, 0x0cfcfcfc],
  [ 0x80281a04, 0x0860a080, 0x90a00800, 0x29248000, 0xa0600800, 0x1a288000, 0x80242908, 0x08a09040]
  , 0x10,32.000000,attributes[0],1,null,autohelperowl_attackpat201,3,0.610000],
[owl_attackpat202,5,8, "A907",-1,-1,2,2,3,3,0xa,648,
  [ 0xf0fcfdff, 0xfcfcf040, 0xfcfc3c00, 0x3fffff00, 0xf0fcfc00, 0xfdfcf000, 0xffff3f07, 0x3cfcfcfc],
  [ 0x20680800, 0x1028a000, 0x80a42000, 0x28a01000, 0xa0281000, 0x08682000, 0x10a02800, 0x20a48000]
  , 0x10,65.000000,attributes[0],1,null,autohelperowl_attackpat202,3,1.000000],
[owl_attackpat203,5,8, "A908",-1,-1,2,2,3,3,0xa,686,
  [ 0xc0fcfcff, 0xfcf0f000, 0xfcfc0c00, 0x3f3fff00, 0xf0f0fc00, 0xfcfcc000, 0xff3f3f03, 0x0cfcfcfc],
  [ 0x80681842, 0x1860a000, 0x90a40800, 0x28249100, 0xa0601800, 0x18688000, 0x91242802, 0x08a49004]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_attackpat203,3,0.050000],
[owl_attackpat204,5,8, "A909",-1,-1,2,1,3,2,0xa,723,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x20a49810, 0xa0689000, 0x98682000, 0x18a52800, 0x9068a000, 0x98a42000, 0x28a51800, 0x20689810]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat205,3,8, "A910",0,-1,1,1,1,2,0x6,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00a80000, 0x20202000, 0x00a80000, 0x20202000, 0x20202000, 0x00a80000, 0x20202000, 0x00a80000]
  , 0x10,25.000000,attributes[0],1,null,autohelperowl_attackpat205,3,0.016000],
[owl_attackpat206,3,8, "A911",0,-2,1,1,1,3,0x6,685,
  [ 0x00f8fc00, 0xf0f0e000, 0xffbf0000, 0x2c3c3c3c, 0xe0f0f0f0, 0xfcf80000, 0x3c3c2c00, 0x00bfff00],
  [ 0x00200000, 0x00200000, 0x02220000, 0x00200028, 0x002000a0, 0x00200000, 0x00200000, 0x00220200]
  , 0x10,25.000000,attributes[0],1,null,autohelperowl_attackpat206,3,0.010000],
[owl_attackpat207,3,8, "A912",-1,-2,1,1,2,3,0x2,722,
  [ 0xbfffff00, 0xf8fcfcfc, 0xfcfcf800, 0xfcfcbc00, 0xfcfcf800, 0xffffbf00, 0xbcfcfcfc, 0xf8fcfc00],
  [ 0x19620000, 0x10240824, 0x00249000, 0x80601000, 0x08241000, 0x00621900, 0x10608060, 0x90240000]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat208,4,8, "A913",0,-1,1,2,1,3,0x2,722,
  [ 0x3c3c3c3c, 0x00fcfc00, 0xf0f0f000, 0xffff0000, 0xfcfc0000, 0x3c3c3c00, 0x00ffff00, 0xf0f0f0f0],
  [ 0x28200020, 0x00280800, 0x0020a000, 0x80a20000, 0x08280000, 0x00202800, 0x00a28000, 0xa0200020]
  , 0x10,80.000000,attributes[0],1,null,autohelperowl_attackpat208,3,0.610000],
[owl_attackpat209,4,8, "A914",0,-1,1,2,1,3,0x2,722,
  [ 0x3c3c3c3c, 0x00fcfc00, 0xf0f0f000, 0xffff0000, 0xfcfc0000, 0x3c3c3c00, 0x00ffff00, 0xf0f0f0f0],
  [ 0x28200020, 0x00280800, 0x0020a000, 0x80a20000, 0x08280000, 0x00202800, 0x00a28000, 0xa0200020]
  , 0x10,25.000000,attributes[0],1,null,autohelperowl_attackpat209,3,1.000000],
[owl_attackpat210,3,8, "A915",0,-2,2,2,2,4,0x2,648,
  [ 0x00fafeff, 0xf0f0e0a0, 0xffbf0000, 0x2f3f3f3f, 0xe0f0f0f0, 0xfefa0000, 0x3f3f2f2b, 0x00bfffff],
  [ 0x00200800, 0x00208000, 0x80220000, 0x08200020, 0x80200020, 0x08200000, 0x00200800, 0x00228000]
  , 0x10,85.000000,attributes[0],1,null,autohelperowl_attackpat210,3,0.010000],
[owl_attackpat211,5,8, "A916",-1,-1,1,2,2,3,0x2,722,
  [ 0x0dffff00, 0xf0f0fcf4, 0xfcfcc000, 0xfc3c3c00, 0xfcf0f000, 0xffff0d00, 0x3c3cfc7c, 0xc0fcfc00],
  [ 0x08a20000, 0x20200820, 0x00288000, 0x80202000, 0x08202000, 0x00a20800, 0x20208020, 0x80280000]
  , 0x10,65.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat212,5,4, "A917",-1,-2,2,1,3,3,0x0,722,
  [ 0x0c3ffc30, 0xc0f0fc30, 0xfcf0c000, 0xfc3f0c00, 0xfcf0c000, 0xfc3f0c00, 0x0c3ffc30, 0xc0f0fc30],
  [ 0x08228020, 0x80200820, 0x08208000, 0x80220800, 0x08208000, 0x80220800, 0x08228020, 0x80200820]
  , 0x10,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat213,4,8, "A918",-1,-2,2,1,3,3,0x0,722,
  [ 0x0c3ffc00, 0xc0f0fc30, 0xfcf0c000, 0xfc3c0c00, 0xfcf0c000, 0xfc3f0c00, 0x0c3cfc30, 0xc0f0fc00],
  [ 0x08228000, 0x80200820, 0x08208000, 0x80200800, 0x08208000, 0x80220800, 0x08208020, 0x80200800]
  , 0x10,40.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat214,5,8, "A919",0,-2,2,3,2,5,0x2,686,
  [ 0x003cffff, 0xc0f0f0c0, 0xfff20000, 0x3f3f0f2f, 0xf0f0c0e0, 0xff3c0000, 0x0f3f3f0f, 0x00f2ffff],
  [ 0x00288200, 0x80202080, 0x09a00000, 0x20200804, 0x20208040, 0x82280000, 0x08202008, 0x00a00900]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat215,6,8, "A920",0,-2,2,2,2,4,0x2,686,
  [ 0x003cfffd, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f01, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0d, 0x00f0fcfd],
  [ 0x00288204, 0x80202080, 0x08a00000, 0x21200800, 0x20208000, 0x82280000, 0x08202108, 0x00a00840]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat216,6,8, "A921",0,-2,2,2,2,4,0x2,685,
  [ 0x00f0fcfd, 0xf0f0c000, 0xff3c0000, 0x0f3f3f0d, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0f01, 0x003cfffd],
  [ 0x00a00840, 0x20208000, 0x82280000, 0x08202108, 0x80202080, 0x08a00000, 0x21200800, 0x00288204]
  , 0x10,30.000000,attributes[0],1,null,autohelperowl_attackpat216,3,1.000000],
[owl_attackpat217,2,8, "A1001",0,0,1,1,1,1,0x0,685,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00240800, 0x00209000, 0x80600000, 0x18200000, 0x90200000, 0x08240000, 0x00201800, 0x00608000]
  , 0xa0,80.000000,attributes[0],1,null,autohelperowl_attackpat217,3,1.096000],
[owl_attackpat218,2,8, "A1001b",0,0,1,1,1,1,0x0,685,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00240800, 0x00209000, 0x80600000, 0x18200000, 0x90200000, 0x08240000, 0x00201800, 0x00608000]
  , 0xa0,50.000000,attributes[0],1,null,autohelperowl_attackpat218,3,3.000000],
[owl_attackpat219,2,8, "A1002",-1,-3,1,0,2,3,0x0,686,
  [ 0x003c3c30, 0x00f0f000, 0xf0f00000, 0x3c3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3c00, 0x00f0f030],
  [ 0x00240800, 0x00209000, 0x80600000, 0x18200000, 0x90200000, 0x08240000, 0x00201800, 0x00608000]
  , 0x80,75.000000,attributes[0],1,null,autohelperowl_attackpat219,3,3.160000],
[owl_attackpat220,2,8, "A1003",-1,-3,1,0,2,3,0x0,686,
  [ 0x003c3c30, 0x00f0f000, 0xf0f00000, 0x3c3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3c00, 0x00f0f030],
  [ 0x00240800, 0x00209000, 0x80600000, 0x18200000, 0x90200000, 0x08240000, 0x00201800, 0x00608000]
  , 0x80,55.000000,attributes[0],1,null,autohelperowl_attackpat220,3,2.800000],
[owl_attackpat221,2,8, "A1005",-1,-1,1,0,2,1,0x0,685,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00188000, 0x80102000, 0x08900000, 0x20100800, 0x20108000, 0x80180000, 0x08102000, 0x00900800]
  , 0x80,90.000000,attributes[0],1,null,autohelperowl_attackpat221,0,1.810000],
[owl_attackpat222,2,8, "A1005b",-1,-1,1,0,2,1,0x0,685,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00188000, 0x80102000, 0x08900000, 0x20100800, 0x20108000, 0x80180000, 0x08102000, 0x00900800]
  , 0x80,90.000000,attributes[0],1,null,autohelperowl_attackpat222,0,1.810000],
[owl_attackpat223,2,8, "A1006",0,-1,2,1,2,2,0x0,685,
  [ 0x00fcfc30, 0xf0f0f000, 0xfcfc0000, 0x3c3f3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3f3c00, 0x00fcfc30],
  [ 0x00980000, 0x20102000, 0x00980000, 0x20102000, 0x20102000, 0x00980000, 0x20102000, 0x00980000]
  , 0x80,70.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat224,2,8, "A1006b",0,-1,2,1,2,2,0x0,685,
  [ 0x00fcfc30, 0xf0f0f000, 0xfcfc0000, 0x3c3f3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3f3c00, 0x00fcfc30],
  [ 0x00980000, 0x20102000, 0x00980000, 0x20102000, 0x20102000, 0x00980000, 0x20102000, 0x00980000]
  , 0x80,75.000000,attributes[0],1,null,autohelperowl_attackpat224,0,0.010000],
[owl_attackpat225,2,8, "A1008",-1,-1,0,1,1,2,0x0,685,
  [ 0x0030fc00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0x0030fc00],
  [ 0x00108800, 0x80108000, 0x88100000, 0x08100800, 0x80108000, 0x88100000, 0x08100800, 0x00108800]
  , 0x80,80.000000,attributes[0],1,null,autohelperowl_attackpat225,0,0.016000],
[owl_attackpat226,2,8, "A1008b",-1,0,1,2,2,2,0x0,685,
  [ 0x00bcbcb0, 0xa0f0f000, 0xf8f80000, 0x3c3f2a00, 0xf0f0a000, 0xbcbc0000, 0x2a3f3c00, 0x00f8f838],
  [ 0x00240020, 0x00201000, 0x00600000, 0x10220000, 0x10200000, 0x00240000, 0x00221000, 0x00600020]
  , 0x80,80.000000,attributes[0],1,null,autohelperowl_attackpat226,3,0.376000],
[owl_attackpat227,2,8, "A1009",0,-1,1,2,1,3,0x2,685,
  [ 0x3c3c3c3c, 0x00fcfc00, 0xf0f0f000, 0xffff0000, 0xfcfc0000, 0x3c3c3c00, 0x00ffff00, 0xf0f0f0f0],
  [ 0x20100020, 0x00180000, 0x00102000, 0x00920000, 0x00180000, 0x00102000, 0x00920000, 0x20100020]
  , 0x80,55.000000,attributes[0],1,null,autohelperowl_attackpat227,0,1.000000],
[owl_attackpat228,2,8, "A1010",-1,-2,1,0,2,2,0x2,685,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00600080, 0x10200000, 0x00240000, 0x00201200, 0x00201000, 0x00600000, 0x12200000, 0x00240008]
  , 0x80,75.000000,attributes[0],1,null,autohelperowl_attackpat228,3,1.000000],
[owl_attackpat229,4,8, "A1011",0,-1,1,1,1,2,0x2,685,
  [ 0x00fc7400, 0x70f07000, 0x74fc0000, 0x343c3400, 0x70f07000, 0x74fc0000, 0x343c3400, 0x00fc7400],
  [ 0x00980000, 0x20102000, 0x00980000, 0x20102000, 0x20102000, 0x00980000, 0x20102000, 0x00980000]
  , 0x80,80.000000,attributes[0],1,null,autohelperowl_attackpat229,0,0.016000],
[owl_attackpat230,3,8, "A1012",-1,-1,1,2,2,3,0x0,721,
  [ 0xf0ffbc00, 0xbcfcf030, 0xf8fc3c00, 0x3cfcf800, 0xf0fcbc00, 0xbcfff000, 0xf8fc3c30, 0x3cfcf800],
  [ 0x80611800, 0x18608010, 0x90240800, 0x08249000, 0x80601800, 0x18618000, 0x90240810, 0x08249000]
  , 0x80,45.000000,attributes[0],1,null,autohelperowl_attackpat230,3,1.006000],
[owl_attackpat231,2,8, "A1013",-1,0,1,2,2,2,0x0,722,
  [ 0x003cfc30, 0xc0f0f000, 0xfcf00000, 0x3c3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3c00, 0x00f0fc30],
  [ 0x00284000, 0x40202000, 0x04a00000, 0x20200400, 0x20204000, 0x40280000, 0x04202000, 0x00a00400]
  , 0x0,10.000000,attributes[0],1,null,autohelperowl_attackpat231,3,2.890000],
[owl_attackpat232,4,8, "A1014",0,-4,1,1,1,5,0x2,722,
  [ 0x007fff00, 0xd0f0f0f0, 0xfcf40000, 0x3c3c1c00, 0xf0f0d000, 0xff7f0000, 0x1c3c3c3c, 0x00f4fc00],
  [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
  , 0x80,55.000000,attributes[0],1,null,autohelperowl_attackpat232,0,0.019600],
// [owl_attackpat233,4,8, "A1015",0,0,1,3,1,3,0x0,686,
//   [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
//   [ 0x00280000, 0x00202000, 0x00a00000, 0x20200000, 0x20200000, 0x00280000, 0x00202000, 0x00a00000]
//   , 0x80,75.000000,attributes[0],1,null,autohelperowl_attackpat233,3,1.096000],
// [owl_attackpat234,4,8, "A1015a",0,0,1,3,1,3,0x0,686,
//   [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
//   [ 0x00280000, 0x00202000, 0x00a00000, 0x20200000, 0x20200000, 0x00280000, 0x00202000, 0x00a00000]
//   , 0x80,75.000000,attributes[0],1,null,autohelperowl_attackpat234,3,1.096000],
[owl_attackpat235,3,8, "A1016",0,-2,1,1,1,3,0x2,685,
  [ 0x0037fe00, 0xc0f0d0b0, 0xfc700000, 0x1c3c0c00, 0xd0f0c000, 0xfe370000, 0x0c3c1c38, 0x0070fc00],
  [ 0x00128000, 0x80100020, 0x08100000, 0x00100800, 0x00108000, 0x80120000, 0x08100020, 0x00100800]
  , 0x80,75.000000,attributes[0],1,null,autohelperowl_attackpat235,0,0.902176],
[owl_attackpat236,3,8, "A1016a",0,-2,1,1,1,3,0x2,685,
  [ 0x0037fe00, 0xc0f0d0b0, 0xfc700000, 0x1c3c0c00, 0xd0f0c000, 0xfe370000, 0x0c3c1c38, 0x0070fc00],
  [ 0x00128000, 0x80100020, 0x08100000, 0x00100800, 0x00108000, 0x80120000, 0x08100020, 0x00100800]
  , 0x80,75.000000,attributes[0],1,null,autohelperowl_attackpat236,0,0.902176],
[owl_attackpat237,4,8, "A1017",-1,-1,0,2,1,3,0x0,722,
  [ 0x1c3c3c38, 0x00f4fc00, 0xf0f0d000, 0xfe7f0000, 0xfcf40000, 0x3c3c1c00, 0x007ffe00, 0xd0f0f0b0],
  [ 0x08200020, 0x00200800, 0x00208000, 0x80220000, 0x08200000, 0x00200800, 0x00228000, 0x80200020]
  , 0x80,65.000000,attributes[0],1,null,autohelperowl_attackpat237,3,1.582000],
[owl_attackpat238,2,8, "A1018",0,0,2,2,2,2,0x0,722,
  [ 0x003f3f3e, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3e, 0x00f0f0f0],
  [ 0x00120020, 0x00100020, 0x00100000, 0x00120000, 0x00100000, 0x00120000, 0x00120020, 0x00100020]
  , 0x80,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat239,2,8, "A1019",-1,0,1,3,2,3,0x0,648,
  [ 0x00fcf8fc, 0xf0f0b000, 0xbcfc0000, 0x3b3f3f00, 0xb0f0f000, 0xf8fc0000, 0x3f3f3b00, 0x00fcbcfc],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x80,65.000000,attributes[0],1,null,autohelperowl_attackpat239,3,2.461600],
[owl_attackpat240,1,4, "A1020",-3,-1,1,3,4,4,0x0,720,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xffffffff, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xffffffff],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat240,3,0.024748],
[owl_attackpat241,2,8, "A1021",-1,0,1,2,2,2,0x0,685,
  [ 0x00303cfc, 0x00f0c000, 0xf0300000, 0x0f3f0300, 0xc0f00000, 0x3c300000, 0x033f0f00, 0x0030f0fc],
  [ 0x00200460, 0x00204000, 0x40200000, 0x04220100, 0x40200000, 0x04200000, 0x01220400, 0x00204024]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat241,3,6.010000],
[owl_attackpat242,3,8, "A1022",-2,-1,1,2,3,3,0x0,648,
  [ 0xfcfcfcf8, 0xfcfcfc00, 0xfffffe00, 0xfeffffbf, 0xfcfcfcf8, 0xfcfcfc00, 0xfffffe00, 0xfeffffbf],
  [ 0x00200020, 0x00200000, 0x00220000, 0x00220021, 0x00200020, 0x00200000, 0x00220000, 0x00220021]
  , 0x80,55.000000,attributes[0],1,null,autohelperowl_attackpat242,3,10.000000],
[owl_attackpat243,6,8, "A1023",0,-1,3,2,3,3,0x0,685,
  [ 0x0070fcf0, 0xd0f0c000, 0xfc340000, 0x0c3f1f00, 0xc0f0d000, 0xfc700000, 0x1f3f0c00, 0x0034fc3c],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x80,45.000000,attributes[0],1,null,autohelperowl_attackpat243,3,10.000000],
[owl_attackpat244,3,8, "A1024a",0,-1,1,2,1,3,0x2,685,
  [ 0x00fc7f00, 0x70f0f0c0, 0xf4fc0000, 0x3c3c3400, 0xf0f07000, 0x7ffc0000, 0x343c3c0c, 0x00fcf400],
  [ 0x00900200, 0x20100080, 0x00180000, 0x00102000, 0x00102000, 0x02900000, 0x20100008, 0x00180000]
  , 0x2880,90.000000,attributes[0],1,null,autohelperowl_attackpat244,0,6.010000],
[owl_attackpat245,3,8, "A1024b",0,-1,1,2,1,3,0x2,685,
  [ 0x00fe7f00, 0x70f0f0e0, 0xf4fc0000, 0x3c3c3400, 0xf0f07000, 0x7ffe0000, 0x343c3c2c, 0x00fcf400],
  [ 0x00900200, 0x20100080, 0x00180000, 0x00102000, 0x00102000, 0x02900000, 0x20100008, 0x00180000]
  , 0x2800,90.000000,attributes[0],1,null,autohelperowl_attackpat245,0,6.010000],
[owl_attackpat246,2,8, "A1100",0,0,2,1,2,1,0x0,722,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00240018, 0x00201000, 0x00600000, 0x12210000, 0x10200000, 0x00240000, 0x00211200, 0x00600090]
  , 0x0,90.000000,attributes[0],1,null,autohelperowl_attackpat246,3,1.810000],
[owl_attackpat247,1,4, "A1101",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00108010, 0x80100000, 0x08100000, 0x00110800, 0x00108000, 0x80100000, 0x08110000, 0x00100810]
  , 0x0,93.000000,attributes[0],1,null,autohelperowl_attackpat247,0,5.000000],
[owl_attackpat248,1,4, "A1101b",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00108010, 0x80100000, 0x08100000, 0x00110800, 0x00108000, 0x80100000, 0x08110000, 0x00100810]
  , 0x0,94.000000,attributes[0],1,null,autohelperowl_attackpat248,0,1.816000],
[owl_attackpat249,1,8, "A1101c",-1,-1,0,1,1,2,0x0,685,
  [ 0x0030fc00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0x0030fc00],
  [ 0x00204400, 0x40204000, 0x44200000, 0x04200400, 0x40204000, 0x44200000, 0x04200400, 0x00204400]
  , 0x0,81.000000,attributes[0],1,null,autohelperowl_attackpat249,3,1.160000],
[owl_attackpat250,2,8, "A1102",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00108018, 0x80100000, 0x08100000, 0x02110800, 0x00108000, 0x80100000, 0x08110200, 0x00100890]
  , 0x80,95.000000,attributes[0],1,null,autohelperowl_attackpat250,0,3.000000],
[owl_attackpat251,2,8, "A1104",-1,-1,1,1,2,2,0x0,683,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00],
  [ 0x04182400, 0x00906400, 0x60904000, 0x64180000, 0x64900000, 0x24180400, 0x00186400, 0x40906000]
  , 0x80,85.000000,attributes[0],1,null,autohelperowl_attackpat251,0,1.600000],
[owl_attackpat252,4,8, "A1105",-1,-1,2,1,3,2,0x2,721,
  [ 0xfcfc7c7c, 0x7cfcfc00, 0xf4fcfc00, 0xfffff500, 0xfcfc7c00, 0x7cfcfc00, 0xf5ffff00, 0xfcfcf4f4],
  [ 0x40902400, 0x24904000, 0x60180400, 0x04186000, 0x40902400, 0x24904000, 0x60180400, 0x04186000]
  , 0xa0,85.000000,attributes[0],1,null,autohelperowl_attackpat252,0,1.600000],
[owl_attackpat253,6,8, "A1106",-1,-1,2,2,3,3,0x2,758,
  [ 0xfcff7f5f, 0x7cfcfcf0, 0xf4fcfc00, 0xfffdf500, 0xfcfc7c00, 0x7ffffc00, 0xf5fdff3f, 0xfcfcf4d4],
  [ 0x50982400, 0x24946000, 0x60981400, 0x24586000, 0x60942400, 0x24985000, 0x60582400, 0x14986000]
  , 0x80,70.000000,attributes[0],1,null,autohelperowl_attackpat253,0,1.960000],
[owl_attackpat254,1,4, "A1107",-1,0,1,2,2,2,0x0,685,
  [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
  [ 0x00904000, 0x60100000, 0x04180000, 0x00102400, 0x00106000, 0x40900000, 0x24100000, 0x00180400]
  , 0x0,95.000000,attributes[0],1,null,autohelperowl_attackpat254,0,1.160000],
[owl_attackpat255,1,8, "A1107b",-2,0,1,1,3,1,0x0,721,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00904000, 0x60100000, 0x04180000, 0x00102400, 0x00106000, 0x40900000, 0x24100000, 0x00180400]
  , 0x0,96.000000,attributes[0],1,null,autohelperowl_attackpat255,0,0.662800],
[owl_attackpat256,1,8, "A1107c",-1,0,1,1,2,1,0x0,722,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00904000, 0x60100000, 0x04180000, 0x00102400, 0x00106000, 0x40900000, 0x24100000, 0x00180400]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_attackpat256,0,0.662800],
[owl_attackpat257,2,8, "A1108",0,-1,1,1,1,2,0x0,648,
  [ 0x003cfc00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0x00f0fc00],
  [ 0x00241800, 0x00609000, 0x90600000, 0x18240000, 0x90600000, 0x18240000, 0x00241800, 0x00609000]
  , 0x0,80.000000,attributes[0],1,null,autohelperowl_attackpat257,3,0.610000],
[owl_attackpat258,3,8, "A1109",-1,-2,2,2,3,4,0x2,685,
  [ 0x1cbcffff, 0xe0f4fcc0, 0xfffad000, 0xff7f2f2f, 0xfcf4e0e0, 0xffbc1c00, 0x2f7fff0f, 0xd0faffff],
  [ 0x08240100, 0x00201840, 0x00608000, 0x90200000, 0x18200000, 0x01240800, 0x00209004, 0x80600000]
  , 0x80,65.000000,attributes[0],1,null,autohelperowl_attackpat258,3,0.610000],
[owl_attackpat259,1,8, "A1110",0,-3,1,2,1,5,0x2,648,
  [ 0x00fcfa00, 0xf0f0b080, 0xbfff0000, 0x383c3c3c, 0xb0f0f0f0, 0xfafc0000, 0x3c3c3808, 0x00ffbf00],
  [ 0x00241000, 0x00601000, 0x10600000, 0x10240000, 0x10600000, 0x10240000, 0x00241000, 0x00601000]
  , 0x0,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat260,4,8, "A1111",-2,-2,2,2,4,4,0x4,683,
  [ 0xfcffffff, 0xfffffcf0, 0xfffdff3c, 0xffffffdf, 0xfcffffdc, 0xfffffcf0, 0xffffff3f, 0xfffdffff],
  [ 0x4090a400, 0xa4904000, 0x68180400, 0x04186800, 0x4090a400, 0xa4904000, 0x68180400, 0x04186800]
  , 0x0,65.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat261,2,8, "A1112",-1,-1,1,2,2,3,0x2,648,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc],
  [ 0xa0100040, 0x08180000, 0x00102800, 0x00908100, 0x00180800, 0x0010a000, 0x81900000, 0x28100004]
  , 0x0,50.000000,attributes[0],1,null,autohelperowl_attackpat261,0,1.000000],
[owl_attackpat262,3,8, "A1113",-2,-2,2,2,4,4,0x0,722,
  [ 0x7ffffcfd, 0xf4fcfc3c, 0xfcfcf400, 0xffff7f00, 0xfcfcf400, 0xfcff7f00, 0x7ffffff1, 0xf4fcfcfc],
  [ 0x00110018, 0x00100010, 0x00100000, 0x02110000, 0x00100000, 0x00110000, 0x00110210, 0x00100090]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_attackpat262,0,0.016000],
[owl_attackpat263,4,8, "A1114",-2,-2,2,2,4,4,0x0,647,
  [ 0xf4fcfc3c, 0xfcfcf400, 0xfdff7f00, 0x7ffffcf5, 0xf4fcfc7c, 0xfcfcf400, 0xfcff7f00, 0x7ffffdf1],
  [ 0x00108010, 0x80100000, 0x08110000, 0x00110810, 0x00108010, 0x80100000, 0x08110000, 0x00110810]
  , 0x0,81.000000,attributes[0],1,null,autohelperowl_attackpat263,0,0.016000],
[owl_attackpat264,5,8, "A1115",-1,-1,2,2,3,3,0x0,721,
  [ 0x4f7ffffd, 0xd4f0fcfc, 0xfcf4c400, 0xff3f5f00, 0xfcf0d400, 0xff7f4f00, 0x5f3ffffd, 0xc4f4fcfc],
  [ 0x04206410, 0x40a04400, 0x64204000, 0x44290400, 0x44a04000, 0x64200400, 0x04294400, 0x40206410]
  , 0x0,81.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat265,6,8, "A1116",-1,-1,2,1,3,2,0x0,648,
  [ 0x30fcfc54, 0xf0fcf000, 0xfcfc3000, 0x3dfd3d00, 0xf0fcf000, 0xfcfc3000, 0x3dfd3d00, 0x30fcfc54],
  [ 0x20641800, 0x10689000, 0x90642000, 0x18a41000, 0x90681000, 0x18642000, 0x10a41800, 0x20649000]
  , 0x80,90.000000,attributes[0],1,null,autohelperowl_attackpat265,3,1.096000],
[owl_attackpat266,2,8, "A1117",-1,-1,0,1,1,2,0x0,685,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00904800, 0x60108000, 0x84180000, 0x08102400, 0x80106000, 0x48900000, 0x24100800, 0x00188400]
  , 0xa0,80.000000,attributes[0],1,null,autohelperowl_attackpat266,0,3.000000],
[owl_attackpat267,2,8, "A1117a",-1,-1,0,1,1,2,0x0,685,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00904800, 0x60108000, 0x84180000, 0x08102400, 0x80106000, 0x48900000, 0x24100800, 0x00188400]
  , 0xa0,80.000000,attributes[0],1,null,autohelperowl_attackpat267,0,3.000000],
[owl_attackpat268,2,8, "A1118",-1,-1,1,1,2,2,0x2,721,
  [ 0xf0fcfc00, 0xfcfcf000, 0xfcfc3c00, 0x3cfcfc00, 0xf0fcfc00, 0xfcfcf000, 0xfcfc3c00, 0x3cfcfc00],
  [ 0x90600000, 0x18240000, 0x00241800, 0x00609000, 0x00241800, 0x00609000, 0x90600000, 0x18240000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat268,3,1.600000],
[owl_attackpat269,2,8, "A1119",0,0,1,2,1,2,0x0,685,
  [ 0x00383c0c, 0x00f0e000, 0xf0b00000, 0x2f3c0000, 0xe0f00000, 0x3c380000, 0x003c2f00, 0x00b0f0c0],
  [ 0x00200008, 0x00200000, 0x00200000, 0x02200000, 0x00200000, 0x00200000, 0x00200200, 0x00200080]
  , 0xa0,36.000000,attributes[0],1,null,autohelperowl_attackpat269,3,0.256336],
[owl_attackpat270,1,8, "A1121",-1,0,1,2,2,2,0x0,685,
  [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
  [ 0x00244004, 0x40201000, 0x04600000, 0x11200400, 0x10204000, 0x40240000, 0x04201100, 0x00600440]
  , 0x80,35.000000,attributes[0],1,null,autohelperowl_attackpat270,3,0.021760],
[owl_attackpat271,2,8, "A1122",0,0,2,1,2,1,0x0,685,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00200008, 0x00200000, 0x00200000, 0x02200000, 0x00200000, 0x00200000, 0x00200200, 0x00200080]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat271,3,6.010000],
[owl_attackpat272,2,8, "A1122a",0,0,2,1,2,1,0x0,685,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00200008, 0x00200000, 0x00200000, 0x02200000, 0x00200000, 0x00200000, 0x00200200, 0x00200080]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat272,3,6.010000],
[owl_attackpat273,2,8, "A1122b",0,0,2,1,2,1,0x0,685,
  [ 0x003c3c3c, 0x00f0f000, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3c3c0000, 0x003f3f00, 0x00f0f0f0],
  [ 0x00200008, 0x00200000, 0x00200000, 0x02200000, 0x00200000, 0x00200000, 0x00200200, 0x00200080]
  , 0x80,76.000000,attributes[0],1,null,autohelperowl_attackpat273,3,6.010000],
[owl_attackpat274,3,8, "A1123",0,-2,1,1,1,3,0x2,685,
  [ 0x0037fe00, 0xc0f0d0b0, 0xfc700000, 0x1c3c0c00, 0xd0f0c000, 0xfe370000, 0x0c3c1c38, 0x0070fc00],
  [ 0x00128000, 0x80100020, 0x08100000, 0x00100800, 0x00108000, 0x80120000, 0x08100020, 0x00100800]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat274,0,1.096000],
[owl_attackpat275,3,8, "A1123a",0,-2,1,1,1,3,0x2,685,
  [ 0x0037fe00, 0xc0f0d0b0, 0xfc700000, 0x1c3c0c00, 0xd0f0c000, 0xfe370000, 0x0c3c1c38, 0x0070fc00],
  [ 0x00128000, 0x80100020, 0x08100000, 0x00100800, 0x00108000, 0x80120000, 0x08100020, 0x00100800]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat275,0,1.096000],
[owl_attackpat276,1,8, "A1124",0,-1,2,1,2,2,0x0,648,
  [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
  [ 0x00900000, 0x20100000, 0x00180000, 0x00102000, 0x00102000, 0x00900000, 0x20100000, 0x00180000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_attackpat276,0,1.096000],
[owl_attackpat277,5,8, "A1124a",0,-1,2,1,2,2,0x0,685,
  [ 0x00f0f454, 0xf0f04000, 0x7c3c0000, 0x053d3d00, 0x40f0f000, 0xf4f00000, 0x3d3d0500, 0x003c7c54],
  [ 0x00900000, 0x20100000, 0x00180000, 0x00102000, 0x00102000, 0x00900000, 0x20100000, 0x00180000]
  , 0x0,70.000000,attributes[0],1,null,autohelperowl_attackpat277,0,0.667600],
[owl_attackpat278,4,8, "A1124b",0,-1,2,1,2,2,0x0,722,
  [ 0x003c7c50, 0x40f0f000, 0xf4f00000, 0x3c3d0500, 0xf0f04000, 0x7c3c0000, 0x053d3c00, 0x00f0f414],
  [ 0x00180000, 0x00102000, 0x00900000, 0x20100000, 0x20100000, 0x00180000, 0x00102000, 0x00900000]
  , 0x80,70.000000,attributes[0],1,null,autohelperowl_attackpat278,0,3.475600],
[owl_attackpat279,6,8, "A1125",-2,-1,1,2,3,3,0x0,721,
  [ 0x3dfdfd20, 0xf0fcfc54, 0xfcfcf000, 0xfcfe3c00, 0xfcfcf000, 0xfdfd3d00, 0x3cfefc54, 0xf0fcfc20],
  [ 0x24902400, 0x20984400, 0x60186000, 0x44982000, 0x44982000, 0x24902400, 0x20984400, 0x60186000]
  , 0x80,76.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat280,1,4, "A1126",-1,-1,0,1,1,2,0x0,685,
  [ 0x0030fc00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0x0030fc00],
  [ 0x00204400, 0x40204000, 0x44200000, 0x04200400, 0x40204000, 0x44200000, 0x04200400, 0x00204400]
  , 0x0,55.000000,attributes[0],1,null,autohelperowl_attackpat280,3,3.320000],
[owl_attackpat281,2,8, "A1127",-1,-1,0,1,1,2,0x0,685,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00608400, 0x90204000, 0x48240000, 0x04201800, 0x40209000, 0x84600000, 0x18200400, 0x00244800]
  , 0x20,70.000000,attributes[0],1,null,autohelperowl_attackpat281,3,1.369456],
[owl_attackpat282,2,8, "A1127a",-1,-1,0,1,1,2,0x0,685,
  [ 0x00f0fc00, 0xf0f0c000, 0xfc3c0000, 0x0c3c3c00, 0xc0f0f000, 0xfcf00000, 0x3c3c0c00, 0x003cfc00],
  [ 0x00608400, 0x90204000, 0x48240000, 0x04201800, 0x40209000, 0x84600000, 0x18200400, 0x00244800]
  , 0x20,70.000000,attributes[0],1,null,autohelperowl_attackpat282,3,1.369456],
[owl_attackpat283,4,8, "A1128",0,-1,1,2,1,3,0x0,647,
  [ 0x00fcfc00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0x00ffff00],
  [ 0x00248800, 0x80209000, 0x88620000, 0x18200820, 0x90208020, 0x88240000, 0x08201800, 0x00628800]
  , 0x80,80.000000,attributes[0],1,null,autohelperowl_attackpat283,3,0.970000],
[owl_attackpat284,5,8, "A1129",-1,-1,2,2,3,3,0x0,648,
  [ 0x7fffff7c, 0xf4fcfcfc, 0xfcfcf400, 0xffff7d00, 0xfcfcf400, 0xffff7f00, 0x7dfffffc, 0xf4fcfcf4],
  [ 0x29641000, 0x10681804, 0x1064a000, 0x90a41000, 0x18681000, 0x10642900, 0x10a49040, 0xa0641000]
  , 0x80,86.000000,attributes[0],1,null,autohelperowl_attackpat284,3,1.000000],
[owl_attackpat285,4,8, "A1130",-2,-3,2,1,4,4,0x0,686,
  [ 0x7cfeffff, 0xf4fcfce0, 0xfffef400, 0xffff7f2f, 0xfcfcf4e0, 0xfffe7c00, 0x7fffff2f, 0xf4feffff],
  [ 0x24580800, 0x1018a400, 0x80946000, 0x68901000, 0xa4181000, 0x08582400, 0x10906800, 0x60948000]
  , 0x80,65.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat286,2,8, "A1131",0,-1,1,2,1,3,0x2,721,
  [ 0x303c3c30, 0x00fcf000, 0xf0f03000, 0x3cff0000, 0xf0fc0000, 0x3c3c3000, 0x00ff3c00, 0x30f0f030],
  [ 0x20100020, 0x00180000, 0x00102000, 0x00920000, 0x00180000, 0x00102000, 0x00920000, 0x20100020]
  , 0x0,90.000000,attributes[0],1,null,autohelperowl_attackpat286,0,6.010000],
[owl_attackpat287,5,8, "A1132",-1,-1,2,2,3,3,0xa,648,
  [ 0xf0fcffff, 0xfcfcf0c0, 0xfcfc3c00, 0x3fffff00, 0xf0fcfc00, 0xfffcf000, 0xffff3f0f, 0x3cfcfcfc],
  [ 0x10681a06, 0x1064a080, 0x90a41000, 0x29641000, 0xa0641000, 0x1a681000, 0x1064290a, 0x10a49040]
  , 0x0,70.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat288,2,8, "A1133a",0,-1,4,2,4,3,0x0,723,
  [ 0x003f3d3f, 0x00f0f070, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3d3f0000, 0x003f3f37, 0x00f0f0f0],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_attackpat288,0,0.021760],
[owl_attackpat289,1,8, "A1133b",0,-1,4,2,4,3,0x0,722,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat289,0,0.021760],
[owl_attackpat290,2,8, "A1134",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00980400, 0x20106000, 0x40980000, 0x24102000, 0x60102000, 0x04980000, 0x20102400, 0x00984000]
  , 0x80,75.000000,attributes[0],1,null,autohelperowl_attackpat290,0,0.016000],
[owl_attackpat291,2,8, "A1134b",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00980400, 0x20106000, 0x40980000, 0x24102000, 0x60102000, 0x04980000, 0x20102400, 0x00984000]
  , 0x80,75.000000,attributes[0],1,null,autohelperowl_attackpat291,0,0.016000],
[owl_attackpat292,2,8, "A1134c",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00980400, 0x20106000, 0x40980000, 0x24102000, 0x60102000, 0x04980000, 0x20102400, 0x00984000]
  , 0x80,40.000000,attributes[0],1,null,autohelperowl_attackpat292,0,0.010000],
[owl_attackpat293,2,8, "A1134d",0,-1,1,1,1,2,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00980400, 0x20106000, 0x40980000, 0x24102000, 0x60102000, 0x04980000, 0x20102400, 0x00984000]
  , 0x80,40.000000,attributes[0],1,null,autohelperowl_attackpat293,0,0.010000],
[owl_attackpat294,2,8, "A1135",0,-2,1,1,1,3,0x2,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0x00ffff00],
  [ 0x00180000, 0x00102000, 0x02900000, 0x20100008, 0x20100080, 0x00180000, 0x00102000, 0x00900200]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat294,0,9.610001],
[owl_attackpat295,2,8, "A1136",-1,0,2,2,3,2,0x0,721,
  [ 0x0c3f3c0c, 0x00f0fc30, 0xf0f0c000, 0xff3c0000, 0xfcf00000, 0x3c3f0c00, 0x003cff30, 0xc0f0f0c0],
  [ 0x08110008, 0x00100810, 0x00108000, 0x82100000, 0x08100000, 0x00110800, 0x00108210, 0x80100080]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat295,0,9.610001],
[owl_attackpat296,6,8, "A1137",-2,-2,1,1,3,3,0x0,647,
  [ 0xf4fcfc00, 0xfdfdf400, 0xfcff7f15, 0x7cfcfcf0, 0xf4fdfd3d, 0xfcfcf450, 0xfcfc7c00, 0x7ffffc00],
  [ 0x0010a400, 0x80904000, 0x68100000, 0x04180800, 0x40908000, 0xa4100000, 0x08180400, 0x00106800]
  , 0x0,79.000000,attributes[0],1,null,autohelperowl_attackpat296,0,0.019600],
[owl_attackpat297,6,8, "A1138",-1,-3,2,1,3,4,0x2,648,
  [ 0xc0f0fcfc, 0xfcf0c000, 0xff3d0d00, 0x0f3fff5f, 0xc0f0fcd4, 0xfcf0c000, 0xff3f0f00, 0x0d3dffff],
  [ 0x00101820, 0x00508000, 0x90100000, 0x08160000, 0x80500000, 0x18100000, 0x00160800, 0x00109020]
  , 0x0,30.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat298,4,8, "A1139",-1,-1,2,2,3,3,0x0,647,
  [ 0xfdffbf0c, 0xbcfcfcf4, 0xf8fcfc00, 0xfffcf800, 0xfcfcbc00, 0xbffffd00, 0xf8fcff7c, 0xfcfcf8c0],
  [ 0x18260104, 0x00241860, 0x00609000, 0x91600000, 0x18240000, 0x01261800, 0x00609124, 0x90600040]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_attackpat298,3,2.176000],
[owl_attackpat299,3,8, "A1140a",0,-1,1,2,1,3,0x2,722,
  [ 0x003ffe00, 0xc0f0f0b0, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfe3f0000, 0x0c3c3c38, 0x00f0fc00],
  [ 0x00269000, 0x80601020, 0x18600000, 0x10240800, 0x10608000, 0x90260000, 0x08241020, 0x00601800]
  , 0x0,40.000000,attributes[0],1,null,autohelperowl_attackpat299,3,6.010000],
[owl_attackpat300,3,8, "A1140b",0,-1,1,2,1,3,0x2,722,
  [ 0x003ffe00, 0xc0f0f0b0, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xfe3f0000, 0x0c3c3c38, 0x00f0fc00],
  [ 0x00269000, 0x80601020, 0x18600000, 0x10240800, 0x10608000, 0x90260000, 0x08241020, 0x00601800]
  , 0x0,40.000000,attributes[0],1,null,autohelperowl_attackpat300,3,6.010000],
[owl_attackpat301,2,8, "A1141",-1,0,2,2,3,2,0x0,685,
  [ 0x3c3f3e3c, 0x00fcfcb0, 0xf0f0f000, 0xffff0000, 0xfcfc0000, 0x3e3f3c00, 0x00ffff38, 0xf0f0f0f0],
  [ 0x14210008, 0x00240410, 0x00205000, 0x42600000, 0x04240000, 0x00211400, 0x00604210, 0x50200080]
  , 0x80,76.000000,attributes[0],1,null,autohelperowl_attackpat301,3,10.000000],
[owl_attackpat302,2,8, "A1141b",-1,0,2,2,3,2,0x0,685,
  [ 0x3c3f3e3c, 0x00fcfcb0, 0xf0f0f000, 0xffff0000, 0xfcfc0000, 0x3e3f3c00, 0x00ffff38, 0xf0f0f0f0],
  [ 0x14210008, 0x00240410, 0x00205000, 0x42600000, 0x04240000, 0x00211400, 0x00604210, 0x50200080]
  , 0x80,76.000000,attributes[0],1,null,autohelperowl_attackpat302,3,10.000000],
[owl_attackpat303,1,8, "A1201",0,-1,1,1,1,2,0x0,648,
  [ 0x0030fc00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0x0030fc00],
  [ 0x00102400, 0x00904000, 0x60100000, 0x04180000, 0x40900000, 0x24100000, 0x00180400, 0x00106000]
  , 0x0,75.000000,attributes[0],1,null,autohelperowl_attackpat303,0,0.016000],
[owl_attackpat304,1,8, "A1203",-1,-1,0,1,1,2,0x0,685,
  [ 0x00fc3000, 0x30f03000, 0x30fc0000, 0x303c3000, 0x30f03000, 0x30fc0000, 0x303c3000, 0x00fc3000],
  [ 0x00640000, 0x10201000, 0x00640000, 0x10201000, 0x10201000, 0x00640000, 0x10201000, 0x00640000]
  , 0x10,80.000000,attributes[0],1,null,autohelperowl_attackpat304,3,0.016000],
[owl_attackpat305,1,8, "A1204",-1,-1,0,1,1,2,0x0,685,
  [ 0x00fc3000, 0x30f03000, 0x30fc0000, 0x303c3000, 0x30f03000, 0x30fc0000, 0x303c3000, 0x00fc3000],
  [ 0x00640000, 0x10201000, 0x00640000, 0x10201000, 0x10201000, 0x00640000, 0x10201000, 0x00640000]
  , 0x10,30.000000,attributes[0],1,null,autohelperowl_attackpat305,3,0.034000],
[owl_attackpat306,2,8, "A1205",-1,0,0,1,1,1,0x0,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00201800, 0x00608000, 0x90200000, 0x08240000, 0x80600000, 0x18200000, 0x00240800, 0x00209000]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_attackpat306,3,0.610000],
[owl_attackpat307,2,8, "A1206",-1,0,0,1,1,1,0x0,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00201800, 0x00608000, 0x90200000, 0x08240000, 0x80600000, 0x18200000, 0x00240800, 0x00209000]
  , 0x90,30.000000,attributes[0],1,null,autohelperowl_attackpat307,3,0.630160],
[owl_attackpat308,3,8, "A1207",-1,-2,1,0,2,2,0x0,685,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00a40800, 0x20209000, 0x80680000, 0x18202000, 0x90202000, 0x08a40000, 0x20201800, 0x00688000]
  , 0x80,45.000000,attributes[0],1,null,autohelperowl_attackpat308,3,1.000000],
[owl_attackpat309,2,8, "A1208",-2,-2,1,1,3,3,0x2,683,
  [ 0xfcfcbc00, 0xbfffff00, 0xfafefffc, 0xfcfcf8e8, 0xffffbfac, 0xbcfcfcfc, 0xf8fcfc00, 0xfffefa00],
  [ 0x00201000, 0x02600000, 0x10200108, 0x00240040, 0x00600204, 0x10200080, 0x00240000, 0x01201000]
  , 0x80,40.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat310,2,8, "A1209",0,-1,1,2,1,3,0x2,758,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00681000, 0x10602000, 0x10a40000, 0x20241000, 0x20601000, 0x10680000, 0x10242000, 0x00a41000]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_attackpat310,3,0.010000],
[owl_attackpat311,2,8, "A1210",0,-1,1,1,1,2,0x0,685,
  [ 0x0030fc00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0xc0f0c000, 0xfc300000, 0x0c3c0c00, 0x0030fc00],
  [ 0x00108800, 0x80108000, 0x88100000, 0x08100800, 0x80108000, 0x88100000, 0x08100800, 0x00108800]
  , 0x0,65.000000,attributes[0],1,null,autohelperowl_attackpat311,0,2.680000],
[owl_attackpat312,3,8, "A1301",-2,-2,3,3,5,5,0xa,723,
  [ 0xeaffffff, 0xfffaf8f8, 0xffffaf2f, 0xbfbfffff, 0xf8faffff, 0xffffeae0, 0xffbfbfbf, 0xafffffff],
  [ 0x4094a000, 0xa4901000, 0x28580400, 0x10186800, 0x1090a400, 0xa0944000, 0x68181000, 0x04582800]
  , 0x0,90.000000,attributes[0],1,null,autohelperowl_attackpat312,0,0.010000],
[owl_attackpat313,2,8, "A1302",-1,-2,1,1,2,3,0xa,685,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x10a00000, 0x20240000, 0x00281000, 0x00602000, 0x00242000, 0x00a01000, 0x20600000, 0x10280000]
  , 0x10,30.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat314,3,8, "A1303",-1,-2,1,1,2,3,0xa,648,
  [ 0x20fcfcfc, 0xf0f8f000, 0xfcfc2000, 0x3fbf3f00, 0xf0f8f000, 0xfcfc2000, 0x3fbf3f00, 0x20fcfcfc],
  [ 0x00280020, 0x00202000, 0x00a00000, 0x20220000, 0x20200000, 0x00280000, 0x00222000, 0x00a00020]
  , 0x10,90.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat315,4,8, "A1303b",-1,-2,1,1,2,3,0xa,721,
  [ 0x3fff3f00, 0x30fcfcfc, 0xf0fcf000, 0xfcfc3000, 0xfcfc3000, 0x3fff3f00, 0x30fcfcfc, 0xf0fcf000],
  [ 0x20622400, 0x10a84020, 0x60242000, 0x04a81000, 0x40a81000, 0x24622000, 0x10a80420, 0x20246000]
  , 0x10,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat316,3,8, "A1303c",-1,-1,1,2,2,3,0xa,685,
  [ 0xfcfefc00, 0xfcfcfc20, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfefc00, 0xfcfcfc20, 0xfcfcfc00],
  [ 0x08980000, 0x20102800, 0x00988000, 0xa0102000, 0x28102000, 0x00980800, 0x2010a000, 0x80980000]
  , 0x10,85.000000,attributes[0],1,null,autohelperowl_attackpat316,0,1.000000],
[owl_attackpat317,2,8, "A1304",0,-1,1,1,1,2,0xa,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00],
  [ 0x00608000, 0x90200000, 0x08240000, 0x00201800, 0x00209000, 0x80600000, 0x18200000, 0x00240800]
  , 0x10,60.000000,attributes[0],1,null,autohelperowl_attackpat317,3,0.016000],
[owl_attackpat318,5,8, "A1305",0,-1,2,2,2,3,0xa,685,
  [ 0x00fcffff, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfffc0000, 0x3f3f3f0f, 0x00fcfcfc],
  [ 0x00a80202, 0x20202080, 0x00a80000, 0x20202000, 0x20202000, 0x02a80000, 0x2020200a, 0x00a80000]
  , 0x10,90.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat319,4,8, "A1305b",0,-1,2,2,2,3,0xa,685,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfffc0000, 0x3f3f3f0f, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3f00, 0x00fcffff],
  [ 0x00280000, 0x00202000, 0x02a00000, 0x2020000a, 0x20200080, 0x00280000, 0x00202000, 0x00a00202]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat320,5,8, "A1306",0,-1,2,2,2,3,0xa,686,
  [ 0x00fcffff, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfffc0000, 0x3f3f3f0f, 0x00fcfcfc],
  [ 0x00a80202, 0x20202080, 0x00a80000, 0x20202000, 0x20202000, 0x02a80000, 0x2020200a, 0x00a80000]
  , 0x10,85.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat321,6,8, "A1307",-1,-1,1,2,2,3,0xa,722,
  [ 0xdcffff00, 0xfcf4fcf0, 0xfcfcdc00, 0xfc7cfc00, 0xfcf4fc00, 0xffffdc00, 0xfc7cfc3c, 0xdcfcfc00],
  [ 0x88221200, 0x086008a0, 0x10208800, 0x80248000, 0x08600800, 0x12228800, 0x80248028, 0x88201000]
  , 0x10,85.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat322,6,8, "A1308",-1,-1,1,2,2,3,0xa,685,
  [ 0x1cfcfc00, 0xf0f4fc00, 0xfffdd000, 0xfc7c3c1c, 0xfcf4f0d0, 0xfcfc1c00, 0x3c7cfc00, 0xd0fdff00],
  [ 0x08a00000, 0x20200800, 0x02288000, 0x80202008, 0x08202080, 0x00a00800, 0x20208000, 0x80280200]
  , 0x10,90.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat323,4,8, "A1309",0,-1,1,2,1,3,0xa,685,
  [ 0x007cfc00, 0xd0f0f000, 0xfdf70000, 0x3c3c1c34, 0xf0f0d070, 0xfc7c0000, 0x1c3c3c00, 0x00f7fd00],
  [ 0x00204000, 0x40200000, 0x04220000, 0x00200420, 0x00204020, 0x40200000, 0x04200000, 0x00220400]
  , 0x10,90.000000,attributes[0],1,null,autohelperowl_attackpat323,3,0.016000],
[owl_attackpat324,3,8, "A1310",0,-1,1,2,1,3,0xa,647,
  [ 0x00fffd00, 0xf0f0f070, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfdff0000, 0x3c3c3c34, 0x00fcfc00],
  [ 0x00221400, 0x00604020, 0x50200000, 0x04240000, 0x40600000, 0x14220000, 0x00240420, 0x00205000]
  , 0x10,30.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat325,6,8, "A1310b",-1,-1,1,2,2,3,0xa,648,
  [ 0xdcffff00, 0xfcf4fcf0, 0xfcfcdc00, 0xfc7cfc00, 0xfcf4fc00, 0xffffdc00, 0xfc7cfc3c, 0xdcfcfc00],
  [ 0x88221600, 0x086048a0, 0x50208800, 0x84248000, 0x48600800, 0x16228800, 0x80248428, 0x88205000]
  , 0x10,31.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat326,4,8, "A1311",-1,-1,1,2,2,3,0xa,722,
  [ 0xfcfcfc3c, 0xfcfcfc00, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcffff00, 0xfcfcfcf0],
  [ 0x20908020, 0xa0180000, 0x08182000, 0x00922800, 0x0018a000, 0x80902000, 0x28920000, 0x20180820]
  , 0x10,80.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat327,4,8, "A1311b",-1,-1,1,3,2,4,0xa,721,
  [ 0xfcfcfc3c, 0xfcfcfc00, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcffff00, 0xfcfcfcf0],
  [ 0x20908020, 0xa0180000, 0x08182000, 0x00922800, 0x0018a000, 0x80902000, 0x28920000, 0x20180820]
  , 0x10,81.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat328,5,8, "A1312",-1,-1,2,2,3,3,0xa,685,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfffcf000, 0xffff3f0d, 0xfcfcf0c0, 0xfcfc3c00, 0x3fffff00, 0xf0fcfffd],
  [ 0x24a00000, 0x20280400, 0x02286000, 0x40a02008, 0x04282080, 0x00a02400, 0x20a04000, 0x60280200]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat329,2,8, "A1313",-1,-2,2,3,3,5,0xa,722,
  [ 0x1f3fffaf, 0xc3f7ffff, 0xfcf0d0fc, 0xff7e0e00, 0xfff7c300, 0xff3f1fff, 0x0e7effff, 0xd0f0fce8],
  [ 0x00204000, 0x40200000, 0x04200000, 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x00200400]
  , 0x0,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat330,3,8, "A1314",-1,-2,1,1,2,3,0xa,722,
  [ 0x3dffbf00, 0xb0fcfcf4, 0xf8fcf000, 0xfcfc3800, 0xfcfcb000, 0xbfff3d00, 0x38fcfc7c, 0xf0fcf800],
  [ 0x20600000, 0x10280000, 0x00242000, 0x00a01000, 0x00281000, 0x00602000, 0x10a00000, 0x20240000]
  , 0x10,45.000000,attributes[0],1,null,autohelperowl_attackpat330,3,1.000000],
[owl_attackpat331,3,8, "A1315",-2,-1,1,2,3,3,0xa,721,
  [ 0xfcffff00, 0xfffffff0, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xfffffcfc, 0xfcfcfc3c, 0xfcfcfc00],
  [ 0x08210000, 0x00220910, 0x00208060, 0x80200000, 0x09220000, 0x00210824, 0x00208010, 0x80200000]
  , 0x0,55.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat332,4,8, "A1316",0,-1,2,2,2,3,0xa,685,
  [ 0x00fcffff, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfffc0000, 0x3f3f3f0f, 0x00fcfcfc],
  [ 0x00280206, 0x00202080, 0x00a00000, 0x21200000, 0x20200000, 0x02280000, 0x0020210a, 0x00a00040]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat333,3,8, "A1317",-1,-1,1,2,2,3,0xa,685,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc3c, 0xfcfcfcf0, 0xfcfcfc00, 0xfcfcfc00, 0xfcffff00],
  [ 0x80a00000, 0x28200000, 0x01290800, 0x0020a014, 0x00202850, 0x00a08000, 0xa0200000, 0x08290100]
  , 0x10,55.000000,attributes[0],1,null,autohelperowl_attackpat333,3,0.610000],
[owl_attackpat334,4,8, "A1318",-1,-1,1,2,2,3,0xa,647,
  [ 0xfcffff00, 0xfcfcfcf0, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc3c, 0xfcfcfc00],
  [ 0x08291900, 0x0060a850, 0x90a08000, 0xa8240000, 0xa8600000, 0x19290800, 0x0024a814, 0x80a09000]
  , 0x10,55.000000,attributes[0],1,null,autohelperowl_attackpat334,3,0.610000],
[owl_attackpat335,4,8, "A1319",-1,-2,2,1,3,3,0xa,758,
  [ 0x3f3f7fff, 0x40fcfcfc, 0xf4f0f000, 0xffff0700, 0xfcfc4000, 0x7f3f3f00, 0x07ffffff, 0xf0f0f4fc],
  [ 0x18202000, 0x00a40800, 0x20209000, 0x80680000, 0x08a40000, 0x20201800, 0x00688000, 0x90202000]
  , 0x10,61.000000,attributes[0],1,null,autohelperowl_attackpat335,3,1.000000],
[owl_attackpat336,3,8, "A1319b",-1,0,2,2,3,2,0xa,685,
  [ 0x3f3f3f3f, 0x00fcfcfc, 0xf0f0f000, 0xffff0000, 0xfcfc0000, 0x3f3f3f00, 0x00ffffff, 0xf0f0f0f0],
  [ 0x09120200, 0x001008a4, 0x00108000, 0x80100000, 0x08100000, 0x02120900, 0x00108068, 0x80100000]
  , 0x10,30.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat337,5,8, "A1319c",-1,-2,2,1,3,3,0xa,722,
  [ 0x3f3f7fff, 0x40fcfcfc, 0xf4f0f000, 0xffff0700, 0xfcfc4000, 0x7f3f3f00, 0x07ffffff, 0xf0f0f4fc],
  [ 0x18212200, 0x00a40890, 0x20209000, 0x80680000, 0x08a40000, 0x22211800, 0x00688018, 0x90202000]
  , 0x10,61.000000,attributes[0],1,null,autohelperowl_attackpat337,3,1.000000],
[owl_attackpat338,3,8, "A1320",-1,-1,1,1,2,2,0xa,722,
  [ 0x3c3cfc00, 0xc0fcfc00, 0xfcf0f000, 0xfcfc0c00, 0xfcfcc000, 0xfc3c3c00, 0x0cfcfc00, 0xf0f0fc00],
  [ 0x20249000, 0x80681000, 0x18602000, 0x10a40800, 0x10688000, 0x90242000, 0x08a41000, 0x20601800]
  , 0x10,80.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat339,3,8, "A1321",-1,-1,1,1,2,2,0xa,648,
  [ 0xc0fcfc00, 0xfcf0f000, 0xfcfc0c00, 0x3c3cfc00, 0xf0f0fc00, 0xfcfcc000, 0xfc3c3c00, 0x0cfcfc00],
  [ 0x80281000, 0x08602000, 0x10a00800, 0x20248000, 0x20600800, 0x10288000, 0x80242000, 0x08a01000]
  , 0x10,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat340,3,8, "A1322",-1,-2,1,0,2,2,0xa,648,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00280008, 0x00202000, 0x00a00000, 0x22200000, 0x20200000, 0x00280000, 0x00202200, 0x00a00080]
  , 0x10,40.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat341,4,8, "A1323",0,-1,3,1,3,2,0xa,649,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00a40808, 0x20209000, 0x80680000, 0x1a202000, 0x90202000, 0x08a40000, 0x20201a00, 0x00688080]
  , 0x10,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat342,1,8, "A1324",-3,-2,2,2,5,4,0xa,647,
  [ 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
  [ 0x40200000, 0x04210000, 0x00200410, 0x00204000, 0x00210400, 0x00204010, 0x40200000, 0x04200000]
  , 0x0,90.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat343,4,8, "A1325",-1,-1,2,2,3,3,0x6,721,
  [ 0xffffff3f, 0xfcfcfcfc, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc00, 0xffffff00, 0xfcffffff, 0xfcfcfcf0],
  [ 0x54208820, 0x84248400, 0x88205400, 0x48624800, 0x84248400, 0x88205400, 0x48624800, 0x54208820]
  , 0x0,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat344,2,8, "A1326",-2,-2,2,2,4,4,0x9,611,
  [ 0xffffffff, 0xfcfcfefe, 0xffffff80, 0xffffffff, 0xfefcfcfc, 0xffffff0a, 0xffffffff, 0xffffffff],
  [ 0x50208000, 0x84240000, 0x08211400, 0x00604810, 0x00248410, 0x80205000, 0x48600000, 0x14210800]
  , 0x0,85.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat345,3,8, "A1327",-2,-2,3,2,5,4,0x9,646,
  [ 0xffffff80, 0xffffffff, 0xffffffff, 0xfcfcfefe, 0xffffffff, 0xffffffff, 0xfefcfcfc, 0xffffff0a],
  [ 0x09219400, 0x80604814, 0x58208000, 0x84240800, 0x48608000, 0x94210900, 0x08248450, 0x80205800]
  , 0x90,85.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat346,7,8, "A1328",-1,-2,2,1,3,3,0xa,722,
  [ 0x0d39ef5f, 0xc0b0ecd4, 0xecb0c000, 0xef390d00, 0xecb0c000, 0xef390d00, 0x0d39ef5f, 0xc0b0ecd4],
  [ 0x08208000, 0x80200800, 0x08208000, 0x80200800, 0x08208000, 0x80200800, 0x08208000, 0x80200800]
  , 0x10,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat347,4,8, "A1329",-1,-1,2,1,3,2,0xa,722,
  [ 0x0c3c7c6c, 0x40f0fc00, 0xf4f0c000, 0xff3e0500, 0xfcf04000, 0x7c3c0c00, 0x053eff00, 0xc0f0f4e4],
  [ 0x08241004, 0x00601800, 0x10608000, 0x91240000, 0x18600000, 0x10240800, 0x00249100, 0x80601040]
  , 0x10,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat348,6,8, "A1330",-1,-1,2,1,3,2,0xa,647,
  [ 0xf0fcfcec, 0xfcfcf000, 0xfcfc3c00, 0x3ffeff00, 0xf0fcfc00, 0xfcfcf000, 0xfffe3f00, 0x3cfcfcec],
  [ 0xa0289844, 0x8868a000, 0x98a02800, 0x29a48900, 0xa0688800, 0x9828a000, 0x89a42900, 0x28a09844]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_attackpat348,3,0.610000],
[owl_attackpat349,3,8, "A1331",-1,-1,1,1,2,2,0xa,648,
  [ 0x3cfcfc00, 0xf0fcfc00, 0xfcfcf000, 0xfcfc3c00, 0xfcfcf000, 0xfcfc3c00, 0x3cfcfc00, 0xf0fcfc00],
  [ 0x24902400, 0x20984400, 0x60186000, 0x44982000, 0x44982000, 0x24902400, 0x20984400, 0x60186000]
  , 0x10,55.000000,attributes[0],1,null,autohelperowl_attackpat349,0,1.000000],
[owl_attackpat350,6,8, "A1332",0,-1,2,2,2,3,0xa,648,
  [ 0x0074fcfc, 0xd0f0d000, 0xff740000, 0x1f3f1f0d, 0xd0f0d0c0, 0xfc740000, 0x1f3f1f00, 0x0074fffd],
  [ 0x00200420, 0x00204000, 0x42200000, 0x04220008, 0x40200080, 0x04200000, 0x00220400, 0x00204220]
  , 0x10,55.000000,attributes[0],1,null,autohelperowl_attackpat350,3,1.000000],
[owl_attackpat351,7,8, "A1333",-2,-1,1,2,3,3,0xa,683,
  [ 0xfcfcfc00, 0xffffff00, 0xfffffffc, 0xfcfcfcfc, 0xfffffffc, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00],
  [ 0x00580000, 0x12122200, 0x029602a8, 0x201010a8, 0x221212a8, 0x005800a8, 0x10102000, 0x02960200]
  , 0x10,55.000000,attributes[0],1,null,autohelperowl_attackpat351,0,0.016000],
[owl_attackpat352,8,8, "A1334",-1,-1,2,2,3,3,0xa,649,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xfffffc00, 0xffffff3f, 0xfcfcfcf0, 0xfcfcfc00, 0xffffff00, 0xfcffffff],
  [ 0xa8185800, 0x4858a800, 0x9692a800, 0xa894842a, 0xa85848a0, 0x5818a800, 0x8494a800, 0xa8929602]
  , 0x10,55.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat353,3,8, "A1335",-1,-2,1,1,2,3,0xa,758,
  [ 0x3fffff00, 0xf0fcfcfc, 0xfcfcf000, 0xfcfc3c00, 0xfcfcf000, 0xffff3f00, 0x3cfcfcfc, 0xf0fcfc00],
  [ 0x20605800, 0x50688000, 0x94242000, 0x08a41400, 0x80685000, 0x58602000, 0x14a40800, 0x20249400]
  , 0x10,41.000000,attributes[0],1,null,autohelperowl_attackpat353,3,1.600000],
[owl_attackpat354,3,8, "A1335b",-1,-1,1,2,2,3,0xa,647,
  [ 0xfcffff00, 0xfcfcfcf0, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfffffc00, 0xfcfcfc3c, 0xfcfcfc00],
  [ 0x08192100, 0x00902850, 0x20908000, 0xa0180000, 0x28900000, 0x21190800, 0x0018a014, 0x80902000]
  , 0x10,41.000000,attributes[0],1,null,autohelperowl_attackpat354,0,1.600000],
[owl_attackpat355,5,8, "A1336",0,-1,2,2,2,3,0xa,649,
  [ 0x00ffffff, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3f, 0x00fcfcfc],
  [ 0x00a90224, 0x20202090, 0x00a80000, 0x21222000, 0x20202000, 0x02a90000, 0x20222118, 0x00a80060]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_attackpat355,3,1.600000],
[owl_attackpat356,8,8, "A1337",-1,-1,2,2,3,3,0xa,686,
  [ 0xf4fdfffb, 0xfcfcf4d0, 0xfcfc7c00, 0x7effff00, 0xf4fcfc00, 0xfffdf400, 0xffff7e1f, 0x7cfcfcbc],
  [ 0xa0189602, 0x88586080, 0x58902800, 0x24948800, 0x60588800, 0x9618a000, 0x8894240a, 0x28905800]
  , 0x10,35.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat357,6,8, "A1338",-2,0,2,2,4,2,0xa,758,
  [ 0x00fffff7, 0xf0f0f0f0, 0xffff0000, 0x3d3f3f3e, 0xf0f0f0f0, 0xffff0000, 0x3f3f3d3f, 0x00ffff7e],
  [ 0x00608962, 0x90208040, 0x89250000, 0x08221914, 0x80209050, 0x89600000, 0x19220806, 0x00258924]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat358,6,8, "A1339",-1,0,1,2,2,2,0xa,722,
  [ 0x1d3f3d00, 0x00f4fc74, 0xf0f0d000, 0xfc7c0000, 0xfcf40000, 0x3d3f1d00, 0x007cfc74, 0xd0f0f000],
  [ 0x08220000, 0x00200820, 0x00208000, 0x80200000, 0x08200000, 0x00220800, 0x00208020, 0x80200000]
  , 0x10,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat359,5,8, "A1340",-1,-1,1,2,2,3,0xa,685,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfffdfc00, 0xfcfcfc1c, 0xfcfcfcd0, 0xfcfcfc00, 0xfcfcfc00, 0xfcfdff00],
  [ 0x88900000, 0x28100800, 0x02188800, 0x8010a008, 0x08102880, 0x00908800, 0xa0108000, 0x88180200]
  , 0x10,40.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat360,5,8, "A1341",-2,0,2,2,4,2,0x6,759,
  [ 0x3f3f3f3f, 0x00fcfffc, 0xf0f0f0c0, 0xffff0000, 0xfffc0000, 0x3f3f3f0c, 0x00ffffff, 0xf0f0f0f0],
  [ 0x22202000, 0x00a80208, 0x20202080, 0x00a80000, 0x02a80000, 0x20202208, 0x00a80080, 0x20202000]
  , 0x10,40.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat361,5,8, "A1342",-2,-2,2,0,4,2,0x8,686,
  [ 0x00fcffff, 0xf0f0f0c0, 0xffff0000, 0x3f3f3f3f, 0xf0f0f0f0, 0xfffc0000, 0x3f3f3f0f, 0x00ffffff],
  [ 0x00a80900, 0x2020a040, 0x82a90000, 0x28202018, 0xa0202090, 0x09a80000, 0x20202804, 0x00a98200]
  , 0x90,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat362,6,8, "A1343",-1,-2,1,1,2,3,0xa,722,
  [ 0x347c7c7c, 0x50fcf400, 0xf4f47000, 0x7fff1500, 0xf4fc5000, 0x7c7c3400, 0x15ff7f00, 0x70f4f4f4],
  [ 0x20200000, 0x00280000, 0x00202000, 0x00a00000, 0x00280000, 0x00202000, 0x00a00000, 0x20200000]
  , 0x10,46.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat363,4,8, "A1344",0,-1,1,2,1,3,0x2,722,
  [ 0x00fcff00, 0xf0f0f0c0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xfffc0000, 0x3c3c3c0c, 0x00fcfc00],
  [ 0x00a88100, 0xa0202040, 0x08a80000, 0x20202800, 0x2020a000, 0x81a80000, 0x28202004, 0x00a80800]
  , 0x10,46.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat364,2,8, "A1345",-1,-2,1,1,2,3,0xa,685,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc],
  [ 0x54208000, 0x84240400, 0x08205400, 0x40604800, 0x04248400, 0x80205400, 0x48604000, 0x54200800]
  , 0x10,46.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat365,6,8, "A1346",-1,-1,1,2,2,3,0x6,720,
  [ 0xfc3c3400, 0x0dfd7f00, 0x70f0fcd4, 0xf4fcc000, 0x7ffd0d00, 0x343cfc5c, 0xc0fcf400, 0xfcf07000],
  [ 0x80202000, 0x08a00000, 0x20200800, 0x00288000, 0x00a00800, 0x20208000, 0x80280000, 0x08202000]
  , 0x10,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat366,5,8, "A1347",-1,-2,2,0,3,2,0xa,759,
  [ 0x053f3f0f, 0x00f0f4f4, 0xf0f04000, 0x7f3c0000, 0xf4f00000, 0x3f3f0500, 0x003c7f7f, 0x40f0f0c0],
  [ 0x00202009, 0x00a00000, 0x20200000, 0x02280000, 0x00a00000, 0x20200000, 0x00280201, 0x00202080]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat367,8,8, "A1348",-2,-1,1,1,3,2,0xa,685,
  [ 0xdcfcfc00, 0xfdf7fc00, 0xfcfcdc34, 0xfc7cfc00, 0xfcf7fd00, 0xfcfcdc70, 0xfc7cfc00, 0xdcfcfc00],
  [ 0x48688800, 0x9422a800, 0x88a48420, 0xa8205800, 0xa8229400, 0x88684820, 0x5820a800, 0x84a48800]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_attackpat367,3,0.376000],
[owl_attackpat368,6,8, "A1349a",-2,0,3,2,5,2,0xa,686,
  [ 0x3f3f3f3f, 0x00fffffc, 0xf0f0f0f0, 0xffff0000, 0xffff0000, 0x3f3f3f3c, 0x00ffffff, 0xf0f0f0f0],
  [ 0x09220202, 0x002009a4, 0x00208040, 0x80200000, 0x09200000, 0x02220904, 0x0020806a, 0x80200000]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_attackpat368,3,1.000000],
[owl_attackpat369,7,8, "A1349b",-3,0,3,2,6,2,0xa,686,
  [ 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0, 0xffff0000, 0xffff0000, 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0],
  [ 0x09220202, 0x00210aa5, 0x00208090, 0x80200000, 0x0a210000, 0x02220919, 0x0020806a, 0x80200000]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_attackpat369,3,1.000000],
[owl_attackpat370,7,8, "A1350",-1,-2,2,1,3,3,0xa,723,
  [ 0x3f3fffff, 0xc0fcfcfc, 0xfcf0f000, 0xffff0f00, 0xfcfcc000, 0xff3f3f00, 0x0fffffff, 0xf0f0fcfc],
  [ 0x2a21a240, 0x80a80898, 0x2820a000, 0x80a80900, 0x08a88000, 0xa2212a00, 0x09a88098, 0xa0202804]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_attackpat370,3,0.010000],
[owl_attackpat371,6,8, "A1351",-2,-1,2,2,4,3,0xa,648,
  [ 0xfcfffcfc, 0xfffffc30, 0xfcfcfc3c, 0xffffff00, 0xfcffff00, 0xfcfffcf0, 0xffffff30, 0xfcfcfcfc],
  [ 0x98220808, 0x09258820, 0x80209814, 0x8a608000, 0x88250900, 0x08229850, 0x80608a20, 0x98208080]
  , 0x10,75.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat372,6,8, "A1352a",-1,-2,2,1,3,3,0xa,648,
  [ 0xc0f0fcf4, 0xfcf0c000, 0xff3f0c00, 0x0d3fff3f, 0xc0f0fcf0, 0xfcf0c000, 0xff3f0d00, 0x0c3fff7f],
  [ 0x80202800, 0x08a08000, 0xa0220800, 0x08288020, 0x80a00820, 0x28208000, 0x80280800, 0x0822a000]
  , 0x10,55.000000,attributes[0],1,null,autohelperowl_attackpat372,3,0.010000],
[owl_attackpat373,6,8, "A1352b",-1,-2,2,1,3,3,0xa,648,
  [ 0xc0f0fcf4, 0xfcf0c000, 0xff3f0c00, 0x0d3fff3f, 0xc0f0fcf0, 0xfcf0c000, 0xff3f0d00, 0x0c3fff7f],
  [ 0x80202800, 0x08a08000, 0xa0220800, 0x08288020, 0x80a00820, 0x28208000, 0x80280800, 0x0822a000]
  , 0x10,75.000000,attributes[0],1,null,autohelperowl_attackpat373,3,0.610000],
[owl_attackpat374,1,4, "A1401",0,0,3,3,3,3,0x6,722,
  [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,46.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat375,1,8, "A1403",0,-2,3,1,3,3,0x6,722,
  [ 0x00fffffe, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xffff0000, 0x3f3f3f3e, 0x00fcfcfc],
  [ 0x00120000, 0x00100020, 0x00100000, 0x00100000, 0x00100000, 0x00120000, 0x00100020, 0x00100000]
  , 0x0,55.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat376,1,8, "A1501",-1,0,0,1,1,1,0x0,685,
  [ 0x00303c00, 0x00f0c000, 0xf0300000, 0x0c3c0000, 0xc0f00000, 0x3c300000, 0x003c0c00, 0x0030f000],
  [ 0x00200400, 0x00204000, 0x40200000, 0x04200000, 0x40200000, 0x04200000, 0x00200400, 0x00204000]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_attackpat376,3,0.058000],
[owl_attackpat377,1,4, "A1502",0,0,0,2,0,2,0x0,685,
  [ 0x00303030, 0x00f00000, 0x30300000, 0x003f0000, 0x00f00000, 0x30300000, 0x003f0000, 0x00303030],
  [ 0x00200010, 0x00200000, 0x00200000, 0x00210000, 0x00200000, 0x00200000, 0x00210000, 0x00200010]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_attackpat377,3,0.058000],
[owl_attackpat378,4,8, "A1503",-2,-1,1,1,3,2,0x0,685,
  [ 0x30fcfcf0, 0xf0fcf000, 0xfcfc3000, 0x3cff3f00, 0xf0fcf000, 0xfcfc3000, 0x3fff3c00, 0x30fcfc3c],
  [ 0x10648860, 0x90249000, 0x88641000, 0x18621900, 0x90249000, 0x88641000, 0x19621800, 0x10648824]
  , 0x90,75.000000,attributes[0],1,null,autohelperowl_attackpat378,3,0.016000],
[owl_attackpat379,4,8, "A1503a",-2,-1,1,1,3,2,0x0,685,
  [ 0x30fcfcf0, 0xf0fcf000, 0xfcfc3000, 0x3cff3f00, 0xf0fcf000, 0xfcfc3000, 0x3fff3c00, 0x30fcfc3c],
  [ 0x10648860, 0x90249000, 0x88641000, 0x18621900, 0x90249000, 0x88641000, 0x19621800, 0x10648824]
  , 0x90,75.000000,attributes[0],1,null,autohelperowl_attackpat379,3,0.016000],
[owl_attackpat380,6,8, "A1504",-1,-2,1,2,2,4,0x2,719,
  [ 0xfcfcfcfc, 0xffffff00, 0xfcfcfcfc, 0xffffff00, 0xffffff00, 0xfcfcfcfc, 0xffffff00, 0xfcfcfcfc],
  [ 0x90a08860, 0xa9248000, 0x88281804, 0x0862a900, 0x8024a900, 0x88a09040, 0xa9620800, 0x18288824]
  , 0x0,60.000000,attributes[0],1,null,autohelperowl_attackpat380,3,1.600000],
[owl_attackpat381,4,8, "A1601",-1,0,1,2,2,2,0x2,722,
  [ 0x003c7c7c, 0x40f0f000, 0xf4f00000, 0x3f3f0500, 0xf0f04000, 0x7c3c0000, 0x053f3f00, 0x00f0f4f4],
  [ 0x00200008, 0x00200000, 0x00200000, 0x02200000, 0x00200000, 0x00200000, 0x00200200, 0x00200080]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_attackpat381,3,1.960000],
[owl_attackpat382,3,8, "A1602",-1,-2,1,1,2,3,0x2,686,
  [ 0x30fcfcfc, 0xf0fcf000, 0xfcfc3000, 0x3fff3f00, 0xf0fcf000, 0xfcfc3000, 0x3fff3f00, 0x30fcfcfc],
  [ 0x10608800, 0x90248000, 0x88241000, 0x08601800, 0x80249000, 0x88601000, 0x18600800, 0x10248800]
  , 0x90,55.000000,attributes[0],1,null,autohelperowl_attackpat382,3,1.000000],
[owl_attackpat383,3,8, "A1603",-1,-2,1,1,2,3,0x2,758,
  [ 0x3fff3f00, 0x30fcfcfc, 0xf0fcf000, 0xfcfc3000, 0xfcfc3000, 0x3fff3f00, 0x30fcfcfc, 0xf0fcf000],
  [ 0x18602000, 0x10a40800, 0x20249000, 0x80681000, 0x08a41000, 0x20601800, 0x10688000, 0x90242000]
  , 0x90,55.000000,attributes[0],1,null,autohelperowl_attackpat383,3,1.000000],
[owl_attackpat384,4,8, "A1604",0,-2,2,2,2,4,0x2,648,
  [ 0x00fcfffc, 0xf0f0f0c0, 0xfffc0000, 0x3f3f3f0f, 0xf0f0f0c0, 0xfffc0000, 0x3f3f3f0c, 0x00fcffff],
  [ 0x00a40920, 0x20209040, 0x81680000, 0x18222004, 0x90202040, 0x09a40000, 0x20221804, 0x00688120]
  , 0x90,55.000000,attributes[0],1,null,autohelperowl_attackpat384,3,1.000000],
[owl_attackpat385,4,8, "A1605",0,-2,2,2,2,4,0x2,648,
  [ 0x00fcfffc, 0xf0f0f0c0, 0xfffc0000, 0x3f3f3f0f, 0xf0f0f0c0, 0xfffc0000, 0x3f3f3f0c, 0x00fcffff],
  [ 0x00a40908, 0x20209040, 0x81680000, 0x1a202004, 0x90202040, 0x09a40000, 0x20201a04, 0x00688180]
  , 0x90,55.000000,attributes[0],1,null,autohelperowl_attackpat385,3,1.000000],
[owl_attackpat386,4,8, "A1606",-1,-2,1,1,2,3,0x2,686,
  [ 0x30fcfcfc, 0xf0fcf000, 0xfcfc3000, 0x3fff3f00, 0xf0fcf000, 0xfcfc3000, 0x3fff3f00, 0x30fcfcfc],
  [ 0x10608880, 0x90248000, 0x88241000, 0x08601a00, 0x80249000, 0x88601000, 0x1a600800, 0x10248808]
  , 0x90,35.000000,attributes[0],1,null,autohelperowl_attackpat386,3,1.000000],
[owl_attackpat387,4,8, "A1607",-1,-2,1,1,2,3,0x2,758,
  [ 0x3fff3f00, 0x30fcfcfc, 0xf0fcf000, 0xfcfc3000, 0xfcfc3000, 0x3fff3f00, 0x30fcfcfc, 0xf0fcf000],
  [ 0x1a602000, 0x10a40808, 0x20249000, 0x80681000, 0x08a41000, 0x20601a00, 0x10688080, 0x90242000]
  , 0x10,35.000000,attributes[0],1,null,autohelperowl_attackpat387,3,1.000000],
[owl_attackpat388,4,8, "A1608",-1,-2,1,1,2,3,0x2,685,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x14608880, 0x90248400, 0x88245000, 0x48601a00, 0x84249000, 0x88601400, 0x1a604800, 0x50248808]
  , 0x10,45.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat389,5,8, "A1608b",0,-2,2,2,2,4,0x2,723,
  [ 0x00fcffff, 0xf0f0f0c0, 0xfffd0000, 0x3f3f3f1f, 0xf0f0f0d0, 0xfffc0000, 0x3f3f3f0f, 0x00fdffff],
  [ 0x00a40921, 0x20209040, 0x80680000, 0x18222000, 0x90202000, 0x09a40000, 0x20221805, 0x00688020]
  , 0x10,50.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat390,4,8, "A1609",-1,-2,1,2,2,4,0x2,722,
  [ 0xfcffff00, 0xfcfcfcf0, 0xfffffc00, 0xfcfcfc3c, 0xfcfcfcf0, 0xfffffc00, 0xfcfcfc3c, 0xfcffff00],
  [ 0x58228000, 0x84240820, 0x09219400, 0x80604814, 0x08248450, 0x80225800, 0x48608020, 0x94210900]
  , 0x10,35.000000,attributes[0],0,null,null,3,0.000000],
[owl_attackpat391,5,8, "A1610",0,-2,2,2,2,4,0x2,723,
  [ 0x00fcffff, 0xf0f0f0c0, 0xffff0000, 0x3f3f3f3f, 0xf0f0f0f0, 0xfffc0000, 0x3f3f3f0f, 0x00ffffff],
  [ 0x00a80180, 0x20202040, 0x02a90000, 0x20202218, 0x20202090, 0x01a80000, 0x22202004, 0x00a90208]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat391,3,0.970000],
[owl_attackpat392,6,8, "A1611",0,-2,2,3,2,5,0x2,686,
  [ 0x00fdffff, 0xf0f0f0d0, 0xffff0000, 0x3f3f3f3f, 0xf0f0f0f0, 0xfffd0000, 0x3f3f3f1f, 0x00ffffff],
  [ 0x00a80200, 0x20202080, 0x02a90000, 0x20202018, 0x20202090, 0x02a80000, 0x20202008, 0x00a90200]
  , 0x0,35.000000,attributes[0],1,null,autohelperowl_attackpat392,3,1.600000],
[owl_attackpat393,4,8, "A1612",-1,-1,1,3,2,4,0x2,683,
  [ 0x3c3f3f00, 0x00fcfcf0, 0xf0f0f000, 0xfcfc0000, 0xfcfc0000, 0x3f3f3c00, 0x00fcfc3c, 0xf0f0f000],
  [ 0x08220800, 0x00208820, 0x80208000, 0x88200000, 0x88200000, 0x08220800, 0x00208820, 0x80208000]
  , 0x0,45.000000,attributes[0],1,null,autohelperowl_attackpat393,3,0.610000],
[owl_attackpat394,6,8, "A1613",-1,-1,1,2,2,3,0x2,722,
  [ 0x3cfdff00, 0xf0fcfcd0, 0xfcfcf000, 0xfcfc3c00, 0xfcfcf000, 0xfffd3c00, 0x3cfcfc1c, 0xf0fcfc00],
  [ 0x28906200, 0x60980880, 0x2418a000, 0x80982400, 0x08986000, 0x62902800, 0x24988008, 0xa0182400]
  , 0x10,75.000000,attributes[0],0,null,null,0,0.000000],
[owl_attackpat395,5,8, "AC01",0,-1,2,1,2,2,0x2,649,
  [ 0x007c7cfc, 0x50f0f000, 0xf4f40000, 0x3f3f1700, 0xf0f05000, 0x7c7c0000, 0x173f3f00, 0x00f4f4fc],
  [ 0x00240808, 0x00209000, 0x80600000, 0x1a200000, 0x90200000, 0x08240000, 0x00201a00, 0x00608080]
  , 0x110,25.000000,attributes[1],1,null,autohelperowl_attackpat395,3,0.034000],
[owl_attackpat396,6,8, "AE01",-2,-1,1,1,3,2,0xa,685,
  [ 0xfcf4fc00, 0xffffdd00, 0xfc7cfc7c, 0xdcfcfc00, 0xddffff00, 0xfcf4fcf4, 0xfcfcdc00, 0xfc7cfc00],
  [ 0x88200000, 0x09220800, 0x00208824, 0x80208000, 0x08220900, 0x00208860, 0x80208000, 0x88200000]
  , 0x110,20.000000,attributes[3],1,null,autohelperowl_attackpat396,3,0.610000],
[null, 0,0,null,0,0,0,0,0,0,0,0,[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],0,0.0,null,0,null,null,0,0.0]
];



const owl_attackpat = data.map(item => new Pattern(item))
// export const owl_attackpat_db = new PatternDB([-1, 0, owl_attackpat, dfa_owl_attackpat])
export const owl_attackpat_db = new PatternDB([-1, 0, owl_attackpat, null])
