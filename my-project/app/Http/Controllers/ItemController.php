<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Item;
use Illuminate\Support\Facades\File;

class ItemController extends Controller
{
    public function createItem(Request $request){
        $incomingFields = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'sku' => 'required',
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif,webp,avif|max:2048',
            'categoryId' => 'required',
        ]);

        $imageName = time() . '.' . $request->file('picture')->getClientOriginalExtension();
        $request->file('picture')->move(public_path('images'), $imageName);
        $incomingFields['picture'] = 'images/' . $imageName;

        $incomingFields['title'] = strip_tags($incomingFields['title']);
        $incomingFields['description'] = strip_tags($incomingFields['description']);
        $incomingFields['price'] = strip_tags($incomingFields['price']);
        $incomingFields['quantity'] = strip_tags($incomingFields['quantity']);
        $incomingFields['sku'] = strip_tags($incomingFields['sku']);
        $incomingFields['categoryId'] = strip_tags($incomingFields['categoryId']);



        Item::create($incomingFields);
        return redirect("/items");
    }

    public function getAllItems(){
        $allItems = Item::all();
        return $allItems; 
    }

    public function softDeleteItem(Request $request){

        $incomingFields = $request->validate(['id' => 'required']);

        $incomingFields['id'] = strip_tags($incomingFields['id']);

        $item = Item::find($incomingFields['id']);
        File::delete($item['picture']);

        $item->delete();

        return redirect("/items");
    }

    public function updateItem($id, Request $request){
        $item = Item::findOrFail($id);

        $incomingFields = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'sku' => 'required',
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif,webp,avif|max:2048',
            'categoryId' => 'required',
        ]);
        
        $imageName = time() . '.' . $request->file('picture')->getClientOriginalExtension();
        $request->file('picture')->move(public_path('images'), $imageName);
        $incomingFields['picture'] = 'images/' . $imageName;

        $incomingFields['title'] = strip_tags($incomingFields['title']);
        $incomingFields['description'] = strip_tags($incomingFields['description']);
        $incomingFields['price'] = strip_tags($incomingFields['price']);
        $incomingFields['quantity'] = strip_tags($incomingFields['quantity']);
        $incomingFields['sku'] = strip_tags($incomingFields['sku']);
        $incomingFields['categoryId'] = strip_tags($incomingFields['categoryId']);
        File::delete($item['picture']);

        $item->update($incomingFields);

        return redirect("/items");
    }

    public function getItemById($id){

        $item = Item::findOrFail($id);
        return $item;
    }
}
