-- CreateTable
CREATE TABLE "Productos" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "talle" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);
