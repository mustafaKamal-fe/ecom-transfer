-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "availableFrom" TIMESTAMP(3),
ADD COLUMN     "availableTo" TIMESTAMP(3),
ADD COLUMN     "isAvliable" BOOLEAN DEFAULT true,
ADD COLUMN     "isBestSeller" BOOLEAN DEFAULT false,
ADD COLUMN     "isFeatured" BOOLEAN DEFAULT false,
ADD COLUMN     "isSpecialOffer" BOOLEAN DEFAULT false,
ADD COLUMN     "isTopRated" BOOLEAN DEFAULT false;
