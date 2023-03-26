<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'nom' => 'krawaa',
            'prenom' => 'rawaaaaa',
            'telephone' => '27094998',
            'education' => 'cycle ingenieur',
            'experience' => 'stage 3 mois',
            'description' => 'azertyui',
            'skills' => 'azer',
            'social' => 'aze',
            'email' => 'krawaaa@gmail.com',
            'login' => 'rkrawa',
            'password' => Hash::make('12345')
        ]);
    }
}
