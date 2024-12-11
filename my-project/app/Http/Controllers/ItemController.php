<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Item;

class ItemController extends Controller
{
    public function createItem(Request $request){
        $incomingFields = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'sku' => 'required',
            'picture' => 'required',
            'categoryId' => 'required',
        ]);

        $incomingFields['title'] = strip_tags($incomingFields['title']);
        $incomingFields['description'] = strip_tags($incomingFields['description']);
        $incomingFields['price'] = strip_tags($incomingFields['price']);
        $incomingFields['quantity'] = strip_tags($incomingFields['quantity']);
        $incomingFields['sku'] = strip_tags($incomingFields['sku']);
        $incomingFields['picture'] = strip_tags($incomingFields['picture']);
        $incomingFields['categoryId'] = strip_tags($incomingFields['categoryId']);


        Item::create($incomingFields);
        return redirect("/items");
    }

    public function getAllItems(){
        $allItems = Item::all();
        return $allItems; 
    }
}
