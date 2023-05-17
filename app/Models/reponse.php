<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reponse extends Model
{
    use HasFactory;
    protected $guarded = [
        'reponse',
        'idQuestion',
        'etat',
        
    ];
}
