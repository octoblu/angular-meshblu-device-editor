'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

var DEVICE ={
  "schemas": {
    "version": "1.0.0",
    "message": {
      "media": {
        "title": "Media",
        "type": "object",
        "properties": {
          "metadata": {
            "type": "object",
            "properties": {
              "jobType": {
                "type": "string",
                "default": "displayMedia"
              }
            }
          },
          "data": {
            "type": "object",
            "properties": {
              "media": {
                "type": "object",
                "properties": {
                  "contentId": {
                    "title": "Media URL",
                    "type": "string"
                  },
                  "streamType": {
                    "title": "Stream Type",
                    "type": "string",
                    "enum": ["LIVE", "BUFFERED"],
                    "default": "LIVE"
                  },
                  "contentType": {
                    "title": "Content Type",
                    "type": "string",
                    "default": "video/mp4"
                  },
                  "required": ["contentId", "streamType", "contentType"]
                }
              },
              "options": {
                "type": "object",
                "properties": {
                  "autoplay": {
                    "type": "boolean",
                    "default": true
                  },
                  "currentTime": {
                    "type": "number",
                    "default": 0
                  }
                }
              },
              "required": ["media", "options"]
            }
          }
        },
        "x-form-schema": {
          "angular": "message.media.angular"
        },
        "required": ["data", "metadata"]
      }
    },
    "form": {
      "message": {
        "media": {
          "angular": [
            { "key": "data.media.contentId" },
            { "key": "data.media.streamType" },
            { "key": "data.media.contentType" },
            { "key": "data.options.autoplay" },
            { "key": "data.options.currentTime" }
          ]
        }
      }
    }
  }
};

angular.module('example').controller('ExampleDeviceMessageSchemaContainerController', function(){
  this.message = {};
  this.device = angular.copy(DEVICE);
  this.selectedSchemaKey = 'media'
});
