const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('./index');

test('POST /sum returns the correct sum for valid numbers', async () => {
  const res = await request(app)
    .post('/sum')
    .send({ numbers: [1, 2, 3.5] });

  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { sum: 6.5 });
});

test('POST /sum 400 if "numbers" field is missing', async () => {
  const res = await request(app).post('/sum').send({});
  assert.equal(res.status, 400);
  assert.match(res.body.error, /numbers/i);
});

test('POST /sum 400 if "numbers" is not an array', async () => {
  const res = await request(app).post('/sum').send({ numbers: 'nope' });
  assert.equal(res.status, 400);
});

test('POST /sum 400 if array contains non-numbers', async () => {
  const res = await request(app).post('/sum').send({ numbers: [1, '2', 3] });
  assert.equal(res.status, 400);
});
