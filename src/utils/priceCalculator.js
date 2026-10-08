// discount is a percentage of selling price
export function calc(purchase,selling,discount){
  const p=+purchase||0,s=+selling||0,d=+discount||0
  const discountAmount=+(s*d/100).toFixed(2),final=+(s-discountAmount).toFixed(2),profit=+(final-p).toFixed(2)
  return {discountAmount,final,profit,profitPct:p?+(profit/p*100).toFixed(1):0}
}
