<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCertificatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('certificats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idCompetence');
            $table->foreign('idCompetence')
            ->references('id')
            ->on('competences');
            $table->unsignedBigInteger('idUser');
            $table->foreign('idUser')
            ->references('id')
            ->on('users');
            $table->TinyInteger('statut');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('certificats');
    }
}
