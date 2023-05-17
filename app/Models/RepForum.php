<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepForum extends Model
{
    use HasFactory;
    protected $table='rep_forums';
    protected $fillable = [
        'idUser',
        'idQuestion',
        'reponse',
    ];
}

