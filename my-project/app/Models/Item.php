<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Item extends Model
{

    protected $fillable = ['title', 'description', 'price', 'quantity', 'sku', 'picture', 'categoryId'];
    use SoftDeletes;

}
