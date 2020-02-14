const fs = require('fs');
const superagent = require('superagent');

// read file Promise
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('This text error comes from the reject in the promise');
      resolve(data);
    });
  });
};

// write File Promise
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('This error is from writeFilePro Promise');
      resolve('Data is written successfully');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`); // this line waits for file to be read and stored to data before it moves on
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    // console.log(res.body.message);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err.message || err);
    throw err.message || err;
  }
  return '2: Ready !!:D';
};

(async () => {
  try {
    console.log('1: will get dog pics!');
    const x = await getDogPic();
    console.log(x);

    console.log('3: Done Getting the dog pics!');
  } catch (err) {
    console.log('ERROR');
  }
})();

/* console.log('1: will get dog pics!');
getDogPic()
  .then(x => {
    console.log(x);
    console.log('3: Done Getting the dog pics!');
  })
  .catch(err => {
    console.log('ERROR');
  }); */

/* // Calling the read file Promise
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file');
  })
  .catch(err => {
    console.log(err.message || err);
  }); */
