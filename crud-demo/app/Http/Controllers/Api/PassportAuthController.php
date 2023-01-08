<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PassportAuthController extends BaseController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:4',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:3',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.',$validator->messages(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $data['token'] = $user->createToken('MyApp')->accessToken;
        $data['name'] = $user->name;
        return $this->sendResponse($data, 'User register successfully.');
    }

    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (Auth::attempt($data)) {
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->accessToken;
            $success['name'] = $user->name;

            return $this->sendResponse($success, 'User login successfully.');
        }

        return $this->sendError('Unauthorised.', ['error' => 'Unauthorised'], 401);
    }

    public function userInfo()
    {
        $user = auth()->user();

        return  $this->sendResponse($user, 'Get user success.');
    }
}
