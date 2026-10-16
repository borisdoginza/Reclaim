import productRecords from './products.json'
import coatImage from '../assets/images/coat-1/Some of our new vintage pieces for autumn ☁️(2).jpg'
import halfZipOneImage from '../assets/images/half-zip-1/We are fully prepared for the new season 🍂☁️(3).jpg'
import halfZipTwoImage from '../assets/images/half-zip-2/We are fully prepared for the new season 🍂☁️(2).jpg'
import jacketOneImage from '../assets/images/jacket-1/New vintage jackets & coats are now available in the store 🧥(4).jpg'
import jacketTwoImage from '../assets/images/jacket-2/New vintage jackets & coats are now available in the store 🧥(2).jpg'
import jacketThreeImage from '../assets/images/jacket-3/New vintage jackets & coats are now available in the store 🧥.jpg'
import jacketFourImage from '../assets/images/jacket-4/Some of our new vintage pieces for autumn ☁️.jpg'
import jacketFiveImage from '../assets/images/jacket-5/Some of our new vintage pieces for autumn ☁️(4).jpg'
import shirtOneImage from '../assets/images/shirt-1/Some new pieces & details 🔎(4).jpg'
import shirtTwoImage from '../assets/images/shirt-2/Some new pieces & details 🔎(2).jpg'
import shirtThreeImage from '../assets/images/shirt-3/Some new pieces & details 🔎.jpg'
import vestOneImage from '../assets/images/vest-1/New vintage vests in the store 🎣(4).jpg'
import vestTwoImage from '../assets/images/vest-2/New vintage vests in the store 🎣(2).jpg'
import vestThreeImage from '../assets/images/vest-3/New vintage vests in the store 🎣.jpg'
import zipOneImage from '../assets/images/zip-1/We are fully prepared for the new season 🍂☁️(1).jpg'
import zipTwoImage from '../assets/images/zip-2/We are fully prepared for the new season 🍂☁️.jpg'

const imageUrls = {
  '../assets/images/coat-1/Some of our new vintage pieces for autumn ☁️(2).jpg': coatImage,
  '../assets/images/half-zip-1/We are fully prepared for the new season 🍂☁️(3).jpg': halfZipOneImage,
  '../assets/images/half-zip-2/We are fully prepared for the new season 🍂☁️(2).jpg': halfZipTwoImage,
  '../assets/images/jacket-1/New vintage jackets & coats are now available in the store 🧥(4).jpg': jacketOneImage,
  '../assets/images/jacket-2/New vintage jackets & coats are now available in the store 🧥(2).jpg': jacketTwoImage,
  '../assets/images/jacket-3/New vintage jackets & coats are now available in the store 🧥.jpg': jacketThreeImage,
  '../assets/images/jacket-4/Some of our new vintage pieces for autumn ☁️.jpg': jacketFourImage,
  '../assets/images/jacket-5/Some of our new vintage pieces for autumn ☁️(4).jpg': jacketFiveImage,
  '../assets/images/shirt-1/Some new pieces & details 🔎(4).jpg': shirtOneImage,
  '../assets/images/shirt-2/Some new pieces & details 🔎(2).jpg': shirtTwoImage,
  '../assets/images/shirt-3/Some new pieces & details 🔎.jpg': shirtThreeImage,
  '../assets/images/vest-1/New vintage vests in the store 🎣(4).jpg': vestOneImage,
  '../assets/images/vest-2/New vintage vests in the store 🎣(2).jpg': vestTwoImage,
  '../assets/images/vest-3/New vintage vests in the store 🎣.jpg': vestThreeImage,
  '../assets/images/zip-1/We are fully prepared for the new season 🍂☁️(1).jpg': zipOneImage,
  '../assets/images/zip-2/We are fully prepared for the new season 🍂☁️.jpg': zipTwoImage,
}

const products = productRecords.map((product) => {
  const image = imageUrls[product.image]

  if (!image) {
    throw new Error(`Product image not found: ${product.image}`)
  }

  return { ...product, image }
})

export default products
