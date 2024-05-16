const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Your API token
const API_TOKEN = 'c848427e2958a090d6704fa8db38470dc87c06e65bff0fb27d465b6b8572ad1292d7c997c3070d452250b56a91869a23bb59169766ae2d9cf3eb0b361c9b980dd960e4b327cb120f73c55fc5b7e6495388362798e72dc5065aa343dbd3f274e3e00fca41f23acd5aa30cf9d5429d14d98796b87d47c1d1c6ddc557f51ca8aa50';

const downloadImage = async (url, filepath) => {
  console.log(`Downloading image from: ${url}`);
  const response = await axios({
    url,
    responseType: 'stream'
  });
  response.data.pipe(fs.createWriteStream(filepath));
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      console.log(`Image downloaded to: ${filepath}`);
      resolve(filepath);
    });
    response.data.on('error', (err) => {
      console.error(`Error downloading image: ${err}`);
      reject(err);
    });
  });
};

const uploadImageToStrapi = async (filePath) => {
  console.log(`Uploading image from: ${filePath}`);
  const form = new FormData();
  form.append('files', fs.createReadStream(filePath));

  try {
    const uploadResponse = await axios.post('http://localhost:1337/upload', form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    console.log(`Image uploaded: ${uploadResponse.data[0].id}`);
    return uploadResponse.data[0]; // Assuming the first file in the response
  } catch (err) {
    console.error(`Error uploading image: ${err.response ? err.response.data : err.message}`);
    throw err;
  }
};

const fetchAndPopulateStrapi = async () => {
  try {
    console.log('Fetching products from FakeStoreAPI...');
    const fakeStoreResponse = await axios.get('https://fakestoreapi.com/products');
    const products = fakeStoreResponse.data;

    console.log('Fetched products from FakeStoreAPI:', products);

    // Send each product to Strapi
    for (const product of products) {
      try {
        const imagePath = path.resolve(__dirname, `${product.id}.jpg`);
        await downloadImage(product.image, imagePath);
        const uploadedImage = await uploadImageToStrapi(imagePath);

        console.log('Uploaded image:', uploadedImage);

        const payload = {
          id_integer: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          description: product.description,
          image: uploadedImage.id // Link to the uploaded image
        };

        console.log('Payload:', payload);

        const strapiResponse = await axios.post('http://localhost:1337/api/products', {
          data: payload
        }, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`
          }
        });

        console.log('Product sent to Strapi:', strapiResponse.data);
        fs.unlinkSync(imagePath); // Clean up the temporary image file
      } catch (error) {
        console.error('Error sending product to Strapi:', error.response ? error.response.data : error.message);
      }
    }
  } catch (error) {
    console.error('Error fetching data from FakeStoreAPI:', error.message);
  }
};

fetchAndPopulateStrapi();
