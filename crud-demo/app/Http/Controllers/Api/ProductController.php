<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends BaseController
{
    public function index(Request $request)
    {
        $products = Product::where('name', 'like', '%' . $request->name)->get();

        return $this->sendResponse($products, 'Product List');
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'detail' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }
        $product = Product::create($input);

        return $this->sendResponse($product, 'Product created successfully.');
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (is_null($product)) {
            return $this->sendError('Product not found.');
        }

        return $this->sendResponse($product, 'Product retrieved successfully.');
    }

    public function update(Request $request, Product $product)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'detail' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $product->name = $input['name'];
        $product->detail = $input['detail'];
        $product->save();

        return $this->sendResponse($product, 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return $this->sendResponse($product, 'Product deleted successfully.');
    }
}
