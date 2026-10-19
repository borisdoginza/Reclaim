import productRecords from './products.json'
import coatImage from '../assets/images/coat-1/coat-1.jpg'
import halfZipOneImage from '../assets/images/half-zip-1/half-zip-1.jpg'
import halfZipTwoImage from '../assets/images/half-zip-2/half-zip-2.jpg'
import jacketOneImage from '../assets/images/jacket-1/jacket-1.jpg'
import jacketTwoImage from '../assets/images/jacket-2/jacket-1.jpg'
import jacketThreeImage from '../assets/images/jacket-3/jacket-1.jpg'
import jacketFourImage from '../assets/images/jacket-4/jacket-1.jpg'
import jacketFiveImage from '../assets/images/jacket-5/jacket-1.jpg'
import shirtOneImage from '../assets/images/shirt-1/shirt-1.jpg'
import shirtTwoImage from '../assets/images/shirt-2/shirt-1.jpg'
import shirtThreeImage from '../assets/images/shirt-3/shirt-1.jpg'
import vestOneImage from '../assets/images/vest-1/vest-1.jpg'
import vestTwoImage from '../assets/images/vest-2/vest-1.jpg'
import vestThreeImage from '../assets/images/vest-3/vest-1.jpg'
import zipOneImage from '../assets/images/zip-1/half-zip-1.jpg'
import zipTwoImage from '../assets/images/zip-2/half-zip-2.jpg'

const imageUrls = {
  '../assets/images/coat-1/coat-1.jpg': coatImage,
  '../assets/images/half-zip-1/half-zip-1.jpg': halfZipOneImage,
  '../assets/images/half-zip-2/half-zip-2.jpg': halfZipTwoImage,
  '../assets/images/jacket-1/jacket-1.jpg': jacketOneImage,
  '../assets/images/jacket-2/jacket-1.jpg': jacketTwoImage,
  '../assets/images/jacket-3/jacket-1.jpg': jacketThreeImage,
  '../assets/images/jacket-4/jacket-1.jpg': jacketFourImage,
  '../assets/images/jacket-5/jacket-1.jpg': jacketFiveImage,
  '../assets/images/shirt-1/shirt-1.jpg': shirtOneImage,
  '../assets/images/shirt-2/shirt-1.jpg': shirtTwoImage,
  '../assets/images/shirt-3/shirt-1.jpg': shirtThreeImage,
  '../assets/images/vest-1/vest-1.jpg': vestOneImage,
  '../assets/images/vest-2/vest-1.jpg': vestTwoImage,
  '../assets/images/vest-3/vest-1.jpg': vestThreeImage,
  '../assets/images/zip-1/half-zip-1.jpg': zipOneImage,
  '../assets/images/zip-2/half-zip-2.jpg': zipTwoImage,
}

const products = productRecords.map((product) => {
  const image = imageUrls[product.image]

  if (!image) {
    throw new Error(`Product image not found: ${product.image}`)
  }

  return { ...product, image }
})

export default products
