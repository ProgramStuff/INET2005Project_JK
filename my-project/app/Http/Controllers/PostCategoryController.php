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

    public function getCategoryById($id){

        $category = Category::findOrFail($id);
        return $category;
    }

    public function updateCategory($id, Request $request){
        $category = Category::findOrFail($id);


        $incomingFields = $request->validate([
            'name' => ['required', Rule::unique('categories', 'name')->ignore($id)]
        ]);

        $incomingFields['name'] = strip_tags($incomingFields['name']);

        $category->update($incomingFields);

        return redirect("/categories");
    }


}