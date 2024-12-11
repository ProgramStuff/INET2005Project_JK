<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\PostCategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Categories

Route::get('/categories', function () {
    return Inertia::render('Categories');
});

Route::get('/categories/create', function () {
    return Inertia::render('CreateCategory');
});

Route::get('/categories/{id}/edit', function ($id) {
    return Inertia::render('EditCategory', ['categoryId' => $id]);
});

// ITEMS

Route::get('/items/{id}/edit', function ($id) {
    return Inertia::render('EditItem', ['itemId' => $id]);
});

Route::get('/items/create', function () {
    return Inertia::render('CreateItem');
}); 

Route::get('/items', function () {
    return Inertia::render('Items');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Category Routes
Route::post('categories/catCreate', [PostCategoryController::class, 'createCategory']);
Route::get('categories/edit/{id}', [PostCategoryController::class, 'getCategoryById']);
Route::get('categories/allCategories', [PostCategoryController::class, 'getAllCategories']);
Route::post('categories/updateCategory/{id}', [PostCategoryController::class, 'updateCategory']);


// Item routes
Route::post('items/createItem', [ItemController::class , 'createItem']);
Route::get('items/allItems', [ItemController::class, 'getAllItems']);
Route::post('items/deleteItem', [ItemController::class , 'softDeleteItem']);
Route::get('categories/edit/{id}', [ItemController::class, 'getItemById']);
Route::post('categories/updateCategory/{id}', [ItemController::class, 'updateItem']);


require __DIR__.'/auth.php';
