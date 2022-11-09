-- CreateTable
CREATE TABLE `USUARIOS` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `USUARIOS_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CARTEIRAS` (
    `id` VARCHAR(191) NOT NULL,
    `saldo` DOUBLE NOT NULL DEFAULT 0,
    `clienteId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TRANSACOES` (
    `id` VARCHAR(191) NOT NULL,
    `carteiraOrigem` VARCHAR(191) NOT NULL,
    `carteiraDestino` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TransactionToWallet` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_TransactionToWallet_AB_unique`(`A`, `B`),
    INDEX `_TransactionToWallet_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CARTEIRAS` ADD CONSTRAINT `CARTEIRAS_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `USUARIOS`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TransactionToWallet` ADD CONSTRAINT `_TransactionToWallet_A_fkey` FOREIGN KEY (`A`) REFERENCES `TRANSACOES`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TransactionToWallet` ADD CONSTRAINT `_TransactionToWallet_B_fkey` FOREIGN KEY (`B`) REFERENCES `CARTEIRAS`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
