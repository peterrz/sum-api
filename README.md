# Sum API

- Accepts POST request with `{ "numbers": [...] }`
- Returns sum if all values are valid finite numbers
- Validates:
  - JSON syntax
  - `numbers` field exists
  - `numbers` is an array
  - All items are valid numbers 
- Returns clear 400 errors for invalid inputs
- Tested with Supertest
 
### Prerequisites

- Node.js v18+
- npm

### Install & Run

```bash
npm install
npm start
npm test
```
