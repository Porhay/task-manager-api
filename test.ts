import { JwtService } from '@nestjs/jwt';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJfMkBtYWlsLmNvbSIsInVzZXJJZCI6IjY2NjljZjgyOWRjZTlmYWQyM2FiMmI1ZCIsImlhdCI6MTcxODIxMDQzNCwiZXhwIjoxNzE4Mjk2ODM0fQ.0uJf9UHmypI6joSBx4UP03q6Ces6cVgI4S7Dg218eHE';

const jwt = new JwtService();
console.log(jwt.verify(token, { secret: 'MyS1cr3t' }));
