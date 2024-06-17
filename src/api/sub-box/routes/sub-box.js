{
    "routes": [
      {
        "method": "GET",
        "path": "/sub-box",
        "handler": "sub-box.find",
        "config": {
          "policies": []
        }
      },
      {
        "method": "GET",
        "path": "/sub-box/:id",
        "handler": "sub-box.findOne",
        "config": {
          "policies": []
        }
      },
      {
        "method": "POST",
        "path": "/sub-box",
        "handler": "sub-box.create",
        "config": {
          "policies": []
        }
      },
      {
        "method": "PUT",
        "path": "/sub-box/:id",
        "handler": "sub-box.update",
        "config": {
          "policies": []
        }
      },
      {
        "method": "DELETE",
        "path": "/sub-box/:id",
        "handler": "sub-box.delete",
        "config": {
          "policies": []
        }
      }
    ]
  }
  