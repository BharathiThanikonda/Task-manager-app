const {calculateTip} = require ("../src/math")

test ('testing calculate tip function' , ()=>{
    const total = calculateTip(10)
    expect(total).toBe(12)
}) 