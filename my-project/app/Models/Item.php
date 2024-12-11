<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['title', 'description', 'price', 'quantity', 'sku', 'picture', 'categoryId'];

}
