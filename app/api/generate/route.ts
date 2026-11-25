import {styles,seasons} from '../../styles';
export const runtime='nodejs';
export const maxDuration=60;
export async function POST(req:Request){
try{
if(Number(req.headers.get('content-length')||0)>4200000)return Response.json({error:'파일이 너무 큽니다.'},{status:413});
const form=await req.formData(),file=form.get('image'),key=form.get('key'),style=styles.find(s=>s.id===form.get('style'));
if(!(file instanceof File)||file.size>3000000||!['image/jpeg','image/png','image/webp'].includes(file.type)||typeof key!=='string'||!key.trim()||key.length>256||!style)return Response.json({error:'입력값을 확인하세요.'},{status:400});
const season=seasons.find(s=>s.id===form.get('season'));
const model=process.env.GEMINI_IMAGE_MODEL||'gemini-2.5-flash-image';
const res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key.trim()},body:JSON.stringify({contents:[{parts:[{text:style.prompt+' '+(season?.prompt||'')},{inlineData:{mimeType:file.type,data:Buffer.from(await file.arrayBuffer()).toString('base64')}}]}],generationConfig:{responseModalities:['TEXT','IMAGE']}}),signal:AbortSignal.timeout(50000)});
if(!res.ok)return Response.json({error:'Gemini 요청 실패 ('+res.status+'). API 키, 결제 및 모델 설정을 확인하세요.'},{status:502});
const data=await res.json();const part=data.candidates?.flatMap((c:any)=>c.content?.parts||[]).find((p:any)=>p.inlineData?.data);
if(!part||!['image/png','image/jpeg','image/webp'].includes(part.inlineData.mimeType))return Response.json({error:'이미지 결과가 없습니다.'},{status:502});
return Response.json({image:'data:'+part.inlineData.mimeType+';base64,'+part.inlineData.data},{headers:{'Cache-Control':'no-store'}});
}catch{return Response.json({error:'이미지 생성 요청을 처리하지 못했습니다.'},{status:500})}
}