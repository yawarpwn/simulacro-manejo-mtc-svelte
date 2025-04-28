
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";

async function main() {
  const url = 'https://api-mtc.dhs.pe/exam/create'

  const proxies = await fetch('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all').then(res => res.text())
  const proxiesArray = proxies.split('\n').map(p => {
      const [host, port] = p.split(':')
      return {
        host, 
        port: Number(port),
      }
    } )

  const randomProxy = proxiesArray[Math.floor(Math.random() * proxiesArray.length)]
  console.log('use proxy: ', randomProxy)

  const proxiedUrl = `http://${randomProxy.host}:${randomProxy.port}`

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", // Evitar bloqueos por User-Agent
    },
    body: JSON.stringify({category: "A-IIB", exampleType: "practica"}),
    agent: new HttpsProxyAgent(proxiedUrl)
  }
  const res = await fetch(url, options)

  console.log(options.headers)
  const data = await res.json()
  console.log(data)

}
  main()
