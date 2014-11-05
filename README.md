# Preview transport module for Nodemailer

Applies for Nodemailer v1.x and not for v0.x where transports are built-in.

## Usage

Install with npm

    npm install nodemailer-preview-transport

Require to your script

```javascript
var nodemailer = require('nodemailer');
var previewTransport = require('nodemailer-preview-transport');
```

Create a Nodemailer transport object

```javascript
var transporter = nodemailer.createTransport(previewTransport(options))
```

Where

  * **options** defines connection data
     * **directory** - The directory where applications save e-mail for later processing by the SMTP server (required)

**Example**

```javascript
var transport = nodemailer.createTransport(previewTransport({
    directory: './preview'
}));
```

## License

**MIT**
