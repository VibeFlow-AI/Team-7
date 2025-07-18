-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);
