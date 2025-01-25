
export async function load() {
  const data = await fetch('https://api.tellsenales.workers.dev/api/quotations')
  .then(res =>  {
    if(!res.ok) throw new Error('Error en peticion')
    return res.json()
  })

  return { quos: data.items}
}


 
