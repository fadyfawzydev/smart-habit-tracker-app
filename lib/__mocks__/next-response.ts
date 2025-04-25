export class NextResponse extends Response {
  static json(body: unknown, init?: ResponseInit) {
    const jsonBody = JSON.stringify(body);
    return new NextResponse(jsonBody, {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...(init?.headers || {}),
      },
    });
  }
} 