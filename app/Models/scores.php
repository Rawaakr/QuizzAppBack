<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class scores extends Model
{
    use HasFactory;
    protected $guarded = [
        'idTest',
        'idUser',
        'score',
    ];
}

