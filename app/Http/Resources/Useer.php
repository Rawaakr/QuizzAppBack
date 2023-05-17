<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Useer extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'telephone' => $this->telephone,
            'description' => $this->description,
            'image' => $this->image,
            'adresse' => $this->adresse,
            'social' => $this->social,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'login' => $this->login,
            'password' => $this->password,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
