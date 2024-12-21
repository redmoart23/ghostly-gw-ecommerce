import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  // Leer el archivo JSON
  const data = fs.readFileSync(
    'D:\\Documents\\python\\pruebas_trabajo\\wompi\\server\\seed\\products.json',
    'utf-8',
  );
  const products = JSON.parse(data);

  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
    });
  }

  console.log('Seed Completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
