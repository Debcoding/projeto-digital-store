const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** 140 -> "R$ 140,00" (troca o espaço não separável por espaço comum). */
export const formatPrice = (value) => currency.format(value).replace(/\u00a0/g, ' ');

/** "1 produto" / "12 produtos" */
export const formatCount = (total) => `${total} ${total === 1 ? 'produto' : 'produtos'}`;
