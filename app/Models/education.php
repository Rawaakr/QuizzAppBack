<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class education extends Model
{
    use HasFactory;
    protected $guarded = [
        'annee_debut',
        'annee_fin',
        'titre',
        'description',
        'idUser',
    ];
}
