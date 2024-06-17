{
    "routes": [
      {
        "method": "GET",
        "path": "/sub-boxes",
        "handler": "sub-box.find",
        "config": {
          "policies": []
        }
      },
      {
        "method": "GET",
        "path": "/sub-boxes/:id",
        "handler": "sub-box.findOne",
        "config": {
          "policies": []
        }
      },
      {
        "method": "POST",
        "path": "/sub-boxes",
        "handler": "sub-box.create",
        "config": {
          "policies": []
        }
      },
      {
        "method": "PUT",
        "path": "/sub-boxes/:id",
        "handler": "sub-box.update",
        "config": {
          "policies": []
        }
      },
      {
        "method": "DELETE",
        "path": "/sub-boxes/:id",
        "handler": "sub-box.delete",
        "config": {
          "policies": []
        }
      }
    ]
  }
  