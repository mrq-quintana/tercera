const cant = process.argv[2];
const random = {};
for (let i = 0; i < cant; i++) {
  const numero = Math.floor(Math.random() * 1000) + 1;
  if (random[numero] ){
    random[numero] += 1;
  } else {
    random[numero] = 1;
  }
}
process.send(random);
process.exit(0);