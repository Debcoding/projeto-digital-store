/** Preço efetivamente cobrado (promocional, se existir). */
export const finalPrice = (product) => product.salePrice ?? product.price;
