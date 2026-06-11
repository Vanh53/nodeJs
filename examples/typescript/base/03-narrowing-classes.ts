type ApiSuccess = {
  ok: true;
  data: { id: string; email: string };
};

type ApiFailure = {
  ok: false;
  error: string;
};

type ApiResponse = ApiSuccess | ApiFailure;

class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!value.includes('@')) {
      throw new Error('Invalid email');
    }

    return new Email(value.toLowerCase());
  }

  toString(): string {
    return this.value;
  }
}

function printResponse(response: ApiResponse): void {
  if (response.ok) {
    console.log('user email:', response.data.email);
    return;
  }

  console.log('api error:', response.error);
}

const email = Email.create('LAN@EXAMPLE.COM');
printResponse({ ok: true, data: { id: 'u1', email: email.toString() } });
printResponse({ ok: false, error: 'not found' });
