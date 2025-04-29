import fs from 'fs/promises'
import dataJson from '../src/lib/data/A-I.json'

async function downloadPhoto(photo) {
	const photoUrl = `https://sierdgtt.mtc.gob.pe${photo.url}`
	const res = await fetch(photoUrl)
	const blob = await res.blob()
	const buffer = await blob.arrayBuffer()
	fs.writeFile(`./static/images/A-I/img${photo.id}.jpg`, buffer).catch((err) => console.log(err))
}
async function main() {
	const photos = dataJson.filter((p) => p.image).map((q) => ({ url: q.image, id: q.id }))
	photos.forEach((photo) => {
		downloadPhoto(photo)
	})
}

main()
