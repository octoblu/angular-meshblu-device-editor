# angular-meshblu-device-editor
An Angular directive for editing Meshblu devices.


[![Bower](https://img.shields.io/bower/v/angular-meshblu-device-editor.svg)](https://github.com/octoblu/angular-meshblu-device-editor#install) [![Build Status](https://img.shields.io/travis/octoblu/angular-meshblu-device-editor.svg)](https://travis-ci.org/octoblu/angular-meshblu-device-editor) [![Code Climate](https://codeclimate.com/github/octoblu/angular-meshblu-device-editor/badges/gpa.svg)](https://codeclimate.com/github/octoblu/angular-meshblu-device-editor)

# Install

Install with bower:

```shell
bower install --save angular-meshblu-device-editor
```

# Directives

* [Device Message Schema Container](#device-message-schema-container)


## Device Message Schema Container

To render a form based on a device's message schema:

```html
<device-message-schema-container
  device="controller.device"
  message="controller.message"
  selected-schema-key="controller.selectedSchemaKey"></device-message-schema-container>
```

### Arguments

| Param                 | Type   | Details         |
|-----------------------|--------|-----------------|
| `device`              | object | A meshblu device containing either an old style `messageSchema` or a new style `schemas.message` property |
| `message`             | object | The message data. This will be modified as the user fills in the form |
| `selected-schema-key` | string | The key corresponding to the currently selected schema |
