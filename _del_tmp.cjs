const fs=require('fs');
const t0=Date.now();
let n=0;
for(let i=6;i<=1000;i++){
  const s=String(i).padStart(4,'0');
  for(const f of [`extensions/fext${s}.js`,`images/fext${s}.png`]){
    try{fs.unlinkSync(f);n++;}catch(e){}
  }
}
console.log('unlinked',n,'files in',((Date.now()-t0)/1000).toFixed(1)+'s');
