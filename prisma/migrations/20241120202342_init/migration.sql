-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false
);
