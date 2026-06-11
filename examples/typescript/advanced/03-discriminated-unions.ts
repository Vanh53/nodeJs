type CardPayment = {
  kind: 'card';
  last4: string;
  amount: number;
};

type BankPayment = {
  kind: 'bank';
  accountNumber: string;
  amount: number;
};

type CashPayment = {
  kind: 'cash';
  amount: number;
};

type Payment = CardPayment | BankPayment | CashPayment;

function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}

function describePayment(payment: Payment): string {
  switch (payment.kind) {
    case 'card':
      return `Card ****${payment.last4}: ${payment.amount}`;
    case 'bank':
      return `Bank ${payment.accountNumber}: ${payment.amount}`;
    case 'cash':
      return `Cash: ${payment.amount}`;
    default:
      return assertNever(payment);
  }
}

const payments: Payment[] = [
  { kind: 'card', last4: '4242', amount: 100 },
  { kind: 'bank', accountNumber: 'AC-100', amount: 250 },
  { kind: 'cash', amount: 20 },
];

console.log(payments.map(describePayment));
