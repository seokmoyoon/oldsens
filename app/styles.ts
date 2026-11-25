export const seasons=[
{id:'christmas',name:'크리스마스',title:'Merry Christmas',message:'따뜻하고 행복한 크리스마스 보내세요.',accent:'#873c36',prompt:'Subtle evergreen branches, winter warmth, restrained burgundy and pine green accents.'},
{id:'newyear',name:'새해',title:'Happy New Year 2027',message:'새해에도 행복한 순간이 가득하길 바랍니다.',accent:'#9a713b',prompt:'Quiet dawn, warm gold and muted blue accents, hopeful new year atmosphere.'},
{id:'seollal',name:'설날',title:'새해 복 많이 받으세요',message:'건강과 행복이 가득한 한 해 되세요.',accent:'#395c68',prompt:'Refined Korean traditional paper and restrained minhwa-inspired decorative accents.'}
];
const base='Create one refined illustration from the uploaded photograph. Preserve recognizable identity, pose, relationships and important objects. Simplify distracting background details, use intentional negative space and a coherent palette derived from the photo. Do not invent people. Create the complete finished greeting postcard as a single artwork, with integrated illustration, tasteful seasonal decoration, intentional margins and editorial composition. Never paste a rectangular photo onto a generic card template.';
export const styles=[
{id:'geometry',name:'기하학 아트',prompt:base+' Build the composition from circles, arcs, triangles and rectangles. Use four to six flat colors, clear silhouettes, balanced asymmetry, no gradients.'},
{id:'postcard',name:'빈티지 엽서',prompt:base+' Use mid-century lithographic travel illustration, muted inks, fine paper grain, simplified shapes and warm ivory highlights. Avoid heavy distress and photorealism.'},
{id:'pencil',name:'색연필',prompt:base+' Use delicate colored pencil strokes, soft hatching and visible ivory paper. Leave generous unpainted areas and retain expressive facial features.'},
{id:'block',name:'컬러 블록',prompt:base+' Use clean flat silhouettes and a limited palette, no heavy outlines, deliberate visual hierarchy and editorial composition.'},
{id:'riso',name:'리소그래프',prompt:base+' Use two to four ink colors, fine halftone grain and subtle registration shifts. Keep contrast readable and avoid muddy overlap.'},
{id:'paper',name:'페이퍼 아트',prompt:base+' Use layered cut-paper shapes with restrained shallow shadows, tactile edges and a harmonious palette.'},
{id:'sketch',name:'건축 스케치',prompt:base+' Reinterpret essential contours and spatial relationships as a sparse architectural concept drawing. Use loose graphite lines, occasional construction guides, selective washes in two to four colors and expansive blank ivory space. Omit secondary scenery.'}
];
export const layouts=[
{id:'single',name:'전체 일러스트',prompt:'Transform the entire canvas into one coherent illustrated greeting postcard. Integrate the subject naturally into the scene.'},
{id:'split',name:'원본 + 스케치',prompt:'Create one editorial poster with two equal-height sections. Upper half faithfully preserves the reference photograph; lower half reinterprets its essential forms as a sparse hand-drawn concept sketch with construction lines and selective color. Maintain a coherent design across both halves.'},
{id:'poster',name:'감성 포스터',prompt:'Create an exhibition-quality editorial art poster with generous negative space, asymmetrical balance and a strong visual focal point.'}
];
export const ratios=['3:4','4:5','1:1','9:16'];
export const textModes=['auto','custom','none'];

export function buildPrompt(options:{style:string;season:string;layout:string;ratio:string;textMode:string;caption:string}){
const style=styles.find(s=>s.id===options.style),season=seasons.find(s=>s.id===options.season),layout=layouts.find(l=>l.id===options.layout),ratio=options.ratio,mode=options.textMode,caption=options.caption.trim();
if(!style||!season||!layout||!ratios.includes(ratio)||!textModes.includes(mode)||caption.length>100||(mode==='custom'&&!caption))throw new Error('엽서 설정을 확인하세요.');
const typography=mode==='none'?'Do not render any text, letters, logos or numbers.':mode==='custom'?'Render only the following exact greeting as integrated typography, preserving spelling and language: '+JSON.stringify(caption):'Create one short tasteful seasonal greeting in Korean or English, with legible editorial typography. No other text or logos.';
return [style.prompt,season.prompt,layout.prompt,typography,'Output exactly one finished flat postcard artwork, not a mockup, with aspect ratio '+ratio+'. No external frame, hands holding a card, or unrelated objects.'].join('\n');
}
