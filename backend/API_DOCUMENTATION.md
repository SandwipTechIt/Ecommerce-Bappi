# Product API Documentation

## Overview
This API provides endpoints for managing products with image upload functionality following MVC architecture.

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Create Product
**POST** `/createProduct`

Creates a new product with image upload functionality.

**Headers:**
- `Content-Type: multipart/form-data`
- `Authorization: Bearer <token>` (if authentication is implemented)

**Form Data:**
- `name` (required): Product name (2-200 characters)
- `price` (required): Product price (positive number, max 999,999.99)
- `description` (optional): Product description (max 2000 characters)
- `categories` (optional): Category ObjectId (24 hex characters)
- `discount` (optional): Discount percentage (0-100)
- `variants` (optional): JSON string of variants array
- `status` (optional): Product status (active, inactive, draft, archived)
- `primaryImage` (required): Primary product image file (max 5MB)
- `images` (optional): Additional product images (max 10 files, 5MB each)

**Example variants JSON:**
```json
[
  {"size": 10, "stock": true},
  {"size": 12, "stock": false}
]
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "64f123456789abcdef123456",
    "name": "Sample Product",
    "slug": "sample-product",
    "description": "Product description",
    "price": 99.99,
    "discount": 10,
    "primaryImage": "http://localhost:3000/images/primaryImage-1234567890-123456789.jpg",
    "images": [
      "http://localhost:3000/images/images-1234567890-987654321.jpg"
    ],
    "variants": [
      {"size": 10, "stock": true}
    ],
    "status": "draft",
    "createdAt": "2023-09-01T10:00:00.000Z",
    "updatedAt": "2023-09-01T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation errors, missing required fields, or invalid file format
- `500`: Server error

### 2. Get All Products
**GET** `/products`

Retrieves all products with full image URLs.

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f123456789abcdef123456",
      "name": "Sample Product",
      "slug": "sample-product",
      "primaryImage": "http://localhost:3000/images/primaryImage-1234567890-123456789.jpg",
      "images": ["http://localhost:3000/images/images-1234567890-987654321.jpg"],
      "price": 99.99,
      "status": "active",
      "createdAt": "2023-09-01T10:00:00.000Z"
    }
  ]
}
```

### 3. Get Product by ID
**GET** `/product/:id`

Retrieves a specific product by its ID.

**Parameters:**
- `id`: Product ObjectId (24 hex characters)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64f123456789abcdef123456",
    "name": "Sample Product",
    "slug": "sample-product",
    "description": "Product description",
    "price": 99.99,
    "primaryImage": "http://localhost:3000/images/primaryImage-1234567890-123456789.jpg",
    "images": ["http://localhost:3000/images/images-1234567890-987654321.jpg"],
    "variants": [{"size": 10, "stock": true}],
    "status": "active",
    "createdAt": "2023-09-01T10:00:00.000Z",
    "updatedAt": "2023-09-01T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Invalid product ID format
- `404`: Product not found
- `500`: Server error

### 4. Delete Product
**DELETE** `/product/:id`

Deletes a product and all associated images.

**Headers:**
- `Authorization: Bearer <token>` (if authentication is implemented)

**Parameters:**
- `id`: Product ObjectId (24 hex characters)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product and associated images deleted successfully"
}
```

**Error Responses:**
- `400`: Invalid product ID format
- `401`: Unauthorized (if authentication fails)
- `404`: Product not found
- `500`: Server error

## File Upload Specifications

### Supported Image Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- BMP (.bmp)

### File Size Limits
- Maximum file size: 5MB per image
- Maximum additional images: 10 files

### Image Storage
- Images are stored in the `/images` directory
- Filenames are automatically generated with timestamps for uniqueness
- Images are accessible via: `http://localhost:3000/images/filename.ext`

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development)",
  "errors": ["Array of validation errors (if applicable)"]
}
```

## Testing with Postman/cURL

### Create Product Example (cURL):
```bash
curl -X POST http://localhost:3000/createProduct \
  -H "Content-Type: multipart/form-data" \
  -F "name=Test Product" \
  -F "price=29.99" \
  -F "description=A test product" \
  -F "status=active" \
  -F "primaryImage=@/path/to/primary-image.jpg" \
  -F "images=@/path/to/additional-image1.jpg" \
  -F "images=@/path/to/additional-image2.jpg"
```

### Get All Products Example (cURL):
```bash
curl -X GET http://localhost:3000/products
```

### Delete Product Example (cURL):
```bash
curl -X DELETE http://localhost:3000/product/64f123456789abcdef123456
```

## Notes

1. **Image Cleanup**: If product creation fails, uploaded images are automatically deleted to prevent orphaned files.

2. **Slug Generation**: Product slugs are automatically generated from the product name and ensured to be unique.

3. **Image URLs**: All image responses include full URLs for easy frontend integration.

4. **Validation**: Comprehensive validation is applied to all input data before processing.

5. **Error Recovery**: Failed operations clean up any uploaded files to maintain storage integrity.
