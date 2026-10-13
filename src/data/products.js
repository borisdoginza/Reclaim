import productRecords from './products.json'
import leatherJacketImage from '../assets/images/Leater jacket/It’s leather season again 🤎.jpg'
import velvetBlazerImage from '../assets/images/Velvet blazer/some of our new vintage velvet blazers.jpg'
import missoniKnitImage from '../assets/images/Vintage Missoni top/missoni_top_1.png'
import utilityVestImage from '../assets/images/vest-3/New vintage vests in the store 🎣.jpg'
import sportJacketImage from '../assets/images/zip-1/We are fully prepared for the new season 🍂☁️(1).jpg'
import embroideredVestImage from '../assets/images/shirt-2/Some new pieces & details 🔎(3).jpg'
import denimJacketImage from '../assets/images/jacket-4/Some of our new vintage pieces for autumn ☁️.jpg'
import longCoatImage from '../assets/images/coat-2/See you Saturday with a lot of new vintage pieces!.jpg'

const imageUrls = {
  '../assets/images/Leater jacket/It’s leather season again 🤎.jpg': leatherJacketImage,
  '../assets/images/Velvet blazer/some of our new vintage velvet blazers.jpg': velvetBlazerImage,
  '../assets/images/Vintage Missoni top/missoni_top_1.png': missoniKnitImage,
  '../assets/images/vest-3/New vintage vests in the store 🎣.jpg': utilityVestImage,
  '../assets/images/zip-1/We are fully prepared for the new season 🍂☁️(1).jpg': sportJacketImage,
  '../assets/images/shirt-2/Some new pieces & details 🔎(3).jpg': embroideredVestImage,
  '../assets/images/jacket-4/Some of our new vintage pieces for autumn ☁️.jpg': denimJacketImage,
  '../assets/images/coat-2/See you Saturday with a lot of new vintage pieces!.jpg': longCoatImage,
}

const products = productRecords.map((product) => {
  const image = imageUrls[product.image]

  if (!image) {
    throw new Error(`Product image not found: ${product.image}`)
  }

  return { ...product, image }
})

export default products
