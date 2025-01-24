<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user=User::all();
        return response()->json($user);
        // print_r($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
            'dob' => 'required|date|before:18 years ago|after:100 years ago',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'message'=>"error",
            ]);
        }
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'dob' => $request->dob,
        ]);
        return response()->json([
            'message' => 'User successfully created!',
            'success'=> true,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user_data = User::find($id);
        dd($user_data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'dob' => 'required|date|before:18 years ago|after:100 years ago',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'message'=>"error",
            ]);
        }

        User::where('id', $id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'dob' => $request->dob
        ]);
        return response()->json([
            'message' => 'User successfully updated!',
            'success'=> true,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(string $id)
    // {
    //     $res = User::where('id', $id)->delete();
    //     return response()->json($res);
    // }
}
