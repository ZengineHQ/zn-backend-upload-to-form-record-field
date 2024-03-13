# zn-backend-upload-to-form-record-field

Upload a file to a form record's file upload field.

## Installation

```bash
npm install --save https://github.com/ZengineHQ/zn-backend-upload-to-form-record-field 
```

## Usage

```js
const $uploadToFormRecordField = require('@zenginehq/backend-upload-to-form-record-field');

exports.run = function(eventData) {

    // ...

    $uploadToFormRecordField({
		namespace: eventData.request.params.pluginNamespace,
		formId: formId,
		recordId: recordId,
		fieldId: uploadFieldId,
		filePath: 'http://.../somefile.pdf',
		fileName: 'upload-filename.pdf'
    }).then(function(result) {
        eventData.response.status(200).send(result);
    }).catch(function(err) {
        eventData.response.status(500).send();
    });

};
```

### Options Reference

Either `namespace` or `clientId` are required. All other options are required.

- **namespace(_string_)**: Plugin namespace to fetch plugin and client id. Plugin must be offline enabled.
- **clientId(_number_)**: API client id.
- **formId(_number_)**: Form id.
- **recordId(_number_)**: Existing record id.
- **fieldId(_number_)**: Upload form field id.
- **filePath(_string_)**: Local file path or absolute URL to file.
- **fileName(_string_)**: Upload filename. Filename extension will be used to determine content-type.
