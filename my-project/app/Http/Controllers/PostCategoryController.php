<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class PostCategoryController extends Controller
{
    public function createCategory(Request $request){
        $incomingFields = $request->validate([
            'name' => ['required', Rule::unique('categories', 'name')]
        ]);

        $incomingFields['name'] = strip_tags($incomingFields['name']);


        Category::create($incomingFields);
        return redirect("/categories");
    }



    public function getAllCategories(){
        $allCategories = Category::all();
        return $allCategories; 
    }

}
